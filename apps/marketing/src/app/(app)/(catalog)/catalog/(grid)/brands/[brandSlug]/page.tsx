import React from 'react'
import BrandPage from './BrandPage'
import { Metadata } from 'next'
import { getClient } from '@lib/apollo-rsc'
import { notFound } from 'next/navigation'
import { GET_DATA } from './graphql'
import {
  BrandPageGetDataQuery,
  BrandPageGetDataQueryVariables,
} from '@generated/types'
import routes from '@lib/routes'

interface Params {
  brandSlug: string
}

export const generateMetadata = async ({
  params,
}: {
  params: Params
}): Promise<Metadata> => {
  const client = await getClient()

  const { data } = await client.query<
    BrandPageGetDataQuery,
    BrandPageGetDataQueryVariables
  >({
    query: GET_DATA,
    variables: {
      path: `/${params.brandSlug}/`,
    },
  })

  const node = data?.site.route.node

  if (node?.__typename === 'Brand') {
    const title = `Browse ${node.name} products`
    const description = node.seo.metaDescription

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        url: routes.internal.catalog.brand.show.href({
          brandSlug: node.path,
        }),
      },
    }
  }

  return notFound()
}

const Page = ({ params }: { params: Params }) => {
  return <BrandPage path={`/${params.brandSlug}/`} />
}

export default Page
