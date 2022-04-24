import { Button, Checkbox, Dialog, IconButton } from '@components/ui'
import { XIcon } from 'icons'
import React from 'react'
import { useCatalogFilters } from '../catalog-filters-context'
import useFilterPreview from './useFilterPreview'

interface Props {
  open: boolean
  onClose: () => void
}

const FilterDialog = ({ open, onClose }: Props) => {
  const { availableFilters, setFilters } = useCatalogFilters()

  const [filterState, setFilterState] = React.useState(availableFilters)

  const filterPreviewFilters = React.useMemo(
    () => ({
      filters: {
        brandEntityIds: filterToId(filterState.brands),
        categoryEntityIds: filterToId(filterState.categories),
        searchSubCategories: true,
      },
    }),
    [filterState.brands, filterState.categories],
  )

  const { count, hasMore } = useFilterPreview(filterPreviewFilters)

  React.useEffect(() => {
    if (open) {
      setFilterState(availableFilters)
    }
  }, [availableFilters, open])

  const handleSubmit = () => {
    const brands = filterState.brands
      .filter(({ active }) => active)
      .map(brand => brand.path)

    const categories = filterState.categories
      .filter(({ active }) => active)
      .map(category => category.entityId.toString())

    setFilters(
      {
        brands: brands.length ? brands : null,
        categories: categories.length ? categories : null,
      },
      { scroll: false },
    )

    onClose()
  }

  const handleToggleBrand = (brandId: string) => {
    setFilterState({
      ...filterState,
      brands: filterState.brands.map(brand =>
        brand.path === brandId ? { ...brand, active: !brand.active } : brand,
      ),
    })
  }

  const handleToggleCategory = (categoryId: string) => {
    setFilterState({
      ...filterState,
      categories: filterState.categories.map(category =>
        category.entityId.toString() === categoryId
          ? { ...category, active: !category.active }
          : category,
      ),
    })
  }

  const handleReset = () => {
    setFilterState(prev => ({
      brands: prev.brands.map(brand => ({ ...brand, active: false })),
      categories: prev.categories.map(category => ({
        ...category,
        active: false,
      })),
    }))
  }

  return (
    <Dialog mobileFullScreen open={open} onClose={onClose} size="lg">
      <Dialog.Title className="grid grid-cols-3">
        <IconButton onClick={onClose} variant="ghost" disableGutters>
          <XIcon width={20} height={20} />
        </IconButton>
        <div className="text-center">Filters</div>
        <div />
      </Dialog.Title>

      <Dialog.Content dividers>
        <Dialog.ContentText>
          <fieldset>
            <FilterSection
              title="Brands"
              subtitle="A unique and outstanding selection of brands"
            >
              <CheckboxGroup>
                {filterState.brands?.map(brand => (
                  <CheckboxFilter
                    key={brand.path}
                    active={brand.active}
                    value={brand.path}
                    label={brand.name}
                    onChange={() => handleToggleBrand(brand.path)}
                    sectionName="Brands"
                  />
                ))}
              </CheckboxGroup>
            </FilterSection>
            <FilterSectionSpacer />
            <FilterSection title="Categories">
              <CheckboxGroup>
                {filterState.categories?.map(category => (
                  <CheckboxFilter
                    key={category.entityId}
                    value={category.entityId}
                    label={category.name}
                    onChange={() =>
                      handleToggleCategory(category.entityId.toString())
                    }
                    active={category.active}
                    sectionName="Categories"
                  />
                ))}
              </CheckboxGroup>
            </FilterSection>
          </fieldset>
        </Dialog.ContentText>
      </Dialog.Content>
      <Dialog.Actions className="justify-between flex">
        <Button
          variant="naked"
          onClick={handleReset}
          className="whitespace-nowrap"
        >
          Clear all
        </Button>
        <Button onClick={handleSubmit} className="whitespace-nowrap">
          Show {count}
          {hasMore ? '+' : ''} products
        </Button>
      </Dialog.Actions>
    </Dialog>
  )
}

const filterToId = (filters: { entityId: number; active: boolean }[]) =>
  filters.filter(({ active }) => active).map(({ entityId }) => entityId)

const FilterSection = ({
  children,
  title,
  subtitle,
}: {
  children: React.ReactNode
  title: string
  subtitle?: string
}) => {
  return (
    <div>
      <legend className="text-2xl font-semibold text-gray-800 tracking-tight">
        {title}
      </legend>
      <span>{subtitle}</span>
      <div className="mt-6">{children}</div>
    </div>
  )
}

const FilterSectionSpacer = () => {
  return (
    <div className="pt-10 pb-8">
      <div className="border-b" />
    </div>
  )
}

const CheckboxFilter = ({
  onChange,
  label,
  value,
  sectionName,
  active,
}: {
  onChange: () => void
  label: string
  value: string | number
  sectionName: string
  active: boolean
}) => {
  const name = `${sectionName}-${value}`

  return (
    <div key={value} className="flex">
      <div className="mr-3">
        <Checkbox
          name={name}
          value={value}
          checked={active}
          onChange={onChange}
          size={2}
        />
      </div>
      <label
        htmlFor={name}
        className="font-medium text-gray-500 select-none cursor-pointer"
        onClick={onChange}
      >
        {label}
      </label>
    </div>
  )
}

const CheckboxGroup = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-7">
      {children}
    </div>
  )
}

export default FilterDialog
