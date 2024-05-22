import { gql } from '@apollo/client'

export const fragments = {
  order: gql`
    fragment OrderPayPageOrderPreviewItemFragment on Order {
      id
      totalTaxCents
      totalPriceCents
      totalAmountPaidCents
      totalAmountDueCents
      totalShippingCents
      subtotalPriceCents
      totalProcessingFeeCents
      itemSummaries {
        id
        title
        quantity
        totalPriceCents
      }
    }
  `,
}
