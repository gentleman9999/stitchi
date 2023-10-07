/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ArticleModelFilter } from "./globalTypes";

// ====================================================
// GraphQL query operation: HomePageGetDataQuery
// ====================================================

export interface HomePageGetDataQuery_featuredPosts {
  __typename: "ArticleRecord";
  id: any;
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
