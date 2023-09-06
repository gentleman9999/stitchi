import { GraphQLError } from 'graphql'
import { inputObjectType, mutationField, nonNull, objectType } from 'nexus'
import { mailingAddressFactoryToGraphQL } from '../../serializers/order'

export const MailingAddressCreatePayload = objectType({
  name: 'MailingAddressCreatePayload',
  definition(t) {
    t.field('mailingAddress', {
      type: 'MailingAddress',
    })
  },
})

export const MailingAddressCreateInput = inputObjectType({
  name: 'MailingAddressCreateInput',
  definition(t) {
    t.nullable.string('name')
    t.nullable.string('phone')
    t.nullable.string('company')
    t.nullable.string('firstName')
    t.nullable.string('lastName')
    t.nullable.string('address1')
    t.nullable.string('address2')
    t.nullable.string('city')
    t.nullable.string('country')
    t.nullable.string('province')
    t.nullable.string('provinceCode')
    t.nullable.string('zip')
  },
})

export const mailingAddressCreate = mutationField('mailingAddressCreate', {
  description: 'Creates a new mailing address for the user',
  type: 'MailingAddressCreatePayload',
  args: {
    input: nonNull('MailingAddressCreateInput'),
  },
  resolve: async (_, { input }, ctx) => {
    let mailingAddress

    try {
      mailingAddress = await ctx.order.createMailingAddress({
        mailingAddress: {
          address1: input.address1 || null,
          address2: input.address2 || null,
          city: input.city || null,
          company: input.company || null,
          country: input.country || null,
          firstName: input.firstName || null,
          lastName: input.lastName || null,
          name: input.name || null,
          phone: input.phone || null,
          province: input.province || null,
          provinceCode: input.provinceCode || null,
          zip: input.zip || null,
          organizationId: ctx.organizationId || null,
          membershipId: ctx.membershipId || null,
          latitude: null,
          longitude: null,
        },
      })
    } catch (error) {
      ctx.logger.error(error)
      throw new GraphQLError('Unable to create mailing address')
    }

    return {
      mailingAddress: mailingAddressFactoryToGraphQL(mailingAddress),
    }
  },
})
