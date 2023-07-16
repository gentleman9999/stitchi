/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DesignRequestStatus } from "./globalTypes";

// ====================================================
// GraphQL query operation: ClosetDesignRequestShowPageGetDataQuery
// ====================================================

export interface ClosetDesignRequestShowPageGetDataQuery_designRequest {
  __typename: "DesignRequest";
  id: string;
  name: string;
  status: DesignRequestStatus;
}

export interface ClosetDesignRequestShowPageGetDataQuery {
  designRequest: ClosetDesignRequestShowPageGetDataQuery_designRequest | null;
}

export interface ClosetDesignRequestShowPageGetDataQueryVariables {
  designId: string;
}
