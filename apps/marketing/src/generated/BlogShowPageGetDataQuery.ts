/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SlugFilter } from "./globalTypes";

// ====================================================
// GraphQL query operation: BlogShowPageGetDataQuery
// ====================================================

export interface BlogShowPageGetDataQuery_article_author_image_responsiveImage {
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

export interface BlogShowPageGetDataQuery_article_author_image {
  __typename: "FileField";
  id: any;
  responsiveImage: BlogShowPageGetDataQuery_article_author_image_responsiveImage | null;
}

export interface BlogShowPageGetDataQuery_article_author {
  __typename: "AuthorRecord";
  id: any;
  name: string | null;
  image: BlogShowPageGetDataQuery_article_author_image | null;
}

export interface BlogShowPageGetDataQuery_article_categories {
  __typename: "CategoryRecord";
  id: any;
  name: string | null;
  slug: string | null;
}

export interface BlogShowPageGetDataQuery_article_image_responsiveImage {
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

export interface BlogShowPageGetDataQuery_article_image_image {
  __typename: "ResponsiveImage";
  src: string;
}

export interface BlogShowPageGetDataQuery_article_image {
  __typename: "FileField";
  id: any;
  responsiveImage: BlogShowPageGetDataQuery_article_image_responsiveImage | null;
  image: BlogShowPageGetDataQuery_article_image_image | null;
}

export interface BlogShowPageGetDataQuery_article_content_blocks_image_responsiveImage {
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

export interface BlogShowPageGetDataQuery_article_content_blocks_image {
  __typename: "FileField";
  id: any;
  responsiveImage: BlogShowPageGetDataQuery_article_content_blocks_image_responsiveImage | null;
}

export interface BlogShowPageGetDataQuery_article_content_blocks {
  __typename: "ImageRecord";
  id: any;
  image: BlogShowPageGetDataQuery_article_content_blocks_image | null;
}

export interface BlogShowPageGetDataQuery_article_content_links_ArticleRecord {
  __typename: "ArticleRecord";
  id: any;
  slug: string | null;
  title: string | null;
}

export interface BlogShowPageGetDataQuery_article_content_links_GlossaryEntryRecord {
  __typename: "GlossaryEntryRecord";
  id: any;
  slug: string | null;
  term: string | null;
  entryType: string | null;
}

export type BlogShowPageGetDataQuery_article_content_links = BlogShowPageGetDataQuery_article_content_links_ArticleRecord | BlogShowPageGetDataQuery_article_content_links_GlossaryEntryRecord;

export interface BlogShowPageGetDataQuery_article_content {
  __typename: "ArticleModelContentField";
  value: any;
  blocks: BlogShowPageGetDataQuery_article_content_blocks[];
  links: BlogShowPageGetDataQuery_article_content_links[];
}

export interface BlogShowPageGetDataQuery_article__seoMetaTags {
  __typename: "Tag";
  attributes: any | null;
  content: string | null;
  tag: string;
}

export interface BlogShowPageGetDataQuery_article {
  __typename: "ArticleRecord";
  id: any;
  title: string | null;
  _publishedAt: any | null;
  author: BlogShowPageGetDataQuery_article_author | null;
  categories: BlogShowPageGetDataQuery_article_categories[];
  image: BlogShowPageGetDataQuery_article_image | null;
  content: BlogShowPageGetDataQuery_article_content | null;
  slug: string | null;
  /**
   * SEO meta tags
   */
  _seoMetaTags: BlogShowPageGetDataQuery_article__seoMetaTags[];
  _updatedAt: any;
}

export interface BlogShowPageGetDataQuery {
  /**
   * Returns a specific record
   */
  article: BlogShowPageGetDataQuery_article | null;
}

export interface BlogShowPageGetDataQueryVariables {
  slug: SlugFilter;
}
