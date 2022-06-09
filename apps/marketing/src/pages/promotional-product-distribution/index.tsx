import { gql, useQuery } from '@apollo/client'
import { PrimaryLayout } from '@components/layout'
import { DistributionPage } from '@components/pages'
import { PromotionalProductsDistributionGetDataQuery } from '@generated/PromotionalProductsDistributionGetDataQuery'
import { addApolloState, initializeApollo } from '@lib/apollo'
import { ReactElement } from 'react'

export const getStaticProps = async () => {
  const client = initializeApollo()

  await client.query<PromotionalProductsDistributionGetDataQuery>({
    query: GET_DATA,
  })

  return addApolloState(client, {
    props: {},
  })
}

const PromotionalProductsDistribution = () => {
  const { data } =
    useQuery<PromotionalProductsDistributionGetDataQuery>(GET_DATA)

  return <DistributionPage catalog={data?.site} />
}

PromotionalProductsDistribution.getLayout = (page: ReactElement) => (
  <PrimaryLayout disableNavSpacing>{page}</PrimaryLayout>
)

const GET_DATA = gql`
  ${DistributionPage.fragments.catalog}
  query PromotionalProductsDistributionGetDataQuery {
    site {
      ...DistributionPageCatalogFragment
    }
  }
`

export default PromotionalProductsDistribution
