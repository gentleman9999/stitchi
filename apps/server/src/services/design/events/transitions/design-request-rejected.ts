import { logger } from '../../../../telemetry'
import { MembershipService } from '../../../membership'
import { NotificationClientService } from '../../../notification'
import { UserService } from '../../../user'
import { DesignFactoryDesignRequest } from '../../factory'

export const designRequestRejected = async (
  designRequest: DesignFactoryDesignRequest,
  {
    membershipClient,
    notificationClient,
    userClient,
  }: {
    userClient: UserService
    membershipClient: MembershipService
    notificationClient: NotificationClientService
  },
) => {
  const topicKey = `designRequest:${designRequest.id}`

  if (!designRequest.membershipId) {
    logger
      .child({
        context: {
          designRequest: designRequest,
        },
      })
      .error(
        `Design request ${designRequest.id} does not have membership ID. This should not happen.`,
      )
    return
  }

  let membership

  try {
    membership = await membershipClient.getMembership({
      membershipId: designRequest.membershipId,
    })

    if (!membership) {
      logger
        .child({
          context: {
            designRequest: designRequest,
          },
        })
        .error(
          `Membership not found for submitted design request ${designRequest.id}. This should not happen.`,
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
          designRequest: designRequest,
        },
      })
      .error(
        `User not found for submitted design request ${designRequest.id}. This should not happen.`,
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
      'designRequest:rejected',
      {
        designRequest,
        designRequester,
      },
      {
        topicKey,
      },
    )
  } catch (error) {
    logger.error(error)
    throw new Error('Failed to send notification')
  }
}
