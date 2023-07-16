/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DesignRequestStatus, FileType } from "./globalTypes";

// ====================================================
// GraphQL query operation: DesignProofGetDataQuery
// ====================================================

export interface DesignProofGetDataQuery_designRequest_proofs {
  __typename: "DesignProof";
  id: string;
}

export interface DesignProofGetDataQuery_designRequest_designRequestProduct_colors {
  __typename: "DesignRequestProductColors";
  catalogProductColorId: string;
  name: string | null;
  hexCode: string | null;
}

export interface DesignProofGetDataQuery_designRequest_designRequestProduct_catalogProduct_primaryImage {
  __typename: "CatalogProductImage";
  url: string;
}

export interface DesignProofGetDataQuery_designRequest_designRequestProduct_catalogProduct_brand {
  __typename: "CatalogBrand";
  id: string;
  name: string;
  slug: string;
}

export interface DesignProofGetDataQuery_designRequest_designRequestProduct_catalogProduct {
  __typename: "CatalogProduct";
  id: string;
  name: string;
  slug: string;
  primaryImage: DesignProofGetDataQuery_designRequest_designRequestProduct_catalogProduct_primaryImage | null;
  brand: DesignProofGetDataQuery_designRequest_designRequestProduct_catalogProduct_brand | null;
}

export interface DesignProofGetDataQuery_designRequest_designRequestProduct {
  __typename: "DesignRequestProduct";
  id: string;
  colors: DesignProofGetDataQuery_designRequest_designRequestProduct_colors[];
  catalogProduct: DesignProofGetDataQuery_designRequest_designRequestProduct_catalogProduct | null;
}

export interface DesignProofGetDataQuery_designRequest_designRequestLocations_files_FileUnknown {
  __typename: "FileUnknown" | "FilePdf";
  id: string;
  humanizedBytes: string;
  name: string;
  url: string;
  fileType: FileType;
}

export interface DesignProofGetDataQuery_designRequest_designRequestLocations_files_FileImage {
  __typename: "FileImage";
  id: string;
  humanizedBytes: string;
  name: string;
  url: string;
  fileType: FileType;
  width: number;
  height: number;
}

export type DesignProofGetDataQuery_designRequest_designRequestLocations_files = DesignProofGetDataQuery_designRequest_designRequestLocations_files_FileUnknown | DesignProofGetDataQuery_designRequest_designRequestLocations_files_FileImage;

export interface DesignProofGetDataQuery_designRequest_designRequestLocations {
  __typename: "DesignRequestDesignLocation";
  id: string;
  description: string | null;
  placement: string | null;
  fileIds: string[];
  files: DesignProofGetDataQuery_designRequest_designRequestLocations_files[];
}

export interface DesignProofGetDataQuery_designRequest_files_FileUnknown {
  __typename: "FileUnknown" | "FilePdf";
  id: string;
  humanizedBytes: string;
  name: string;
  url: string;
  fileType: FileType;
}

export interface DesignProofGetDataQuery_designRequest_files_FileImage {
  __typename: "FileImage";
  id: string;
  humanizedBytes: string;
  name: string;
  url: string;
  fileType: FileType;
  width: number;
  height: number;
}

export type DesignProofGetDataQuery_designRequest_files = DesignProofGetDataQuery_designRequest_files_FileUnknown | DesignProofGetDataQuery_designRequest_files_FileImage;

export interface DesignProofGetDataQuery_designRequest {
  __typename: "DesignRequest";
  id: string;
  status: DesignRequestStatus;
  proofs: DesignProofGetDataQuery_designRequest_proofs[];
  designRequestProduct: DesignProofGetDataQuery_designRequest_designRequestProduct;
  fileUploadDirectory: string;
  useCase: string | null;
  fileIds: string[];
  designRequestLocations: DesignProofGetDataQuery_designRequest_designRequestLocations[];
  files: DesignProofGetDataQuery_designRequest_files[];
  description: string | null;
}

export interface DesignProofGetDataQuery {
  designRequest: DesignProofGetDataQuery_designRequest | null;
}

export interface DesignProofGetDataQueryVariables {
  designRequestId: string;
}
