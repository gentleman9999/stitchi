'use client'

import { gql } from '@apollo/client'
import {
  CatalogDiscoverPageGetDataQuery,
  CatalogDiscoverPageGetDataQueryVariables,
} from '@generated/types'
import Section from '@components/common/Section'
import FeaturedCategory from './FeaturedCategory'
import ClosetPageContainer from '@components/common/ClosetPageContainer'
import CatalogProductLegacy, {
  CatalogProductLegacyFragments,
} from '@components/common/CatalogProductLegacy'
import { notEmpty } from '@lib/utils/typescript'
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr'
import routes from '@lib/routes'
import CategorySelect from './CategorySelect'
import { DEFAULT_FILTERS } from './constants'

const Discover = () => {
  const { data } = useSuspenseQuery<
    CatalogDiscoverPageGetDataQuery,
    CatalogDiscoverPageGetDataQueryVariables
  >(GET_PAGE_DATA)

  const featuredProducts = data.site.featuredProducts.edges
    ?.map(edge => edge?.node)
    .filter(notEmpty)

  const bestSellingProducts = data.site.bestSellingProducts.edges
    ?.map(edge => edge?.node)
    .filter(notEmpty)

  const newestProducts = data.site.newestProducts.edges
    ?.map(edge => edge?.node)
    .filter(notEmpty)

  const { featuredCollections, featuredCategories } =
    data.productDiscoveryPage || {}

  return (
    <ClosetPageContainer className="max-w-8xl">
      <CategorySelect filters={{ ...DEFAULT_FILTERS }} activeCategory={null} />
      <Section gutter="md">
        <h1 className="text-4xl font-bold">What would you like to create?</h1>
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-8 mt-8">
          {featuredProducts?.map(product => (
            <CatalogProductLegacy
              key={product.id}
              productId={product.id}
              href={routes.internal.catalog.product.href({
                productSlug: product.path,
              })}
            />
          ))}
        </div>
      </Section>
      <Section gutter="md">
        <h2 className="text-2xl font-medium mb-2">Browse by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredCategories?.map(category => (
            <FeaturedCategory
              key={category.id}
              categoryEntityId={category.bigCommerceCategoryId}
              categoryName={category.name}
              categoryImageUrl={category.image?.url}
            />
          ))}
        </div>
      </Section>

      {bestSellingProducts?.length ? (
        <Section gutter="md">
          <h2 className="text-2xl font-medium mb-2">Best Sellers</h2>
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-8">
            {bestSellingProducts.map(product => (
              <CatalogProductLegacy
                key={product.id}
                productId={product.id}
                href={routes.internal.catalog.product.href({
                  productSlug: product.path,
                })}
              />
            ))}
          </div>
        </Section>
      ) : null}

      {newestProducts?.length ? (
        <Section gutter="md">
          <h2 className="text-2xl font-medium mb-2">New Arrivals</h2>
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-8">
            {newestProducts.map(product => (
              <CatalogProductLegacy
                key={product.id}
                productId={product.id}
                href={routes.internal.catalog.product.href({
                  productSlug: product.path,
                })}
              />
            ))}
          </div>
        </Section>
      ) : null}

      <Section gutter="md">
        <h2 className="text-2xl font-medium mb-2">Featured Collections</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredCollections?.map(collection => (
            <FeaturedCategory
              key={collection.id}
              categoryEntityId={collection.bigCommerceCategoryId}
              categoryName={collection.name}
              categoryImageUrl={collection.image?.url}
            />
          ))}
        </div>
      </Section>
    </ClosetPageContainer>
  )
}

const GET_PAGE_DATA = gql`
  ${CatalogProductLegacyFragments.product}
  query CatalogDiscoverPageGetDataQuery {
    site {
      featuredProducts(first: 5, hideOutOfStock: true) {
        edges {
          node {
            id
            path
            ...CatalogProductLegacyProductFragment
          }
        }
      }
      newestProducts(first: 5, hideOutOfStock: true) {
        edges {
          node {
            id
            path
            ...CatalogProductLegacyProductFragment
          }
        }
      }
      bestSellingProducts(first: 5, hideOutOfStock: true) {
        edges {
          node {
            id
            path
            ...CatalogProductLegacyProductFragment
          }
        }
      }
    }
    productDiscoveryPage {
      id
      featuredCategories {
        id
        bigCommerceCategoryId
        name
        image {
          url
        }
      }
      featuredCollections {
        id
        name
        bigCommerceCategoryId
        image {
          url
        }
      }
    }
  }
`

export default Discover
