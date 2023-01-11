import { gql } from '@apollo/client'
import { FeaturePageContainer } from '@components/common'
import { Container } from '@components/ui'
import { DistributionPageCatalogFragment } from '@generated/DistributionPageCatalogFragment'
import routes from '@lib/routes'
import makeAbsoluteUrl from '@utils/get-absolute-url'
import React from 'react'
import DistributionPageAdvantages from './DistributionPageAdvantages'
import DistributionPageFeatures from './DistributionPageFeatures'
import DistributorPageHero from './DistributorPageHero'

interface DistributionPageProps {
  catalog?: DistributionPageCatalogFragment | null
}

const DistributionPage = ({ catalog }: DistributionPageProps) => {
  return (
    <FeaturePageContainer
      canonicalUrl={makeAbsoluteUrl(
        routes.internal.features.distribution.href(),
      )}
      seoTitle="Automated merch fulfillment, promotional product distribution"
      seoDescription="Stitchi provides easy-to-use, cost-effective solutions for automated merchandising distribution. We're the 'best in class' when it comes to all things promotional products. Say goodbye to manually packing and shipping thousands of orders each month."
      catalog={catalog}
    >
      <DistributorPageHero />
      <Container>
        <DistributionPageAdvantages />
      </Container>
      <Container>
        <DistributionPageFeatures />
      </Container>
    </FeaturePageContainer>
  )
}

DistributionPage.fragments = {
  catalog: gql`
    ${FeaturePageContainer.fragments.catalog}
    fragment DistributionPageCatalogFragment on Site {
      ...FeaturePageContainerCatalogFragment
    }
  `,
}

export default DistributionPage
