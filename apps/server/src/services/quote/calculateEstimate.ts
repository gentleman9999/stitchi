import { add, chain, divide, multiply, sum } from 'mathjs'
import {
  FULFILLMENT_CHARGE,
  SCREEN_CHARGE,
  getMarkupMultiplier,
  getPrintLocationsCost,
  getPrintQtyBreakpoint,
} from './shared'

const calculate = ({
  productPriceCents,
  includeFulfillment,
  quantity,
  printLocations,
}: {
  productPriceCents: number
  quantity: number
  includeFulfillment: boolean
  printLocations: { colorCount: number }[]
}) => {
  const fulfillmentCost = includeFulfillment ? FULFILLMENT_CHARGE : 0

  const printQtyBreakpoint = getPrintQtyBreakpoint(quantity)

  const printLocationsCosts = getPrintLocationsCost(
    printQtyBreakpoint,
    printLocations,
  )

  const totalColorCount: number = sum(...printLocations.map(l => l.colorCount))

  const screenCost = multiply(totalColorCount, SCREEN_CHARGE)

  const productTotalCostCents = chain(printLocationsCosts)
    .add(productPriceCents)
    .add(divide(screenCost, quantity))
    .done()

  const markupMultiplier = add(
    divide(getMarkupMultiplier(productTotalCostCents), 100),
    1,
  )

  const discount = printQtyBreakpoint * 0.025 // 2.25% discount per qty breakpoint

  const productRetailCents = chain(productTotalCostCents)
    .multiply(markupMultiplier) // Apply markup
    .multiply(1 - discount) // Apply discounts
    // No markup/discount on fulfillment
    .add(fulfillmentCost)
    .multiply(quantity)
    .done()

  const productUnitRetailCents = divide(productRetailCents, quantity)

  return {
    productTotalCostCents: Math.floor(productRetailCents),
    productUnitCostCents: Math.floor(productUnitRetailCents),
    printLocationCount: printLocations.length,
  }
}

export default calculate
