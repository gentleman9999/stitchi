/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: SeoDefaultSeoFragment
// ====================================================

export interface SeoDefaultSeoFragment_fallbackSeo {
  __typename: "SeoField";
  title: string | null;
  description: string | null;
  twitterCard: string | null;
}

export interface SeoDefaultSeoFragment {
  __typename: "GlobalSeoField";
  siteName: string | null;
  titleSuffix: string | null;
  twitterAccount: string | null;
  fallbackSeo: SeoDefaultSeoFragment_fallbackSeo | null;
}
