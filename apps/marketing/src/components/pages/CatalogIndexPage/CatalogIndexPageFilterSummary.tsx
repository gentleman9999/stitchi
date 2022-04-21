import { Badge } from '@components/ui'
import React from 'react'
import { useCatalogFilters } from './catalog-filters-context'

interface Props {}

const CatalogIndexPageFilterSummary = ({}: Props) => {
  const { filters, handleBrandChange } = useCatalogFilters()

  const { brands } = filters

  if (brands?.length === 0) {
    return null
  }

  return (
    <div className="sm:flex sm:space-x-4 items-center">
      <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-500">
        Filters
        <span className="sr-only">, active</span>
      </h3>
      <div
        aria-hidden="true"
        className="hidden w-px h-5 bg-gray-300 sm:block sm:ml-4"
      />
      <div className="mt-2 sm:mt-0">
        {brands?.map(brand => (
          <Badge
            key={brand.id}
            label={brand.name}
            value={brand.entityId}
            onClose={() => handleBrandChange(null)}
          />
        ))}
      </div>
    </div>
  )
}

export default CatalogIndexPageFilterSummary
