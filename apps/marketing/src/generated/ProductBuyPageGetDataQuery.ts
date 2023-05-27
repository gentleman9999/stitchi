/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ProductBuyPageGetDataQuery
// ====================================================

export interface ProductBuyPageGetDataQuery_site_route_node_Banner {
  __typename: "Banner" | "Blog" | "BlogPost" | "Brand" | "Category" | "ContactPage" | "NormalPage" | "RawHtmlPage" | "Variant";
  /**
   * The id of the object.
   */
  id: string;
}

export interface ProductBuyPageGetDataQuery_site_route_node_Product {
  __typename: "Product";
  /**
   * The ID of an object
   */
  id: string;
}

export type ProductBuyPageGetDataQuery_site_route_node = ProductBuyPageGetDataQuery_site_route_node_Banner | ProductBuyPageGetDataQuery_site_route_node_Product;

export interface ProductBuyPageGetDataQuery_site_route {
  __typename: "Route";
  /**
   * Node
   */
  node: ProductBuyPageGetDataQuery_site_route_node | null;
}

export interface ProductBuyPageGetDataQuery_site {
  __typename: "Site";
  /**
   * Route for a node
   */
  route: ProductBuyPageGetDataQuery_site_route;
}

export interface ProductBuyPageGetDataQuery {
  /**
   * A site
   */
  site: ProductBuyPageGetDataQuery_site;
}

export interface ProductBuyPageGetDataQueryVariables {
  path: string;
}
