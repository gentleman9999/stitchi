/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { MembershipDesignProductsFilterInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: ClosetTabApprovedDesignRequestGetDataQuery
// ====================================================

export interface ClosetTabApprovedDesignRequestGetDataQuery_viewer_designProducts_edges_node_primaryImageFile {
  __typename: "FileImage";
  id: string;
  url: string;
  width: number;
  height: number;
}

export interface ClosetTabApprovedDesignRequestGetDataQuery_viewer_designProducts_edges_node {
  __typename: "DesignProduct";
  id: string;
  name: string;
  primaryImageFile: ClosetTabApprovedDesignRequestGetDataQuery_viewer_designProducts_edges_node_primaryImageFile | null;
}

export interface ClosetTabApprovedDesignRequestGetDataQuery_viewer_designProducts_edges {
  __typename: "DesignProductEdge";
  /**
   * https: // facebook.github.io/relay/graphql/connections.htm#sec-Node
   */
  node: ClosetTabApprovedDesignRequestGetDataQuery_viewer_designProducts_edges_node | null;
}

export interface ClosetTabApprovedDesignRequestGetDataQuery_viewer_designProducts {
  __typename: "DesignProductConnection";
  /**
   * https: // facebook.github.io/relay/graphql/connections.htm#sec-Edge-Types
   */
  edges: (ClosetTabApprovedDesignRequestGetDataQuery_viewer_designProducts_edges | null)[] | null;
}

export interface ClosetTabApprovedDesignRequestGetDataQuery_viewer {
  __typename: "Membership";
  id: string;
  designProducts: ClosetTabApprovedDesignRequestGetDataQuery_viewer_designProducts;
}

export interface ClosetTabApprovedDesignRequestGetDataQuery {
  viewer: ClosetTabApprovedDesignRequestGetDataQuery_viewer | null;
}

export interface ClosetTabApprovedDesignRequestGetDataQueryVariables {
  first: number;
  after?: string | null;
  filter?: MembershipDesignProductsFilterInput | null;
}
