import { gql } from '@apollo/client'
import FeaturePageTestimonial from '@components/common/FeaturePageContainer/FeaturePageTestimonial'
import { Container } from '@components/ui'
import { FeaturePageContainerCatalogFragment } from '@generated/FeaturePageContainerCatalogFragment'
import { NextSeo } from 'next-seo'
import React from 'react'
import FeaturedProductsGrid from '../FeaturedProductsGrid'

interface Props {
  children: React.ReactNode
  seoTitle: string
  seoDescription: string
  catalog?: FeaturePageContainerCatalogFragment | null
}

const FeaturePageContainer = ({
  children,
  catalog,
  seoTitle,
  seoDescription,
}: Props) => {
  return (
    <>
      <NextSeo title={seoTitle} description={seoDescription} />
      {children}
      <Container>
        <FeaturePageTestimonial />
      </Container>
      {catalog && (
        <Container>
          <FeaturedProductsGrid catalog={catalog} />
        </Container>
      )}
    </>
  )
}

FeaturePageContainer.fragments = {
  catalog: gql`
    ${FeaturedProductsGrid.fragments.catalog}
    fragment FeaturePageContainerCatalogFragment on Site {
      ...FeaturedProductsGridCatalogFragment
    }
  `,
}

export default FeaturePageContainer