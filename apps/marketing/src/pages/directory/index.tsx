import { gql, useQuery } from '@apollo/client'
import { ComponentErrorMessage } from '@components/common'
import { PrimaryLayout } from '@components/layout'
import { IndustryTermsIndexPage } from '@components/pages'
import { PromotionalProductGlossaryGetDataQuery } from '@generated/PromotionalProductGlossaryGetDataQuery'
import { addApolloState, initializeApollo } from '@lib/apollo'
import routes from '@lib/routes'
import makeAbsoluteUrl from '@utils/get-absolute-url'
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
  const url = makeAbsoluteUrl(routes.internal.glossary.href())

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
        canonical={url}
        openGraph={{ url }}
      />
      <IndustryTermsIndexPage
        entries={data?.allGlossaryEntries || []}
        categories={data?.allGlossaryCategories || []}
      />
    </>
  )
}

PromotionalProductGlossary.getLayout = (page: ReactElement) => (
  <PrimaryLayout>{page}</PrimaryLayout>
)

const GET_DATA = gql`
  ${IndustryTermsIndexPage.fragments.entry}
  ${IndustryTermsIndexPage.fragments.category}
  query PromotionalProductGlossaryGetDataQuery {
    allGlossaryCategories(
      first: 100
      orderBy: title_ASC
      filter: { OR: [{ title: {} }] }
    ) {
      id
      ...IndustryTermsIndexPageCategoryFragment
    }
    allGlossaryEntries(first: 100, orderBy: term_ASC) {
      id
      ...IndustryTermsIndexPageEntryFragment
    }
  }
`

export default PromotionalProductGlossary
export { getStaticProps }
