import { BadgeProps } from '@components/ui/Badge'
import { DesignRequestStatus } from '@generated/types'

export const getDesignRequestBadgeProps = (designRequest: {
  humanizedStatus: string
  status: DesignRequestStatus
}) => {
  const label = designRequest.humanizedStatus
  let severity: BadgeProps['severity']

  switch (designRequest.status) {
    case DesignRequestStatus.APPROVED:
      severity = 'success'
      break

    case DesignRequestStatus.REJECTED:
      severity = 'error'
      break

    case DesignRequestStatus.SUBMITTED:
    case DesignRequestStatus.AWAITING_REVISION:
      severity = 'info'
      break

    case DesignRequestStatus.AWAITING_APPROVAL:
      severity = 'warning'
      break

    case DesignRequestStatus.DRAFT:
    case DesignRequestStatus.ARCHIVED:
    default:
      severity = 'default'
  }

  return { label, severity }
}
