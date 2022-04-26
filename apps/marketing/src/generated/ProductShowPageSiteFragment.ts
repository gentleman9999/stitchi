/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ProductShowPageSiteFragment
// ====================================================

export interface ProductShowPageSiteFragment_brands_edges_node_products_edges {
  __typename: "ProductEdge";
}

export interface ProductShowPageSiteFragment_brands_edges_node_products {
  __typename: "ProductConnection";
  /**
   * A list of edges.
   */
  edges: (ProductShowPageSiteFragment_brands_edges_node_products_edges | null)[] | null;
}

export interface ProductShowPageSiteFragment_brands_edges_node {
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
  products: ProductShowPageSiteFragment_brands_edges_node_products;
}

export interface ProductShowPageSiteFragment_brands_edges {
  __typename: "BrandEdge";
  /**
   * The item at the end of the edge.
   */
  node: ProductShowPageSiteFragment_brands_edges_node;
}

export interface ProductShowPageSiteFragment_brands {
  __typename: "BrandConnection";
  /**
   * A list of edges.
   */
  edges: (ProductShowPageSiteFragment_brands_edges | null)[] | null;
}

export interface ProductShowPageSiteFragment_categoryTree {
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

export interface ProductShowPageSiteFragment {
  __typename: "Site";
  /**
   * Details of the brand.
   */
  brands: ProductShowPageSiteFragment_brands;
  categoryTree: ProductShowPageSiteFragment_categoryTree[];
}
