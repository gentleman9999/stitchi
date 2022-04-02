/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CatalogGetDataQuery
// ====================================================

export interface CatalogGetDataQuery_catalog_categories {
  __typename: "Category";
  id: string;
  name: string;
  parentCategoryId: string | null;
}

export interface CatalogGetDataQuery_catalog {
  __typename: "Catalog";
  id: string;
  categories: CatalogGetDataQuery_catalog_categories[] | null;
}

export interface CatalogGetDataQuery {
  catalog: CatalogGetDataQuery_catalog | null;
}
