import { gql, useQuery } from '@apollo/client'
import { ComponentErrorMessage } from '@components/common'
import { PrimaryLayout } from '@components/layout'
import { RelatedTermsShowPage } from '@components/pages'
import {
  PromotionalProductGlossaryTermGetDataQuery,
  PromotionalProductGlossaryTermGetDataQueryVariables,
} from '@generated/PromotionalProductGlossaryTermGetDataQuery'
import { PromotionalProductGlossaryTermGetPagesQuery } from '@generated/PromotionalProductGlossaryTermGetPagesQuery'
import { addApolloState, initializeApollo } from '@lib/apollo'
import { GetStaticPaths, GetStaticPathsResult, GetStaticProps } from 'next'
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
    paths.push({ params: { termSlug: entry.slug ?? undefined } })
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

  const { glossaryEntry } = data || {}

  if (loading) {
    return null
  } else if (!glossaryEntry) {
    return (
      <ComponentErrorMessage
        error={`Failed to fetch glossary entry for slug ${termSlug}`}
      />
    )
  }

  return <RelatedTermsShowPage term={glossaryEntry} />
}

PromotionalProductGlossaryTerm.getLayout = (page: ReactElement) => (
  <PrimaryLayout>{page}</PrimaryLayout>
)

const GET_DATA = gql`
  ${RelatedTermsShowPage.fragments.term}
  query PromotionalProductGlossaryTermGetDataQuery($slug: String!) {
    glossaryEntry(filter: { slug: { eq: $slug } }) {
      id
      ...RelatedTermsShowPageTermFragment
    }
  }
`

const GET_PAGES = gql`
  query PromotionalProductGlossaryTermGetPagesQuery {
    allGlossaryEntries(first: 100) {
      id
      slug
    }
  }
`

export default PromotionalProductGlossaryTerm
export { getStaticPaths, getStaticProps }