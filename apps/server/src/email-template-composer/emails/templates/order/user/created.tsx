import currency from 'currency.js'
import React from 'react'
import Paragraph from '../../../components/Paragraph'
import OrderTemplate, { Props as OrderTemplateProps } from '../template'

interface Props
  extends Omit<
    OrderTemplateProps,
    'templateName' | 'children' | 'previewText'
  > {}

const OrderUserCreatedTemplate = ({ ...orderTemplateProps }: Props) => {
  return (
    <OrderTemplate
      {...orderTemplateProps}
      templateName="Order created"
      previewText={`Order #${orderTemplateProps.order.humanId} confirmed`}
    >
      {({ order }) => (
        <>
          <Paragraph>
            Thank you for placing your order with us! Your order{' '}
            <b>#{order.humanId}</b> has been successfully received.
          </Paragraph>

          <table className="mt-10 text-sm">
            <thead>
              <tr>
                <th className="text-left pr-2">Item</th>
                <th></th>
                <th className="text-right px-2">Qty.</th>
                <th className="text-right pl-2">Price</th>
              </tr>
            </thead>
            <tbody>
              {order.lineItems.map((lineItem, index) => (
                <tr key={index}>
                  <td className="pr-2">
                    <img
                      src={lineItem.imgSrc}
                      alt={lineItem.name}
                      className="w-16 h-16"
                    />
                  </td>
                  <td className="px-2 align-top">
                    <div className="font-medium">{lineItem.name}</div>
                    <div>{lineItem.description}</div>
                  </td>
                  <td className="text-right px-2 align-top">
                    {lineItem.quantity}
                  </td>
                  <td className="text-right pl-2 align-top">
                    {currency(lineItem.priceCents, {
                      fromCents: true,
                    }).format()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </OrderTemplate>
  )
}

export default OrderUserCreatedTemplate
