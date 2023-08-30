/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ClosetInboxIndexPageNotificationFragment
// ====================================================

export interface ClosetInboxIndexPageNotificationFragment_channels_NotificationChannelEmail {
  __typename: "NotificationChannelEmail";
  id: string;
}

export interface ClosetInboxIndexPageNotificationFragment_channels_NotificationChannelWeb {
  __typename: "NotificationChannelWeb";
  id: string;
  message: string;
  ctaUrl: string | null;
  ctaLabel: string | null;
}

export type ClosetInboxIndexPageNotificationFragment_channels = ClosetInboxIndexPageNotificationFragment_channels_NotificationChannelEmail | ClosetInboxIndexPageNotificationFragment_channels_NotificationChannelWeb;

export interface ClosetInboxIndexPageNotificationFragment {
  __typename: "Notification";
  id: string;
  createdAt: any;
  channels: (ClosetInboxIndexPageNotificationFragment_channels | null)[];
}
