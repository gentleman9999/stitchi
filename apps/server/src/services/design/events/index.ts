import { logger } from '../../../telemetry'
import {
  DesignRequestUpdatedEventPayload,
  makeHandler as makeDesignRequestUpdatedHandler,
} from './design-request-updated'

import {
  DesignProofCreatedEventPayload,
  makeHandler as makeDesignProofCreatedHandler,
} from './design-request-proof-created'
import {
  DesignRequestCreatedEventPayload,
  makeHandler as makeDesignRequestCreatedHandler,
} from './design-request-created'

import { assertNever } from '../../../utils/assert-never'

type DesignRequestEventType =
  | 'designRequest.created'
  | 'designRequest.updated'
  | 'designProof.created'

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

interface DesignRequestCreatedEventInput extends BaseEvent {
  type: 'designRequest.created'
  payload: DesignRequestCreatedEventPayload
}

type DesignRequestEvent =
  | DesignRequestUpdatedEventInput
  | DesignProofCreatedEventInput
  | DesignRequestCreatedEventInput

const makeEvents = (
  {
    designRequestCreatedHandler,
    designRequestUpdatedHandler,
    designProofCreatedHandler,
  }: {
    designRequestCreatedHandler: ReturnType<
      typeof makeDesignRequestCreatedHandler
    >
    designRequestUpdatedHandler: ReturnType<
      typeof makeDesignRequestUpdatedHandler
    >
    designProofCreatedHandler: ReturnType<typeof makeDesignProofCreatedHandler>
  } = {
    designRequestCreatedHandler: makeDesignRequestCreatedHandler(),
    designRequestUpdatedHandler: makeDesignRequestUpdatedHandler(),
    designProofCreatedHandler: makeDesignProofCreatedHandler(),
  },
) => {
  return {
    emit: async (event: DesignRequestEvent) => {
      logger
        .child({ context: { event: JSON.stringify(event) } })
        .info(`Handling event ${event.type}`)

      switch (event.type) {
        case 'designRequest.created':
          return designRequestCreatedHandler(event.payload)
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
