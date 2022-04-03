import React from 'react'
import { gql, useQuery } from '@apollo/client'
import { Container, Grid } from '@components/ui'
import { ComponentErrorMessage, DetailPageHeading } from '@components/common'
import {
  ProductShowPageGetProductQuery,
  ProductShowPageGetProductQueryVariables,
} from '@generated/ProductShowPageGetProductQuery'
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
          <DetailPageHeading
            loading={!product}
            title={product?.name}
            avatarUrl={product?.image?.url}
          />
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
  ${ProductDetails.fragments.product}
  ${ProductVariants.fragments.product}
  query ProductShowPageGetProductQuery($id: ID!) {
    catalog {
      product(id: $id) {
        id
        name
        image {
          id
          url
        }
        ...ProductDetailsProductFragment
        ...ProductVariantsProductFragment
      }
    }
  }
`

export default ProductShowPage
