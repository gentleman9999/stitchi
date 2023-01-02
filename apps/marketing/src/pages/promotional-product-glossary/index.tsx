import { gql, useQuery } from '@apollo/client'
import { ComponentErrorMessage } from '@components/common'
import { PrimaryLayout } from '@components/layout'
import { RelatedTermsIndexPage } from '@components/pages'
import { PromotionalProductGlossaryGetDataQuery } from '@generated/PromotionalProductGlossaryGetDataQuery'
import { addApolloState, initializeApollo } from '@lib/apollo'
import React, { ReactElement } from 'react'

const getStaticProps = async () => {
  const client = initializeApollo()

  await client.query<PromotionalProductGlossaryGetDataQuery>({
    query: GET_DATA,
  })

  return addApolloState(client, { props: {} })
}

const PromotionalProductGlossary = () => {
  const { data, error } =
    useQuery<PromotionalProductGlossaryGetDataQuery>(GET_DATA)

  if (error) {
    return <ComponentErrorMessage error={error} />
  }

  return <RelatedTermsIndexPage entries={data?.allGlossaryEntries || []} />
}

PromotionalProductGlossary.getLayout = (page: ReactElement) => (
  <PrimaryLayout>{page}</PrimaryLayout>
)

const GET_DATA = gql`
  ${RelatedTermsIndexPage.fragments.entry}
  query PromotionalProductGlossaryGetDataQuery {
    allGlossaryEntries(first: 100, orderBy: term_ASC) {
      id
      ...RelatedTermsIndexPageEntryFragment
    }
  }
`

export default PromotionalProductGlossary
export { getStaticProps }
