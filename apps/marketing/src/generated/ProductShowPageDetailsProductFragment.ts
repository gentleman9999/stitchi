/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ProductShowPageDetailsProductFragment
// ====================================================

export interface ProductShowPageDetailsProductFragment_brand {
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
}

export interface ProductShowPageDetailsProductFragment_categories_edges_node {
  __typename: "Category";
  /**
   * The ID of an object
   */
  id: string;
  /**
   * Category name.
   */
  name: string;
  /**
   * Category path.
   */
  path: string;
}

export interface ProductShowPageDetailsProductFragment_categories_edges {
  __typename: "CategoryEdge";
  /**
   * The item at the end of the edge.
   */
  node: ProductShowPageDetailsProductFragment_categories_edges_node;
}

export interface ProductShowPageDetailsProductFragment_categories {
  __typename: "CategoryConnection";
  /**
   * A list of edges.
   */
  edges: (ProductShowPageDetailsProductFragment_categories_edges | null)[] | null;
}

export interface ProductShowPageDetailsProductFragment {
  __typename: "Product";
  /**
   * The ID of an object
   */
  id: string;
  /**
   * Description of the product.
   */
  description: string;
  /**
   * Brand associated with the product.
   */
  brand: ProductShowPageDetailsProductFragment_brand | null;
  /**
   * List of categories associated with the product.
   */
  categories: ProductShowPageDetailsProductFragment_categories;
}
