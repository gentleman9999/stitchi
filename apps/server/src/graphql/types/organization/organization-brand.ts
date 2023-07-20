import { objectType } from 'nexus'

export const OrganizationBrand = objectType({
  name: 'OrganizationBrand',
  definition(t) {
    t.nonNull.id('id')
    t.nonNull.id('organizationId')
    t.nonNull.string('fileUploadDirectory', {
      resolve: root => `brand/${root.id}`,
    })
  },
})
