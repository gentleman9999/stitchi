import { add, chain, divide, multiply, sum } from 'mathjs'
import {
  FULFILLMENT_CHARGE,
  SCREEN_CHARGE,
  getMarkupMultiplier,
  getPrintLocationsCost,
  getPrintQtyBreakpoint,
} from './shared'

const calculate = ({
  includeFulfillment,
  printLocations,
  variants,
}: {
  includeFulfillment: boolean
  printLocations: { colorCount: number }[]
  variants: {
    catalogProductId: string
    catalogProductVariantId: string
    quantity: number
    priceCents: number
  }[]
}) => {
  const fulfillmentCost = includeFulfillment ? FULFILLMENT_CHARGE : 0

  const totalQuantity = sum(...variants.map(v => v.quantity))

  const printQtyBreakpoint = getPrintQtyBreakpoint(totalQuantity)

  const printLocationsCosts = getPrintLocationsCost(
    printQtyBreakpoint,
    printLocations,
  )

  const totalColorCount: number = sum(...printLocations.map(l => l.colorCount))

  const screenCost = multiply(totalColorCount, SCREEN_CHARGE)

  const variantQuotes = variants.map(variant => {
    const variantUnitCostCents = chain(printLocationsCosts)
      .add(variant.priceCents)
      .add(divide(screenCost, totalQuantity))
      .done()

    const discount = printQtyBreakpoint * 0.03 // 3% discount per qty breakpoint

    const markupMultiplier = add(
      divide(getMarkupMultiplier(variantUnitCostCents), 100),
      1,
    )

    const variantUnitRetailCents = chain(variantUnitCostCents)
      .multiply(markupMultiplier) // Apply markup
      .multiply(1 - discount) // Apply discounts
      // No markup/discount on fulfillment
      .add(fulfillmentCost)
      .done()

    return {
      catalogProductVariantId: variant.catalogProductVariantId,
      catalogProductId: variant.catalogProductId,
      unitCostCents: Math.floor(variantUnitCostCents),
      unitRetailPriceCents: Math.floor(variantUnitRetailCents),
      totalRetailPriceCents: Math.floor(
        multiply(variantUnitRetailCents, variant.quantity),
      ),
      quantity: variant.quantity,
    }
  })

  return {
    variants: variantQuotes,
  }
}

export default calculate
