'use client'

import { initializeApollo } from '@/lib/apollo'
import { notEmpty } from '@/utils/typescript'
import { FragmentType, getFragmentData, gql } from '@/__generated__'
import {
  DirectoryFiltersDataQuery,
  DirectoryFiltersDataQueryVariables,
} from '@/__generated__/graphql'
import { useQuery } from '@apollo/client'
import { Adjustments, XIcon } from 'icons'
import React from 'react'
import { useDirectory } from '../directory-context'
import FilterButton from './FilterButton'
import FilterDialog from './FilterDialog'

const client = initializeApollo()

type Category = Omit<
  DirectoryFiltersDataQuery['topLevelCategories'][number],
  'children'
>

const categoryReducer = (
  acc: Category[],
  category: DirectoryFiltersDataQuery['topLevelCategories'][number],
) => {
  const { children, ...rest } = category

  acc.push(rest)

  if (children?.length) {
    children.filter(notEmpty).reduce(categoryReducer, acc)
  }

  return acc
}

interface Props {}

export default function Filter(props: Props) {
  const { selectedCategoryIds, toggleCategory } = useDirectory()

  const { data } = useQuery<
    DirectoryFiltersDataQuery,
    DirectoryFiltersDataQueryVariables
  >(GetDirectoryFiltersData, { client })

  const [showFilters, setShowFilters] = React.useState(false)

  const { featuredCategories, topLevelCategories } = data || {}

  const flattenedCategories =
    topLevelCategories?.reduce(categoryReducer, []) || []

  const activeCategories = flattenedCategories?.filter(c =>
    selectedCategoryIds.has(c.id),
  )

  return (
    <>
      <FilterDialog
        open={showFilters}
        onOpenChange={setShowFilters}
        categories={topLevelCategories}
      />

      <div className="flex gap-4 overflow-hidden w-full">
        {activeCategories?.length ? (
          <ul className="flex gap-4 shrink-0">
            {activeCategories.map(category => (
              <FilterButton
                key={category.slug}
                className="border-gray-900"
                component="div"
              >
                {category.title}{' '}
                <button onClick={() => toggleCategory(category.id)}>
                  <XIcon width={20} />
                </button>
              </FilterButton>
            ))}
          </ul>
        ) : null}

        {activeCategories?.length ? (
          <div>
            <div className="border-r h-full" />
          </div>
        ) : null}

        {featuredCategories?.length ? (
          <ul className="flex gap-4 flex-shrink overflow-x-scroll">
            {featuredCategories
              .filter(
                category => selectedCategoryIds.has(category.id) === false,
              )
              .map(category => {
                return (
                  <li key={category.id}>
                    <FilterButton onClick={() => toggleCategory(category.id)}>
                      {category.title}
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

const GetDirectoryFiltersData = gql(/* GraphQL */ `
  query DirectoryFiltersData {
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
