import { GraphQLError } from 'graphql'
import { inputObjectType, mutationField, nonNull, objectType } from 'nexus'
import { notEmpty } from '../../../utils'
import {
  designFactoryDesignToGraphql,
  designRequestFactoryToGrahpql,
} from '../../serializers/design'

export const DesignRequestProductColorCreateInput = inputObjectType({
  name: 'DesignRequestProductColorCreateInput',
  definition(t) {
    t.nonNull.id('catalogProductColorId')
    t.nullable.string('hexCode')
    t.nullable.string('name')
  },
})

export const DesignRequestProductCreateInput = inputObjectType({
  name: 'DesignRequestProductCreateInput',
  definition(t) {
    t.nonNull.id('catalogProductId')
    t.nonNull.list.nonNull.field('colors', {
      type: 'DesignRequestProductColorCreateInput',
    })
  },
})

export const DesignRequestCreateInput = inputObjectType({
  name: 'DesignRequestCreateInput',
  definition(t) {
    t.nullable.string('name')
    t.nullable.string('description')
    t.nullable.string('useCase')
    t.nonNull.field('product', {
      type: 'DesignRequestProductCreateInput',
    })
  },
})

export const DesignRequestCreatePayload = objectType({
  name: 'DesignRequestCreatePayload',
  definition(t) {
    t.nullable.field('designRequest', { type: 'DesignRequest' })
  },
})

export const designRequestCreate = mutationField('designRequestCreate', {
  type: 'DesignRequestCreatePayload',
  args: {
    input: nonNull(DesignRequestCreateInput),
  },
  resolve: async (_, { input }, { design, organizationId, userId }) => {
    let designRequest

    try {
      designRequest = await design.createDesignRequest({
        designRequest: {
          organizationId: organizationId || null,
          approvedDesignProofId: null,
          userId: userId || null,
          status: 'DRAFT',
          name: input.name || 'No name',
          description: input.description || null,
          metadata: {
            useCase: input.useCase || undefined,
          },
          files: [],
          designLocations: [],
          artists: [],
          product: {
            catalogProductId: input.product.catalogProductId,
            colors: input.product.colors.map(color => ({
              catalogProductColorId: color.catalogProductColorId,
              hexCode: color.hexCode || null,
              name: color.name || null,
            })),
          },
        },
      })
    } catch (error) {
      console.log(error)
      throw new GraphQLError('Unable to create design request')
    }

    return {
      designRequest: designRequestFactoryToGrahpql(designRequest),
    }
  },
})

export const DesignRequestUpdateLocationInput = inputObjectType({
  name: 'DesignRequestUpdateLocationInput',
  definition(t) {
    t.nullable.id('designLocationId')
    t.nullable.string('placement')
    t.nullable.string('description')
    t.nullable.list.nonNull.id('fileIds')
  },
})

export const DesignRequestUpdateInput = inputObjectType({
  name: 'DesignRequestUpdateInput',
  definition(t) {
    t.nonNull.id('designRequestId')
    t.nullable.string('name')
    t.nullable.string('description')
    t.nullable.string('useCase')
    t.nullable.list.nonNull.id('fileIds')
    t.nullable.list.nonNull.field('locations', {
      type: 'DesignRequestUpdateLocationInput',
    })
  },
})

export const DesignRequestUpdatePayload = objectType({
  name: 'DesignRequestUpdatePayload',
  definition(t) {
    t.nullable.field('designRequest', { type: 'DesignRequest' })
  },
})

