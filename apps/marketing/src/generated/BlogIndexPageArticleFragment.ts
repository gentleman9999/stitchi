/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: BlogIndexPageArticleFragment
// ====================================================

export interface BlogIndexPageArticleFragment_image_responsiveImage {
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

export interface BlogIndexPageArticleFragment_image {
  __typename: "FileField";
  responsiveImage: BlogIndexPageArticleFragment_image_responsiveImage | null;
}

export interface BlogIndexPageArticleFragment_author_image_responsiveImage {
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

export interface BlogIndexPageArticleFragment_author_image {
  __typename: "FileField";
  id: any;
  responsiveImage: BlogIndexPageArticleFragment_author_image_responsiveImage | null;
}

export interface BlogIndexPageArticleFragment_author {
  __typename: "AuthorRecord";
  id: any;
  name: string | null;
  image: BlogIndexPageArticleFragment_author_image | null;
}

export interface BlogIndexPageArticleFragment_categories {
  __typename: "CategoryRecord";
  id: any;
  name: string | null;
  slug: string | null;
}

export interface BlogIndexPageArticleFragment {
  __typename: "ArticleRecord";
  id: any;
  _publishedAt: any | null;
  _createdAt: any;
  title: string | null;
  slug: string | null;
  shortDescription: string | null;
  image: BlogIndexPageArticleFragment_image | null;
  author: BlogIndexPageArticleFragment_author | null;
  categories: BlogIndexPageArticleFragment_categories[];
}
