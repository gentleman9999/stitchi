/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: CmsLandingPageSectionSectionFragment
// ====================================================

export interface CmsLandingPageSectionSectionFragment_image_responsiveImage {
  __typename: "ResponsiveImage";
  srcSet: string;
  webpSrcSet: string;
  sizes: string;
  src: string;
  width: any;
  height: any;
  aspectRatio: any;
  alt: string | null;
  title: string | null;
  base64: string | null;
}

export interface CmsLandingPageSectionSectionFragment_image {
  __typename: "FileField";
  id: any;
  responsiveImage: CmsLandingPageSectionSectionFragment_image_responsiveImage | null;
}

export interface CmsLandingPageSectionSectionFragment_content_FeatureGridRecord_features_icon {
  __typename: "HeroIconRecord";
  id: any;
  tag: string | null;
}

export interface CmsLandingPageSectionSectionFragment_content_FeatureGridRecord_features {
  __typename: "FeatureGridFeatureRecord";
  id: any;
  name: string | null;
  shortDescription: string | null;
  callToActionText: string | null;
  callToActionUrl: string | null;
  icon: CmsLandingPageSectionSectionFragment_content_FeatureGridRecord_features_icon[];
}

export interface CmsLandingPageSectionSectionFragment_content_FeatureGridRecord {
  __typename: "FeatureGridRecord";
  id: any;
  features: CmsLandingPageSectionSectionFragment_content_FeatureGridRecord_features[];
}

export interface CmsLandingPageSectionSectionFragment_content_FaqGroupRecord_faqs {
  __typename: "FaqRecord";
  id: any;
  question: string | null;
  answer: string | null;
}

export interface CmsLandingPageSectionSectionFragment_content_FaqGroupRecord {
  __typename: "FaqGroupRecord";
  id: any;
  expandAll: any | null;
  faqs: CmsLandingPageSectionSectionFragment_content_FaqGroupRecord_faqs[];
}

export type CmsLandingPageSectionSectionFragment_content = CmsLandingPageSectionSectionFragment_content_FeatureGridRecord | CmsLandingPageSectionSectionFragment_content_FaqGroupRecord;

export interface CmsLandingPageSectionSectionFragment {
  __typename: "PageSectionRecord";
  id: any;
  title: string | null;
  subtitle: string | null;
  gutter: string | null;
  textAlignment: string | null;
  imageAlignment: string | null;
  image: CmsLandingPageSectionSectionFragment_image | null;
  content: CmsLandingPageSectionSectionFragment_content[];
}
