import { GraphQLError } from 'graphql'
import { extendType, idArg, intArg, nonNull, queryField } from 'nexus'
import calculate from '../../../services/quote/calculateQuote'
import { designFactoryDesignToGraphql } from '../../serializers/design'
import { v4 } from 'uuid'

export const designProduct = queryField('designProduct', {
  type: 'DesignProduct',
  args: {
    id: nonNull(idArg()),
  },
  resolve: async (_root, { id }, ctx) => {
    let design

    try {
      design = await ctx.design.getDesign({ designId: id })
    } catch (error) {
      console.error(error)
      throw new GraphQLError('Failed to get design')
    }

    return designFactoryDesignToGraphql(design)
  },
})

export const DesignProductExtendsDesignProduct = extendType({
  type: 'DesignProduct',
  definition(t) {
    t.field('quote', {
      type: 'Quote',
      args: {
        quantity: nonNull(intArg()),
      },
      resolve: async (parent, { quantity }, ctx) => {
        let designProof

        try {
          designProof = await ctx.design.getDesignProof({
            designProofId: parent.designProofId,
          })
        } catch (error) {
          console.error("Error getting design proof's design", {
            context: { error, designProduct: parent },
          })
          throw new GraphQLError('Error getting design proof')
        }

        let product

        try {
          product = await ctx.catalog.getCatalogProduct({
            productEntityId: parent.catalogProductId,
          })

          if (!product) {
            throw new Error('Product not found')
          }
        } catch (error) {
          console.error('Error getting catalog product', {
            context: { error, designProduct: parent },
          })

          throw new GraphQLError('Error getting catalog product')
        }

        // TODO: Add support for Direct to Garment
        const quote = calculate({
          includeFulfillment: false,
          quantity,
          productPriceCents: product.priceCents,
          printLocations: designProof.locations.map(location => ({
            colorCount: location.colorCount || 0,
          })),
        })

        return {
          id: v4(),
          printLocationCount: quote.printLocationCount,
          productTotalCostCents: quote.productTotalCostCents,
          productUnitCostCents: quote.productUnitCostCents,
          printLocations: quote.printLocations.map(printLocation => ({
            colorCount: printLocation.colorCount,
            totalCostInCents: printLocation.priceCents,
          })),
        }
      },
    })
  },
})

export const DesignProductExtendsDesignRequest = extendType({
  type: 'DesignRequest',
  definition(t) {
    t.nonNull.list.nonNull.field('designProducts', {
      type: 'DesignProduct',
      resolve: async (parent, _, ctx) => {
        let designProducts

        try {
          designProducts = await ctx.design.listDesigns({
            where: {
              designRequestId: parent.id,
            },
          })
        } catch (error) {
          console.error('Error getting design products', {
            context: { error, designRequest: parent },
          })

          throw new GraphQLError('Error getting design products')
        }

        return designProducts.map(designFactoryDesignToGraphql)
      },
    })
  },
})
