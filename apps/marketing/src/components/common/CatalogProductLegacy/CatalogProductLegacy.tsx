import Image from 'next/legacy/image'
import React from 'react'
import routes from '@lib/routes'
import Link from 'next/link'
import useProductOptions from '@components/hooks/useProductOptions/useProductOptions'
import SwatchGroup from '../Catalog/SwatchGroup'
import { makeProductTitle } from '@lib/utils/catalog'
import { generateImageSizes } from '@lib/utils/image'
import currency from 'currency.js'
import Tooltip from '@components/ui/Tooltip'
import { useLogger } from 'next-axiom'
import Skeleton from '@components/ui/Skeleton'
import { CatalogProductLegacyProductFragment } from '@generated/types'
import { useFragment } from '@apollo/experimental-nextjs-app-support/ssr'
import { CatalogProductLegacyFragments } from '.'

export interface Props {
  priority: boolean
  loading?: boolean
  productId: string
}

const CatalogProductLegacy = ({ priority, loading, productId }: Props) => {
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

  if (!loading && !product) {
    logger.warn('Product is required')
    return null
  }

  if (!loading && !product?.brand) {
    logger.warn('Product must have a brand', { product })
    return null
  }

  const href =
    loading || !product
      ? ''
      : routes.internal.catalog.product.href({
          brandSlug: product.brand?.path?.replaceAll('/', '') || '',
          productSlug: product.path?.replaceAll('/', '') || '',
        })

  return (
    <li className="flex flex-col w-full">
      <Link
        href={href}
        className="flex-1 flex flex-col cursor-pointer rounded-lg    hover:shadow-lg transition-all bg-paper"
      >
        <div className="relative w-full h-[320px] flex items-center justify-center">
          {loading ? (
            <Skeleton containerClassName="flex-1 h-full" className="h-full" />
          ) : product?.defaultImage?.url ? (
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
        <div className="p-2">
          <h3 className="text-sm font-normal leading-tight">
            {loading ? (
              <Skeleton width={140} />
            ) : product ? (
              makeProductTitle(product)
            ) : null}
          </h3>

          <div className="mt-4 flex justify-between items-end flex-wrap flex-1">
            <div className="flex-1 flex items-end">
              {loading ? (
                <Skeleton width={100} />
              ) : (
                <SwatchGroup
                  // Could add support for more colors in the future
                  hexColors={colors.map(({ hexColors }) => hexColors[0])}
                />
              )}
            </div>
            <span className=" text-gray-600 flex gap-1 items-center">
              <span className="text-xs">from</span>
              <Tooltip
                label="Price includes 1 print location."
                delay={150}
                renderTrigger={() => (
                  <button>
                    <span className="font-bold">
                      {loading ? (
                        <Skeleton width={40} />
                      ) : product?.priceMetadata?.minPriceCents ? (
                        currency(product.priceMetadata.minPriceCents, {
                          fromCents: true,
                        }).format()
                      ) : null}
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
