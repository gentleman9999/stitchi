/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: CategoryShowPageCategoryFragment
// ====================================================

export interface CategoryShowPageCategoryFragment_seo {
  __typename: "SeoDetails";
  /**
   * Meta description.
   */
  metaDescription: string;
}

export interface CategoryShowPageCategoryFragment {
  __typename: "Category";
  /**
   * The ID of an object
   */
  id: string;
  /**
   * Unique ID for the category.
   */
  entityId: number;
  /**
   * Category name.
   */
  name: string;
  /**
   * Category path.
   */
  path: string;
  /**
   * Category SEO details.
   */
  seo: CategoryShowPageCategoryFragment_seo;
}
