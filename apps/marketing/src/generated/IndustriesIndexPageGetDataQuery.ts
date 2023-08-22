/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: IndustriesIndexPageGetDataQuery
// ====================================================

export interface IndustriesIndexPageGetDataQuery_landingPage__seoMetaTags {
  __typename: "Tag";
  attributes: any | null;
  content: string | null;
  tag: string;
}

export interface IndustriesIndexPageGetDataQuery_landingPage_content_PageHeroRecord_callToActions_icon {
  __typename: "HeroIconRecord";
  id: any;
  tag: string | null;
}

export interface IndustriesIndexPageGetDataQuery_landingPage_content_PageHeroRecord_callToActions {
  __typename: "CallToActionButtonRecord";
  id: any;
  label: string | null;
  url: string | null;
  icon: IndustriesIndexPageGetDataQuery_landingPage_content_PageHeroRecord_callToActions_icon[];
}

export interface IndustriesIndexPageGetDataQuery_landingPage_content_PageHeroRecord {
  __typename: "PageHeroRecord";
  id: any;
  title: string | null;
  description: string | null;
  callToActions: IndustriesIndexPageGetDataQuery_landingPage_content_PageHeroRecord_callToActions[];
}

export interface IndustriesIndexPageGetDataQuery_landingPage_content_PageSectionRecord_image_responsiveImage {
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

export interface IndustriesIndexPageGetDataQuery_landingPage_content_PageSectionRecord_image {
  __typename: "FileField";
  id: any;
  responsiveImage: IndustriesIndexPageGetDataQuery_landingPage_content_PageSectionRecord_image_responsiveImage | null;
}

export interface IndustriesIndexPageGetDataQuery_landingPage_content_PageSectionRecord_content_FeatureGridRecord_features_icon {
  __typename: "HeroIconRecord";
  id: any;
  tag: string | null;
}

export interface IndustriesIndexPageGetDataQuery_landingPage_content_PageSectionRecord_content_FeatureGridRecord_features {
  __typename: "FeatureGridFeatureRecord";
  id: any;
  name: string | null;
  shortDescription: string | null;
  callToActionText: string | null;
  callToActionUrl: string | null;
  icon: IndustriesIndexPageGetDataQuery_landingPage_content_PageSectionRecord_content_FeatureGridRecord_features_icon[];
}

export interface IndustriesIndexPageGetDataQuery_landingPage_content_PageSectionRecord_content_FeatureGridRecord {
  __typename: "FeatureGridRecord";
  id: any;
  features: IndustriesIndexPageGetDataQuery_landingPage_content_PageSectionRecord_content_FeatureGridRecord_features[];
}

export interface IndustriesIndexPageGetDataQuery_landingPage_content_PageSectionRecord_content_FaqGroupRecord_faqs {
  __typename: "FaqRecord";
  id: any;
  question: string | null;
  answer: string | null;
}

export interface IndustriesIndexPageGetDataQuery_landingPage_content_PageSectionRecord_content_FaqGroupRecord {
  __typename: "FaqGroupRecord";
  id: any;
  expandAll: any | null;
  faqs: IndustriesIndexPageGetDataQuery_landingPage_content_PageSectionRecord_content_FaqGroupRecord_faqs[];
}

export type IndustriesIndexPageGetDataQuery_landingPage_content_PageSectionRecord_content = IndustriesIndexPageGetDataQuery_landingPage_content_PageSectionRecord_content_FeatureGridRecord | IndustriesIndexPageGetDataQuery_landingPage_content_PageSectionRecord_content_FaqGroupRecord;

export interface IndustriesIndexPageGetDataQuery_landingPage_content_PageSectionRecord {
  __typename: "PageSectionRecord";
  id: any;
  title: string | null;
  subtitle: string | null;
  gutter: string | null;
  textAlignment: string | null;
  imageAlignment: string | null;
  image: IndustriesIndexPageGetDataQuery_landingPage_content_PageSectionRecord_image | null;
  content: IndustriesIndexPageGetDataQuery_landingPage_content_PageSectionRecord_content[];
}

export interface IndustriesIndexPageGetDataQuery_landingPage_content_PageCallToActionRecord_actions_icon {
  __typename: "HeroIconRecord";
  id: any;
  tag: string | null;
}

export interface IndustriesIndexPageGetDataQuery_landingPage_content_PageCallToActionRecord_actions {
  __typename: "CallToActionButtonRecord";
  label: string | null;
  url: string | null;
  icon: IndustriesIndexPageGetDataQuery_landingPage_content_PageCallToActionRecord_actions_icon[];
}

export interface IndustriesIndexPageGetDataQuery_landingPage_content_PageCallToActionRecord {
  __typename: "PageCallToActionRecord";
  id: any;
  title: string | null;
  description: string | null;
  actions: IndustriesIndexPageGetDataQuery_landingPage_content_PageCallToActionRecord_actions[];
}

export interface IndustriesIndexPageGetDataQuery_landingPage_content_PageSectionCatalogRecord_categories {
  __typename: "CatalogCategoryRecord";
  id: any;
  bigCommerceCategoryId: any | null;
  name: string | null;
}

export interface IndustriesIndexPageGetDataQuery_landingPage_content_PageSectionCatalogRecord {
  __typename: "PageSectionCatalogRecord";
  id: any;
  title: string | null;
  description: string | null;
  disableDefaultCategories: any | null;
  categories: IndustriesIndexPageGetDataQuery_landingPage_content_PageSectionCatalogRecord_categories[];
}

export type IndustriesIndexPageGetDataQuery_landingPage_content = IndustriesIndexPageGetDataQuery_landingPage_content_PageHeroRecord | IndustriesIndexPageGetDataQuery_landingPage_content_PageSectionRecord | IndustriesIndexPageGetDataQuery_landingPage_content_PageCallToActionRecord | IndustriesIndexPageGetDataQuery_landingPage_content_PageSectionCatalogRecord;

export interface IndustriesIndexPageGetDataQuery_landingPage {
  __typename: "LandingPageRecord";
  id: any;
  slug: string | null;
  /**
   * SEO meta tags
   */
  _seoMetaTags: IndustriesIndexPageGetDataQuery_landingPage__seoMetaTags[];
  content: IndustriesIndexPageGetDataQuery_landingPage_content[];
}

export interface IndustriesIndexPageGetDataQuery {
  /**
   * Returns a specific record
   */
  landingPage: IndustriesIndexPageGetDataQuery_landingPage | null;
}

export interface IndustriesIndexPageGetDataQueryVariables {
  slug: string;
}
