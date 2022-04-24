import React from 'react'
import { useCatalogFilters } from '../catalog-filters-context'
import FilterButton from './FilterButton'
import FilterDialog from './FilterDialog'
import FilterDialogButton from './FilterDialogButton'
interface Props {}

const CatalogIndexPageFilters = ({}: Props) => {
  const { activeFilters } = useCatalogFilters()
  const [dialogOpen, setDialogOpen] = React.useState(false)

  const filterCount =
    activeFilters.brands.length + activeFilters.categories.length

  return (
    <nav>
      <FilterDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
      <div className="flex justify-between">
        <div>{/* <FilterButton onClick={() => {}}>hi</FilterButton> */}</div>
        <div>
          <FilterDialogButton
            onClick={setDialogOpen}
            filterCount={filterCount}
          />
        </div>
      </div>
    </nav>
  )
}

export default CatalogIndexPageFilters
