import React from 'react'
import { gql } from '@apollo/client'
import { Avatar, Skeleton, Typography, Box } from '@components/ui'
import { PageHeadingProductFragment } from '@generated/PageHeadingProductFragment'

interface Props {
  product?: PageHeadingProductFragment | null
}

const PageHeading = ({ product }: Props) => {
  if (!product) {
    return (
      <Box sx={{ display: 'flex' }}>
        <Skeleton>
          <Avatar />
        </Skeleton>
        <Skeleton variant="text">
          <Typography variant="h4" />
        </Skeleton>
      </Box>
    )
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <Avatar src={product.primaryImage?.url} sx={{ width: 80, height: 80 }} />
      <Box sx={{ marginLeft: 2 }}>
        <Typography variant="h5" component="h1">
          <b>{product?.name}</b>
        </Typography>
      </Box>
    </Box>
  )
}

export default PageHeading

PageHeading.fragments = {
  product: gql`
    fragment PageHeadingProductFragment on CatalogProduct {
      id
      name
      primaryImage {
        id
        url
        width
        height
      }
    }
  `,
}
