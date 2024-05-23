import { gql, useMutation } from '@apollo/client'
import {
  CatalogProductQuoteCreateInput,
  ProductFormCreateQuoteMutation,
  ProductFormCreateQuoteMutationVariables,
} from '@generated/types'
import deepEqual from 'deep-equal'
import React from 'react'

const useProductQuote = ({
  catalogProductId,
}: {
  catalogProductId: string
}) => {
  const [prevValues, setPrevValues] = React.useState<Omit<
    CatalogProductQuoteCreateInput,
    'catalogProductId'
  > | null>(null)
  const [create, createQuoteMutation] = useMutation<
    ProductFormCreateQuoteMutation,
    ProductFormCreateQuoteMutationVariables
  >(CREATE_QUOTE)

  const createQuote = async (
    input: Omit<CatalogProductQuoteCreateInput, 'catalogProductId'>,
  ) => {
    const addons = input.addons.length
      ? input.addons
      : [
          {
            printLocation: {
              colorCount: 1,
              embellishmentType: 'screen print'
            },
          },
        ]

    if (!deepEqual(input, prevValues)) {
      create({
        variables: {
          input: {
            ...input,
            addons,
            catalogProductId,
          },
        },
      })

      setPrevValues(input)
    }
  }

  return {
    createQuote,
    quote: createQuoteMutation.data?.catalogProductQuoteCreate?.quote,
    loading: createQuoteMutation.loading,
  }
}

const CREATE_QUOTE = gql`
  mutation ProductFormCreateQuoteMutation(
    $input: CatalogProductQuoteCreateInput!
  ) {
    catalogProductQuoteCreate(input: $input) {
      quote {
        id
        productUnitCostCents
      }
    }
  }
`

export default useProductQuote
