import { SearchProductsFiltersInput } from '@generated/types'
import useSearchProductFilters from './(grid)/useSearchProductFilters'
import { Search } from 'icons'
import Link from 'next/link'
import routes from '@lib/routes'
import cx from 'classnames'
import { usePathname } from 'next/navigation'

const buttonClasses =
  'flex py-1.5 px-3 rounded-full border border-gray-900 whitespace-nowrap'

const buttonActiveClasses = 'bg-gray-900 text-white'

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

  const pathname = usePathname()!

  const activeCategoryName =
    !activeCategory || activeCategory.name === 'ROOT'
      ? 'products'
      : activeCategory?.name

  return (
    <div className="overflow-x-scroll flex lg:!hidden no-scrollbar mt-4">
      <ul className="flex gap-2">
        {/* <li>
          <button
            // onClick={() => setShowSearch(true)}
            className="h-full flex py-1 px-3 rounded-full border border-gray-900 whitespace-nowrap items-center justify-center"
          >
            <Search className="w-4 h-4 stroke-2" />
          </button>
        </li> */}
        {!activeCategory ? (
          <li>
            <Link
              href={routes.internal.catalog.href()}
              className={cx(buttonClasses, {
                [`${buttonActiveClasses}`]:
                  pathname === routes.internal.catalog.href(),
              })}
            >
              Discover
            </Link>
          </li>
        ) : null}
        <li>
          <Link
            href={
              activeCategory?.path
                ? routes.internal.catalog.category.show.href({
                    categorySlug: activeCategory.path,
                  })
                : routes.internal.catalog.all.href()
            }
            className={cx(buttonClasses, {
              [`${buttonActiveClasses}`]:
                pathname.startsWith(routes.internal.catalog.all.href()) ||
                (activeCategory &&
                  !categoryTree[0].children
                    .map(c => c.entityId)
                    .includes(activeCategory.entityId)),
            })}
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
                className={cx(buttonClasses, {
                  [`${buttonActiveClasses}`]:
                    activeCategory?.entityId === category.entityId,
                })}
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
