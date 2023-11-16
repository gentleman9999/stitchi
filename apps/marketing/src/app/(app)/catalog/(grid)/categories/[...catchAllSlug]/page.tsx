import React from 'react'

import CategoryPage from './CategoryPage'
import { Metadata } from 'next'
import { getClient } from '@lib/apollo-rsc'
import { GET_DATA } from './graphql'
import { notFound } from 'next/navigation'
import {
  CatalogCategoryPageGetDataQuery,
  CatalogCategoryPageGetDataQueryVariables,
} from '@generated/types'
import routes from '@lib/routes'

interface Params {
  catchAllSlug: string[]
}

export const generateMetadata = async ({
  params,
}: {
  params: Params
}): Promise<Metadata> => {
  const client = await getClient()

  const { data } = await client.query<
    CatalogCategoryPageGetDataQuery,
    CatalogCategoryPageGetDataQueryVariables
  >({
    query: GET_DATA,
    variables: {
      path: `/${params.catchAllSlug.join('/')}/`,
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
          categorySlug: node.path,
        }),
      },
    }
  }

  notFound()
}

const Page = ({ params }: { params: Params }) => {
  return <CategoryPage path={`/${params.catchAllSlug.join('/')}/`} />
}

export default Page
