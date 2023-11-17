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
import CatalogProductGrid from '../../CatalogProductGrid'

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
    const title = `Browse ${node.name} products`
    const description = node.seo.metaDescription
    return {
      title,
      description,
      openGraph: {
        title,
        description,
        url: routes.internal.catalog.category.show.href({
          categorySlug,
        }),
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

  return <CatalogProductGrid categoryEntityId={foundCategory.id} />
}

const GET_DATA = gql`
  query CatalogCategoryPageGetDataQuery($path: String!) {
    site {
      route(path: $path) {
        node {
          id

          ... on Category {
            name
            description
            seo {
              metaDescription
            }
          }
        }
      }
    }
  }
`

export default Page
