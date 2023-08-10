/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ClosetBrandIndexPageFilesQuery
// ====================================================

export interface ClosetBrandIndexPageFilesQuery_viewer_organization_brand_files_edges_node_FileUnknown {
  __typename: "FileUnknown" | "FilePdf";
  id: string;
  createdAt: any;
  url: string;
  name: string;
  format: string;
}

export interface ClosetBrandIndexPageFilesQuery_viewer_organization_brand_files_edges_node_FileImage {
  __typename: "FileImage";
  id: string;
  createdAt: any;
  url: string;
  name: string;
  format: string;
  width: number;
  height: number;
}

export type ClosetBrandIndexPageFilesQuery_viewer_organization_brand_files_edges_node = ClosetBrandIndexPageFilesQuery_viewer_organization_brand_files_edges_node_FileUnknown | ClosetBrandIndexPageFilesQuery_viewer_organization_brand_files_edges_node_FileImage;

export interface ClosetBrandIndexPageFilesQuery_viewer_organization_brand_files_edges {
  __typename: "FileEdge";
  /**
   * https: // facebook.github.io/relay/graphql/connections.htm#sec-Node
   */
  node: ClosetBrandIndexPageFilesQuery_viewer_organization_brand_files_edges_node | null;
}

export interface ClosetBrandIndexPageFilesQuery_viewer_organization_brand_files {
  __typename: "FileConnection";
  /**
   * https: // facebook.github.io/relay/graphql/connections.htm#sec-Edge-Types
   */
  edges: (ClosetBrandIndexPageFilesQuery_viewer_organization_brand_files_edges | null)[] | null;
}

export interface ClosetBrandIndexPageFilesQuery_viewer_organization_brand {
  __typename: "OrganizationBrand";
  id: string;
  fileUploadDirectory: string;
  files: ClosetBrandIndexPageFilesQuery_viewer_organization_brand_files;
}

export interface ClosetBrandIndexPageFilesQuery_viewer_organization {
  __typename: "Organization";
  id: string;
  brand: ClosetBrandIndexPageFilesQuery_viewer_organization_brand | null;
}

export interface ClosetBrandIndexPageFilesQuery_viewer {
  __typename: "Membership";
  id: string;
  organization: ClosetBrandIndexPageFilesQuery_viewer_organization;
}

export interface ClosetBrandIndexPageFilesQuery {
  viewer: ClosetBrandIndexPageFilesQuery_viewer | null;
}

export interface ClosetBrandIndexPageFilesQueryVariables {
  first: number;
  after?: string | null;
}
