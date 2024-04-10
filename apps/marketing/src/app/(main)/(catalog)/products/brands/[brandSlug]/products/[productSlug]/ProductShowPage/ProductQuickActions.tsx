import { Heart, Share } from 'icons'
import React from 'react'
import cx from 'classnames'
import Tooltip from '@components/ui/Tooltip'
import { useWishlist } from 'app/(main)/(catalog)/products/wishlist-context'
import Link from 'next/link'
import routes from '@lib/routes'

interface Product {
  entityId: number
  productName: string
}

interface Props {
  product: Product
  shareHref: string
}

const ProductQuickActions = ({ product, shareHref }: Props) => {
  const { isProductInWishlist, toggleProduct } = useWishlist()
  const { entityId, productName } = product

  const productInWishlist = isProductInWishlist({ entityId })

  return (
    <div className="flex gap-4">
      <Tooltip
        side="bottom"
        renderTrigger={() => (
          <button
            aria-label="like & save product"
            className="flex group items-center"
            onClick={() => toggleProduct({ entityId, productName })}
          >
            <Heart
              width={22}
              height={22}
              className={cx('transition-colors duration-150 ease-out', {
                'fill-gray-900 text-gray-900 group-hover:fill-red-400 ':
                  !productInWishlist,
                'fill-red-500 text-red-500': productInWishlist,
              })}
            />
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
            href={shareHref}
            aria-label="share product"
          >
            <Share width={22} height={22} />
          </Link>
        )}
      />
    </div>
  )
}

export default ProductQuickActions
