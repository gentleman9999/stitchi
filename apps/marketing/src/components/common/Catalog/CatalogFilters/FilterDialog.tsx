import { Button, Checkbox, IconButton } from '@components/ui'
import { XIcon } from 'icons'
import React from 'react'
import pluralize from 'pluralize'
import useFilterPreview from './useFilterPreview'
import * as Dialog from '@radix-ui/react-dialog'
import cx from 'classnames'
import { motion, AnimatePresence } from 'framer-motion'
import useCatalogFilters from './useCatalogFilters'
import useActiveFilters from '../useActiveFilters'
import CheckboxFilter from './CheckboxFilter'
import CheckboxGroup from './CheckboxGroup'
import CategoryTree from './CategoryTree'

interface Props {
  open: boolean
  onClose: () => void
  scroll?: boolean
  brandEntityId?: number
  categoryEntityId?: number
}

const FilterDialog = ({
  open,
  onClose,
  scroll,
  brandEntityId,
  categoryEntityId,
}: Props) => {
  const { brands: activeBrands, categories: activeCategories } =
    useActiveFilters()

  const { availableFilters, setFilters } = useCatalogFilters({
    brandEntityId,
    categoryEntityId,
  })

  const [filterState, setFilterState] = React.useState({
    brands: activeBrands,
    categories: activeCategories,
  })

  const { brands, categories } = filterState

  const filterPreviewFilters = React.useMemo(() => {
    return {
      filters: {
        brandEntityIds: brands?.length
          ? brands
          : brandEntityId
          ? [brandEntityId]
          : undefined,
        categoryEntityIds: categories?.length
          ? categories
          : categoryEntityId
          ? [categoryEntityId]
          : undefined,
        searchSubCategories: true,
      },
    }
  }, [brandEntityId, brands, categories, categoryEntityId])

  const { count, hasMore } = useFilterPreview(filterPreviewFilters)

  React.useEffect(() => {
    if (open) {
      setFilterState({
        brands: activeBrands,
        categories: activeCategories,
      })
    }
  }, [activeBrands, activeCategories, open])

  const handleSubmit = () => {
    setFilters({ brands, categories }, { scroll })

    onClose()
  }

  const handleToggleBrand = (brandId: number) => {
    if (brands?.includes(brandId)) {
      setFilterState({
        ...filterState,
        brands: brands.filter(brand => brand !== brandId),
      })
    } else {
      setFilterState({
        ...filterState,
        brands: [...(brands || []), brandId],
      })
    }
  }

  const handleToggleCategory = (categoryId: number) => {
    if (categories?.includes(categoryId)) {
      setFilterState({
        ...filterState,
        categories: categories.filter(category => category !== categoryId),
      })
    } else {
      setFilterState({
        ...filterState,
        categories: [...(categories || []), categoryId],
      })
    }
  }

  const handleReset = () => {
    setFilterState({ brands: [], categories: [] })
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

              <div className="fixed inset-0 flex justify-center items-center p-4">
                <Dialog.Content
                  forceMount
                  className={cx(
                    'align-bottom bg-white overflow-scroll shadow-xl transform transition-all sm:align-middle sm:w-full flex flex-col max-h-[93%] sm:max-w-4xl fixed bottom-0 left-0 right-0 sm:right-auto sm:left-auto sm:bottom-auto sm:flex sm:relative rounded-t-lg sm:rounded-lg sm:my-8 text-sm',
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
                            {availableFilters.brands.length &&
                            !brandEntityId ? (
                              <>
                                <FilterSection
                                  title="Brands"
                                  subtitle="A unique and outstanding selection of brands"
                                >
                                  <CheckboxGroup>
                                    {availableFilters.brands.map(brand => (
                                      <CheckboxFilter
                                        key={brand.path}
                                        active={Boolean(
                                          brands?.includes(brand.entityId),
                                        )}
                                        value={brand.path}
                                        label={brand.name}
                                        onChange={() =>
                                          handleToggleBrand(brand.entityId)
                                        }
                                        sectionName="Brands"
                                      />
                                    ))}
                                  </CheckboxGroup>
                                </FilterSection>
                                <FilterSectionSpacer />
                              </>
                            ) : null}

                            {availableFilters.categories.length &&
                            !categoryEntityId ? (
                              <FilterSection title="Categories">
                                <CategoryTree
                                  categories={availableFilters.categories}
                                  onToggle={handleToggleCategory}
                                  activeCategoryIds={categories}
                                />
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

export default FilterDialog
