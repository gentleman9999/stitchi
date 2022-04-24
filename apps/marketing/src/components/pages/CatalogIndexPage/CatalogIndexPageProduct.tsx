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
        <div className="relative w-full h-[200px]">
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
