'use client'

import React, { Suspense, useTransition } from 'react'
import CatalogFiltersContainer from './CatalogFiltersContainer'
import CatalogProductsContainer from './CatalogProductsContainer'
import {
  CatalogProductsListBrandFragment,
  CatalogProductsListCategoryFragment,
  SearchProductsSortInput,
} from '@generated/types'
import * as yup from 'yup'
import {
  parseAsArrayOf,
  parseAsInteger,
  parseAsJson,
  parseAsString,
  parseAsStringEnum,
  useQueryStates,
} from 'nuqs'
import CatalogHeader from './CatalogHeader'
import CatalogProductGridSkeleton from './CatalogProductGridSkeleton'
import SortButton from './SortButton'
import Skeleton from 'react-loading-skeleton'

const DEFAULT_FILTERS = {
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

  return (
    <>
      {brand ? (
        <CatalogHeader brand={brand} />
      ) : category ? (
        <CatalogHeader category={category} />
      ) : null}

      <div className="flex gap-4">
        <Suspense
          fallback={
            <aside className="hidden lg:block w-64">
              <ul className="flex flex-col gap-10">
                {Array.from(new Array(5)).map((_, i) => (
                  <li key={i}>
                    <ul className="flex flex-col gap-2">
                      <h3 className="text-lg font-semibold mb-2">
                        <Skeleton width="50%" />
                      </h3>
                      {Array.from(new Array(4)).map((_, i) => (
                        <li key={i}>
                          <Skeleton width="60%" />
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </aside>
          }
        >
          <CatalogFiltersContainer
            isRootCategory={!category?.entityId}
            defaultBrandEntityId={brand?.entityId || null}
            setQueryStates={value => {
              startTransition(() => {
                if (typeof value === 'function') {
                  setQueryStates(values =>
                    value({ ...values, after: null } as any),
                  )
                } else {
                  setQueryStates({ ...value, after: null })
                }
              })

              return null as any
            }}
            variables={{
              sort,
              rootCategoryEntityId: category?.entityId || 0,
              filters: {
                ...DEFAULT_FILTERS,
                searchTerm,
                productAttributes,
                brandEntityIds: finalBrandEntityIds,
                categoryEntityId: category?.entityId,
                price: { maxPrice, minPrice },
              },
            }}
          />
        </Suspense>

        <div className="flex-1 flex flex-col gap-4">
          <div className="flex justify-end">
            <div>
              <SortButton
                sort={sort}
                onChange={sort => {
                  startTransition(() => {
                    setQueryStates(prev => ({ ...prev, sort, after: null }))
                  })
                }}
              />
            </div>
          </div>

          <Suspense fallback={<CatalogProductGridSkeleton />}>
            <CatalogProductsContainer
              transitioningQuery={transition}
              variables={{
                sort,
                after,
                first: 20,
                filters: {
                  ...DEFAULT_FILTERS,
                  searchTerm,
                  productAttributes,
                  brandEntityIds: finalBrandEntityIds,
                  categoryEntityId: category?.entityId,
                  price: { maxPrice, minPrice },
                },
              }}
            />
          </Suspense>
        </div>
      </div>
    </>
  )
}

export default CatalogProductsListPage
