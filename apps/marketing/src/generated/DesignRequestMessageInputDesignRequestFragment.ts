/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: DesignRequestMessageInputDesignRequestFragment
// ====================================================

export interface DesignRequestMessageInputDesignRequestFragment_membership_user {
  __typename: "User";
  id: string;
  name: string | null;
  picture: string | null;
}

export interface DesignRequestMessageInputDesignRequestFragment_membership {
  __typename: "Membership";
  id: string;
  user: DesignRequestMessageInputDesignRequestFragment_membership_user | null;
}

export interface DesignRequestMessageInputDesignRequestFragment {
  __typename: "DesignRequest";
  id: string;
  fileUploadDirectory: string;
  membership: DesignRequestMessageInputDesignRequestFragment_membership | null;
}
