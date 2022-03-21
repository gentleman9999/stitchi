/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ProductsIndexPageGetCatalogQuery
// ====================================================

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

export interface ProductsIndexPageGetCatalogQuery_catalog_products_nodes_categories {
  __typename: "Category";
  id: string;
  breadcrumbs: ProductsIndexPageGetCatalogQuery_catalog_products_nodes_categories_breadcrumbs[] | null;
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
  products: ProductsIndexPageGetCatalogQuery_catalog_products | null;
}

export interface ProductsIndexPageGetCatalogQuery {
  catalog: ProductsIndexPageGetCatalogQuery_catalog | null;
}

export interface ProductsIndexPageGetCatalogQueryVariables {
  categoryIds: string[];
}
