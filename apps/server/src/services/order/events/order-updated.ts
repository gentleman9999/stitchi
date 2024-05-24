import { OrderPaymentStatus } from '@prisma/client'
import makeLogger from '../../../telemetry/logging'

import {
  NotificationClientService,
  makeClient as makeNotificationServiceClient,
} from '../../notification'

import { OrderRecordType, OrderStatusTemporary } from '../db/order-table'
import { OrderFactoryOrder } from '../factory'
import {
  AnalyticsService,
  EventName,
  makeClient as makeAnalyticsClient,
} from '../../analytics'
import { Actor } from '../../types'

export interface OrderUpdatedEventPayload {
  prevOrder: OrderFactoryOrder
  nextOrder: OrderFactoryOrder
  actor: Actor
}

interface MakeHandlerParams {
  notificationService: NotificationClientService
  analyticsClient: AnalyticsService
  logger: typeof makeLogger
}

interface OrderUpdatedEventHandler {
  (payload: OrderUpdatedEventPayload): Promise<void>
}

const makeHandler =
  (
    { notificationService, analyticsClient, logger }: MakeHandlerParams = {
      notificationService: makeNotificationServiceClient(),
      analyticsClient: makeAnalyticsClient(),
      logger: makeLogger,
    },
  ): OrderUpdatedEventHandler =>
  async ({ prevOrder, nextOrder, actor }) => {
    // Make sure this happens before sending any notifications
    // We may want to move this out of async??? Can we ensure that the next step has access to the latest topic members???
    if (prevOrder.membershipId === null && nextOrder.membershipId !== null) {
      // Add newly assigned membership to notifications
      const topicKey = `order:${nextOrder.id}`

      await notificationService.addSubscribersToNotificationTopic(topicKey, [
        nextOrder.membershipId,
      ])
    }

    if (prevOrder.type !== nextOrder.type) {
      switch (nextOrder.type) {
        case OrderRecordType.CONFIRMED: {
          try {
            await notificationService.sendNotification(
              'order:created',
              {
                order: nextOrder,
              },
              {
                topicKey: `order:${nextOrder.id}`,
              },
            )
          } catch (error) {
            logger.child({ error }).error({
              message: 'Failed to create order created notification',
            })
          }

          break
        }
      }
    }

    if (prevOrder.paymentStatus !== nextOrder.paymentStatus) {
      if (prevOrder.paymentStatus === OrderPaymentStatus.NOT_PAID) {
        if (!nextOrder.userId) {
          logger.error({
            message: 'Order paid event missing userId. This should not happen.',
            order: nextOrder,
            actor,
          })
        }

        analyticsClient.trackEvent({
          event: EventName.ORDER_PAID,
          order: nextOrder,
          gaClientId: actor.gaClientId || null,
          userId: nextOrder.userId,
        })
      }
    }

    if (prevOrder.statusTemporary !== nextOrder.statusTemporary) {
      switch (nextOrder.statusTemporary) {
        case OrderStatusTemporary.IN_FULFILLMENT: {
          try {
            notificationService.sendNotification(
              'order:inFulfillment',
              {
                order: nextOrder,
              },
              {
                topicKey: `order:${nextOrder.id}`,
              },
            )
          } catch (error) {
            logger.child({ error }).error({
              message: 'Failed to create order in fulfillment notification',
            })
          }

          break
        }

        case OrderStatusTemporary.COMPLETED: {
          try {
            notificationService.sendNotification(
              'order:delivered',
              {
                order: nextOrder,
              },
              {
                topicKey: `order:${nextOrder.id}`,
              },
            )
          } catch (error) {
            logger.child({ error }).error({
              message: 'Failed to create order delivered notification',
            })
          }

          break
        }
      }
    }
  }

export { makeHandler }
