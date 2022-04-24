import { Adjustments } from 'icons'
import React from 'react'
import FilterButton from './FilterButton'

interface Props {
  onClick: (b: boolean) => void
  filterCount: number
}

const FilterDialogButton = ({ onClick, filterCount = 0 }: Props) => {
  const active = filterCount > 0

  return (
    <div className="relative">
      {active && (
        <div className="bg-gray-900 w-4 h-4 rounded-full ring-1 ring-white absolute -right-1.5 flex justify-center items-center text-white text-[10px] font-bold">
          {filterCount}
        </div>
      )}
      <FilterButton onClick={() => onClick(true)} active={active}>
        <Adjustments
          className="block h-6 w-6 rotate-90  mr-2"
          aria-hidden="true"
        />
        Filters
      </FilterButton>
    </div>
  )
}

export default FilterDialogButton
