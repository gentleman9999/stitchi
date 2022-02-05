/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: CmsStructuredTextContentFragment
// ====================================================

export interface CmsStructuredTextContentFragment_links {
  __typename: "ArticleRecord";
  id: any;
  slug: string | null;
  title: string | null;
}

export interface CmsStructuredTextContentFragment {
  __typename: "ArticleModelContentField";
  value: any;
  blocks: string[];
  links: CmsStructuredTextContentFragment_links[];
}
