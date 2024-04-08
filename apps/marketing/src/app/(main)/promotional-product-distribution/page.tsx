import { gql } from '@apollo/client'
import { PromotionalProductsDistributionGetDataQuery } from '@generated/PromotionalProductsDistributionGetDataQuery'
import { getClient } from '@lib/apollo-rsc'
import routes from '@lib/routes'
import { Metadata } from 'next'
import DistributionPageAdvantages from './DistributionPageAdvantages'
import DistributionPageFeatures from './DistributionPageFeatures'
import DistributorPageHero from './DistributorPageHero'
import Container from '@components/ui/Container'
import FeaturePageContainer from '@components/common/FeaturePageContainer'

export const metadata: Metadata = {
  title: 'Automated merch fulfillment, promotional product distribution',
  description:
    "Stitchi provides easy-to-use, cost-effective solutions for automated merchandising distribution. We're the 'best in class' when it comes to all things promotional products. Say goodbye to manually packing and shipping thousands of orders each month.",
  openGraph: { url: routes.internal.solutions.distribution.href() },
}

const PromotionalProductsDistribution = async () => {
  const client = await getClient()
  const {
    data: { site },
  } = await client.query<PromotionalProductsDistributionGetDataQuery>({
    query: GET_DATA,
  })

  return (
    <FeaturePageContainer>
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

const GET_DATA = gql`
  ${FeaturePageContainer.fragments.catalog}

  query PromotionalProductsDistributionGetDataQuery {
    site {
      ...FeaturePageContainerCatalogFragment
    }
  }
`

export default PromotionalProductsDistribution
