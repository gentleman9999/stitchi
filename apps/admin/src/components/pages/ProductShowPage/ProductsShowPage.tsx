import React from 'react'
import { gql, useQuery } from '@apollo/client'
import { Container, Typography, Grid, Paper, Divider } from '@components/ui'
import { ComponentErrorMessage } from '@components/common'
import {
  ProductShowPageGetProductQuery,
  ProductShowPageGetProductQueryVariables,
} from '@generated/ProductShowPageGetProductQuery'
import PageHeading from './PageHeading'

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
          <Grid container>
            <Grid item xs={12}>
              <Paper sx={{ padding: 3 }}>
                <Typography variant="h6">Product Details</Typography>
                <Typography variant="subtitle2">
                  Details about this product.
                </Typography>
                <Divider sx={{ marginY: 3 }} />
                <Grid container>
                  <DetailItem
                    label="Manufacturer"
                    value={product?.manufacturer?.name}
                  />
                  <DetailItem label="Vendor" value={product?.vendor?.name} />
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}

const DetailItem = (props: { label: string; value?: string | null }) => (
  <Grid item xs={6} md={4} lg={3}>
    <Typography variant="body2">{props.label}</Typography>
    <Typography variant="subtitle1">{props.value}</Typography>
  </Grid>
)

const GET_PRODUCT = gql`
  ${PageHeading.fragments.product}
  query ProductShowPageGetProductQuery($id: ID!) {
    catalog {
      product(id: $id) {
        id
        name
        manufacturer {
          id
          name
        }
        vendor {
          id
          name
        }
        ...PageHeadingProductFragment
      }
    }
  }
`

export default ProductShowPage
