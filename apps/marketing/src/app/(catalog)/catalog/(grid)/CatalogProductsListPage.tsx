'use client'

import React, { Suspense } from 'react'
import ClosetPageContainer from '@components/common/ClosetPageContainer'
import CatalogFiltersContainer from './CatalogFiltersContainer'
import CatalogProductsContainer from './CatalogProductsContainer'
import { CatalogProductGridSkeleton } from '../old/(grid)/CatalogPorductGrid'
import { CatalogQueryStatesProvider } from './catalog-query-states-context'

const CatalogProductsListPage = () => {
  return (
    <CatalogQueryStatesProvider>
      <ClosetPageContainer className="max-w-none flex flex-col gap-4 mt-4 mb-4">
        <div className="flex gap-4">
          <Suspense>
            <CatalogFiltersContainer />
          </Suspense>
          <Suspense fallback={<CatalogProductGridSkeleton />}>
            <CatalogProductsContainer />
          </Suspense>
        </div>
      </ClosetPageContainer>
    </CatalogQueryStatesProvider>
  )
}

export default CatalogProductsListPage
