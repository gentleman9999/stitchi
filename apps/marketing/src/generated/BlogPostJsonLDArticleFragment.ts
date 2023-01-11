/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: BlogPostJsonLDArticleFragment
// ====================================================

export interface BlogPostJsonLDArticleFragment__seoMetaTags {
  __typename: "Tag";
  attributes: any | null;
}

export interface BlogPostJsonLDArticleFragment_author {
  __typename: "AuthorRecord";
  id: any;
  name: string | null;
}

export interface BlogPostJsonLDArticleFragment_image_image {
  __typename: "ResponsiveImage";
  src: string;
}

export interface BlogPostJsonLDArticleFragment_image {
  __typename: "FileField";
  id: any;
  image: BlogPostJsonLDArticleFragment_image_image | null;
}

export interface BlogPostJsonLDArticleFragment {
  __typename: "ArticleRecord";
  id: any;
  title: string | null;
  slug: string | null;
  _publishedAt: any | null;
  _updatedAt: any;
  /**
   * SEO meta tags
   */
  _seoMetaTags: BlogPostJsonLDArticleFragment__seoMetaTags[];
  author: BlogPostJsonLDArticleFragment_author | null;
  image: BlogPostJsonLDArticleFragment_image | null;
}
