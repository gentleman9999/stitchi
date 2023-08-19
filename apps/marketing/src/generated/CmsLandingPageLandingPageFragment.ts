/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: CmsLandingPageLandingPageFragment
// ====================================================

export interface CmsLandingPageLandingPageFragment_content_PageHeroRecord_callToActions_icon {
  __typename: "HeroIconRecord";
  id: any;
  tag: string | null;
}

export interface CmsLandingPageLandingPageFragment_content_PageHeroRecord_callToActions {
  __typename: "CallToActionButtonRecord";
  id: any;
  label: string | null;
  url: string | null;
  icon: CmsLandingPageLandingPageFragment_content_PageHeroRecord_callToActions_icon[];
}

export interface CmsLandingPageLandingPageFragment_content_PageHeroRecord {
  __typename: "PageHeroRecord";
  id: any;
  title: string | null;
  description: string | null;
  callToActions: CmsLandingPageLandingPageFragment_content_PageHeroRecord_callToActions[];
}

export interface CmsLandingPageLandingPageFragment_content_PageSectionRecord_image_responsiveImage {
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

export interface CmsLandingPageLandingPageFragment_content_PageSectionRecord_image {
  __typename: "FileField";
  id: any;
  responsiveImage: CmsLandingPageLandingPageFragment_content_PageSectionRecord_image_responsiveImage | null;
}

export interface CmsLandingPageLandingPageFragment_content_PageSectionRecord_content_FeatureGridRecord_features_icon {
  __typename: "HeroIconRecord";
  id: any;
  tag: string | null;
}

export interface CmsLandingPageLandingPageFragment_content_PageSectionRecord_content_FeatureGridRecord_features {
  __typename: "FeatureGridFeatureRecord";
  id: any;
  name: string | null;
  shortDescription: string | null;
  callToActionText: string | null;
  callToActionUrl: string | null;
  icon: CmsLandingPageLandingPageFragment_content_PageSectionRecord_content_FeatureGridRecord_features_icon[];
}

export interface CmsLandingPageLandingPageFragment_content_PageSectionRecord_content_FeatureGridRecord {
  __typename: "FeatureGridRecord";
  id: any;
  features: CmsLandingPageLandingPageFragment_content_PageSectionRecord_content_FeatureGridRecord_features[];
}

export interface CmsLandingPageLandingPageFragment_content_PageSectionRecord_content_FaqGroupRecord_faqs {
  __typename: "FaqRecord";
  id: any;
  question: string | null;
  answer: string | null;
}

export interface CmsLandingPageLandingPageFragment_content_PageSectionRecord_content_FaqGroupRecord {
  __typename: "FaqGroupRecord";
  id: any;
  expandAll: any | null;
  faqs: CmsLandingPageLandingPageFragment_content_PageSectionRecord_content_FaqGroupRecord_faqs[];
}

export type CmsLandingPageLandingPageFragment_content_PageSectionRecord_content = CmsLandingPageLandingPageFragment_content_PageSectionRecord_content_FeatureGridRecord | CmsLandingPageLandingPageFragment_content_PageSectionRecord_content_FaqGroupRecord;

export interface CmsLandingPageLandingPageFragment_content_PageSectionRecord {
  __typename: "PageSectionRecord";
  id: any;
  title: string | null;
  subtitle: string | null;
  gutter: string | null;
  textAlignment: string | null;
  imageAlignment: string | null;
  image: CmsLandingPageLandingPageFragment_content_PageSectionRecord_image | null;
  content: CmsLandingPageLandingPageFragment_content_PageSectionRecord_content[];
}

export interface CmsLandingPageLandingPageFragment_content_PageCallToActionRecord_actions_icon {
  __typename: "HeroIconRecord";
  id: any;
  tag: string | null;
}

export interface CmsLandingPageLandingPageFragment_content_PageCallToActionRecord_actions {
  __typename: "CallToActionButtonRecord";
  label: string | null;
  url: string | null;
  icon: CmsLandingPageLandingPageFragment_content_PageCallToActionRecord_actions_icon[];
}

export interface CmsLandingPageLandingPageFragment_content_PageCallToActionRecord {
  __typename: "PageCallToActionRecord";
  id: any;
  title: string | null;
  description: string | null;
  actions: CmsLandingPageLandingPageFragment_content_PageCallToActionRecord_actions[];
}

export interface CmsLandingPageLandingPageFragment_content_PageSectionCatalogRecord_categories {
  __typename: "CatalogCategoryRecord";
  id: any;
  bigCommerceCategoryId: any | null;
  name: string | null;
}

export interface CmsLandingPageLandingPageFragment_content_PageSectionCatalogRecord {
  __typename: "PageSectionCatalogRecord";
  id: any;
  title: string | null;
  description: string | null;
  categories: CmsLandingPageLandingPageFragment_content_PageSectionCatalogRecord_categories[];
}

export type CmsLandingPageLandingPageFragment_content = CmsLandingPageLandingPageFragment_content_PageHeroRecord | CmsLandingPageLandingPageFragment_content_PageSectionRecord | CmsLandingPageLandingPageFragment_content_PageCallToActionRecord | CmsLandingPageLandingPageFragment_content_PageSectionCatalogRecord;

export interface CmsLandingPageLandingPageFragment {
  __typename: "LandingPageRecord";
  id: any;
  content: CmsLandingPageLandingPageFragment_content[];
}
