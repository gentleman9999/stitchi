const SALES_TAX_RATE = 8 // 8%
const CREDIT_CARD_PROCESSING_FEE_RATE = 2.9 // 2.9%

interface LineItem {
  quantity: number
  unitPriceCents: number
}

interface Input {
  items: LineItem[]
}

const calculateOrderAmounts = ({ items }: Input) => {
  const totalItemsPriceCents = items.reduce(
    (acc, item) => acc + item.quantity * item.unitPriceCents,
    0,
  )

  const totalSalesTaxCents = Math.round(
    (totalItemsPriceCents * SALES_TAX_RATE) / 100,
  )

  const priceWithTaxCents = totalItemsPriceCents + totalSalesTaxCents

  const totalCreditCardProcessingFeeCents = Math.round(
    (priceWithTaxCents * CREDIT_CARD_PROCESSING_FEE_RATE) / 100,
  )

  const priceWithTaxAndFeesCents =
    priceWithTaxCents + totalCreditCardProcessingFeeCents

  return {
    totalShippingCents: 0,
    subtotalPriceCents: totalItemsPriceCents,
    totalTaxCents: totalSalesTaxCents,
    totalPriceCents: priceWithTaxAndFeesCents,
    totalProcessingFeeCents: totalCreditCardProcessingFeeCents,
  }
}

export { calculateOrderAmounts }
