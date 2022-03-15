import { queryField } from 'nexus'

export const catalog = queryField('catalog', {
  type: 'Catalog',
  resolve(_, __, ctx) {
    return ctx.prisma.catalog.findFirst()
  },
})
