/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DesignRequestStatus, FileType } from "./globalTypes";

// ====================================================
// GraphQL fragment: DesignRequestOverviewDesignRequestFragment
// ====================================================

export interface DesignRequestOverviewDesignRequestFragment_designRequestProducts_product_productOptions_edges_node_CheckboxOption {
  __typename: "CheckboxOption" | "DateFieldOption" | "FileUploadFieldOption" | "MultiLineTextFieldOption" | "NumberFieldOption" | "TextFieldOption";
  /**
   * Unique ID for the option.
   */
  entityId: number;
}

export interface DesignRequestOverviewDesignRequestFragment_designRequestProducts_product_productOptions_edges_node_MultipleChoiceOption_values_edges_node_MultipleChoiceOptionValue {
  __typename: "MultipleChoiceOptionValue" | "ProductPickListOptionValue";
  /**
   * Unique ID for the option value.
   */
  entityId: number;
  /**
   * Label for the option value.
   */
  label: string;
}

export interface DesignRequestOverviewDesignRequestFragment_designRequestProducts_product_productOptions_edges_node_MultipleChoiceOption_values_edges_node_SwatchOptionValue {
  __typename: "SwatchOptionValue";
  /**
   * Unique ID for the option value.
   */
  entityId: number;
  /**
   * Label for the option value.
   */
  label: string;
  /**
   * List of up to 3 hex encoded colors to associate with a swatch value.
   */
  hexColors: string[];
}

export type DesignRequestOverviewDesignRequestFragment_designRequestProducts_product_productOptions_edges_node_MultipleChoiceOption_values_edges_node = DesignRequestOverviewDesignRequestFragment_designRequestProducts_product_productOptions_edges_node_MultipleChoiceOption_values_edges_node_MultipleChoiceOptionValue | DesignRequestOverviewDesignRequestFragment_designRequestProducts_product_productOptions_edges_node_MultipleChoiceOption_values_edges_node_SwatchOptionValue;

export interface DesignRequestOverviewDesignRequestFragment_designRequestProducts_product_productOptions_edges_node_MultipleChoiceOption_values_edges {
  __typename: "ProductOptionValueEdge";
  /**
   * The item at the end of the edge.
   */
  node: DesignRequestOverviewDesignRequestFragment_designRequestProducts_product_productOptions_edges_node_MultipleChoiceOption_values_edges_node;
}

export interface DesignRequestOverviewDesignRequestFragment_designRequestProducts_product_productOptions_edges_node_MultipleChoiceOption_values {
  __typename: "ProductOptionValueConnection";
  /**
   * A list of edges.
   */
  edges: (DesignRequestOverviewDesignRequestFragment_designRequestProducts_product_productOptions_edges_node_MultipleChoiceOption_values_edges | null)[] | null;
}

export interface DesignRequestOverviewDesignRequestFragment_designRequestProducts_product_productOptions_edges_node_MultipleChoiceOption {
  __typename: "MultipleChoiceOption";
  /**
   * Unique ID for the option.
   */
  entityId: number;
  /**
   * Display name for the option.
   */
  displayName: string;
  /**
   * List of option values.
   */
  values: DesignRequestOverviewDesignRequestFragment_designRequestProducts_product_productOptions_edges_node_MultipleChoiceOption_values;
}

export type DesignRequestOverviewDesignRequestFragment_designRequestProducts_product_productOptions_edges_node = DesignRequestOverviewDesignRequestFragment_designRequestProducts_product_productOptions_edges_node_CheckboxOption | DesignRequestOverviewDesignRequestFragment_designRequestProducts_product_productOptions_edges_node_MultipleChoiceOption;

export interface DesignRequestOverviewDesignRequestFragment_designRequestProducts_product_productOptions_edges {
  __typename: "ProductOptionEdge";
  /**
   * The item at the end of the edge.
   */
  node: DesignRequestOverviewDesignRequestFragment_designRequestProducts_product_productOptions_edges_node;
}

export interface DesignRequestOverviewDesignRequestFragment_designRequestProducts_product_productOptions {
  __typename: "ProductOptionConnection";
  /**
   * A list of edges.
   */
  edges: (DesignRequestOverviewDesignRequestFragment_designRequestProducts_product_productOptions_edges | null)[] | null;
}

