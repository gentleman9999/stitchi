import { logger } from '../../../telemetry'
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
import { designRequestRejected } from './transitions/design-request-rejected'
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
    const topicKey = `designRequest:${nextDesignRequest.id}`

    //
    // ADD USERS TO NOTIFICATION TOPIC
    //
    // Make sure this happens before sending any notifications
    // We may want to move this out of async??? Can we ensure that the next step has access to the latest topic members???
    //

    if (
      prevDesignRequest.membershipId === null &&
      nextDesignRequest.membershipId !== null
    ) {
      // Add newly assigned membership to notifications

      await notificationClient.addSubscribersToNotificationTopic(topicKey, [
        nextDesignRequest.membershipId,
      ])
    }

    const artistIdsToAdd = nextDesignRequest.artists
      .filter(
        artist =>
          !prevDesignRequest.artists.find(
            prevArtist => prevArtist.id === artist.id,
          )?.artistMembershipId,
      )
      .map(artist => artist.artistMembershipId)

    const artistIdsToRemove = prevDesignRequest.artists
      .filter(
        artist =>
          !nextDesignRequest.artists.find(
            nextArtist => nextArtist.id === artist.id,
          ),
      )
      .map(artist => artist.artistMembershipId)

    try {
      await notificationClient.addSubscribersToNotificationTopic(
        topicKey,
        artistIdsToAdd,
      )
    } catch (error) {
      logger
        .child({
          context: {
            error,
            artistIdsToAdd,
            topicKey,
          },
        })
        .error('Failed to add subscribers to notification topic')
    }

    try {
      await notificationClient.removeSubscribersFromNotificationTopic(
        topicKey,
        artistIdsToRemove,
      )
    } catch (error) {
      logger
        .child({
          context: {
            error,
            artistIdsToRemove,
            topicKey,
          },
        })
        .error('Failed to remove subscribers from notification topic')
    }

    //
    // END - ADD USERS TO NOTIFICATION TOPIC
    //

    //
    // SEND NOTIFICATIONS
    //

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

    if (
      prevDesignRequest.status !== DesignRequestStatus.REJECTED &&
      nextDesignRequest.status === DesignRequestStatus.REJECTED
    ) {
      await designRequestRejected(nextDesignRequest, {
        membershipClient,
        notificationClient,
        userClient,
      })
    }

    if (
      prevDesignRequest.revisionRequests.length <
      nextDesignRequest.revisionRequests.length
    ) {
      // TODO: Send notification to artist that revision has been requested
      // Send notification to requester that revision has been requested

      if (!nextDesignRequest.membershipId) {
        logger
          .child({
            context: {
              designRequest: nextDesignRequest,
            },
          })
          .error(
            `Membership not found for submitted design request ${nextDesignRequest.id}. This should not happen.`,
          )
        return
      }

      let membership

      try {
        membership = await membershipClient.getMembership({
          membershipId: nextDesignRequest.membershipId,
        })

        if (!membership) {
          logger
            .child({
              context: {
                designRequest: nextDesignRequest,
              },
            })
            .error(
              `Membership not found for submitted design request ${nextDesignRequest.id}. This should not happen.`,
            )
          return
        }
      } catch (error) {
        logger.error(error)
        throw new Error('Failed to get membership')
      }

      if (!membership.userId) {
        logger
          .child({
            context: {
              designRequest: nextDesignRequest,
            },
          })
          .error(
            `User not found for submitted design request ${nextDesignRequest.id}. This should not happen.`,
          )
        return
      }

      let designRequester

      try {
        designRequester = await userClient.getUser({
          id: membership.userId,
        })
      } catch (error) {
        logger.error(error)
        throw new Error('Failed to get user')
      }

      try {
        await notificationClient.sendNotification(
          'designRequestRevision:created',
          { designRequest: nextDesignRequest, designRequester },
          { topicKey },
        )
      } catch (error) {
        logger
          .child({ context: { error, designRequest: nextDesignRequest } })
          .error('Failed to send notification')
      }
    }
  }

export { makeHandler }
