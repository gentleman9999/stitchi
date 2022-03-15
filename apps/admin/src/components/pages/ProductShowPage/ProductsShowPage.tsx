import React from 'react'
import { gql, useQuery } from '@apollo/client'
import {
  Container,
  Typography,
  Grid,
  Card,
  CardHeader,
  CardContent,
} from '@components/ui'
import { ComponentErrorMessage } from '@components/common'
import {
  ProductShowPageGetProductQuery,
  ProductShowPageGetProductQueryVariables,
} from '@generated/ProductShowPageGetProductQuery'

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
      <Typography variant="h4" component="h1">
        {product?.name}
      </Typography>
      <Grid container>
        <Grid item xs={12}>
          <Card>
            <CardHeader title="Product Details" />
            <CardContent>
              <ul>
                <li>Manufacturer: {product?.manufacturer?.name}</li>
                <li>Vendor: {product?.vendor?.name}</li>
              </ul>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  )
}

const GET_PRODUCT = gql`
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
      }
    }
  }
`

export default ProductShowPage