export const designRequestUpdate = mutationField('designRequestUpdate', {
  type: 'DesignRequestUpdatePayload',
  args: {
    input: nonNull('DesignRequestUpdateInput'),
  },
  resolve: async (_, { input }, { design, organizationId, userId }) => {
    let foundDesignRequest

    try {
      foundDesignRequest = await design.getDesignRequest({
        designRequestId: input.designRequestId,
      })
    } catch (error) {
      console.log(error)
      throw new GraphQLError('Unable to find design request')
    }

    if (
      notEmpty(foundDesignRequest.organizationId) &&
      foundDesignRequest.organizationId !== organizationId
    ) {
      throw new GraphQLError('Forbidden')
    }

    let designRequest

    try {
      designRequest = await design.updateDesignRequest({
        designRequest: {
          id: foundDesignRequest.id,
          approvedDesignProofId: foundDesignRequest.approvedDesignProofId,
          conversationId: foundDesignRequest.conversationId,
          description: input.description || foundDesignRequest.description,
          name: input.name || foundDesignRequest.name,
          status: foundDesignRequest.status,
          organizationId: foundDesignRequest.organizationId,
          userId: foundDesignRequest.userId,
          metadata: {
            useCase: input.useCase || foundDesignRequest.metadata?.useCase,
          },
          files:
            input.fileIds?.map(fileId => ({ fileId })) ||
            foundDesignRequest.files.map(file => ({ fileId: file.id })),
          designLocations: input.locations?.length
            ? input.locations.map(location => ({
                id: location.designLocationId || undefined,
                description: location.description || '',
                placement: location.placement || null,
                files: location.fileIds?.map(fileId => ({ fileId })) || [],
              }))
            : foundDesignRequest.designLocations,
          artists: foundDesignRequest.artists,
          revisionRequests: foundDesignRequest.revisionRequests,
          proofs: foundDesignRequest.proofs,
          product: {
            id: foundDesignRequest.product.id,
            catalogProductId: foundDesignRequest.product.catalogProductId,
            colors: foundDesignRequest.product.colors.map(color => ({
              id: color.id,
              catalogProductColorId: color.catalogProductColorId,
              hexCode: color.hexCode || null,
              name: color.name || null,
            })),
          },
        },
      })
    } catch (error) {
      console.log(error)
      throw new GraphQLError('Unable to update design request')
    }
    return {
      designRequest: designRequestFactoryToGrahpql(designRequest),
    }
  },
})

export const DesignRequestSubmitInput = inputObjectType({
  name: 'DesignRequestSubmitInput',
  definition(t) {
    t.nonNull.id('designRequestId')
  },
})

export const DesignRequestSubmitPayload = objectType({
  name: 'DesignRequestSubmitPayload',
  definition(t) {
    t.nullable.field('designRequest', { type: 'DesignRequest' })
  },
})

export const designRequestSubmit = mutationField('designRequestSubmit', {
  type: 'DesignRequestSubmitPayload',
  args: {
    input: nonNull(DesignRequestSubmitInput),
  },
  resolve: async (_, { input }, { design, organizationId, userId }) => {
    let foundDesignRequest

    try {
      foundDesignRequest = await design.getDesignRequest({
        designRequestId: input.designRequestId,
      })
    } catch (error) {
      console.log(error)
      throw new GraphQLError('Unable to find design request')
    }

    if (
      notEmpty(foundDesignRequest.organizationId) &&
      foundDesignRequest.organizationId !== organizationId
    ) {
      throw new GraphQLError('Forbidden')
    }

    let designRequest

    try {
      designRequest = await design.updateDesignRequest({
        designRequest: {
          ...foundDesignRequest,
          status: 'SUBMITTED',
        },
      })
    } catch (error) {
      console.log(error)
      throw new GraphQLError('Unable to update design request')
    }

    return {
      designRequest: designRequestFactoryToGrahpql(designRequest),
    }
  },
})

export const DesignRequestProofCreateProofVariantInput = inputObjectType({
  name: 'DesignRequestProofCreateProofVariantInput',
  definition(t) {
    t.nonNull.id('catalogProductColorId')
    t.nonNull.list.nonNull.id('imageFileIds')
    t.nonNull.string('name')
    t.nonNull.string('hexCode')
  },
})

export const DesignRequestProofCreateProofLocationInput = inputObjectType({
  name: 'DesignRequestProofCreateProofLocationInput',
  definition(t) {
    t.nullable.int('colorCount')
    t.nonNull.string('placement')
    t.nonNull.id('fileId')
  },
})

export const DesignRequestProofCreateInput = inputObjectType({
  name: 'DesignRequestProofCreateInput',
  definition(t) {
    t.nonNull.id('designRequestId')
    t.nullable.string('message')
    t.nonNull.string('primaryImageFileId')
    t.nonNull.list.nonNull.field('proofLocations', {
      type: 'DesignRequestProofCreateProofLocationInput',
    })
    t.nonNull.list.nonNull.field('proofVariants', {
      type: 'DesignRequestProofCreateProofVariantInput',
    })
  },
})

export const DesignRequestProofCreatePayload = objectType({
  name: 'DesignRequestProofCreatePayload',
  definition(t) {
    t.nullable.field('designRequest', { type: 'DesignRequest' })
  },
})

