import { XIcon } from 'icons'
import React from 'react'
import pluralize from 'pluralize'
import useFilterPreview from './useFilterPreview'
import * as Dialog from '@radix-ui/react-dialog'
import cx from 'classnames'
import { motion } from 'framer-motion'
import CheckboxFilter from './CheckboxFilter'
import CheckboxGroup from './CheckboxGroup'
import CategoryTree from './CategoryTree'
import FilterDialogContainer from './FilterDialogContainer'
import Button from '@components/ui/ButtonV2/Button'
import IconButton from '@components/ui/IconButton'
import { useFilters } from '../filters-context'

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
    filters: {
      brands: activeBrands,
      categories: activeCategories,
      collections: activeCollections,
      fabrics: activeFabrics,
      fits: activeFits,
    },
    availableFilters,
    setFilters,
    toggleFilter,
  } = useFilters()

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
          ? brands.map(brand => brand.id)
          : brandEntityId
          ? [brandEntityId]
          : undefined,
        categoryEntityIds:
          categories?.length ||
          collections?.length ||
          fits?.length ||
          fabrics?.length
            ? [
                ...(categories.map(category => category.entityId) || []),
                ...(collections.map(collection => collection.entityId) || []),
                ...(fits.map(fit => fit.entityId) || []),
                ...(fabrics.map(fabric => fabric.entityId) || []),
              ]
            : categoryEntityId
            ? [
                categoryEntityId,
                ...(collections.map(collection => collection.entityId) || []),
                ...(fits.map(fit => fit.entityId) || []),
                ...(fabrics.map(fabric => fabric.entityId) || []),
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
    setFilters(
      {
        brands: brands.map(brand => brand.id),
        categories: categories.map(category => category.entityId),
        collections: collections.map(collection => collection.entityId),
        fabrics: fabrics.map(fabric => fabric.entityId),
        fits: fits.map(fit => fit.entityId),
      },
      { scroll },
    )

    onClose()
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
                            active={Boolean(brands?.includes(brand))}
                            value={brand.id}
                            label={brand.name}
                            onChange={() => toggleFilter('brands', brand.id)}
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
                        active={Boolean(fabrics?.includes(fabric))}
                        value={fabric.entityId}
                        label={fabric.name}
                        onChange={() =>
                          toggleFilter('fabrics', fabric.entityId)
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
                        active={Boolean(collections?.includes(collection))}
                        value={collection.entityId}
                        label={collection.name}
                        onChange={() =>
                          toggleFilter('collections', collection.entityId)
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
                        active={Boolean(fits?.includes(fit))}
                        value={fit.entityId}
                        label={fit.name}
                        onChange={() => toggleFilter('fits', fit.entityId)}
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
