import { inputObjectType, mutationField, nonNull, objectType } from 'nexus'
import { GraphQLError } from 'graphql'
import { add, multiply, sum } from 'mathjs'

export const QuoteGeneratePrintLocationInput = inputObjectType({
  name: 'QuoteGeneratePrintLocationInput',
  definition(t) {
    t.nonNull.int('colorCount')
  },
})

export const QuoteGenerateInput = inputObjectType({
  name: 'QuoteGenerateInput',
  definition(t) {
    t.nonNull.int('catalogProductId')
    t.nonNull.int('quantity')
    t.nonNull.list.nonNull.field('printLocations', {
      type: 'QuoteGeneratePrintLocationInput',
    })
  },
})

export const QuoteGeneratePayload = objectType({
  name: 'QuoteGeneratePayload',
  definition(t) {
    t.nonNull.field('quote', {
      type: 'Quote',
    })
  },
})

export const quoteGenerate = mutationField('quoteGenerate', {
  description: 'Generates a quote',
  type: 'QuoteGeneratePayload',
  args: {
    input: nonNull('QuoteGenerateInput'),
  },
  resolve: async (_, { input }, ctx) => {
    const totalColors: number = sum(input.printLocations.map(l => l.colorCount))
    const garmentPrice = 0_00

    const SCREEN_CHARGE = 20_00 // per color

    const PRINT_QTY_BREAKPOINTS = [
      24, 47, 71, 143, 249, 499, 999, 2499, 4999, 7499, 9999,
    ]

    // Array depth 1: print qty
    // Array depth 2: color count
    const PRICE_COST_CENTS = [
      [3.05, 3.8, 4.55, null, null, null, null],
      [2.65, 3.1, 3.65, 4.1, 3.6, null, null],
      [1.8, 2.05, 2.3, 2.9, 3.4, 3.9, 4.35],
      [1.1, 1.6, 2.1, 2.6, 3.15, 3.65, 4.15],
      [0.9, 1.25, 1.45, 1.75, 2.15, 2.65, 2.85],
      [0.85, 1, 1.25, 1.45, 1.65, 1.95, 3.1],
      [0.7, 0.85, 1, 1.25, 1.55, 1.75, 1.95],
      [0.65, 0.75, 0.95, 1.1, 1.4, 1.6, 1.7],
      [0.58, 0.66, 0.76, 0.9, 1.1, 1.35, 1.5],
      [0.55, 0.61, 0.65, 0.75, 0.85, 0.9, 1],
      [0.45, 0.55, 0.6, 0.7, 0.75, 0.8, 0.85],
    ]

    const printQtyBreakpoint = PRINT_QTY_BREAKPOINTS.findIndex(
      (bp, i) =>
        input.quantity > bp && input.quantity <= PRINT_QTY_BREAKPOINTS[i + 1],
    )

    const printLocationCosts = input.printLocations.map((printLocation, i) => {
      const printCost =
        PRICE_COST_CENTS[printQtyBreakpoint][printLocation.colorCount - 1]

      if (!printCost) {
        throw new GraphQLError(
          `Invalid color count for print location ${i + 1}`,
        )
      }

      const colorCost = multiply(printLocation.colorCount, SCREEN_CHARGE)

      return add(printCost, colorCost)
    })

    // Final cost is the sum of all print locations,
    // plus the screen charge for each color
    const totalScreenCosts = multiply(totalColors, SCREEN_CHARGE)
    const totalCostInCents: number = sum(
      totalScreenCosts,
      ...printLocationCosts,
    )

    return {
      quote: {
        totalCostInCents,
        id: '',
        printLocationCount: input.printLocations.length,
        printLocations: input.printLocations.map((location, i) => ({
          colorCount: location.colorCount,
          priceCents: printLocationCosts[i],
        })),
      },
    }
  },
})
