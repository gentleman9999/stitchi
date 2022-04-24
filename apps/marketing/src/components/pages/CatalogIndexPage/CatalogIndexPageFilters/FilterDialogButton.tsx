import { Adjustments } from 'icons'
import React from 'react'
import cx from 'classnames'
import FilterButton from './FilterButton'
import { useCatalogFilters } from '../catalog-filters-context'

interface Props {
  onClick: (b: boolean) => void
  floating?: boolean
}

const FilterDialogButton = React.forwardRef<any, Props>(
  ({ onClick, floating = false }, ref) => {
    const { activeFilters } = useCatalogFilters()

    const filterCount =
      activeFilters.brands.length + activeFilters.categories.length

    const active = filterCount > 0

    return (
      <div
        ref={ref}
        className={cx({
          'fixed z-10 bottom-11 left-0 right-0 flex justify-center': floating,
        })}
      >
        <div className="relative">
          {active && (
            <div
              className={cx(
                'bg-gray-900 w-4 h-4 rounded-full ring-1 ring-white absolute -right-1.5 flex justify-center items-center text-white text-[10px] font-bold',
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
              className="block h-6 w-6 rotate-90  mr-2"
              aria-hidden="true"
            />
            Filters
          </FilterButton>
        </div>
      </div>
    )
  },
)

FilterDialogButton.displayName = 'FilterDialogButton'

export default FilterDialogButton
