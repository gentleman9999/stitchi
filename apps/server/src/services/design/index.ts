import makeDesignRepository, { DesignRepository } from './repository'
import { CreateDesignRequestFnInput } from './repository/create-design-request'
import {
  ConversationService,
  makeClient as makeConversationServiceClient,
} from '../conversation'
import { logger } from '../../telemetry'

export interface DesignService {
  createDesign: DesignRepository['createDesign']
  getDesign: DesignRepository['getDesign']
  listDesigns: DesignRepository['listDesigns']

  createDesignRequest(input: {
    designRequest: Omit<
      CreateDesignRequestFnInput['designRequest'],
      'conversationId'
    >
  }): ReturnType<DesignRepository['createDesignRequest']>
  updateDesignRequest: DesignRepository['updateDesignRequest']

  getDesignRequest: DesignRepository['getDesignRequest']
  listDesignRequests: DesignRepository['listDesignRequests']

  createDesignProof: DesignRepository['createDesignProof']
  getDesignProof: DesignRepository['getDesignProof']
  listDesignProofs: DesignRepository['listDesignProofs']
}

interface MakeClientParams {
  designRepository: DesignRepository
  conversationClient: ConversationService
}

type MakeClientFn = (params?: MakeClientParams) => DesignService

const makeClient: MakeClientFn = (
  { designRepository, conversationClient } = {
    designRepository: makeDesignRepository(),
    conversationClient: makeConversationServiceClient(),
  },
) => {
  return {
    createDesign: async input => {
      try {
        return designRepository.createDesign(input)
      } catch (error) {
        logger.error(error)
        throw new Error('Failed to create design')
      }
    },
    getDesign: async input => {
      try {
        return designRepository.getDesign(input)
      } catch (error) {
        logger.error(error)
        throw new Error('Failed to get design')
      }
    },
    listDesigns: async input => {
      try {
        return designRepository.listDesigns(input)
      } catch (error) {
        logger.error(error)
        throw new Error('Failed to list designs')
      }
    },
    createDesignRequest: async input => {
      let conversation

      try {
        conversation = await conversationClient.createConversation({
          conversation: {},
        })
      } catch (error) {
        logger.error(error)
        throw new Error('Failed to create conversation')
      }

      try {
        return designRepository.createDesignRequest({
          designRequest: {
            ...input.designRequest,
            conversationId: conversation.id,
          },
        })
      } catch (error) {
        logger.error(error)
        throw new Error('Failed to create design request')
      }
    },

    updateDesignRequest: async input => {
      try {
        return designRepository.updateDesignRequest({
          designRequest: {
            ...input.designRequest,
          },
        })
      } catch (error) {
        logger.error(error)
        throw new Error('Failed to update design request')
      }
    },

    getDesignRequest: async input => {
      try {
        return designRepository.getDesignRequest(input)
      } catch (error) {
        logger.error(error)
        throw new Error('Failed to get design request')
      }
    },

    listDesignRequests: async input => {
      try {
        return designRepository.listDesignRequests(input)
      } catch (error) {
        logger.error(error)
        throw new Error('Failed to list design requests')
      }
    },

    createDesignProof: async input => {
      try {
        return designRepository.createDesignProof(input)
      } catch (error) {
        logger.error(error)
        throw new Error('Failed to create design proof')
      }
    },

    getDesignProof: async input => {
      try {
        return designRepository.getDesignProof(input)
      } catch (error) {
        logger.error(error)
        throw new Error('Failed to get design proof')
      }
    },

    listDesignProofs: async input => {
      try {
        return designRepository.listDesignProofs(input)
      } catch (error) {
        logger.error(error)
        throw new Error('Failed to list design proofs')
      }
    },
  }
}

export { makeClient }
