import { GraphQLError } from 'graphql'
import { inputObjectType, mutationField, nonNull, objectType } from 'nexus'
import { FileFactoryFile } from '../../../services/file/factory'
import { fileFactoryToGrahpql } from '../../serializers/file'

export const FileCreateInput = inputObjectType({
  name: 'FileCreateInput',
  definition(t) {
    t.nonNull.field('fileType', { type: 'FileType' })
    t.nonNull.string('name')
    t.nonNull.string('originalFilename')
    t.nonNull.string('url')
    t.nonNull.int('bytes')
    t.nonNull.string('format')
    t.nullable.string('cloudinaryAssetId')
    t.nullable.int('width')
    t.nullable.int('height')
  },
})

export const FileCreatePayload = objectType({
  name: 'FileCreatePayload',
  definition(t) {
    t.nullable.field('file', { type: 'File' })
  },
})

export const fileCreate = mutationField('fileCreate', {
  type: 'FileCreatePayload',
  args: {
    input: nonNull(FileCreateInput),
  },
  resolve: async (_, { input }, ctx) => {
    let file

    try {
      file = await ctx.file.createFile({
        file: {
          name: input.name,
          originalFilename: input.originalFilename,
          url: input.url,
          bytes: input.bytes,
          format: input.format,
          userId: ctx.userId || null,
          organizationId: ctx.organizationId || null,
          cloudinaryAssetId: input.cloudinaryAssetId || null,
          fileType: input.fileType,
          width: input.width || null,
          height: input.height || null,
        },
      })
    } catch (error) {
      logger.error(error)
      throw new GraphQLError('Unable to create file')
    }

    return {
      file: fileFactoryToGrahpql(file),
    }
  },
})

export const FileCreateBatchInput = inputObjectType({
  name: 'FileCreateBatchInput',
  definition(t) {
    t.nonNull.list.nonNull.field('files', { type: 'FileCreateInput' })
  },
})

export const FileCreateBatchPayload = objectType({
  name: 'FileCreateBatchPayload',
  definition(t) {
    t.nullable.list.nonNull.field('files', { type: 'File' })
  },
})

export const fileCreateBatch = mutationField('fileCreateBatch', {
  type: 'FileCreateBatchPayload',
  args: {
    input: nonNull(FileCreateBatchInput),
  },
  resolve: async (_, { input }, ctx) => {
    let files: FileFactoryFile[] = []

    for (const file of input.files) {
      try {
        const createdFile = await ctx.file.createFile({
          file: {
            name: file.name,
            originalFilename: file.originalFilename,
            url: file.url,
            bytes: file.bytes,
            userId: ctx.userId || null,
            organizationId: ctx.organizationId || null,
            cloudinaryAssetId: file.cloudinaryAssetId || null,
            fileType: file.fileType,
            format: file.format,
            width: file.width || null,
            height: file.height || null,
          },
        })

        files.push(createdFile)
      } catch (error) {
        console.error(`Failed to create file`, { context: { error, file } })
        continue
      }
    }

    return {
      files: files.map(fileFactoryToGrahpql),
    }
  },
})
