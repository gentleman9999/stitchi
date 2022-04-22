import { Button, Checkbox, Dialog } from '@components/ui'
import React from 'react'
import { useCatalogFilters } from '../catalog-filters-context'

interface Props {
  open: boolean
  onClose: () => void
}

const DesktopDialog = ({ open, onClose }: Props) => {
  const { availableFilters, handleBrandChange } = useCatalogFilters()
  return (
    <Dialog open={open} onClose={onClose} size="lg">
      <Dialog.Title className="text-center">Filters</Dialog.Title>

      <Dialog.Content>
        <Dialog.ContentText>
          <fieldset>
            <legend className="text-2xl font-semibold text-gray-800">
              Brands
            </legend>
            <span>A unique and outstanding selection of brands</span>
            <div className="grid grid-cols-2 gap-7 mt-6">
              {availableFilters.brands?.map(brand => (
                <div key={brand.id} className="flex">
                  <div className="mr-3">
                    <Checkbox
                      name={`person-${brand.name}`}
                      value={brand.path}
                      checked={brand.active}
                      onChange={() => handleBrandChange(brand.id)}
                      size={2}
                    />
                  </div>
                  <label
                    htmlFor={`person-${brand.name}`}
                    className="font-medium text-gray-500 select-none"
                  >
                    {brand.name}
                  </label>
                </div>
              ))}
            </div>
          </fieldset>
        </Dialog.ContentText>
      </Dialog.Content>
      <Dialog.Actions className="justify-between flex !mt-14">
        <Button variant="ghost">Clear all</Button>
        <Button>Show products</Button>
      </Dialog.Actions>
    </Dialog>
  )
}

export default DesktopDialog
