import { Section } from '@components/common'
import { Container } from '@components/ui'
import React from 'react'
import ProductPicker from './ProductPicker'

interface Props {}

const ClosetDesignCreatePage = (props: Props) => {
  return (
    <Container>
      <Section gutter="md">
        <ProductPicker />
      </Section>
    </Container>
  )
}

export default ClosetDesignCreatePage
