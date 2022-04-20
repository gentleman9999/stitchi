import { Star } from 'icons'
import Image from 'next/image'
import React from 'react'
import { gql } from '@apollo/client'
import { CatalogIndexPageProductProductFragment } from '@generated/CatalogIndexPageProductProductFragment'
import ProductColorOptions from './ProductColorOptions'

export interface Props {
  product: CatalogIndexPageProductProductFragment
}

const CatalogIndexPageProduct = ({ product }: Props) => {
  return (
    <div className="block rounded-2xl border-2 border-gray-100 p-4">
      {product.defaultImage?.url && (
        <div className="relative w-full h-[150px]">
          <Image
            src={product.defaultImage.url}
            alt={product.name}
            layout="fill"
            objectFit="contain"
          />
        </div>
      )}

      <h3 className="mt-4 text-sm font-medium tracking-wide">
        {product.brand?.name} {product.name}
      </h3>
      <div className="mt-4 flex items-center">
        <ProductColorOptions product={product} />
      </div>

      {/* {Object.keys(product.ratings || {}).map(key => (
        <div key={key} className="flex items-center mt-2 justify-between">
          <data className="text-sm">{key}</data>
          <div className="flex gap-1">
            {Array.from(new Array(3), (_, i) => (
              <Star
                fill="none"
                className={cx('stroke-primary', {
                  'fill-primary':
                    product.ratings &&
                    product.ratings[key as keyof typeof product['ratings']] > i,
                })}
              />
            ))}
          </div>
        </div>
      ))} */}
    </div>
  )
}

CatalogIndexPageProduct.fragments = {
  product: gql`
    ${ProductColorOptions.fragments.product}
    fragment CatalogIndexPageProductProductFragment on Product {
      ...ProductColorOptionsProductFragment
      id
      name
      brand {
        id
        name
      }
      defaultImage {
        url(width: 150)
      }
    }
  `,
}

export default CatalogIndexPageProduct
