import React from 'react'
import { Metadata } from 'next'
import { getClient } from '@lib/apollo-rsc'
import { notFound } from 'next/navigation'
import {
  BrandPageGetDataQuery,
  BrandPageGetDataQueryVariables,
} from '@generated/types'
import routes from '@lib/routes'
import { BrandJsonLd } from 'next-seo'
import { gql } from '@apollo/client'
import CatalogProductsListPage from '../../CatalogProductsListPage'
import { fragments } from '../../CatalogProductsListPage.fragments'

interface Params {
  brandSlug: string
}

export const generateMetadata = async ({
  params,
}: {
  params: Params
}): Promise<Metadata> => {
  const client = await getClient()

  const brandSlug = `/${params.brandSlug}/`

  const { data } = await client.query<
    BrandPageGetDataQuery,
    BrandPageGetDataQueryVariables
  >({
    query: GET_DATA,
    variables: {
      path: brandSlug,
    },
  })

  const node = data?.site.route.node

  if (node?.__typename === 'Brand') {
    const title = `Browse ${node.name} products`
    const description = node.seo.metaDescription
    const url = routes.internal.catalog.brand.show.href({ brandSlug })

    return {
      title,
      description,
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

  return notFound()
}

const Page = async ({ params }: { params: Params }) => {
  const client = await getClient()

  const brandSlug = `/${params.brandSlug}/`

  const { data } = await client.query<
    BrandPageGetDataQuery,
    BrandPageGetDataQueryVariables
  >({
    query: GET_DATA,
    variables: {
      path: brandSlug,
    },
  })

  const node = data.site.route.node

  if (node?.__typename !== 'Brand') {
    return notFound()
  }

  return (
    <>
      <BrandJsonLd
        useAppDir
        id={node.id}
        logo={node.defaultImage?.url}
        name={node.name}
      />

      <CatalogProductsListPage brand={node} />
    </>
  )
}

const GET_DATA = gql`
  ${fragments.brand}
  query BrandPageGetDataQuery($path: String!) {
    site {
      route(path: $path) {
        node {
          id
          ... on Brand {
            name
            defaultImage {
              url(width: 1200)
            }
            seo {
              pageTitle
              metaDescription
            }
            ...CatalogProductsListBrandFragment
          }
        }
      }
    }
  }
`

export default Page
