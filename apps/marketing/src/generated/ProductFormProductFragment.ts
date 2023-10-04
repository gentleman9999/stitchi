/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ProductFormProductFragment
// ====================================================

export interface ProductFormProductFragment_brand {
  __typename: "Brand";
  /**
   * The ID of an object
   */
  id: string;
  /**
   * Name of the brand.
   */
  name: string;
}

export interface ProductFormProductFragment {
  __typename: "Product";
  /**
   * The ID of an object
   */
  id: string;
  /**
   * Name of the product.
   */
  name: string;
  /**
   * Brand associated with the product.
   */
  brand: ProductFormProductFragment_brand | null;
}
