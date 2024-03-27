import React from 'react'
import Dropdown from '../old/(grid)/FilterDialog/Dropdown'
import { SearchProductsSortInput } from '@generated/types'

const SORT_OPTIONS = [
  {
    label: 'Featured',
    value: SearchProductsSortInput.FEATURED,
  },
  {
    label: 'Relevance',
    value: SearchProductsSortInput.RELEVANCE,
  },
  {
    label: 'Price: Low to High',
    value: SearchProductsSortInput.LOWEST_PRICE,
  },
  {
    label: 'Price: High to Low',
    value: SearchProductsSortInput.HIGHEST_PRICE,
  },
  {
    label: 'Best Sellers',
    value: SearchProductsSortInput.BEST_SELLING,
  },
]

interface Props {
  sort: SearchProductsSortInput | null
  onChange: (sort: SearchProductsSortInput) => void
}

const SortButton = (props: Props) => {
  const [nextSort, setNextSort] =
    React.useState<SearchProductsSortInput | null>(props.sort)

  React.useEffect(() => {
    setNextSort(props.sort)
  }, [props.sort])

  const activeSort = SORT_OPTIONS.find(option => option.value === nextSort)

  return (
    <Dropdown
      align="end"
      buttonClassName="h-full w-full lg:w-auto"
      label={
        <div className="flex flex-col items-start gap-0.5">
          <div className="text-xs font-normal text-gray-500 leading-none">
            Sort
          </div>
          <div className="text-sm font-medium leading-none">
            {activeSort?.label}
          </div>
        </div>
      }
      items={SORT_OPTIONS.map(option => ({
        id: option.value,
        active: false,
        label: option.label,
        onClick: () => {
          setNextSort(option.value)
          props.onChange(option.value)
        },
      }))}
    />
  )
}

export default SortButton
