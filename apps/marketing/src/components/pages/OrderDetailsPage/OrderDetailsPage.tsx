import { gql } from '@apollo/client'
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
import ClosetPageActions, {
  ClosetPageActionsProps,
} from '@components/common/ClosetPageActions'
import routes from '@lib/routes'
import {
  MembershipRole,
  OrderDetailsPageOrderFragment,
  OrderStatusTemporary,
  ScopeAction,
  ScopeResource,
} from '@generated/types'
import { useAuthorizedComponent } from '@lib/auth'
import useUpdateOrderStatus from './useUpdateOrderStatus'

interface Props {
  order: OrderDetailsPageOrderFragment
}

const OrderDetailsPage = ({ order }: Props) => {
  const [updateStatus, updateStatusMutation] = useUpdateOrderStatus({
    orderId: order.id,
  })
  const { can } = useAuthorizedComponent()

  const actions: ClosetPageActionsProps['actions'] = []

  if (order.totalAmountDueCents > 0) {
    actions.push({
      primary: true,
      href: routes.internal.order.show.pay.href({
        orderId: order.id,
      }),
      label: 'Make payment',
    })
  }

  if (can(ScopeResource.OrderFulfillment, ScopeAction.CREATE)) {
    switch (order.statusTemporary) {
      case OrderStatusTemporary.UNCONFIRMED:
        actions.push({
          label: 'Mark as Confirmed',
          onClick: () => updateStatus(OrderStatusTemporary.CONFIRMED),
          loading: updateStatusMutation.loading,
        })
        break
      case OrderStatusTemporary.CONFIRMED:
        actions.push({
          label: 'Mark in Production',
          onClick: () => updateStatus(OrderStatusTemporary.IN_PRODUCTION),
          loading: updateStatusMutation.loading,
        })
        break

      case OrderStatusTemporary.IN_PRODUCTION:
        actions.push({
          label: 'Mark as Shipped',
          onClick: () => updateStatus(OrderStatusTemporary.IN_FULFILLMENT),
          loading: updateStatusMutation.loading,
        })
        break

      case OrderStatusTemporary.IN_FULFILLMENT:
        actions.push({
          label: 'Mark as Delivered',
          onClick: () => updateStatus(OrderStatusTemporary.COMPLETED),
          loading: updateStatusMutation.loading,
        })
        break
    }
  }

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
          actions={<ClosetPageActions actions={actions} />}
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
      statusTemporary
      totalShippingCents
      subtotalPriceCents
      totalProcessingFeeCents
      totalPriceCents
      totalAmountDueCents
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
