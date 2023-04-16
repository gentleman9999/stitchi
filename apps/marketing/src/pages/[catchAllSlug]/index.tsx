import { gql, useQuery } from '@apollo/client'
import { ComponentErrorMessage } from '@components/common'
import { PrimaryLayout } from '@components/layout'
import {
  ProductPageGetDataQuery,
  ProductPageGetDataQueryVariables,
} from '@generated/ProductPageGetDataQuery'
import {
  ProductPageGetSEODataQuery,
  ProductPageGetSEODataQueryVariables,
} from '@generated/ProductPageGetSEODataQuery'
import { addApolloState, initializeApollo } from '@lib/apollo'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import { ReactElement } from 'react'
import staticWebsiteData from '@generated/static.json'
import getServerSideData from '@components/common/Catalog/getServerSideData'
import BrandShowPage from '@components/pages/BrandShowPage'
import ProductShowPage from '@components/pages/ProductShowPage'

const allBrandSlugs = staticWebsiteData.data.site.brands.edges.map(({ node }) =>
  node.path.replace(/\//g, ''),
)

const getPath = (slug: string) => {
  if (allBrandSlugs.includes(slug)) {
    return `/${slug}/`
  }

  const brandSlug = allBrandSlugs.find(
    brandSlug => slug.indexOf(brandSlug) === 0,
  )

  if (!brandSlug) {
    return null
  }

  const productSlug = slug.replace(`${brandSlug}-`, '')

  return `/${productSlug}/`
}

const getProductVariantIdFromSite = (
  site?: ProductPageGetDataQuery['site'],
): number | null => {
  if (site?.route.node?.__typename === 'Product') {
    return site.route.node.variants.edges?.[0]?.node.entityId || null
  }

  return null
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [...allBrandSlugs.map(slug => ({ params: { catchAllSlug: slug } }))],
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

  const path = getPath(catchAllSlug)

  if (!path) {
    return {
      notFound: true,
    }
  }

  const client = initializeApollo()

  const { data } = await client.query<
    ProductPageGetDataQuery,
    ProductPageGetDataQueryVariables
  >({
    query: GET_DATA,
    variables: { path },
  })

  if (data.site.route.node?.__typename === 'Brand') {
    // Hydrate server-side data for catalog
    await getServerSideData(client, {
      brandEntityId: data.site.route.node.entityId,
    })
  }

  //
  // TODOOO:
  // Add resolver for product default price, which calls BigC API to get default price and run it through our pricing algorythm
  //
  const catalogProductVariantId = getProductVariantIdFromSite(data.site)

  if (catalogProductVariantId) {
    await client.query<
      ProductPageGetSEODataQuery,
      ProductPageGetSEODataQueryVariables
    >({
      query: GET_SEO_DATA,
      variables: {
        catalogProductVariantId,
      },
    })
  }

  return addApolloState(client, { props: {} })
}

const ProductPage = () => {
  const { query } = useRouter()
  const { catchAllSlug } = query

  const path = getPath(catchAllSlug?.toString() || '')

  const { data, error } = useQuery<
    ProductPageGetDataQuery,
    ProductPageGetDataQueryVariables
  >(GET_DATA, {
    variables: { path: path || '' },
    skip: !path,
  })

  const catalogProductVariantId = getProductVariantIdFromSite(data?.site)

  const { data: quoteData } = useQuery<
    ProductPageGetSEODataQuery,
    ProductPageGetSEODataQueryVariables
  >(GET_SEO_DATA, {
    variables: { catalogProductVariantId: catalogProductVariantId || -1 },
    skip: !catalogProductVariantId,
  })

  const { site } = data || {}

  if (error) {
    return <ComponentErrorMessage error={error} />
  }

  if (!site) {
    throw new Error("No site found. This shouldn't happen.")
  }

  const node = site.route.node

  switch (node?.__typename) {
    case 'Product': {
      return <ProductShowPage product={node} quote={quoteData?.quoteGenerate} />
    }

    case 'Brand': {
      return <BrandShowPage brand={node} />
    }

    default: {
      return <ComponentErrorMessage error="No such path" />
    }
  }
}

ProductPage.getLayout = (page: ReactElement) => (
  <PrimaryLayout>{page}</PrimaryLayout>
)

const GET_SEO_DATA = gql`
  ${ProductShowPage.fragments.quote}
  query ProductPageGetSEODataQuery($catalogProductVariantId: Int!) {
    quoteGenerate(
      catalogProductVariantId: $catalogProductVariantId
      includeFulfillment: false
      quantity: 10000
      printLocations: [{ colorCount: 1 }]
    ) {
      id
      ...ProductShowPageQuoteFragment
    }
  }
`

const GET_DATA = gql`
  ${ProductShowPage.fragments.product}
  ${BrandShowPage.fragments.brand}
  query ProductPageGetDataQuery($path: String!) {
    site {
      route(path: $path) {
        node {
          id
          ... on Brand {
            entityId
            ...BrandShowPageBrandFragment
          }

          ... on Product {
            ...ProductShowPageProductFragment
          }
        }
      }
    }
  }
`

export default ProductPage
