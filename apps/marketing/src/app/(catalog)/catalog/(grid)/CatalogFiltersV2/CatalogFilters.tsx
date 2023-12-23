import React from 'react'
import { useFilters } from '../filters-context'
import Link from 'next/link'
import routes from '@lib/routes'
import { CategoryTreeItem } from '@generated/types'
import cx from 'classnames'
import { ChevronLeftIcon } from '@heroicons/react/24/outline'
import Checkbox from '@components/ui/inputs/Checkbox'

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
interface Props {}

const CatalogFilters = ({}: Props) => {
  const {
    toggleFilter,
    filters: {
      category: activeCategory,
      brands: activeBrands,
      collection: activeCollection,
    },
    availableFilters: { categories, collections, brands },
  } = useFilters()

  const activeCategoryTreeEntityIds = React.useMemo(() => {
    if (!activeCategory) return []

    return getActiveCategoryEntityIds(
      categories as any,
      activeCategory.entityId,
    ).reverse()
  }, [activeCategory, categories])

  return (
    <aside className="w-80 px-6">
      <ul className="flex flex-col gap-10">
        {!activeCollection ? (
          <Section
            label={activeCategory ? 'All products' : 'Categories'}
            href={activeCategory ? routes.internal.catalog.href() : undefined}
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

        {!activeCategory ? (
          <Section
            label={activeCollection ? 'All products' : 'Collections'}
            href={activeCollection ? routes.internal.catalog.href() : undefined}
          >
            <FilterGroup>
              {collections.map(collection => (
                <FilterItem
                  key={collection.entityId}
                  href={routes.internal.catalog.category.show.href({
                    categorySlug: collection.path,
                  })}
                  active={activeCollection?.entityId === collection.entityId}
                >
                  {collection.name}
                </FilterItem>
              ))}
            </FilterGroup>
          </Section>
        ) : null}

        <Section label="Filters">
          <FilterGroup label="Brands">
            {brands.map(brand => (
              <FilterItem
                key={brand.id}
                onClick={() => toggleFilter('brands', brand.id)}
                active={activeBrands?.includes(brand)}
              >
                {brand.name}
              </FilterItem>
            ))}
          </FilterGroup>
        </Section>
      </ul>
    </aside>
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

const FilterGroup = ({
  children,
  className,
  label,
}: {
  children: React.ReactNode[]
  className?: string
  label?: string
}) => {
  const [expanded, setExpanded] = React.useState(false)

  return (
    <ul className={cx('flex flex-col gap-2 items-start', className)}>
      {label ? <h3 className="text-base font-semibold mb-2">{label}</h3> : null}
      {children.map((child, idx) => (
        <li
          key={idx}
          className={cx({
            'sr-only': !expanded && idx > 4,
          })}
        >
          {child}
        </li>
      ))}
      {children.length > 5 ? (
        <button
          className="text-gray-600 underline"
          onClick={() => setExpanded(prev => !prev)}
        >
          {expanded ? 'Show less' : 'Show more'}
        </button>
      ) : null}
    </ul>
  )
}

type FilterItemProps =
  | {
      children: React.ReactNode
      onClick: () => void
      active?: boolean
    }
  | {
      children: React.ReactNode
      href: string
      active?: boolean
    }

const FilterItem = (props: FilterItemProps) => {
  const className = cx('flex items-center gap-2', {
    'font-bold': props.active,
  })

  return (
    <li>
      {'href' in props ? (
        <Link href={props.href} className={className}>
          {props.children}
        </Link>
      ) : (
        <button onClick={props.onClick} className={className}>
          <Checkbox
            name="checkbox"
            value="checkbox"
            onChange={() => {}}
            checked={props.active}
          />
          {props.children}
        </button>
      )}
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
    <li className="flex flex-col gap-2">
      <FilterItem
        href={routes.internal.catalog.category.show.href({
          categorySlug: category.path,
        })}
        active={activeCategoryTreeEntityIds[0] === category.entityId}
      >
        {category.name}
      </FilterItem>

      {category.children ? (
        <FilterGroup
          className={cx('ml-4', {
            'sr-only': !expanded,
          })}
        >
          {category.children.map(category => (
            <CategoryTree
              key={category.entityId}
              category={category}
              expanded={activeCategoryTreeEntityIds.includes(category.entityId)}
              activeCategoryTreeEntityIds={activeCategoryTreeEntityIds}
            />
          ))}
        </FilterGroup>
      ) : null}
    </li>
  )
}

export default CatalogFilters
