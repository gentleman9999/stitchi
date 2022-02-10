/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: BlogCategoryIndexPageGetPageDataQuery
// ====================================================

export interface BlogCategoryIndexPageGetPageDataQuery_allArticles_image_responsiveImage {
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

export interface BlogCategoryIndexPageGetPageDataQuery_allArticles_image {
  __typename: "FileField";
  responsiveImage: BlogCategoryIndexPageGetPageDataQuery_allArticles_image_responsiveImage | null;
}

export interface BlogCategoryIndexPageGetPageDataQuery_allArticles_author_image_responsiveImage {
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

export interface BlogCategoryIndexPageGetPageDataQuery_allArticles_author_image {
  __typename: "FileField";
  id: any;
  responsiveImage: BlogCategoryIndexPageGetPageDataQuery_allArticles_author_image_responsiveImage | null;
}

export interface BlogCategoryIndexPageGetPageDataQuery_allArticles_author {
  __typename: "AuthorRecord";
  id: any;
  name: string | null;
  image: BlogCategoryIndexPageGetPageDataQuery_allArticles_author_image | null;
}

export interface BlogCategoryIndexPageGetPageDataQuery_allArticles_categories {
  __typename: "CategoryRecord";
  id: any;
  name: string | null;
  slug: string | null;
}

export interface BlogCategoryIndexPageGetPageDataQuery_allArticles {
  __typename: "ArticleRecord";
  id: any;
  updatedAt: any;
  title: string | null;
  slug: string | null;
  shortDescription: string | null;
  image: BlogCategoryIndexPageGetPageDataQuery_allArticles_image | null;
  author: BlogCategoryIndexPageGetPageDataQuery_allArticles_author | null;
  categories: BlogCategoryIndexPageGetPageDataQuery_allArticles_categories[];
}

export interface BlogCategoryIndexPageGetPageDataQuery_allCategories_description {
  __typename: "CategoryModelDescriptionField";
  value: any;
  blocks: string[];
}

export interface BlogCategoryIndexPageGetPageDataQuery_allCategories__seoMetaTags {
  __typename: "Tag";
  attributes: any | null;
  content: string | null;
  tag: string;
}

export interface BlogCategoryIndexPageGetPageDataQuery_allCategories {
  __typename: "CategoryRecord";
  id: any;
  name: string | null;
  shortName: string | null;
  slug: string | null;
  description: BlogCategoryIndexPageGetPageDataQuery_allCategories_description | null;
  /**
   * SEO meta tags
   */
  _seoMetaTags: BlogCategoryIndexPageGetPageDataQuery_allCategories__seoMetaTags[];
}

export interface BlogCategoryIndexPageGetPageDataQuery_blogIndexPage__seoMetaTags {
  __typename: "Tag";
  attributes: any | null;
  content: string | null;
  tag: string;
}

export interface BlogCategoryIndexPageGetPageDataQuery_blogIndexPage {
  __typename: "BlogIndexPageRecord";
  id: any;
  /**
   * SEO meta tags
   */
  _seoMetaTags: BlogCategoryIndexPageGetPageDataQuery_blogIndexPage__seoMetaTags[];
}

export interface BlogCategoryIndexPageGetPageDataQuery {
  /**
   * Returns a collection of records
   */
  allArticles: BlogCategoryIndexPageGetPageDataQuery_allArticles[];
  /**
   * Returns a collection of records
   */
  allCategories: BlogCategoryIndexPageGetPageDataQuery_allCategories[];
  /**
   * Returns the single instance record
   */
  blogIndexPage: BlogCategoryIndexPageGetPageDataQuery_blogIndexPage | null;
}

export interface BlogCategoryIndexPageGetPageDataQueryVariables {
  first?: any | null;
  skip?: any | null;
  categoryId: any;
}
