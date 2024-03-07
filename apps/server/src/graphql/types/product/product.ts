import { objectType } from 'nexus'
import catalogData from '../../../generated/catalog.json'

export const Product = objectType({
  name: 'Product',
  definition: t => {
    t.nonNull.id('id')
    t.nonNull.string('name', {
      resolve: parent => {
        let manipulatedValue = (parent as any).name

        if (typeof manipulatedValue === 'string') {
          // BigCommerce product names are stored with SKU at end to make them unique
          const skuRegex = /\s*\[[a-zA-Z0-9]+\]$/
          manipulatedValue = manipulatedValue.replace(skuRegex, '')

          const brandInName = catalogData.brands
            .map(brand => brand.name)
            .find(brand => manipulatedValue.includes(brand))

          if (brandInName) {
            manipulatedValue = manipulatedValue.replace(brandInName, '')
          }
        }
        return manipulatedValue.trim()
      },
    })
  },
})

export const Variant = objectType({
  name: 'Variant',
  definition: t => {
    t.nonNull.id('id')
  },
})
