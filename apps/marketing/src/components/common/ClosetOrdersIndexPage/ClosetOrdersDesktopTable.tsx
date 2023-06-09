import React from 'react'
import OrderPaymentStatusBadge from '../OrderPaymentStatusBadge'
import routes from '@lib/routes'
import { format, parseISO } from 'date-fns'
import currency from 'currency.js'
import { LinkInline } from '@components/ui'
import { gql } from '@apollo/client'
import cx from 'classnames'
import { ClosetOrdersDesktopTableOrderFragment } from '@generated/ClosetOrdersDesktopTableOrderFragment'
import InfiniteScrollContainer from '../InfiniteScrollContainer'

interface Props {
  orders: ClosetOrdersDesktopTableOrderFragment[]
  hasNextPage?: boolean
  onNextPage: () => Promise<void> | void
}

const ClosetOrdersDesktopTable = ({
  orders,
  hasNextPage,
  onNextPage,
}: Props) => {
  const handleNextPage = async () => {
    await onNextPage()
  }

  return (
    <div
      className="grid border-t"
      style={{ gridTemplateColumns: '150px repeat(2, 1fr)' }}
    >
      <Cell className="sr-only">Order Date</Cell>
      <Cell className="sr-only">Order Total</Cell>
      <Cell right className="sr-only">
        Actions
      </Cell>

      {orders?.map(order => (
        <>
          <Cell className="font-medium text-gray-500">
            {format(parseISO(order.createdAt), 'PP')}
          </Cell>
          <Cell>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-4 font-medium">
                {currency(order.totalPriceCents, {
                  fromCents: true,
                }).format()}
                <OrderPaymentStatusBadge
                  size="small"
                  humanStatus={order.humanPaymentStatus}
                  status={order.paymentStatus}
                />
              </div>
              <span className="text-gray-500 text-xs">
                {currency(order.totalTaxCents, {
                  fromCents: true,
                }).format()}{' '}
                tax
              </span>
            </div>
          </Cell>
          <Cell right>
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
          </Cell>
        </>
      ))}

      {hasNextPage ? (
        <InfiniteScrollContainer onIntersect={handleNextPage} />
      ) : null}
    </div>
  )
}

const Cell = ({
  children,
  right,
  className,
}: {
  children?: React.ReactNode
  right?: boolean
  className?: string
}) => {
  return (
    <div
      className={cx(
        className,
        'border-b px-2 py-3 flex flex-col justify-center',
        {
          'items-end': right,
        },
      )}
    >
      {children}
    </div>
  )
}

ClosetOrdersDesktopTable.fragments = {
  order: gql`
    fragment ClosetOrdersDesktopTableOrderFragment on Order {
      id
      humanOrderId
      paymentStatus
      humanPaymentStatus
      totalTaxCents
      totalPriceCents
      createdAt
    }
  `,
}

export default ClosetOrdersDesktopTable
