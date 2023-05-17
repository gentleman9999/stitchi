import { Backpack, BaseBallCap, Check, Hoodie, Socks, TShirt } from 'icons'
import React from 'react'
import cx from 'classnames'
import useActiveFilters from '../useActiveFilters'
import useCatalogFilters from './useCatalogFilters'

const featured = [
  {
    categoryEntityId: 25,
    label: 'T-Shirts',
    icon: <TShirt width={25} height={25} />,
  },
  {
    categoryEntityId: 30,
    label: 'Sweatshirts',
    icon: <Hoodie width={26} height={26} />,
  },
  {
    categoryEntityId: 29,
    label: 'Hats',
    icon: <BaseBallCap width={24} height={24} />,
  },
  {
    categoryEntityId: 426,
    label: 'Bags',
    icon: <Backpack width={26} height={26} />,
  },
  {
    categoryEntityId: 33,
    label: 'Accessories',
    icon: <Socks width={26} height={26} />,
  },
]

const FeaturedFilters = () => {
  const { setFilters } = useCatalogFilters()
  const { categories } = useActiveFilters()

  const toggleCategory = (categoryId: number) => {
    if (categories?.includes(categoryId)) {
      const newFilters = categories.filter(id => id !== categoryId)
      setFilters({
        categories: newFilters.length ? newFilters : null,
      })
    } else {
      setFilters({ categories: [...(categories || []), categoryId] })
    }
  }

  return (
    <div className="gap-8 hidden sm:flex">
      {featured.map(filter => {
        const active = categories?.includes(filter.categoryEntityId)
        return (
          <button
            key={filter.categoryEntityId}
            onClick={() => toggleCategory(filter.categoryEntityId)}
            className={cx(
              'relative flex flex-col gap-2 text-xs font-medium text-gray-600 items-center justify-between p-2 rounded-md min-w-[60px] border border-transparent',
              { '!border-gray-300': active },
            )}
          >
            {active ? (
              <div className="absolute top-1 right-1">
                <Check width={10} height={10} />
              </div>
            ) : null}
            <div>{filter.icon}</div>
            <div className="whitespace-nowrap">{filter.label}</div>
          </button>
        )
      })}
    </div>
  )
}

export default FeaturedFilters
