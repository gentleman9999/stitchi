/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { QuoteGeneratePrintLocationInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: ProductPricingCalculatorGetQuoteQuery
// ====================================================

export interface ProductPricingCalculatorGetQuoteQuery_site_product_quote {
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

export interface ProductPricingCalculatorGetQuoteQuery_site_product {
  __typename: "Product";
  /**
   * The ID of an object
   */
  id: string;
  quote: ProductPricingCalculatorGetQuoteQuery_site_product_quote;
}

export interface ProductPricingCalculatorGetQuoteQuery_site {
  __typename: "Site";
  /**
   * A single product object with variant pricing overlay capabilities.
   */
  product: ProductPricingCalculatorGetQuoteQuery_site_product | null;
}

export interface ProductPricingCalculatorGetQuoteQuery {
  /**
   * A site
   */
  site: ProductPricingCalculatorGetQuoteQuery_site;
}

export interface ProductPricingCalculatorGetQuoteQueryVariables {
  catalogProductVariantId: number;
  printLocations: QuoteGeneratePrintLocationInput[];
  quantity: number;
  includeFulfillment?: boolean | null;
}
