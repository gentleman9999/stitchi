import { gql } from '@apollo/client'
import { Section } from '@components/common'
import { OrderDetailsPageOrderFragment } from '@generated/OrderDetailsPageOrderFragment'
import React from 'react'
import { format, parseISO } from 'date-fns'
import OrderDetailsPageBillingDetails from './OrderDetailsPageBillingDetails'
import OrderDetailsPageShippingDetails from './OrderDetailsPageShippingDetails'
import OrderDetailsPageLineItems from './OrderDetailsPageLineItems'
import ContactUs from './ContactUs'
import OrderPaymentStatusBadge from '@components/common/OrderPaymentStatusBadge'
import ClosetPageContainer from '@components/common/ClosetPageContainer'
import ClosetPageHeader from '@components/common/ClosetPageHeader'
import ClosetPageTitle from '@components/common/ClosetPageTitle'
import ClosetSection from '@components/common/ClosetSection'
import { Card, CardContent } from '@components/ui/Card'

interface Props {
  order: OrderDetailsPageOrderFragment
}

const OrderDetailsPage = ({ order }: Props) => {
  return (
    <ClosetPageContainer>
      <ClosetPageHeader>
        <ClosetPageTitle
          title={'Order Details'}
          description={
            <div className="flex flex-col sm:flex-row sm:gap-4 sm:items-center">
              <span className="text-sm text-gray-500">
                Order number{' '}
                <b className="text-gray-900">{order.humanOrderId}</b>
              </span>
              <span className="sr-only sm:not-sr-only">·</span>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 sm:items-center">
                <span className="text-sm">
                  <b>{format(parseISO(order.createdAt), 'PPP')}</b>
                </span>
                <span className="hidden sm:block">·</span>
                <div>
                  <OrderPaymentStatusBadge
                    size="small"
                    humanStatus={order.humanPaymentStatus}
                    status={order.paymentStatus}
                  />
                </div>
              </div>
            </div>
          }
        />
      </ClosetPageHeader>

      <ClosetSection>
        <OrderDetailsPageShippingDetails order={order} />
      </ClosetSection>

      <ClosetSection>
        <Card>
          <CardContent>
            <OrderDetailsPageLineItems items={order.items} />
          </CardContent>
        </Card>
      </ClosetSection>

      <ClosetSection>
        <Card>
          <CardContent>
            <OrderDetailsPageBillingDetails order={order} />
          </CardContent>
        </Card>
      </ClosetSection>

      <ClosetSection>
        <ContactUs humanOrderId={order.humanOrderId} />
      </ClosetSection>
    </ClosetPageContainer>
  )
}

OrderDetailsPage.fragments = {
  order: gql`
    ${OrderDetailsPageBillingDetails.fragments.order}
    ${OrderDetailsPageShippingDetails.fragments.order}
    ${OrderDetailsPageLineItems.fragments.item}
    fragment OrderDetailsPageOrderFragment on Order {
      id
      createdAt
      humanOrderId
      paymentStatus
      humanPaymentStatus
      totalTaxCents
      totalShippingCents
      subtotalPriceCents
      totalProcessingFeeCents
      totalPriceCents
      items {
        id
        ...OrderDetailsPageLineItemsItemFragment
      }
      ...OrderDetailsPageBillingDetailsOrderFragment
      ...OrderDetailsPageShippingDetailsOrderFragment
    }
  `,
}

export default OrderDetailsPage
