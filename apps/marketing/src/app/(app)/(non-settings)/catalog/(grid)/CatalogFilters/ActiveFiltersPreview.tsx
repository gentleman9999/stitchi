import React from 'react'
import IconButton from '@components/ui/IconButton'
import { XMarkIcon } from '@heroicons/react/20/solid'
import { useFilters } from '../../filters-context'

interface Props {
  brandEntityId?: number
  categoryEntityId?: number
}

const ActiveFiltersPreview = ({ brandEntityId, categoryEntityId }: Props) => {
  const { filters, setFilters } = useFilters()

  const hasActiveFilters = Object.keys(filters).some(
    key => filters[key as keyof typeof filters]?.length,
  )

  if (!hasActiveFilters) {
    return null
  }

  return (
    <div className="flex items-start flex-wrap gap-2">
      <Button
        label="Clear all"
        onClick={() =>
          setFilters({
            brands: null,
            categories: null,
            collections: null,
            fabrics: null,
            fits: null,
          })
        }
      />

      {Object.keys(filters).flatMap(key => {
        const activeFilterGroupKey = key as keyof typeof filters
        const filterGroup = filters[activeFilterGroupKey]

        return filterGroup?.map(filter => {
          return (
            <Button
              key={filter.name}
              label={filter.name}
              onClick={() =>
                setFilters(prev => ({
                  ...prev,
                  [activeFilterGroupKey]: prev[activeFilterGroupKey]?.filter(
                    filterId =>
                      filterId !==
                      ('id' in filter ? filter.id : filter.entityId),
                  ),
                }))
              }
            />
          )
        })
      })}
    </div>
  )
}

const Button = ({ label, onClick }: { label: string; onClick: () => any }) => {
  return (
    <div className="px-2 py-1 bg-gray-100 rounded-md text-sm font-medium flex items-center justify-between">
      <div>{label}</div>

      <IconButton size="sm" variant="ghost" onClick={onClick}>
        <XMarkIcon className="w-4 h-4" />
      </IconButton>
    </div>
  )
}

export default ActiveFiltersPreview
