'use client'

import Image from 'next/legacy/image'
import React from 'react'
import Link from 'next/link'
import useProductOptions from '@components/hooks/useProductOptions/useProductOptions'
import SwatchGroup from '../SwatchGroup'
import { makeProductTitle } from '@lib/utils/catalog'
import { generateImageSizes } from '@lib/utils/image'
import currency from 'currency.js'
import Tooltip from '@components/ui/Tooltip'
import { useLogger } from 'next-axiom'
import { CatalogProductLegacyProductFragment } from '@generated/types'
import { useFragment } from '@apollo/experimental-nextjs-app-support/ssr'
import { CatalogProductLegacyFragments } from '.'

export interface Props {
  priority: boolean
  productId: string
  href: string
  onClick?: () => void
}

const CatalogProductLegacy = ({
  priority,
  productId,
  href,
  onClick,
}: Props) => {
  const logger = useLogger()

  const { data: product } = useFragment<CatalogProductLegacyProductFragment>({
    fragment: CatalogProductLegacyFragments.product,
    fragmentName: 'CatalogProductLegacyProductFragment',
    from: {
      __typename: 'Product',
      id: productId,
    },
  })

  const { colors } = useProductOptions({ productId })

  if (!product) {
    logger.warn('Product is required')
    return null
  }

  return (
    <li className="flex flex-col w-full">
      <Link
        href={href}
        onClick={onClick}
        className="group flex-1 flex flex-col cursor-pointer rounded-sm overflow-hidden transition-all bg-paper"
      >
        <div className="relative w-full aspect-[2/3] flex items-center justify-center rounded-sm group-hover:rounded-none overflow-hidden">
          {product?.defaultImage?.url ? (
            <Image
              priority={priority}
              key={product.defaultImage.url}
              src={product.defaultImage.url}
              alt={product.defaultImage.altText || product.name}
              layout="fill"
              objectFit="contain"
              sizes={generateImageSizes([{ imageWidth: '230px' }])}
            />
          ) : (
            <span>No image</span>
          )}
        </div>
        <div className="py-2 flex-1 flex flex-col">
          <h3 className="text-sm font-normal leading-tight">
            {product ? makeProductTitle(product) : null}
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
                      {product?.prices?.price?.value
                        ? currency(product?.prices?.price?.value, {}).format()
                        : null}
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

export default CatalogProductLegacy
