import React from 'react'
import {
  Container,
  Typography,
  Grid,
  Card,
  CardHeader,
  CardContent,
} from '@components/ui'
import { ComponentErrorMessage } from '@components/common'

const manufacturers = ['Gildan', 'Nike', 'Adidas', 'New Balance']

export const makeProduct = (index: number) => ({
  id: index,
  name: `Lightweight Unisex T-Shirt ${index}`,
  primaryVendor: `S&S Activewear`,
  manufacturer: manufacturers[index % manufacturers.length],
  categories: Array.from(new Array(3)).map((_, i) => [`category ${i}`]),
  status: 'active',
})

interface Props {
  product?: ReturnType<typeof makeProduct> | null
  loading?: boolean
}

const ProductShowPage = ({ product, loading }: Props) => {
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
                <li>Manufacturer: {product?.manufacturer}</li>
                <li>Vendor: {product?.primaryVendor}</li>
                <li>Categories: {product?.categories.join(', ')}</li>
                <li>Status: {product?.status}</li>
              </ul>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  )
}

export default ProductShowPage
