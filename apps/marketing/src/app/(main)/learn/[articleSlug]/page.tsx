import { gql } from '@apollo/client'
import {
  BlogShowPageGetDataQuery,
  BlogShowPageGetDataQueryVariables,
} from '@generated/BlogShowPageGetDataQuery'
import { getClient } from '@lib/apollo-rsc'
import routes from '@lib/routes'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { toNextMetadata } from 'react-datocms/seo'
import BlogPostShowPage from './BlogPostShowPage'

interface Params {
  articleSlug: string
}

export const generateMetadata = async ({
  params,
}: {
  params: Params
}): Promise<Metadata> => {
  const client = await getClient()
  const {
    data: { article },
  } = await client.query<
    BlogShowPageGetDataQuery,
    BlogShowPageGetDataQueryVariables
  >({
    query: GET_DATA,
    variables: {
      slug: {
        eq: params.articleSlug,
      },
    },
  })

  if (!article) {
    return notFound()
  }

  const cmsSeo = toNextMetadata(article._seoMetaTags)

  return {
    ...cmsSeo,
    openGraph: {
      ...cmsSeo.openGraph,
      url: routes.internal.learn.show.href(article.slug || ''),
    },
  }
}

const BlogShowPage = async ({ params }: { params: Params }) => {
  const client = await getClient()
  const {
    data: { article },
  } = await client.query<
    BlogShowPageGetDataQuery,
    BlogShowPageGetDataQueryVariables
  >({ query: GET_DATA, variables: { slug: { eq: params.articleSlug } } })

  if (!article) {
    notFound()
  }

  return <BlogPostShowPage post={article} />
}

export default BlogShowPage

const GET_DATA = gql`
  ${BlogPostShowPage.fragments.article}
  query BlogShowPageGetDataQuery($slug: SlugFilter!) {
    article(filter: { slug: $slug }) {
      id
      _seoMetaTags {
        attributes
        content
        tag
      }
      ...BlogPostShowPageArticleFragment
    }
  }
`
