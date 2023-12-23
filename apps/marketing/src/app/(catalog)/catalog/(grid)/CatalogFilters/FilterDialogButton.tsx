import { Adjustments } from 'icons'
import React from 'react'
import cx from 'classnames'
import FilterButton from './FilterButton'
import { useFilters } from '../filters-context'

interface Props {
  onClick: (b: boolean) => void
  floating?: boolean
}

const FilterDialogButton = ({ onClick, floating = false }: Props) => {
  const {
    filters: { brands, categories },
  } = useFilters()

  const filterCount = (brands?.length || 0) + (categories?.length || 0)

  const active = filterCount > 0

  return (
    <div className="relative h-full">
      {active && (
        <div
          className={cx(
            'bg-gray-900 w-4 rounded-full ring-1 ring-white absolute -right-1.5 flex justify-center items-center text-white text-[10px] font-bold',
            { 'ring-2': Boolean(floating) },
          )}
        >
          {filterCount}
        </div>
      )}
      <FilterButton
        onClick={() => onClick(true)}
        active={active}
        variant={floating ? 'secondary' : 'primary'}
      >
        <Adjustments
          className="block h-6 w-6 rotate-90 mr-2"
          aria-hidden="true"
        />
        Filters
      </FilterButton>
    </div>
  )
}

export default FilterDialogButton
