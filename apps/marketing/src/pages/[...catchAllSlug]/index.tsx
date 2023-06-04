import { gql, useQuery } from '@apollo/client'
import { ComponentErrorMessage } from '@components/common'
import { PrimaryLayout } from '@components/layout'
import {
  ProductPageGetDataQuery,
  ProductPageGetDataQueryVariables,
} from '@generated/ProductPageGetDataQuery'

import { addApolloState, initializeApollo } from '@lib/apollo'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import { ReactElement } from 'react'
import staticWebsiteData from '@generated/static.json'
import getServerSideData from '@components/common/Catalog/getServerSideData'
import dynamic from 'next/dynamic'

import { fragments as brandShowPageFragments } from '@components/pages/BrandShowPage'
import { fragments as productShowPageFragments } from '@components/pages/ProductShowPage'
import { fragments as categoryShowPageFragments } from '@components/pages/CategoryShowPage'
import { notEmpty } from '@utils/typescript'

const VARIANT_LIMIT = 250

const BrandShowPage = dynamic(() => import('@components/pages/BrandShowPage'))
const ProductShowPage = dynamic(
  () => import('@components/pages/ProductShowPage'),
)
const CategoryShowPage = dynamic(
  () => import('@components/pages/CategoryShowPage'),
)

const allBrandSlugs = staticWebsiteData.brands
  .map(brand => brand.custom_url?.url.replace(/\//g, ''))
  .filter(notEmpty)

const allCategorySlugs = staticWebsiteData.categories.map(
  // Remove leading and trailing slashes
  category => category.custom_url.url.replace(/^\/|\/$/g, ''),
)

const getPath = (slugIn?: string | string[]) => {
  if (slugIn === undefined) {
    return null
  }

  const slug = Array.isArray(slugIn) ? slugIn.join('/') : slugIn

  if (allBrandSlugs.includes(slug) || allCategorySlugs.includes(slug)) {
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

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { catchAllSlug } = params || {}

  if (!catchAllSlug) {
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
    variables: { path, variantLimit: VARIANT_LIMIT },
  })

  if (data.site.route.node?.__typename === 'Brand') {
    // Hydrate server-side data for catalog
    await getServerSideData(client, {
      brandEntityId: data.site.route.node.entityId,
    })
  }

  if (data.site.route.node?.__typename === 'Category') {
    // Hydrate server-side data for catalog
    await getServerSideData(client, {
      categoryEntityId: data.site.route.node.entityId,
    })
  }

  return addApolloState(client, {
    props: {
      revalidate: 60,
    },
  })
}

const CatchAllPage = () => {
  const { query } = useRouter()
  const { catchAllSlug } = query

  const path = getPath(catchAllSlug)

  const { data, loading, error } = useQuery<
    ProductPageGetDataQuery,
    ProductPageGetDataQueryVariables
  >(GET_DATA, {
    variables: { path: path || '', variantLimit: VARIANT_LIMIT },
    skip: !path,
  })

  const { site } = data || {}

  if (error) {
    return <ComponentErrorMessage error={error} />
  }

  const node = site?.route.node

  switch (node?.__typename) {
    case 'Product': {
      return <ProductShowPage product={node} />
    }

    case 'Brand': {
      return <BrandShowPage brand={node} />
    }

    case 'Category': {
      return <CategoryShowPage category={node} />
    }

    default: {
      if (!loading) {
        console.error('Unknown node type', node)
      }
      return null
    }
  }
}

CatchAllPage.getLayout = (page: ReactElement) => (
  <PrimaryLayout>{page}</PrimaryLayout>
)

const GET_DATA = gql`
  ${productShowPageFragments.product}
  ${brandShowPageFragments.brand}
  ${categoryShowPageFragments.category}
  query ProductPageGetDataQuery($path: String!, $variantLimit: Int!) {
    site {
      route(path: $path) {
        node {
          id
          ... on Brand {
            entityId
            ...BrandShowPageBrandFragment
          }

          ... on Product {
            ...ProductShowPageHeroFragment
          }

          ... on Category {
            entityId
            ...CategoryShowPageCategoryFragment
          }
        }
      }
    }
  }
`

export default CatchAllPage
