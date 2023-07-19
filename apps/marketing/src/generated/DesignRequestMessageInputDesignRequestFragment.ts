/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: DesignRequestMessageInputDesignRequestFragment
// ====================================================

export interface DesignRequestMessageInputDesignRequestFragment_user {
  __typename: "User";
  id: string;
  name: string | null;
  picture: string | null;
}

export interface DesignRequestMessageInputDesignRequestFragment {
  __typename: "DesignRequest";
  id: string;
  fileUploadDirectory: string;
  user: DesignRequestMessageInputDesignRequestFragment_user | null;
}
