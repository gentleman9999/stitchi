import {
  ConversationService,
  makeClient as makeConversationServiceClient,
} from '../../conversation'
import {
  makeClient as makeMembershipClient,
  MembershipService,
} from '../../membership'
import {
  NotificationClientService,
  makeClient as makeNotificationClientServiceClient,
} from '../../notification'
import { makeClient as makeUserCilent, UserService } from '../../user'
import { DesignRequestStatus } from '../db/design-request-table'
import { DesignFactoryDesignRequest } from '../factory'
import { designRequestSubmitted } from './transitions/design-request-submitted'

export interface DesignRequestUpdatedEventPayload {
  prevDesignRequest: DesignFactoryDesignRequest
  nextDesignRequest: DesignFactoryDesignRequest
}

interface MakeHandlerParams {
  conversationClient: ConversationService
  notificationClient: NotificationClientService
  userClient: UserService
  membershipClient: MembershipService
}

interface DesignRequestUpdatedHandler {
  (payload: DesignRequestUpdatedEventPayload): Promise<void>
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
  ): DesignRequestUpdatedHandler =>
  async ({ prevDesignRequest, nextDesignRequest }) => {
    // Make sure this happens before sending any notifications
    // We may want to move this out of async??? Can we ensure that the next step has access to the latest topic members???
    if (
      prevDesignRequest.membershipId === null &&
      nextDesignRequest.membershipId !== null
    ) {
      // Add newly assigned membership to notifications

      const topicKey = `designRequest:${nextDesignRequest.id}`

      await notificationClient.addSubscribersToNotificationTopic(topicKey, [
        nextDesignRequest.membershipId,
      ])
    }

    if (
      prevDesignRequest.status === DesignRequestStatus.DRAFT &&
      nextDesignRequest.status === DesignRequestStatus.SUBMITTED
    ) {
      await designRequestSubmitted(nextDesignRequest, {
        conversationClient,
        notificationClient,
        membershipClient,
        userClient,
      })
    }
  }

export { makeHandler }
