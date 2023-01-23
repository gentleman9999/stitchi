import { gql, useQuery } from '@apollo/client'
import { ComponentErrorMessage } from '@components/common'
import { PrimaryLayout } from '@components/layout'
import { IndustryTermsShowPage } from '@components/pages'
import {
  PromotionalProductGlossaryTermGetDataQuery,
  PromotionalProductGlossaryTermGetDataQueryVariables,
} from '@generated/PromotionalProductGlossaryTermGetDataQuery'
import { PromotionalProductGlossaryTermGetPagesQuery } from '@generated/PromotionalProductGlossaryTermGetPagesQuery'
import { addApolloState, initializeApollo } from '@lib/apollo'
import routes from '@lib/routes'
import makeAbsoluteUrl from '@utils/get-absolute-url'
import { GetStaticPaths, GetStaticPathsResult, GetStaticProps } from 'next'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import React, { ReactElement } from 'react'

const getStaticPaths: GetStaticPaths = async () => {
  const client = initializeApollo()

  const { data } =
    await client.query<PromotionalProductGlossaryTermGetPagesQuery>({
      query: GET_PAGES,
    })

  const paths: GetStaticPathsResult['paths'] = []

  data.allGlossaryEntries.forEach(entry => {
    // We only create pages for terms that have a description
    if ((entry.description?.value?.document?.children?.length || 0) > 1) {
      paths.push({ params: { termSlug: entry.slug ?? undefined } })
    }
  })

  return { paths, fallback: 'blocking' }
}

const getStaticProps: GetStaticProps = async ({ params }) => {
  const { termSlug } = params || {}

  if (!termSlug || typeof termSlug !== 'string') {
    return {
      notFound: true,
    }
  }

  const client = initializeApollo()

  await client.query<
    PromotionalProductGlossaryTermGetDataQuery,
    PromotionalProductGlossaryTermGetDataQueryVariables
  >({ query: GET_DATA, variables: { slug: termSlug } })

  return addApolloState(client, { props: {} })
}

const PromotionalProductGlossaryTerm = () => {
  const { query } = useRouter()
  const { termSlug } = query

  const { data, loading, error } = useQuery<
    PromotionalProductGlossaryTermGetDataQuery,
    PromotionalProductGlossaryTermGetDataQueryVariables
  >(GET_DATA, {
    variables: { slug: termSlug?.toString() || '' },
    skip: !termSlug,
  })

  if (error) {
    return <ComponentErrorMessage error={error} />
  }

  const { glossaryEntry, relatedTerms } = data || {}

  if (loading) {
    return null
  } else if (!glossaryEntry) {
    return (
      <ComponentErrorMessage
        error={`Failed to fetch glossary entry for slug ${termSlug}`}
      />
    )
  }

  const url = makeAbsoluteUrl(
    routes.internal.glossary.show.href(glossaryEntry.slug || ''),
  )

  return (
    <>
      <NextSeo
        title={glossaryEntry.term || 'Promotional product glossary'}
        description={glossaryEntry.definition || undefined}
        canonical={url}
        openGraph={{
          url,
        }}
      />
      <IndustryTermsShowPage
        term={glossaryEntry}
        relatedTerms={relatedTerms || []}
      />
    </>
  )
}

PromotionalProductGlossaryTerm.getLayout = (page: ReactElement) => (
  <PrimaryLayout>{page}</PrimaryLayout>
)

const GET_DATA = gql`
  ${IndustryTermsShowPage.fragments.term}
  ${IndustryTermsShowPage.fragments.relatedTerms}
  query PromotionalProductGlossaryTermGetDataQuery($slug: String!) {
    glossaryEntry(filter: { slug: { eq: $slug } }) {
      id
      term
      definition
      ...IndustryTermsShowPageTermFragment
    }
    relatedTerms: allGlossaryEntries(
      filter: { description: { exists: true }, slug: { neq: $slug } }
      first: 3
    ) {
      id
      ...IndustryTermsShowPageRelatedTermsFragment
    }
  }
`

const GET_PAGES = gql`
  query PromotionalProductGlossaryTermGetPagesQuery {
    allGlossaryEntries(first: 100) {
      id
      slug
      description {
        value
      }
    }
  }
`

export default PromotionalProductGlossaryTerm
export { getStaticPaths, getStaticProps }
