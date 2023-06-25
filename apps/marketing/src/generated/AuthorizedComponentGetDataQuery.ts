/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ScopeResource, ScopeModifier, ScopeAction } from "./globalTypes";

// ====================================================
// GraphQL query operation: AuthorizedComponentGetDataQuery
// ====================================================

export interface AuthorizedComponentGetDataQuery_viewer_scopes {
  __typename: "Scope";
  resource: ScopeResource;
  modifier: ScopeModifier;
  action: ScopeAction;
}

export interface AuthorizedComponentGetDataQuery_viewer {
  __typename: "Membership";
  scopes: AuthorizedComponentGetDataQuery_viewer_scopes[];
}

export interface AuthorizedComponentGetDataQuery {
  viewer: AuthorizedComponentGetDataQuery_viewer | null;
}
