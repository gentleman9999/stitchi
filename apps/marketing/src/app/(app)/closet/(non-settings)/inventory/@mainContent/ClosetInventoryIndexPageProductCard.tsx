'use client'

import { gql } from '@apollo/client'
import SwatchGroup from '@components/common/Catalog/SwatchGroup'
import { StandoutType, useStandout } from '@components/context'
import { ClosetInventoryIndexPageProductCardDesignProductFragment } from '@generated/ClosetInventoryIndexPageProductCardDesignProductFragment'
import {
  ArrowPathRoundedSquareIcon,
  EyeIcon,
  LinkIcon,
} from '@heroicons/react/20/solid'
import routes from '@lib/routes'
import makeAbsoluteUrl from '@lib/utils/get-absolute-url'
import { notEmpty } from '@lib/utils/typescript'
import React from 'react'
import Card from '@components/common/ClosetCard'

interface Props {
  loading: boolean
  design:
    | ClosetInventoryIndexPageProductCardDesignProductFragment
    | null
    | undefined
}

const ClosetInventoryIndexPageProductCard = ({ design, loading }: Props) => {
  const { setStandout } = useStandout()

  if (loading) {
    return <Card loading={true} />
  }

  if (!design) {
    return null
  }

  return (
    <Card
      href={routes.internal.closet.inventory.show.products.show.href({
        designId: design.id,
      })}
      title={design.name}
      actions={[
        {
          label: 'View',
          icon: <EyeIcon className="w-full" />,
          href: routes.internal.closet.inventory.show.products.show.href({
            designId: design.id,
          }),
        },
        {
          label: 'Restock',
          icon: <ArrowPathRoundedSquareIcon className="w-full" />,
          href: routes.internal.closet.inventory.show.products.show.buy.href({
            designId: design.id,
          }),
        },
        {
          label: 'Share',
          onClick: () =>
            setStandout({
              type: StandoutType.ClosetLinkShare,
              absoluteUrl: makeAbsoluteUrl(
                routes.internal.closet.inventory.show.products.show.href({
                  designId: design.id,
                }),
              ),
            }),
          icon: <LinkIcon className="w-full" />,
        },
        // {
        //   label: 'Duplicate',
        //   onClick: () => {},
        //   icon: <DocumentDuplicateIcon className="w-full" />,
        // },
      ]}
      image={
        design.primaryImageFile
          ? {
              src: design.primaryImageFile.url,
              height: design.primaryImageFile.height,
              width: design.primaryImageFile.width,
              alt: design.name,
            }
          : undefined
      }
      description={
        <div className="flex justify-between items-end flex-wrap flex-1">
          <div className="flex-1 flex items-end">
            <SwatchGroup
              hexColors={design.colors.map(({ hex }) => hex).filter(notEmpty)}
            />
          </div>
          {design.minUnitPriceCents ? (
            <span className=" text-gray-600 flex gap-1 items-center">
              <span className="text-sm">In stock</span>
              <span className="font-bold text-base">
                {design.inStockQty || 0}
              </span>
            </span>
          ) : null}
        </div>
      }
    />
  )
}

ClosetInventoryIndexPageProductCard.fragments = {
  designProduct: gql`
    fragment ClosetInventoryIndexPageProductCardDesignProductFragment on DesignProduct {
      id
      name
      minUnitPriceCents
      inStockQty
      inProductionQty
      colors {
        id
        hex
        name
      }
      primaryImageFile {
        id
        url
        width
        height
      }
    }
  `,
}

export default ClosetInventoryIndexPageProductCard
