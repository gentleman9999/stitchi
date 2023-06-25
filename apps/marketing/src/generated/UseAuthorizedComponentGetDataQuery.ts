/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ScopeResource, ScopeAction } from "./globalTypes";

// ====================================================
// GraphQL query operation: UseAuthorizedComponentGetDataQuery
// ====================================================

export interface UseAuthorizedComponentGetDataQuery_viewer_scopes {
  __typename: "Scope";
  resource: ScopeResource;
  action: ScopeAction;
}

export interface UseAuthorizedComponentGetDataQuery_viewer {
  __typename: "Membership";
  scopes: UseAuthorizedComponentGetDataQuery_viewer_scopes[];
}

export interface UseAuthorizedComponentGetDataQuery {
  viewer: UseAuthorizedComponentGetDataQuery_viewer | null;
}
