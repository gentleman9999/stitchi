'use client'

import React, { Suspense, useTransition } from 'react'
import ClosetPageContainer from '@components/common/ClosetPageContainer'
import CatalogFiltersContainer from './CatalogFiltersContainer'
import CatalogProductsContainer from './CatalogProductsContainer'
import { CatalogProductGridSkeleton } from '../old/(grid)/CatalogPorductGrid'
import { SearchProductsSortInput } from '@generated/types'
import * as yup from 'yup'
import {
  parseAsArrayOf,
  parseAsInteger,
  parseAsJson,
  parseAsString,
  parseAsStringEnum,
  useQueryStates,
} from 'nuqs'

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

interface Props {
  defaultCategoryEntityId?: number
  defaultBrandEntityId?: number
}

const CatalogProductsListPage = ({
  defaultBrandEntityId,
  defaultCategoryEntityId,
}: Props) => {
  const [transition, startTransition] = useTransition()

  const [
    {
      after,
      brandEntityIds,
      categoryEntityIds,
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
      brandEntityIds: parseAsArrayOf(parseAsInteger),
      categoryEntityIds: parseAsArrayOf(parseAsInteger),
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

  const finalCategoryEntityIds = defaultCategoryEntityId
    ? [defaultCategoryEntityId]
    : categoryEntityIds

  const finalBrandEntityIds = defaultBrandEntityId
    ? [defaultBrandEntityId]
    : brandEntityIds

  return (
    <ClosetPageContainer className="max-w-none flex flex-col gap-4 mt-4 mb-4">
      <div className="flex gap-4">
        <Suspense fallback={<div>Loading</div>}>
          <CatalogFiltersContainer
            defaultBrandEntityId={defaultBrandEntityId}
            setQueryStates={(...any) => {
              startTransition(() => {
                setQueryStates(...any)
              })
            }}
            variables={{
              sort: sort,
              filters: {
                ...DEFAULT_FILTERS,
                searchTerm,
                productAttributes,
                brandEntityIds: finalBrandEntityIds,
                categoryEntityIds: finalCategoryEntityIds,
                price: { maxPrice, minPrice },
              },
            }}
          />
        </Suspense>
        <Suspense fallback={<CatalogProductGridSkeleton />}>
          <CatalogProductsContainer
            variables={{
              filters: {
                ...DEFAULT_FILTERS,
                searchTerm,
                productAttributes,
                brandEntityIds: finalBrandEntityIds,
                categoryEntityIds: finalCategoryEntityIds,
                price: { maxPrice, minPrice },
              },
              sort,
              first: 20,
              after,
            }}
            transitioningQuery={transition}
          />
        </Suspense>
      </div>
    </ClosetPageContainer>
  )
}

export default CatalogProductsListPage
