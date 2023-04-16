/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ProductPageGetSEODataQuery
// ====================================================

export interface ProductPageGetSEODataQuery_quoteGenerate {
  __typename: "Quote";
  id: string;
  /**
   * The cost of the product without shipping, taxes, or other.
   */
  productUnitCostCents: number;
}

export interface ProductPageGetSEODataQuery {
  /**
   * Generates a quote
   */
  quoteGenerate: ProductPageGetSEODataQuery_quoteGenerate | null;
}

export interface ProductPageGetSEODataQueryVariables {
  catalogProductVariantId: number;
}
