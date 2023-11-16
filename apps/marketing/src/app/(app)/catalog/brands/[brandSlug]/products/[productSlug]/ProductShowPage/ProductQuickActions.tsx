import { Heart, Share } from 'icons'
import React from 'react'
import cx from 'classnames'
import Tooltip from '@components/ui/Tooltip'
import { useWishlist } from 'app/(app)/catalog/wishlist-context'

interface Props {
  entityId: number
  productName: string
  onShareClick: () => void
}

const ProductQuickActions = ({
  entityId,
  productName,
  onShareClick,
}: Props) => {
  const { isProductInWishlist, toggleProduct } = useWishlist()

  const productInWishlist = isProductInWishlist({ entityId })

  return (
    <div className="flex gap-4">
      <Action
        description="Save products you think you may want to include in your merch program."
        icon={
          <Heart
            width={22}
            height={22}
            className={cx('transition-colors duration-150 ease-out', {
              'fill-gray-900 text-gray-900 group-hover:fill-red-400 ':
                !productInWishlist,
              'fill-red-500 text-red-500': productInWishlist,
            })}
          />
        }
        onClick={() => toggleProduct({ entityId, productName })}
      />
      <Action
        description="Share this product."
        icon={<Share width={22} height={22} />}
        onClick={onShareClick}
      />
    </div>
  )
}

const Action = ({
  icon,
  description,
  onClick,
}: {
  icon: React.ReactNode
  description: string
  onClick: () => void
}) => {
  return (
    <Tooltip
      side="bottom"
      renderTrigger={() => (
        <button className="flex group items-center" onClick={onClick}>
          <span>{icon}</span>
        </button>
      )}
      label={description}
    />
  )
}

export default ProductQuickActions
