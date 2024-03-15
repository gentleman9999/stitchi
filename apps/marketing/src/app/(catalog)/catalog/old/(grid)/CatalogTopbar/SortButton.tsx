import React from 'react'
import Dropdown from '../FilterDialog/Dropdown'
import { useFilters } from '../filters-context'

interface Props {}

const SortButton = (props: Props) => {
  const {
    sort,
    availableFilters: { sort: sortOptions },
    setSort,
  } = useFilters()

  return (
    <Dropdown
      align="end"
      buttonClassName="h-full w-full lg:w-auto"
      label={
        <div className="flex flex-col items-start gap-0.5">
          <div className="text-xs font-normal text-gray-500 leading-none">
            Sort
          </div>
          <div className="text-sm font-medium leading-none">{sort?.label}</div>
        </div>
      }
      items={sortOptions.map(option => ({
        id: option.value,
        active: false,
        label: option.label,
        onClick: () => setSort(option.value),
      }))}
    />
  )
}

export default SortButton
