'use client'

import React, { Suspense, useTransition } from 'react'
import CatalogProductsContainer from './CatalogProductsContainer'
import {
  CatalogProductsListBrandFragment,
  CatalogProductsListCategoryFragment,
  SearchProductsSortInput,
} from '@generated/types'
import * as yup from 'yup'
import {
  SetValues,
  UseQueryStatesKeysMap,
  parseAsArrayOf,
  parseAsInteger,
  parseAsJson,
  parseAsString,
  parseAsStringEnum,
  useQueryStates,
} from 'nuqs'
import CatalogHeader from './CatalogHeader'
import CatalogProductGridSkeleton from './CatalogProductGridSkeleton'
import FilterDialog from './FilterDialog'
import CatalogFiltersSidebar from './CatalogFiltersSidebar'
import CatalogFiltersSidebarSkeleton from './CatalogFiltersSidebarSkeleton'
import CatalogFiltersTopbar from './CatalogFiltersTopbar'

export const DEFAULT_FILTERS = {
  hideOutOfStock: true,
  searchSubCategories: true,
}

export interface QueryStates {
  after: string
  brandEntityIds: number[]
  categoryEntityIds: number[]
  maxPrice: number
  minPrice: number
  searchTerm: string
  sort: SearchProductsSortInput
  productAttributes: { attribute: string; values: string[] }[]
}

type Props =
  | {
      category?: never
      brand: CatalogProductsListBrandFragment
    }
  | {
      brand?: never
      category: CatalogProductsListCategoryFragment
    }
  | {
      brand?: never
      category?: never
    }

const CatalogProductsListPage = (props: Props) => {
  const { brand, category } = props
  const [transition, startTransition] = useTransition()
  const [filterDialogOpen, setFilterDialogOpen] = React.useState(false)

  const [
    {
      after,
      brandEntityIds,
      maxPrice,
      minPrice,
      searchTerm,
      sort,
      productAttributes,
    },
    setQueryStates,
  ] = useQueryStates(
    {
      after: parseAsString.withDefault(''),
      sort: parseAsStringEnum(
        Object.values(SearchProductsSortInput),
      ).withDefault(SearchProductsSortInput.RELEVANCE),
      searchTerm: parseAsString.withDefault(''),
      minPrice: parseAsInteger,
      maxPrice: parseAsInteger,
      brandEntityIds: parseAsArrayOf(parseAsInteger).withDefault([]),
      productAttributes: parseAsJson(value =>
        yup
          .array()
          .of(
            yup
              .object()
              .shape({
                attribute: yup.string().required(),
                values: yup.array().of(yup.string().required()).required(),
              })
              .required(),
          )
          .defined()
          .validateSync(value),
      ),
    },
    {
      startTransition,
      clearOnDefault: true,
    },
  )

  const finalBrandEntityIds = brand
    ? [brand.entityId]
    : brandEntityIds?.length
    ? brandEntityIds
    : null

  const rootCategoryEntityId = category?.entityId || 0

  const filters = {
    ...DEFAULT_FILTERS,
    searchTerm,
    productAttributes,
    brandEntityIds: finalBrandEntityIds,
    categoryEntityId: category?.entityId,
    price: { maxPrice, minPrice },
  }

  const handleSetFilters: SetValues<
    UseQueryStatesKeysMap<QueryStates>
  > = action => {
    startTransition(() => {
      if (typeof action === 'function') {
        setQueryStates(values => action({ ...values, after: null } as any))
      } else {
        setQueryStates({ ...action, after: null })
      }
    })

    return null as any
  }

  return (
    <>
      <FilterDialog
        rootCategoryEntityId={rootCategoryEntityId}
        defaultBrandEntityId={brand?.entityId || null}
        onClose={() => setFilterDialogOpen(false)}
        open={filterDialogOpen}
        defaultPreviewFilters={filters}
        setFilters={handleSetFilters}
      />

      {brand ? (
        <CatalogHeader brand={brand} />
      ) : category ? (
        <CatalogHeader category={category} />
      ) : null}

      <div className="flex gap-4">
        <aside className="hidden lg:block w-64">
          <Suspense fallback={<CatalogFiltersSidebarSkeleton />}>
            <CatalogFiltersSidebar
              isRootCategory={!category?.entityId}
              defaultBrandEntityId={brand?.entityId || null}
              setFilters={handleSetFilters}
              filters={filters}
              rootCategoryEntityId={rootCategoryEntityId}
            />
          </Suspense>
        </aside>

        <div className="flex-1 flex flex-col gap-4 overflow-auto">
          <CatalogFiltersTopbar
            sort={sort}
            filters={filters}
            setFilters={handleSetFilters}
            onOpenFilters={() => setFilterDialogOpen(true)}
            activeCategory={category || null}
          />

          <Suspense fallback={<CatalogProductGridSkeleton />}>
            <CatalogProductsContainer
              transitioningQuery={transition}
              variables={{
                sort,
                after,
                filters,
                first: 20,
              }}
            />
          </Suspense>
        </div>
      </div>
    </>
  )
}

export default CatalogProductsListPage
