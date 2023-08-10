import { GraphQLError } from 'graphql'
import { inputObjectType, mutationField, nonNull, objectType } from 'nexus'
import { notEmpty } from '../../../utils'
import { designRequestFactoryToGrahpql } from '../../serializers/design'

export const DesignRequestDesignLocationCreateInput = inputObjectType({
  name: 'DesignRequestDesignLocationCreateInput',
  definition(t) {
    t.nonNull.id('designRequestId')
    t.nullable.string('description')
    t.nonNull.string('placement')
    t.nonNull.list.nonNull.id('fileIds')
  },
})

export const DesignRequestDesignLocationCreatePayload = objectType({
  name: 'DesignRequestDesignLocationCreatePayload',
  definition(t) {
    t.nullable.field('designRequest', { type: 'DesignRequest' })
    t.nullable.field('designRequestDesignLocation', {
      type: 'DesignRequestDesignLocation',
    })
  },
})

export const designRequestDesignLocationCreate = mutationField(
  'designRequestDesignLocationCreate',
  {
    type: 'DesignRequestDesignLocationCreatePayload',
    args: {
      input: nonNull(DesignRequestDesignLocationCreateInput),
    },
    resolve: async (_, { input }, ctx) => {
      let foundDesignRequest

      try {
        foundDesignRequest = await ctx.design.getDesignRequest({
          designRequestId: input.designRequestId,
        })
      } catch (error) {
        console.log(error)
        throw new GraphQLError('Design request not found')
      }

      if (
        notEmpty(foundDesignRequest.organizationId) &&
        foundDesignRequest.organizationId !== ctx.organizationId
      ) {
        throw new GraphQLError('Forbidden')
      }

      let updatedDesignRequest

      try {
        updatedDesignRequest = await ctx.design.updateDesignRequest({
          designRequest: {
            ...foundDesignRequest,
            designLocations: [
              ...foundDesignRequest.designLocations,
              {
                description: input.description || null,
                placement: input.placement,
                files: input.fileIds.map(fileId => ({
                  fileId,
                })),
              },
            ],
          },
        })
      } catch (error) {
        console.log(error)
        throw new GraphQLError('Unable to create design location')
      }

      const designRequest = designRequestFactoryToGrahpql(updatedDesignRequest)

      const foundDesignRequestTsHack = { ...foundDesignRequest }

      const newDesignLocation = designRequest.designRequestLocations.find(
        location =>
          !foundDesignRequestTsHack.designLocations.find(
            l => l.id === location.id,
          ),
      )

      return {
        designRequest,
        designRequestDesignLocation: newDesignLocation || null,
      }
    },
  },
)

export const DesignRequestDesignLocationUpdateInput = inputObjectType({
  name: 'DesignRequestDesignLocationUpdateInput',
  definition(t) {
    t.nonNull.id('designRequestId')
    t.nonNull.id('designRequestDesignLocationId')
    t.nullable.string('description')
    t.nullable.string('placement')
    t.nonNull.list.nonNull.id('fileIds')
  },
})

export const DesignRequestDesignLocationUpdatePayload = objectType({
  name: 'DesignRequestDesignLocationUpdatePayload',
  definition(t) {
    t.nullable.field('designRequest', { type: 'DesignRequest' })
    t.nullable.field('designRequestDesignLocation', {
      type: 'DesignRequestDesignLocation',
    })
  },
})

export const designRequestDesignLocationUpdate = mutationField(
  'designRequestDesignLocationUpdate',
  {
    type: 'DesignRequestDesignLocationUpdatePayload',
    args: {
      input: nonNull(DesignRequestDesignLocationUpdateInput),
    },
    resolve: async (_, { input }, ctx) => {
      let foundDesignRequest

      try {
        foundDesignRequest = await ctx.design.getDesignRequest({
          designRequestId: input.designRequestId,
        })
      } catch (error) {
        console.log(error)
        throw new GraphQLError('Design request not found')
      }

      if (
        notEmpty(foundDesignRequest.organizationId) &&
        foundDesignRequest.organizationId !== ctx.organizationId
      ) {
        throw new GraphQLError('Forbidden')
      }

      let updatedDesignRequest

      try {
        updatedDesignRequest = await ctx.design.updateDesignRequest({
          designRequest: {
            ...foundDesignRequest,
            designLocations: foundDesignRequest.designLocations.map(location =>
              location.id === input.designRequestDesignLocationId
                ? {
                    ...location,
                    description: input.description || null,
                    placement: input.placement || null,
                    files: input.fileIds.map(fileId => ({
                      fileId,
                    })),
                  }
                : location,
            ),
          },
        })
      } catch (error) {
        console.log(error)
        throw new GraphQLError('Unable to update design location')
      }

      const designRequest = designRequestFactoryToGrahpql(updatedDesignRequest)

      const foundDesignRequestTsHack = { ...foundDesignRequest }

      const updatedDesignLocation = designRequest.designRequestLocations.find(
        location =>
          !foundDesignRequestTsHack.designLocations.find(
            l => l.id === location.id,
          ),
      )

      return {
        designRequest,
        designRequestDesignLocation: updatedDesignLocation || null,
      }
    },
  },
)

export const DesignRequestDesignLocationDeleteInput = inputObjectType({
  name: 'DesignRequestDesignLocationDeleteInput',
  definition(t) {
    t.nonNull.id('designRequestId')
    t.nonNull.id('designRequestDesignLocationId')
  },
})

export const DesignRequestDesignLocationDeletePayload = objectType({
  name: 'DesignRequestDesignLocationDeletePayload',
  definition(t) {
    t.nullable.field('designRequest', {
      type: 'DesignRequest',
    })
  },
})

export const designRequestDesignLocationDelete = mutationField(
  'designRequestDesignLocationDelete',
  {
    type: 'DesignRequestDesignLocationDeletePayload',
    args: {
      input: nonNull(DesignRequestDesignLocationDeleteInput),
    },
    resolve: async (_, { input }, ctx) => {
      let foundDesignRequest

      try {
        foundDesignRequest = await ctx.design.getDesignRequest({
          designRequestId: input.designRequestId,
        })
      } catch (error) {
        console.log(error)
        throw new GraphQLError('Design request not found')
      }

      if (
        notEmpty(foundDesignRequest.organizationId) &&
        foundDesignRequest.organizationId !== ctx.organizationId
      ) {
        throw new GraphQLError('Forbidden')
      }

      let updatedDesignRequest

      try {
        updatedDesignRequest = await ctx.design.updateDesignRequest({
          designRequest: {
            ...foundDesignRequest,
            designLocations: foundDesignRequest.designLocations.filter(
              location => location.id !== input.designRequestDesignLocationId,
            ),
          },
        })
      } catch (error) {
        console.log(error)
        throw new GraphQLError('Unable to delete design location')
      }

      const designRequest = designRequestFactoryToGrahpql(updatedDesignRequest)

      return { designRequest }
    },
  },
)
