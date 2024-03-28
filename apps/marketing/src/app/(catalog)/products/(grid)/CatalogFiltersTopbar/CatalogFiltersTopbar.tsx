import Button from '@components/ui/ButtonV2/Button'
import React, { Suspense } from 'react'
import SortButton from '../SortButton'
import { SetValues, UseQueryStatesKeysMap } from 'nuqs'
import { QueryStates } from '../CatalogProductsListPage'
import {
  SearchProductsFiltersInput,
  SearchProductsSortInput,
} from '@generated/types'
import CategorySelect, { Props as CategorySelectProps } from './CategorySelect'
import BreadCrumbs from '../BreadCrumbs'

const invisibleFilters: (keyof SearchProductsFiltersInput)[] = [
  'isFeatured',
  'isFreeShipping',
  'hideOutOfStock',
  'searchSubCategories',
  'searchTerm',
  'categoryEntityId',
]

interface Props {
  sort: SearchProductsSortInput
  filters: SearchProductsFiltersInput
  activeCategory: CategorySelectProps['activeCategory']
  setFilters: SetValues<UseQueryStatesKeysMap<QueryStates>>
  onOpenFilters: () => void
}

const CatalogFiltersTopbar = ({
  sort,
  filters,
  activeCategory,
  setFilters,
  onOpenFilters,
}: Props) => {
  let activeFiltersCount = 0

  Object.keys(filters).map(k => {
    const key = k as keyof SearchProductsFiltersInput

    switch (key) {
      case 'price': {
        const value = filters[key]

        if (value?.minPrice || value?.maxPrice) {
          activeFiltersCount++
        }

        break
      }

      case 'productAttributes': {
        const value = filters[key]

        activeFiltersCount += value?.length || 0

        break
      }

      default: {
        return (
          filters[key as keyof SearchProductsFiltersInput] !== null &&
          !invisibleFilters.includes(key as keyof SearchProductsFiltersInput)
        )
      }
    }
  }).length

  return (
    <>
      <div className="lg:hidden">
        <BreadCrumbs />
      </div>

      <Suspense>
        <CategorySelect filters={filters} activeCategory={activeCategory} />
      </Suspense>

      <div className="flex flex-col gap-4">
        <div className="flex gap-2 justify-between items-stretch">
          <div className="hidden lg:block">
            <BreadCrumbs />
          </div>

          <div className="flex-1 lg:flex-initial">
            <Button
              className="lg:!hidden w-full h-full"
              variant="ghost"
              onClick={onOpenFilters}
              size="lg"
            >
              Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
            </Button>
          </div>
          <div className="flex-1 lg:flex-initial">
            <SortButton
              sort={sort}
              onChange={sort => {
                setFilters(prev => ({ ...prev, sort, after: null }))
              }}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default CatalogFiltersTopbar
