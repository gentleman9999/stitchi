import Image from 'next/legacy/image'
import React from 'react'
import { gql } from '@apollo/client'
import { CatalogProductProductFragment } from '@generated/CatalogProductProductFragment'
import routes from '@lib/routes'
import Link from 'next/link'
import useProductColors from '@hooks/useProductColors'
import SwatchGroup from './SwatchGroup'
import { makeProductTitle } from '@utils/catalog'
import { generateImageSizes } from '@utils/image'

export interface Props {
  product: CatalogProductProductFragment
}

const CatalogProduct = ({ product }: Props) => {
  const { colors } = useProductColors({ product })

  if (!product.brand) {
    console.warn('Product must have a brand')
    return null
  }

  const href = routes.internal.catalog.product.href({
    brandSlug: product.brand?.path,
    productSlug: product.path,
  })

  return (
    <li className="flex flex-col">
      <Link
        href={href}
        className="flex-1 flex flex-col cursor-pointer rounded-2xl border border-gray-100 p-4 shadow hover:shadow-md transition-all"
      >
        {product.defaultImage?.url && (
          <div className="relative w-full h-[200px]">
            <Image
              src={product.defaultImage.url}
              alt={product.defaultImage.altText || product.name}
              layout="fill"
              objectFit="contain"
              sizes={generateImageSizes([{ imageWidth: '230px' }])}
            />
          </div>
        )}
        <h3 className="mt-4 text-md font-medium font-heading leading-none">
          {makeProductTitle(product)}
        </h3>
        <div className="flex-1 mt-4 flex items-end">
          <SwatchGroup
            // Could add support for more colors in the future
            hexColors={colors.map(({ hexColors }) => hexColors[0])}
          />
        </div>
      </Link>
    </li>
  )
}

CatalogProduct.fragments = {
  product: gql`
    ${useProductColors.fragments.product}
    fragment CatalogProductProductFragment on Product {
      ...UseProductColorsProductFragment
      id
      name
      path
      brand {
        id
        name
        path
      }
      defaultImage {
        urlOriginal
        altText
        url(width: 150)
      }
    }
  `,
}

export default CatalogProduct
