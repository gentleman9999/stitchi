/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CreateDesignSlideOverGetDesignDataQuery
// ====================================================

export interface CreateDesignSlideOverGetDesignDataQuery_designProduct_primaryImageFile {
  __typename: "FileImage";
  id: string;
  url: string;
  width: number;
  height: number;
}

export interface CreateDesignSlideOverGetDesignDataQuery_designProduct {
  __typename: "DesignProduct";
  id: string;
  name: string;
  description: string | null;
  primaryImageFile: CreateDesignSlideOverGetDesignDataQuery_designProduct_primaryImageFile | null;
}

export interface CreateDesignSlideOverGetDesignDataQuery {
  designProduct: CreateDesignSlideOverGetDesignDataQuery_designProduct | null;
}

export interface CreateDesignSlideOverGetDesignDataQueryVariables {
  designId: string;
}
