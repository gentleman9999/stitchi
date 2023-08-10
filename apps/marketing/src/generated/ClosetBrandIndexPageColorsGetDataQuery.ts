/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ClosetBrandIndexPageColorsGetDataQuery
// ====================================================

export interface ClosetBrandIndexPageColorsGetDataQuery_viewer_organization_brand_colors {
  __typename: "Color";
  id: string;
  name: string;
  hex: string;
  cmykC: number | null;
  cmykM: number | null;
  cmykY: number | null;
  cmykK: number | null;
}

export interface ClosetBrandIndexPageColorsGetDataQuery_viewer_organization_brand {
  __typename: "OrganizationBrand";
  id: string;
  colors: ClosetBrandIndexPageColorsGetDataQuery_viewer_organization_brand_colors[];
}

export interface ClosetBrandIndexPageColorsGetDataQuery_viewer_organization {
  __typename: "Organization";
  id: string;
  brand: ClosetBrandIndexPageColorsGetDataQuery_viewer_organization_brand | null;
}

export interface ClosetBrandIndexPageColorsGetDataQuery_viewer {
  __typename: "Membership";
  id: string;
  organization: ClosetBrandIndexPageColorsGetDataQuery_viewer_organization;
}

export interface ClosetBrandIndexPageColorsGetDataQuery {
  viewer: ClosetBrandIndexPageColorsGetDataQuery_viewer | null;
}
