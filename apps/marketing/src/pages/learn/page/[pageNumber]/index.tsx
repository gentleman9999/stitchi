import { gql, useQuery } from '@apollo/client'
import { BlogPostIndexPage } from '@components/pages'
import { addApolloState, initializeApollo } from '@lib/apollo'
import {
  BlogIndexPageGetDataQuery,
  BlogIndexPageGetDataQueryVariables,
} from '@generated/BlogIndexPageGetDataQuery'
import { GetStaticPaths, GetStaticProps } from 'next'
import React, { ReactElement } from 'react'
import { useRouter } from 'next/router'
import { ComponentErrorMessage } from '@components/common'
import { BlogIndexPageGetPagesQuery } from '@generated/BlogIndexPageGetPagesQuery'
import { PrimaryLayout } from '@components/layout'

const PAGE_LIMIT = 20

const getPagination = (currentPage: number) => ({
  first: PAGE_LIMIT,
  skip: (currentPage - 1) * PAGE_LIMIT,
})

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = []

  const client = initializeApollo()

  const { data } = await client.query<BlogIndexPageGetPagesQuery>({
    query: GET_PAGES,
  })

  if (data._allArticlesMeta.count) {
    const pageCount = Math.ceil(data._allArticlesMeta.count / PAGE_LIMIT)
    Array.from(new Array(pageCount)).forEach((_, index) => {
      paths.push({ params: { pageNumber: `${index + 1}` } })
    })
  }

  return {
    paths,
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { pageNumber } = params

  const pageNumberInt = parseInt(`${pageNumber}`, 10)

  if (isNaN(pageNumberInt)) {
    return {
      notFound: true,
    }
  }

  const client = initializeApollo()

  await client.query<
    BlogIndexPageGetDataQuery,
    BlogIndexPageGetDataQueryVariables
  >({
    query: GET_DATA,
    variables: getPagination(pageNumberInt),
  })

  return addApolloState(client, { props: {} })
}

const BlogIndexPage = () => {
  const router = useRouter()
  const { pageNumber } = router.query
  const pageNumberInt = parseInt(`${pageNumber}`, 10)

  const { data, error } = useQuery<
    BlogIndexPageGetDataQuery,
    BlogIndexPageGetDataQueryVariables
  >(GET_DATA, {
    variables: getPagination(pageNumberInt),
    skip: isNaN(pageNumberInt),
  })

  const { allArticles: articles, allCategories: categories } = data || {}

  if (error && articles.length === 0) {
    return <ComponentErrorMessage error={error} />
  }

  return <BlogPostIndexPage articles={articles} categories={categories} />
}

BlogIndexPage.getLayout = (page: ReactElement) => (
  <PrimaryLayout>{page}</PrimaryLayout>
)

export default BlogIndexPage

const GET_DATA = gql`
  ${BlogPostIndexPage.fragments.article}
  ${BlogPostIndexPage.fragments.category}
  query BlogIndexPageGetDataQuery($first: IntType, $skip: IntType) {
    allArticles(first: $first, skip: $skip) {
      id
      ...BlogIndexPageArticleFragment
    }

    allCategories {
      id
      ...BlogPostIndexPageCategoryFragment
    }
  }
`

const GET_PAGES = gql`
  query BlogIndexPageGetPagesQuery {
    _allArticlesMeta {
      count
    }
  }
`
