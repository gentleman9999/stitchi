import { Container } from '@components/ui'
import React from 'react'
import ProductPicker from './ProductPicker'

interface Props {}

const ClosetDesignCreatePage = (props: Props) => {
  return (
    <Container>
      <ProductPicker />
    </Container>
  )
}

export default ClosetDesignCreatePage
