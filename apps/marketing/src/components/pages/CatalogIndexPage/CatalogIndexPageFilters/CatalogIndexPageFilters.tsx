import React from 'react'
import { Checkbox, CheckboxGroup, TextField } from '@components/ui'
import useCheckboxGroup from '../useCheckboxGroup'
import NewCheckboxGroup from '../CheckboxGroup'
import Dropdown from '../Dropdown'
import { useCatalogFilters } from '../catalog-filters-context'

// const initialBrands = Array.from(new Array(7), (_, i) => brand(i.toString()))

interface Props {}

const CatalogIndexPageFilters = (props: Props) => {
  const { availableFilters, handleCategoryChange } = useCatalogFilters()

  return (
    <div className="">
      <h2 className="font-bold text-xl">Find the perfect product</h2>
      <Filter>
        <FilterTitle>Product Type</FilterTitle>
        <FilterItems>
          <Dropdown
            placeholder="Select type"
            options={[
              { label: 'All types', onClick: () => handleCategoryChange(null) },
              ...availableFilters.categories.map(c => ({
                label: c.name,
                onClick: () => handleCategoryChange(c.id),
              })),
            ]}
          />
        </FilterItems>

        {/* <FilterItems>
          <CheckboxGroup>
            {categories.map(category => (
              <Checkbox
                key={category.id}
                name={`${category.name}`}
                value={category.id}
                label={category.name}
                onChange={checked => {
                  //   setInitialBrands(prev => prev.map(brand => ({ ...brand, checked: })))
                }}
              />
            ))}
          </CheckboxGroup>
        </FilterItems> */}
      </Filter>
    </div>
  )
}

const Filter: React.FC = props => {
  return <div className="mt-8">{props.children}</div>
}

const FilterTitle: React.FC = props => {
  return <h3 className="text font-medium tracking-tight">{props.children}</h3>
}

const FilterItems: React.FC = props => {
  return <div className="mt-4">{props.children}</div>
}

export default CatalogIndexPageFilters
