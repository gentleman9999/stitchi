import { logger } from '../../../telemetry'
import {
  makeHandler as makeFulfillmentCreatedHandler,
  FulfillmentCreatedEventPayload,
} from './fulfillment-created'

type FulfillmentEventType = 'fulfillment.created'

interface BaseEvent {
  type: FulfillmentEventType
}

interface FulfillmentCreatedEventInput extends BaseEvent {
  type: 'fulfillment.created'
  payload: FulfillmentCreatedEventPayload
}

type FulfillmentEvent = FulfillmentCreatedEventInput

const makeEvents = (
  {
    fulfillmentCreatedHandler,
  }: {
    fulfillmentCreatedHandler: ReturnType<typeof makeFulfillmentCreatedHandler>
  } = { fulfillmentCreatedHandler: makeFulfillmentCreatedHandler() },
) => {
  return {
    emit: async (event: FulfillmentEvent) => {
      logger.child({ context: { event } }).info(`Handling event ${event.type}`)

      switch (event.type) {
        case 'fulfillment.created':
          return fulfillmentCreatedHandler(event.payload)
      }
    },
  }
}

export { makeEvents }
