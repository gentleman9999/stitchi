/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: UseBrandFiltersSiteFragment
// ====================================================

export interface UseBrandFiltersSiteFragment_brands_edges_node_products_edges {
  __typename: "ProductEdge";
}

export interface UseBrandFiltersSiteFragment_brands_edges_node_products {
  __typename: "ProductConnection";
  /**
   * A list of edges.
   */
  edges: (UseBrandFiltersSiteFragment_brands_edges_node_products_edges | null)[] | null;
}

export interface UseBrandFiltersSiteFragment_brands_edges_node {
  __typename: "Brand";
  /**
   * The ID of an object
   */
  id: string;
  /**
   * Name of the brand.
   */
  name: string;
  /**
   * Path for the brand page.
   */
  path: string;
  /**
   * Id of the brand.
   */
  entityId: number;
  products: UseBrandFiltersSiteFragment_brands_edges_node_products;
}

export interface UseBrandFiltersSiteFragment_brands_edges {
  __typename: "BrandEdge";
  /**
   * The item at the end of the edge.
   */
  node: UseBrandFiltersSiteFragment_brands_edges_node;
}

export interface UseBrandFiltersSiteFragment_brands {
  __typename: "BrandConnection";
  /**
   * A list of edges.
   */
  edges: (UseBrandFiltersSiteFragment_brands_edges | null)[] | null;
}

export interface UseBrandFiltersSiteFragment {
  __typename: "Site";
  /**
   * Details of the brand.
   */
  brands: UseBrandFiltersSiteFragment_brands;
}
