/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: CatalogIndexPageSiteFragment
// ====================================================

export interface CatalogIndexPageSiteFragment_brands_edges_node_products_edges {
  __typename: "ProductEdge";
}

export interface CatalogIndexPageSiteFragment_brands_edges_node_products {
  __typename: "ProductConnection";
  /**
   * A list of edges.
   */
  edges: (CatalogIndexPageSiteFragment_brands_edges_node_products_edges | null)[] | null;
}

export interface CatalogIndexPageSiteFragment_brands_edges_node {
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
  products: CatalogIndexPageSiteFragment_brands_edges_node_products;
}

export interface CatalogIndexPageSiteFragment_brands_edges {
  __typename: "BrandEdge";
  /**
   * The item at the end of the edge.
   */
  node: CatalogIndexPageSiteFragment_brands_edges_node;
}

export interface CatalogIndexPageSiteFragment_brands {
  __typename: "BrandConnection";
  /**
   * A list of edges.
   */
  edges: (CatalogIndexPageSiteFragment_brands_edges | null)[] | null;
}

export interface CatalogIndexPageSiteFragment_categoryTree {
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

export interface CatalogIndexPageSiteFragment {
  __typename: "Site";
  /**
   * Details of the brand.
   */
  brands: CatalogIndexPageSiteFragment_brands;
  /**
   * A tree of categories.
   */
  categoryTree: CatalogIndexPageSiteFragment_categoryTree[];
}
