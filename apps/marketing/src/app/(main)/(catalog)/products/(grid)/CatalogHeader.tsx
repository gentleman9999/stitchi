import {
  CatalogHeaderBrandFragment,
  CatalogHeaderCategoryFragment,
} from '@generated/types'
import React from 'react'

type Props =
  | {
      brand: CatalogHeaderBrandFragment
      category?: never
    }
  | {
      category: CatalogHeaderCategoryFragment
      brand?: never
    }
  | {
      brand?: never
      category?: never
    }

const CatalogHeader = ({ brand, category }: Props) => {
  if (!brand && !category) return null

  let title
  let description

  if (category) {
    title = category.name
    description = category.description
  } else {
    title = `Browse customizable ${brand.name} products`
  }

  return (
    <>
      {title ? (
        <div className="bg-gray-100 p-6 rounded-sm">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-heading">
            {title}
          </h1>

          {description ? (
            <div
              className="mt-2 text-sm sm:text-base text-gray-600 max-w-4xl"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          ) : null}
        </div>
      ) : (
        <h1 className="sr-only">Catalog</h1>
      )}
    </>
  )
}

export default CatalogHeader
