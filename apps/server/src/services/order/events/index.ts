import { logger } from '../../../telemetry'
import {
  makeHandler as makeOrderUpdatedHander,
  OrderUpdatedEventPayload,
} from './order-updated'

type OrderEventType = 'order.updated'

interface BaseEvent {
  type: OrderEventType
}

interface OrderUpdatedEventInput extends BaseEvent {
  type: 'order.updated'
  payload: OrderUpdatedEventPayload
}

type OrderEvent = OrderUpdatedEventInput

const makeEvents = (
  {
    orderUpdatedHandler,
  }: {
    orderUpdatedHandler: ReturnType<typeof makeOrderUpdatedHander>
  } = { orderUpdatedHandler: makeOrderUpdatedHander() },
) => {
  return {
    emit: async (event: OrderEvent) => {
      logger.child({ context: { event } }).info(`Handling event ${event.type}`)

      switch (event.type) {
        case 'order.updated':
          return orderUpdatedHandler(event.payload)
      }
    },
  }
}

export { makeEvents }
