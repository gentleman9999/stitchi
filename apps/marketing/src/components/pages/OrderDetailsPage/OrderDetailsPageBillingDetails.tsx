import { gql } from '@apollo/client'
import { OrderDetailsPageBillingDetailsOrderFragment } from '@generated/OrderDetailsPageBillingDetailsOrderFragment'
import currency from 'currency.js'
import React from 'react'
import cx from 'classnames'
import PaymentMethod from './PaymentMethod'

interface Props {
  order: OrderDetailsPageBillingDetailsOrderFragment
}

const OrderDetailsPageBillingDetails = ({ order }: Props) => {
  const { lastPaymentMethod } = order

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-4 text-sm gap-8 sm:gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 col-span-2 order-2 gap-6 sm:gap-4">
          <div className="col-span-1">
            <h2 className="mb-1">
              <b>Billing address</b>
            </h2>
            {lastPaymentMethod?.billingDetails ? (
              <>
                <span className="text-gray-500">
                  {lastPaymentMethod.billingDetails.line1}
                </span>
                <span className="text-gray-500">
                  {lastPaymentMethod.billingDetails.line2}
                </span>
                <span className="text-gray-500">
                  {lastPaymentMethod.billingDetails.city
                    ? `${lastPaymentMethod.billingDetails.city}, `
                    : null}{' '}
                  {lastPaymentMethod.billingDetails.state}{' '}
                  {lastPaymentMethod.billingDetails.postalCode}{' '}
                </span>
                <span className="text-gray-500">
                  {lastPaymentMethod.billingDetails.country}
                </span>
              </>
            ) : (
              <span className="text-gray-500">
                No billing address supplied.
              </span>
            )}
          </div>
          <div className="col-span-1">
            <h2 className="mb-1">
              <b>Payment method</b>
            </h2>
            <span className="text-gray-500">
              <PaymentMethod {...lastPaymentMethod} />
            </span>
          </div>
        </div>

        <div className="col-span-2 order-1 sm:order-3">
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

              {order.totalAmountDueCents ? (
                <tr>
                  <TableCellItem className="!font-bold underline">
                    Amount due
                  </TableCellItem>
                  <TableCellAmount
                    amount={order.totalAmountDueCents}
                    className="!font-bold underline"
                  />
                </tr>
              ) : null}

              {order.totalAmountRefundedCents ? (
                <tr>
                  <TableCellItem className="!font-bold">
                    Amount refunded
                  </TableCellItem>
                  <TableCellAmount
                    amount={order.totalAmountRefundedCents}
                    className="!font-bold underline"
                  />
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>
    </>
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
      totalAmountDueCents
      totalAmountRefundedCents
      lastPaymentMethod {
        id
        type
        card {
          brand
          last4
          expMonth
          expYear
        }
        billingDetails {
          line1
          line2
          city
          state
          postalCode
          country
        }
      }
    }
  `,
}

export default OrderDetailsPageBillingDetails
