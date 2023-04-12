/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { QuoteGenerateInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: ProducProductPricingCalculatorCreateQuoteMutation
// ====================================================

export interface ProducProductPricingCalculatorCreateQuoteMutation_quoteGenerate_quote {
  __typename: "Quote";
  id: string;
  totalCostInCents: number;
}

export interface ProducProductPricingCalculatorCreateQuoteMutation_quoteGenerate {
  __typename: "QuoteGeneratePayload";
  quote: ProducProductPricingCalculatorCreateQuoteMutation_quoteGenerate_quote;
}

export interface ProducProductPricingCalculatorCreateQuoteMutation {
  /**
   * Generates a quote
   */
  quoteGenerate: ProducProductPricingCalculatorCreateQuoteMutation_quoteGenerate | null;
}

export interface ProducProductPricingCalculatorCreateQuoteMutationVariables {
  input: QuoteGenerateInput;
}
