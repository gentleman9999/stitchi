import React from 'react'
import { Metadata } from 'next'
import { getClient } from '@lib/apollo-rsc'
import { notFound } from 'next/navigation'
import {
  CatalogCategoryPageGetDataQuery,
  CatalogCategoryPageGetDataQueryVariables,
} from '@generated/types'
import routes from '@lib/routes'
import staticData from '@generated/static.json'
import { gql } from '@apollo/client'
import { CatalogProductGrid } from '../../CatalogPorductGrid'

interface Params {
  catchAllSlug: string[]
}

export const generateMetadata = async ({
  params,
}: {
  params: Params
}): Promise<Metadata> => {
  const client = await getClient()

  const categorySlug = `/${params.catchAllSlug.join('/')}/`

  const { data } = await client.query<
    CatalogCategoryPageGetDataQuery,
    CatalogCategoryPageGetDataQueryVariables
  >({
    query: GET_DATA,
    variables: {
      path: categorySlug,
    },
  })

  const node = data?.site.route.node

  if (node?.__typename === 'Category') {
    const title = node.seo.pageTitle || `Browse Customizable ${node.name}`

    const description =
      node.seo.metaDescription ||
      node.description ||
      `Discover our extensive range of ${node.name} products, perfect for your audience. Each ${node.name} product in our collection offers unique customization options to align with your style and preferences. Shop now to find the ideal ${node.name} product that embodies, quality, functionality and affordability.`

    const url = routes.internal.catalog.category.show.href({ categorySlug })
    return {
      title,
      description,
      keywords: node.seo.metaKeywords,
      alternates: {
        canonical: url,
      },
      openGraph: {
        title,
        description,
        url,
      },
    }
  }

  notFound()
}

const Page = ({ params }: { params: Params }) => {
  const foundCategory = staticData.categories.find(
    category =>
      category.custom_url.url === `/${params.catchAllSlug.join('/')}/`,
  )

  if (!foundCategory) {
    notFound()
  }

  return <CatalogProductGrid categoryId={foundCategory.id} />
}

const GET_DATA = gql`
  query CatalogCategoryPageGetDataQueryOld($path: String!) {
    site {
      route(path: $path) {
        node {
          id
          ... on Category {
            name
            description
            seo {
              metaDescription
              pageTitle
              metaKeywords
            }
          }
        }
      }
    }
  }
`

export default Page
