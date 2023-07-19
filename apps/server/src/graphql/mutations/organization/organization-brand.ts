import { GraphQLError } from 'graphql'
import { inputObjectType, mutationField, nonNull, objectType } from 'nexus'
import { fileFactoryToGrahpql } from '../../serializers/file'

export const OrganizationBrandFileCreateBatchFileInput = inputObjectType({
  name: 'OrganizationBrandFileCreateBatchFileInput',
  definition(t) {
    t.nonNull.id('fileId')
  },
})

export const OrganizationBrandFileCreateBatchInput = inputObjectType({
  name: 'OrganizationBrandFileCreateBatchInput',
  definition(t) {
    t.nonNull.id('organizationId')
    t.nonNull.list.nonNull.field('files', {
      type: 'OrganizationBrandFileCreateBatchFileInput',
    })
  },
})

export const OrganizationBrandFileCreateBatchPayload = objectType({
  name: 'OrganizationBrandFileCreateBatchPayload',
  definition(t) {
    t.nullable.field('brand', {
      type: 'OrganizationBrand',
    })
    t.nonNull.list.nonNull.field('files', {
      type: 'File',
    })
  },
})

export const organizationBrandFileCreateBatch = mutationField(
  'organizationBrandFileCreateBatch',
  {
    type: 'OrganizationBrandFileCreateBatchPayload',
    args: {
      input: nonNull('OrganizationBrandFileCreateBatchInput'),
    },
    resolve: async (_, { input }, ctx) => {
      if (input.organizationId !== ctx.organizationId || !ctx.userId) {
        throw new GraphQLError('Unauthorized')
      }

      let newOrganizationFileIds: string[] = []

      for (const file of input.files) {
        try {
          const newFile = await ctx.organization.createOrganizationFile({
            organizationFile: {
              fileId: file.fileId,
              organizationId: input.organizationId,
              userId: ctx.userId,
            },
          })

          newOrganizationFileIds.push(newFile.id)
        } catch (error) {
          console.error('Unable to create file', {
            context: { error, input },
          })
          throw new GraphQLError('Unable to create file')
        }
      }

      let files

      try {
        files = await ctx.file.listFiles({
          where: {
            id: { in: newOrganizationFileIds },
          },
        })
      } catch (error) {
        console.error('Unable to fetch files', {
          context: { error, input },
        })
        throw new GraphQLError('Unable to fetch files')
      }

      return {
        brand: {
          id: input.organizationId,
        },
        files: files.map(fileFactoryToGrahpql),
      }
    },
  },
)

export const OrganizationBrandFileDeleteBatchInput = inputObjectType({
  name: 'OrganizationBrandFileDeleteBatchInput',
  definition(t) {
    t.nonNull.list.nonNull.id('fileIds')
  },
})

export const OrganizationBrandFileDeleteBatchPayload = objectType({
  name: 'OrganizationBrandFileDeleteBatchPayload',
  definition(t) {
    t.nullable.field('brand', {
      type: 'OrganizationBrand',
    })
    t.nonNull.list.nonNull.field('files', {
      type: 'File',
    })
  },
})

export const brandFileDeleteBatch = mutationField(
  'organizationBrandFileDeleteBatch',
  {
    type: 'OrganizationBrandFileDeleteBatchPayload',
    args: {
      input: nonNull('OrganizationBrandFileDeleteBatchInput'),
    },
    resolve: async (_, { input }, ctx) => {
      if (!ctx.userId || !ctx.organizationId) {
        throw new GraphQLError('Unauthorized')
      }

      let files

      try {
        files = await ctx.file.listFiles({
          where: {
            id: { in: input.fileIds },
          },
        })
      } catch (error) {
        console.error('Unable to fetch files', {
          context: { error, input },
        })
        throw new GraphQLError('Unable to fetch files')
      }

      let organizationFiles

      try {
        organizationFiles = await ctx.organization.listOrganizationFiles({
          where: {
            fileId: { in: input.fileIds },
          },
        })
      } catch (error) {
        console.error('Unable to fetch organization files', {
          context: { error, input },
        })
        throw new GraphQLError('Unable to fetch organization files')
      }

      for (const organizationFile of organizationFiles) {
        try {
          await ctx.organization.deleteOrganizationFile({
            organizationFileId: organizationFile.id,
          })
        } catch (error) {
          console.error('Unable to delete file', {
            context: { error, input },
          })
          throw new GraphQLError('Unable to delete file')
        }
      }

      return {
        brand: {
          id: ctx.organizationId,
        },
        files: files.map(fileFactoryToGrahpql),
      }
    },
  },
)