export const designRequestProofCreate = mutationField(
  'designRequestProofCreate',
  {
    type: 'DesignRequestProofCreatePayload',
    args: {
      input: nonNull(DesignRequestProofCreateInput),
    },
    resolve: async (
      _,
      { input },
      { design, subscriptions, conversation, userId },
    ) => {
      if (!userId) {
        throw new GraphQLError('Unauthorized')
      }

      let designRequest

      try {
        designRequest = await design.getDesignRequest({
          designRequestId: input.designRequestId,
        })
      } catch (error) {
        console.log(error)
        throw new GraphQLError('Unable to find design request')
      }

      let proof

      try {
        proof = await design.createDesignProof({
          designProof: {
            artistUserId: userId,
            primaryImageFileId: input.primaryImageFileId,
            catalogProductId: designRequest.product.catalogProductId,
            locations: input.proofLocations.map(location => ({
              colorCount: location.colorCount || null,
              fileId: location.fileId,
              placement: location.placement,
            })),
            variants: input.proofVariants.map(variant => ({
              catalogProductColorId: variant.catalogProductColorId,
              name: variant.name,
              hexCode: variant.hexCode,
              images: variant.imageFileIds.map((imageFileId, index) => ({
                imageFileId,
                order: index,
              })),
            })),
          },
        })

        if (!proof) {
          throw new GraphQLError('Unable to create design proof')
        }
      } catch (error) {
        console.log(error)
        throw new GraphQLError('Unable to create design proof')
      }

      let updatedDesignRequest

      try {
        updatedDesignRequest = await design.updateDesignRequest({
          designRequest: {
            ...designRequest,
            proofs: [
              ...designRequest.proofs.map(p => ({
                id: p.id,
                designProofId: p.designProofId,
              })),
              { designProofId: proof.id },
            ],
          },
        })
      } catch (error) {
        console.log(error)
        throw new GraphQLError('Unable to update design request')
      }

      if (input.message) {
        if (updatedDesignRequest.conversationId) {
          let convo

          try {
            convo = await conversation.getConversation({
              conversationId: updatedDesignRequest.conversationId,
            })
          } catch (error) {
            console.log(error)
            throw new GraphQLError('Unable to create conversation')
          }

          try {
            await conversation.updateConversation({
              conversation: {
                id: updatedDesignRequest.conversationId,
                messages: [
                  ...convo.messages,
                  {
                    senderUserId: proof.artistUserId,
                    message: input.message,
                    files: [],
                  },
                ],
              },
            })
          } catch (error) {
            console.log(error)
            throw new GraphQLError('Unable to update conversation')
          }
        } else {
          console.error(
            'Design request does not have associated conversation. This should not happen.',
            {
              context: {
                designRequest: updatedDesignRequest,
              },
            },
          )
        }
      }

      subscriptions.publish('DESIGN_REQUEST_HISTORY_ITEM_ADDED', {
        designRequestId: designRequest.id,
      })

      return {
        designRequest: designRequestFactoryToGrahpql(updatedDesignRequest),
      }
    },
  },
)

export const DesignRequestRevisionRequestCreatePayload = objectType({
  name: 'DesignRequestRevisionRequestCreatePayload',
  definition(t) {
    t.nullable.field('designRequest', { type: 'DesignRequest' })
  },
})

export const DesignRequestRevisionRequestCreateInput = inputObjectType({
  name: 'DesignRequestRevisionRequestCreateInput',
  definition(t) {
    t.nonNull.id('designRequestId')
    t.nonNull.string('description')
    t.nonNull.list.nonNull.string('fileIds')
  },
})

export const designRequestRevisionRequestCreate = mutationField(
  'designRequestRevisionRequestCreate',
  {
    type: 'DesignRequestRevisionRequestCreatePayload',
    args: {
      input: nonNull(DesignRequestRevisionRequestCreateInput),
    },
    resolve: async (_, { input }, { subscriptions, design, userId }) => {
      if (!userId) {
        throw new GraphQLError('Unauthorized')
      }

      let designRequest

      try {
        designRequest = await design.getDesignRequest({
          designRequestId: input.designRequestId,
        })
      } catch (error) {
        console.log(error)
        throw new GraphQLError('Unable to find design request')
      }

      let updatedDesignRequest

      try {
        updatedDesignRequest = await design.updateDesignRequest({
          designRequest: {
            ...designRequest,
            revisionRequests: [
              ...designRequest.revisionRequests,
              {
                userId,
                description: input.description,
                files: input.fileIds.map(fileId => ({ fileId })),
              },
            ],
          },
        })
      } catch (error) {
        console.log(error)
        throw new GraphQLError('Unable to update design request')
      }

      subscriptions.publish('DESIGN_REQUEST_HISTORY_ITEM_ADDED', {
        designRequestId: designRequest.id,
      })

      return {
        designRequest: designRequestFactoryToGrahpql(updatedDesignRequest),
      }
    },
  },
)

