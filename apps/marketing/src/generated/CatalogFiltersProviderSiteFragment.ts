/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: CatalogFiltersProviderSiteFragment
// ====================================================

export interface CatalogFiltersProviderSiteFragment_brands_edges_node_products_edges {
  __typename: "ProductEdge";
}

export interface CatalogFiltersProviderSiteFragment_brands_edges_node_products {
  __typename: "ProductConnection";
  /**
   * A list of edges.
   */
  edges: (CatalogFiltersProviderSiteFragment_brands_edges_node_products_edges | null)[] | null;
}

export interface CatalogFiltersProviderSiteFragment_brands_edges_node {
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
  products: CatalogFiltersProviderSiteFragment_brands_edges_node_products;
}

export interface CatalogFiltersProviderSiteFragment_brands_edges {
  __typename: "BrandEdge";
  /**
   * The item at the end of the edge.
   */
  node: CatalogFiltersProviderSiteFragment_brands_edges_node;
}

export interface CatalogFiltersProviderSiteFragment_brands {
  __typename: "BrandConnection";
  /**
   * A list of edges.
   */
  edges: (CatalogFiltersProviderSiteFragment_brands_edges | null)[] | null;
}

export interface CatalogFiltersProviderSiteFragment_categoryTree {
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

export interface CatalogFiltersProviderSiteFragment {
  __typename: "Site";
  /**
   * Details of the brand.
   */
  brands: CatalogFiltersProviderSiteFragment_brands;
  /**
   * A tree of categories.
   */
  categoryTree: CatalogFiltersProviderSiteFragment_categoryTree[];
}
