import { Popover } from '@headlessui/react'
import React from 'react'
import cx from 'classnames'
import { useCatalogFilters } from '../catalog-filters-context'
import { Checkbox } from '@components/ui'

interface Props {}

const Mobile = (props: Props) => {
  const { availableFilters, handleBrandChange } = useCatalogFilters()

  console.log('AVAILABLE FILTRES', availableFilters)

  return (
    <fieldset className="space-y-1">
      <legend className="text-xl font-bold">Brands</legend>
      {availableFilters.brands.map(brand => (
        <Popover.Button
          className="w-full"
          key={brand.name}
          onClick={() => handleBrandChange(brand.path)}
          aria-current={brand.active ? 'page' : undefined}
        >
          <div className="relative flex items-start justify-between py-2">
            <div className="min-w-0 text-sm">
              <label
                htmlFor={`person-${brand.name}`}
                className="font-medium text-gray-500 select-none"
              >
                {brand.name} {`${brand.active}`}
              </label>
            </div>
            <div className="ml-3 flex items-center h-5">
              <Checkbox
                name={`person-${brand.name}`}
                value={brand.path}
                checked={brand.active}
                onChange={() => handleBrandChange(brand.id)}
                size={2}
              />
            </div>
          </div>
        </Popover.Button>
      ))}
    </fieldset>
  )
}

export default Mobile
