/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ArticleModelFilter } from "./globalTypes";

// ====================================================
// GraphQL query operation: BlogIndexPageGetDataQuery
// ====================================================

export interface BlogIndexPageGetDataQuery__allArticlesMeta {
  __typename: "CollectionMetadata";
  count: any;
}

export interface BlogIndexPageGetDataQuery_allArticles_image_responsiveImage {
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

export interface BlogIndexPageGetDataQuery_allArticles_image {
  __typename: "FileField";
  responsiveImage: BlogIndexPageGetDataQuery_allArticles_image_responsiveImage | null;
}

export interface BlogIndexPageGetDataQuery_allArticles_author_image_responsiveImage {
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

export interface BlogIndexPageGetDataQuery_allArticles_author_image {
  __typename: "FileField";
  id: any;
  responsiveImage: BlogIndexPageGetDataQuery_allArticles_author_image_responsiveImage | null;
}

export interface BlogIndexPageGetDataQuery_allArticles_author {
  __typename: "AuthorRecord";
  id: any;
  name: string | null;
  image: BlogIndexPageGetDataQuery_allArticles_author_image | null;
}

export interface BlogIndexPageGetDataQuery_allArticles_categories {
  __typename: "CategoryRecord";
  id: any;
  name: string | null;
  slug: string | null;
}

export interface BlogIndexPageGetDataQuery_allArticles {
  __typename: "ArticleRecord";
  id: any;
  _publishedAt: any | null;
  _createdAt: any;
  title: string | null;
  slug: string | null;
  shortDescription: string | null;
  image: BlogIndexPageGetDataQuery_allArticles_image | null;
  author: BlogIndexPageGetDataQuery_allArticles_author | null;
  categories: BlogIndexPageGetDataQuery_allArticles_categories[];
}

export interface BlogIndexPageGetDataQuery_allCategories_description {
  __typename: "CategoryModelDescriptionField";
  value: any;
}

export interface BlogIndexPageGetDataQuery_allCategories__seoMetaTags {
  __typename: "Tag";
  attributes: any | null;
  content: string | null;
  tag: string;
}

export interface BlogIndexPageGetDataQuery_allCategories {
  __typename: "CategoryRecord";
  id: any;
  name: string | null;
  shortName: string | null;
  slug: string | null;
  description: BlogIndexPageGetDataQuery_allCategories_description | null;
  /**
   * Generates SEO and Social card meta tags to be used in your frontend
   */
  _seoMetaTags: BlogIndexPageGetDataQuery_allCategories__seoMetaTags[];
}

export interface BlogIndexPageGetDataQuery_blogIndexPage__seoMetaTags {
  __typename: "Tag";
  attributes: any | null;
  content: string | null;
  tag: string;
}

export interface BlogIndexPageGetDataQuery_blogIndexPage {
  __typename: "BlogIndexPageRecord";
  id: any;
  /**
   * Generates SEO and Social card meta tags to be used in your frontend
   */
  _seoMetaTags: BlogIndexPageGetDataQuery_blogIndexPage__seoMetaTags[];
}

export interface BlogIndexPageGetDataQuery {
  /**
   * Returns meta information regarding a record collection
   */
  _allArticlesMeta: BlogIndexPageGetDataQuery__allArticlesMeta;
  /**
   * Returns a collection of records
   */
  allArticles: BlogIndexPageGetDataQuery_allArticles[];
  /**
   * Returns a collection of records
   */
  allCategories: BlogIndexPageGetDataQuery_allCategories[];
  /**
   * Returns the single instance record
   */
  blogIndexPage: BlogIndexPageGetDataQuery_blogIndexPage | null;
}

export interface BlogIndexPageGetDataQueryVariables {
  first?: any | null;
  skip?: any | null;
  filter?: ArticleModelFilter | null;
}
