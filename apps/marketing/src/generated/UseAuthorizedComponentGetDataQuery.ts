/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { MembershipRole, ScopeResource, ScopeAction } from "./globalTypes";

// ====================================================
// GraphQL query operation: UseAuthorizedComponentGetDataQuery
// ====================================================

export interface UseAuthorizedComponentGetDataQuery_viewer_scopes {
  __typename: "Scope";
  resource: ScopeResource;
  action: ScopeAction;
}

export interface UseAuthorizedComponentGetDataQuery_viewer_flags {
  __typename: "MembershipFlags";
  isBetaTester: boolean;
}

export interface UseAuthorizedComponentGetDataQuery_viewer {
  __typename: "Membership";
  id: string;
  role: MembershipRole | null;
  scopes: UseAuthorizedComponentGetDataQuery_viewer_scopes[];
  flags: UseAuthorizedComponentGetDataQuery_viewer_flags;
}

export interface UseAuthorizedComponentGetDataQuery {
  viewer: UseAuthorizedComponentGetDataQuery_viewer | null;
}
