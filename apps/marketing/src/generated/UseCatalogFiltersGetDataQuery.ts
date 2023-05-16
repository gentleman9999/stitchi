/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UseCatalogFiltersGetDataQuery
// ====================================================

export interface UseCatalogFiltersGetDataQuery_site_categoryTree_children_children {
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

export interface UseCatalogFiltersGetDataQuery_site_categoryTree_children {
  __typename: "CategoryTreeItem";
  /**
   * The id category.
   */
  entityId: number;
  /**
   * The name of category.
   */
  name: string;
  /**
   * Subcategories of this category
   */
  children: UseCatalogFiltersGetDataQuery_site_categoryTree_children_children[];
}

export interface UseCatalogFiltersGetDataQuery_site_categoryTree {
  __typename: "CategoryTreeItem";
  /**
   * The id category.
   */
  entityId: number;
  /**
   * The name of category.
   */
  name: string;
  /**
   * Subcategories of this category
   */
  children: UseCatalogFiltersGetDataQuery_site_categoryTree_children[];
}

export interface UseCatalogFiltersGetDataQuery_site {
  __typename: "Site";
  /**
   * A tree of categories.
   */
  categoryTree: UseCatalogFiltersGetDataQuery_site_categoryTree[];
}

export interface UseCatalogFiltersGetDataQuery {
  /**
   * A site
   */
  site: UseCatalogFiltersGetDataQuery_site;
}
