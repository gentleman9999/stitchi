/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: BlogCategoryIndexPageGetCategoryQuery
// ====================================================

export interface BlogCategoryIndexPageGetCategoryQuery_allCategories {
  __typename: "CategoryRecord";
  id: any;
}

export interface BlogCategoryIndexPageGetCategoryQuery {
  /**
   * Returns a collection of records
   */
  allCategories: BlogCategoryIndexPageGetCategoryQuery_allCategories[];
}

export interface BlogCategoryIndexPageGetCategoryQueryVariables {
  categorySlug: string;
}
