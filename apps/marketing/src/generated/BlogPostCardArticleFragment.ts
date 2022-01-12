/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: BlogPostCardArticleFragment
// ====================================================

export interface BlogPostCardArticleFragment_content {
  __typename: "ArticleModelContentField";
  value: any;
}

export interface BlogPostCardArticleFragment_image_responsiveImage {
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

export interface BlogPostCardArticleFragment_image {
  __typename: "FileField";
  responsiveImage: BlogPostCardArticleFragment_image_responsiveImage | null;
}

export interface BlogPostCardArticleFragment_author_image_responsiveImage {
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

export interface BlogPostCardArticleFragment_author_image {
  __typename: "FileField";
  responsiveImage: BlogPostCardArticleFragment_author_image_responsiveImage | null;
}

export interface BlogPostCardArticleFragment_author {
  __typename: "AuthorRecord";
  id: any;
  name: string | null;
  image: BlogPostCardArticleFragment_author_image | null;
}

export interface BlogPostCardArticleFragment_categories {
  __typename: "CategoryRecord";
  id: any;
  name: string | null;
  slug: string | null;
}

export interface BlogPostCardArticleFragment {
  __typename: "ArticleRecord";
  id: any;
  updatedAt: any;
  title: string | null;
  slug: string | null;
  shortDescription: string | null;
  content: BlogPostCardArticleFragment_content | null;
  image: BlogPostCardArticleFragment_image | null;
  author: BlogPostCardArticleFragment_author | null;
  categories: BlogPostCardArticleFragment_categories[];
}
