import { gql } from '@apollo/client'
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr'
import { Section } from '@components/common'
import {
  CatalogProductsContainerGetDataQuery,
  CatalogProductsContainerGetDataQueryVariables,
} from '@generated/types'
import React, { useTransition } from 'react'
import CatalogProductGridContainer from '../old/(grid)/CatalogPorductGrid/CatalogProductGridContainer'
import CatalogProductSkeleton from '../old/(grid)/CatalogPorductGrid/CatalogProductSkeleton'
import CatalogProductLegacy, {
  CatalogProductLegacyFragments,
} from '@components/common/CatalogProductLegacy'
import CatalogProuductZeroState from '../old/(grid)/CatalogPorductGrid/CatalogProductZeroState'
import LoadingDots from '@components/ui/LoadingDots'
import Link from 'next/link'
import { notEmpty } from '@lib/utils/typescript'
import { useSearchParams } from 'next/navigation'
import routes from '@lib/routes'
import { useCatalogQueryStates } from './catalog-query-states-context'

interface Props {}

const CatalogProductsContainer = ({}: Props) => {
  const searchParams = useSearchParams()!
  const [transitioningData, startDataTransition] = useTransition()
  const { variables, transitioningQuery } = useCatalogQueryStates()

  const { data, refetch, fetchMore } = useSuspenseQuery<
    CatalogProductsContainerGetDataQuery,
    CatalogProductsContainerGetDataQueryVariables
  >(GET_DATA, { variables })

  const { products: productRes } = data.site.search.searchProducts || {}

  const products =
    productRes?.edges?.map(edge => edge?.node).filter(notEmpty) || []

  const pageInfo = productRes.pageInfo

  //   React.useEffect(() => {
  //     if (!transitioningData && pageInfo.endCursor === variables.after) {
  //       startDataTransition(() => {
  //         fetchMore({ variables: { after: variables.after } })
  //       })
  //     }
  //   }, [fetchMore, variables.after, transitioningData, pageInfo.endCursor])

  //   const variablesWithoutAfter = React.useMemo(() => {
  //     return {
  //       sort: variables.sort,
  //       filters: variables.filters,
  //       first: variables.first,
  //     }
  //   }, [variables])

  //   React.useEffect(() => {
  //     refetch(variablesWithoutAfter)
  //   }, [variablesWithoutAfter, refetch])

  const nextPageParams = new URLSearchParams(searchParams)

  if (pageInfo?.endCursor) {
    nextPageParams.set('after', pageInfo?.endCursor)
  }

  return (
    <div className="flex-1 flex flex-col gap-y-4">
      <Section>
        <CatalogProductGridContainer>
          {transitioningQuery ? (
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

              {transitioningData
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
              {transitioningData ? <LoadingDots /> : 'Load more'}
            </Link>
          </div>
        )}
      </Section>
      <div className="mt-20">
        <CatalogProuductZeroState />
      </div>
    </div>
  )
}

const GET_DATA = gql`
  ${CatalogProductLegacyFragments.product}

  query CatalogProductsContainerGetDataQuery(
    $filters: SearchProductsFiltersInput!
    $sort: SearchProductsSortInput!
    $first: Int!
    $after: String
  ) {
    site {
      search {
        searchProducts(filters: $filters, sort: $sort) {
          products(first: $first, after: $after) {
            edges {
              node {
                id
                path
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

export default CatalogProductsContainer
