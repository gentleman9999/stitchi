import { SearchProductsFiltersInput } from '@generated/types'
import useSearchProductFilters from '../useSearchProductFilters'
import { Search } from 'icons'
import Link from 'next/link'
import routes from '@lib/routes'
import cx from 'classnames'

export interface Props {
  filters: SearchProductsFiltersInput
  activeCategory: {
    entityId: number
    path: string
    name: string
  } | null
}

const CategorySelect = ({ filters, activeCategory }: Props) => {
  const { categoryTree } = useSearchProductFilters({
    filters,
    rootCategoryEntityId: activeCategory?.entityId || 0,
  })

  const activeCategoryName =
    activeCategory?.name === 'ROOT' ? 'All' : activeCategory?.name

  return (
    <div className="overflow-x-scroll flex lg:!hidden no-scrollbar mt-4">
      <ul className="flex gap-2">
        <li>
          <button
            // onClick={() => setShowSearch(true)}
            className="h-full flex py-1 px-3 rounded-full border border-gray-900 whitespace-nowrap items-center justify-center"
          >
            <Search className="w-4 h-4 stroke-2" />
          </button>
        </li>
        <li>
          <Link
            href={
              activeCategory?.path
                ? routes.internal.catalog.category.show.href({
                    categorySlug: activeCategory.path,
                  })
                : routes.internal.catalog.href()
            }
            className={cx(
              'flex py-1 px-3 rounded-full border border-gray-900 whitespace-nowrap',
              {
                'bg-gray-900 text-white':
                  !activeCategory?.entityId ||
                  !categoryTree[0].children
                    .map(c => c.entityId)
                    .includes(activeCategory.entityId),
              },
            )}
          >
            All {activeCategoryName}
          </Link>
        </li>

        {categoryTree[0].children
          .filter(category => category.productCount)
          .map(category => (
            <li key={category.entityId}>
              <Link
                href={routes.internal.catalog.category.show.href({
                  categorySlug: category.path,
                })}
                className={cx(
                  'flex py-1 px-3 rounded-full border border-gray-900 whitespace-nowrap',
                  {
                    'bg-gray-900 text-white':
                      activeCategory?.entityId === category.entityId,
                  },
                )}
              >
                {category.name}
              </Link>
            </li>
          ))}
      </ul>
    </div>
  )
}

export default CategorySelect
