import {
  NotificationClientService,
  makeClient as makeNotificationServiceClient,
} from '../../notification'
import { NotificationChannelType } from '../../notification/db/notification-channel-table'
import {
  NotificationEventKey,
  NotificationEventResource,
} from '../../notification/db/notification-event-table'
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

            const notificationEventGroup =
              await notification.createNotificationEventGroup({
                notificationEventGroup: {
                  resourceId: nextOrder.id,
                  resource: NotificationEventResource.ORDER,
                  eventKey: NotificationEventKey.ORDER_CONFIRMED,
                },
              })

            await notification.createNotification({
              notification: {
                organizationId: nextOrder.organizationId,
                userId: nextOrder.userId,
                notificationEventGroupId: notificationEventGroup.id,
                eventKey: notificationEventGroup.eventKey,
                resourceId: notificationEventGroup.resourceId,
                resource: notificationEventGroup.resource,
                channels: [
                  {
                    channelType: NotificationChannelType.EMAIL,
                    htmlBody: customerTemplate.email.htmlBody,
                    textBody: customerTemplate.email.textBody,
                    recipientEmail: nextOrder.customerEmail,
                    recipientName: nextOrder.customerFirstName,
                    subject: customerTemplate.email.subject,
                  },
                  {
                    channelType: NotificationChannelType.WEB,
                    message: customerTemplate.web.message,
                  },
                ],
              },
            })
          } catch {
            throw new Error('Failed to create order confirmed notification')
          }
        }
      }
    }
  }

export { makeHandler }
