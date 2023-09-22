/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { MembershipDesignRequestsFilterInput, DesignRequestStatus } from "./globalTypes";

// ====================================================
// GraphQL query operation: ClosetTabApprovedDesignsGetDataQuery
// ====================================================

export interface ClosetTabApprovedDesignsGetDataQuery_viewer_designRequests_edges_node_previewImage {
  __typename: "FileImage";
  id: string;
  url: string;
  width: number;
  height: number;
}

export interface ClosetTabApprovedDesignsGetDataQuery_viewer_designRequests_edges_node {
  __typename: "DesignRequest";
  id: string;
  name: string;
  updatedAt: any | null;
  status: DesignRequestStatus;
  humanizedStatus: string;
  previewImage: ClosetTabApprovedDesignsGetDataQuery_viewer_designRequests_edges_node_previewImage | null;
}

export interface ClosetTabApprovedDesignsGetDataQuery_viewer_designRequests_edges {
  __typename: "DesignRequestEdge";
  /**
   * https: // facebook.github.io/relay/graphql/connections.htm#sec-Node
   */
  node: ClosetTabApprovedDesignsGetDataQuery_viewer_designRequests_edges_node | null;
}

export interface ClosetTabApprovedDesignsGetDataQuery_viewer_designRequests {
  __typename: "DesignRequestConnection";
  /**
   * https: // facebook.github.io/relay/graphql/connections.htm#sec-Edge-Types
   */
  edges: (ClosetTabApprovedDesignsGetDataQuery_viewer_designRequests_edges | null)[] | null;
}

export interface ClosetTabApprovedDesignsGetDataQuery_viewer {
  __typename: "Membership";
  id: string;
  hasDesignProducts: boolean;
  designRequests: ClosetTabApprovedDesignsGetDataQuery_viewer_designRequests;
}

export interface ClosetTabApprovedDesignsGetDataQuery {
  viewer: ClosetTabApprovedDesignsGetDataQuery_viewer | null;
}

export interface ClosetTabApprovedDesignsGetDataQueryVariables {
  first: number;
  after?: string | null;
  filter?: MembershipDesignRequestsFilterInput | null;
}
