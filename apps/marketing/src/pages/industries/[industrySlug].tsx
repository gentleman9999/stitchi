import { gql, useQuery } from '@apollo/client'
import { ComponentErrorMessage } from '@components/common'
import CmsLandingPage from '@components/common/CmsLandingPage'
import { PrimaryLayout } from '@components/layout'
import { Container, LoadingDots } from '@components/ui'
import {
  IndustriesIndexPageGetDataQuery,
  IndustriesIndexPageGetDataQueryVariables,
} from '@generated/IndustriesIndexPageGetDataQuery'
import { IndustriesIndexPageGetPathDataQuery } from '@generated/IndustriesIndexPageGetPathDataQuery'
import { initializeApollo } from '@lib/apollo'
import { GetStaticPaths, GetStaticPathsResult, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import React from 'react'

const getStaticPaths: GetStaticPaths = async ctx => {
  const client = initializeApollo()

  const { data } = await client.query<IndustriesIndexPageGetPathDataQuery>({
    query: GET_PATH_DATA,
  })

  if (!data.allLandingPages) {
    throw new Error('No landing pages found')
  }

  let paths: GetStaticPathsResult['paths'] = []

  for (const page of data.allLandingPages) {
    if (page.slug) {
      paths.push({
        params: {
          industrySlug: page.slug,
        },
      })
    }
  }

  return {
    paths,
    fallback: 'blocking',
  }
}

const getStaticProps: GetStaticProps = async ({ params }) => {
  const client = initializeApollo()

  const { industrySlug } = params || {}

  if (typeof industrySlug !== 'string') {
    console.error('No industry slug provided')
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
      slug: industrySlug,
    },
  })

  return {
    props: {},
  }
}

const Page = () => {
  const { query } = useRouter()

  const industrySlug = query.industrySlug as string

  const { data, loading, error } = useQuery<
    IndustriesIndexPageGetDataQuery,
    IndustriesIndexPageGetDataQueryVariables
  >(GET_PAGE_DATA, { variables: { slug: industrySlug } })

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

  return <CmsLandingPage landingPage={landingPage} />
}

Page.getLayout = (page: React.ReactElement) => (
  <PrimaryLayout disableNavSpacing>{page}</PrimaryLayout>
)

const GET_PAGE_DATA = gql`
  ${CmsLandingPage.fragments.landingPage}
  query IndustriesIndexPageGetDataQuery($slug: String!) {
    landingPage(filter: { slug: { eq: $slug } }) {
      id
      ...CmsLandingPageLandingPageFragment
    }
  }
`

const GET_PATH_DATA = gql`
  query IndustriesIndexPageGetPathDataQuery {
    allLandingPages(filter: { category: { eq: "industry" } }) {
      id
      slug
    }
  }
`

export default Page

export { getStaticPaths, getStaticProps }
