import React, { ReactElement } from 'react'
import { PrimaryLayout } from '@components/layout'
import { HomePage } from '@components/pages'
import { GetStaticProps } from 'next'
import { gql, useQuery } from '@apollo/client'
import { addApolloState, initializeApollo } from '@lib/apollo'
import {
  HomePageGetDataQuery,
  HomePageGetDataQueryVariables,
} from '@generated/HomePageGetDataQuery'

const FEATURED_POST_LIMIT = 3

const getStaticProps: GetStaticProps = async () => {
  const client = initializeApollo()

  await client.query<HomePageGetDataQuery, HomePageGetDataQueryVariables>({
    query: GET_DATA,
    variables: {
      first: FEATURED_POST_LIMIT,
    },
  })

  return addApolloState(client, { props: {} })
}

const Home = () => {
  const { data } = useQuery<
    HomePageGetDataQuery,
    HomePageGetDataQueryVariables
  >(GET_DATA, {
    variables: { first: FEATURED_POST_LIMIT },
  })

  const featuredPosts = data?.featuredPosts

  return <HomePage featuredPosts={featuredPosts || []} />
}

Home.getLayout = (page: ReactElement) => (
  <PrimaryLayout navBackgroundColor="">{page}</PrimaryLayout>
)

const GET_DATA = gql`
  ${HomePage.fragments.featuredPosts}
  query HomePageGetDataQuery($first: IntType!, $filter: ArticleModelFilter) {
    featuredPosts: allArticles(first: $first, filter: $filter) {
      ...HomePageFeaturedPostsFragment
    }
  }
`

export default Home
export { getStaticProps }
