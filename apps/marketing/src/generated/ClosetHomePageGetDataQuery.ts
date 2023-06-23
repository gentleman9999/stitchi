/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { MembershipDesignRequestsFilterInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: ClosetHomePageGetDataQuery
// ====================================================

export interface ClosetHomePageGetDataQuery_viewer_designRequests_edges_node {
  __typename: "DesignRequest";
  id: string;
  name: string;
  createdAt: any;
}

export interface ClosetHomePageGetDataQuery_viewer_designRequests_edges {
  __typename: "DesignRequestEdge";
  /**
   * https: // facebook.github.io/relay/graphql/connections.htm#sec-Node
   */
  node: ClosetHomePageGetDataQuery_viewer_designRequests_edges_node | null;
}

export interface ClosetHomePageGetDataQuery_viewer_designRequests {
  __typename: "DesignRequestConnection";
  /**
   * https: // facebook.github.io/relay/graphql/connections.htm#sec-Edge-Types
   */
  edges: (ClosetHomePageGetDataQuery_viewer_designRequests_edges | null)[] | null;
}

export interface ClosetHomePageGetDataQuery_viewer {
  __typename: "Membership";
  id: string;
  designRequests: ClosetHomePageGetDataQuery_viewer_designRequests;
}

export interface ClosetHomePageGetDataQuery {
  viewer: ClosetHomePageGetDataQuery_viewer | null;
}

export interface ClosetHomePageGetDataQueryVariables {
  first?: number | null;
  after?: string | null;
  filter?: MembershipDesignRequestsFilterInput | null;
}
