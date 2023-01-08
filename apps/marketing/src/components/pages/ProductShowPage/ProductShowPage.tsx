import { gql } from '@apollo/client'
import { ProductShowPageProductFragment } from '@generated/ProductShowPageProductFragment'
import React from 'react'
import CatalogIndexPage from '../CatalogIndexPage'
import ProductDialog from './ProductDialog/ProductDialog'

interface Props {
  product: ProductShowPageProductFragment
}

const ProductShowPage = ({ product }: Props) => {
  return (
    <>
      <ProductDialog product={product} />
      <CatalogIndexPage isBackground />
    </>
  )
}

ProductShowPage.fragments = {
  product: gql`
    ${ProductDialog.fragments.product}
    fragment ProductShowPageProductFragment on Product {
      id
      ...ProductDialogProductFragment
    }
  `,
}

export default ProductShowPage
