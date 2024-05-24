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

import { Actor } from '../../types'
import {
  makeClient as makeAnalyticsClient,
  AnalyticsService,
  EventName,
} from '../../analytics'

export interface DesignRequestCreatedEventPayload {
  nextDesignRequest: DesignFactoryDesignRequest
  actor: Actor
}

interface MakeHandlerParams {
  conversationClient: ConversationService
  notificationClient: NotificationClientService
  userClient: UserService
  membershipClient: MembershipService
  analyticsClient: AnalyticsService
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
      analyticsClient,
    }: MakeHandlerParams = {
      conversationClient: makeConversationServiceClient(),
      notificationClient: makeNotificationClientServiceClient(),
      userClient: makeUserCilent(),
      membershipClient: makeMembershipClient(),
      analyticsClient: makeAnalyticsClient(),
    },
  ): DesignRequestCreatedHandler =>
  async ({ nextDesignRequest, actor }) => {
    analyticsClient.trackEvent({
      event: EventName.DESIGN_REQUESTED,
      designRequest: nextDesignRequest,
      gaClientId: actor.gaClientId,
      userId: actor.userId,
    })

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
