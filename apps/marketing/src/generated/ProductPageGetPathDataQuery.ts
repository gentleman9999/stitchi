/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ProductPageGetPathDataQuery
// ====================================================

export interface ProductPageGetPathDataQuery_site_products_edges_node_brand {
  __typename: "Brand";
  /**
   * The ID of an object
   */
  id: string;
  /**
   * Path for the brand page.
   */
  path: string;
}

export interface ProductPageGetPathDataQuery_site_products_edges_node {
  __typename: "Product";
  /**
   * The ID of an object
   */
  id: string;
  /**
   * Relative URL path to product page.
   */
  path: string;
  /**
   * Brand associated with the product.
   */
  brand: ProductPageGetPathDataQuery_site_products_edges_node_brand | null;
}

export interface ProductPageGetPathDataQuery_site_products_edges {
  __typename: "ProductEdge";
  /**
   * The item at the end of the edge.
   */
  node: ProductPageGetPathDataQuery_site_products_edges_node;
}

export interface ProductPageGetPathDataQuery_site_products {
  __typename: "ProductConnection";
  /**
   * A list of edges.
   */
  edges: (ProductPageGetPathDataQuery_site_products_edges | null)[] | null;
}

export interface ProductPageGetPathDataQuery_site {
  __typename: "Site";
  /**
   * Details of the products.
   */
  products: ProductPageGetPathDataQuery_site_products;
}

export interface ProductPageGetPathDataQuery {
  site: ProductPageGetPathDataQuery_site;
}
