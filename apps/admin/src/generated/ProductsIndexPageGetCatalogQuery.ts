/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CategoryFilterArg } from "./globalTypes";

// ====================================================
// GraphQL query operation: ProductsIndexPageGetCatalogQuery
// ====================================================

export interface ProductsIndexPageGetCatalogQuery_catalog_categories_children {
  __typename: "Category";
  id: string;
  name: string;
  slug: string;
}

export interface ProductsIndexPageGetCatalogQuery_catalog_categories {
  __typename: "Category";
  id: string;
  name: string;
  slug: string;
  children: ProductsIndexPageGetCatalogQuery_catalog_categories_children[] | null;
}

export interface ProductsIndexPageGetCatalogQuery_catalog_products_nodes_vendor {
  __typename: "Vendor";
  id: string;
  name: string;
}

export interface ProductsIndexPageGetCatalogQuery_catalog_products_nodes_manufacturer {
  __typename: "Manufacturer";
  id: string;
  name: string;
}

export interface ProductsIndexPageGetCatalogQuery_catalog_products_nodes_categories_breadcrumbs {
  __typename: "Category";
  id: string;
  name: string;
}

export interface ProductsIndexPageGetCatalogQuery_catalog_products_nodes_categories_children_children {
  __typename: "Category";
  id: string;
  name: string;
}

export interface ProductsIndexPageGetCatalogQuery_catalog_products_nodes_categories_children {
  __typename: "Category";
  id: string;
  name: string;
  children: ProductsIndexPageGetCatalogQuery_catalog_products_nodes_categories_children_children[] | null;
}

export interface ProductsIndexPageGetCatalogQuery_catalog_products_nodes_categories {
  __typename: "Category";
  id: string;
  name: string;
  breadcrumbs: ProductsIndexPageGetCatalogQuery_catalog_products_nodes_categories_breadcrumbs[] | null;
  children: ProductsIndexPageGetCatalogQuery_catalog_products_nodes_categories_children[] | null;
}

export interface ProductsIndexPageGetCatalogQuery_catalog_products_nodes {
  __typename: "Material";
  id: string;
  name: string;
  vendor: ProductsIndexPageGetCatalogQuery_catalog_products_nodes_vendor | null;
  manufacturer: ProductsIndexPageGetCatalogQuery_catalog_products_nodes_manufacturer | null;
  categories: ProductsIndexPageGetCatalogQuery_catalog_products_nodes_categories[] | null;
}

export interface ProductsIndexPageGetCatalogQuery_catalog_products {
  __typename: "MaterialConnection";
  /**
   * Flattened list of Material type
   */
  nodes: (ProductsIndexPageGetCatalogQuery_catalog_products_nodes | null)[] | null;
}

export interface ProductsIndexPageGetCatalogQuery_catalog {
  __typename: "Catalog";
  id: string;
  categories: ProductsIndexPageGetCatalogQuery_catalog_categories[] | null;
  products: ProductsIndexPageGetCatalogQuery_catalog_products | null;
}

export interface ProductsIndexPageGetCatalogQuery {
  catalog: ProductsIndexPageGetCatalogQuery_catalog | null;
}

export interface ProductsIndexPageGetCatalogQueryVariables {
  filter?: CategoryFilterArg | null;
}
