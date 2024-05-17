import { notEmpty } from '@lib/utils/typescript'
import React from 'react'
import FilterGroup from './FilterGroup'
import FilterItem from './FilterItem'
import { SetValues, UseQueryStatesKeysMap } from 'nuqs'
import MoneyFilter from '../MoneyFilter'
import { QueryStates } from '../CatalogProductsListPage'
import routes from '@lib/routes'
import useSearchProductFilters from '../useSearchProductFilters'
import { SearchProductsFiltersInput } from '@generated/globalTypes'
import { HIDDEN_BIGCOMMERCE_PRODUCT_IDS } from '@lib/constants'

interface Props {
  rootCategoryEntityId: number
  filters: SearchProductsFiltersInput
  setFilters: SetValues<UseQueryStatesKeysMap<QueryStates>>
  defaultBrandEntityId: number | null
  isRootCategory: boolean
}

const CatalogFiltersSidebar = (props: Props) => {
  const { filters, categoryTree } = useSearchProductFilters({
    rootCategoryEntityId: props.rootCategoryEntityId,
    filters: props.filters,
  })

  const { setFilters } = props

  const parentCategory = categoryTree?.[0]
  const childCategories = parentCategory?.children || []

  return (
    <ul className="flex flex-col gap-10">
      {childCategories.length > 0 && (
        <FilterGroup
          key="categories"
          label={props.isRootCategory ? 'Categories' : parentCategory?.name}
        >
          {childCategories
            .filter(
              c =>
                !HIDDEN_BIGCOMMERCE_PRODUCT_IDS.includes(c.entityId.toString()),
            )
            .map(category => {
              return (
                <FilterItem
                  key={category.entityId}
                  label={category.name}
                  href={routes.internal.catalog.category.show.href({
                    categorySlug: category.path,
                  })}
                />
              )
            })}
        </FilterGroup>
      )}

      {filters?.map(filter => {
        switch (filter.__typename) {
          case 'BrandSearchFilter': {
            if (props.defaultBrandEntityId) {
              return
            }

            const brands =
              filter.brands.edges?.map(edge => edge?.node).filter(notEmpty) ||
              []
            return (
              <FilterGroup
                key="brands"
                label="Brands"
                showClear={brands.some(brand => brand.isSelected)}
                onClear={() => {
                  setFilters(prev => ({
                    ...prev,
                    brandEntityIds: [],
                  }))
                }}
              >
                {brands.map(brand => (
                  <FilterItem
                    key={brand.entityId}
                    productCount={brand.productCount}
                    onClick={() => {
                      setFilters(prev => {
                        const brandEntityIds = prev.brandEntityIds?.includes(
                          brand.entityId,
                        )
                          ? prev.brandEntityIds.filter(
                              id => id !== brand.entityId,
                            )
                          : [...(prev.brandEntityIds || []), brand.entityId]

                        return {
                          ...prev,
                          brandEntityIds: brandEntityIds.length
                            ? brandEntityIds
                            : null,
                        }
                      })
                    }}
                    active={brand.isSelected}
                    label={brand.name}
                  />
                ))}
              </FilterGroup>
            )
          }

          case 'PriceSearchFilter': {
            return (
              <FilterGroup
                key="price"
                label="Base Price"
                showClear={Boolean(
                  filter.selected?.minPrice || filter.selected?.maxPrice,
                )}
                onClear={() => {
                  setFilters(prev => ({
                    ...prev,
                    minPrice: null,
                    maxPrice: null,
                  }))
                }}
              >
                <li>
                  <MoneyFilter
                    value={{
                      min: filter.selected?.minPrice || null,
                      max: filter.selected?.maxPrice || null,
                    }}
                    onChange={value => {
                      setFilters(prev => ({
                        ...prev,
                        minPrice: value.min,
                        maxPrice: value.max,
                      }))
                    }}
                  />
                </li>
              </FilterGroup>
            )
          }
          case 'ProductAttributeSearchFilter': {
            const attributes =
              filter.attributes?.edges?.map(a => a?.node).filter(notEmpty) || []

            return (
              <FilterGroup
                key={filter.name}
                label={filter.filterName}
                showClear={Boolean(attributes.find(a => a.isSelected))}
                onClear={() => {
                  setFilters(prev => {
                    const productAttributes = prev.productAttributes?.filter(
                      a => a.attribute !== filter.name,
                    )

                    return {
                      ...prev,
                      productAttributes: productAttributes?.length
                        ? productAttributes
                        : null,
                    }
                  })
                }}
              >
                {attributes.map(attribute => (
                  <FilterItem
                    key={attribute.value}
                    onClick={() => {
                      setFilters(prev => {
                        const productAttributes = [
                          ...(prev.productAttributes || []),
                        ]

                        const existingAttribute = productAttributes?.find(
                          a => a.attribute === filter.name,
                        )

                        if (existingAttribute) {
                          const existingValues = existingAttribute.values
                          const newValue = attribute.value || ''
                          if (existingValues.includes(newValue)) {
                            existingAttribute.values = existingValues.filter(
                              value => value !== newValue,
                            )
                          } else {
                            existingAttribute.values.push(newValue)
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
                    productCount={attribute.productCount}
                    active={attribute.isSelected}
                  />
                ))}
              </FilterGroup>
            )
          }
        }
      })}
    </ul>
  )
}

export default CatalogFiltersSidebar
