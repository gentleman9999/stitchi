import Badge, { BadgeProps } from '@components/ui/Badge'
import { OrderStatusTemporary } from '@generated/types'
import React from 'react'

interface Props {
  humanStatus: string
  status: OrderStatusTemporary
  size?: BadgeProps['size']
}

const OrderStatusTemporaryBadge = ({ status, size, humanStatus }: Props) => {
  let severity: BadgeProps['severity']

  switch (status) {
    case OrderStatusTemporary.UNCONFIRMED:
    case OrderStatusTemporary.IN_PRODUCTION:
    case OrderStatusTemporary.CONFIRMED:
    case OrderStatusTemporary.IN_FULFILLMENT:
      severity = 'info'
      break
    case OrderStatusTemporary.COMPLETED:
      severity = 'success'
      break
  }

  return <Badge label={humanStatus} severity={severity} size={size} />
}

export default OrderStatusTemporaryBadge
