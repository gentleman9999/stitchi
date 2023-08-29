import { addMinutes } from 'date-fns'
import {
  NotificationClientService,
  makeClient as makeNotificationServiceClient,
} from '../../notification'
import { NotificationChannelType } from '../../notification/db/notification-channel-table'
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
      console.error('TODO: Implement order updated notification template')

      switch (nextOrder.type) {
        case OrderRecordType.CONFIRMED: {
          try {
            const customerTemplateRenderer =
              notification.getNotificationTemplate('order.confirmed.customer')

            const customerTemplate = customerTemplateRenderer.render({
              order: {
                id: nextOrder.id,
                humanId: nextOrder.humanReadableId,
                lineItems: nextOrder.items.map(item => ({
                  name: item.title,
                  priceCents: item.unitPriceCents,
                  quantity: item.quantity,
                  description: '',
                  imgSrc: '',
                })),
              },
              recipient: {
                name: nextOrder.customerFirstName || nextOrder.customerEmail,
              },
            })

            await notification.createNotification({
              notification: {
                organizationId: nextOrder.organizationId,
                userId: nextOrder.userId,
                notificationGroupId: '',
                type: 'ORDER_CONFIRMED',
                channels: [
                  {
                    type: NotificationChannelType.EMAIL,
                    htmlBody: customerTemplate.email.htmlBody,
                    textBody: customerTemplate.email.textBody,
                    recipientEmail: nextOrder.customerEmail,
                    recipientName: nextOrder.customerFirstName,
                    subject: customerTemplate.email.subject,
                  },
                ],
              },
            })
          } catch {
            throw new Error('Failed to create notification')
          }
        }
      }
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
