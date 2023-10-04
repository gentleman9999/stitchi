import {
  ConversationService,
  makeClient as makeConversationServiceClient,
} from '../../conversation'
import {
  NotificationClientService,
  makeClient as makeNotificationClientServiceClient,
} from '../../notification'
import { DesignRequestStatus } from '../db/design-request-table'
import { DesignFactoryDesignRequest } from '../factory'
import { designRequestSubmitted } from './transitions/design-request-submitted'

export interface DesignRequestCreatedEventPayload {
  nextDesignRequest: DesignFactoryDesignRequest
}

interface MakeHandlerParams {
  conversationClient: ConversationService
  notificationClient: NotificationClientService
}

interface DesignRequestCreatedHandler {
  (payload: DesignRequestCreatedEventPayload): Promise<void>
}

const makeHandler =
  (
    { conversationClient, notificationClient }: MakeHandlerParams = {
      conversationClient: makeConversationServiceClient(),
      notificationClient: makeNotificationClientServiceClient(),
    },
  ): DesignRequestCreatedHandler =>
  async ({ nextDesignRequest }) => {
    if (nextDesignRequest.status === DesignRequestStatus.SUBMITTED) {
      await designRequestSubmitted(nextDesignRequest, {
        conversationClient,
        notificationClient,
      })
    }
  }

export { makeHandler }
