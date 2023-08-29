import { Section } from '@react-email/components'
import React from 'react'
import Button from '../../components/Button'
import { baseUrl } from '../../environment'
import EmailTemplate, {
  Props as EmailTemplateProps,
  Recipient,
} from '../template'

interface LineItem {
  name: string
  description?: string
  quantity: number
  priceCents: number
  imgSrc?: string
}

interface Order {
  id: string
  humanId: string
  lineItems: LineItem[]
}

export interface Props extends Omit<EmailTemplateProps, 'children'> {
  order: Order
  children:
    | React.ReactNode
    | ((props: { order: Order; recipient: Recipient }) => React.ReactNode)
}

const OrderTemplate = ({
  order = {
    id: '123',
    humanId: 'AB12C3',
    lineItems: [
      {
        name: 'Backmanity Extra Super Premium Tee - Black - S',
        priceCents: 4999,
        quantity: 500,
        imgSrc: 'https://via.placeholder.com/150',
      },
      {
        name: 'Backmanity Extra Super Premium Tee - Black - M',
        priceCents: 4999,
        quantity: 500,
        imgSrc: 'https://via.placeholder.com/150',
      },
      {
        name: 'Backmanity Extra Super Premium Tee - Black - L',
        priceCents: 4999,
        quantity: 500,
        imgSrc: 'https://via.placeholder.com/150',
      },
      {
        name: 'Backmanity Extra Super Premium Tee - Black - XL',
        priceCents: 4999,
        quantity: 500,
        imgSrc: 'https://via.placeholder.com/150',
      },
    ],
  },
  children,
  ...emailTemplateProps
}: Props) => {
  return (
    <EmailTemplate {...emailTemplateProps}>
      {({ recipient }) => (
        <>
          {typeof children === 'function'
            ? children({ recipient, order })
            : children}

          <Section className="text-center mt-8">
            <Button href={`${baseUrl}/api/notifications/order/${order.id}`}>
              View order
            </Button>
          </Section>
        </>
      )}
    </EmailTemplate>
  )
}

export default OrderTemplate
