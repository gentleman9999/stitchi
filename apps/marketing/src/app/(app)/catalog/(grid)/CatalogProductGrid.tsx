import React from 'react'
import { notEmpty } from '@lib/utils/typescript'
import CatalogProductLegacy from '../../../../components/common/CatalogProductLegacy'

import CatalogProductSkeleton from './CatalogProductSkeleton'
import CatalogProuductZeroState from './CatalogProductZeroState'
import { InfiniteScrollContainer } from '@components/common'
import Link from 'next/link'
import { CatalogIndexPageGetDataQuery } from '@generated/types'
import { useReadQuery } from '@apollo/experimental-nextjs-app-support/ssr'
import { QueryReference } from '@apollo/client'

export interface Props {
  fetchMore: (endCursor?: string | null) => void
  queryRef: QueryReference<CatalogIndexPageGetDataQuery>
  isPending: boolean
}

const CatalogProductGrid = ({ fetchMore, queryRef, isPending }: Props) => {
  const { data } = useReadQuery(queryRef)

  const products =
    data?.site.search?.searchProducts?.products?.edges
      ?.map(edge => edge?.node)
      .filter(notEmpty) || []

  const { pageInfo } = data?.site.search?.searchProducts?.products || {}

  const handleFetchMore = () => {
    if (pageInfo?.hasNextPage) {
      fetchMore(pageInfo.endCursor)
    }
  }

  return (
    <>
      <Grid>
        {products.map((product, i) =>
          product.id ? (
            <CatalogProductLegacy
              key={product.entityId}
              productId={product.id}
              priority={i < 3}
            />
          ) : null,
        )}

        {isPending
          ? Array.from(new Array(6)).map((_, i) => (
              <CatalogProductSkeleton key={i} />
            ))
          : null}
      </Grid>

      <InfiniteScrollContainer onIntersect={handleFetchMore} />

      {pageInfo?.hasNextPage && (
        <Link
          replace
          href={{ query: { after: pageInfo?.endCursor } }}
          className="sr-only"
        >
          Next
        </Link>
      )}
      <div className="mt-20">
        <CatalogProuductZeroState />
      </div>
    </>
  )
}

const Grid = ({ children }: { children: React.ReactNode }) => (
  <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
    {children}
  </ul>
)

export default CatalogProductGrid
