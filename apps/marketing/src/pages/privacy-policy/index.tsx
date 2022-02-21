import { gql, useQuery } from '@apollo/client'
import { ComponentErrorMessage } from '@components/common'
import { PrimaryLayout } from '@components/layout'
import { PrivacyPage } from '@components/pages'
import { PrivacyGetDataQuery } from '@generated/PrivacyGetDataQuery'
import { addApolloState, initializeApollo } from '@lib/apollo'
import { GetStaticProps } from 'next'
import React, { ReactElement } from 'react'

const getStaticProps: GetStaticProps = async () => {
  const client = initializeApollo()

  await client.query<PrivacyGetDataQuery>({ query: GET_DATA })

  return addApolloState(client, { props: {} })
}

const Privacy = () => {
  const { data } = useQuery<PrivacyGetDataQuery>(GET_DATA)

  if (!data?.privacyPolicyPage) {
    return <ComponentErrorMessage error="Failed to load page" />
  }

  return <PrivacyPage page={data.privacyPolicyPage} />
}

Privacy.getLayout = (page: ReactElement) => (
  <PrimaryLayout>{page}</PrimaryLayout>
)

const GET_DATA = gql`
  ${PrivacyPage.fragments.page}
  query PrivacyGetDataQuery {
    privacyPolicyPage {
      id
      ...PrivacyPagePageFragment
    }
  }
`

export { getStaticProps }
export default Privacy
