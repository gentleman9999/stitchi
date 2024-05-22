import { gql } from '@apollo/client'
import {
  ArticleModelFilter,
  ArticleModelOrderBy,
  BlogCategoryIndexPageGetCategoryQuery,
  BlogCategoryIndexPageGetCategoryQueryVariables,
  BlogCategoryIndexPageGetPageDataQuery,
  BlogCategoryIndexPageGetPageDataQueryVariables,
  ItemStatus,
} from '@generated/types'
import { getClient } from '@lib/apollo-rsc'
import routes from '@lib/routes'
import React from 'react'
import BlogPostIndexPage from '../../../../BlogPostIndexPage'
import { toNextMetadata } from 'react-datocms/seo'
import { notFound } from 'next/navigation'
import { STUDENT_GUIDE_CATEGORY_ID } from '@lib/constants'

const PAGE_LIMIT = 10

const makeDefaultFilter = (categoryId: string): ArticleModelFilter => ({
  categories: { anyIn: [categoryId] },
  _status: { eq: ItemStatus.published },
})

const getPagination = (currentPage: number) => ({
  first: PAGE_LIMIT,
  skip: (currentPage - 1) * PAGE_LIMIT,
})

interface Params {
  categorySlug: string
  pageNumber: string
}

interface Props {
  params: Params
}

export const generateMetadata = async ({ params }: Props) => {
  const pageNumberInt = parseInt(`${params.pageNumber}`, 10)
  const pagination = getPagination(pageNumberInt)

  const client = await getClient()

  const {
    data: { allCategories },
  } = await client.query<
    BlogCategoryIndexPageGetCategoryQuery,
    BlogCategoryIndexPageGetCategoryQueryVariables
  >({
    query: GET_CATEGORY,
    variables: {
      categorySlug: params.categorySlug,
    },
  })

  const category = allCategories[0]

  if (!category) {
    return notFound()
  }

  const {
    data: { blogIndexPage },
  } = await client.query<
    BlogCategoryIndexPageGetPageDataQuery,
    BlogCategoryIndexPageGetPageDataQueryVariables
  >({
    query: GET_PAGE_DATA,
    variables: {
      ...pagination,
      filter: makeDefaultFilter(category.id),
      orderBy: [
        category.id === STUDENT_GUIDE_CATEGORY_ID
          ? ArticleModelOrderBy._createdAt_ASC
          : ArticleModelOrderBy._createdAt_DESC,
      ],
    },
  })

  if (!blogIndexPage) {
    notFound()
  }

  const cmsSeo = toNextMetadata(blogIndexPage._seoMetaTags)

  return {
    ...cmsSeo,
    openGraph: {
      ...cmsSeo.openGraph,
      url: routes.internal.learn.href(),
    },
  }
}

const BlogCategoryIndexPage = async ({ params }: Props) => {
  const pageNumberInt = parseInt(`${params.pageNumber}`, 10)
  const pagination = getPagination(pageNumberInt)

  const client = await getClient()

  const {
    data: { allCategories },
  } = await client.query<
    BlogCategoryIndexPageGetCategoryQuery,
    BlogCategoryIndexPageGetCategoryQueryVariables
  >({
    query: GET_CATEGORY,
    variables: {
      categorySlug: params.categorySlug,
    },
  })

  const category = allCategories[0]

  if (!category) {
    return notFound()
  }

  const {
    data: {
      allArticles: articles,
      _allArticlesMeta,
      allCategories: categories,
    },
  } = await client.query<
    BlogCategoryIndexPageGetPageDataQuery,
    BlogCategoryIndexPageGetPageDataQueryVariables
  >({
    query: GET_PAGE_DATA,
    variables: {
      ...pagination,
      filter: makeDefaultFilter(category.id),
      orderBy: [
        category.id === STUDENT_GUIDE_CATEGORY_ID
          ? ArticleModelOrderBy._createdAt_ASC
          : ArticleModelOrderBy._createdAt_DESC,
      ],
    },
  })

  const canFetchMore = Boolean(articles.length < _allArticlesMeta?.count)

  return (
    <BlogPostIndexPage
      articles={articles}
      categories={categories}
      canFetchMore={canFetchMore}
      fetchMoreHref={routes.internal.learn.category.href({
        categorySlug: params.categorySlug,
        page: pageNumberInt + 1,
      })}
      categorySlug={params.categorySlug}
    />
  )
}

export default BlogCategoryIndexPage

const GET_PAGE_DATA = gql`
  ${BlogPostIndexPage.fragments.article}
  ${BlogPostIndexPage.fragments.category}

  query BlogCategoryIndexPageGetPageDataQuery(
    $first: IntType
    $skip: IntType
    $filter: ArticleModelFilter
    $orderBy: [ArticleModelOrderBy]
  ) {
    allArticles(
      first: $first
      skip: $skip
      orderBy: $orderBy
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
      _seoMetaTags {
        attributes
        content
        tag
      }
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
