'use client'

import React, { useTransition } from 'react'
import { notEmpty } from '@lib/utils/typescript'
import CatalogProductSkeleton from './CatalogProductSkeleton'
import Link from 'next/link'
import {
  CatalogIndexPageGetDataQuery,
  CatalogIndexPageGetDataQueryVariables,
} from '@generated/types'
import CatalogProductGridContainer from './CatalogProductGridContainer'
import { useSearchParams } from 'next/navigation'
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr'
import deepEqual from 'deep-equal'
import routes from '@lib/routes'
import CatalogProductLegacy, {
  CatalogProductLegacyFragments,
} from '@components/common/CatalogProductLegacy'
import { gql } from '@apollo/client'
import { FiltersProvider, useFilters } from '../filters-context'
import { mergeFilters } from '../format-filters'
import LoadingDots from '@components/ui/LoadingDots'

interface Props {
  categoryId?: number
  brandId?: number
}

const CatalogProductGrid = ({ categoryId, brandId }: Props) => {
  const searchParams = useSearchParams()!
  const [isFetchingMore, startFetchMoreTransition] = useTransition()
  const {
    filters: unmergedFilters,
    search,
    sort,
    transitioning,
    setDynamicFilters,
    availableDynamicFilters,
  } = useFilters()

  const after = searchParams.get('after')

  const filters = mergeFilters({
    search,
    brands: brandId ? [brandId] : unmergedFilters.brands.map(({ id }) => id),
    category: categoryId || null,
  })

  const [prevFilters, setPrevFilters] = React.useState(filters)

  const { data, refetch, fetchMore } = useSuspenseQuery<
    CatalogIndexPageGetDataQuery,
    CatalogIndexPageGetDataQueryVariables
  >(GET_DATA, {
    variables: {
      first: 20,
      sort: sort.value,
      after: after || undefined,
      filters,
    },
  })

  React.useEffect(() => {
    if (!deepEqual(filters, prevFilters)) {
      refetch({ filters })
      setPrevFilters(filters)
    }
  }, [filters, prevFilters, refetch])

  const { products: productResult } = data?.site?.search?.searchProducts || {}

  const products =
    productResult?.edges?.map(edge => edge?.node).filter(notEmpty) || []

  const { pageInfo } = productResult || {}

  React.useEffect(() => {
    if (!isFetchingMore && after && after === pageInfo?.endCursor) {
      startFetchMoreTransition(() => {
        fetchMore({ variables: { after } })
      })
    }
  }, [after, fetchMore, isFetchingMore, pageInfo?.endCursor])

  const filtersData = data?.site?.search?.searchProducts?.filters?.edges
    ?.map(edge => edge?.node)
    .filter(notEmpty)

  React.useEffect(() => {
    console.log('FILTER DATA', filtersData)

    if (!deepEqual(availableDynamicFilters, filtersData)) {
      setDynamicFilters(filtersData || [])
    }
  }, [setDynamicFilters, filtersData, availableDynamicFilters])

  const nextPageParams = new URLSearchParams(searchParams)

  if (pageInfo?.endCursor) {
    nextPageParams.set('after', pageInfo?.endCursor)
  }

  return (
    <>
      <CatalogProductGridContainer>
        {transitioning ? (
          <>
            {Array.from(new Array(5)).map((_, i) => (
              <CatalogProductSkeleton key={i} />
            ))}
          </>
        ) : (
          <>
            {products.map((product, i) =>
              product.id ? (
                <CatalogProductLegacy
                  key={product.id}
                  productId={product.id}
                  priority={i < 6}
                  href={routes.internal.catalog.product.href({
                    productSlug: product.path,
                  })}
                />
              ) : null,
            )}

            {isFetchingMore
              ? Array.from(new Array(5)).map((_, i) => (
                  <CatalogProductSkeleton key={i} />
                ))
              : null}
          </>
        )}
      </CatalogProductGridContainer>

      {pageInfo?.hasNextPage && (
        <div className="flex justify-center mt-8">
          <Link
            replace
            scroll={false}
            href={{
              search: nextPageParams.toString(),
            }}
            className="inline-flex justify-center px-3 py-1 rounded-sm border text-gray-900 font-semibold"
          >
            {isFetchingMore ? <LoadingDots /> : 'Load more'}
          </Link>
        </div>
      )}
    </>
  )
}

const GET_DATA = gql`
  ${CatalogProductLegacyFragments.product}
  query CatalogIndexPageGetDataQuery(
    $filters: SearchProductsFiltersInput!
    $sort: SearchProductsSortInput!
    $first: Int!
    $after: String
  ) {
    site {
      search {
        searchProducts(filters: $filters, sort: $sort) {
          filters {
            edges {
              node {
                name
                isCollapsedByDefault
                ... on PriceSearchFilter {
                  selected {
                    minPrice
                    maxPrice
                  }
                }
                ... on ProductAttributeSearchFilter {
                  filterName
                  displayProductCount
                  attributes {
                    edges {
                      node {
                        value
                        isSelected
                        productCount
                      }
                    }
                  }
                }
              }
            }
          }
          products(first: $first, after: $after) {
            edges {
              node {
                id
                entityId
                ...CatalogProductLegacyProductFragment
              }
            }
            pageInfo {
              hasNextPage
              endCursor
            }
          }
        }
      }
    }
  }
`

export default CatalogProductGrid
