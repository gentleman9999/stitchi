/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: PromotionalProductsDesigngetDataQuery
// ====================================================

export interface PromotionalProductsDesigngetDataQuery_site_featuredProducts_edges_node_brand {
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

export interface PromotionalProductsDesigngetDataQuery_site_featuredProducts_edges_node_defaultImage {
  __typename: "Image";
  /**
   * Absolute path to image using store CDN.
   */
  url: string;
}

export interface PromotionalProductsDesigngetDataQuery_site_featuredProducts_edges_node {
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
   * Relative URL path to product page.
   */
  path: string;
  /**
   * Brand associated with the product.
   */
  brand: PromotionalProductsDesigngetDataQuery_site_featuredProducts_edges_node_brand | null;
  /**
   * Default image for a product.
   */
  defaultImage: PromotionalProductsDesigngetDataQuery_site_featuredProducts_edges_node_defaultImage | null;
}

export interface PromotionalProductsDesigngetDataQuery_site_featuredProducts_edges {
  __typename: "ProductEdge";
  /**
   * The item at the end of the edge.
   */
  node: PromotionalProductsDesigngetDataQuery_site_featuredProducts_edges_node;
}

export interface PromotionalProductsDesigngetDataQuery_site_featuredProducts {
  __typename: "ProductConnection";
  /**
   * A list of edges.
   */
  edges: (PromotionalProductsDesigngetDataQuery_site_featuredProducts_edges | null)[] | null;
}

export interface PromotionalProductsDesigngetDataQuery_site {
  __typename: "Site";
  /**
   * Details of the featured products.
   */
  featuredProducts: PromotionalProductsDesigngetDataQuery_site_featuredProducts;
}

export interface PromotionalProductsDesigngetDataQuery {
  /**
   * A site
   */
  site: PromotionalProductsDesigngetDataQuery_site;
}
