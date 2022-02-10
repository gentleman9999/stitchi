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
import { addApolloState, initializeApollo } from '@lib/apollo'
import { GetStaticPaths, GetStaticProps } from 'next'
import React, { ReactElement } from 'react'

const PAGE_LIMIT = 20

const getPagination = (currentPage: number) => ({
  first: PAGE_LIMIT,
  skip: (currentPage - 1) * PAGE_LIMIT,
})

const getStaticPaths: GetStaticPaths = async () => {
  const paths = []

  const client = initializeApollo()

  const { data } = await client.query<BlogCategoryIndexPageGetPagesQuery>({
    query: GET_CATEGOIES,
  })

  if (data._allArticlesMeta && data.allCategories) {
    for (const category of data.allCategories) {
      const { data: articleData } = await client.query<
        BlogCategoryIndexPageGetCategoryPostsQuery,
        BlogCategoryIndexPageGetCategoryPostsQueryVariables
      >({
        query: GET_CATEGORY_POSTS,
        variables: { categoryId: category.id },
      })

      if (articleData._allArticlesMeta.count) {
        const pageCount = Math.ceil(
          articleData._allArticlesMeta.count / PAGE_LIMIT,
        )
        Array.from(new Array(pageCount)).forEach((_, index) => {
          paths.push({
            params: {
              categorySlug: category.slug,
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
  const { categorySlug, pageNumber } = params

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

  const variables = {
    categoryId: data.allCategories[0].id,
    ...getPagination(pageNumberInt),
  }

  await client.query<
    BlogCategoryIndexPageGetPageDataQuery,
    BlogCategoryIndexPageGetPageDataQueryVariables
  >({
    query: GET_PAGE_DATA,
    variables,
  })

  return addApolloState(client, {
    props: variables,
  })
}

interface Props {
  categoryId: string
  first: number
  skip: number
}

const BlogCategoryIndexPage = (props: Props) => {
  const { data, error } = useQuery<
    BlogCategoryIndexPageGetPageDataQuery,
    BlogCategoryIndexPageGetPageDataQueryVariables
  >(GET_PAGE_DATA, {
    variables: {
      categoryId: props.categoryId,
      first: props.first,
      skip: props.skip,
    },
  })

  const {
    allArticles: articles,
    allCategories: categories,
    blogIndexPage,
  } = data || {}

  if (error && articles.length === 0) {
    return <ComponentErrorMessage error={error} />
  }

  return (
    <BlogPostIndexPage
      articles={articles}
      categories={categories}
      page={blogIndexPage}
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
    $categoryId: ItemId!
  ) {
    allArticles(
      first: $first
      skip: $skip
      filter: { categories: { eq: [$categoryId] } }
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
  query BlogCategoryIndexPageGetCategoryPostsQuery($categoryId: ItemId!) {
    _allArticlesMeta(filter: { categories: { eq: [$categoryId] } }) {
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
