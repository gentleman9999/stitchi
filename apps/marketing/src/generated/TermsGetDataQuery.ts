/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: TermsGetDataQuery
// ====================================================

export interface TermsGetDataQuery_termsOfUsePage__seoMetaTags {
  __typename: "Tag";
  attributes: any | null;
  content: string | null;
  tag: string;
}

export interface TermsGetDataQuery_termsOfUsePage_content {
  __typename: "TermsOfUsePageModelContentField";
  value: any;
  blocks: string[];
}

export interface TermsGetDataQuery_termsOfUsePage {
  __typename: "TermsOfUsePageRecord";
  id: any;
  /**
   * SEO meta tags
   */
  _seoMetaTags: TermsGetDataQuery_termsOfUsePage__seoMetaTags[];
  content: TermsGetDataQuery_termsOfUsePage_content | null;
}

export interface TermsGetDataQuery {
  /**
   * Returns the single instance record
   */
  termsOfUsePage: TermsGetDataQuery_termsOfUsePage | null;
}
