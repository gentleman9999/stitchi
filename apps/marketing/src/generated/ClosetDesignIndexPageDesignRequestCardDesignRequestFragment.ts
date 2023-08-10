/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DesignRequestStatus } from "./globalTypes";

// ====================================================
// GraphQL fragment: ClosetDesignIndexPageDesignRequestCardDesignRequestFragment
// ====================================================

export interface ClosetDesignIndexPageDesignRequestCardDesignRequestFragment_previewImage {
  __typename: "FileImage";
  id: string;
  url: string;
  width: number;
  height: number;
}

export interface ClosetDesignIndexPageDesignRequestCardDesignRequestFragment {
  __typename: "DesignRequest";
  id: string;
  name: string;
  updatedAt: any | null;
  status: DesignRequestStatus;
  humanizedStatus: string;
  previewImage: ClosetDesignIndexPageDesignRequestCardDesignRequestFragment_previewImage | null;
}
