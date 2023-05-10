import { gql, useQuery } from '@apollo/client'
import { ComponentErrorMessage } from '@components/common'
import { PrimaryLayout } from '@components/layout'
import { BlogPostShowPage } from '@components/pages'
import {
  BlogShowPageGetDataQuery,
  BlogShowPageGetDataQueryVariables,
} from '@generated/BlogShowPageGetDataQuery'
import { BlogShowPageGetPagesQuery } from '@generated/BlogShowPageGetPagesQuery'
import { addApolloState, initializeApollo } from '@lib/apollo'
import { GetStaticPaths, GetStaticPathsResult, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'

export const getStaticPaths: GetStaticPaths = async () => {
  const client = initializeApollo()

  const { data } = await client.query<BlogShowPageGetPagesQuery>({
    query: GET_PAGES,
  })

  const paths: GetStaticPathsResult['paths'] = []

  data.allArticles.forEach(article => {
    paths.push({ params: { articleSlug: article.slug ?? undefined } })
  })

  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { articleSlug } = params || {}

  if (!articleSlug || typeof articleSlug !== 'string') {
    return {
      notFound: true,
    }
  }

  const client = initializeApollo()

  await client.query<
    BlogShowPageGetDataQuery,
    BlogShowPageGetDataQueryVariables
  >({ query: GET_DATA, variables: { slug: { eq: articleSlug } } })

  return addApolloState(client, { props: {} })
}

const BlogShowPage = () => {
  const router = useRouter()
  const { articleSlug } = router.query

  const { data, error } = useQuery<
    BlogShowPageGetDataQuery,
    BlogShowPageGetDataQueryVariables
  >(GET_DATA, { variables: { slug: { eq: `${articleSlug}` } } })

  const { article } = data || {}

  if (error) {
    return <ComponentErrorMessage error={error} />
  }

  if (!article) {
    return <ComponentErrorMessage error={'No article found'} />
  }

  return <BlogPostShowPage post={article} />
}

BlogShowPage.getLayout = (page: ReactElement) => (
  <PrimaryLayout>{page}</PrimaryLayout>
)

export default BlogShowPage

const GET_DATA = gql`
  ${BlogPostShowPage.fragments.article}
  query BlogShowPageGetDataQuery($slug: SlugFilter!) {
    article(filter: { slug: $slug }) {
      id
      ...BlogPostShowPageArticleFragment
    }
  }
`

const GET_PAGES = gql`
  query BlogShowPageGetPagesQuery {
    allArticles(first: 100) {
      id
      slug
    }
  }
`
