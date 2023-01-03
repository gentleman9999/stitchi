import { gql, useQuery } from '@apollo/client'
import { ComponentErrorMessage } from '@components/common'
import { PrimaryLayout } from '@components/layout'
import { ProductShowPage } from '@components/pages'
import {
  ProductPageGetDataQuery,
  ProductPageGetDataQueryVariables,
  ProductPageGetDataQuery_site_route_node_Product,
} from '@generated/ProductPageGetDataQuery'
import { addApolloState, initializeApollo } from '@lib/apollo'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import { ReactElement } from 'react'
import staticWebsiteData from '@generated/static.json'
import { NextSeo, NextSeoProps } from 'next-seo'
import { makeProductTitle } from '@utils/catalog'
import { OpenGraphMedia } from 'next-seo/lib/types'

const allBrandSlugs = staticWebsiteData.data.site.brands.edges.map(({ node }) =>
  node.path.replace(/\//g, ''),
)

const makeImages = (
  product: ProductPageGetDataQuery_site_route_node_Product,
): OpenGraphMedia[] => {
  const { defaultImage: image } = product
  if (!image) {
    return []
  }

  return [
    {
      url: image.seoImageUrl,
      width: 1000,
      alt: makeProductTitle(product),
    },
  ]
}

const getBigCProductPathFromSlug = (slug: string) => {
  const brandSlug = allBrandSlugs.find(
    brandSlug => slug.indexOf(brandSlug) === 0,
  )

  if (!brandSlug) {
    return null
  }

  const productSlug = slug.replace(`${brandSlug}-`, '')

  return `/${productSlug}/`
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { catchAllSlug } = params || {}

  if (!catchAllSlug || typeof catchAllSlug !== 'string') {
    return {
      notFound: true,
    }
  }

  const productPath = getBigCProductPathFromSlug(catchAllSlug)

  if (!productPath) {
    return {
      notFound: true,
    }
  }

  const client = initializeApollo()

  await client.query<ProductPageGetDataQuery, ProductPageGetDataQueryVariables>(
    {
      query: GET_DATA,
      variables: {
        path: productPath,
      },
    },
  )

  return addApolloState(client, { props: {} })
}

const ProductPage = () => {
  const { query } = useRouter()
  const { catchAllSlug } = query

  const productPath = getBigCProductPathFromSlug(catchAllSlug?.toString() || '')

  const { data, error } = useQuery<
    ProductPageGetDataQuery,
    ProductPageGetDataQueryVariables
  >(GET_DATA, {
    variables: {
      path: productPath || '',
    },
  })

  const { site } = data || {}

  if (error) {
    return <ComponentErrorMessage error={error} />
  }

  if (!site) {
    return <ComponentErrorMessage error="No site found" />
  }

  const product = site.route.node

  if (!product || product.__typename !== 'Product') {
    return <ComponentErrorMessage error="No product found" />
  }

  const title = makeProductTitle(product)

  const seoProps: NextSeoProps = {
    title,
    description: product.seo.metaDescription || product.plainTextDescription,
    openGraph: {
      title,
      images: makeImages(product),
    },
  }

  return (
    <>
      <NextSeo {...seoProps} />
      <ProductShowPage site={site} product={product} />
    </>
  )
}

ProductPage.getLayout = (page: ReactElement) => (
  <PrimaryLayout>{page}</PrimaryLayout>
)

const GET_DATA = gql`
  ${ProductShowPage.fragments.site}
  ${ProductShowPage.fragments.product}
  query ProductPageGetDataQuery($path: String!) {
    site {
      ...ProductShowPageSiteFragment
      route(path: $path) {
        node {
          id
          ... on Product {
            name
            plainTextDescription
            defaultImage {
              seoImageUrl: url(width: 1000)
            }
            brand {
              id
              name
            }
            seo {
              metaDescription
            }
            ...ProductShowPageProductFragment
          }
        }
      }
    }
  }
`

export default ProductPage
