import { Adjustments, XIcon } from 'icons'
import React from 'react'
import { categories } from '../../mock'
import FilterButton from './FilterButton'
import FilterDialog from './FilterDialog'

const filterMap = new Map(
  categories.map(category => [
    category.slug,
    {
      id: category.slug,
      label: category.label,
      slug: category.slug,
      active:
        [categories[0], categories[3]].findIndex(
          c => c.slug === category.slug,
        ) >= 0,
    },
  ]),
)

interface Props {}

export default function Filter(props: Props) {
  const [filters, setFilters] = React.useState(filterMap)

  const [showFilters, setShowFilters] = React.useState(false)

  const toggleFilter = (filterId: string) => {
    const currentFilter = filters.get(filterId)

    if (currentFilter) {
      const newFilters = new Map(Array.from(filters))
      newFilters.set(filterId, {
        ...currentFilter,
        active: !currentFilter.active,
      })

      setFilters(newFilters)
    }
  }

  const recommendedFilters = Array.from(filters.values()).slice(0, 5)
  const activeFilters = Array.from(filters.values()).filter(f => f.active)

  return (
    <>
      <FilterDialog open={showFilters} onOpenChange={setShowFilters} />

      <div className="flex gap-4 overflow-hidden w-full">
        {activeFilters.length > 0 ? (
          <ul className="flex gap-4 shrink-0">
            {activeFilters.map(filter => (
              <FilterButton
                key={filter.slug}
                className="border-gray-900"
                component="div"
              >
                {filter.label}{' '}
                <button onClick={() => toggleFilter(filter.id)}>
                  <XIcon width={20} />
                </button>
              </FilterButton>
            ))}
          </ul>
        ) : null}

        {activeFilters.length > 0 ? (
          <div>
            <div className="border-r h-full" />
          </div>
        ) : null}

        <ul className="flex gap-4 flex-shrink overflow-x-scroll">
          {recommendedFilters.map(filter => {
            return (
              <li key={filter.slug}>
                <FilterButton onClick={() => toggleFilter(filter.id)}>
                  {filter.label}
                </FilterButton>
              </li>
            )
          })}
        </ul>
        <div className="flex-shrink-0">
          <FilterButton onClick={() => setShowFilters(true)} className="w-full">
            <Adjustments height={20} /> Filters
          </FilterButton>
        </div>
      </div>
    </>
  )
}
