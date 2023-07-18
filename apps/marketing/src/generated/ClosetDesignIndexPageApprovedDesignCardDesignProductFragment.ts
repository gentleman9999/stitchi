/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ClosetDesignIndexPageApprovedDesignCardDesignProductFragment
// ====================================================

export interface ClosetDesignIndexPageApprovedDesignCardDesignProductFragment_primaryImageFile {
  __typename: "FileImage";
  id: string;
  url: string;
  width: number;
  height: number;
}

export interface ClosetDesignIndexPageApprovedDesignCardDesignProductFragment {
  __typename: "DesignProduct";
  id: string;
  name: string;
  primaryImageFile: ClosetDesignIndexPageApprovedDesignCardDesignProductFragment_primaryImageFile | null;
}
