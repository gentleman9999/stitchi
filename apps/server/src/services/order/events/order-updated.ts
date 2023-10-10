import {
  NotificationClientService,
  makeClient as makeNotificationServiceClient,
} from '../../notification'

import { OrderRecordType } from '../db/order-table'
import { OrderFactoryOrder } from '../factory'

export interface OrderUpdatedEventPayload {
  prevOrder: OrderFactoryOrder
  nextOrder: OrderFactoryOrder
}

interface MakeHandlerParams {
  notificationService: NotificationClientService
}

interface OrderUpdatedEventHandler {
  (payload: OrderUpdatedEventPayload): Promise<void>
}

const makeHandler =
  (
    { notificationService }: MakeHandlerParams = {
      notificationService: makeNotificationServiceClient(),
    },
  ): OrderUpdatedEventHandler =>
  async ({ prevOrder, nextOrder }) => {
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
              'order:confirmed',
              {
                order: nextOrder,
              },
              {
                topicKey: `order:${nextOrder.id}`,
              },
            )
          } catch {
            throw new Error('Failed to create order confirmed notification')
          }
        }
      }
    }
  }

export { makeHandler }
