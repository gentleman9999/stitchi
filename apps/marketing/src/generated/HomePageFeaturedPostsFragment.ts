/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: HomePageFeaturedPostsFragment
// ====================================================

export interface HomePageFeaturedPostsFragment_image_responsiveImage {
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

export interface HomePageFeaturedPostsFragment_image {
  __typename: "FileField";
  responsiveImage: HomePageFeaturedPostsFragment_image_responsiveImage | null;
}

export interface HomePageFeaturedPostsFragment_author_image_responsiveImage {
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

export interface HomePageFeaturedPostsFragment_author_image {
  __typename: "FileField";
  id: any;
  responsiveImage: HomePageFeaturedPostsFragment_author_image_responsiveImage | null;
}

export interface HomePageFeaturedPostsFragment_author {
  __typename: "AuthorRecord";
  id: any;
  name: string | null;
  image: HomePageFeaturedPostsFragment_author_image | null;
}

export interface HomePageFeaturedPostsFragment_categories {
  __typename: "CategoryRecord";
  id: any;
  name: string | null;
  slug: string | null;
}

export interface HomePageFeaturedPostsFragment {
  __typename: "ArticleRecord";
  id: any;
  _publishedAt: any | null;
  _createdAt: any;
  title: string | null;
  slug: string | null;
  shortDescription: string | null;
  image: HomePageFeaturedPostsFragment_image | null;
  author: HomePageFeaturedPostsFragment_author | null;
  categories: HomePageFeaturedPostsFragment_categories[];
}
