import React, { useTransition } from 'react'
import CheckboxFilter from './CheckboxFilter'
import CheckboxGroup from './CheckboxGroup'
import Button from '@components/ui/ButtonV2/Button'
import pluralize from 'pluralize'
import MoneyFilter from '../MoneyFilter'
import { SearchProductsFiltersInput } from '@generated/globalTypes'
import { notEmpty } from '@lib/utils/typescript'
import DialogSectionPadding from './DialogSectionPadding'
import Divider from './Divider'
import useSearchProductFilters from '../useSearchProductFilters'
import { DEFAULT_FILTERS } from '../../constants'

interface Props {
  rootCategoryEntityId: number
  defaultBrandEntityId: number | null
  defaultPreviewFilters: SearchProductsFiltersInput
  onSubmit: (filters: SearchProductsFiltersInput) => void
}

const FilterDialogInner = ({
  rootCategoryEntityId,
  defaultPreviewFilters,
  defaultBrandEntityId,
  onSubmit,
}: Props) => {
  const [previewFilters, setPreviewFilters] =
    React.useState<SearchProductsFiltersInput>(defaultPreviewFilters)

  const handleChange: React.Dispatch<
    React.SetStateAction<SearchProductsFiltersInput>
  > = action => {
    startLoading(() => {
      setPreviewFilters(action)
    })
  }

  const [loading, startLoading] = useTransition()

  const { totalItems, filters } = useSearchProductFilters({
    filters: previewFilters,
    rootCategoryEntityId,
  })

  const handleReset = () => {
    handleChange(DEFAULT_FILTERS)
  }

  const handleSubmit = () => {
    onSubmit(previewFilters)
  }

  return (
    <>
      <div className="overflow-scroll">
        <div className="h-[500px]">
          <div className="flex-1 pb-4 sm:pb-6">
            <DialogSectionPadding>
              <fieldset className="flex flex-col gap-10">
                {filters.map(filter => {
                  switch (filter.__typename) {
                    case 'BrandSearchFilter': {
                      if (defaultBrandEntityId) {
                        return null
                      }

                      const brands =
                        filter.brands.edges
                          ?.map(edge => edge?.node)
                          .filter(notEmpty) || []

                      if (!brands.length) {
                        return null
                      }

                      return (
                        <FilterSection
                          key="brands"
                          title="Brands"
                          subtitle="A unique and outstanding selection of brands"
                        >
                          <CheckboxGroup>
                            {brands.map(brand => (
                              <CheckboxFilter
                                key={brand.entityId}
                                disabled={loading}
                                active={Boolean(
                                  previewFilters.brandEntityIds?.includes(
                                    brand.entityId,
                                  ),
                                )}
                                value={brand.entityId}
                                label={brand.name}
                                productCount={brand.productCount}
                                onChange={() =>
                                  handleChange(prev => ({
                                    ...prev,
                                    brandEntityIds:
                                      prev.brandEntityIds?.includes(
                                        brand.entityId,
                                      )
                                        ? prev.brandEntityIds?.filter(
                                            entityId =>
                                              entityId !== brand.entityId,
                                          )
                                        : [
                                            ...(prev.brandEntityIds || []),
                                            brand.entityId,
                                          ],
                                  }))
                                }
                                sectionName="Brands"
                              />
                            ))}
                          </CheckboxGroup>
                        </FilterSection>
                      )
                    }

                    case 'PriceSearchFilter': {
                      return (
                        <FilterSection key="price" title="Base Price">
                          <MoneyFilter
                            value={{
                              min: filter.selected?.minPrice || null,
                              max: filter.selected?.maxPrice || null,
                            }}
                            onChange={value => {
                              handleChange(prev => ({
                                ...prev,
                                minPrice: value.min,
                                maxPrice: value.max,
                              }))
                            }}
                          />
                        </FilterSection>
                      )
                    }

                    case 'ProductAttributeSearchFilter': {
                      const attributes =
                        filter.attributes?.edges
                          ?.map(a => a?.node)
                          .filter(notEmpty) || []

                      return (
                        <FilterSection
                          key={filter.name}
                          title={filter.filterName}
                        >
                          <CheckboxGroup>
                            {attributes.map(attribute => (
                              <CheckboxFilter
                                sectionName={filter.filterName}
                                disabled={loading}
                                key={attribute.value}
                                onChange={() => {
                                  handleChange(prev => {
                                    const productAttributes = [
                                      ...(prev.productAttributes || []),
                                    ]

                                    const existingAttributeIdx =
                                      productAttributes?.findIndex(
                                        a => a.attribute === filter.name,
                                      )

                                    if (existingAttributeIdx >= 0) {
                                      const existingValues =
                                        productAttributes[existingAttributeIdx]
                                          .values

                                      const newValue = attribute.value || ''

                                      if (existingValues.includes(newValue)) {
                                        productAttributes[
                                          existingAttributeIdx
                                        ] = {
                                          attribute: filter.name,
                                          values: existingValues.filter(
                                            value => value !== newValue,
                                          ),
                                        }
                                      } else {
                                        productAttributes[
                                          existingAttributeIdx
                                        ] = {
                                          attribute: filter.name,
                                          values: [...existingValues, newValue],
                                        }
                                      }
                                    } else {
                                      productAttributes?.push({
                                        attribute: filter.name,
                                        values: [attribute.value || ''],
                                      })
                                    }

                                    return {
                                      ...prev,
                                      productAttributes,
                                    }
                                  })
                                }}
                                label={attribute.value}
                                value={attribute.value}
                                productCount={attribute.productCount}
                                active={Boolean(
                                  previewFilters.productAttributes?.some(
                                    a =>
                                      a.attribute === filter.name &&
                                      a?.values?.includes(attribute.value),
                                  ),
                                )}
                              />
                            ))}
                          </CheckboxGroup>
                        </FilterSection>
                      )
                    }
                  }
                })}
              </fieldset>
            </DialogSectionPadding>
          </div>
        </div>
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
            disabled={totalItems === 0}
            loading={loading}
          >
            {totalItems === 0 ? (
              'No products found'
            ) : (
              <>
                Show {totalItems} {pluralize('product', totalItems || 0)}
              </>
            )}
          </Button>
        </div>
      </DialogSectionPadding>
    </>
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
      <legend className="text-2xl font-semibold text-gray-800 font-heading">
        {title}
      </legend>
      <span>{subtitle}</span>
      <div className="mt-6">{children}</div>
    </div>
  )
}

export default FilterDialogInner
