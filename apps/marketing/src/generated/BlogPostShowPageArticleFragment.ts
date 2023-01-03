/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: BlogPostShowPageArticleFragment
// ====================================================

export interface BlogPostShowPageArticleFragment_author_image_responsiveImage {
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

export interface BlogPostShowPageArticleFragment_author_image {
  __typename: "FileField";
  id: any;
  responsiveImage: BlogPostShowPageArticleFragment_author_image_responsiveImage | null;
}

export interface BlogPostShowPageArticleFragment_author {
  __typename: "AuthorRecord";
  id: any;
  name: string | null;
  image: BlogPostShowPageArticleFragment_author_image | null;
}

export interface BlogPostShowPageArticleFragment_categories {
  __typename: "CategoryRecord";
  id: any;
  name: string | null;
  slug: string | null;
}

export interface BlogPostShowPageArticleFragment_image_responsiveImage {
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

export interface BlogPostShowPageArticleFragment_image {
  __typename: "FileField";
  responsiveImage: BlogPostShowPageArticleFragment_image_responsiveImage | null;
}

export interface BlogPostShowPageArticleFragment_content_blocks_image_responsiveImage {
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

export interface BlogPostShowPageArticleFragment_content_blocks_image {
  __typename: "FileField";
  id: any;
  responsiveImage: BlogPostShowPageArticleFragment_content_blocks_image_responsiveImage | null;
}

export interface BlogPostShowPageArticleFragment_content_blocks {
  __typename: "ImageRecord";
  id: any;
  image: BlogPostShowPageArticleFragment_content_blocks_image | null;
}

export interface BlogPostShowPageArticleFragment_content_links {
  __typename: "ArticleRecord";
  id: any;
  slug: string | null;
  title: string | null;
}

export interface BlogPostShowPageArticleFragment_content {
  __typename: "ArticleModelContentField";
  value: any;
  blocks: BlogPostShowPageArticleFragment_content_blocks[];
  links: BlogPostShowPageArticleFragment_content_links[];
}

export interface BlogPostShowPageArticleFragment__seoMetaTags {
  __typename: "Tag";
  attributes: any | null;
  content: string | null;
  tag: string;
}

export interface BlogPostShowPageArticleFragment {
  __typename: "ArticleRecord";
  id: any;
  title: string | null;
  _publishedAt: any | null;
  author: BlogPostShowPageArticleFragment_author | null;
  categories: BlogPostShowPageArticleFragment_categories[];
  image: BlogPostShowPageArticleFragment_image | null;
  content: BlogPostShowPageArticleFragment_content | null;
  slug: string | null;
  /**
   * SEO meta tags
   */
  _seoMetaTags: BlogPostShowPageArticleFragment__seoMetaTags[];
}
