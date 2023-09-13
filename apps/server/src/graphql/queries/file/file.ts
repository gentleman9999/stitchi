import { GraphQLError } from 'graphql'
import { extendType } from 'nexus'
import {
  fileFactoryToGrahpql,
  fileFactoryToGrahpqlFileImage,
} from '../../serializers/file'
import { cursorPaginationFromList } from '../../utils'

export const FileExtendsDesignRequest = extendType({
  type: 'DesignRequest',
  definition(t) {
    t.nullable.field('previewImage', {
      type: 'FileImage',
      resolve: async (designRequest, _, ctx) => {
        let previewImage

        if (designRequest.designProofIds.length) {
          // We pull the preview image from the approved proof or the latest proof
          if (designRequest.approvedDesignProofId) {
            let proof

            try {
              proof = await ctx.design.getDesignProof({
                designProofId: designRequest.approvedDesignProofId,
              })

              if (!proof) {
                throw new Error(
                  'Unable to find approved design proof for design request',
                )
              }

              previewImage = await ctx.file.getFile({
                fileId: proof.primaryImageFileId,
              })
            } catch (error) {
              ctx.logger.error(error)

              throw new GraphQLError(
                'Unable to fetch approved design proof for design request',
              )
            }
          } else {
            let proofs

            try {
              proofs = await ctx.design.listDesignProofs({
                orderBy: { createdAt: 'desc' },
                take: 1,
                where: {
                  id: { in: designRequest.designProofIds },
                },
              })

              if (!proofs.length) {
                throw new Error(
                  'Unable to find latest design proof for design request',
                )
              }

              previewImage = await ctx.file.getFile({
                fileId: proofs[0].primaryImageFileId,
              })
            } catch (error) {
              ctx.logger.error(error)

              throw new GraphQLError(
                'Unable to fetch latest design proof for design request',
              )
            }
          }
        } else {
          try {
            const files = await ctx.file.listFiles({
              take: 1,
              where: {
                id: { in: designRequest.fileIds },
                fileType: { equals: 'IMAGE' },
              },
            })

            previewImage = files[0]
          } catch (error) {
            ctx.logger.error(error)

            throw new GraphQLError(
              'Unable to fetch preview image for design request',
            )
          }
        }

        return previewImage ? fileFactoryToGrahpqlFileImage(previewImage) : null
      },
    })
    t.nonNull.list.nonNull.field('files', {
      type: 'File',
      resolve: async (designRequest, _, ctx) => {
        const files = await ctx.file.listFiles({
          where: { id: { in: designRequest.fileIds } },
        })

        return files.map(fileFactoryToGrahpql)
      },
    })
  },
})

export const FileExtendsDesignRequestDesignLocation = extendType({
  type: 'DesignRequestDesignLocation',
  definition(t) {
    t.nonNull.list.nonNull.field('files', {
      type: 'File',
      resolve: async (designRequestDesignLocation, _, ctx) => {
        const files = await ctx.file.listFiles({
          where: { id: { in: designRequestDesignLocation.fileIds } },
        })

        return files.map(fileFactoryToGrahpql)
      },
    })
  },
})

export const FileExtendsDesignProof = extendType({
  type: 'DesignProof',
  definition(t) {
    t.nullable.field('primaryImageFile', {
      type: 'FileImage',
      resolve: async (designProof, _, ctx) => {
        if (!designProof.primaryImageFileId) return null

        const file = await ctx.file.getFile({
          fileId: designProof.primaryImageFileId,
        })

        return fileFactoryToGrahpqlFileImage(file)
      },
    })
  },
})

export const FileExtendsDesignProofLocation = extendType({
  type: 'DesignProofLocation',
  definition(t) {
    t.nullable.field('file', {
      type: 'File',
      resolve: async (designProofLocation, _, ctx) => {
        if (!designProofLocation.fileId) return null

        const file = await ctx.file.getFile({
          fileId: designProofLocation.fileId,
        })

        return fileFactoryToGrahpql(file)
      },
    })
  },
})

export const FileExtendsDesignProofColor = extendType({
  type: 'DesignProofColor',
  definition(t) {
    t.nonNull.list.nonNull.field('images', {
      type: 'FileImage',
      resolve: async (designProofColor, _, ctx) => {
        const files = await ctx.file.listFiles({
          where: { id: { in: designProofColor.imageFileIds } },
        })

        return files.map(fileFactoryToGrahpqlFileImage)
      },
    })
  },
})

export const FileExtendsDesignRequestRevisionRequest = extendType({
  type: 'DesignRequestRevisionRequest',
  definition(t) {
    t.nonNull.list.nonNull.field('files', {
      type: 'File',
      resolve: async (designRequestRevisionRequest, _, ctx) => {
        const files = await ctx.file.listFiles({
          where: { id: { in: designRequestRevisionRequest.fileIds } },
        })

        return files.map(fileFactoryToGrahpql)
      },
    })
  },
})

export const FileExtendsConversationMessage = extendType({
  type: 'ConversationMessage',
  definition(t) {
    t.nonNull.list.nonNull.field('files', {
      type: 'File',
      resolve: async (conversationMessageFile, _, ctx) => {
        const files = await ctx.file.listFiles({
          where: { id: { in: conversationMessageFile.fileIds } },
        })

        return files.map(fileFactoryToGrahpql)
      },
    })
  },
})

export const FileExtendsDesignProductColor = extendType({
  type: 'DesignProductColor',
  definition(t) {
    t.nonNull.list.nonNull.field('images', {
      type: 'FileImage',
      resolve: async (designProductColor, _, ctx) => {
        const files = await ctx.file.listFiles({
          where: { id: { in: designProductColor.imageFileIds } },
        })

        return files.map(fileFactoryToGrahpqlFileImage)
      },
    })
  },
})

export const FileExtendsDesignProduct = extendType({
  type: 'DesignProduct',
  definition(t) {
    t.nullable.field('primaryImageFile', {
      type: 'FileImage',
      resolve: async (designProduct, _, ctx) => {
        if (!designProduct.primaryImageFileId) return null

        const file = await ctx.file.getFile({
          fileId: designProduct.primaryImageFileId,
        })

        return fileFactoryToGrahpqlFileImage(file)
      },
    })
  },
})

export const FileExtendsOrganizationBrand = extendType({
  type: 'OrganizationBrand',
  definition(t) {
    t.nonNull.connectionField('files', {
      type: 'File',
      resolve: async (organization, { first, last, after, before }, ctx) => {
        const where = {
          organizationId: organization.id,
        }

        const result = cursorPaginationFromList(
          async ({ cursor, skip, take }) => {
            let organizationFiles

            try {
              organizationFiles = await ctx.organization.listOrganizationFiles({
                take,
                cursor,
                skip,
                where,
              })
            } catch (error) {
              ctx.logger
                .child({
                  context: { error, organization },
                })
                .error("Unable to fetch organization's files")
              throw new GraphQLError('Unable to fetch organization files')
            }

            let files

            try {
              files = await ctx.file.listFiles({
                where: {
                  id: { in: organizationFiles.map(({ fileId }) => fileId) },
                },
              })
            } catch (error) {
              ctx.logger
                .child({
                  context: { error, organization },
                })
                .error("Unable to fetch organization's files")
              throw new GraphQLError('Unable to fetch organization files')
            }

            return files.map(fileFactoryToGrahpql)
          },
          async () => {
            return ctx.organization.listOrganizationFilesCount({
              where,
            })
          },
          {
            first,
            last,
            after,
            before,
          },
        )

        return result
      },
    })
  },
})
