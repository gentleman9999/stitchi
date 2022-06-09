import { gql, useQuery } from '@apollo/client'
import { PrimaryLayout } from '@components/layout'
import { DesignPage } from '@components/pages'
import { PromotionalProductsDesigngetDataQuery } from '@generated/PromotionalProductsDesigngetDataQuery'
import { addApolloState, initializeApollo } from '@lib/apollo'
import { ReactElement } from 'react'

export const getStaticProps = async () => {
  const client = initializeApollo()

  await client.query<PromotionalProductsDesigngetDataQuery>({
    query: GET_DATA,
  })

  return addApolloState(client, {
    props: {},
  })
}

const PromotionalProductsDesign = () => {
  const { data } = useQuery<PromotionalProductsDesigngetDataQuery>(GET_DATA)
  return <DesignPage catalog={data?.site} />
}

PromotionalProductsDesign.getLayout = (page: ReactElement) => (
  <PrimaryLayout>{page}</PrimaryLayout>
)

const GET_DATA = gql`
  ${DesignPage.fragments.catalog}
  query PromotionalProductsDesigngetDataQuery {
    site {
      ...DesignPageCatalogFragment
    }
  }
`

export default PromotionalProductsDesign
