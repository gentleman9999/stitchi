import { gql } from '@apollo/client'
import { Container } from '@components/ui'
import { ProductShowPageProductFragment } from '@generated/ProductShowPageProductFragment'
import React from 'react'
import ProductDialog from './ProductDialog/ProductDialog'

interface Props {
  product: ProductShowPageProductFragment
}

const ProductShowPage = ({ product }: Props) => {
  return (
    <Container>
      <ProductDialog product={product} />
    </Container>
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
