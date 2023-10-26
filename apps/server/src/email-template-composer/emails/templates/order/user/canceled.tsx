import React from 'react'
import Paragraph from '../../../components/Paragraph'
import OrderTemplate, { Props as OrderTemplateProps } from '../template'

interface Props extends Omit<OrderTemplateProps, 'templateName'> {}

const OrderUserShipmentCanceledTemplate = ({
  ...orderTemplateProps
}: Props) => {
  return (
    <OrderTemplate {...orderTemplateProps} templateName="Order canceled">
      {({ order }) => (
        <Paragraph>
          Your order <b>#{order.humanId}</b> has been cancelled.
        </Paragraph>
      )}
    </OrderTemplate>
  )
}

export default OrderUserShipmentCanceledTemplate
