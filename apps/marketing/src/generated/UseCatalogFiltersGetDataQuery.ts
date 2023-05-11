/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UseCatalogFiltersGetDataQuery
// ====================================================

export interface UseCatalogFiltersGetDataQuery_site_brands_edges_node_products_edges {
  __typename: "ProductEdge";
}

export interface UseCatalogFiltersGetDataQuery_site_brands_edges_node_products {
  __typename: "ProductConnection";
  /**
   * A list of edges.
   */
  edges: (UseCatalogFiltersGetDataQuery_site_brands_edges_node_products_edges | null)[] | null;
}

export interface UseCatalogFiltersGetDataQuery_site_brands_edges_node {
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
  products: UseCatalogFiltersGetDataQuery_site_brands_edges_node_products;
}

export interface UseCatalogFiltersGetDataQuery_site_brands_edges {
  __typename: "BrandEdge";
  /**
   * The item at the end of the edge.
   */
  node: UseCatalogFiltersGetDataQuery_site_brands_edges_node;
}

export interface UseCatalogFiltersGetDataQuery_site_brands {
  __typename: "BrandConnection";
  /**
   * A list of edges.
   */
  edges: (UseCatalogFiltersGetDataQuery_site_brands_edges | null)[] | null;
}

export interface UseCatalogFiltersGetDataQuery_site_categoryTree_children_children {
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

export interface UseCatalogFiltersGetDataQuery_site_categoryTree_children {
  __typename: "CategoryTreeItem";
  /**
   * The id category.
   */
  entityId: number;
  /**
   * The name of category.
   */
  name: string;
  /**
   * Subcategories of this category
   */
  children: UseCatalogFiltersGetDataQuery_site_categoryTree_children_children[];
}

export interface UseCatalogFiltersGetDataQuery_site_categoryTree {
  __typename: "CategoryTreeItem";
  /**
   * The id category.
   */
  entityId: number;
  /**
   * The name of category.
   */
  name: string;
  /**
   * Subcategories of this category
   */
  children: UseCatalogFiltersGetDataQuery_site_categoryTree_children[];
}

export interface UseCatalogFiltersGetDataQuery_site {
  __typename: "Site";
  /**
   * Details of the brand.
   */
  brands: UseCatalogFiltersGetDataQuery_site_brands;
  /**
   * A tree of categories.
   */
  categoryTree: UseCatalogFiltersGetDataQuery_site_categoryTree[];
}

export interface UseCatalogFiltersGetDataQuery {
  /**
   * A site
   */
  site: UseCatalogFiltersGetDataQuery_site;
}
