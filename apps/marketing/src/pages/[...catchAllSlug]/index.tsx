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
import { notEmpty } from '@lib/utils/typescript'
import {
  ProductPageGetDesignCategoryData,
  ProductPageGetDesignCategoryDataVariables,
} from '@generated/ProductPageGetDesignCategoryData'
import DesignLibraryCategoryShowPage from '@components/pages/DesignLibraryCategoryShowPage'

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

const getPath = (slug?: string) => {
  if (slug === undefined) {
    return null
  }

  if (allBrandSlugs.includes(slug) || allCategorySlugs.includes(slug)) {
    // This slug is either for a brand or for a category
    return `/${slug}/`
  }

  // This slug is for a product

  const possibleBrandSlugs = allBrandSlugs.filter(
    brandSlug => slug.indexOf(brandSlug) === 0,
  )

  // Brand slug is the longest one
  const brandSlug = possibleBrandSlugs.reduce(
    (prev, curr) => (prev.length > curr.length ? prev : curr),
    [],
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

  const client = initializeApollo()

  const slug = Array.isArray(catchAllSlug)
    ? catchAllSlug.join('/')
    : catchAllSlug

  const designCategorySlugMatch = slug.match(/custom-(.*?)-shirts/)

  if (designCategorySlugMatch?.[1].length) {
    // This is a design category page

    const { data } = await client.query<
      ProductPageGetDesignCategoryData,
      ProductPageGetDesignCategoryDataVariables
    >({
      query: GET_DESIGN_CATEGORY_DATA,
      variables: { designCategorySlug: { eq: designCategorySlugMatch[1] } },
    })

    if (!data.designCategory?.id) {
      return {
        notFound: true,
      }
    }
  } else {
    // This is a catalog page

    const path = getPath(slug)

    if (!path) {
      return {
        notFound: true,
      }
    }

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

    if (data.site.route.node?.__typename === 'Category') {
      // Hydrate server-side data for catalog
      await getServerSideData(client, {
        categoryEntityId: data.site.route.node.entityId,
      })
    }
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

  const slug = Array.isArray(catchAllSlug)
    ? catchAllSlug.join('/')
    : catchAllSlug

  const designCategorySlugMatch = slug?.match(/custom-(.*?)-shirts/)

  const path = getPath(designCategorySlugMatch?.[1] ? undefined : slug)

  const { data, loading, error } = useQuery<
    ProductPageGetDataQuery,
    ProductPageGetDataQueryVariables
  >(GET_DATA, {
    variables: { path: path || '' },
    skip: !path,
  })

  const {
    data: designCategoryData,
    loading: designCategoryLoading,
    error: designCategoryError,
  } = useQuery<
    ProductPageGetDesignCategoryData,
    ProductPageGetDesignCategoryDataVariables
  >(GET_DESIGN_CATEGORY_DATA, {
    variables: { designCategorySlug: { eq: designCategorySlugMatch?.[1] } },
    skip: !designCategorySlugMatch,
  })

  const { site } = data || {}

  if (error || designCategoryError) {
    return <ComponentErrorMessage error={error || designCategoryError} />
  }

  const { designCategory, site: designCategorySite } = designCategoryData || {}

  if (designCategory && designCategorySite) {
    return (
      <DesignLibraryCategoryShowPage
        category={designCategory}
        site={designCategorySite}
      />
    )
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
      if (!loading || !designCategoryLoading) {
        console.error('Unknown node type', node)
      }
      return null
    }
  }
}

CatchAllPage.getLayout = (page: ReactElement) => (
  <PrimaryLayout>{page}</PrimaryLayout>
)

const GET_DESIGN_CATEGORY_DATA = gql`
  ${DesignLibraryCategoryShowPage.fragments.category}
  ${DesignLibraryCategoryShowPage.fragments.site}
  query ProductPageGetDesignCategoryData($designCategorySlug: SlugFilter!) {
    site {
      ...DesignLibraryCategoryShowPageCatalogFragment
    }
    designCategory(filter: { slug: $designCategorySlug }) {
      id
      ...DesignLibraryCategoryShowPageDesignCategoryFragment
    }
  }
`

const GET_DATA = gql`
  ${productShowPageFragments.product}
  ${brandShowPageFragments.brand}
  ${categoryShowPageFragments.category}
  query ProductPageGetDataQuery($path: String!, $variantsFirst: Int = 250) {
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
