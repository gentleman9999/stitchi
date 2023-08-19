/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: CmsLandingPageCallToActionCallToActionFragment
// ====================================================

export interface CmsLandingPageCallToActionCallToActionFragment_actions_icon {
  __typename: "HeroIconRecord";
  id: any;
  tag: string | null;
}

export interface CmsLandingPageCallToActionCallToActionFragment_actions {
  __typename: "CallToActionButtonRecord";
  label: string | null;
  url: string | null;
  icon: CmsLandingPageCallToActionCallToActionFragment_actions_icon[];
}

export interface CmsLandingPageCallToActionCallToActionFragment {
  __typename: "PageCallToActionRecord";
  id: any;
  title: string | null;
  description: string | null;
  actions: CmsLandingPageCallToActionCallToActionFragment_actions[];
}
