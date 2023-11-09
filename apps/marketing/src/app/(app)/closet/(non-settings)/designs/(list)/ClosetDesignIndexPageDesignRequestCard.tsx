'use client'

import { gql } from '@apollo/client'
import { StandoutType, useStandout } from '@components/context'
import { BadgeProps } from '@components/ui/Badge'
import { ClosetDesignIndexPageDesignRequestCardDesignRequestFragment } from '@generated/ClosetDesignIndexPageDesignRequestCardDesignRequestFragment'
import { DesignRequestStatus } from '@generated/globalTypes'
import { EyeIcon, LinkIcon } from '@heroicons/react/24/outline'
import routes from '@lib/routes'
import makeAbsoluteUrl from '@lib/utils/get-absolute-url'
import { format } from 'date-fns'
import React from 'react'
import Card from '../../../../../../components/common/ClosetCard/ClosetCard'
import { getDesignRequestBadgeProps } from '@lib/design-request'

interface Props {
  loading: boolean
  designRequest:
    | ClosetDesignIndexPageDesignRequestCardDesignRequestFragment
    | null
    | undefined
}

const ClosetDesignIndexPageDesignRequestCard = ({
  designRequest,
  loading,
}: Props) => {
  const { setStandout } = useStandout()

  if (loading) {
    return <Card loading={true} />
  }

  if (!designRequest) {
    return null
  }

  return (
    <Card
      href={routes.internal.closet.designs.show.href({
        designId: designRequest.id,
      })}
      title={designRequest.name}
      description={`Created ${format(new Date(designRequest.updatedAt), 'PP')}`}
      image={
        designRequest.previewImageUrl
          ? {
              src: designRequest.previewImageUrl,
              alt: designRequest.name,
            }
          : undefined
      }
      badge={getDesignRequestBadgeProps(designRequest)}
      actions={[
        {
          label: 'View',
          icon: <EyeIcon className="w-full" />,
          href: routes.internal.closet.designs.show.href({
            designId: designRequest.id,
          }),
        },
        {
          label: 'Share',
          onClick: () =>
            setStandout({
              type: StandoutType.ClosetLinkShare,
              absoluteUrl: makeAbsoluteUrl(
                routes.internal.closet.designs.show.href({
                  designId: designRequest.id,
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
    />
  )
}

ClosetDesignIndexPageDesignRequestCard.fragments = {
  designRequest: gql`
    fragment ClosetDesignIndexPageDesignRequestCardDesignRequestFragment on DesignRequest {
      id
      name
      updatedAt
      status
      humanizedStatus
      previewImageUrl
    }
  `,
}

export default ClosetDesignIndexPageDesignRequestCard