export interface DesignRequestOverviewDesignRequestFragment_designRequestProducts_product_brand {
  __typename: "Brand";
  /**
   * The ID of an object
   */
  id: string;
  /**
   * Name of the brand.
   */
  name: string;
  /**
   * Path for the brand page.
   */
  path: string;
}

export interface DesignRequestOverviewDesignRequestFragment_designRequestProducts_product_defaultImage {
  __typename: "Image";
  /**
   * Absolute path to original image using store CDN.
   */
  urlOriginal: string;
  /**
   * Text description of an image that can be used for SEO and/or accessibility purposes.
   */
  altText: string;
  /**
   * Absolute path to image using store CDN.
   */
  url: string;
}

export interface DesignRequestOverviewDesignRequestFragment_designRequestProducts_product {
  __typename: "Product";
  /**
   * The ID of an object
   */
  id: string;
  /**
   * Product options.
   */
  productOptions: DesignRequestOverviewDesignRequestFragment_designRequestProducts_product_productOptions;
  /**
   * Name of the product.
   */
  name: string;
  /**
   * Relative URL path to product page.
   */
  path: string;
  priceCents: number;
  /**
   * Brand associated with the product.
   */
  brand: DesignRequestOverviewDesignRequestFragment_designRequestProducts_product_brand | null;
  /**
   * Default image for a product.
   */
  defaultImage: DesignRequestOverviewDesignRequestFragment_designRequestProducts_product_defaultImage | null;
}

export interface DesignRequestOverviewDesignRequestFragment_designRequestProducts {
  __typename: "DesignRequestProduct";
  id: string;
  product: DesignRequestOverviewDesignRequestFragment_designRequestProducts_product | null;
}

export interface DesignRequestOverviewDesignRequestFragment_designRequestLocations_files_FileUnknown {
  __typename: "FileUnknown" | "FilePdf";
  id: string;
  humanizedBytes: string;
  name: string;
  url: string;
  fileType: FileType;
}

export interface DesignRequestOverviewDesignRequestFragment_designRequestLocations_files_FileImage {
  __typename: "FileImage";
  id: string;
  humanizedBytes: string;
  name: string;
  url: string;
  fileType: FileType;
  width: number;
  height: number;
}

export type DesignRequestOverviewDesignRequestFragment_designRequestLocations_files = DesignRequestOverviewDesignRequestFragment_designRequestLocations_files_FileUnknown | DesignRequestOverviewDesignRequestFragment_designRequestLocations_files_FileImage;

export interface DesignRequestOverviewDesignRequestFragment_designRequestLocations {
  __typename: "DesignRequestDesignLocation";
  id: string;
  description: string | null;
  placement: string | null;
  fileIds: string[];
  files: DesignRequestOverviewDesignRequestFragment_designRequestLocations_files[];
}

export interface DesignRequestOverviewDesignRequestFragment_files_FileUnknown {
  __typename: "FileUnknown" | "FilePdf";
  id: string;
  humanizedBytes: string;
  name: string;
  url: string;
  fileType: FileType;
}

export interface DesignRequestOverviewDesignRequestFragment_files_FileImage {
  __typename: "FileImage";
  id: string;
  humanizedBytes: string;
  name: string;
  url: string;
  fileType: FileType;
  width: number;
  height: number;
}

export type DesignRequestOverviewDesignRequestFragment_files = DesignRequestOverviewDesignRequestFragment_files_FileUnknown | DesignRequestOverviewDesignRequestFragment_files_FileImage;

export interface DesignRequestOverviewDesignRequestFragment {
  __typename: "DesignRequest";
  id: string;
  status: DesignRequestStatus;
  designRequestProducts: DesignRequestOverviewDesignRequestFragment_designRequestProducts[];
  description: string | null;
  fileUploadDirectory: string;
  useCase: string | null;
  fileIds: string[];
  designRequestLocations: DesignRequestOverviewDesignRequestFragment_designRequestLocations[];
  files: DesignRequestOverviewDesignRequestFragment_files[];
}
