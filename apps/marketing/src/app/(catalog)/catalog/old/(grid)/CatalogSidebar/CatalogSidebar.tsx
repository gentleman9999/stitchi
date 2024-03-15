import React from 'react'
import { useFilters } from '../filters-context'
import Link from 'next/link'
import routes from '@lib/routes'
import { CategoryTreeItem, PriceSearchFilter } from '@generated/types'
import cx from 'classnames'
import { ChevronLeftIcon } from '@heroicons/react/24/outline'
import { useCategories } from '../categories-context'
import { notEmpty } from '@lib/utils/typescript'
import FilterItem from './FilterItem'
import FilterGroup from './FilterGroup'
import DynamicFilter from './DynamicFilter'
import { TextField } from '@components/ui/inputs'

function getActiveCategoryEntityIds(
  categories: CategoryTreeItem[],
  activeCategoryEntityID: number,
  currentPath: number[] = [],
): number[] {
  // Iterate through each category in the array
  for (const category of categories) {
    // Check if the current category is the active one
    if (category.entityId === activeCategoryEntityID) {
      // Return the current path including this category's entityId
      return [...currentPath, category.entityId]
    }

    // Recursively check each child
    const childPath = [...currentPath, category.entityId]
    for (const child of category.children || []) {
      const resultPath = getActiveCategoryEntityIds(
        [child],
        activeCategoryEntityID,
        childPath,
      )
      // If a valid path is found in a child, return it
      if (resultPath.length > 0) {
        return resultPath
      }
    }
  }

  // If the category is not found in this branch, return an empty array
  return []
}
interface Props {
  activeCategoryId: number | undefined
  activeCollectionId: number | undefined
  activeBrandId: number | undefined
}

const CatalogSidebar = ({
  activeCategoryId,
  activeCollectionId,
  activeBrandId,
}: Props) => {
  const { categories, collections } = useCategories()

  const {
    toggleFilter,
    setFilters,
    filters: { brands: activeBrands },
    availableFilters: { brands },
    availableDynamicFilters,
  } = useFilters()

  const activeCategoryTreeEntityIds = React.useMemo(() => {
    if (!activeCategoryId) return []

    return getActiveCategoryEntityIds(
      categories as CategoryTreeItem[],
      activeCategoryId,
    ).reverse()
  }, [activeCategoryId, categories])

  const priceFilter = availableDynamicFilters.find(
    (filter): filter is PriceSearchFilter =>
      filter.__typename === 'PriceSearchFilter',
  )

  return (
    <ul className="flex flex-col gap-10">
      {!activeCollectionId && categories.length ? (
        <Section
          label={activeCategoryId ? 'All products' : 'Categories'}
          href={activeCategoryId ? routes.internal.catalog.href() : undefined}
        >
          <FilterGroup>
            {categories.map(category => (
              <CategoryTree
                key={category.entityId}
                category={category as any}
                expanded={activeCategoryTreeEntityIds.includes(
                  category.entityId,
                )}
                activeCategoryTreeEntityIds={activeCategoryTreeEntityIds}
              />
            ))}
          </FilterGroup>
        </Section>
      ) : null}

      {!activeCategoryId && collections.length ? (
        <Section
          label={activeCollectionId ? 'All products' : 'Collections'}
          href={activeCollectionId ? routes.internal.catalog.href() : undefined}
        >
          <FilterGroup>
            {collections.map(collection => (
              <FilterItem
                key={collection.entityId}
                href={routes.internal.catalog.category.show.href({
                  categorySlug: collection.path,
                })}
                active={activeCollectionId === collection.entityId}
                label={collection.name}
              />
            ))}
          </FilterGroup>
        </Section>
      ) : null}

      <Section label="Filters">
        <div className="flex flex-col gap-8">
          <FilterGroup
            label="Base Price"
            showClear={Boolean(
              priceFilter?.selected?.minPrice ||
                priceFilter?.selected?.maxPrice,
            )}
            onClear={() => {}}
          >
            <div className="grid grid-cols-2 gap-4">
              <TextField
                label="Min"
                value={priceFilter?.selected?.minPrice || undefined}
              />
              <TextField
                label="Max"
                value={priceFilter?.selected?.maxPrice || undefined}
              />
            </div>
          </FilterGroup>

          {!activeBrandId ? (
            <FilterGroup
              label="Brands"
              showClear={Boolean(activeBrands?.length)}
              onClear={() => {
                setFilters(prev => ({
                  ...prev,
                  brands: null,
                }))
              }}
            >
              {brands.map(brand => (
                <FilterItem
                  key={brand.id}
                  onClick={() => toggleFilter('brands', brand.id)}
                  active={activeBrands?.includes(brand)}
                  label={brand.name}
                />
              ))}
            </FilterGroup>
          ) : null}

          {availableDynamicFilters.map(filter => {
            if (filter.__typename !== 'ProductAttributeSearchFilter') {
              return null
            }

            const attributes =
              filter.attributes?.edges?.map(a => a?.node).filter(notEmpty) || []

            return (
              <FilterGroup
                key={filter.name}
                label={filter.filterName}
                showClear={Boolean(attributes.find(a => a.isSelected))}
                onClear={() => {}}
              >
                {attributes.map(attribute => (
                  <FilterItem
                    key={attribute.value}
                    onClick={() => {}}
                    label={attribute.value || ''}
                    active={attribute.isSelected}
                  />
                ))}
              </FilterGroup>
            )
          })}
        </div>
      </Section>
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

export default CatalogSidebar
