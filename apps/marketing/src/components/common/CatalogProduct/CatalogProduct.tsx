import Image from 'next/legacy/image'
import React from 'react'
import { gql } from '@apollo/client'
import { CatalogProductLegacyProductFragment } from '@generated/CatalogProductLegacyProductFragment'
import routes from '@lib/routes'
import Link from 'next/link'
import useProductOptions from '@components/hooks/useProductOptions/useProductOptions'
import SwatchGroup from '../SwatchGroup'
import { makeProductTitle } from '@lib/utils/catalog'
import { generateImageSizes } from '@lib/utils/image'
import currency from 'currency.js'
import Tooltip from '@components/ui/Tooltip'
import { useLogger } from 'next-axiom'
import { fragments as UseProductOptionsFragments } from '@components/hooks/useProductOptions/useProductOptions.fragments'

export interface Props {
  product: CatalogProductLegacyProductFragment
  priority: boolean
}

const CatalogProduct = ({ product, priority }: Props) => {
  const logger = useLogger()
  const { colors } = useProductOptions({ productId: product.id })

  if (!product.brand) {
    logger.warn('Product must have a brand', { product })
    return null
  }

  const href = routes.internal.catalog.product.href({
    productSlug: product.path.replaceAll('/', ''),
  })

  return (
    <li className="flex flex-col w-full">
      <Link
        href={href}
        className="flex-1 flex flex-col cursor-pointer rounded-sm border  bg-paper hover:shadow-lg transition-all"
      >
        {product.defaultImage?.url && (
          <div className="relative w-full h-[320px]">
            <Image
              priority={priority}
              key={product.defaultImage.url}
              src={product.defaultImage.url}
              alt={product.defaultImage.altText || product.name}
              layout="fill"
              style={{ objectFit: 'contain' }}
              sizes={generateImageSizes([{ imageWidth: '240px' }])}
            />
          </div>
        )}
        <div className="p-2">
          <h3 className="text-sm font-normal leading-tight">
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
                  <button>
                    <span className="font-bold">
                      {currency(product.priceCents, {
                        fromCents: true,
                      }).format()}
                    </span>
                  </button>
                )}
              />
            </span>
          </div>
        </div>
      </Link>
    </li>
  )
}

CatalogProduct.fragments = {
  product: gql`
    ${UseProductOptionsFragments.product}
    fragment CatalogProductProductFragment on CatalogProduct {
      id
      name
      slug
    }
  `,
}

export default CatalogProduct
