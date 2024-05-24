import { add, chain, divide, multiply, sum } from 'mathjs'
import {
  FULFILLMENT_CHARGE,
  SCREEN_CHARGE,
  getMarkupMultiplier,
  getPrintLocationsCost,
  getPrintQtyBreakpoint,
  getEmbroideryQtyBreakpoint,
  EmbellishmentType,
  PrintLocation,
  ScreenPrintingLocation
} from './shared'

type VariantMetadata = Record<string, any>

type VariantInput<T extends VariantMetadata> = T & {
  quantity: number
  priceCents: number
}

type VariantResponse<T extends VariantMetadata> = T & {
  quantity: number
  unitCostCents: number
  unitRetailPriceCents: number
  totalRetailPriceCents: number
}

export interface Input<T extends VariantMetadata> {
  includeFulfillment: boolean
  printLocations: PrintLocation[]
  variants: VariantInput<T>[]
}

interface Quote<T extends VariantMetadata> {
  totalRetailPriceCents: number
  unitRetailPriceCents: number
  variants: VariantResponse<T>[]
}

const calculate = <T extends VariantMetadata>({
  includeFulfillment,
  printLocations,
  variants,
}: Input<T>): [Error, null] | [null, Quote<T>] => {
  const fulfillmentCost = includeFulfillment ? FULFILLMENT_CHARGE : 0
  const totalQuantity = sum(0, ...variants.map(v => v.quantity))
  const printQtyBreakpoint = getPrintQtyBreakpoint(totalQuantity)
  const embroideryQtyBreakpoint = getEmbroideryQtyBreakpoint(totalQuantity)

  const [error, printLocationsCosts] = getPrintLocationsCost(
    printQtyBreakpoint,
    embroideryQtyBreakpoint,
    printLocations,
  )

  if (error) {
    return [error, null]
  }

  const totalColorCount: number = sum(
    0,
    ...printLocations
      .filter((location): location is ScreenPrintingLocation => location.embellishmentType === EmbellishmentType.SCREEN_PRINTING)
      .map(l => l.colorCount)
  )
  const screenCost = multiply(totalColorCount, SCREEN_CHARGE)
  const digitizationCost: number = printLocations.some(location => 
    location.embellishmentType === EmbellishmentType.EMBROIDERY
  ) ? 5000 : 0;

  const variantQuotes = variants.map(variant => {

    const variantUnitCostCents = chain(printLocationsCosts)
      .add(variant.priceCents)
      .add(divide(sum(screenCost, digitizationCost), totalQuantity))
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

    const { priceCents, quantity, ...metadata } = variant

    return {
      ...metadata,
      unitCostCents: Math.floor(variantUnitCostCents),
      unitRetailPriceCents: Math.floor(variantUnitRetailCents),
      totalRetailPriceCents: Math.floor(
        multiply(variantUnitRetailCents, variant.quantity),
      ),
      quantity: variant.quantity,
    }
  })
  
  return [
    null,
    {
      variants: variantQuotes as any,
      totalRetailPriceCents: sum(
        0,
        ...variantQuotes.map(v => v.totalRetailPriceCents),
      ),
      unitRetailPriceCents: Math.floor(
        divide(
          sum(0, ...variantQuotes.map(v => v.unitRetailPriceCents)),
          variantQuotes.length || 1,
        )
      ),
    },
  ]
}

export const makeCalculate = (): typeof calculate => {
  return args => calculate(args)
}
