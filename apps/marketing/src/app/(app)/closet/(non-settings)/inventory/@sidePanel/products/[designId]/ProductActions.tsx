'use client'

import { StandoutType, useStandout } from '@components/context'
import Button from '@components/ui/ButtonV2/Button'
import { Dropdown, DropdownItem } from '@components/ui/Dropdown'
import { InventoryProductDetailsDesignFragment } from '@generated/types'
import { EllipsisHorizontalIcon } from '@heroicons/react/20/solid'
import routes from '@lib/routes'
import makeAbsoluteUrl from '@lib/utils/get-absolute-url'
import Link from 'next/link'
import React from 'react'

interface Props {
  designProduct: InventoryProductDetailsDesignFragment
}

const ProductActions = ({ designProduct }: Props) => {
  const { setStandout } = useStandout()

  return (
    <div className="flex gap-4 justify-end">
      <Dropdown
        renderTrigger={() => (
          <Button variant="ghost">
            <EllipsisHorizontalIcon className="w-5 h-5" />
          </Button>
        )}
        renderItems={() => [
          <DropdownItem
            key="design-request"
            label="View design request"
            href={routes.internal.closet.designs.show.href({
              designId: designProduct.designRequestId,
            })}
          />,
        ]}
      />

      <Button
        variant="ghost"
        onClick={() =>
          setStandout({
            type: StandoutType.ClosetLinkShare,
            absoluteUrl: makeAbsoluteUrl(
              routes.internal.closet.inventory.show.products.show.href({
                designId: designProduct.id,
              }),
            ),
          })
        }
      >
        Share
      </Button>

      <Button
        Component={Link}
        variant="ghost"
        href={routes.internal.closet.inventory.show.products.show.buy.href({
          designId: designProduct.id,
        })}
      >
        Restock
      </Button>
    </div>
  )
}

export default ProductActions
