import Image from 'next/legacy/image'
import React from 'react'
import { gql } from '@apollo/client'
import { CatalogProductLegacyProductFragment } from '@generated/CatalogProductLegacyProductFragment'
import routes from '@lib/routes'
import Link from 'next/link'
import useProductOptions from '@components/hooks/useProductOptions'
import SwatchGroup from '../Catalog/SwatchGroup'
import { makeProductTitle } from '@lib/utils/catalog'
import { generateImageSizes } from '@lib/utils/image'
import currency from 'currency.js'
import Tooltip from '@components/ui/Tooltip'
import { useLogger } from 'next-axiom'

export interface Props {
  product: CatalogProductLegacyProductFragment
  priority: boolean
}

const CatalogProduct = ({ product, priority }: Props) => {
  const logger = useLogger()
  const { colors } = useProductOptions({ product })

  if (!product.brand) {
    logger.warn('Product must have a brand', { product })
    return null
  }

  const href = routes.internal.catalog.product.href({
    brandSlug: product.brand?.path.replaceAll('/', ''),
    productSlug: product.path.replaceAll('/', ''),
  })

  return (
    <li className="flex flex-col w-full">
      <Link
        href={href}
        className="flex-1 flex flex-col cursor-pointer rounded-lg border border-gray-200 p-2 bg-paper hover:shadow-lg transition-all"
      >
        {product.defaultImage?.url && (
          <div className="relative w-full h-[160px]">
            <Image
              priority={priority}
              key={product.defaultImage.url}
              src={product.defaultImage.url}
              alt={product.defaultImage.altText || product.name}
              layout="fill"
              objectFit="contain"
              sizes={generateImageSizes([{ imageWidth: '230px' }])}
            />
          </div>
        )}
        <h3 className="mt-4 text-sm font-normal leading-tight">
          {makeProductTitle(product)}
        </h3>

        <div className="mt-4 flex justify-between items-end flex-wrap flex-1">
          <div className="flex-1 flex items-end">
            <SwatchGroup
              // Could add support for more colors in the future
              hexColors={colors.map(({ hexColors }) => hexColors[0])}
            />
          </div>
          <span className=" text-gray-600 flex gap-1 items-center">
            <span className="text-xs">from</span>
            <Tooltip
              label="Price includes 1 print location."
              delay={150}
              renderTrigger={() => (
                <span className="font-bold">
                  {currency(product.priceCents, { fromCents: true }).format()}
                </span>
              )}
            />
          </span>
        </div>
      </Link>
    </li>
  )
}

CatalogProduct.fragments = {
  product: gql`
    ${useProductOptions.fragments.product}
    fragment CatalogProductProductFragment on CatalogProduct {
      id
      name
      slug
      priceCents
    }
  `,
}

export default CatalogProduct
