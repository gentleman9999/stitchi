import { GraphQLError } from 'graphql'
import { inputObjectType, mutationField, nonNull, objectType } from 'nexus'
import {
  designFactoryDesignToGraphql,
  designRequestFactoryToGrahpql,
} from '../../serializers/design'

export const DesignRequestApprovePayload = objectType({
  name: 'DesignRequestApprovePayload',
  definition(t) {
    t.nullable.field('designRequest', {
      type: 'DesignRequest',
    })
    t.nullable.field('design', {
      type: 'Design',
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
