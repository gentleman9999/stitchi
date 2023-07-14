import { PrismaClient } from '@prisma/client'
import { DesignTable, table as makeDesignTable } from './db/design-table'
import { DesignFactoryDesignRequest } from './factory'
import makeDesignRepository, { DesignRepository } from './repository'
import { CreateDesignRequestFnInput } from './repository/create-design-request'
import {
  ConversationService,
  makeClient as makeConversationServiceClient,
} from '../conversation'
import { UpdateDesignRequestFnInput } from './repository/update-design-request'

const prisma = new PrismaClient()

export interface DesignService {
  createDesignRequest(input: {
    designRequest: Omit<
      CreateDesignRequestFnInput['designRequest'],
      'conversationId'
    >
  }): ReturnType<DesignRepository['createDesignRequest']>
  updateDesignRequest(input: {
    designRequest: Omit<
      UpdateDesignRequestFnInput['designRequest'],
      'approvedProof'
    >
  }): ReturnType<DesignRepository['updateDesignRequest']>

  getDesignRequest: DesignRepository['getDesignRequest']
  listDesignRequests: DesignRepository['listDesignRequests']

  approveDesignRequest(input: {
    designRequestId: string
    designProofId: string
  }): Promise<DesignFactoryDesignRequest>

  createDesignProof: DesignRepository['createDesignProof']
  getDesignProof: DesignRepository['getDesignProof']
  listDesignProofs: DesignRepository['listDesignProofs']
}

interface MakeClientParams {
  designTable: DesignTable
  designRepository: DesignRepository
  conversationClient: ConversationService
}

type MakeClientFn = (params?: MakeClientParams) => DesignService

const makeClient: MakeClientFn = (
  { designTable, designRepository, conversationClient } = {
    designTable: makeDesignTable(prisma),
    designRepository: makeDesignRepository(),
    conversationClient: makeConversationServiceClient(),
  },
) => {
  return {
    createDesignRequest: async input => {
      let conversation

      try {
        conversation = await conversationClient.createConversation({
          conversation: {},
        })
      } catch (error) {
        console.error(error)
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
        console.error(error)
        throw new Error('Failed to create design request')
      }
    },

    updateDesignRequest: async input => {
      try {
        return designRepository.updateDesignRequest({
          designRequest: {
            ...input.designRequest,
            approvedDesignProofId: null,
          },
        })
      } catch (error) {
        console.error(error)
        throw new Error('Failed to update design request')
      }
    },

    getDesignRequest: async input => {
      try {
        return designRepository.getDesignRequest(input)
      } catch (error) {
        console.error(error)
        throw new Error('Failed to get design request')
      }
    },

    listDesignRequests: async input => {
      try {
        return designRepository.listDesignRequests(input)
      } catch (error) {
        console.error(error)
        throw new Error('Failed to list design requests')
      }
    },

    approveDesignRequest: async input => {
      let designRequest

      try {
        designRequest = await designRepository.getDesignRequest({
          designRequestId: input.designRequestId,
        })
      } catch (error) {
        console.error(error)
        throw new Error('Failed to get design request')
      }

      let approvedProof

      try {
        approvedProof = await designRepository.getDesignProof({
          designProofId: input.designProofId,
        })
      } catch (error) {
        console.error(error)
        throw new Error('Failed to get design proof')
      }

      try {
        await designRepository.createDesign({
          design: {
            catalogProductId: approvedProof.catalogProductId,
            designRequestId: designRequest.id,
            organizationId: designRequest.organizationId,
            primaryImageFileId: approvedProof.primaryImageFileId,
            termsConditionsAgreed: true,
            userId: designRequest.userId,
            description: designRequest.description,
            name: designRequest.name,
            locations: approvedProof.locations.map(location => ({
              colorCount: location.colorCount || 0,
              placement: location.placement,
            })),
            variants: approvedProof.variants.map(variant => ({
              catalogProductColorId: variant.catalogProductColorId,
              images: variant.images.map(image => ({
                fileId: image.imageFileId,
                order: image.order,
              })),
            })),
          },
        })
      } catch (error) {
        console.error(error)
        throw new Error('Failed to create design')
      }

      let updatedDesignRequest

      try {
        updatedDesignRequest = await designRepository.updateDesignRequest({
          designRequest: {
            ...designRequest,
            status: 'APPROVED',
            approvedDesignProofId: approvedProof.id,
          },
        })
      } catch (error) {
        console.error(error)
        throw new Error('Failed to update design request')
      }

      return updatedDesignRequest
    },

    createDesignProof: async input => {
      try {
        return designRepository.createDesignProof(input)
      } catch (error) {
        console.error(error)
        throw new Error('Failed to create design proof')
      }
    },

    getDesignProof: async input => {
      try {
        return designRepository.getDesignProof(input)
      } catch (error) {
        console.error(error)
        throw new Error('Failed to get design proof')
      }
    },

    listDesignProofs: async input => {
      try {
        return designRepository.listDesignProofs(input)
      } catch (error) {
        console.error(error)
        throw new Error('Failed to list design proofs')
      }
    },
  }
}

export { makeClient }
