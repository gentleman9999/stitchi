import React from 'react'
import CatalogIndexPageProduct from './CatalogIndexPageProduct'

const image = {
  label: 'Catalog',
  url: 'http://www.ooshirts.com/products/5/catalog.jpg',
}

export const product = (id: number) => ({
  id: id,
  name: `Gildan Sweatshirt - Crew - ${id}`,
  type: 'Garment',
  brand: 'Gildan',
  material: '7.75 oz 50% cotton, 50% polyester.',
  style: '18000',
  externalProductId: 'gildan-sweatshirt-crew',
  externalProductSource: 'scalablepress',
  ratings: {
    quality: 3,
    softness: 3,
    weight: 1,
  },
  description:
    'Air Jet Spun Yarn. Double-needle stitching. Set-in sleeves. 1x1 Athletic Rib with Lycra(R). Quarter-turned to eliminate center crease.',
  colors: [
    {
      name: 'Kiwi',
      hex: '88b95d',
    },
  ],
  primaryImage: image,
  additionalImages: [image, image, image],
})

const products = Array.from(new Array(15), (_, i) => product(i))

interface Props {}

const CatalogIndexPageProductGrid = (props: Props) => {
  return (
    <ul className="grid grid-cols-3 gap-4">
      {products.map(product => (
        <li key={product.id}>
          <CatalogIndexPageProduct product={product} />
        </li>
      ))}
    </ul>
  )
}

export default CatalogIndexPageProductGrid
