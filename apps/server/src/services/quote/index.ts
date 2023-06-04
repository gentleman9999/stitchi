import calculate from './calculateQuote'
import * as yup from 'yup'

const inputSchema = yup.object().shape({
  productPriceCents: yup.number().min(0).required(),
  quantity: yup.number().min(1).required(),
  includeFulfillment: yup.boolean().required(),
  printLocations: yup
    .array()
    .of(
      yup
        .object()
        .shape({
          colorCount: yup.number().min(1).required(),
        })
        .required(),
    )
    .required(),
})

export interface QuoteServiceQuote {
  productTotalCostCents: number
  productUnitCostCents: number
  printLocationCount: number
  printLocations: {
    colorCount: number
    priceCents: number
  }[]
}

export interface QuoteService {
  generateQuote(
    input: yup.InferType<typeof inputSchema>,
  ): Promise<QuoteServiceQuote>
}

interface MakeClientParams {}

type MakeClientFn = (params?: MakeClientParams) => QuoteService

const makeClient: MakeClientFn = () => {
  return {
    generateQuote: async input => {
      const validInput = await inputSchema.validate(input)

      return calculate(validInput)
    },
  }
}

export { makeClient }
