import { add, chain, divide, multiply, sum } from 'mathjs'

const getMarkupMultiplier = (unitCost: number) => {
  let markup = 100
  if (unitCost <= 10_00) {
    markup = 100 // 100% markup
  } else if (unitCost >= 10_01 && unitCost <= 20_00) {
    markup = 90 // 90% markup
  } else if (unitCost >= 20_01 && unitCost <= 30_00) {
    markup = 80 // 80% markup
  } else if (unitCost >= 30_01 && unitCost <= 40_00) {
    markup = 70 // 70% markup
  } else if (unitCost >= 40_01) {
    markup = 60 // 60% markup
  }
  return markup
}

const calculate = async ({
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
  const fulfillmentCost = includeFulfillment ? 1_00 : 0_00

  const SCREEN_CHARGE = 20_00 // per color

  const PRINT_QTY_BREAKPOINTS = [
    24, 47, 71, 143, 249, 499, 999, 2499, 4999, 7499, 9999,
  ]

  // Array depth 1: print qty
  // Array depth 2: color count
  const PRICE_COST_CENTS = [
    [3_05, 3_80, 4_55, null, null, null, null, null],
    [2_65, 3_10, 3_65, 4_10, 3_60, null, null, null],
    [1_80, 2_05, 2_30, 2_90, 3_40, 3_90, 4_35, null],
    [1_10, 1_60, 2_10, 2_60, 3_15, 3_65, 4_15, null],
    [0_90, 1_25, 1_45, 1_75, 2_15, 2_65, 2_85, 3_15],
    [0_85, 1_00, 1_25, 1_45, 1_65, 1_95, 3_10, 2_30],
    [0_70, 0_85, 1_00, 1_25, 1_55, 1_75, 1_95, 2_15],
    [0_65, 0_75, 0_95, 1_10, 1_40, 1_60, 1_70, 1_85],
    [0_58, 0_66, 0_76, 0_90, 1_10, 1_35, 1_50, 1_70],
    [0_55, 0_61, 0_65, 0_75, 0_85, 0_90, 1_00, 1_10],
    [0_45, 0_55, 0_60, 0_70, 0_75, 0_80, 0_85, 0_90],
  ]

  const printQtyBreakpoint = PRINT_QTY_BREAKPOINTS.findIndex((bp, i) => {
    if (quantity > bp) {
      // If this is the greatest breakpoint, return true
      if (!PRINT_QTY_BREAKPOINTS[i + 1]) {
        return true
      }

      if (quantity < PRINT_QTY_BREAKPOINTS[i + 1]) {
        return true
      }
    } else if (i === 0) {
      return true
    }

    return false
  })

  const printLocationCosts = printLocations.map<number>((printLocation, i) => {
    const printCost =
      PRICE_COST_CENTS[printQtyBreakpoint][printLocation.colorCount - 1]

    if (!printCost) {
      throw new Error(`Invalid color count for print location ${i + 1}`)
    }

    return printCost
  })

  const totalColorCount: number = sum(...printLocations.map(l => l.colorCount))

  const printLocationsTotalCost: number = sum(...printLocationCosts)

  const screenCost = multiply(totalColorCount, SCREEN_CHARGE)

  const productTotalCostCents = chain(printLocationsTotalCost)
    .add(productPriceCents)
    .add(divide(screenCost, quantity))
    .done()

  const markupMultiplier = add(
    divide(getMarkupMultiplier(productTotalCostCents), 100),
    1,
  )

  const productRetailCents = chain(productTotalCostCents)
    .multiply(markupMultiplier)
    // No markup on fulfillment
    .add(fulfillmentCost)
    .multiply(quantity)
    .done()

  const productUnitRetailCents = divide(productRetailCents, quantity)

  return {
    productTotalCostCents: Math.floor(productUnitRetailCents),
    productUnitCostCents: Math.floor(productUnitRetailCents),
    printLocationCount: printLocations.length,
    printLocations: printLocations.map((location, i) => ({
      colorCount: location.colorCount,
      priceCents: Math.floor(printLocationCosts[i]),
    })),
  }
}

export default calculate
