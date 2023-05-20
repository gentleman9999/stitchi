/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: DesignLibraryPageGetDataQuery
// ====================================================

export interface DesignLibraryPageGetDataQuery_allDesigns_primaryImage_responsiveImage {
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

export interface DesignLibraryPageGetDataQuery_allDesigns_primaryImage {
  __typename: "FileField";
  id: any;
  responsiveImage: DesignLibraryPageGetDataQuery_allDesigns_primaryImage_responsiveImage | null;
}

export interface DesignLibraryPageGetDataQuery_allDesigns {
  __typename: "DesignRecord";
  id: any;
  primaryImage: DesignLibraryPageGetDataQuery_allDesigns_primaryImage | null;
}

export interface DesignLibraryPageGetDataQuery {
  /**
   * Returns a collection of records
   */
  allDesigns: DesignLibraryPageGetDataQuery_allDesigns[];
}

export interface DesignLibraryPageGetDataQueryVariables {
  first?: any | null;
  skip?: any | null;
}
