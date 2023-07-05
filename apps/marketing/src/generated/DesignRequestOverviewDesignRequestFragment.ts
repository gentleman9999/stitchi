/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DesignRequestStatus, FileType } from "./globalTypes";

// ====================================================
// GraphQL fragment: DesignRequestOverviewDesignRequestFragment
// ====================================================

export interface DesignRequestOverviewDesignRequestFragment_designRequestProducts_colors {
  __typename: "DesignRequestProductColors";
  hexCode: string | null;
  name: string | null;
}

export interface DesignRequestOverviewDesignRequestFragment_designRequestProducts_catalogProduct_primaryImage {
  __typename: "CatalogProductImage";
  url: string;
}

export interface DesignRequestOverviewDesignRequestFragment_designRequestProducts_catalogProduct_brand {
  __typename: "CatalogBrand";
  id: string;
  name: string;
  slug: string;
}

export interface DesignRequestOverviewDesignRequestFragment_designRequestProducts_catalogProduct {
  __typename: "CatalogProduct";
  id: string;
  name: string;
  slug: string;
  primaryImage: DesignRequestOverviewDesignRequestFragment_designRequestProducts_catalogProduct_primaryImage | null;
  brand: DesignRequestOverviewDesignRequestFragment_designRequestProducts_catalogProduct_brand | null;
}

export interface DesignRequestOverviewDesignRequestFragment_designRequestProducts {
  __typename: "DesignRequestProduct";
  id: string;
  colors: DesignRequestOverviewDesignRequestFragment_designRequestProducts_colors[];
  catalogProduct: DesignRequestOverviewDesignRequestFragment_designRequestProducts_catalogProduct | null;
}

export interface DesignRequestOverviewDesignRequestFragment_designRequestLocations_files_FileUnknown {
  __typename: "FileUnknown" | "FilePdf";
  id: string;
  humanizedBytes: string;
  name: string;
  url: string;
  fileType: FileType;
}

export interface DesignRequestOverviewDesignRequestFragment_designRequestLocations_files_FileImage {
  __typename: "FileImage";
  id: string;
  humanizedBytes: string;
  name: string;
  url: string;
  fileType: FileType;
  width: number;
  height: number;
}

export type DesignRequestOverviewDesignRequestFragment_designRequestLocations_files = DesignRequestOverviewDesignRequestFragment_designRequestLocations_files_FileUnknown | DesignRequestOverviewDesignRequestFragment_designRequestLocations_files_FileImage;

export interface DesignRequestOverviewDesignRequestFragment_designRequestLocations {
  __typename: "DesignRequestDesignLocation";
  id: string;
  description: string | null;
  placement: string | null;
  fileIds: string[];
  files: DesignRequestOverviewDesignRequestFragment_designRequestLocations_files[];
}

export interface DesignRequestOverviewDesignRequestFragment_files_FileUnknown {
  __typename: "FileUnknown" | "FilePdf";
  id: string;
  humanizedBytes: string;
  name: string;
  url: string;
  fileType: FileType;
}

export interface DesignRequestOverviewDesignRequestFragment_files_FileImage {
  __typename: "FileImage";
  id: string;
  humanizedBytes: string;
  name: string;
  url: string;
  fileType: FileType;
  width: number;
  height: number;
}

export type DesignRequestOverviewDesignRequestFragment_files = DesignRequestOverviewDesignRequestFragment_files_FileUnknown | DesignRequestOverviewDesignRequestFragment_files_FileImage;

export interface DesignRequestOverviewDesignRequestFragment {
  __typename: "DesignRequest";
  id: string;
  status: DesignRequestStatus;
  designRequestProducts: DesignRequestOverviewDesignRequestFragment_designRequestProducts[];
  description: string | null;
  fileUploadDirectory: string;
  useCase: string | null;
  fileIds: string[];
  designRequestLocations: DesignRequestOverviewDesignRequestFragment_designRequestLocations[];
  files: DesignRequestOverviewDesignRequestFragment_files[];
}
