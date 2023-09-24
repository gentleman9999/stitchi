/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { MembershipRole } from "./globalTypes";

// ====================================================
// GraphQL query operation: ClosetDesignIndexPageGetDataQuery
// ====================================================

export interface ClosetDesignIndexPageGetDataQuery_viewer {
  __typename: "Membership";
  id: string;
  role: MembershipRole | null;
}

export interface ClosetDesignIndexPageGetDataQuery {
  viewer: ClosetDesignIndexPageGetDataQuery_viewer | null;
}
