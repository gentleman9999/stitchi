/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DesignRequestStatus, FileType } from "./globalTypes";

// ====================================================
// GraphQL query operation: DesignRequestOverviewGetDataQuery
// ====================================================

export interface DesignRequestOverviewGetDataQuery_designRequest_designRequestProducts_colors {
  __typename: "DesignRequestProductColors";
  hexCode: string | null;
  name: string | null;
}

export interface DesignRequestOverviewGetDataQuery_designRequest_designRequestProducts_catalogProduct_primaryImage {
  __typename: "CatalogProductImage";
  url: string;
}

export interface DesignRequestOverviewGetDataQuery_designRequest_designRequestProducts_catalogProduct_brand {
  __typename: "CatalogBrand";
  id: string;
  name: string;
  slug: string;
}

export interface DesignRequestOverviewGetDataQuery_designRequest_designRequestProducts_catalogProduct {
  __typename: "CatalogProduct";
  id: string;
  name: string;
  slug: string;
  primaryImage: DesignRequestOverviewGetDataQuery_designRequest_designRequestProducts_catalogProduct_primaryImage | null;
  brand: DesignRequestOverviewGetDataQuery_designRequest_designRequestProducts_catalogProduct_brand | null;
}

export interface DesignRequestOverviewGetDataQuery_designRequest_designRequestProducts {
  __typename: "DesignRequestProduct";
  id: string;
  colors: DesignRequestOverviewGetDataQuery_designRequest_designRequestProducts_colors[];
  catalogProduct: DesignRequestOverviewGetDataQuery_designRequest_designRequestProducts_catalogProduct | null;
}

export interface DesignRequestOverviewGetDataQuery_designRequest_designRequestLocations_files_FileUnknown {
  __typename: "FileUnknown" | "FilePdf";
  id: string;
  humanizedBytes: string;
  name: string;
  url: string;
  fileType: FileType;
}

export interface DesignRequestOverviewGetDataQuery_designRequest_designRequestLocations_files_FileImage {
  __typename: "FileImage";
  id: string;
  humanizedBytes: string;
  name: string;
  url: string;
  fileType: FileType;
  width: number;
  height: number;
}

export type DesignRequestOverviewGetDataQuery_designRequest_designRequestLocations_files = DesignRequestOverviewGetDataQuery_designRequest_designRequestLocations_files_FileUnknown | DesignRequestOverviewGetDataQuery_designRequest_designRequestLocations_files_FileImage;

export interface DesignRequestOverviewGetDataQuery_designRequest_designRequestLocations {
  __typename: "DesignRequestDesignLocation";
  id: string;
  description: string | null;
  placement: string | null;
  fileIds: string[];
  files: DesignRequestOverviewGetDataQuery_designRequest_designRequestLocations_files[];
}

export interface DesignRequestOverviewGetDataQuery_designRequest_files_FileUnknown {
  __typename: "FileUnknown" | "FilePdf";
  id: string;
  humanizedBytes: string;
  name: string;
  url: string;
  fileType: FileType;
}

export interface DesignRequestOverviewGetDataQuery_designRequest_files_FileImage {
  __typename: "FileImage";
  id: string;
  humanizedBytes: string;
  name: string;
  url: string;
  fileType: FileType;
  width: number;
  height: number;
}

export type DesignRequestOverviewGetDataQuery_designRequest_files = DesignRequestOverviewGetDataQuery_designRequest_files_FileUnknown | DesignRequestOverviewGetDataQuery_designRequest_files_FileImage;

export interface DesignRequestOverviewGetDataQuery_designRequest {
  __typename: "DesignRequest";
  id: string;
  status: DesignRequestStatus;
  designRequestProducts: DesignRequestOverviewGetDataQuery_designRequest_designRequestProducts[];
  fileUploadDirectory: string;
  useCase: string | null;
  fileIds: string[];
  designRequestLocations: DesignRequestOverviewGetDataQuery_designRequest_designRequestLocations[];
  files: DesignRequestOverviewGetDataQuery_designRequest_files[];
  description: string | null;
}

export interface DesignRequestOverviewGetDataQuery {
  designRequest: DesignRequestOverviewGetDataQuery_designRequest | null;
}

export interface DesignRequestOverviewGetDataQueryVariables {
  designRequestId: string;
}
