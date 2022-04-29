import { useWishlist } from 'context/wishlist-context'
import { Heart } from 'icons'
import React from 'react'
import cx from 'classnames'

interface Props {
  entityId: number
}

const ProductWishlistButton = ({ entityId }: Props) => {
  const { isProductInWishlist, toggleProduct } = useWishlist()

  const productInWishlist = isProductInWishlist(entityId)

  return (
    <button
      className="flex group items-center bg-primaryAlt-300 rounded-full px-4 py-1"
      onClick={() => toggleProduct(entityId)}
    >
      <span className="mr-2">
        <Heart
          width={18}
          className={cx('transition-colors duration-150 ease-out', {
            'fill-primaryAlt-300 text-red-400 group-hover:fill-red-400 ':
              productInWishlist,
            'fill-red-500 text-red-500': !productInWishlist,
          })}
        />
      </span>
      <span className="text-gray-900 text tracking-tighter font-bold">
        {productInWishlist ? 'Add to closet' : 'Item in closet'}
      </span>
    </button>
  )
}

export default ProductWishlistButton
