/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: CatalogIndexPageCatalogFragment
// ====================================================

export interface CatalogIndexPageCatalogFragment_products_nodes_image {
  __typename: "Image";
  id: string;
  url: string;
}

export interface CatalogIndexPageCatalogFragment_products_nodes_manufacturer {
  __typename: "Manufacturer";
  name: string;
}

export interface CatalogIndexPageCatalogFragment_products_nodes_colors {
  __typename: "Color";
  id: string;
  hex: string | null;
}

export interface CatalogIndexPageCatalogFragment_products_nodes {
  __typename: "Material";
  id: string;
  name: string;
  variantCount: number;
  image: CatalogIndexPageCatalogFragment_products_nodes_image | null;
  manufacturer: CatalogIndexPageCatalogFragment_products_nodes_manufacturer | null;
  colors: CatalogIndexPageCatalogFragment_products_nodes_colors[] | null;
}

export interface CatalogIndexPageCatalogFragment_products {
  __typename: "MaterialConnection";
  /**
   * Flattened list of Material type
   */
  nodes: (CatalogIndexPageCatalogFragment_products_nodes | null)[] | null;
}

export interface CatalogIndexPageCatalogFragment {
  __typename: "Catalog";
  id: string;
  products: CatalogIndexPageCatalogFragment_products | null;
}
