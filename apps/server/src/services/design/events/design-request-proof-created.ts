import { DesignService, makeClient as makeDesignService } from '..'
import { logger } from '../../../telemetry'

import {
  NotificationClientService,
  makeClient as makeNotificationClientServiceClient,
} from '../../notification'
import { DesignFactoryProof } from '../factory'

export interface DesignProofCreatedEventPayload {
  nextDesignProof: DesignFactoryProof
}

interface MakeHandlerParams {
  designService: DesignService
  notificationService: NotificationClientService
}

interface DesignProofCreatedHandler {
  (payload: DesignProofCreatedEventPayload): Promise<void>
}

const makeHandler =
  (
    { notificationService, designService }: MakeHandlerParams = {
      designService: makeDesignService(),
      notificationService: makeNotificationClientServiceClient(),
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
      const designRequestList = await designService.listDesignRequests({
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

    try {
      await notificationService.sendNotification(
        'designRequestProof:created',
        {
          designRequest,
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
