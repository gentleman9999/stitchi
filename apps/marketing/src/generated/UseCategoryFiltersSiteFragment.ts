/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: UseCategoryFiltersSiteFragment
// ====================================================

export interface UseCategoryFiltersSiteFragment_categoryTree {
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

export interface UseCategoryFiltersSiteFragment {
  __typename: "Site";
  categoryTree: UseCategoryFiltersSiteFragment_categoryTree[];
}
