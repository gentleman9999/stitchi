import { gql } from '@apollo/client'
import { Dialog } from '@components/ui'
import { ProductDialogProductFragment } from '@generated/ProductDialogProductFragment'
import React from 'react'

interface Props {
  product: ProductDialogProductFragment
}

const ProductDialog = ({ product }: Props) => {
  const handleClose = () => {}
  return (
    <Dialog open={true} onClose={handleClose}>
      <Dialog.Title>{product.name}</Dialog.Title>
      <Dialog.Content>
        <Dialog.ContentText>{product.description}</Dialog.ContentText>
      </Dialog.Content>
    </Dialog>
  )
}

ProductDialog.fragments = {
  product: gql`
    fragment ProductDialogProductFragment on Product {
      id
      name
      description
    }
  `,
}

export default ProductDialog
