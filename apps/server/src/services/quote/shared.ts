import { sum } from 'mathjs'
import { logger } from '../../telemetry'

export const getMarkupMultiplier = (unitCost: number) => {
  let markup = 65
  if (unitCost <= 10_00) {
    markup = 65 // 65% markup
  } else if (unitCost >= 10_01 && unitCost <= 20_00) {
    markup = 60 // 60% markup
  } else if (unitCost >= 20_01 && unitCost <= 30_00) {
    markup = 55 // 55% markup
  } else if (unitCost >= 30_01 && unitCost <= 40_00) {
    markup = 50 // 50% markup
  } else if (unitCost >= 40_01) {
    markup = 45 // 45% markup
  }

  return markup
}

// Array depth 1: print qty
// Array depth 2: color count
const PRICE_COST_CENTS = [
  [3_05, 3_80, 4_55, null, null, null, null, null],
  [2_65, 3_10, 3_65, 4_10, 3_60, null, null, null],
  [1_80, 2_05, 2_30, 2_90, 3_40, 3_90, 4_35, null],
  [1_10, 1_60, 2_10, 2_60, 3_15, 3_65, 4_15, null],
  [90, 1_25, 1_45, 1_75, 2_15, 2_65, 2_85, 3_15],
  [85, 1_00, 1_25, 1_45, 1_65, 1_95, 3_10, 2_30],
  [70, 85, 1_00, 1_25, 1_55, 1_75, 1_95, 2_15],
  [65, 75, 95, 1_10, 1_40, 1_60, 1_70, 1_85],
  [58, 66, 76, 90, 1_10, 1_35, 1_50, 1_70],
  [55, 61, 65, 75, 85, 90, 1_00, 1_10],
  [45, 55, 60, 70, 75, 80, 85, 90],
]

const PRINT_QTY_BREAKPOINTS = [
  24, 47, 71, 143, 249, 499, 999, 2499, 4999, 7499, 9999,
]

export const FULFILLMENT_CHARGE = 1_00

export const SCREEN_CHARGE = 20_00 // per color

export const getPrintQtyBreakpoint = (qty: number) => {
  return PRINT_QTY_BREAKPOINTS.findIndex((bp, i) => {
    if (qty > bp) {
      // If this is the greatest breakpoint, return true
      if (!PRINT_QTY_BREAKPOINTS[i + 1]) {
        return true
      }

      if (qty < PRINT_QTY_BREAKPOINTS[i + 1]) {
        return true
      }
    } else if (i === 0) {
      return true
    }

    return false
  })
}

interface PrintLocation {
  colorCount: number
}

// Each print location's price is a factor of quatity and color count.
// Here we sum all of the print locations' costs in the event a design has more than 1 print location.
export const getPrintLocationsCost = (
  printQtyBreakpoint: number,
  printLocations: PrintLocation[],
) => {
  return sum(
    ...printLocations.map<number>((printLocation, i) => {
      const printCost =
        PRICE_COST_CENTS[printQtyBreakpoint][printLocation.colorCount - 1]

      if (!printCost) {
        logger.error(
          `Invalid color count for print location ${i + 1} (color count: ${
            printLocation.colorCount
          })`,
        )
        throw new Error(`Invalid color count for print location ${i + 1}`)
      }

      return printCost
    }),
  )
}
