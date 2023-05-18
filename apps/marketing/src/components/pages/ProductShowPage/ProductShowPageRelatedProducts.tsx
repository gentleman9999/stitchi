import { gql } from '@apollo/client'
import CatalogProduct from '@components/common/CatalogProduct'
import { ProductShowPageRelatedProductsProductFragment } from '@generated/ProductShowPageRelatedProductsProductFragment'
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
            <CatalogProduct product={product} priority={false} />
          </div>
        ))}
      </div>
    </>
  )
}

ProductShowPageRelatedProducts.fragments = {
  product: gql`
    ${CatalogProduct.fragments.product}
    fragment ProductShowPageRelatedProductsProductFragment on Product {
      id
      ...CatalogProductProductFragment
    }
  `,
}

export default ProductShowPageRelatedProducts