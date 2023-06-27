import { gql } from '@apollo/client'
import CatalogProduct from '@components/common/CatalogProduct'
import { DesignRequestOverviewProductListProductFragment } from '@generated/DesignRequestOverviewProductListProductFragment'
import React from 'react'

interface Props {
  products: DesignRequestOverviewProductListProductFragment[]
}

const DesignRequestOverviewProductList = ({ products }: Props) => {
  return (
    <div>
      {products.map(product =>
        product.product ? (
          <div key={product.id}>
            <CatalogProduct product={product.product} priority />
          </div>
        ) : null,
      )}
    </div>
  )
}

DesignRequestOverviewProductList.fragments = {
  product: gql`
    ${CatalogProduct.fragments.product}
    fragment DesignRequestOverviewProductListProductFragment on DesignRequestProduct {
      id
      product {
        id
        ...CatalogProductProductFragment
      }
    }
  `,
}

export default DesignRequestOverviewProductList
