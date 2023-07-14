/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { MembershipDesignRequestsFilterInput, DesignRequestStatus } from "./globalTypes";

// ====================================================
// GraphQL query operation: ClosetDesignIndexPageGetDataQuery
// ====================================================

export interface ClosetDesignIndexPageGetDataQuery_viewer_designRequests_edges_node {
  __typename: "DesignRequest";
  id: string;
  name: string;
  updatedAt: any | null;
  status: DesignRequestStatus;
  humanizedStatus: string;
}

export interface ClosetDesignIndexPageGetDataQuery_viewer_designRequests_edges {
  __typename: "DesignRequestEdge";
  /**
   * https: // facebook.github.io/relay/graphql/connections.htm#sec-Node
   */
  node: ClosetDesignIndexPageGetDataQuery_viewer_designRequests_edges_node | null;
}

export interface ClosetDesignIndexPageGetDataQuery_viewer_designRequests {
  __typename: "DesignRequestConnection";
  /**
   * https: // facebook.github.io/relay/graphql/connections.htm#sec-Edge-Types
   */
  edges: (ClosetDesignIndexPageGetDataQuery_viewer_designRequests_edges | null)[] | null;
}

export interface ClosetDesignIndexPageGetDataQuery_viewer {
  __typename: "Membership";
  id: string;
  designRequests: ClosetDesignIndexPageGetDataQuery_viewer_designRequests;
}

export interface ClosetDesignIndexPageGetDataQuery {
  viewer: ClosetDesignIndexPageGetDataQuery_viewer | null;
}

export interface ClosetDesignIndexPageGetDataQueryVariables {
  first?: number | null;
  after?: string | null;
  filter?: MembershipDesignRequestsFilterInput | null;
}
