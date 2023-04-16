/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { QuoteGeneratePrintLocationInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: ProductPricingCalculatorGetQuoteQuery
// ====================================================

export interface ProductPricingCalculatorGetQuoteQuery_quoteGenerate {
  __typename: "Quote";
  id: string;
  /**
   * The cost of the product with shipping, taxes, and other.
   */
  productTotalCostCents: number;
  /**
   * The cost of the product without shipping, taxes, or other.
   */
  productUnitCostCents: number;
}

export interface ProductPricingCalculatorGetQuoteQuery {
  /**
   * Generates a quote
   */
  quoteGenerate: ProductPricingCalculatorGetQuoteQuery_quoteGenerate | null;
}

export interface ProductPricingCalculatorGetQuoteQueryVariables {
  catalogProductVariantId: number;
  printLocations: QuoteGeneratePrintLocationInput[];
  quantity: number;
  includeFulfillment?: boolean | null;
}
