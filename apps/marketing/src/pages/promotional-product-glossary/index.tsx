import { gql, useQuery } from '@apollo/client'
import { ComponentErrorMessage } from '@components/common'
import { PrimaryLayout } from '@components/layout'
import { RelatedTermsIndexPage } from '@components/pages'
import { PromotionalProductGlossaryGetDataQuery } from '@generated/PromotionalProductGlossaryGetDataQuery'
import { addApolloState, initializeApollo } from '@lib/apollo'
import { NextSeo } from 'next-seo'
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

  return (
    <>
      <NextSeo
        title="Promotional Product Industry Terms and Definitions"
        description="Get a better understanding of the promotional product industry with this comprehensive list of terms and definitions. From common acronyms to specialized terminology, this page has everything you need to know to navigate the world of promotional products and custom merchandise."
      />
      <RelatedTermsIndexPage entries={data?.allGlossaryEntries || []} />
    </>
  )
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
