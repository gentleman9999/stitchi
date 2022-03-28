/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { MaterialFilterArg } from "./globalTypes";

// ====================================================
// GraphQL query operation: CatalogIndexPageGetDataQuery
// ====================================================

export interface CatalogIndexPageGetDataQuery_catalog_products_nodes_image {
  __typename: "Image";
  id: string;
  url: string;
}

export interface CatalogIndexPageGetDataQuery_catalog_products_nodes_manufacturer {
  __typename: "Manufacturer";
  name: string;
}

export interface CatalogIndexPageGetDataQuery_catalog_products_nodes_colors {
  __typename: "Color";
  id: string;
  hex: string | null;
}

export interface CatalogIndexPageGetDataQuery_catalog_products_nodes {
  __typename: "Material";
  id: string;
  name: string;
  variantCount: number;
  image: CatalogIndexPageGetDataQuery_catalog_products_nodes_image | null;
  manufacturer: CatalogIndexPageGetDataQuery_catalog_products_nodes_manufacturer | null;
  colors: CatalogIndexPageGetDataQuery_catalog_products_nodes_colors[] | null;
}

export interface CatalogIndexPageGetDataQuery_catalog_products {
  __typename: "MaterialConnection";
  /**
   * Flattened list of Material type
   */
  nodes: (CatalogIndexPageGetDataQuery_catalog_products_nodes | null)[] | null;
}

export interface CatalogIndexPageGetDataQuery_catalog {
  __typename: "Catalog";
  id: string;
  products: CatalogIndexPageGetDataQuery_catalog_products | null;
}

export interface CatalogIndexPageGetDataQuery {
  catalog: CatalogIndexPageGetDataQuery_catalog | null;
}

export interface CatalogIndexPageGetDataQueryVariables {
  first?: number | null;
  after?: string | null;
  filter?: MaterialFilterArg | null;
}
