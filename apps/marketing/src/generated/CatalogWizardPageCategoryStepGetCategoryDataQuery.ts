/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CatalogWizardPageCategoryStepGetCategoryDataQuery
// ====================================================

export interface CatalogWizardPageCategoryStepGetCategoryDataQuery_site_categoryTree_children {
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
   * Path assigned to this category
   */
  path: string;
  /**
   * If a category has children.
   */
  hasChildren: boolean;
}

export interface CatalogWizardPageCategoryStepGetCategoryDataQuery_site_categoryTree {
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
   * Path assigned to this category
   */
  path: string;
  /**
   * Subcategories of this category
   */
  children: CatalogWizardPageCategoryStepGetCategoryDataQuery_site_categoryTree_children[];
}

export interface CatalogWizardPageCategoryStepGetCategoryDataQuery_site {
  __typename: "Site";
  /**
   * A tree of categories.
   */
  categoryTree: CatalogWizardPageCategoryStepGetCategoryDataQuery_site_categoryTree[];
}

export interface CatalogWizardPageCategoryStepGetCategoryDataQuery {
  /**
   * A site
   */
  site: CatalogWizardPageCategoryStepGetCategoryDataQuery_site;
}

export interface CatalogWizardPageCategoryStepGetCategoryDataQueryVariables {
  rootEntityId: number;
}
