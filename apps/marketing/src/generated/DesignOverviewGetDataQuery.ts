/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: DesignOverviewGetDataQuery
// ====================================================

export interface DesignOverviewGetDataQuery_designProduct_colors_images {
  __typename: "FileImage";
  id: string;
  url: string;
  width: number;
  height: number;
}

export interface DesignOverviewGetDataQuery_designProduct_colors {
  __typename: "DesignProductColor";
  id: string;
  hex: string | null;
  name: string | null;
  images: DesignOverviewGetDataQuery_designProduct_colors_images[];
}

export interface DesignOverviewGetDataQuery_designProduct {
  __typename: "DesignProduct";
  id: string;
  description: string | null;
  colors: DesignOverviewGetDataQuery_designProduct_colors[];
}

export interface DesignOverviewGetDataQuery {
  designProduct: DesignOverviewGetDataQuery_designProduct | null;
}

export interface DesignOverviewGetDataQueryVariables {
  designId: string;
}
