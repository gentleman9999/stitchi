/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DesignRequestStatus } from "./globalTypes";

// ====================================================
// GraphQL fragment: ClosetTabAllDesignRequestFragment
// ====================================================

export interface ClosetTabAllDesignRequestFragment {
  __typename: "DesignRequest";
  id: string;
  name: string;
  updatedAt: any | null;
  status: DesignRequestStatus;
  humanizedStatus: string;
}
