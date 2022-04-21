import React from 'react'
import { Checkbox, CheckboxGroup, TextField } from '@components/ui'
import useCheckboxGroup from '../useCheckboxGroup'
import NewCheckboxGroup from '../CheckboxGroup'
import Dropdown from '../Dropdown'
import { useCatalogFilters } from '../catalog-filters-context'

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
  const { availableFilters, handleBrandChange, filters } = useCatalogFilters()

  const { brands } = filters

  return (
    <FilterGroup>
      {/* <Filter>
        <FilterTitle>Product Type</FilterTitle>
        <FilterItems>
          <Dropdown
            fullWidth
            placeholder="Select type"
            value={
              category
                ? { value: category.id, label: category.name }
                : defaultType
            }
            options={[
              defaultType,
              ...availableFilters.categories.map(c => ({
                label: c.name,
                value: c.id,
              })),
            ]}
            onChange={c => handleCategoryChange(c.value)}
          />
        </FilterItems>
      </Filter> */}
      <Filter>
        <FilterTitle>Brand</FilterTitle>
        <FilterItems>
          <Dropdown
            fullWidth
            placeholder="Select type"
            value={
              brands?.length
                ? { value: brands[0].id, label: brands[0].name }
                : defaultBrand
            }
            options={[
              defaultBrand,
              ...availableFilters.brands.map(b => ({
                label: b.name,
                value: b.id,
              })),
            ]}
            onChange={c => handleBrandChange(c.value)}
          />
        </FilterItems>
      </Filter>
    </FilterGroup>
  )
}

const FilterGroup: React.FC = props => {
  return <div className="flex space-x-10">{props.children}</div>
}

const Filter: React.FC = props => {
  return <div className="mt-8">{props.children}</div>
}

const FilterTitle: React.FC = props => {
  return (
    <h3 className="text-sm font-medium tracking-tight">{props.children}</h3>
  )
}

const FilterItems: React.FC = props => {
  return <div className="mt-2 min-w-[200px]">{props.children}</div>
}

export default Desktop
