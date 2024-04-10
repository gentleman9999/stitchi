import { gql } from '@apollo/client'
import React from 'react'
import routes from '@lib/routes'
import { ItemStatus } from '@generated/globalTypes'
import { Metadata } from 'next'
import { getClient } from '@lib/apollo-rsc'
import {
  BlogIndexPageGetDataQuery,
  BlogIndexPageGetDataQueryVariables,
} from '@generated/types'
import { notFound } from 'next/navigation'
import { toNextMetadata } from 'react-datocms/seo'
import BlogPostIndexPage from '../../BlogPostIndexPage'

const PAGE_LIMIT = 6

const SKIP_CATEGORIES = ['148284102'] // STUDENT_GUIDE_CATEGORY_ID

interface Params {
  pageNumber: string
}

interface Props {
  params: Params
}

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const pageNumberInt = parseInt(`${params.pageNumber}`, 10)

  const client = await getClient()
  const {
    data: { blogIndexPage },
  } = await client.query<
    BlogIndexPageGetDataQuery,
    BlogIndexPageGetDataQueryVariables
  >({
    query: GET_DATA,
    variables: {
      ...getPagination(pageNumberInt),
      filter: {
        _status: { eq: ItemStatus.published },
        categories: { notIn: SKIP_CATEGORIES },
      },
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

const getPagination = (currentPage: number) => ({
  first: currentPage > 1 ? PAGE_LIMIT * 2 : PAGE_LIMIT,
  skip: (currentPage - 1) * PAGE_LIMIT,
})

const BlogIndexPage = async ({ params }: Props) => {
  const pageNumberInt = parseInt(`${params.pageNumber}`, 10)

  const client = await getClient()
  const {
    data: {
      _allArticlesMeta,
      allArticles: articles,
      allCategories: categories,
    },
  } = await client.query<
    BlogIndexPageGetDataQuery,
    BlogIndexPageGetDataQueryVariables
  >({
    query: GET_DATA,
    variables: {
      ...getPagination(pageNumberInt),
      filter: {
        _status: { eq: ItemStatus.published },
        categories: { notIn: SKIP_CATEGORIES },
      },
    },
  })

  const canFetchMore = Boolean(
    articles?.length && articles.length < _allArticlesMeta?.count,
  )

  return (
    <BlogPostIndexPage
      articles={articles?.filter(Boolean) || []}
      categories={categories}
      canFetchMore={canFetchMore}
      fetchMoreHref={routes.internal.learn.page.href(pageNumberInt + 1)}
    />
  )
}

export default BlogIndexPage

const GET_DATA = gql`
  ${BlogPostIndexPage.fragments.article}
  ${BlogPostIndexPage.fragments.category}
  query BlogIndexPageGetDataQuery(
    $first: IntType
    $skip: IntType
    $filter: ArticleModelFilter
  ) {
    _allArticlesMeta(filter: $filter) {
      count
    }
    allArticles(
      first: $first
      skip: $skip
      orderBy: _createdAt_DESC
      filter: $filter
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
      _seoMetaTags {
        attributes
        content
        tag
      }
    }
  }
`
