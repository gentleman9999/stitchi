import { Badge, BadgeProps } from '@components/ui'
import { OrderPaymentStatus } from '@generated/globalTypes'
import React from 'react'

interface Props {
  status: OrderPaymentStatus
  humanStatus: string
  size?: BadgeProps['size']
}

const OrderPaymentStatusPage = (props: Props) => {
  let severity: BadgeProps['severity']

  switch (props.status) {
    case OrderPaymentStatus.PAID:
      severity = 'success'
      break
    case OrderPaymentStatus.REFUNDED:
    case OrderPaymentStatus.PARTIALLY_REFUNDED:
    case OrderPaymentStatus.PARTIALLY_PAID:
      severity = 'warning'
      break
    case OrderPaymentStatus.NOT_PAID:
      severity = 'error'
      break
    default:
      severity = 'default'
  }

  return (
    <Badge label={props.humanStatus} severity={severity} size={props.size} />
  )
}

export default OrderPaymentStatusPage
