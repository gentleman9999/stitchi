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
}

export interface TermsPagePageFragment {
  __typename: "TermsOfUsePageRecord";
  id: any;
  /**
   * Generates SEO and Social card meta tags to be used in your frontend
   */
  _seoMetaTags: TermsPagePageFragment__seoMetaTags[];
  content: TermsPagePageFragment_content | null;
}
