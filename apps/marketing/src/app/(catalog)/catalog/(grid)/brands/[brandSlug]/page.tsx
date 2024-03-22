import React from 'react'
import { Metadata } from 'next'
import { getClient } from '@lib/apollo-rsc'
import { notFound } from 'next/navigation'
import {
  BrandPageGetDataQuery,
  BrandPageGetDataQueryVariables,
} from '@generated/types'
import routes from '@lib/routes'
import staticData from '@generated/static.json'
import { BrandJsonLd } from 'next-seo'
import { gql } from '@apollo/client'
import CatalogProductsListPage from '../../CatalogProductsListPage'

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
  const foundBrand = staticData.brands.find(
    brand => brand.custom_url.url === `/${params.brandSlug}/`,
  )

  if (!foundBrand) {
    notFound()
  }

  const href = routes.internal.catalog.brand.show.href({
    brandSlug: foundBrand.custom_url.url,
  })

  return (
    <>
      <BrandJsonLd useAppDir id={href} logo={foundBrand.image_url} />
      <CatalogProductsListPage defaultBrandEntityId={foundBrand.id} />
    </>
  )
}

const GET_DATA = gql`
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
          }
        }
      }
    }
  }
`

export default Page
