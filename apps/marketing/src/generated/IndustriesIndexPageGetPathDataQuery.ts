/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: IndustriesIndexPageGetPathDataQuery
// ====================================================

export interface IndustriesIndexPageGetPathDataQuery_allLandingPages {
  __typename: "LandingPageRecord";
  id: any;
  slug: string | null;
}

export interface IndustriesIndexPageGetPathDataQuery {
  /**
   * Returns a collection of records
   */
  allLandingPages: IndustriesIndexPageGetPathDataQuery_allLandingPages[];
}

export interface IndustriesIndexPageGetPathDataQueryVariables {
  category: string;
}
