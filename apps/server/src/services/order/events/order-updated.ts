import { addMinutes } from 'date-fns'
import { logger } from '../../../telemetry'
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
  notification: NotificationClientService
}

interface OrderUpdatedEventHandler {
  (payload: OrderUpdatedEventPayload): Promise<void>
}

const makeHandler =
  (
    { notification }: MakeHandlerParams = {
      notification: makeNotificationServiceClient(),
    },
  ): OrderUpdatedEventHandler =>
  async ({ prevOrder, nextOrder }) => {
    if (!nextOrder.customerEmail) return

    if (prevOrder.type !== nextOrder.type) {
      logger.error('TODO: Implement order updated notification template')
      // switch (nextOrder.type) {
      //   case OrderRecordType.CONFIRMED: {
      //     try {
      //       const template = notification.renderNotificationTemplate({
      //         id: 'customer.order.confirmed',
      //         params: { order: nextOrder },
      //       })
      //       await notification.createNotification({
      //         notification: {
      //           organizationId: nextOrder.organizationId,
      //           userId: nextOrder.userId,
      //           sendAt: addMinutes(new Date(), 0),
      //           sendStatus: 'NOT_SENT',
      //           type: 'ORDER_CONFIRMED',
      //           email: {
      //             recipientEmail: nextOrder.customerEmail,
      //             recipientName:
      //               nextOrder.customerFirstName +
      //               ' ' +
      //               nextOrder.customerLastName,
      //             subject: template.subject,
      //             htmlBody: template.htmlBody,
      //             textBody: '',
      //           },
      //         },
      //       })
      //     } catch (error) {
      //       console.error(error)
      //       throw new Error('Failed to create notification')
      //     }
      //     break
      //   }
      // }
    }
  }

export { makeHandler }
