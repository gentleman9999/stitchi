import { gql } from '@apollo/client'
import SwatchGroup from '@components/common/Catalog/SwatchGroup'
import Tooltip from '@components/ui/Tooltip'
import { ClosetDesignIndexPageApprovedDesignCardDesignProductFragment } from '@generated/ClosetDesignIndexPageApprovedDesignCardDesignProductFragment'
import { EyeIcon, LinkIcon } from '@heroicons/react/20/solid'
import routes from '@lib/routes'
import { notEmpty } from '@utils/typescript'
import currency from 'currency.js'
import React from 'react'
import Card from './Card'

interface Props {
  design: ClosetDesignIndexPageApprovedDesignCardDesignProductFragment
}

const ClosetDesignIndexPageApprovedDesignCard = ({ design }: Props) => {
  return (
    <Card
      href={routes.internal.closet.designProducts.show.href({
        designId: design.id,
      })}
      title={design.name}
      actions={[
        {
          label: 'Share',
          onClick: () => {},
          icon: <LinkIcon className="w-full" />,
        },
        {
          label: 'View',
          icon: <EyeIcon className="w-full" />,
          href: routes.internal.closet.designProducts.show.href({
            designId: design.id,
          }),
        },
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
              <span className="text-xs">from</span>
              <span className="font-bold text-base">
                {currency(design.minUnitPriceCents, {
                  fromCents: true,
                }).format()}
              </span>
            </span>
          ) : null}
        </div>
      }
    />
  )
}

ClosetDesignIndexPageApprovedDesignCard.fragments = {
  designProduct: gql`
    fragment ClosetDesignIndexPageApprovedDesignCardDesignProductFragment on DesignProduct {
      id
      name
      minUnitPriceCents
      colors {
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

export default ClosetDesignIndexPageApprovedDesignCard
