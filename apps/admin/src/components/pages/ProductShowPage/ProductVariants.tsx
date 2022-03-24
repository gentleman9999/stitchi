import React from 'react'
import {
  Typography,
  Grid,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Box,
} from '@components/ui'
import { gql } from '@apollo/client'
import {
  ProductVariantsProductFragment,
  ProductVariantsProductFragment_variants,
} from '@generated/ProductVariantsProductFragment'

interface Props {
  product?: ProductVariantsProductFragment | null
}

const ProductVariants = ({ product }: Props) => {
  // Instead of showing all the possible color / size combinations, just show colors and assume all sizes apply
  const variants =
    product?.variants?.reduce<ProductVariantsProductFragment_variants[]>(
      (prev, variant) => {
        if (!prev.find(v => v.color?.name === variant.color?.name)) {
          prev.push(variant)
        }

        return prev
      },
      [],
    ) || []

  return (
    <Paper sx={{ padding: 3 }}>
      <Typography variant="h6">Product Variants</Typography>
      <Divider sx={{ marginY: 3 }} />
      <List>
        {variants?.map(variant => (
          <ListItem divider key={variant.id}>
            <ListItemAvatar>
              <Avatar />
            </ListItemAvatar>
            <ListItemText sx={{ display: 'flex' }}>
              <Grid container spacing={2}>
                <Grid item>
                  <Box
                    sx={{
                      width: 30,
                      height: 30,
                      borderRadius: '50%',
                      border: `1px solid`,
                      borderColor: 'gray.500',
                      bgcolor: `#${variant.color?.hex}`,
                    }}
                  />
                </Grid>
                <Grid item>
                  <Typography>{variant.color?.name}</Typography>
                </Grid>
              </Grid>
            </ListItemText>
          </ListItem>
        ))}
      </List>
    </Paper>
  )
}

ProductVariants.fragments = {
  product: gql`
    fragment ProductVariantsProductFragment on Material {
      id
      variants {
        id
        color {
          id
          name
          hex
        }
      }
    }
  `,
}

export default ProductVariants
