/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: HomePageFeaturedPostsPostsFragment
// ====================================================

export interface HomePageFeaturedPostsPostsFragment_image_responsiveImage {
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

export interface HomePageFeaturedPostsPostsFragment_image {
  __typename: "FileField";
  responsiveImage: HomePageFeaturedPostsPostsFragment_image_responsiveImage | null;
}

export interface HomePageFeaturedPostsPostsFragment_author_image_responsiveImage {
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

export interface HomePageFeaturedPostsPostsFragment_author_image {
  __typename: "FileField";
  id: any;
  responsiveImage: HomePageFeaturedPostsPostsFragment_author_image_responsiveImage | null;
}

export interface HomePageFeaturedPostsPostsFragment_author {
  __typename: "AuthorRecord";
  id: any;
  name: string | null;
  image: HomePageFeaturedPostsPostsFragment_author_image | null;
}

export interface HomePageFeaturedPostsPostsFragment_categories {
  __typename: "CategoryRecord";
  id: any;
  name: string | null;
  slug: string | null;
}

export interface HomePageFeaturedPostsPostsFragment {
  __typename: "ArticleRecord";
  id: any;
  _publishedAt: any | null;
  _createdAt: any;
  title: string | null;
  slug: string | null;
  shortDescription: string | null;
  image: HomePageFeaturedPostsPostsFragment_image | null;
  author: HomePageFeaturedPostsPostsFragment_author | null;
  categories: HomePageFeaturedPostsPostsFragment_categories[];
}
