import Image from 'next/image'
import React from 'react'

const image = {
  label: 'Catalog',
  url: 'http://www.ooshirts.com/products/5/catalog.jpg',
}

const product = (id: number) => ({
  id: id,
  name: `Gildan Sweatshirt - Crew - ${id}`,
  type: 'Garment',
  brand: 'Gildan',
  material: '7.75 oz 50% cotton, 50% polyester.',
  style: '18000',
  externalProductId: 'gildan-sweatshirt-crew',
  externalProductSource: 'scalablepress',
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
        <li
          key={product.id}
          className="block rounded-lg border-2 border-primary bg-[#f6f9f8] p-4"
        >
          <div className="relative w-full h-[150px]">
            <Image
              src={product.primaryImage.url}
              alt={product.name}
              layout="fill"
              objectFit="contain"
            />
          </div>

          <h3>{product.name}</h3>
        </li>
      ))}
    </ul>
  )
}

export default CatalogIndexPageProductGrid
