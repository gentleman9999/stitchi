import { gql, useQuery } from '@apollo/client'
import Container from '@components/ui/Container'
import LoadingDots from '@components/ui/LoadingDots'

import { addApolloState, initializeApollo } from '@lib/apollo'
import { GetStaticPaths, GetStaticPathsResult, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import ComponentErrorMessage from '../ComponentErrorMessage'
import CmsLandingPageV2, {
  CmsLandingPageAppDirProps,
} from '../CmsLandingPageAppDir'
import {
  IndustriesIndexPageGetDataQuery,
  IndustriesIndexPageGetDataQueryVariables,
  IndustriesIndexPageGetPathDataQuery,
  IndustriesIndexPageGetPathDataQueryVariables,
} from '@generated/types'

export const makeGetStaticPaths =
  (category: string): GetStaticPaths =>
  async () => {
    const client = initializeApollo()

    const { data } = await client.query<
      IndustriesIndexPageGetPathDataQuery,
      IndustriesIndexPageGetPathDataQueryVariables
    >({
      query: GET_PATH_DATA,
      variables: {
        category,
      },
    })

    if (!data.allLandingPages) {
      throw new Error('No landing pages found')
    }

    let paths: GetStaticPathsResult['paths'] = []

    for (const page of data.allLandingPages) {
      if (page.slug) {
        paths.push({
          params: {
            landingPageSlug: page.slug,
          },
        })
      }
    }

    return {
      paths,
      fallback: 'blocking',
    }
  }

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const client = initializeApollo()

  const { landingPageSlug } = params || {}

  if (typeof landingPageSlug !== 'string') {
    console.error('No landing page slug provided', { landingPageSlug })
    return {
      notFound: true,
    }
  }

  await client.query<
    IndustriesIndexPageGetDataQuery,
    IndustriesIndexPageGetDataQueryVariables
  >({
    query: GET_PAGE_DATA,
    variables: {
      slug: landingPageSlug,
    },
  })

  return addApolloState(client, {
    props: {},
  })
}

interface Props {
  href: string
  parentBreadcrumbs?: CmsLandingPageAppDirProps['parentBreadcrumbs']
}

const CmsLandingPage = ({ href, parentBreadcrumbs }: Props) => {
  const { query } = useRouter()

  const landingPageSlug = query.landingPageSlug as string

  const { data, loading, error } = useQuery<
    IndustriesIndexPageGetDataQuery,
    IndustriesIndexPageGetDataQueryVariables
  >(GET_PAGE_DATA, { variables: { slug: landingPageSlug } })

  if (error) {
    return (
      <Container>
        <ComponentErrorMessage error={error} />
      </Container>
    )
  }

  if (loading) {
    return <LoadingDots />
  }

  const { landingPage } = data || {}

  if (!landingPage) {
    return <ComponentErrorMessage error={'Landing page not found'} />
  }

  return (
    <CmsLandingPageV2
      href={href}
      landingPage={landingPage}
      parentBreadcrumbs={parentBreadcrumbs}
    />
  )
}

const GET_PAGE_DATA = gql`
  ${CmsLandingPageV2.fragments.landingPage}
  query IndustriesIndexPageGetDataQuery($slug: String!) {
    landingPage(filter: { slug: { eq: $slug } }) {
      id
      ...CmsLandingPageAppDirFragment
    }
  }
`

const GET_PATH_DATA = gql`
  query IndustriesIndexPageGetPathDataQuery($category: String!) {
    allLandingPages(filter: { category: { eq: $category } }) {
      id
      slug
    }
  }
`

export default CmsLandingPage