export const DesignRequestConversationMessageCreatePayload = objectType({
  name: 'DesignRequestConversationMessageCreatePayload',
  definition(t) {
    t.nullable.field('designRequest', { type: 'DesignRequest' })
  },
})

export const DesignRequestConversationMessageCreateInput = inputObjectType({
  name: 'DesignRequestConversationMessageCreateInput',
  definition(t) {
    t.nonNull.id('designRequestId')
    t.nonNull.string('message')
    t.nonNull.list.nonNull.string('fileIds')
  },
})

export const designRequestConversationMessageCreate = mutationField(
  'designRequestConversationMessageCreate',
  {
    type: 'DesignRequestConversationMessageCreatePayload',
    args: {
      input: nonNull(DesignRequestConversationMessageCreateInput),
    },
    resolve: async (_, { input }, ctx) => {
      if (!ctx.userId) {
        throw new GraphQLError('Unauthorized')
      }

      let designRequest

      try {
        designRequest = await ctx.design.getDesignRequest({
          designRequestId: input.designRequestId,
        })

        if (!designRequest) {
          throw new GraphQLError('Unable to find design request')
        }
      } catch (error) {
        console.log(error)
        throw new GraphQLError('Unable to find design request')
      }

      if (!designRequest.conversationId) {
        throw new GraphQLError('Unable to find conversation')
      }

      let conversation

      try {
        conversation = await ctx.conversation.getConversation({
          conversationId: designRequest.conversationId,
        })
      } catch (error) {
        console.log(error)
        throw new GraphQLError('Unable to create conversation')
      }

      try {
        await ctx.conversation.updateConversation({
          conversation: {
            id: conversation.id,
            messages: [
              ...conversation.messages,
              {
                senderUserId: ctx.userId,
                message: input.message,
                files: input.fileIds.map(fileId => ({ fileId })),
              },
            ],
          },
        })
      } catch (error) {
        console.log(error)
        throw new GraphQLError('Unable to update conversation')
      }

      ctx.subscriptions.publish('DESIGN_REQUEST_HISTORY_ITEM_ADDED', {
        designRequestId: designRequest.id,
      })

      return {
        designRequest: designRequestFactoryToGrahpql(designRequest),
      }
    },
  },
)

export const DesignRequestApprovePayload = objectType({
  name: 'DesignRequestApprovePayload',
  definition(t) {
    t.nullable.field('designRequest', {
      type: 'DesignRequest',
    })
    t.nullable.field('design', {
      type: 'DesignProduct',
    })
  },
})

export const DesignRequestApproveInput = inputObjectType({
  name: 'DesignRequestApproveInput',
  definition(t) {
    t.nonNull.id('designRequestId')
    t.nonNull.id('designProofId')
    t.nonNull.boolean('termsConditionsAgreed')
    t.nonNull.string('name')
    t.nullable.string('description')
  },
})

export const designRequestApprove = mutationField('designRequestApprove', {
  type: 'DesignRequestApprovePayload',
  args: {
    input: nonNull('DesignRequestApproveInput'),
  },
  resolve: async (_, { input }, { design, userId, organizationId }) => {
    if (!userId || !organizationId) throw new GraphQLError('Not authenticated')

    let designRequest

    try {
      designRequest = await design.getDesignRequest({
        designRequestId: input.designRequestId,
      })
    } catch (error) {
      console.error(error)
      throw new Error('Failed to get design request')
    }

    let approvedProof

    try {
      approvedProof = await design.getDesignProof({
        designProofId: input.designProofId,
      })
    } catch (error) {
      console.error(error)
      throw new Error('Failed to get design proof')
    }

    let newDesign

    try {
      newDesign = await design.createDesign({
        design: {
          designProofId: approvedProof.id,
          catalogProductId: approvedProof.catalogProductId,
          designRequestId: designRequest.id,
          organizationId: designRequest.organizationId,
          primaryImageFileId: approvedProof.primaryImageFileId,
          termsConditionsAgreed: input.termsConditionsAgreed,
          userId: userId,
          description: input.description || '',
          name: input.name || designRequest.name,
          locations: approvedProof.locations.map(location => ({
            colorCount: location.colorCount || 0,
            placement: location.placement,
          })),
          variants: approvedProof.variants.map(variant => ({
            catalogProductColorId: variant.catalogProductColorId,
            colorHexCode: variant.hexCode,
            colorName: variant.name,
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
      updatedDesignRequest = await design.updateDesignRequest({
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

    return {
      designRequest: designRequestFactoryToGrahpql(updatedDesignRequest),
      design: designFactoryDesignToGraphql(newDesign),
    }
  },
})
