/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UnclaimedDesignRequestsCardGetDataQuery
// ====================================================

export interface UnclaimedDesignRequestsCardGetDataQuery_viewer_unassignedDesignRequests_edges_node_membership_organization {
  __typename: "Organization";
  id: string;
  name: string | null;
}

export interface UnclaimedDesignRequestsCardGetDataQuery_viewer_unassignedDesignRequests_edges_node_membership_user {
  __typename: "User";
  id: string;
  name: string | null;
}

export interface UnclaimedDesignRequestsCardGetDataQuery_viewer_unassignedDesignRequests_edges_node_membership {
  __typename: "Membership";
  id: string;
  organization: UnclaimedDesignRequestsCardGetDataQuery_viewer_unassignedDesignRequests_edges_node_membership_organization;
  user: UnclaimedDesignRequestsCardGetDataQuery_viewer_unassignedDesignRequests_edges_node_membership_user | null;
}

export interface UnclaimedDesignRequestsCardGetDataQuery_viewer_unassignedDesignRequests_edges_node {
  __typename: "DesignRequest";
  id: string;
  name: string;
  membership: UnclaimedDesignRequestsCardGetDataQuery_viewer_unassignedDesignRequests_edges_node_membership | null;
}

export interface UnclaimedDesignRequestsCardGetDataQuery_viewer_unassignedDesignRequests_edges {
  __typename: "DesignRequestEdge";
  /**
   * https: // facebook.github.io/relay/graphql/connections.htm#sec-Node
   */
  node: UnclaimedDesignRequestsCardGetDataQuery_viewer_unassignedDesignRequests_edges_node | null;
}

export interface UnclaimedDesignRequestsCardGetDataQuery_viewer_unassignedDesignRequests {
  __typename: "DesignRequestConnection";
  /**
   * https: // facebook.github.io/relay/graphql/connections.htm#sec-Edge-Types
   */
  edges: (UnclaimedDesignRequestsCardGetDataQuery_viewer_unassignedDesignRequests_edges | null)[] | null;
}

export interface UnclaimedDesignRequestsCardGetDataQuery_viewer {
  __typename: "Membership";
  id: string;
  unassignedDesignRequests: UnclaimedDesignRequestsCardGetDataQuery_viewer_unassignedDesignRequests;
}

export interface UnclaimedDesignRequestsCardGetDataQuery {
  viewer: UnclaimedDesignRequestsCardGetDataQuery_viewer | null;
}

export interface UnclaimedDesignRequestsCardGetDataQueryVariables {
  first?: number | null;
  after?: string | null;
}
