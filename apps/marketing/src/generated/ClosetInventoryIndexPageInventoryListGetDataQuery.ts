/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { MembershipDesignProductsFilterInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: ClosetInventoryIndexPageInventoryListGetDataQuery
// ====================================================

export interface ClosetInventoryIndexPageInventoryListGetDataQuery_viewer_designProducts_edges_node_colors {
  __typename: "DesignProductColor";
  id: string;
  hex: string | null;
  name: string | null;
}

export interface ClosetInventoryIndexPageInventoryListGetDataQuery_viewer_designProducts_edges_node_primaryImageFile {
  __typename: "FileImage";
  id: string;
  url: string;
  width: number;
  height: number;
}

export interface ClosetInventoryIndexPageInventoryListGetDataQuery_viewer_designProducts_edges_node {
  __typename: "DesignProduct";
  id: string;
  name: string;
  minUnitPriceCents: number | null;
  inStockQty: number;
  inProductionQty: number;
  colors: ClosetInventoryIndexPageInventoryListGetDataQuery_viewer_designProducts_edges_node_colors[];
  primaryImageFile: ClosetInventoryIndexPageInventoryListGetDataQuery_viewer_designProducts_edges_node_primaryImageFile | null;
}

export interface ClosetInventoryIndexPageInventoryListGetDataQuery_viewer_designProducts_edges {
  __typename: "DesignProductEdge";
  /**
   * https: // facebook.github.io/relay/graphql/connections.htm#sec-Node
   */
  node: ClosetInventoryIndexPageInventoryListGetDataQuery_viewer_designProducts_edges_node | null;
}

export interface ClosetInventoryIndexPageInventoryListGetDataQuery_viewer_designProducts {
  __typename: "DesignProductConnection";
  /**
   * https: // facebook.github.io/relay/graphql/connections.htm#sec-Edge-Types
   */
  edges: (ClosetInventoryIndexPageInventoryListGetDataQuery_viewer_designProducts_edges | null)[] | null;
}

export interface ClosetInventoryIndexPageInventoryListGetDataQuery_viewer {
  __typename: "Membership";
  id: string;
  hasDesignProducts: boolean;
  designProducts: ClosetInventoryIndexPageInventoryListGetDataQuery_viewer_designProducts;
}

export interface ClosetInventoryIndexPageInventoryListGetDataQuery {
  viewer: ClosetInventoryIndexPageInventoryListGetDataQuery_viewer | null;
}

export interface ClosetInventoryIndexPageInventoryListGetDataQueryVariables {
  first: number;
  after?: string | null;
  filter?: MembershipDesignProductsFilterInput | null;
}
