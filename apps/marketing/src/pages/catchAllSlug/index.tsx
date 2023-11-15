import { gql, useQuery } from '@apollo/client'
import { ComponentErrorMessage } from '@components/common'
import { PrimaryLayout } from '@components/layout'

import { addApolloState, initializeApollo } from '@lib/apollo'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import staticWebsiteData from '@generated/static.json'
import getServerSideData from 'app/@app/@catalog/getServerSideData'
import dynamic from 'next/dynamic'

// import { fragments as brandShowPageFragments } from 'app/@app/@catalog/[...catchAllSlug]/BrandShowPage'
import { fragments as productShowPageFragments } from '@components/pages/ProductShowPage'
// import { fragments as categoryShowPageFragments } from 'app/@app/@catalog/[...catchAllSlug]/CategoryShowPage'
import { notEmpty } from '@lib/utils/typescript'

import DesignLibraryCategoryShowPage from '@components/pages/DesignLibraryCategoryShowPage'
import { useLogger } from 'next-axiom'
import CatalogLayout from '@components/layout/CatalogLayout'
import {
  ProductPageGetDataQuery,
  ProductPageGetDataQuery1,
  ProductPageGetDataQuery1Variables,
  ProductPageGetDataQueryVariables,
  ProductPageGetDesignCategoryData,
  ProductPageGetDesignCategoryDataVariables,
} from '@generated/types'

// const BrandShowPage = dynamic(
//   () => import('app/@app/@catalog/[slug]/BrandShowPage'),
// )
// const ProductShowPage = dynamic(
//   () => import('@components/pages/ProductShowPage'),
// )
// const CategoryShowPage = dynamic(
//   () => import('app/@app/@catalog/[slug]/CategoryShowPage'),
// )

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

const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

const getStaticProps: GetStaticProps = async ({ params }) => {
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
      ProductPageGetDataQuery1,
      ProductPageGetDataQuery1Variables
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
  const logger = useLogger()
  const { query } = useRouter()
  const { catchAllSlug } = query

  const slug = Array.isArray(catchAllSlug)
    ? catchAllSlug.join('/')
    : catchAllSlug

  const designCategorySlugMatch = slug?.match(/custom-(.*?)-shirts/)

  const path = getPath(designCategorySlugMatch?.[1] ? undefined : slug)

  const { data, loading, error } = useQuery<
    ProductPageGetDataQuery1,
    ProductPageGetDataQuery1Variables
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
      <PrimaryLayout>
        <DesignLibraryCategoryShowPage
          category={designCategory}
          site={designCategorySite}
        />
      </PrimaryLayout>
    )
  }

  const node = site?.route.node

  const Page = () => {
    switch (node?.__typename) {
      // case 'Product': {
      //   return <ProductShowPage product={node} />
      // }

      // case 'Brand': {
      //   return <BrandShowPage brand={node} />
      // }

      // case 'Category': {
      //   return <CategoryShowPage category={node} />
      // }

      default: {
        if (!loading && !designCategoryLoading) {
          logger.error('Unknown node type', { node })
        }
        return null
      }
    }
  }

  return (
    <CatalogLayout>
      <Page />
    </CatalogLayout>
  )
}

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
  query ProductPageGetDataQuery1($path: String!, $variantsFirst: Int = 250) {
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
