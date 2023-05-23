import { gql } from '@apollo/client'
import { OrderDetailsPageBillingDetailsOrderFragment } from '@generated/OrderDetailsPageBillingDetailsOrderFragment'
import currency from 'currency.js'
import React from 'react'
import cx from 'classnames'

interface Props {
  order: OrderDetailsPageBillingDetailsOrderFragment
}

const OrderDetailsPageBillingDetails = ({ order }: Props) => {
  return (
    <div className="bg-gray-100 p-4 rounded-md">
      <div className="grid grid-cols-4">
        <div className="col-span-2"></div>
        <div className="col-span-2">
          <table className="table-auto w-full">
            <tbody className="divide-y">
              <tr>
                <TableCellItem>Subtotal</TableCellItem>
                <TableCellAmount amount={order.subtotalPriceCents} />
              </tr>
              <tr>
                <TableCellItem>Shipping</TableCellItem>
                <TableCellAmount amount={order.totalShippingCents} />
              </tr>
              <tr>
                <TableCellItem>Tax</TableCellItem>
                <TableCellAmount amount={order.totalTaxCents} />
              </tr>
              <tr>
                <TableCellItem>Processing Fee</TableCellItem>
                <TableCellAmount amount={order.totalProcessingFeeCents} />
              </tr>
              <tr>
                <TableCellItem className="!font-bold">Total</TableCellItem>
                <TableCellAmount
                  amount={order.totalPriceCents}
                  className="!font-bold underline"
                />
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

const TableCellItem = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => <td className={cx('py-2 text-sm', className)}>{children}</td>

const TableCellAmount = ({
  amount,
  className,
}: {
  amount: number
  className?: string
}) => (
  <td
    className={cx(
      'py-2 text-right font-medium text-sm text-gray-600',
      className,
    )}
  >
    {currency(amount, { fromCents: true }).format()}
  </td>
)

OrderDetailsPageBillingDetails.fragments = {
  order: gql`
    fragment OrderDetailsPageBillingDetailsOrderFragment on Order {
      id
      totalTaxCents
      totalShippingCents
      totalPriceCents
      subtotalPriceCents
      totalProcessingFeeCents
    }
  `,
}

export default OrderDetailsPageBillingDetails
