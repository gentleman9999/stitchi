import { gql } from '@apollo/client'
import { fragments as orderPayPageOrderPreviewFragments } from './OrderPayPageOrderPreview.fragments'

export const fragments = {
  paymentIntent: gql`
    fragment OrderPayPagePaymentIntentFragment on PaymentIntent {
      id
      clientSecret
      amount
    }
  `,
  order: gql`
    ${orderPayPageOrderPreviewFragments.order}
    fragment OrderPayPageOrderFragment on Order {
      id
      totalTaxCents
      totalPriceCents
      totalShippingCents
      subtotalPriceCents
      totalProcessingFeeCents
      ...OrderPayPageOrderPreviewItemFragment
    }
  `,
}
