import React from 'react'
import { Checkbox, CheckboxGroup, TextField } from '@components/ui'
import useCheckboxGroup from './useCheckboxGroup'
import NewCheckboxGroup from './CheckboxGroup'

const category = (id: string) => ({
  id: id,
  name: `Apparel ${id}`,
  slug: `apparel-${id}`,
})

const brand = (id: string) => ({
  id: id,
  name: `Brand ${id}`,
  value: `brand-${id}`,
  slug: `brand-${id}`,
})

const categories = Array.from(new Array(7), (_, i) => category(i.toString()))
// const initialBrands = Array.from(new Array(7), (_, i) => brand(i.toString()))

interface Props {}

const CatalogIndexPageFilters = (props: Props) => {
  const [initialBrands, setInitialBrands] = React.useState(
    Array.from(new Array(7), (_, i) => brand(i.toString())).map(b => ({
      ...b,
      label: b.name,
    })),
  )
  //   const {
  //     options: brands,
  //     search,
  //     term,
  //     setSelected,
  //   } = useCheckboxGroup({
  //     initialOptions: initialBrands.map(b => ({ ...b, checked: true })),
  //   })

  const [filterState, setFilterState] = React.useState({
    categories: [],
    brands: [],
  })

  //   console.log('BRANDS', brands)

  return (
    <div className="">
      <h2 className="font-bold text-xl">Find the perfect product</h2>
      <Filter>
        <FilterTitle>Categories</FilterTitle>
        <FilterItems>
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
        </FilterItems>
      </Filter>
      <Filter>
        <FilterTitle>Brands</FilterTitle>
        <NewCheckboxGroup
          options={initialBrands}
          onChange={options => {
            // setInitialBrands(options)
          }}
        />
        {/* <div className="mb-4">
          <TextField
            name="search"
            value={term}
            multiline={false}
            placeholder="Search"
            onChange={e => search(e.target.value)}
          />
        </div> */}
        <FilterItems>
          {/* {brands.map(brand => (
            <Checkbox
              key={brand.id}
              name={brand.name}
              value={brand.value}
              label={brand.name}
              onSecondaryAction={() => setSelected([brand])}
              showSecondaryAction={
                !brand.checked || brands.filter(b => b.checked).length > 1
              }
            />
          ))} */}
          {/* <CheckboxGroup enableSearch>
            {initialBrands.map(brand => (
              <Checkbox
                key={brand.id}
                name={`${brand.name}`}
                value={brand.id}
                label={brand.name}
                // onChange={checked =>
                //   setFilterState(prev => ({
                //     ...filterState,
                //     brands: prev.brands.map(b =>
                //       b.id === brand.id ? { ...brand, checked } : b,
                //     ),
                //   }))
                // }
              />
            ))}
          </CheckboxGroup> */}
        </FilterItems>
      </Filter>
    </div>
  )
}

const Filter: React.FC = props => {
  return <div className="mt-8">{props.children}</div>
}

const FilterTitle: React.FC = props => {
  return <h3 className="text-lg font-medium">{props.children}</h3>
}

const FilterItems: React.FC = props => {
  return <div className="mt-4">{props.children}</div>
}

export default CatalogIndexPageFilters
