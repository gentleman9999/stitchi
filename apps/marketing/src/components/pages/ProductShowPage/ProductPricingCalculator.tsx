import React from 'react'
import { Button } from '@components/ui'
import routes from '@lib/routes'
import Link from 'next/link'
import { gql, useMutation } from '@apollo/client'
import {
  ProducProductPricingCalculatorCreateQuoteMutation,
  ProducProductPricingCalculatorCreateQuoteMutationVariables,
} from '@generated/ProducProductPricingCalculatorCreateQuoteMutation'
import CalculatorForm, { Props as CalculatorFormProps } from './CalculatorForm'
import currency from 'currency.js'

interface Props {
  catalogProductId: number
}

const ProductPricingCalculator = (props: Props) => {
  const [showCalculator, setShowCalculator] = React.useState(false)
  const [createQuote, { data }] = useMutation<
    ProducProductPricingCalculatorCreateQuoteMutation,
    ProducProductPricingCalculatorCreateQuoteMutationVariables
  >(CREATE_QUOTE)

  const handleCreateQuote: CalculatorFormProps['onSubmit'] = async ({
    quantity,
    printLocations,
  }) => {
    await createQuote({
      variables: {
        input: {
          quantity,
          printLocations,
          catalogProductId: props.catalogProductId,
        },
      },
    })
  }

  const { totalCostInCents } = data?.quoteGenerate?.quote || {}

  return (
    <>
      <div className="flex flex-col gap-5 p-4 rounded-md border">
        {showCalculator ? (
          <>
            <CalculatorForm onSubmit={handleCreateQuote} />
            {totalCostInCents ? (
              <>{currency(totalCostInCents, { fromCents: true }).format()}</>
            ) : null}
          </>
        ) : (
          <>
            <Button
              slim
              color="primary"
              variant="ghost"
              className="w-full !rounded-sm"
              onClick={() => setShowCalculator(true)}
            >
              Get instant quote
            </Button>
            <Button
              slim
              Component={Link}
              color="brandPrimary"
              className="w-full !rounded-sm"
              href={routes.internal.getStarted.href()}
            >
              Talk to a designer
            </Button>
          </>
        )}
      </div>
    </>
  )
}

export const CREATE_QUOTE = gql`
  mutation ProducProductPricingCalculatorCreateQuoteMutation(
    $input: QuoteGenerateInput!
  ) {
    quoteGenerate(input: $input) {
      quote {
        id
        totalCostInCents
      }
    }
  }
`

export default ProductPricingCalculator
