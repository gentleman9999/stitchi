/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ProductPageGetDataQuery
// ====================================================

export interface ProductPageGetDataQuery_site_brands_edges_node_products_edges {
  __typename: "ProductEdge";
}

export interface ProductPageGetDataQuery_site_brands_edges_node_products {
  __typename: "ProductConnection";
  /**
   * A list of edges.
   */
  edges: (ProductPageGetDataQuery_site_brands_edges_node_products_edges | null)[] | null;
}

export interface ProductPageGetDataQuery_site_brands_edges_node {
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
  products: ProductPageGetDataQuery_site_brands_edges_node_products;
}

export interface ProductPageGetDataQuery_site_brands_edges {
  __typename: "BrandEdge";
  /**
   * The item at the end of the edge.
   */
  node: ProductPageGetDataQuery_site_brands_edges_node;
}

export interface ProductPageGetDataQuery_site_brands {
  __typename: "BrandConnection";
  /**
   * A list of edges.
   */
  edges: (ProductPageGetDataQuery_site_brands_edges | null)[] | null;
}

export interface ProductPageGetDataQuery_site_categoryTree {
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

export interface ProductPageGetDataQuery_site_route_node_Brand {
  __typename: "Brand" | "Category" | "Variant";
  /**
   * The id of the object.
   */
  id: string;
}

export interface ProductPageGetDataQuery_site_route_node_Product {
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
   * Description of the product.
   */
  description: string;
}

export type ProductPageGetDataQuery_site_route_node = ProductPageGetDataQuery_site_route_node_Brand | ProductPageGetDataQuery_site_route_node_Product;

export interface ProductPageGetDataQuery_site_route {
  __typename: "Route";
  /**
   * node
   */
  node: ProductPageGetDataQuery_site_route_node | null;
}

export interface ProductPageGetDataQuery_site {
  __typename: "Site";
  /**
   * Details of the brand.
   */
  brands: ProductPageGetDataQuery_site_brands;
  categoryTree: ProductPageGetDataQuery_site_categoryTree[];
  /**
   * Route for a node
   */
  route: ProductPageGetDataQuery_site_route;
}

export interface ProductPageGetDataQuery {
  site: ProductPageGetDataQuery_site;
}

export interface ProductPageGetDataQueryVariables {
  path: string;
}
