'use client'

import { gql } from '@apollo/client'
import {
  CatalogDiscoverPageGetDataQuery,
  CatalogDiscoverPageGetDataQueryVariables,
} from '@generated/types'
import Section from '@components/common/Section'
import FeaturedCategory from '../(catalog)/products/FeaturedCategory'
import CatalogProductLegacy, {
  CatalogProductLegacyFragments,
} from '@components/common/CatalogProductLegacy'
import { notEmpty } from '@lib/utils/typescript'
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr'
import routes from '@lib/routes'
import HomePageHero from './HomePageHero'
import Container from '@components/ui/Container'
import Link from 'next/link'
import { ArrowRightIcon } from '@heroicons/react/20/solid'
import Button from '@components/ui/ButtonV2/Button'
import HomePageTestimonial from './HomePageTestimonial'

const HomePage = () => {
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
    <>
      <HomePageHero />

      <Container>
        <Section gutter="md">
          <h1 className="text-4xl font-bold">What would you like to create?</h1>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8 mt-8">
            {featuredProducts?.map(product => (
              <CatalogProductLegacy
                priority
                key={product.id}
                productId={product.id}
                href={routes.internal.catalog.product.href({
                  productSlug: product.path,
                })}
                imageSizes="(max-width: 400px): 190px, (max-width: 525px) 230px, 284px"
              />
            ))}
          </div>
        </Section>

        <Section gutter="md">
          <div className="flex flex-row justify-between items-center">
            <h2 className="text-2xl font-medium mb-2">Browse by Category</h2>

            {/* TODO: Create index page for categories */}
            <Link
              href={routes.internal.catalog.href()}
              className="flex items-center gap-2 whitespace-nowrap"
            >
              View all products{' '}
              <ArrowRightIcon className="w-4 h-4 text-gray-900 hover:text-gray-800" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
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

        {/* {bestSellingProducts?.length ? (
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
                  imageSizes="(max-width: 400px): 190px, (max-width: 525px) 230px, 284px"
                />
              ))}
            </div>
          </Section>
        ) : null} */}
      </Container>

      <div className="bg-midnight">
        <Container>
          <Section
            gutter="lg"
            className="flex flex-col items-center text-center"
          >
            <span className="uppercase text-sm bg-primary px-2 py-1">
              Built for scale
            </span>
            <h2 className="font-headingDisplay uppercase text-4xl sm:text-5xl md:text-6xl font-bold mt-4 text-white">
              Merch is awesome. <br />
              Managing it sucks.
            </h2>
            <p className="mt-6 text-gray-50/80  max-w-md">
              Develop quality branded merchandise experiences with a partner you
              can depend on every step of the way.
            </p>

            <Button
              className="mt-12"
              size="2xl"
              Component={Link}
              variant="flat"
              color="brandPrimary"
              href={routes.internal.getStarted.href()}
              endIcon={<ArrowRightIcon className="w-4 h-4" />}
            >
              Simplify merch
            </Button>
          </Section>
        </Container>
      </div>

      <Container>
        {newestProducts?.length ? (
          <Section gutter="md">
            <h2 className="text-2xl font-medium mb-2">New Arrivals</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
              {newestProducts.map(product => (
                <CatalogProductLegacy
                  key={product.id}
                  productId={product.id}
                  href={routes.internal.catalog.product.href({
                    productSlug: product.path,
                  })}
                  imageSizes="(max-width: 400px): 190px, (max-width: 525px) 230px, 284px"
                />
              ))}
            </div>
          </Section>
        ) : null}

        <HomePageTestimonial />

        <Section gutter="md">
          <h2 className="text-2xl font-medium mb-2">Featured Collections</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
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
      </Container>
    </>
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

export default HomePage
