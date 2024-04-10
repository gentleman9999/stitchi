'use client'

import { gql, useSuspenseQuery } from '@apollo/client'
import {
  CatalogDiscoverPageFeaturedCategoryGetCategoryDataQuery,
  CatalogDiscoverPageFeaturedCategoryGetCategoryDataQueryVariables,
} from '@generated/types'
import routes from '@lib/routes'
import Link from 'next/link'
import React from 'react'

interface Props {
  categoryName: string | null
  categoryImageUrl: string | null | undefined
  categoryEntityId: number
}

const FeaturedCategory = ({
  categoryName,
  categoryImageUrl,
  categoryEntityId,
}: Props) => {
  const { data } = useSuspenseQuery<
    CatalogDiscoverPageFeaturedCategoryGetCategoryDataQuery,
    CatalogDiscoverPageFeaturedCategoryGetCategoryDataQueryVariables
  >(GET_CATEGORY_DATA, {
    variables: {
      categoryEntityId,
    },
  })

  const category = data.site.category

  if (!category || !categoryImageUrl) return null

  return (
    <div className="flex flex-col gap-4">
      <Link
        href={routes.internal.catalog.category.show.href({
          categorySlug: category.path,
        })}
      >
        <img
          src={categoryImageUrl}
          alt={category.name}
          className="aspect-[3/2] object-cover"
        />
      </Link>

      <Link
        className="text-xl font-medium text-gray-900 hover:text-gray-800"
        href={routes.internal.catalog.category.show.href({
          categorySlug: category.path,
        })}
      >
        {categoryName || category.name}
      </Link>
    </div>
  )
}

const GET_CATEGORY_DATA = gql`
  query CatalogDiscoverPageFeaturedCategoryGetCategoryDataQuery(
    $categoryEntityId: Int!
  ) {
    site {
      category(entityId: $categoryEntityId) {
        id
        path
        name
      }
    }
  }
`

export default FeaturedCategory
