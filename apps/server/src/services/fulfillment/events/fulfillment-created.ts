import {
  NotificationClientService,
  makeClient as makeNotificationServiceClient,
} from '../../notification'
import { FulfillmentFactoryFulfillment } from '../factory'

export interface FulfillmentCreatedEventPayload {
  prevFulfillment: FulfillmentFactoryFulfillment
  nextFulfillment: FulfillmentFactoryFulfillment
}

interface MakeHandlerParams {
  notificationService: NotificationClientService
}

interface FulfillmentCreatedEventHandler {
  (payload: FulfillmentCreatedEventPayload): Promise<void>
}

const makeHandler =
  (
    { notificationService }: MakeHandlerParams = {
      notificationService: makeNotificationServiceClient(),
    },
  ): FulfillmentCreatedEventHandler =>
  async ({ nextFulfillment }) => {
    // Create subscription to this fulfillment, customers will want to know when
    // a fulfillment is updated (either completed or partially completed).
    if (nextFulfillment.membershipId !== null) {
      // Add newly assigned membership to notifications
      const topicKey = `fulfillment:${nextFulfillment.id}`

      await notificationService.addSubscribersToNotificationTopic(topicKey, [
        nextFulfillment.membershipId,
      ])
    }

    // TODO(custompro98): Break fulfillment into shipments w/ requirements.
    // Shipment creation will emit `shipment:created` event.
    // Event will trigger attempt to fulfill immediately.
  }

export { makeHandler }
