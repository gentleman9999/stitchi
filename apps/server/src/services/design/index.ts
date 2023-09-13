import makeDesignRepository, { DesignRepository } from './repository'
import { CreateDesignRequestFnInput } from './repository/create-design-request'
import {
  ConversationService,
  makeClient as makeConversationServiceClient,
} from '../conversation'
import { logger } from '../../telemetry'
import {
  NotificationClientService,
  makeClient as makeNotificationServiceClient,
} from '../notification'

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
  updateDesignRequest: DesignRepository['updateDesignRequest']

  getDesignRequest: DesignRepository['getDesignRequest']
  listDesignRequests: DesignRepository['listDesignRequests']
  listDesignRequestsCount: DesignRepository['listDesignRequestsCount']

  createDesignProof: DesignRepository['createDesignProof']
  getDesignProof: DesignRepository['getDesignProof']
  listDesignProofs: DesignRepository['listDesignProofs']
}

interface MakeClientParams {
  designRepository: DesignRepository
  conversationClient: ConversationService
  notificationClient: NotificationClientService
}

type MakeClientFn = (params?: MakeClientParams) => DesignService

const makeClient: MakeClientFn = (
  { designRepository, conversationClient, notificationClient } = {
    designRepository: makeDesignRepository(),
    conversationClient: makeConversationServiceClient(),
    notificationClient: makeNotificationServiceClient(),
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

      return designRequest
    },

    updateDesignRequest: async input => {
      try {
        return designRepository.updateDesignRequest({
          designRequest: {
            ...input.designRequest,
          },
        })
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

    createDesignProof: async input => {
      try {
        return designRepository.createDesignProof(input)
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
