import React from 'react'
import FilterDialog from './FilterDialog'
import { Adjustments } from 'icons'
import cx from 'classnames'
interface Props {}

const CatalogIndexPageFilters = ({}: Props) => {
  const [dialogOpen, setDialogOpen] = React.useState(false)

  return (
    <nav>
      <FilterDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
      <div className="flex justify-between">
        <div />
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
    </nav>
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

export default CatalogIndexPageFilters
