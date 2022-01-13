/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: BlogPostShowPageArticleFragment
// ====================================================

export interface BlogPostShowPageArticleFragment_content_blocks {
  __typename: "ArticleRecord";
  id: any;
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

export interface BlogPostShowPageArticleFragment {
  __typename: "ArticleRecord";
  id: any;
  content: BlogPostShowPageArticleFragment_content | null;
}
