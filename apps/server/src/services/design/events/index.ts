import { logger } from '../../../telemetry'
import {
  DesignRequestUpdatedEventPayload,
  makeHandler as makeDesignRequestUpdatedHandler,
} from './design-request-updated'

import {
  DesignProofCreatedEventPayload,
  makeHandler as makeDesignProofCreatedHandler,
} from './design-request-proof-created'
import { assertNever } from '../../../utils/assert-never'

type DesignRequestEventType = 'designRequest.updated' | 'designProof.created'

interface BaseEvent {
  type: DesignRequestEventType
}

interface DesignRequestUpdatedEventInput extends BaseEvent {
  type: 'designRequest.updated'
  payload: DesignRequestUpdatedEventPayload
}

interface DesignProofCreatedEventInput extends BaseEvent {
  type: 'designProof.created'
  payload: DesignProofCreatedEventPayload
}

type DesignRequestEvent =
  | DesignRequestUpdatedEventInput
  | DesignProofCreatedEventInput

const makeEvents = (
  {
    designRequestUpdatedHandler,
    designProofCreatedHandler,
  }: {
    designRequestUpdatedHandler: ReturnType<
      typeof makeDesignRequestUpdatedHandler
    >
    designProofCreatedHandler: ReturnType<typeof makeDesignProofCreatedHandler>
  } = {
    designRequestUpdatedHandler: makeDesignRequestUpdatedHandler(),
    designProofCreatedHandler: makeDesignProofCreatedHandler(),
  },
) => {
  return {
    emit: async (event: DesignRequestEvent) => {
      logger.child({ context: { event } }).info(`Handling event ${event.type}`)

      switch (event.type) {
        case 'designRequest.updated':
          return designRequestUpdatedHandler(event.payload)
        case 'designProof.created':
          return designProofCreatedHandler(event.payload)
        default:
          return assertNever(event)
      }
    },
  }
}

export type DesignEvents = ReturnType<typeof makeEvents>

export { makeEvents }
