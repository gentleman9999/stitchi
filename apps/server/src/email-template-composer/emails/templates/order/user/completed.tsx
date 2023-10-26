import React from 'react'
import Paragraph from '../../../components/Paragraph'
import OrderTemplate, { Props as OrderTemplateProps } from '../template'

interface Props extends Omit<OrderTemplateProps, 'templateName'> {}

const OrderUserShipmentCompletedTemplate = ({
  ...orderTemplateProps
}: Props) => {
  return (
    <OrderTemplate {...orderTemplateProps} templateName="Order delivered 🚪">
      {({ order }) => (
        <Paragraph>
          Your order <b>#{order.humanId}</b> has been successfully delivered!
        </Paragraph>
      )}
    </OrderTemplate>
  )
}

export default OrderUserShipmentCompletedTemplate
