/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: PrivacyPagePageFragment
// ====================================================

export interface PrivacyPagePageFragment__seoMetaTags {
  __typename: "Tag";
  attributes: any | null;
  content: string | null;
  tag: string;
}

export interface PrivacyPagePageFragment_content {
  __typename: "PrivacyPolicyPageModelContentField";
  value: any;
}

export interface PrivacyPagePageFragment {
  __typename: "PrivacyPolicyPageRecord";
  id: any;
  /**
   * Generates SEO and Social card meta tags to be used in your frontend
   */
  _seoMetaTags: PrivacyPagePageFragment__seoMetaTags[];
  content: PrivacyPagePageFragment_content | null;
}
