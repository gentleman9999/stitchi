import { Button, Checkbox, Dialog } from '@components/ui'
import React from 'react'
import { useCatalogFilters } from '../catalog-filters-context'

interface Props {
  open: boolean
  onClose: () => void
}

const DesktopDialog = ({ open, onClose }: Props) => {
  const {
    availableFilters,
    handleToggleBrand,
    handleToggleCategory,
    resetFilters,
  } = useCatalogFilters()
  return (
    <Dialog open={open} onClose={onClose} size="lg">
      <Dialog.Title className="text-center">Filters</Dialog.Title>

      <Dialog.Content>
        <Dialog.ContentText>
          <fieldset>
            <FilterSection
              title="Brands"
              subtitle="A unique and outstanding selection of brands"
            >
              <CheckboxGroup>
                {availableFilters.brands?.map(brand => (
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
                {availableFilters.categories?.map(category => (
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
      <Dialog.Actions className="justify-between flex !mt-14">
        <Button variant="ghost" onClick={resetFilters}>
          Clear all
        </Button>
        <Button onClick={onClose}>Show products</Button>
      </Dialog.Actions>
    </Dialog>
  )
}

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
      <legend className="text-2xl font-semibold text-gray-800">{title}</legend>
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
  return <div className="grid grid-cols-2 gap-7">{children}</div>
}

export default DesktopDialog
