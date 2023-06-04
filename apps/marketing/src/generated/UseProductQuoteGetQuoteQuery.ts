/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { QuoteGeneratePrintLocationInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: UseProductQuoteGetQuoteQuery
// ====================================================

export interface UseProductQuoteGetQuoteQuery_site_product_quote {
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

export interface UseProductQuoteGetQuoteQuery_site_product {
  __typename: "Product";
  /**
   * The ID of an object
   */
  id: string;
  quote: UseProductQuoteGetQuoteQuery_site_product_quote;
}

export interface UseProductQuoteGetQuoteQuery_site {
  __typename: "Site";
  /**
   * A single product object with variant pricing overlay capabilities.
   */
  product: UseProductQuoteGetQuoteQuery_site_product | null;
}

export interface UseProductQuoteGetQuoteQuery {
  /**
   * A site
   */
  site: UseProductQuoteGetQuoteQuery_site;
}

export interface UseProductQuoteGetQuoteQueryVariables {
  catalogProductEntityId: number;
  printLocations: QuoteGeneratePrintLocationInput[];
  quantity: number;
  includeFulfillment?: boolean | null;
}
