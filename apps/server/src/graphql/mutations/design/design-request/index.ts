import { GraphQLError } from 'graphql'
import { inputObjectType, mutationField, nonNull, objectType } from 'nexus'
import { notEmpty } from '../../../../utils'
import {
  designFactoryDesignToGraphql,
  designRequestFactoryToGrahpql,
} from '../../../serializers/design'
import { DesignRequestStatus } from '../../../../services/design/db/design-request-table'
import { CatalogFactoryProductVariant } from '../../../../services/catalog/factory'
import { DesignProofVariant } from '../../../../services/design/factory'

export * from './design-request-assign'
export * from './design-request-reject'
export * from './design-request-archive'

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
    t.nullable.list.nonNull.id('fileIds')
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
  resolve: async (
    _,
    { input },
    { design, organizationId, membershipId, logger },
  ) => {
    let designRequest

    try {
      designRequest = await design.createDesignRequest({
        designRequest: {
          organizationId: organizationId || null,
          approvedDesignProofId: null,
          membershipId: membershipId || null,
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
      logger.error(error)
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
  resolve: async (_, { input }, { design, organizationId, logger }) => {
    let foundDesignRequest

    try {
      foundDesignRequest = await design.getDesignRequest({
        designRequestId: input.designRequestId,
      })
    } catch (error) {
      logger.error(error)
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
          membershipId: foundDesignRequest.membershipId,
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
      logger.error(error)
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
  resolve: async (_, { input }, { design, organizationId, logger }) => {
    let foundDesignRequest

    try {
      foundDesignRequest = await design.getDesignRequest({
        designRequestId: input.designRequestId,
      })
    } catch (error) {
      logger.error(error)
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
      logger.error(error)
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
      { design, subscriptions, conversation, membershipId, logger },
    ) => {
      if (!membershipId) {
        throw new GraphQLError('Unauthorized')
      }

      let designRequest

      try {
        designRequest = await design.getDesignRequest({
          designRequestId: input.designRequestId,
        })
      } catch (error) {
        logger.error(error)
        throw new GraphQLError('Unable to find design request')
      }

      let proof

      try {
        proof = await design.createDesignProof({
          designProof: {
            artistMembershipId: membershipId,
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
          throw new GraphQLError('Proof not created')
        }
      } catch (error) {
        logger.error(error)
        throw new GraphQLError('Unable to create design proof')
      }

      let updatedDesignRequest

      try {
        updatedDesignRequest = await design.updateDesignRequest({
          designRequest: {
            ...designRequest,
            // When a new design proof is created, the design request becomes "awaiting approval" for the customer to take action on the proof
            status: DesignRequestStatus.AWAITING_APPROVAL,
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
        logger.error(error)
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
            logger.error(error)
            throw new GraphQLError('Unable to create conversation')
          }

          try {
            await conversation.updateConversation({
              conversation: {
                id: updatedDesignRequest.conversationId,
                messages: [
                  ...convo.messages,
                  {
                    senderMembershipId: proof.artistMembershipId,
                    message: input.message,
                    files: [],
                  },
                ],
              },
            })
          } catch (error) {
            logger.error(error)
            throw new GraphQLError('Unable to update conversation')
          }
        } else {
          logger.error(
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
    resolve: async (
      _,
      { input },
      { subscriptions, design, membershipId, logger },
    ) => {
      if (!membershipId) {
        throw new GraphQLError('Unauthorized')
      }

      let designRequest

      try {
        designRequest = await design.getDesignRequest({
          designRequestId: input.designRequestId,
        })
      } catch (error) {
        logger.error(error)
        throw new GraphQLError('Unable to find design request')
      }

      let updatedDesignRequest

      try {
        updatedDesignRequest = await design.updateDesignRequest({
          designRequest: {
            ...designRequest,
            status: DesignRequestStatus.AWAITING_REVISION,
            revisionRequests: [
              ...designRequest.revisionRequests,
              {
                membershipId,
                description: input.description,
                files: input.fileIds.map(fileId => ({ fileId })),
              },
            ],
          },
        })
      } catch (error) {
        logger.error(error)
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
      if (!ctx.membershipId) {
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
        ctx.logger.error(error)
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
        ctx.logger.error(error)
        throw new GraphQLError('Unable to create conversation')
      }

      try {
        await ctx.conversation.updateConversation({
          conversation: {
            id: conversation.id,
            messages: [
              ...conversation.messages,
              {
                senderMembershipId: ctx.membershipId,
                message: input.message,
                files: input.fileIds.map(fileId => ({ fileId })),
              },
            ],
          },
        })
      } catch (error) {
        ctx.logger.error(error)
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

type ApprovedProofVariant = DesignProofVariant & {
  catalogProductVariantId: string
  catalogProductSizeId: string
  sizeName: string
}

export const designRequestApprove = mutationField('designRequestApprove', {
  type: 'DesignRequestApprovePayload',
  args: {
    input: nonNull('DesignRequestApproveInput'),
  },
  resolve: async (_, { input }, ctx) => {
    if (!ctx.membershipId) throw new GraphQLError('Not authenticated')

    let designRequest

    try {
      designRequest = await ctx.design.getDesignRequest({
        designRequestId: input.designRequestId,
      })
    } catch (error) {
      ctx.logger.error(error)
      throw new Error('Failed to get design request')
    }

    let approvedProof

    try {
      approvedProof = await ctx.design.getDesignProof({
        designProofId: input.designProofId,
      })
    } catch (error) {
      ctx.logger.error(error)
      throw new Error('Failed to get design proof')
    }

    // Fetch possible product variants beyond "color" (which is persisted with design proof variant) such as size
    let catalogProductVariants: CatalogFactoryProductVariant[]

    try {
      catalogProductVariants = await ctx.catalog.listCatalogProductVariants({
        productEntityId: approvedProof.catalogProductId,
      })
    } catch (error) {
      ctx.logger.error(error)
      throw new Error('Failed to list catalog product variants')
    }

    /**
     * Find the combination of available sizes along with chosen colors
     *
     * A single tee could have “Phoenix Club” on the pocket and a phoenix with its wings spread on the back.
     * The design would have two designLocations and a designVariant for each of blue, red, white x small, medium, large. Meaning in the end we’d have:
     *
     * 1 design record (Product)
     * 2 design location records (Product Modifiers)
     * 9 design variant records (Product Variants) (i.e. [small, blue], [medium, blue], [large, blue], [small, red], [medium, red], [large, red], [small, white], [medium, white], [large, white])
     */
    const approvedProofVariants: ApprovedProofVariant[] =
      approvedProof.variants.reduce((acc, proofVariant) => {
        const colorMatchedCatalogProductVariants =
          catalogProductVariants.filter(
            catalogVariant =>
              catalogVariant.option_values
                ?.find(value => value.option_display_name === 'Color')
                ?.id.toString() === proofVariant.catalogProductColorId,
          )

        const approvedProofVariantsBySize: ApprovedProofVariant[] =
          colorMatchedCatalogProductVariants.reduce((acc, catalogVariant) => {
            const sizeOption = catalogVariant.option_values?.find(
              value => value.option_display_name === 'Size',
            )

            if (!notEmpty(sizeOption)) {
              return acc
            }

            return [
              ...acc,
              {
                ...proofVariant,
                catalogProductVariantId: catalogVariant.id.toString(),
                catalogProductSizeId: sizeOption.option_id.toString(),
                sizeName: sizeOption.label || '',
              },
            ]
          }, [] as ApprovedProofVariant[])

        return [...acc, ...approvedProofVariantsBySize]
      }, [] as ApprovedProofVariant[])

    let newDesign

    try {
      newDesign = await ctx.design.createDesign({
        design: {
          designProofId: approvedProof.id,
          catalogProductId: approvedProof.catalogProductId,
          designRequestId: designRequest.id,
          organizationId: designRequest.organizationId,
          primaryImageFileId: approvedProof.primaryImageFileId,
          termsConditionsAgreed: input.termsConditionsAgreed,
          membershipId: ctx.membershipId,
          description: input.description || '',
          name: input.name || designRequest.name,
          locations: approvedProof.locations.map(location => ({
            colorCount: location.colorCount || 0,
            placement: location.placement,
          })),
          variants: approvedProofVariants.map(variant => ({
            catalogProductColorId: variant.catalogProductColorId,
            catalogProductVariantId: variant.catalogProductVariantId,
            colorHexCode: variant.hexCode,
            colorName: variant.name,
            catalogProductSizeId: variant.catalogProductSizeId,
            sizeName: variant.sizeName,
            images: variant.images.map(image => ({
              fileId: image.imageFileId,
              order: image.order,
            })),
          })),
        },
      })
    } catch (error) {
      ctx.logger.error(error)
      throw new Error('Failed to create design')
    }

    let updatedDesignRequest

    try {
      updatedDesignRequest = await ctx.design.updateDesignRequest({
        designRequest: {
          ...designRequest,
          status: 'APPROVED',
          approvedDesignProofId: approvedProof.id,
        },
      })
    } catch (error) {
      ctx.logger.error(error)
      throw new Error('Failed to update design request')
    }

    let ordersWithDesignRequest

    try {
      ordersWithDesignRequest = await ctx.order.listOrders({
        where: {
          designRequestId: designRequest.id,
        },
      })
    } catch (error) {
      ctx.logger
        .child({ error, input })
        .error('Failed to get orders with design request')

      throw new Error('Failed to get orders with design request')
    }

    const orderDesign = { ...newDesign }

    for (const order of ordersWithDesignRequest) {
      let orderToUpdate

      try {
        orderToUpdate = await ctx.order.getOrder({
          orderId: order.id,
        })
      } catch (error) {
        ctx.logger
          .child({ error, input })
          .error('Failed to get order with design request')

        throw new Error('Failed to get order with design request')
      }

      try {
        // Assocatie any existing order line items with the recently created product (design)
        await ctx.order.updateOrder({
          order: {
            ...orderToUpdate,
            items: orderToUpdate.items.map(item => {
              return {
                ...item,
                designId: orderDesign.id,
              }
            }),
          },
        })
      } catch (error) {
        ctx.logger
          .child({ error, input })
          .error('Failed to update order with design request')

        throw new Error('Failed to update order with design request')
      }
    }

    return {
      designRequest: designRequestFactoryToGrahpql(updatedDesignRequest),
      design: designFactoryDesignToGraphql(newDesign),
    }
  },
})
