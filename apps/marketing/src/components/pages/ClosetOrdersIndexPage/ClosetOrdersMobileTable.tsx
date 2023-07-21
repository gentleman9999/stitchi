import { gql } from '@apollo/client'
import { LinkInline } from '@components/ui'
import { ClosetOrdersMobileTableOrderFragment } from '@generated/ClosetOrdersMobileTableOrderFragment'
import useTimeZone from '@components/hooks/useTimeZone'
import routes from '@lib/routes'
import currency from 'currency.js'
import { parseISO } from 'date-fns'
import { format } from 'date-fns-tz'
import React from 'react'
import InfiniteScrollContainer from '../../common/InfiniteScrollContainer'
import OrderPaymentStatusBadge from '../../common/OrderPaymentStatusBadge'

interface Props {
  orders: ClosetOrdersMobileTableOrderFragment[]
  hasNextPage?: boolean
  onNextPage: () => Promise<void> | void
}

const ClosetOrdersMobileTable = ({
  orders,
  hasNextPage,
  onNextPage,
}: Props) => {
  const { timeZone } = useTimeZone()

  const handleNextPage = async () => {
    await onNextPage()
  }

  return (
    <div className="divide-y">
      {orders.map(order => (
        <div key={order.id}>
          <div className="flex flex-col gap-4">
            <div>
              <span className="text-gray-500 text-xs mb-1">
                {format(parseISO(order.createdAt), 'PP', { timeZone })}
              </span>
              <div className="flex items-center gap-4 font-medium justify-between">
                {currency(order.totalPriceCents, {
                  fromCents: true,
                }).format()}
                <OrderPaymentStatusBadge
                  size="small"
                  humanStatus={order.humanPaymentStatus}
                  status={order.paymentStatus}
                />
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-gray-500 text-xs">
                  {currency(order.totalTaxCents, {
                    fromCents: true,
                  }).format()}{' '}
                  tax
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <LinkInline
                external
                href={routes.internal.order.show.href({
                  orderId: order.id,
                })}
              >
                View order
              </LinkInline>
              <span className="text-xs text-gray-400">
                Order{' '}
                <span className="text-gray-600">{order.humanOrderId}</span>
              </span>
            </div>
          </div>
        </div>
      ))}

      {hasNextPage ? (
        <InfiniteScrollContainer onIntersect={handleNextPage} />
      ) : null}
    </div>
  )
}

ClosetOrdersMobileTable.fragments = {
  order: gql`
    fragment ClosetOrdersMobileTableOrderFragment on Order {
      id
      totalPriceCents
      totalTaxCents
      paymentStatus
      createdAt
      humanPaymentStatus
      humanOrderId
    }
  `,
}

export default ClosetOrdersMobileTable
