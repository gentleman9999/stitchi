import { useWishlist } from 'context/wishlist-context'
import { Heart } from 'icons'
import React from 'react'
import cx from 'classnames'
import Tooltip from '@components/ui/Tooltip'

interface Props {
  entityId: number
}

const ProductQuickActions = ({ entityId }: Props) => {
  const { isProductInWishlist, toggleProduct } = useWishlist()

  const productInWishlist = isProductInWishlist({ entityId })

  return (
    <Tooltip
      side="bottom"
      renderTrigger={() => (
        <button
          className="flex group items-center"
          onClick={() => toggleProduct({ entityId })}
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
  )
}

export default ProductQuickActions
