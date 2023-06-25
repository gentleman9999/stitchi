import { extendType } from 'nexus'
import { fileFactoryToGrahpql } from '../../serializers/file'

export const FileExtendsDesignRequest = extendType({
  type: 'DesignRequest',
  definition(t) {
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
    t.nonNull.list.nonNull.field('files', {
      type: 'File',
      resolve: async (designProof, _, ctx) => {
        const files = await ctx.file.listFiles({
          where: { id: { in: designProof.fileIds } },
        })

        return files.map(fileFactoryToGrahpql)
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
