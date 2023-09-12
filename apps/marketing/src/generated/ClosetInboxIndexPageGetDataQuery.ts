/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ClosetInboxIndexPageGetDataQuery
// ====================================================

export interface ClosetInboxIndexPageGetDataQuery_viewer_notifications_edges_node_channels_NotificationChannelEmail {
  __typename: "NotificationChannelEmail";
  id: string;
}

export interface ClosetInboxIndexPageGetDataQuery_viewer_notifications_edges_node_channels_NotificationChannelWeb {
  __typename: "NotificationChannelWeb";
  id: string;
  message: string;
  ctaText: string | null;
  ctaUrl: string | null;
}

export type ClosetInboxIndexPageGetDataQuery_viewer_notifications_edges_node_channels = ClosetInboxIndexPageGetDataQuery_viewer_notifications_edges_node_channels_NotificationChannelEmail | ClosetInboxIndexPageGetDataQuery_viewer_notifications_edges_node_channels_NotificationChannelWeb;

export interface ClosetInboxIndexPageGetDataQuery_viewer_notifications_edges_node {
  __typename: "Notification";
  id: string;
  createdAt: any;
  channels: (ClosetInboxIndexPageGetDataQuery_viewer_notifications_edges_node_channels | null)[];
}

export interface ClosetInboxIndexPageGetDataQuery_viewer_notifications_edges {
  __typename: "NotificationEdge";
  /**
   * https: // facebook.github.io/relay/graphql/connections.htm#sec-Node
   */
  node: ClosetInboxIndexPageGetDataQuery_viewer_notifications_edges_node | null;
}

export interface ClosetInboxIndexPageGetDataQuery_viewer_notifications_pageInfo {
  __typename: "PageInfo";
  /**
   * When paginating forwards, are there more items?
   */
  hasNextPage: boolean;
  /**
   * When paginating forwards, the cursor to continue.
   */
  endCursor: string | null;
}

export interface ClosetInboxIndexPageGetDataQuery_viewer_notifications {
  __typename: "NotificationConnection";
  /**
   * https: // facebook.github.io/relay/graphql/connections.htm#sec-Edge-Types
   */
  edges: (ClosetInboxIndexPageGetDataQuery_viewer_notifications_edges | null)[] | null;
  /**
   * https: // facebook.github.io/relay/graphql/connections.htm#sec-undefined.PageInfo
   */
  pageInfo: ClosetInboxIndexPageGetDataQuery_viewer_notifications_pageInfo;
}

export interface ClosetInboxIndexPageGetDataQuery_viewer {
  __typename: "Membership";
  id: string;
  notifications: ClosetInboxIndexPageGetDataQuery_viewer_notifications | null;
}

export interface ClosetInboxIndexPageGetDataQuery {
  viewer: ClosetInboxIndexPageGetDataQuery_viewer | null;
}

export interface ClosetInboxIndexPageGetDataQueryVariables {
  first: number;
  after?: string | null;
}
