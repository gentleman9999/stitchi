import { GraphQLError } from 'graphql'
import { inputObjectType, mutationField, nonNull, objectType } from 'nexus'
import { colorFactoryToGrahpql } from '../../serializers/color'
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
            },
          })

          newOrganizationFileIds.push(newFile.id)
        } catch (error) {
          ctx.logger
            .child({
              context: { error, input },
            })
            .error('Unable to create file')
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
        ctx.logger
          .child({
            context: { error, input },
          })
          .error('Unable to fetch files')
        throw new GraphQLError('Unable to fetch files')
      }

      return {
        brand: {
          id: input.organizationId,
          organizationId: input.organizationId,
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
        ctx.logger
          .child({
            context: { error, input },
          })
          .error('Unable to fetch files')
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
        ctx.logger
          .child({
            context: { error, input },
          })
          .error('Unable to fetch organization files')
        throw new GraphQLError('Unable to fetch organization files')
      }

      for (const organizationFile of organizationFiles) {
        try {
          await ctx.organization.deleteOrganizationFile({
            organizationFileId: organizationFile.id,
          })
        } catch (error) {
          ctx.logger
            .child({
              context: { error, input },
            })
            .error('Unable to delete file')
          throw new GraphQLError('Unable to delete file')
        }
      }

      return {
        brand: {
          id: ctx.organizationId,
          organizationId: ctx.organizationId,
        },
        files: files.map(fileFactoryToGrahpql),
      }
    },
  },
)

export const OrganizationBrandColorCreateInput = inputObjectType({
  name: 'OrganizationBrandColorCreateInput',
  definition(t) {
    t.nonNull.id('organizationId')
    t.nonNull.string('hex')
    t.nonNull.string('name')
    t.nonNull.int('cmykC')
    t.nonNull.int('cmykM')
    t.nonNull.int('cmykY')
    t.nonNull.int('cmykK')

    t.nullable.string('pantone')
  },
})

export const OrganizationBrandColorCreatePayload = objectType({
  name: 'OrganizationBrandColorCreatePayload',
  definition(t) {
    t.nullable.field('brand', {
      type: 'OrganizationBrand',
    })
    t.nonNull.field('color', {
      type: 'Color',
    })
  },
})

export const organizationBrandColorCreate = mutationField(
  'organizationBrandColorCreate',
  {
    type: 'OrganizationBrandColorCreatePayload',
    args: {
      input: nonNull('OrganizationBrandColorCreateInput'),
    },
    resolve: async (_, { input }, ctx) => {
      if (input.organizationId !== ctx.organizationId || !ctx.userId) {
        throw new GraphQLError('Unauthorized')
      }

      let color

      try {
        color = await ctx.organization.createOrganizationColor({
          organizationId: input.organizationId,
          color: {
            name: input.name,
            hex: input.hex,
            cmykC: input.cmykC,
            cmykM: input.cmykM,
            cmykK: input.cmykK,
            cmykY: input.cmykY,
            pantone: input.pantone || null,
          },
        })
      } catch (error) {
        ctx.logger
          .child({
            context: { error, input },
          })
          .error('Unable to create color')
        throw new GraphQLError('Unable to create color')
      }

      return {
        brand: {
          id: input.organizationId,
          organizationId: input.organizationId,
        },
        color: colorFactoryToGrahpql(color),
      }
    },
  },
)

export const OrganizationBrandColorUpdateInput = inputObjectType({
  name: 'OrganizationBrandColorUpdateInput',
  definition(t) {
    t.nonNull.id('organizationId')
    t.nonNull.string('id')
    t.nonNull.string('hex')
    t.nonNull.string('name')
    t.nonNull.int('cmykC')
    t.nonNull.int('cmykM')
    t.nonNull.int('cmykY')
    t.nonNull.int('cmykK')

    t.nullable.string('pantone')
  },
})

export const OrganizationBrandColorUpdatePayload = objectType({
  name: 'OrganizationBrandColorUpdatePayload',
  definition(t) {
    t.nullable.field('brand', {
      type: 'OrganizationBrand',
    })
    t.nonNull.field('color', {
      type: 'Color',
    })
  },
})

export const organizationBrandColorUpdate = mutationField(
  'organizationBrandColorUpdate',
  {
    type: 'OrganizationBrandColorUpdatePayload',
    args: {
      input: nonNull('OrganizationBrandColorUpdateInput'),
    },
    resolve: async (_, { input }, ctx) => {
      if (input.organizationId !== ctx.organizationId || !ctx.userId) {
        throw new GraphQLError('Unauthorized')
      }

      let color

      try {
        color = await ctx.organization.updateOrganizationColor({
          color: {
            id: input.id,
            name: input.name,
            hex: input.hex,
            cmykC: input.cmykC,
            cmykM: input.cmykM,
            cmykK: input.cmykK,
            cmykY: input.cmykY,
            pantone: input.pantone || null,
          },
        })
      } catch (error) {
        ctx.logger
          .child({
            context: { error, input },
          })
          .error('Unable to update color')
        throw new GraphQLError('Unable to update color')
      }

      return {
        brand: {
          id: input.organizationId,
          organizationId: input.organizationId,
        },
        color: colorFactoryToGrahpql(color),
      }
    },
  },
)

export const OrganizationBrandColorDeleteInput = inputObjectType({
  name: 'OrganizationBrandColorDeleteInput',
  definition(t) {
    t.nonNull.id('organizationId')
    t.nonNull.string('colorId')
  },
})

export const OrganizationBrandColorDeletePayload = objectType({
  name: 'OrganizationBrandColorDeletePayload',
  definition(t) {
    t.nullable.field('brand', {
      type: 'OrganizationBrand',
    })
    t.nonNull.field('color', {
      type: 'Color',
    })
  },
})

export const organizationBrandColorDelete = mutationField(
  'organizationBrandColorDelete',
  {
    type: 'OrganizationBrandColorDeletePayload',
    args: {
      input: nonNull('OrganizationBrandColorDeleteInput'),
    },
    resolve: async (_, { input }, ctx) => {
      if (input.organizationId !== ctx.organizationId || !ctx.userId) {
        throw new GraphQLError('Unauthorized')
      }

      let color

      try {
        color = await ctx.organization.deleteOrganizationColor({
          colorId: input.colorId,
        })
      } catch (error) {
        ctx.logger
          .child({
            context: { error, input },
          })
          .error('Unable to delete color')
        throw new GraphQLError('Unable to delete color')
      }

      return {
        brand: {
          id: input.organizationId,
          organizationId: input.organizationId,
        },
        color: colorFactoryToGrahpql(color),
      }
    },
  },
)
