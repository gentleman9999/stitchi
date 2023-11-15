import { gql } from '@apollo/client'
import CatalogProductLegacy, {
  CatalogProductLegacyFragments,
} from '@components/common/CatalogProductLegacy'
import { ProductShowPageRelatedProductsProductFragment } from '@generated/types'
import React from 'react'

interface Props {
  products: ProductShowPageRelatedProductsProductFragment[]
}

const ProductShowPageRelatedProducts = (props: Props) => {
  if (!props.products.length) return null

  return (
    <>
      <h2 className="font-semibold text-xl">Related products</h2>
      <div className="flex flex-row gap-2 overflow-x-scroll">
        {props.products.map(product => (
          <div key={product.id} className="flex-1 min-w-[200px] flex">
            <CatalogProductLegacy productId={product.id} priority={false} />
          </div>
        ))}
      </div>
    </>
  )
}

ProductShowPageRelatedProducts.fragments = {
  product: gql`
    ${CatalogProductLegacyFragments.product}
    fragment ProductShowPageRelatedProductsProductFragment on Product {
      id
      ...CatalogProductLegacyProductFragment
    }
  `,
}

export default ProductShowPageRelatedProducts
