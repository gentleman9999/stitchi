import { logger } from '../../../telemetry'
import {
  makeHandler as makeNotificationCreatedHandler,
  NotificationCreatedEventPayload,
} from './notification-created'

type NotificationEventKey = 'notification.created'

interface BaseEvent {
  key: NotificationEventKey
}

interface NotificationCreatedEventInput extends BaseEvent {
  key: 'notification.created'
  payload: NotificationCreatedEventPayload
}

type NotificationEvent = NotificationCreatedEventInput

const makeEvents = (
  {
    notificationCreatedHandler,
  }: {
    notificationCreatedHandler: ReturnType<
      typeof makeNotificationCreatedHandler
    >
  } = {
    notificationCreatedHandler: makeNotificationCreatedHandler(),
  },
) => {
  return {
    emit: async (event: NotificationEvent) => {
      logger.child({ context: { event } }).info(`Handling event ${event.key}`)

      switch (event.key) {
        case 'notification.created': {
          return notificationCreatedHandler(event.payload)
        }
        default:
          throw new Error(`Unknown event key: ${event.key}`)
      }
    },
  }
}

export { makeEvents }
