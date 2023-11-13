import { XIcon } from 'icons'
import React from 'react'
import pluralize from 'pluralize'
import useFilterPreview from './useFilterPreview'
import * as Dialog from '@radix-ui/react-dialog'
import cx from 'classnames'
import { motion } from 'framer-motion'
import useCatalogFilters from './useCatalogFilters'
import useActiveFilters from '../useActiveFilters'
import CheckboxFilter from './CheckboxFilter'
import CheckboxGroup from './CheckboxGroup'
import CategoryTree from './CategoryTree'
import FilterDialogContainer from './FilterDialogContainer'
import Button from '@components/ui/ButtonV2/Button'
import IconButton from '@components/ui/IconButton'

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
  const {
    brands: activeBrands,
    categories: activeCategories,
    collections: activeCollections,
    fabrics: activeFabrics,
    fits: activeFits,
  } = useActiveFilters()

  const { availableFilters, setFilters } = useCatalogFilters({
    brandEntityId,
    categoryEntityId,
  })

  const [filterState, setFilterState] = React.useState({
    brands: activeBrands,
    categories: activeCategories,
    collections: activeCollections,
    fabrics: activeFabrics,
    fits: activeFits,
  })

  const { brands, categories, fits, fabrics, collections } = filterState

  const filterPreviewFilters = React.useMemo(() => {
    return {
      filters: {
        brandEntityIds: brands?.length
          ? brands
          : brandEntityId
          ? [brandEntityId]
          : undefined,
        categoryEntityIds:
          categories?.length ||
          collections?.length ||
          fits?.length ||
          fabrics?.length
            ? [
                ...(categories || []),
                ...(collections || []),
                ...(fits || []),
                ...(fabrics || []),
              ]
            : categoryEntityId
            ? [
                categoryEntityId,
                ...(collections || []),
                ...(fits || []),
                ...(fabrics || []),
              ]
            : undefined,

        searchSubCategories: true,
      },
    }
  }, [
    brandEntityId,
    brands,
    categories,
    categoryEntityId,
    collections,
    fabrics,
    fits,
  ])

  const { count } = useFilterPreview(filterPreviewFilters)

  React.useEffect(() => {
    if (open) {
      setFilterState({
        brands: activeBrands,
        categories: activeCategories,
        collections: activeCollections,
        fabrics: activeFabrics,
        fits: activeFits,
      })
    }
  }, [
    activeBrands,
    activeCategories,
    activeCollections,
    activeFabrics,
    activeFits,
    open,
  ])

  const handleSubmit = () => {
    setFilters({ brands, categories, collections, fabrics, fits }, { scroll })

    onClose()
  }

  const handleToggle = (id: number, type: keyof typeof filterState) => {
    if (filterState[type]?.includes(id)) {
      setFilterState({
        ...filterState,
        [type]: filterState[type]?.filter(item => item !== id),
      })
    } else {
      setFilterState({
        ...filterState,
        [type]: [...(filterState[type] || []), id],
      })
    }
  }

  const handleReset = () => {
    setFilterState({
      brands: [],
      categories: [],
      collections: [],
      fabrics: [],
      fits: [],
    })
  }

  return (
    <FilterDialogContainer open={open} onClose={onClose}>
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
                {availableFilters.brands.length && !brandEntityId ? (
                  <>
                    <FilterSection
                      title="Brands"
                      subtitle="A unique and outstanding selection of brands"
                    >
                      <CheckboxGroup>
                        {availableFilters.brands.map(brand => (
                          <CheckboxFilter
                            key={brand.id}
                            active={Boolean(brands?.includes(brand.id))}
                            value={brand.id}
                            label={brand.name}
                            onChange={() => handleToggle(brand.id, 'brands')}
                            sectionName="Brands"
                          />
                        ))}
                      </CheckboxGroup>
                    </FilterSection>
                    <FilterSectionSpacer />
                  </>
                ) : null}

                {/* {availableFilters.categories.length && !categoryEntityId ? (
                  <>
                    <FilterSection title="Categories">
                      <CategoryTree
                        categories={availableFilters.categories}
                        onToggle={id => handleToggle(id, 'categories')}
                        activeCategoryIds={categories}
                      />
                    </FilterSection>
                    <FilterSectionSpacer />
                  </>
                ) : null} */}

                <FilterSection title="Fabric">
                  <CheckboxGroup>
                    {availableFilters.fabrics.map(fabric => (
                      <CheckboxFilter
                        key={fabric.entityId}
                        active={Boolean(fabrics?.includes(fabric.entityId))}
                        value={fabric.entityId}
                        label={fabric.name}
                        onChange={() =>
                          handleToggle(fabric.entityId, 'fabrics')
                        }
                        sectionName="Fabric"
                      />
                    ))}
                  </CheckboxGroup>
                </FilterSection>
                <FilterSectionSpacer />

                <FilterSection title="Collections">
                  <CheckboxGroup>
                    {availableFilters.collections.map(collection => (
                      <CheckboxFilter
                        key={collection.entityId}
                        active={Boolean(
                          collections?.includes(collection.entityId),
                        )}
                        value={collection.entityId}
                        label={collection.name}
                        onChange={() =>
                          handleToggle(collection.entityId, 'collections')
                        }
                        sectionName="Collections"
                      />
                    ))}
                  </CheckboxGroup>
                </FilterSection>

                <FilterSectionSpacer />

                <FilterSection title="Fit">
                  <CheckboxGroup>
                    {availableFilters.fits.map(fit => (
                      <CheckboxFilter
                        key={fit.entityId}
                        active={Boolean(fits?.includes(fit.entityId))}
                        value={fit.entityId}
                        label={fit.name}
                        onChange={() => handleToggle(fit.entityId, 'fits')}
                        sectionName="Fit"
                      />
                    ))}
                  </CheckboxGroup>
                </FilterSection>
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
                Show {count} {pluralize('product', count || 0)}
              </>
            )}
          </Button>
        </div>
      </DialogSectionPadding>
      <DialogSectionPadding />
    </FilterDialogContainer>
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
