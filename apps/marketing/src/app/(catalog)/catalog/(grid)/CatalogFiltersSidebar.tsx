import { gql } from '@apollo/client'
import {
  CatalogFiltersSidebarFiltersFragment,
  CategoryTreeItem,
} from '@generated/types'
import { ChevronLeftIcon } from '@heroicons/react/20/solid'
import { notEmpty } from '@lib/utils/typescript'
import Link from 'next/link'
import React from 'react'
import FilterGroup from '../old/(grid)/CatalogSidebar/FilterGroup'
import FilterItem from '../old/(grid)/CatalogSidebar/FilterItem'
import { SetValues, UseQueryStatesKeysMap } from 'nuqs'
import MoneyFilter from './MoneyFilter'
import { QueryStates } from './CatalogProductsListPage'
import routes from '@lib/routes'
import cx from 'classnames'

interface Props {
  filters: CatalogFiltersSidebarFiltersFragment | undefined
  setFilters: SetValues<UseQueryStatesKeysMap<QueryStates>>
  defaultBrandEntityId?: number
}

const CatalogFiltersSidebar = (props: Props) => {
  const { setFilters } = props
  const filters =
    props.filters?.edges?.map(edge => edge?.node).filter(notEmpty) || []

  console.log(
    'FILTERS',
    filters.filter(filter => filter.__typename === 'CategorySearchFilter'),
  )

  return (
    <ul className="flex flex-col gap-10">
      {filters.map(filter => {
        switch (filter.__typename) {
          case 'BrandSearchFilter': {
            if (props.defaultBrandEntityId) {
              return
            }

            const brands =
              filter.brands.edges?.map(edge => edge?.node).filter(notEmpty) ||
              []
            return (
              <Section label="Brands">
                <FilterGroup
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
              </Section>
            )
          }
          case 'CategorySearchFilter': {
            const categories = filter.categories.edges
              ?.map(edge => edge?.node)
              .filter(notEmpty)
            return (
              <FilterGroup
                label="Collections"
                showClear={Boolean(
                  categories?.some(category => category.isSelected),
                )}
              >
                {categories?.map(category => {
                  return (
                    <CategoryTree
                      key={category.entityId}
                      category={category as any}
                    />
                  )
                })}
              </FilterGroup>
            )
          }
          case 'PriceSearchFilter': {
            return (
              <FilterGroup
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

const Section = ({
  label,
  children,
  href,
}: {
  label: string
  children: React.ReactNode
  href?: string
}) => {
  const Label = href ? (
    <Link
      href={href}
      className="text-lg font-semibold mb-2 flex items-center gap-2"
    >
      <ChevronLeftIcon className="w-5 h-5" /> {label}
    </Link>
  ) : (
    <h2 className="text-xl font-semibold mb-2">{label}</h2>
  )

  return (
    <li>
      {Label}
      {children}
    </li>
  )
}

const CategoryTree = ({
  category,
  expanded,
  activeCategoryTreeEntityIds = [],
}: {
  category: CategoryTreeItem
  expanded?: boolean
  activeCategoryTreeEntityIds?: number[]
}) => {
  return (
    <>
      <FilterItem
        href={routes.internal.catalog.category.show.href({
          categorySlug: category.path,
        })}
        active={activeCategoryTreeEntityIds[0] === category.entityId}
        label={category.name}
      >
        {category.children?.length ? (
          <FilterGroup
            className={cx('ml-4', {
              'sr-only': !expanded,
            })}
          >
            {category.children.map(category => (
              <CategoryTree
                key={category.entityId}
                category={category}
                expanded={activeCategoryTreeEntityIds.includes(
                  category.entityId,
                )}
                activeCategoryTreeEntityIds={activeCategoryTreeEntityIds}
              />
            ))}
          </FilterGroup>
        ) : null}
      </FilterItem>
    </>
  )
}

CatalogFiltersSidebar.fragments = {
  filters: gql`
    fragment CatalogFiltersSidebarFiltersFragment on SearchProductFilterConnection {
      edges {
        node {
          name
          isCollapsedByDefault

          ... on BrandSearchFilter {
            displayProductCount
            brands {
              edges {
                node {
                  entityId
                  name
                  isSelected
                  productCount
                }
              }
            }
          }

          ... on CategorySearchFilter {
            displayProductCount
            categories {
              edges {
                node {
                  entityId
                  name
                  isSelected
                  productCount

                  subCategories {
                    edges {
                      node {
                        entityId
                        name
                        isSelected
                        productCount

                        subCategories {
                          edges {
                            node {
                              entityId
                              name
                              isSelected
                              productCount
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }

          ... on PriceSearchFilter {
            selected {
              minPrice
              maxPrice
            }
          }

          ... on ProductAttributeSearchFilter {
            filterName
            attributes {
              edges {
                node {
                  value
                  isSelected
                  productCount
                }
              }
            }
          }
        }
      }
    }
  `,
}

export default CatalogFiltersSidebar
