import React from 'react'
import DesktopDialog from './DesktopDialog'
import { useCatalogFilters } from '../catalog-filters-context'
import { Adjustments } from 'icons'
import cx from 'classnames'

const defaultType = {
  label: 'All types',
  value: null,
}

const defaultBrand = {
  label: 'All brands',
  value: null,
}

interface Props {}

const Desktop = (props: Props) => {
  const [dialogOpen, setDialogOpen] = React.useState(false)
  const { availableFilters, handleToggleBrand, filters } = useCatalogFilters()

  const { brands } = filters

  return (
    <>
      <DesktopDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
      <div className="flex justify-between">
        <div className="flex space-x-2 whitespace-nowrap">
          {/* {availableFilters.brands?.map(brand => (
            <FilterButton
              key={brand.id}
              active={brand.active}
              onClick={() => handleToggleBrand(brand.path)}
            >
              {brand.name}
            </FilterButton>
          ))} */}
        </div>
        <div>
          <FilterButton onClick={() => setDialogOpen(true)}>
            <Adjustments
              className="block h-6 w-6 rotate-90 stroke-gray-900 mr-2"
              aria-hidden="true"
            />
            Filters
          </FilterButton>
        </div>
      </div>
    </>
  )
}

const FilterButton: React.FC<{
  onClick: () => void
  active?: Boolean
}> = props => {
  return (
    <button
      onClick={props.onClick}
      className={cx(
        'flex rounded-full ring-1 ring-gray-900 py-1 px-3 text-xs items-center',
        { 'ring-2': props.active },
      )}
    >
      {props.children}
    </button>
  )
}

// const FilterGroup: React.FC = props => {
//   return <div className="flex space-x-10">{props.children}</div>
// }

// const Filter: React.FC = props => {
//   return <div className="mt-8">{props.children}</div>
// }

// const FilterTitle: React.FC = props => {
//   return (
//     <h3 className="text-sm font-medium tracking-tight">{props.children}</h3>
//   )
// }

// const FilterItems: React.FC = props => {
//   return <div className="mt-2 min-w-[200px]">{props.children}</div>
// }

export default Desktop
