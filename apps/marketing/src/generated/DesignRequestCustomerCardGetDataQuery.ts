/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: DesignRequestCustomerCardGetDataQuery
// ====================================================

export interface DesignRequestCustomerCardGetDataQuery_designRequest_membership_user {
  __typename: "User";
  id: string;
  name: string | null;
  picture: string | null;
}

export interface DesignRequestCustomerCardGetDataQuery_designRequest_membership_organization {
  __typename: "Organization";
  id: string;
  name: string | null;
}

export interface DesignRequestCustomerCardGetDataQuery_designRequest_membership {
  __typename: "Membership";
  id: string;
  user: DesignRequestCustomerCardGetDataQuery_designRequest_membership_user | null;
  organization: DesignRequestCustomerCardGetDataQuery_designRequest_membership_organization;
}

export interface DesignRequestCustomerCardGetDataQuery_designRequest {
  __typename: "DesignRequest";
  id: string;
  membership: DesignRequestCustomerCardGetDataQuery_designRequest_membership | null;
}

export interface DesignRequestCustomerCardGetDataQuery {
  designRequest: DesignRequestCustomerCardGetDataQuery_designRequest | null;
}

export interface DesignRequestCustomerCardGetDataQueryVariables {
  designRequestId: string;
}
