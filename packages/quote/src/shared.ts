import { sum } from 'mathjs'

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
const PRINT_PRICE_COST_CENTS = [
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

const EMBROIDERY_PRICE_COST_CENTS = [
  4_35, 4_15, 3_75
]

const ALTER_EMBROIDERY_PRICE_COST_CENTS = [
  3_45, 3_25, 3_00
]

const EMBROIDERY_QTY_BREAKPOINTS = [
  30, 49, 100
]

export const FULFILLMENT_CHARGE = 1_00

export const SCREEN_CHARGE = 20_00 // per color

export const getPrintQtyBreakpoint = (qty: number) => {
  return PRINT_QTY_BREAKPOINTS.findIndex((bp, i) => {
    if (qty > bp) {
      if (PRINT_QTY_BREAKPOINTS[i + 1] === undefined) {
        return true
      }

      return false
    }

    return true
  })
}

export const getEmbroideryQtyBreakpoint = (qty: number) => {
  return EMBROIDERY_QTY_BREAKPOINTS.findIndex((bp, i) => {
    if (qty > bp) {
      if (EMBROIDERY_QTY_BREAKPOINTS[i + 1] === undefined) {
        return true
      }

      return false
    }

    return true
  })
}

export enum EmbellishmentType {
  SCREEN_PRINTING = 'SCREEN_PRINTING',
  EMBROIDERY = 'EMBROIDERY',
}

export interface ScreenPrintingLocation {
  colorCount: number;
  embellishmentType: EmbellishmentType.SCREEN_PRINTING;
}

interface EmbroideryLocation {
  embellishmentType: EmbellishmentType.EMBROIDERY;
}

export type PrintLocation = ScreenPrintingLocation | EmbroideryLocation;

// Each print location's price is a factor of quatity and color count.
// Here we sum all of the print locations' costs in the event a design has more than 1 print location.
export const getPrintLocationsCost = (
  printQtyBreakpoint: number,
  embroideryQtyBreakpoint: number,
  printLocations: PrintLocation[],
): [Error, null] | [null, number] => {
  let twoOrMoreEmbroidery = false;
  const printCostArray = printLocations.map<number | null>(
    (printLocation, i) => {

      if(printLocation.embellishmentType === EmbellishmentType.EMBROIDERY) {
        const embroideryCost = twoOrMoreEmbroidery ? ALTER_EMBROIDERY_PRICE_COST_CENTS[embroideryQtyBreakpoint] : EMBROIDERY_PRICE_COST_CENTS[embroideryQtyBreakpoint]
        twoOrMoreEmbroidery = true;

        return embroideryCost
      } else {
        const colorCount = printLocation.colorCount ?? 1;
        const printCost = PRINT_PRICE_COST_CENTS[printQtyBreakpoint][colorCount - 1]

        if (!printCost) {
          return null
        }

        return printCost
      }
    },
  )
  for (const printCostIdx in printCostArray) {
    const printCost = printCostArray[printCostIdx]
    if (printCost === null) {
      return [
        new Error(`Invalid color count for print location ${printCostIdx + 1}`),
        null,
      ]
    }
  }

  return [null, sum(0, ...(printCostArray as number[]))]
}
