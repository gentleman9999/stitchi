import { gql, useQuery } from '@apollo/client'
import { BlogPostIndexPage } from '@components/pages'
import { addApolloState, initializeApollo } from '@lib/apollo'
import {
  BlogIndexPageGetDataQuery,
  BlogIndexPageGetDataQueryVariables,
} from '@generated/BlogIndexPageGetDataQuery'
import { GetStaticPaths, GetStaticPathsResult, GetStaticProps } from 'next'
import React, { ReactElement } from 'react'
import { useRouter } from 'next/router'
import { ComponentErrorMessage } from '@components/common'
import { BlogIndexPageGetPagesQuery } from '@generated/BlogIndexPageGetPagesQuery'
import { PrimaryLayout } from '@components/layout'
import routes from '@lib/routes'

const PAGE_LIMIT = 6

const getPagination = (currentPage: number) => ({
  first: currentPage > 1 ? PAGE_LIMIT * 2 : PAGE_LIMIT,
  skip: (currentPage - 1) * PAGE_LIMIT,
})

const getStaticPaths: GetStaticPaths = async () => {
  const paths: GetStaticPathsResult['paths'] = []

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
    fallback: 'blocking',
  }
}

const getStaticProps: GetStaticProps = async ({ params }) => {
  const { pageNumber } = params || {}

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

  const { data, error, loading } = useQuery<
    BlogIndexPageGetDataQuery,
    BlogIndexPageGetDataQueryVariables
  >(GET_DATA, {
    variables: getPagination(pageNumberInt),
    notifyOnNetworkStatusChange: true,
  })

  const {
    _allArticlesMeta,
    allArticles: articles,
    allCategories: categories,
    blogIndexPage,
  } = data || {}

  const canFetchMore = Boolean(
    articles?.length && articles.length < _allArticlesMeta?.count,
  )

  const handleFetchMore = () => {
    if (!loading && canFetchMore) {
      router.replace(
        routes.internal.blog.page.href(pageNumberInt + 1),
        undefined,
        {
          scroll: false,
        },
      )
    }
  }

  if ((error && !articles) || articles?.length === 0) {
    return <ComponentErrorMessage error={error} />
  }

  if (!articles) {
    return <ComponentErrorMessage error="Failed to load articles" />
  }

  if (!blogIndexPage) {
    return <ComponentErrorMessage error="Failed to load page" />
  }

  return (
    <BlogPostIndexPage
      articles={articles}
      categories={categories}
      page={blogIndexPage}
      onFetchMore={handleFetchMore}
      canFetchMore={canFetchMore}
      pageNumber={pageNumberInt}
      loading={loading}
    />
  )
}

BlogIndexPage.getLayout = (page: ReactElement) => (
  <PrimaryLayout>{page}</PrimaryLayout>
)

export default BlogIndexPage
export { getStaticPaths, getStaticProps }

const GET_DATA = gql`
  ${BlogPostIndexPage.fragments.article}
  ${BlogPostIndexPage.fragments.category}
  ${BlogPostIndexPage.fragments.page}
  query BlogIndexPageGetDataQuery($first: IntType, $skip: IntType) {
    _allArticlesMeta(filter: { _status: { eq: published } }) {
      count
    }
    allArticles(
      first: $first
      skip: $skip
      orderBy: _createdAt_DESC
      filter: { _status: { eq: published } }
    ) {
      id
      ...BlogIndexPageArticleFragment
    }

    allCategories {
      id
      ...BlogPostIndexPageCategoryFragment
    }
    blogIndexPage {
      id
      ...BlogPostIndexPagePageFragment
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
