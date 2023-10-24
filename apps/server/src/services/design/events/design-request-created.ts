import {
  ConversationService,
  makeClient as makeConversationServiceClient,
} from '../../conversation'
import {
  NotificationClientService,
  makeClient as makeNotificationClientServiceClient,
} from '../../notification'
import { makeClient as makeUserCilent, UserService } from '../../user'
import {
  makeClient as makeMembershipClient,
  MembershipService,
} from '../../membership'
import { DesignRequestStatus } from '../db/design-request-table'
import { DesignFactoryDesignRequest } from '../factory'
import { designRequestSubmitted } from './transitions/design-request-submitted'

export interface DesignRequestCreatedEventPayload {
  nextDesignRequest: DesignFactoryDesignRequest
}

interface MakeHandlerParams {
  conversationClient: ConversationService
  notificationClient: NotificationClientService
  userClient: UserService
  membershipClient: MembershipService
}

interface DesignRequestCreatedHandler {
  (payload: DesignRequestCreatedEventPayload): Promise<void>
}

const makeHandler =
  (
    {
      conversationClient,
      notificationClient,
      membershipClient,
      userClient,
    }: MakeHandlerParams = {
      conversationClient: makeConversationServiceClient(),
      notificationClient: makeNotificationClientServiceClient(),
      userClient: makeUserCilent(),
      membershipClient: makeMembershipClient(),
    },
  ): DesignRequestCreatedHandler =>
  async ({ nextDesignRequest }) => {
    if (nextDesignRequest.status === DesignRequestStatus.SUBMITTED) {
      await designRequestSubmitted(nextDesignRequest, {
        conversationClient,
        notificationClient,
        membershipClient,
        userClient,
      })
    }
  }

export { makeHandler }
