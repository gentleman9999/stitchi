import React from 'react'
import { useCatalogFilters } from '../catalog-filters-context'
import { Checkbox } from '@components/ui'
import CatalogIndexPageFilterSummary from '../CatalogIndexPageFilterSummary'
import { Popover, Transition } from '@headlessui/react'
import { Adjustments, XIcon } from 'icons'

interface Props {}

const Mobile = (props: Props) => {
  const { availableFilters, handleToggleBrand, handleToggleCategory } =
    useCatalogFilters()

  return (
    <Popover>
      {({ open }) => (
        <>
          <div className="flex items-center mt-8">
            <CatalogIndexPageFilterSummary />

            <Popover.Button className="ml-auto flex items-center">
              {/* Mobile menu button*/}
              <div className="ml-auto inline-flex items-center justify-center p-2 rounded-md text-gray-400">
                <span className="sr-only">Open main menu</span>
                <div className="p-1 rounded-full ring-1 ring-gray-900">
                  <Adjustments
                    className="block h-6 w-6 rotate-90 stroke-gray-900"
                    aria-hidden="true"
                  />
                </div>
              </div>
            </Popover.Button>
          </div>

          <Transition show={open}>
            <div className="sm:hidden fixed inset-0 z-50 overflow-y-auto">
              <div className="min-h-screen">
                <Transition.Child
                  enter="transition duration-500 ease-in-out"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="transition duration-200 ease-out"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Popover.Overlay className="fixed inset-0 bg-black opacity-40" />
                </Transition.Child>
              </div>

              <Transition.Child
                enter="transition duration-3000 ease-in-out"
                enterFrom="transform translate-y-[500px]"
                enterTo="transform translate-y-0"
                leave="transition duration-2000 ease-in-out"
                leaveFrom="transform translate-y-0"
                leaveTo="transform translate-y-[500px]"
              >
                <Popover.Panel className="bg-white rounded-t-2xl p-8 absolute bottom-0 left-0 right-0 z-10 max-h-[80%] overflow-x-scroll">
                  <Popover.Button className="block ml-auto">
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  </Popover.Button>

                  <fieldset className="space-y-1">
                    <FilterSection title="Brands">
                      {availableFilters.brands.map(brand => (
                        <CheckboxFilter
                          key={brand.id}
                          label={brand.name}
                          value={brand.path}
                          active={brand.active}
                          sectionName="Brands"
                          onChange={() => handleToggleBrand(brand.path)}
                        />
                      ))}
                    </FilterSection>
                    <FilterSectionSpacer />
                    <FilterSection title="Categories">
                      {availableFilters.categories.map(category => (
                        <CheckboxFilter
                          key={category.entityId}
                          label={category.name}
                          value={category.entityId}
                          active={category.active}
                          sectionName="Categories"
                          onChange={() =>
                            handleToggleCategory(category.entityId.toString())
                          }
                        />
                      ))}
                    </FilterSection>
                  </fieldset>
                </Popover.Panel>
              </Transition.Child>
            </div>
          </Transition>
        </>
      )}
    </Popover>
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
      <legend className="text-xl font-bold">{title}</legend>
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
    <Popover.Button
      className="w-full"
      onClick={onChange}
      aria-current={active ? 'page' : undefined}
    >
      <div className="relative flex items-start justify-between py-2">
        <div className="min-w-0 text-sm">
          <label
            htmlFor={name}
            className="font-medium text-gray-500 select-none"
          >
            {label}
          </label>
        </div>
        <div className="ml-3 flex items-center h-5">
          <Checkbox
            name={name}
            value={value}
            checked={active}
            onChange={onChange}
            size={2}
          />
        </div>
      </div>
    </Popover.Button>
  )
}

export default Mobile
