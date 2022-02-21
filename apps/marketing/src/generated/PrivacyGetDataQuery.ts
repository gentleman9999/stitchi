/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: PrivacyGetDataQuery
// ====================================================

export interface PrivacyGetDataQuery_privacyPolicyPage__seoMetaTags {
  __typename: "Tag";
  attributes: any | null;
  content: string | null;
  tag: string;
}

export interface PrivacyGetDataQuery_privacyPolicyPage_content {
  __typename: "PrivacyPolicyPageModelContentField";
  value: any;
  blocks: string[];
}

export interface PrivacyGetDataQuery_privacyPolicyPage {
  __typename: "PrivacyPolicyPageRecord";
  id: any;
  /**
   * SEO meta tags
   */
  _seoMetaTags: PrivacyGetDataQuery_privacyPolicyPage__seoMetaTags[];
  content: PrivacyGetDataQuery_privacyPolicyPage_content | null;
}

export interface PrivacyGetDataQuery {
  /**
   * Returns the single instance record
   */
  privacyPolicyPage: PrivacyGetDataQuery_privacyPolicyPage | null;
}