import { extendType } from 'nexus'
import { mailingAddressFactoryToGraphQL } from '../../serializers/order'

export const MailingAddressExtendsOrder = extendType({
  type: 'Order',
  definition(t) {
    t.field('shippingAddress', {
      type: 'MailingAddress',
      resolve: async (parent, _, context) => {
        if (!parent.shippingAddressId) {
          return null
        }

        const mailingAddress = await context.order.getMailingAddress({
          mailingAddressId: parent.shippingAddressId,
        })

        if (!mailingAddress) {
          return null
        }

        return mailingAddressFactoryToGraphQL(mailingAddress)
      },
    })
  },
})
