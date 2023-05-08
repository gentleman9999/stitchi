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

const BrandShowPage = dynamic(() => import('@components/pages/BrandShowPage'))
const ProductShowPage = dynamic(
  () => import('@components/pages/ProductShowPage'),
)

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

  const { site } = data || {}

  if (error) {
    return <ComponentErrorMessage error={error} />
  }

  if (!site) {
    throw new Error("No site found. This shouldn't happen.")
  }

  const node = site?.route.node

  switch (node?.__typename) {
    case 'Product': {
      return <ProductShowPage product={node} />
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

const GET_DATA = gql`
  ${productShowPageFragments.product}
  ${brandShowPageFragments.brand}
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
