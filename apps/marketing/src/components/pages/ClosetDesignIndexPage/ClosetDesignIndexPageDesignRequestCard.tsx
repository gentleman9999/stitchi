import { gql } from '@apollo/client'
import { Badge, BadgeProps } from '@components/ui'
import { ClosetDesignIndexPageDesignRequestCardDesignRequestFragment } from '@generated/ClosetDesignIndexPageDesignRequestCardDesignRequestFragment'
import { DesignRequestStatus } from '@generated/globalTypes'
import routes from '@lib/routes'
import { format } from 'date-fns'
import Link from 'next/link'
import React from 'react'

interface Props {
  designRequest: ClosetDesignIndexPageDesignRequestCardDesignRequestFragment
}

const ClosetDesignIndexPageDesignRequestCard = ({ designRequest }: Props) => {
  return (
    <Link
      className="relative col-span-1 rounded-md overflow-hidden border"
      href={routes.internal.closet.designRequests.show.href({
        designId: designRequest.id,
      })}
    >
      <div className="absolute right-0 top-0">
        <div className="p-2">
          <Badge
            label={designRequest.humanizedStatus}
            severity={getStatusBadgeSeverity(designRequest.status)}
            className="opacity-90"
          />
        </div>
      </div>
      <div className="aspect-square overflow-hidden rounded-md">
        <img
          src={`https://www.stitchi.co/_next/image?url=https%3A%2F%2Fcdn11.bigcommerce.com%2Fs-ycjcgspsys%2Fimages%2Fstencil%2F300w%2Fattribute_rule_images%2F166304_source_1684166140.jpg&w=1200&q=75`}
          alt={`Design`}
          className="w-full h-full object-contain"
        />
      </div>

      <div className="p-4">
        <h2 className="font-semibold leading-tight">{designRequest.name}</h2>
        <span className="text-xs text-gray-500 ">
          Created {format(new Date(designRequest.updatedAt), 'PP')}
        </span>
      </div>
    </Link>
  )
}

const getStatusBadgeSeverity = (
  status: DesignRequestStatus,
): BadgeProps['severity'] => {
  switch (status) {
    case DesignRequestStatus.APPROVED:
      return 'success'
    case DesignRequestStatus.REJECTED:
      return 'error'

    case DesignRequestStatus.SUBMITTED:
    case DesignRequestStatus.AWAITING_REVISION:
    case DesignRequestStatus.AWAITING_APPROVAL:
      return 'info'
    case DesignRequestStatus.DRAFT:
    default:
      return 'default'
  }
}

ClosetDesignIndexPageDesignRequestCard.fragments = {
  designRequest: gql`
    fragment ClosetDesignIndexPageDesignRequestCardDesignRequestFragment on DesignRequest {
      id
      name
      updatedAt
      status
      humanizedStatus
    }
  `,
}

export default ClosetDesignIndexPageDesignRequestCard
