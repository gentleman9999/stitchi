import React from 'react'
import { gql } from '@apollo/client'
import {
  Typography,
  Grid,
  Paper,
  Divider,
  Chip,
  Box,
  Button,
} from '@components/ui'
import { ProductDetailsProductFragment } from '@generated/ProductDetailsProductFragment'
import routes from '@lib/routes'
import { OpenInNewIcon } from '@components/icons'

interface Props {
  product?: ProductDetailsProductFragment | null
}

const ProductDetails = ({ product }: Props) => {
  return (
    <Paper sx={{ padding: 3 }}>
      <Grid container>
        <Grid item xs>
          <Typography variant="h6">Product Details</Typography>
          <Typography variant="subtitle2">
            Details about this product.
          </Typography>
        </Grid>
        {product?.manufacturer && (
          <Grid item xs="auto">
            <Button
              variant="outlined"
              size="small"
              component="a"
              href={routes.external.ssActivewear.product.show.href({
                brandSlug: product.manufacturer.slug,
                productStyle: product.style,
              })}
              target="_blank"
              rel="noopener noreferrer"
              endIcon={<OpenInNewIcon />}
            >
              View on SS Activewear
            </Button>
          </Grid>
        )}
      </Grid>

      <Divider sx={{ marginY: 3 }} />
      <Grid container spacing={2}>
        <DetailItem label="Manufacturer" value={product?.manufacturer?.name} />
        <DetailItem label="Vendor" value={product?.vendor?.name} />
        <DetailItem
          label="Sizes"
          value={
            <Grid container spacing={0.2}>
              {product?.sizes?.map(size => (
                <Grid item key={size.id}>
                  <Chip label={size.name ?? size.value} size="small" />
                </Grid>
              ))}
            </Grid>
          }
        />
        <DetailItem
          label="Colors"
          value={
            <Grid container spacing={0.2}>
              {product?.colors?.map(color => (
                <Grid item key={color.id}>
                  <Chip
                    variant="outlined"
                    size="small"
                    label={color.name ?? color.hex}
                    icon={
                      <Box
                        sx={{
                          width: 18,
                          height: 18,
                          bgcolor: `#${color.hex}`,
                          borderRadius: '50%',
                        }}
                      />
                    }
                  />
                </Grid>
              ))}
            </Grid>
          }
        />
        <DetailItem
          label="Categories"
          value={
            <Grid container spacing={0.2}>
              {product?.categories?.map(category => (
                <Grid item key={category.id}>
                  <Chip
                    label={category.breadcrumbs
                      ?.map(crumb => crumb.name)
                      .join(' ➝ ')}
                    size="small"
                  />
                </Grid>
              ))}
            </Grid>
          }
        />
      </Grid>
    </Paper>
  )
}

const DetailItem = (props: {
  label: string
  value?: React.ReactNode | string | null
}) => (
  <Grid item xs={6} md={4} lg={3}>
    <Typography variant="body2">{props.label}</Typography>
    <Typography variant="subtitle1">{props.value}</Typography>
  </Grid>
)

ProductDetails.fragments = {
  product: gql`
    fragment ProductDetailsProductFragment on Material {
      id
      name
      style
      sizes {
        id
        name
        value
      }
      colors {
        id
        hex
        name
      }
      manufacturer {
        id
        name
        slug
      }
      vendor {
        id
        name
      }
      categories {
        id
        breadcrumbs {
          id
          name
        }
      }
    }
  `,
}

export default ProductDetails
