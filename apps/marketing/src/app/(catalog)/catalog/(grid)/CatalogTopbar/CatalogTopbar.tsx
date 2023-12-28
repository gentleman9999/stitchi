import React from 'react'
import SortButton from './SortButton'
import Button from '@components/ui/ButtonV2/Button'
import { useCategories } from '../categories-context'
import { CategoryTreeItem } from '@generated/types'
import cx from 'classnames'
import Link from 'next/link'
import routes from '@lib/routes'
import ClosetPageContainer from '@components/common/ClosetPageContainer'

const getActiveCategoryAndParent = (
  categories: CategoryTreeItem[],
  activeCategoryId: number,
  parent: CategoryTreeItem | undefined = undefined,
): [CategoryTreeItem | undefined, CategoryTreeItem | undefined] => {
  for (const category of categories) {
    if (category.entityId === activeCategoryId) {
      return [category, parent]
    }

    const children = category.children || []
    const [foundCategory, foundParent] = getActiveCategoryAndParent(
      children,
      activeCategoryId,
      category,
    )
    if (foundCategory) {
      return [foundCategory, foundParent]
    }
  }

  return [undefined, undefined]
}
interface Props {
  onOpenFilters: () => void
  activeCategoryId: number | undefined
}

const CatalogTopbar = ({ activeCategoryId, onOpenFilters }: Props) => {
  const { categories } = useCategories()

  const [activeCategory, activeParent] = React.useMemo(() => {
    if (!activeCategoryId) return [undefined, undefined]

    return getActiveCategoryAndParent(categories as any, activeCategoryId)
  }, [activeCategoryId, categories])

  const categoriesToDisplay = React.useMemo(() => {
    if (activeCategory && activeCategory.children?.length > 0) {
      return activeCategory.children
    }

    if (activeParent && activeParent.children?.length > 0) {
      return activeParent.children
    }

    return categories
  }, [activeCategory, activeParent, categories])

  return (
    <>
      {categoriesToDisplay.length ? (
        <div className="px-6 overflow-x-scroll flex lg:!hidden no-scrollbar mt-4">
          <ul className="flex gap-2">
            <li>
              <Link
                href={
                  activeParent
                    ? routes.internal.catalog.category.show.href({
                        categorySlug: activeParent.path,
                      })
                    : routes.internal.catalog.href()
                }
                className={cx(
                  'flex py-1 px-3 rounded-full border border-gray-900 whitespace-nowrap',
                  {
                    'bg-gray-900 text-white':
                      !activeCategoryId ||
                      !categoriesToDisplay
                        .map(c => c.entityId)
                        .includes(activeCategoryId),
                  },
                )}
              >
                All
              </Link>
            </li>

            {categoriesToDisplay.map(category => (
              <li key={category.entityId}>
                <Link
                  href={routes.internal.catalog.category.show.href({
                    categorySlug: category.path,
                  })}
                  className={cx(
                    'flex py-1 px-3 rounded-full border border-gray-900 whitespace-nowrap',
                    {
                      'bg-gray-900 text-white':
                        activeCategoryId === category.entityId,
                    },
                  )}
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <ClosetPageContainer className="max-w-none flex flex-col gap-4 mt-4">
        <div className="flex gap-2 justify-between items-stretch">
          <div className="flex-1 lg:flex-initial">
            <Button
              className="lg:!hidden w-full h-full"
              variant="ghost"
              onClick={onOpenFilters}
              size="lg"
            >
              Filters
            </Button>
          </div>
          <div className="flex-1 lg:flex-initial">
            <SortButton />
          </div>
        </div>
      </ClosetPageContainer>
    </>
  )
}

export default CatalogTopbar
