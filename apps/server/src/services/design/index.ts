import makeDesignRepository, { DesignRepository } from './repository'
import { CreateDesignRequestFnInput } from './repository/create-design-request'
import {
  ConversationService,
  makeClient as makeConversationServiceClient,
} from '../conversation'
import {
  NotificationClientService,
  makeClient as makeNotificationServiceClient,
} from '../notification'
import { DesignEvents, makeEvents as makeDesignEvents } from './events'
import { UpdateDesignRequestFnInput } from './repository/update-design-request'
import { DesignFactoryDesignRequest } from './factory'
import { DesignRequestStatus } from './db/design-request-table'
import {
  GoogleAnalyticsClient,
  GoogleAnalyticsEventEventName,
} from '../../google-analytics'

export interface DesignService {
  createDesign: DesignRepository['createDesign']
  getDesign: DesignRepository['getDesign']
  listDesigns: DesignRepository['listDesigns']
  listDesignsCount: DesignRepository['listDesignsCount']

  createDesignRequest(input: {
    designRequest: Omit<
      CreateDesignRequestFnInput['designRequest'],
      'conversationId'
    >
  }): ReturnType<DesignRepository['createDesignRequest']>
  updateDesignRequest: (
    input: UpdateDesignRequestFnInput,
  ) => Promise<
    Awaited<
      ReturnType<DesignRepository['updateDesignRequest']>
    >['nextDesignRequest']
  >

  getDesignRequest: DesignRepository['getDesignRequest']
  listDesignRequests: DesignRepository['listDesignRequests']
  listDesignRequestsCount: DesignRepository['listDesignRequestsCount']

  archiveDesignRequest: (input: {
    designRequestId: string
  }) => Promise<DesignFactoryDesignRequest>

  createDesignProof: DesignRepository['createDesignProof']
  getDesignProof: DesignRepository['getDesignProof']
  listDesignProofs: DesignRepository['listDesignProofs']
}

interface MakeClientParams {
  designRepository: DesignRepository
  conversationClient: ConversationService
  notificationClient: NotificationClientService
  designEvents: DesignEvents
  googleAnalyticsClient: GoogleAnalyticsClient | null
}

type MakeClientFn = (params?: MakeClientParams) => DesignService

const makeClient: MakeClientFn = (
  {
    designRepository,
    conversationClient,
    notificationClient,
    designEvents,
    googleAnalyticsClient,
  } = {
    designRepository: makeDesignRepository(),
    conversationClient: makeConversationServiceClient(),
    notificationClient: makeNotificationServiceClient(),
    designEvents: makeDesignEvents(),
    googleAnalyticsClient: null,
  },
) => {
  return {
    createDesign: async input => {
      try {
        return designRepository.createDesign(input)
      } catch (error) {
        throw new Error('Failed to create design')
      }
    },
    getDesign: async input => {
      try {
        return designRepository.getDesign(input)
      } catch (error) {
        throw new Error('Failed to get design')
      }
    },
    listDesigns: async input => {
      try {
        return designRepository.listDesigns(input)
      } catch (error) {
        throw new Error('Failed to list designs')
      }
    },
    listDesignsCount: async input => {
      try {
        return designRepository.listDesignsCount(input)
      } catch (error) {
        throw new Error('Failed to list designs count')
      }
    },
    createDesignRequest: async input => {
      let conversation

      try {
        conversation = await conversationClient.createConversation({
          conversation: {},
        })
      } catch (error) {
        throw new Error('Failed to create conversation')
      }

      let designRequest

      try {
        designRequest = await designRepository.createDesignRequest({
          designRequest: {
            ...input.designRequest,
            conversationId: conversation.id,
          },
        })
      } catch (error) {
        throw new Error('Failed to create design request')
      }

      const topicKey = `designRequest:${designRequest.id}`

      const members: string[] = []

      if (designRequest.membershipId) {
        members.push(designRequest.membershipId)
      }

      try {
        await notificationClient.createNotificationTopic(topicKey, members)
      } catch (error) {
        throw new Error('Failed to create notification topic')
      }

      designEvents.emit({
        type: 'designRequest.created',
        payload: {
          nextDesignRequest: designRequest,
        },
      })

      googleAnalyticsClient?.trackEvents({
        events: [
          {
            name: GoogleAnalyticsEventEventName.NEW_DESIGN_REQUEST,
            params: {
              design_request_id: designRequest.id,
              design_request_name: designRequest.name,
              design_request_product_id: designRequest.product.id,
            },
          },
        ],
      })

      return designRequest
    },

    updateDesignRequest: async input => {
      try {
        const updateDesignRequestPayload =
          await designRepository.updateDesignRequest({
            designRequest: {
              ...input.designRequest,
            },
          })

        designEvents.emit({
          type: 'designRequest.updated',
          payload: updateDesignRequestPayload,
        })

        return updateDesignRequestPayload.nextDesignRequest
      } catch (error) {
        throw new Error('Failed to update design request')
      }
    },

    getDesignRequest: async input => {
      try {
        return designRepository.getDesignRequest(input)
      } catch (error) {
        throw new Error('Failed to get design request')
      }
    },

    listDesignRequests: async input => {
      try {
        return designRepository.listDesignRequests(input)
      } catch (error) {
        throw new Error('Failed to list design requests')
      }
    },

    listDesignRequestsCount: async input => {
      try {
        return designRepository.listDesignRequestsCount(input)
      } catch (error) {
        throw new Error('Failed to list design requests count')
      }
    },

    archiveDesignRequest: async input => {
      let designRequest

      try {
        designRequest = await designRepository.getDesignRequest({
          designRequestId: input.designRequestId,
        })
      } catch (error) {
        throw new Error('Failed to get design request')
      }

      try {
        designRequest = (
          await designRepository.updateDesignRequest({
            designRequest: {
              ...designRequest,
              status: DesignRequestStatus.ARCHIVED,
            },
          })
        ).nextDesignRequest
      } catch (error) {
        throw new Error('Failed to archive design request')
      }

      return designRequest
    },

    createDesignProof: async input => {
      try {
        const designProof = await designRepository.createDesignProof(input)

        designEvents.emit({
          type: 'designProof.created',
          payload: {
            nextDesignProof: designProof,
          },
        })

        return designProof
      } catch (error) {
        throw new Error('Failed to create design proof')
      }
    },

    getDesignProof: async input => {
      try {
        return designRepository.getDesignProof(input)
      } catch (error) {
        throw new Error('Failed to get design proof')
      }
    },

    listDesignProofs: async input => {
      try {
        return designRepository.listDesignProofs(input)
      } catch (error) {
        throw new Error('Failed to list design proofs')
      }
    },
  }
}

export { makeClient }
