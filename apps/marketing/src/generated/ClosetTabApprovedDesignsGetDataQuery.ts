/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { MembershipDesignProductsFilterInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: ClosetTabApprovedDesignsGetDataQuery
// ====================================================

export interface ClosetTabApprovedDesignsGetDataQuery_viewer_designProducts_edges_node_primaryImageFile {
  __typename: "FileImage";
  id: string;
  url: string;
  width: number;
  height: number;
}

export interface ClosetTabApprovedDesignsGetDataQuery_viewer_designProducts_edges_node {
  __typename: "DesignProduct";
  id: string;
  name: string;
  primaryImageFile: ClosetTabApprovedDesignsGetDataQuery_viewer_designProducts_edges_node_primaryImageFile | null;
}

export interface ClosetTabApprovedDesignsGetDataQuery_viewer_designProducts_edges {
  __typename: "DesignProductEdge";
  /**
   * https: // facebook.github.io/relay/graphql/connections.htm#sec-Node
   */
  node: ClosetTabApprovedDesignsGetDataQuery_viewer_designProducts_edges_node | null;
}

export interface ClosetTabApprovedDesignsGetDataQuery_viewer_designProducts {
  __typename: "DesignProductConnection";
  /**
   * https: // facebook.github.io/relay/graphql/connections.htm#sec-Edge-Types
   */
  edges: (ClosetTabApprovedDesignsGetDataQuery_viewer_designProducts_edges | null)[] | null;
}

export interface ClosetTabApprovedDesignsGetDataQuery_viewer {
  __typename: "Membership";
  id: string;
  designProducts: ClosetTabApprovedDesignsGetDataQuery_viewer_designProducts;
}

export interface ClosetTabApprovedDesignsGetDataQuery {
  viewer: ClosetTabApprovedDesignsGetDataQuery_viewer | null;
}

export interface ClosetTabApprovedDesignsGetDataQueryVariables {
  first: number;
  after?: string | null;
  filter?: MembershipDesignProductsFilterInput | null;
}
