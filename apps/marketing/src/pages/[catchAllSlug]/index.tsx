import { gql, useQuery } from '@apollo/client'
import { ComponentErrorMessage } from '@components/common'
import { PrimaryLayout } from '@components/layout'
import { ProductShowPage } from '@components/pages'
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

const allBrandSlugs = staticWebsiteData.data.site.brands.edges.map(({ node }) =>
  node.path.replace(/\//g, ''),
)

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

  return <ProductShowPage site={site} product={product} />
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
            ...ProductShowPageProductFragment
          }
        }
      }
    }
  }
`

export default ProductPage