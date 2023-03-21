'use client'

import { notEmpty } from '@/utils/typescript'
import { FragmentType, getFragmentData, gql } from '@/__generated__'
import { Adjustments, XIcon } from 'icons'
import React from 'react'
import FilterButton from './FilterButton'
import FilterDialog from './FilterDialog'

interface Filter {
  id: string
  label: string
  slug: string
  active: boolean
}

interface Category {
  id: string
  slug?: string | null
  title?: string | null
  children?: (Category | null)[] | null
}

const categoryReducer = (acc: Map<string, Filter>, category?: Category) => {
  if (category?.children) {
    category.children.filter(notEmpty).reduce(categoryReducer, acc)
  }

  const { id, slug, title } = category || {}

  if (slug && title && id) {
    acc.set(id, { id, label: title, slug, active: false })
  }

  return acc
}

const createFilterMap = (
  queryFragment?: FragmentType<typeof DirectoryFiltersFragment> | null,
) => {
  const query = getFragmentData(DirectoryFiltersFragment, queryFragment)

  const { topLevelCategories } = query || {}

  return (
    topLevelCategories?.reduce(categoryReducer, new Map<string, Filter>()) ||
    new Map()
  )
}

interface Props {
  query?: FragmentType<typeof DirectoryFiltersFragment> | null
}

export default function Filter(props: Props) {
  const [filters, setFilters] = React.useState(() =>
    createFilterMap(props.query),
  )

  React.useEffect(() => {
    setFilters(createFilterMap(props.query))
  }, [props.query])

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

  const query = getFragmentData(DirectoryFiltersFragment, props.query)
  const { featuredCategories, topLevelCategories } = query || {}

  const activeFilters = Array.from(filters.values()).filter(f => f.active)
  const activeFilterIds = new Set(activeFilters.map(f => f.id))

  return (
    <>
      <FilterDialog
        open={showFilters}
        onOpenChange={setShowFilters}
        categories={topLevelCategories}
      />

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

        {featuredCategories?.length ? (
          <ul className="flex gap-4 flex-shrink overflow-x-scroll">
            {featuredCategories
              .filter(cat => activeFilterIds.has(cat.id) === false)
              .map(feature => {
                return (
                  <li key={feature.id}>
                    <FilterButton onClick={() => toggleFilter(feature.id)}>
                      {feature.title}
                    </FilterButton>
                  </li>
                )
              })}
          </ul>
        ) : null}

        <div className="flex-shrink-0">
          <FilterButton onClick={() => setShowFilters(true)} className="w-full">
            <Adjustments height={20} /> Filters
          </FilterButton>
        </div>
      </div>
    </>
  )
}

export const DirectoryFiltersFragment = gql(/* GraphQL */ `
  fragment DirectoryFilters on Query {
    featuredCategories: allGlossaryCategories(
      first: 5
      filter: { parent: { eq: 147376160 } }
    ) {
      id
      slug
      title
    }

    topLevelCategories: allGlossaryCategories(
      filter: { parent: { exists: false } }
    ) {
      id
      slug
      title
      children {
        id
        slug
        title
      }
      ...FilterDialogDirectoryGategoriesFragment
    }
  }
`)
