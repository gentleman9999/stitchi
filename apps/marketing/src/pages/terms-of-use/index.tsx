import { gql, useQuery } from '@apollo/client'
import { ComponentErrorMessage } from '@components/common'
import { PrimaryLayout } from '@components/layout'
import { TermsPage } from '@components/pages'
import { TermsGetDataQuery } from '@generated/TermsGetDataQuery'
import { addApolloState, initializeApollo } from '@lib/apollo'
import { GetStaticProps } from 'next'
import React, { ReactElement } from 'react'

const getStaticProps: GetStaticProps = async () => {
  const client = initializeApollo()

  await client.query<TermsGetDataQuery>({ query: GET_DATA })

  return addApolloState(client, { props: {} })
}

const Terms = () => {
  const { data } = useQuery<TermsGetDataQuery>(GET_DATA)

  if (!data?.termsOfUsePage) {
    return <ComponentErrorMessage error="Failed to load page" />
  }

  return <TermsPage page={data.termsOfUsePage} />
}

Terms.getLayout = (page: ReactElement) => <PrimaryLayout>{page}</PrimaryLayout>

const GET_DATA = gql`
  ${TermsPage.fragments.page}
  query TermsGetDataQuery {
    termsOfUsePage {
      id
      ...TermsPagePageFragment
    }
  }
`
export { getStaticProps }
export default Terms
