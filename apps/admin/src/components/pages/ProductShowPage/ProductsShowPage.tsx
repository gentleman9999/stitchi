import React from 'react'
import { gql, useQuery } from '@apollo/client'
import { Container, Typography, Grid, Paper, Divider } from '@components/ui'
import { ComponentErrorMessage } from '@components/common'
import {
  ProductShowPageGetProductQuery,
  ProductShowPageGetProductQueryVariables,
} from '@generated/ProductShowPageGetProductQuery'
import PageHeading from './PageHeading'
import ProductDetails from './ProductDetails'
import ProductVariants from './ProductVariants'

interface Props {
  productId: string
}

const ProductShowPage = ({ productId }: Props) => {
  const { data, loading, error } = useQuery<
    ProductShowPageGetProductQuery,
    ProductShowPageGetProductQueryVariables
  >(GET_PRODUCT, {
    variables: { id: productId },
  })

  if (error) {
    return <ComponentErrorMessage error={error.message} />
  }

  const product = data?.catalog?.product

  if (!product && !loading) {
    return (
      <ComponentErrorMessage error="Something went wrong. Please try again." />
    )
  }

  return (
    <Container>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <PageHeading product={product} />
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <ProductDetails product={product} />
            </Grid>
            <Grid item xs={12}>
              <ProductVariants product={product} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}

const GET_PRODUCT = gql`
  ${PageHeading.fragments.product}
  ${ProductDetails.fragments.product}
  ${ProductVariants.fragments.product}
  query ProductShowPageGetProductQuery($id: ID!) {
    catalog {
      product(id: $id) {
        id
        ...ProductDetailsProductFragment
        ...ProductVariantsProductFragment
        ...PageHeadingProductFragment
      }
    }
  }
`

export default ProductShowPage
