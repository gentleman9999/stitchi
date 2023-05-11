import { Button, Checkbox, IconButton } from '@components/ui'
import { XIcon } from 'icons'
import React from 'react'
import pluralize from 'pluralize'
import { useCatalogFilters } from '../catalog-filters-context/catalog-filters-context'
import useFilterPreview from './useFilterPreview'
import * as Dialog from '@radix-ui/react-dialog'
import cx from 'classnames'
import { motion, AnimatePresence } from 'framer-motion'

interface Props {
  open: boolean
  onClose: () => void
  scroll?: boolean
  hideBrands?: boolean
  hideCategories?: boolean
}

const FilterDialog = ({
  open,
  onClose,
  scroll,
  hideBrands,
  hideCategories,
}: Props) => {
  const { availableFilters, setFilters } = useCatalogFilters()
  const [filterState, setFilterState] = React.useState(availableFilters)

  const { brands, categories } = filterState

  const filterPreviewFilters = React.useMemo(() => {
    const activeBrandIds = filtersToIds(brands)
    const activeCategoryIds = filtersToIds(categories)

    return {
      filters: {
        brandEntityIds: activeBrandIds.length ? activeBrandIds : undefined,
        categoryEntityIds: activeCategoryIds.length
          ? activeCategoryIds
          : undefined,
        searchSubCategories: true,
      },
    }
  }, [brands, categories])

  const { count, hasMore } = useFilterPreview(filterPreviewFilters)

  React.useEffect(() => {
    if (open) {
      setFilterState(availableFilters)
    }
  }, [availableFilters, open])

  const handleSubmit = () => {
    const serializedBrands = brands
      .filter(({ active }) => active)
      .map(brand => brand.path)

    const serializedCategories = categories
      .filter(({ active }) => active)
      .map(category => category.entityId.toString())

    setFilters(
      {
        brands: serializedBrands.length ? serializedBrands : null,
        categories: serializedCategories.length ? serializedCategories : null,
      },
      { scroll },
    )

    onClose()
  }

  const handleToggleBrand = (brandId: string) => {
    setFilterState({
      ...filterState,
      brands: brands.map(brand =>
        brand.path === brandId ? { ...brand, active: !brand.active } : brand,
      ),
    })
  }

  const handleToggleCategory = (categoryId: string) => {
    setFilterState({
      ...filterState,
      categories: categories.map(category =>
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
    <AnimatePresence>
      {open && (
        <Dialog.Root
          open={open}
          onOpenChange={val => val === false && onClose()}
        >
          <Dialog.Portal>
            <div className="relative z-40">
              <Dialog.Overlay
                className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                asChild
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
              </Dialog.Overlay>

              <div className="fixed inset-0 flex justify-center items-center">
                <Dialog.Content
                  forceMount
                  className={cx(
                    'align-bottom bg-white overflow-scroll shadow-xl transform transition-all sm:align-middle sm:w-full flex flex-col max-h-[93%] sm:max-w-lg fixed bottom-0 left-0 right-0 sm:right-auto sm:left-auto sm:bottom-auto sm:flex rounded-t-lg sm:rounded-lg sm:my-8 text-sm',
                  )}
                >
                  <DialogSectionPadding>
                    <Dialog.Title
                      className="text-lg leading-6 font-medium text-gray-900"
                      asChild
                    >
                      <div className="grid grid-cols-3">
                        <div>
                          <Dialog.Close>
                            <IconButton variant="ghost" disableGutters>
                              <XIcon width={20} height={20} />
                            </IconButton>
                          </Dialog.Close>
                        </div>

                        <div className="text-center font-heading font-bold flex items-center justify-center">
                          Filters
                        </div>
                        <div />
                      </div>
                    </Dialog.Title>
                  </DialogSectionPadding>

                  <Divider className="mt-4 sm:mt-6" />
                  <div className="overflow-scroll">
                    <motion.div
                      initial={{
                        height: 0,
                      }}
                      animate={{
                        height: 500,
                      }}
                      exit={{
                        height: 0,
                      }}
                      transition={{
                        type: 'spring',
                        bounce: 0,
                        duration: 0.3,
                        delay: 0,
                      }}
                    >
                      <div className="flex-1 pb-4 sm:pb-6">
                        <DialogSectionPadding>
                          <fieldset>
                            {brands.length && !hideBrands ? (
                              <>
                                <FilterSection
                                  title="Brands"
                                  subtitle="A unique and outstanding selection of brands"
                                >
                                  <CheckboxGroup>
                                    {brands.map(brand => (
                                      <CheckboxFilter
                                        key={brand.path}
                                        active={brand.active}
                                        value={brand.path}
                                        label={brand.name}
                                        onChange={() =>
                                          handleToggleBrand(brand.path)
                                        }
                                        sectionName="Brands"
                                      />
                                    ))}
                                  </CheckboxGroup>
                                </FilterSection>
                                <FilterSectionSpacer />
                              </>
                            ) : null}

                            {categories.length && !hideCategories ? (
                              <FilterSection title="Categories">
                                <CheckboxGroup>
                                  {categories.map(category => (
                                    <CheckboxFilter
                                      key={category.entityId}
                                      value={category.entityId}
                                      label={category.name}
                                      onChange={() =>
                                        handleToggleCategory(
                                          category.entityId.toString(),
                                        )
                                      }
                                      active={category.active}
                                      sectionName="Categories"
                                    />
                                  ))}
                                </CheckboxGroup>
                              </FilterSection>
                            ) : null}
                          </fieldset>
                        </DialogSectionPadding>
                      </div>
                    </motion.div>
                  </div>

                  <Divider />

                  <DialogSectionPadding>
                    <div className="justify-between flex">
                      <Button
                        variant="naked"
                        onClick={handleReset}
                        className="whitespace-nowrap"
                      >
                        Clear all
                      </Button>
                      <Button
                        onClick={handleSubmit}
                        className="whitespace-nowrap"
                        disabled={count === 0}
                      >
                        {count === 0 ? (
                          'No products found'
                        ) : (
                          <>
                            Show {count}
                            {hasMore ? '+' : ''}{' '}
                            {pluralize('product', count || 0)}
                          </>
                        )}
                      </Button>
                    </div>
                  </DialogSectionPadding>
                  <DialogSectionPadding />
                </Dialog.Content>
              </div>
            </div>
          </Dialog.Portal>
        </Dialog.Root>
      )}
    </AnimatePresence>
  )
}

const DialogSectionPadding = ({ children }: { children?: React.ReactNode }) => {
  return <div className="px-4 pt-4 sm:px-6 sm:pt-6">{children}</div>
}

const Divider = ({ className }: { className?: string }) => {
  return <div className={cx('border-t', className)} />
}

const filtersToIds = (filters: { entityId: number; active: boolean }[]) =>
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
      <legend className="text-2xl font-semibold text-gray-800 font-heading">
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
        className="font-medium text-gray-500 select-none cursor-pointer font-heading text-md"
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
