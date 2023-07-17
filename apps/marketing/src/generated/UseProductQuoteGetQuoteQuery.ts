/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UseProductQuoteGetQuoteQuery
// ====================================================

export interface UseProductQuoteGetQuoteQuery_designProduct_quote {
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

export interface UseProductQuoteGetQuoteQuery_designProduct {
  __typename: "DesignProduct";
  id: string;
  quote: UseProductQuoteGetQuoteQuery_designProduct_quote | null;
}

export interface UseProductQuoteGetQuoteQuery {
  designProduct: UseProductQuoteGetQuoteQuery_designProduct | null;
}

export interface UseProductQuoteGetQuoteQueryVariables {
  designProductId: string;
  quantity: number;
}
