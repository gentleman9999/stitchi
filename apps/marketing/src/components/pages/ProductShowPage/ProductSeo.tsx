import { gql } from '@apollo/client'
import { ProductSeoProductFragment } from '@generated/ProductSeoProductFragment'
import { NextSeo, NextSeoProps } from 'next-seo'
import { OpenGraphMedia } from 'next-seo/lib/types'
import React from 'react'

interface Props {
  product: ProductSeoProductFragment
}

const ProductSeo = ({ product }: Props) => {
  const title = makeProductTitle(product)

  const seoProps: NextSeoProps = {
    title,
    description: product.seo.metaDescription || product.plainTextDescription,
    openGraph: {
      title,
      images: makeImages(product),
    },
  }

  return <NextSeo {...seoProps} />
}

const makeProductTitle = (product: ProductSeoProductFragment) => {
  return `${product.brand ? `${product.brand.name} ` : ''}${product.name}`
}

const makeImages = (product: ProductSeoProductFragment): OpenGraphMedia[] => {
  const { defaultImage: image } = product
  if (!image) {
    return []
  }

  return [
    {
      url: image.seoImageUrl,
      width: 1000,
      alt: makeProductTitle(product),
    },
  ]
}

ProductSeo.fragments = {
  product: gql`
    fragment ProductSeoProductFragment on Product {
      id
      name
      plainTextDescription
      defaultImage {
        seoImageUrl: url(width: 1000)
      }
      brand {
        id
        name
      }
      seo {
        metaDescription
      }
    }
  `,
}

export default ProductSeo
