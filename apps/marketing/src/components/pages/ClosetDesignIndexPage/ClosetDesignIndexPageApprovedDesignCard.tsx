import { gql } from '@apollo/client'
import { ClosetDesignIndexPageApprovedDesignCardDesignProductFragment } from '@generated/ClosetDesignIndexPageApprovedDesignCardDesignProductFragment'
import routes from '@lib/routes'
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
    />
  )
}

ClosetDesignIndexPageApprovedDesignCard.fragments = {
  designProduct: gql`
    fragment ClosetDesignIndexPageApprovedDesignCardDesignProductFragment on DesignProduct {
      id
      name
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
