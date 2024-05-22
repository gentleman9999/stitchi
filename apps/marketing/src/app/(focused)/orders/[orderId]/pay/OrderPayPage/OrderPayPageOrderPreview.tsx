import { OrderPayPageOrderPreviewItemFragment } from '@generated/OrderPayPageOrderPreviewItemFragment'
import currency from 'currency.js'
import React from 'react'
import cx from 'classnames'

interface Props {
  order: OrderPayPageOrderPreviewItemFragment
}

const OrderPayPageOrderPreview = ({ order }: Props) => {
  const { itemSummaries: items } = order
  return (
    <div className="border p-4 sm:p-6 rounded-sm shadow-sm bg-paper">
      <h2 className="text-lg font-semibold text-gray-400 mb-2">Summary</h2>

      <div className="w-full text-sm flex flex-col gap-5">
        {items.map(item => (
          <div key={item.id}>
            <div className="py-1">
              <b>{item.title}</b>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-gray-600">{item.quantity} qty.</div>
              <div className="text-right text-gray-600 font-medium">
                {currency(item.totalPriceCents, {
                  fromCents: true,
                }).format()}
              </div>
            </div>
          </div>
        ))}

        <div className="border-t border-gray-200" />

        <LineItem item="Subtotal" amount={order.subtotalPriceCents} />
        <LineItem item="Shipping" amount={order.totalShippingCents} />
        <LineItem item="Tax" amount={order.totalTaxCents} />
        <LineItem
          item="Processing Fee"
          amount={order.totalProcessingFeeCents}
        />

        <div className="border-t border-gray-200" />

        <LineItem
          className="text-lg font-medium"
          item="Total"
          amount={order.totalPriceCents}
        />

        {order.totalAmountPaidCents > 0 ? (
          <>
            <div className="border-t border-gray-200" />

            <LineItem item="Amount Paid" amount={order.totalAmountPaidCents} />
            <LineItem item="Amount Due" amount={order.totalAmountDueCents} />
          </>
        ) : null}
      </div>
    </div>
  )
}

const LineItem = ({
  item,
  amount,
  className,
}: {
  item: React.ReactNode
  amount: number
  className?: string
}) => (
  <div className={cx('flex items-center justify-between', className)}>
    <div className="">{item}</div>
    <div className="font-medium">
      {currency(amount, {
        fromCents: true,
      }).format()}
    </div>
  </div>
)

export default OrderPayPageOrderPreview
