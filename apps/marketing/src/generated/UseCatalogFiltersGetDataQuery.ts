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

export interface UseCatalogFiltersGetDataQuery_site_fabricCategory_children {
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

export interface UseCatalogFiltersGetDataQuery_site_fabricCategory {
  __typename: "CategoryTreeItem";
  /**
   * The id category.
   */
  entityId: number;
  /**
   * Subcategories of this category
   */
  children: UseCatalogFiltersGetDataQuery_site_fabricCategory_children[];
}

export interface UseCatalogFiltersGetDataQuery_site_collections_children {
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

export interface UseCatalogFiltersGetDataQuery_site_collections {
  __typename: "CategoryTreeItem";
  /**
   * The id category.
   */
  entityId: number;
  /**
   * Subcategories of this category
   */
  children: UseCatalogFiltersGetDataQuery_site_collections_children[];
}

export interface UseCatalogFiltersGetDataQuery_site_fit_children {
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

export interface UseCatalogFiltersGetDataQuery_site_fit {
  __typename: "CategoryTreeItem";
  /**
   * The id category.
   */
  entityId: number;
  /**
   * Subcategories of this category
   */
  children: UseCatalogFiltersGetDataQuery_site_fit_children[];
}

export interface UseCatalogFiltersGetDataQuery_site {
  __typename: "Site";
  /**
   * A tree of categories.
   */
  categoryTree: UseCatalogFiltersGetDataQuery_site_categoryTree[];
  /**
   * A tree of categories.
   */
  fabricCategory: UseCatalogFiltersGetDataQuery_site_fabricCategory[];
  /**
   * A tree of categories.
   */
  collections: UseCatalogFiltersGetDataQuery_site_collections[];
  /**
   * A tree of categories.
   */
  fit: UseCatalogFiltersGetDataQuery_site_fit[];
}

export interface UseCatalogFiltersGetDataQuery {
  /**
   * A site
   */
  site: UseCatalogFiltersGetDataQuery_site;
}
