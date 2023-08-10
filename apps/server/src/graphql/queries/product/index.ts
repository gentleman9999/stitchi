import { inputObjectType, list, nonNull, queryField } from 'nexus'

export const products = queryField('_products', {
  type: list('Product'),
  args: {
    products: nonNull(
      list(
        nonNull(
          inputObjectType({
            name: 'ProductKey',
            definition: t => {
              t.nonNull.id('id')
              t.nonNull.field('prices', {
                type: nonNull(
                  inputObjectType({
                    name: 'ProductPrice',
                    definition: t => {
                      t.nonNull.field('price', {
                        type: nonNull(
                          inputObjectType({
                            name: 'ProductPriceValue',
                            definition: t => {
                              t.nonNull.float('value')
                            },
                          }),
                        ),
                      })
                    },
                  }),
                ),
              })
            },
          }),
        ),
      ),
    ),
  },
  resolve: async (_, { products }) => {
    return products
  },
})
