/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CatalogGetDataQuery
// ====================================================

export interface CatalogGetDataQuery_site_brands_edges_node_products_edges {
  __typename: "ProductEdge";
}

export interface CatalogGetDataQuery_site_brands_edges_node_products {
  __typename: "ProductConnection";
  /**
   * A list of edges.
   */
  edges: (CatalogGetDataQuery_site_brands_edges_node_products_edges | null)[] | null;
}

export interface CatalogGetDataQuery_site_brands_edges_node {
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
  /**
   * List of products associated with the brand.
   */
  products: CatalogGetDataQuery_site_brands_edges_node_products;
}

export interface CatalogGetDataQuery_site_brands_edges {
  __typename: "BrandEdge";
  /**
   * The item at the end of the edge.
   */
  node: CatalogGetDataQuery_site_brands_edges_node;
}

export interface CatalogGetDataQuery_site_brands {
  __typename: "BrandConnection";
  /**
   * A list of edges.
   */
  edges: (CatalogGetDataQuery_site_brands_edges | null)[] | null;
}

export interface CatalogGetDataQuery_site_categoryTree {
  __typename: "CategoryTreeItem";
  /**
   * The id category.
   */
  entityId: number;
  /**
   * The name of category.
   */
  name: string;
}

export interface CatalogGetDataQuery_site {
  __typename: "Site";
  /**
   * Details of the brand.
   */
  brands: CatalogGetDataQuery_site_brands;
  /**
   * A tree of categories.
   */
  categoryTree: CatalogGetDataQuery_site_categoryTree[];
}

export interface CatalogGetDataQuery {
  /**
   * A site
   */
  site: CatalogGetDataQuery_site;
}
