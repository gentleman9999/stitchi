/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ArticleModelFilter } from "./globalTypes";

// ====================================================
// GraphQL query operation: HomePageGetDataQuery
// ====================================================

export interface HomePageGetDataQuery_featuredPosts_image_responsiveImage {
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

export interface HomePageGetDataQuery_featuredPosts_image {
  __typename: "FileField";
  responsiveImage: HomePageGetDataQuery_featuredPosts_image_responsiveImage | null;
}

export interface HomePageGetDataQuery_featuredPosts_author_image_responsiveImage {
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

export interface HomePageGetDataQuery_featuredPosts_author_image {
  __typename: "FileField";
  id: any;
  responsiveImage: HomePageGetDataQuery_featuredPosts_author_image_responsiveImage | null;
}

export interface HomePageGetDataQuery_featuredPosts_author {
  __typename: "AuthorRecord";
  id: any;
  name: string | null;
  image: HomePageGetDataQuery_featuredPosts_author_image | null;
}

export interface HomePageGetDataQuery_featuredPosts_categories {
  __typename: "CategoryRecord";
  id: any;
  name: string | null;
  slug: string | null;
}

export interface HomePageGetDataQuery_featuredPosts {
  __typename: "ArticleRecord";
  id: any;
  _publishedAt: any | null;
  _createdAt: any;
  title: string | null;
  slug: string | null;
  shortDescription: string | null;
  image: HomePageGetDataQuery_featuredPosts_image | null;
  author: HomePageGetDataQuery_featuredPosts_author | null;
  categories: HomePageGetDataQuery_featuredPosts_categories[];
}

export interface HomePageGetDataQuery {
  /**
   * Returns a collection of records
   */
  featuredPosts: HomePageGetDataQuery_featuredPosts[];
}

export interface HomePageGetDataQueryVariables {
  first: any;
  filter?: ArticleModelFilter | null;
}
