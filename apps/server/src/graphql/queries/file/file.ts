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
