import { logger } from '../../../telemetry'
import {
  DesignRequestUpdatedEventPayload,
  makeHandler as makeDesignRequestUpdatedHandler,
} from './design-request-updated'

type DesignRequestEventType = 'designRequest.updated'

interface BaseEvent {
  type: DesignRequestEventType
}

interface DesignRequestUpdatedEventInput extends BaseEvent {
  type: 'designRequest.updated'
  payload: DesignRequestUpdatedEventPayload
}

type DesignRequestEvent = DesignRequestUpdatedEventInput

const makeEvents = (
  {
    designRequestUpdatedHandler,
  }: {
    designRequestUpdatedHandler: ReturnType<
      typeof makeDesignRequestUpdatedHandler
    >
  } = {
    designRequestUpdatedHandler: makeDesignRequestUpdatedHandler(),
  },
) => {
  return {
    emit: async (event: DesignRequestEvent) => {
      logger.child({ context: { event } }).info(`Handling event ${event.type}`)

      switch (event.type) {
        case 'designRequest.updated':
          return designRequestUpdatedHandler(event.payload)
      }
    },
  }
}

export { makeEvents }
