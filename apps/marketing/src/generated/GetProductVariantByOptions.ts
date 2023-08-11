/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { OptionValueId } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetProductVariantByOptions
// ====================================================

export interface GetProductVariantByOptions_site_product_variants_edges_node {
  __typename: "Variant";
  /**
   * The ID of an object
   */
  id: string;
  /**
   * Id of the variant.
   */
  entityId: number;
}

export interface GetProductVariantByOptions_site_product_variants_edges {
  __typename: "VariantEdge";
  /**
   * The item at the end of the edge.
   */
  node: GetProductVariantByOptions_site_product_variants_edges_node;
}

export interface GetProductVariantByOptions_site_product_variants {
  __typename: "VariantConnection";
  /**
   * A list of edges.
   */
  edges: (GetProductVariantByOptions_site_product_variants_edges | null)[] | null;
}

export interface GetProductVariantByOptions_site_product {
  __typename: "Product";
  /**
   * The ID of an object
   */
  id: string;
  /**
   * Variants associated with the product.
   */
  variants: GetProductVariantByOptions_site_product_variants;
}

export interface GetProductVariantByOptions_site {
  __typename: "Site";
  /**
   * A single product object with variant pricing overlay capabilities.
   */
  product: GetProductVariantByOptions_site_product | null;
}

export interface GetProductVariantByOptions {
  /**
   * A site
   */
  site: GetProductVariantByOptions_site;
}

export interface GetProductVariantByOptionsVariables {
  productEntityId: number;
  optionValueIds: OptionValueId[];
}
