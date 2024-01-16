import { logger } from '../../../telemetry'
import {
  makeClient as makeMembershipClient,
  MembershipService,
} from '../../membership'

import {
  NotificationClientService,
  makeClient as makeNotificationClientServiceClient,
} from '../../notification'
import { makeClient as makeUserClient, UserService } from '../../user'
import { DesignFactoryProof } from '../factory'
import makeDesignRepository, { DesignRepository } from '../repository'

export interface DesignProofCreatedEventPayload {
  nextDesignProof: DesignFactoryProof
}

interface MakeHandlerParams {
  designRepository: DesignRepository
  notificationService: NotificationClientService
  membershipService: MembershipService
  userService: UserService
}

interface DesignProofCreatedHandler {
  (payload: DesignProofCreatedEventPayload): Promise<void>
}

const makeHandler =
  (
    {
      notificationService,
      designRepository,
      userService,
      membershipService,
    }: MakeHandlerParams = {
      designRepository: makeDesignRepository(),
      notificationService: makeNotificationClientServiceClient(),
      membershipService: makeMembershipClient(),
      userService: makeUserClient(),
    },
  ): DesignProofCreatedHandler =>
  async ({ nextDesignProof }) => {
    logger
      .child({
        context: {
          designProof: nextDesignProof,
        },
      })
      .info('Design proof created event handler')

    let designRequest

    try {
      const designRequestList = await designRepository.listDesignRequests({
        take: 1,
        where: {
          designRequestDesignProofs: {
            every: {
              designProofId: nextDesignProof.id,
            },
          },
        },
      })

      designRequest = designRequestList[0]

      if (!designRequest) {
        throw new Error('Design request not found')
      }
    } catch (error) {
      throw new Error('Failed to get design request')
    }

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
      membership = await membershipService.getMembership({
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
      designRequester = await userService.getUser({
        id: membership.userId,
      })
    } catch (error) {
      logger.error(error)
      throw new Error('Failed to get user')
    }

    try {
      await notificationService.sendNotification(
        'designRequestProof:created',
        {
          designRequest,
          designRequester,
        },
        {
          topicKey: `designRequest:${designRequest.id}`,
        },
      )
    } catch (error) {
      throw new Error('Failed to create design request submitted notification')
    }
  }

export { makeHandler }
