/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { QuoteGeneratePrintLocationInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: ProductFormGetProductQuoteQuery
// ====================================================

export interface ProductFormGetProductQuoteQuery_site_product_quote {
  __typename: "Quote";
  id: string;
  /**
   * The cost of the product without shipping, taxes, or other.
   */
  productUnitCostCents: number;
}

export interface ProductFormGetProductQuoteQuery_site_product {
  __typename: "Product";
  /**
   * The ID of an object
   */
  id: string;
  quote: ProductFormGetProductQuoteQuery_site_product_quote;
}

export interface ProductFormGetProductQuoteQuery_site {
  __typename: "Site";
  /**
   * A single product object with variant pricing overlay capabilities.
   */
  product: ProductFormGetProductQuoteQuery_site_product | null;
}

export interface ProductFormGetProductQuoteQuery {
  /**
   * A site
   */
  site: ProductFormGetProductQuoteQuery_site;
}

export interface ProductFormGetProductQuoteQueryVariables {
  productId: string;
  quantity: number;
  printLocations: QuoteGeneratePrintLocationInput[];
}
