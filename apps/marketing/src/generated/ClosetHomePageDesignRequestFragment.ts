/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DesignRequestStatus } from "./globalTypes";

// ====================================================
// GraphQL fragment: ClosetHomePageDesignRequestFragment
// ====================================================

export interface ClosetHomePageDesignRequestFragment {
  __typename: "DesignRequest";
  id: string;
  name: string;
  createdAt: any;
  status: DesignRequestStatus;
  humanizedStatus: string;
}
