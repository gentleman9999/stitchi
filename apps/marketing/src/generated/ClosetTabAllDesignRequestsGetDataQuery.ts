/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import {
  MembershipDesignRequestsFilterInput,
  DesignRequestStatus,
} from './globalTypes'

// ====================================================
// GraphQL query operation: ClosetTabInProgressDesignRequestsGetDataQuery
// ====================================================

export interface ClosetTabInProgressDesignRequestsGetDataQuery_viewer_designRequests_edges_node {
  __typename: 'DesignRequest'
  id: string
  name: string
  updatedAt: any | null
  status: DesignRequestStatus
  humanizedStatus: string
  previewImageUrl: string | null
}

export interface ClosetTabInProgressDesignRequestsGetDataQuery_viewer_designRequests_edges {
  __typename: 'DesignRequestEdge'
  /**
   * https: // facebook.github.io/relay/graphql/connections.htm#sec-Node
   */
  node: ClosetTabInProgressDesignRequestsGetDataQuery_viewer_designRequests_edges_node | null
}

export interface ClosetTabInProgressDesignRequestsGetDataQuery_viewer_designRequests {
  __typename: 'DesignRequestConnection'
  /**
   * https: // facebook.github.io/relay/graphql/connections.htm#sec-Edge-Types
   */
  edges:
    | (ClosetTabInProgressDesignRequestsGetDataQuery_viewer_designRequests_edges | null)[]
    | null
}

export interface ClosetTabInProgressDesignRequestsGetDataQuery_viewer {
  __typename: 'Membership'
  id: string
  hasDesignRequests: boolean
  designRequests: ClosetTabInProgressDesignRequestsGetDataQuery_viewer_designRequests
}

export interface ClosetTabInProgressDesignRequestsGetDataQuery {
  viewer: ClosetTabInProgressDesignRequestsGetDataQuery_viewer | null
}

export interface ClosetTabInProgressDesignRequestsGetDataQueryVariables {
  first: number
  after?: string | null
  filter?: MembershipDesignRequestsFilterInput | null
}
