import { Heart, Share } from 'icons'
import React from 'react'
import cx from 'classnames'
import Tooltip from '@components/ui/Tooltip'
import { useWishlist } from 'app/(app)/(non-settings)/catalog/wishlist-context'
import Link from 'next/link'
import routes from '@lib/routes'

interface Product {
  entityId: number
  productName: string
  productSlug: string
  brandSlug: string
}

interface Props {
  product: Product
}

const ProductQuickActions = ({ product }: Props) => {
  const { isProductInWishlist, toggleProduct } = useWishlist()
  const { entityId, productName, productSlug, brandSlug } = product

  const productInWishlist = isProductInWishlist({ entityId })

  return (
    <div className="flex gap-4">
      <Tooltip
        side="bottom"
        renderTrigger={() => (
          <button
            className="flex group items-center"
            onClick={() => toggleProduct({ entityId, productName })}
          >
            <span>
              <Heart
                width={22}
                height={22}
                className={cx('transition-colors duration-150 ease-out', {
                  'fill-gray-900 text-gray-900 group-hover:fill-red-400 ':
                    !productInWishlist,
                  'fill-red-500 text-red-500': productInWishlist,
                })}
              />
            </span>
          </button>
        )}
        label="Save products you think you may want to include in your merch program."
      />

      <Tooltip
        side="bottom"
        label="Share this product."
        renderTrigger={() => (
          <Link
            className="flex group items-center"
            href={routes.internal.catalog.product.share.href({
              brandSlug,
              productSlug,
            })}
          >
            <Share width={22} height={22} />
          </Link>
        )}
      />
    </div>
  )
}

export default ProductQuickActions
