/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: BlogIndexPageGetDataQuery
// ====================================================

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
  updatedAt: any;
  title: string | null;
  slug: string | null;
  shortDescription: string | null;
  image: BlogIndexPageGetDataQuery_allArticles_image | null;
  author: BlogIndexPageGetDataQuery_allArticles_author | null;
  categories: BlogIndexPageGetDataQuery_allArticles_categories[];
}

export interface BlogIndexPageGetDataQuery_allCategories {
  __typename: "CategoryRecord";
  id: any;
  name: string | null;
  slug: string | null;
}

export interface BlogIndexPageGetDataQuery {
  /**
   * Returns a collection of records
   */
  allArticles: BlogIndexPageGetDataQuery_allArticles[];
  /**
   * Returns a collection of records
   */
  allCategories: BlogIndexPageGetDataQuery_allCategories[];
}

export interface BlogIndexPageGetDataQueryVariables {
  first?: any | null;
  skip?: any | null;
}
