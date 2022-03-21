import { extendType, objectType } from 'nexus'

export const Vendor = objectType({
  name: 'Vendor',
  definition: t => {
    t.nonNull.id('id')
    t.nonNull.string('name')

    t.nonNull.field('createdAt', { type: 'DateTime' })
    t.field('updatedAt', { type: 'DateTime' })
  },
})

export const VendorExtendsMaterialVariant = extendType({
  type: 'MaterialVariant',
  definition: t => {
    t.field('vendor', {
      type: 'Vendor',
      resolve: async (cpv, _, ctx) => {
        return ctx.prisma.vendor.findFirst({
          where: {
            id: cpv.vendorId,
          },
        })
      },
    })
  },
})

export const VendorExtendsMaterial = extendType({
  type: 'Material',
  definition: t => {
    t.field('vendor', {
      type: 'Vendor',
      resolve: async (cp, _, ctx) => {
        if (!cp.primaryVendorId) return null
        return ctx.prisma.vendor.findFirst({
          where: {
            id: cp.primaryVendorId,
          },
        })
      },
    })
  },
})
