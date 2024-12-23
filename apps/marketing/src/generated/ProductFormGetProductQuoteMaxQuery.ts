/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ProductFormGetProductQuoteMaxQuery
// ====================================================

export interface ProductFormGetProductQuoteMaxQuery_site_product_maxQuote {
  __typename: "Quote";
  id: string;
  /**
   * The cost of the product without shipping, taxes, or other.
   */
  productUnitCostCents: number;
}

export interface ProductFormGetProductQuoteMaxQuery_site_product {
  __typename: "Product";
  /**
   * The ID of an object
   */
  id: string;
  maxQuote: ProductFormGetProductQuoteMaxQuery_site_product_maxQuote;
}

export interface ProductFormGetProductQuoteMaxQuery_site {
  __typename: "Site";
  /**
   * A single product object with variant pricing overlay capabilities.
   */
  product: ProductFormGetProductQuoteMaxQuery_site_product | null;
}

export interface ProductFormGetProductQuoteMaxQuery {
  /**
   * A site
   */
  site: ProductFormGetProductQuoteMaxQuery_site;
}

export interface ProductFormGetProductQuoteMaxQueryVariables {
  productId: string;
}
