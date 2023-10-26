import React from 'react'
import Paragraph from '../../../components/Paragraph'
import OrderTemplate, { Props as OrderTemplateProps } from '../template'

interface Props extends Omit<OrderTemplateProps, 'templateName'> {}

const OrderUserShipmentCreatedTemplate = ({ ...orderTemplateProps }: Props) => {
  return (
    <OrderTemplate {...orderTemplateProps} templateName="Order shipped! 📦">
      {({ order }) => (
        <Paragraph>
          We've shipped your order <b>#{order.humanId}</b>. It's now on its way
          to you!
        </Paragraph>
      )}
    </OrderTemplate>
  )
}

export default OrderUserShipmentCreatedTemplate
