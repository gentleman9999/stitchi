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
    filters: { brands: activeBrands },
    availableFilters,
    setFilters,
    toggleFilter,
  } = useFilters()

  const [filterState, setFilterState] = React.useState({
    brands: activeBrands,
  })

  const { brands } = filterState

  const filterPreviewFilters = React.useMemo(() => {
    return {
      filters: {
        brandEntityIds: brands?.length
          ? brands.map(brand => brand.id)
          : brandEntityId
          ? [brandEntityId]
          : undefined,

        categoryEntityIds: categoryEntityId ? [categoryEntityId] : null,

        searchSubCategories: true,
      },
    }
  }, [brandEntityId, brands, categoryEntityId])

  const { count } = useFilterPreview(filterPreviewFilters)

  React.useEffect(() => {
    if (open) {
      setFilterState({
        brands: activeBrands,
      })
    }
  }, [activeBrands, open])

  const handleSubmit = () => {
    setFilters(
      {
        brands: brands.map(brand => brand.id),
      },
      { scroll },
    )

    onClose()
  }

  const handleReset = () => {
    setFilterState({ brands: [] })
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
