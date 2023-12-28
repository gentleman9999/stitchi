import React from 'react'
import { useFilters } from '../filters-context'
import Link from 'next/link'
import routes from '@lib/routes'
import { CategoryTreeItem } from '@generated/types'
import cx from 'classnames'
import { ChevronLeftIcon } from '@heroicons/react/24/outline'
import Checkbox from '@components/ui/inputs/Checkbox'
import { useCategories } from '../categories-context'

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
    filters: { brands: activeBrands },
    availableFilters: { brands },
  } = useFilters()

  const activeCategoryTreeEntityIds = React.useMemo(() => {
    if (!activeCategoryId) return []

    return getActiveCategoryEntityIds(
      categories as CategoryTreeItem[],
      activeCategoryId,
    ).reverse()
  }, [activeCategoryId, categories])

  return (
    <ul className="flex flex-col gap-10">
      {!activeCollectionId ? (
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

      {!activeCategoryId ? (
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
        {!activeBrandId ? (
          <FilterGroup label="Brands">
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
      {children
        .slice(0, expanded ? children.length : Math.min(children.length, 5))
        .map((child, idx) => {
          const clonedChild = React.cloneElement(child as any, {
            className: cx({
              'sr-only': !expanded && idx > 4,
            }),
          })

          return clonedChild
        })}

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
      label: string
      onClick: () => void
      active?: boolean
      children?: React.ReactNode
    }
  | {
      label: string
      href: string
      active?: boolean
      children?: React.ReactNode
    }

const FilterItem = (props: FilterItemProps) => {
  const linkClassName = cx('flex items-center gap-2', {
    'font-bold': props.active,
  })

  return (
    <li className="flex flex-col gap-2">
      {'href' in props ? (
        <Link href={props.href} className={linkClassName}>
          {props.label}
        </Link>
      ) : (
        <button onClick={props.onClick} className={linkClassName}>
          <Checkbox
            name="checkbox"
            value="checkbox"
            onChange={() => {}}
            checked={props.active}
          />
          {props.label}
        </button>
      )}

      {props.children}
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
