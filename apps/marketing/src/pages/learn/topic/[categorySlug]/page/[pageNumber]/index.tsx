import { gql, useQuery } from '@apollo/client'
import { ComponentErrorMessage } from '@components/common'
import { PrimaryLayout } from '@components/layout'
import { BlogPostIndexPage } from '@components/pages'
import {
  BlogCategoryIndexPageGetCategoryPostsQuery,
  BlogCategoryIndexPageGetCategoryPostsQueryVariables,
} from '@generated/BlogCategoryIndexPageGetCategoryPostsQuery'
import {
  BlogCategoryIndexPageGetCategoryQuery,
  BlogCategoryIndexPageGetCategoryQueryVariables,
} from '@generated/BlogCategoryIndexPageGetCategoryQuery'
import {
  BlogCategoryIndexPageGetPageDataQuery,
  BlogCategoryIndexPageGetPageDataQueryVariables,
} from '@generated/BlogCategoryIndexPageGetPageDataQuery'
import { BlogCategoryIndexPageGetPagesQuery } from '@generated/BlogCategoryIndexPageGetPagesQuery'
import { ArticleModelFilter, ItemStatus } from '@generated/globalTypes'
import { addApolloState, initializeApollo } from '@lib/apollo'
import routes from '@lib/routes'
import { GetStaticPaths, GetStaticPathsResult, GetStaticProps } from 'next'
import React, { ReactElement } from 'react'

const PAGE_LIMIT = 3

const makeDefaultFilter = (categoryId: number): ArticleModelFilter => ({
  categories: { anyIn: [categoryId] },
  _status: { eq: ItemStatus.published },
})

const getPagination = (currentPage: number) => ({
  first: PAGE_LIMIT,
  skip: (currentPage - 1) * PAGE_LIMIT,
})

const getStaticPaths: GetStaticPaths = async () => {
  const paths: GetStaticPathsResult['paths'] = []

  const client = initializeApollo()

  const { data } = await client.query<BlogCategoryIndexPageGetPagesQuery>({
    query: GET_CATEGOIES,
  })

  if (data._allArticlesMeta && data.allCategories) {
    for (const category of data.allCategories) {
      if (!category.slug) {
        continue
      }

      const { data: articleData } = await client.query<
        BlogCategoryIndexPageGetCategoryPostsQuery,
        BlogCategoryIndexPageGetCategoryPostsQueryVariables
      >({
        query: GET_CATEGORY_POSTS,
        variables: {
          filter: makeDefaultFilter(category.id),
        },
      })

      if (articleData._allArticlesMeta.count) {
        const pageCount = Math.ceil(
          articleData._allArticlesMeta.count / PAGE_LIMIT,
        )
        Array.from(new Array(pageCount)).forEach((_, index) => {
          paths.push({
            params: {
              categorySlug: category.slug!,
              pageNumber: `${index + 1}`,
            },
          })
        })
      }
    }
  }

  return {
    paths,
    fallback: 'blocking',
  }
}

const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const { categorySlug, pageNumber } = params || {}

  const pageNumberInt = parseInt(`${pageNumber}`, 10)

  if (isNaN(pageNumberInt) || typeof categorySlug !== 'string') {
    return {
      notFound: true,
    }
  }

  const client = initializeApollo()

  const { data } = await client.query<
    BlogCategoryIndexPageGetCategoryQuery,
    BlogCategoryIndexPageGetCategoryQueryVariables
  >({ query: GET_CATEGORY, variables: { categorySlug } })

  if (!data?.allCategories.length) {
    return {
      notFound: true,
    }
  }

  const categoryId = data.allCategories[0].id

  const pagination = getPagination(pageNumberInt)

  await client.query<
    BlogCategoryIndexPageGetPageDataQuery,
    BlogCategoryIndexPageGetPageDataQueryVariables
  >({
    query: GET_PAGE_DATA,
    variables: {
      ...pagination,
      filter: makeDefaultFilter(categoryId),
    },
  })

  return addApolloState(client, {
    props: {
      ...pagination,
      pageNumber: pageNumberInt,
      categorySlug,
      categoryId,
    },
  })
}

interface Props {
  categoryId: number
  first: number
  skip: number
  pageNumber: number
  categorySlug: string
}

const BlogCategoryIndexPage = (props: Props) => {
  const { data, error, loading } = useQuery<
    BlogCategoryIndexPageGetPageDataQuery,
    BlogCategoryIndexPageGetPageDataQueryVariables
  >(GET_PAGE_DATA, {
    variables: {
      first: props.first,
      skip: props.skip,
      filter: makeDefaultFilter(props.categoryId),
    },
    notifyOnNetworkStatusChange: true,
  })

  const {
    allArticles: articles,
    _allArticlesMeta,
    allCategories: categories,
    blogIndexPage,
  } = data || {}

  if (error || !articles) {
    return (
      <ComponentErrorMessage error={error || 'Could not fetch any articles'} />
    )
  }

  if (!blogIndexPage) {
    return <ComponentErrorMessage error="Could not fetch blog index page" />
  }

  const canFetchMore = Boolean(articles.length < _allArticlesMeta?.count)

  return (
    <BlogPostIndexPage
      articles={articles}
      categories={categories}
      page={blogIndexPage}
      loading={loading}
      canFetchMore={canFetchMore}
      fetchMoreHref={routes.internal.blog.category.href({
        categorySlug: props.categorySlug,
        page: props.pageNumber + 1,
      })}
    />
  )
}

BlogCategoryIndexPage.getLayout = (page: ReactElement) => (
  <PrimaryLayout>{page}</PrimaryLayout>
)

export default BlogCategoryIndexPage
export { getStaticPaths, getStaticProps }

const GET_PAGE_DATA = gql`
  ${BlogPostIndexPage.fragments.article}
  ${BlogPostIndexPage.fragments.category}
  ${BlogPostIndexPage.fragments.page}
  query BlogCategoryIndexPageGetPageDataQuery(
    $first: IntType
    $skip: IntType
    $filter: ArticleModelFilter
  ) {
    allArticles(
      first: $first
      skip: $skip
      orderBy: _createdAt_DESC
      filter: $filter
    ) {
      id
      ...BlogIndexPageArticleFragment
    }
    _allArticlesMeta(filter: $filter) {
      count
    }
    allCategories(filter: { id: { notIn: ["147416796"] } }) {
      id
      ...BlogPostIndexPageCategoryFragment
    }
    blogIndexPage {
      id
      ...BlogPostIndexPagePageFragment
    }
  }
`

const GET_CATEGOIES = gql`
  query BlogCategoryIndexPageGetPagesQuery {
    allCategories {
      id
      slug
    }

    _allArticlesMeta {
      count
    }
  }
`

const GET_CATEGORY_POSTS = gql`
  query BlogCategoryIndexPageGetCategoryPostsQuery(
    $filter: ArticleModelFilter
  ) {
    _allArticlesMeta(filter: $filter) {
      count
    }
  }
`

const GET_CATEGORY = gql`
  query BlogCategoryIndexPageGetCategoryQuery($categorySlug: String!) {
    allCategories(filter: { slug: { eq: $categorySlug } }) {
      id
    }
  }
`
