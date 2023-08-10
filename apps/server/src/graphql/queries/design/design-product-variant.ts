import { GraphQLError } from 'graphql'
import { extendType } from 'nexus'
import { NexusGenObjects } from '../../generated/nexus'

export const DesignProductVariantExtendsDesignProduct = extendType({
  type: 'DesignProduct',
  definition(t) {
    t.nonNull.list.nonNull.field('variants', {
      type: 'DesignProductVariant',
      resolve: async (parent, args, ctx) => {
        const { catalogProductId } = parent

        let catalogProductVariants

        try {
          catalogProductVariants = await ctx.catalog.listCatalogProductVariants(
            {
              productEntityId: catalogProductId,
            },
          )
        } catch (error) {
          console.error('Error getting catalog product', {
            context: { error, designProduct: parent },
          })

          throw new GraphQLError('Error getting catalog product')
        }

        let availableVariants: NexusGenObjects['DesignProductVariant'][] = []

        for (const variant of catalogProductVariants) {
          const colorOption = variant.option_values?.find(
            option => option.option_display_name === 'Color',
          )

          if (
            parent.colors.some(
              color =>
                color.catalogProductColorId === colorOption?.id.toString(),
            )
          ) {
            const sizeOption = variant.option_values?.find(
              option => option.option_display_name === 'Size',
            )

            availableVariants.push({
              id: variant.id.toString(),
              catalogProductId: parent.catalogProductId,
              catalogProductVariantId: variant.id.toString(),
              catalogProductColorId: colorOption?.id.toString(),
              catalogProductSizeId: sizeOption?.id.toString(),
              sizeName: sizeOption?.label,
            })
          }
        }

        return availableVariants
      },
    })
  },
})
