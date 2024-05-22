import { gql } from '@apollo/client'
import FeaturePageTestimonial from '@components/common/FeaturePageContainer/FeaturePageTestimonial'
import Container from '@components/ui/Container'
import { FeaturePageContainerCatalogFragment } from '@generated/FeaturePageContainerCatalogFragment'
import React from 'react'
import FeaturedProductsGrid, {
  FeaturedProductsGridFragments,
} from '../FeaturedProductsGrid'

interface Props {
  children: React.ReactNode
  catalog?: FeaturePageContainerCatalogFragment | null
}

const FeaturePageContainer = ({ children, catalog }: Props) => {
  return (
    <>
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
    ${FeaturedProductsGridFragments.catalog}
    fragment FeaturePageContainerCatalogFragment on Site {
      ...FeaturedProductsGridCatalogFragment
    }
  `,
}

export default FeaturePageContainer
