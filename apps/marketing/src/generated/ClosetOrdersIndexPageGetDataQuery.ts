/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ClosetOrdersIndexPageGetDataQuery
// ====================================================

export interface ClosetOrdersIndexPageGetDataQuery_viewer_orders_edges_node {
  __typename: "Order";
  id: string;
  humanOrderId: string;
  humanPaymentStatus: string;
  totalTaxCents: number;
  totalPriceCents: number;
  createdAt: any;
}

export interface ClosetOrdersIndexPageGetDataQuery_viewer_orders_edges {
  __typename: "OrderEdge";
  /**
   * https: // facebook.github.io/relay/graphql/connections.htm#sec-Node
   */
  node: ClosetOrdersIndexPageGetDataQuery_viewer_orders_edges_node | null;
}

export interface ClosetOrdersIndexPageGetDataQuery_viewer_orders_pageInfo {
  __typename: "PageInfo";
  /**
   * When paginating forwards, are there more items?
   */
  hasNextPage: boolean;
  /**
   * When paginating backwards, are there more items?
   */
  hasPreviousPage: boolean;
  /**
   * When paginating backwards, the cursor to continue.
   */
  startCursor: string | null;
  /**
   * When paginating forwards, the cursor to continue.
   */
  endCursor: string | null;
}

export interface ClosetOrdersIndexPageGetDataQuery_viewer_orders {
  __typename: "OrderConnection";
  /**
   * https: // facebook.github.io/relay/graphql/connections.htm#sec-Edge-Types
   */
  edges: (ClosetOrdersIndexPageGetDataQuery_viewer_orders_edges | null)[] | null;
  /**
   * https: // facebook.github.io/relay/graphql/connections.htm#sec-undefined.PageInfo
   */
  pageInfo: ClosetOrdersIndexPageGetDataQuery_viewer_orders_pageInfo;
}

export interface ClosetOrdersIndexPageGetDataQuery_viewer {
  __typename: "Membership";
  id: string;
  orders: ClosetOrdersIndexPageGetDataQuery_viewer_orders | null;
}

export interface ClosetOrdersIndexPageGetDataQuery {
  viewer: ClosetOrdersIndexPageGetDataQuery_viewer | null;
}
