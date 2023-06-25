import { GraphQLError } from 'graphql'
import { inputObjectType, mutationField, nonNull, objectType } from 'nexus'
import { notEmpty } from '../../../utils'
import { designRequestFactoryToGrahpql } from '../../serializers/design'

export const DesignRequestCreateInput = inputObjectType({
  name: 'DesignRequestCreateInput',
  definition(t) {
    t.nullable.string('name')
    t.nullable.string('description')
    t.nullable.string('useCase')
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

export const DesignRequestUpdateInput = inputObjectType({
  name: 'DesignRequestUpdateInput',
  definition(t) {
    t.nonNull.id('designRequestId')
    t.nullable.string('name')
    t.nullable.string('description')
    t.nullable.string('useCase')
    t.nullable.list.nonNull.id('fileIds')
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
    input: nonNull(DesignRequestUpdateInput),
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
          // We provided dedicated mutations for adding and removing design locations
          designLocations: foundDesignRequest.designLocations,
          artists: foundDesignRequest.artists,
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
    t.nullable.string('note')
    t.nonNull.list.nonNull.string('fileIds')
    t.nonNull.list.nonNull.field('proofLocations', {
      type: 'DesignRequestProofCreateProofLocationInput',
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
    resolve: async (_, { input }, { design, userId }) => {
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
            note: input.note || null,
            files: input.fileIds.map(fileId => ({ fileId })),
            locations: input.proofLocations.map(location => ({
              colorCount: location.colorCount || null,
              fileId: location.fileId,
              placement: location.placement,
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
                designProofId: p.id,
              })),
              { designProofId: proof.id },
            ],
          },
        })
      } catch (error) {
        console.log(error)
        throw new GraphQLError('Unable to update design request')
      }

      return {
        designRequest: designRequestFactoryToGrahpql(updatedDesignRequest),
      }
    },
  },
)
