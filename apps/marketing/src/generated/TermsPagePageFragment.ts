/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: TermsPagePageFragment
// ====================================================

export interface TermsPagePageFragment__seoMetaTags {
  __typename: "Tag";
  attributes: any | null;
  content: string | null;
  tag: string;
}

export interface TermsPagePageFragment_content {
  __typename: "TermsOfUsePageModelContentField";
  value: any;
  blocks: string[];
}

export interface TermsPagePageFragment {
  __typename: "TermsOfUsePageRecord";
  id: any;
  /**
   * SEO meta tags
   */
  _seoMetaTags: TermsPagePageFragment__seoMetaTags[];
  content: TermsPagePageFragment_content | null;
}
