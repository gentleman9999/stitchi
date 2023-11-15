'use client'

import { gql } from '@apollo/client'

import ProductShowPage, {
  fragments as productShowPageFragments,
} from '@components/pages/ProductShowPage'
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr'
import {
  ProductPageGetDataQuery,
  ProductPageGetDataQueryVariables,
} from '@generated/types'
import staticWebsiteData from '@generated/static.json'
import { notEmpty } from '@lib/utils/typescript'
import dynamicImport from 'next/dynamic'
import { notFound } from 'next/navigation'

// const ProductShowPage = dynamicImport(
//   () => import('@components/pages/ProductShowPage'),
// )

const Page = ({
  params,
}: {
  params: {
    catchAllSlug: string[]
  }
}) => {
  const path = getPath(params.catchAllSlug.join('/'))

  console.log('PATH', path)

  const { data } = useSuspenseQuery<
    ProductPageGetDataQuery,
    ProductPageGetDataQueryVariables
  >(GET_DATA, {
    skip: !path,
    variables: {
      path: `${path}`,
    },
  })

  if (!path) return null

  const node = data?.site.route.node

  switch (node?.__typename) {
    case 'Product': {
      return <ProductShowPage product={node} />
    }

    default: {
      return null
    }
  }
}

const allBrandSlugs = staticWebsiteData.brands
  .map(brand => brand.custom_url?.url.replace(/\//g, ''))
  .filter(notEmpty)

const allCategorySlugs = staticWebsiteData.categories.map(
  // Remove leading and trailing slashes
  category => category.custom_url.url.replace(/^\/|\/$/g, ''),
)

const getPath = (slug?: string) => {
  if (slug === undefined) {
    return null
  }

  if (allBrandSlugs.includes(slug) || allCategorySlugs.includes(slug)) {
    // This slug is either for a brand or for a category
    return null
  }

  // This slug is for a product

  const possibleBrandSlugs = allBrandSlugs.filter(
    brandSlug => slug.indexOf(brandSlug) === 0,
  )

  // Brand slug is the longest one
  const brandSlug = possibleBrandSlugs.reduce<string | null>(
    (prev, curr) => (prev && prev.length > curr.length ? prev : curr),
    null,
  )

  if (!brandSlug) {
    return null
  }

  const productSlug = slug.replace(`${brandSlug}-`, '')

  return `/${productSlug}/`
}

const GET_DATA = gql`
  ${productShowPageFragments.product}
  query ProductPageGetDataQuery($path: String!, $variantsFirst: Int = 250) {
    site {
      route(path: $path) {
        node {
          id
          ... on Product {
            ...ProductShowPageHeroFragment
          }
        }
      }
    }
  }
`

export default Page
