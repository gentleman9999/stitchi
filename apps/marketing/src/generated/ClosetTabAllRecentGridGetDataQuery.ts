/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ClosetTabAllRecentGridGetDataQuery
// ====================================================

export interface ClosetTabAllRecentGridGetDataQuery_viewer_designRequests_edges_node {
  __typename: "DesignRequest";
  id: string;
  name: string;
  previewImageUrl: string | null;
}

export interface ClosetTabAllRecentGridGetDataQuery_viewer_designRequests_edges {
  __typename: "DesignRequestEdge";
  /**
   * https: // facebook.github.io/relay/graphql/connections.htm#sec-Node
   */
  node: ClosetTabAllRecentGridGetDataQuery_viewer_designRequests_edges_node | null;
}

export interface ClosetTabAllRecentGridGetDataQuery_viewer_designRequests {
  __typename: "DesignRequestConnection";
  /**
   * https: // facebook.github.io/relay/graphql/connections.htm#sec-Edge-Types
   */
  edges: (ClosetTabAllRecentGridGetDataQuery_viewer_designRequests_edges | null)[] | null;
}

export interface ClosetTabAllRecentGridGetDataQuery_viewer {
  __typename: "Membership";
  designRequests: ClosetTabAllRecentGridGetDataQuery_viewer_designRequests;
}

export interface ClosetTabAllRecentGridGetDataQuery {
  viewer: ClosetTabAllRecentGridGetDataQuery_viewer | null;
}
