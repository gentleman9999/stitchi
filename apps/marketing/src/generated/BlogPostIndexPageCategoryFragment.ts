/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: BlogPostIndexPageCategoryFragment
// ====================================================

export interface BlogPostIndexPageCategoryFragment_description {
  __typename: "CategoryModelDescriptionField";
  value: any;
  blocks: string[];
}

export interface BlogPostIndexPageCategoryFragment {
  __typename: "CategoryRecord";
  id: any;
  name: string | null;
  shortName: string | null;
  slug: string | null;
  description: BlogPostIndexPageCategoryFragment_description | null;
}
