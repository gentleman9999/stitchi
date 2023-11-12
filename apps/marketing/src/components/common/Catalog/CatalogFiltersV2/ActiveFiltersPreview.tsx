import React from 'react'
import IconButton from '@components/ui/IconButton'
import { XMarkIcon } from '@heroicons/react/20/solid'
import useActiveFilters from '../useActiveFilters'
import useCatalogFilters from '../CatalogFilters/useCatalogFilters'

interface Props {
  brandEntityId?: number
  categoryEntityId?: number
}

const ActiveFiltersPreview = ({ brandEntityId, categoryEntityId }: Props) => {
  const { availableFilters, setFilters } = useCatalogFilters({
    brandEntityId,
    categoryEntityId,
  })

  const activeFilters = useActiveFilters()

  const hasActiveFilters = Object.keys(activeFilters).some(
    key => activeFilters[key as keyof typeof activeFilters]?.length,
  )

  if (!hasActiveFilters) {
    return null
  }

  return (
    <div className="flex items-start gap-4">
      {Object.keys(activeFilters).flatMap(key => {
        const activeFilterGroupKey = key as keyof typeof activeFilters
        const filterIds = activeFilters[activeFilterGroupKey]

        return filterIds?.map(id => {
          const foundFilter = availableFilters[activeFilterGroupKey].find(
            item => ('id' in item ? item.id : item.entityId) === id,
          )

          if (foundFilter) {
            return (
              <div
                key={id}
                className="px-2 py-1 bg-gray-100 rounded-md text-sm font-medium flex items-center justify-between"
              >
                <div>{foundFilter.name}</div>

                <IconButton
                  size="sm"
                  variant="ghost"
                  onClick={() =>
                    setFilters(prev => ({
                      ...prev,
                      [activeFilterGroupKey]: prev[
                        activeFilterGroupKey
                      ]?.filter((filterId: number) => filterId !== id),
                    }))
                  }
                >
                  <XMarkIcon className="w-4 h-4" />
                </IconButton>
              </div>
            )
          }
        })
      })}
    </div>
  )
}

export default ActiveFiltersPreview
