/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: CatalogProductVariantPreviewProductFragment
// ====================================================

export interface CatalogProductVariantPreviewProductFragment_productOptions_edges_node_CheckboxOption {
  __typename: "CheckboxOption" | "DateFieldOption" | "FileUploadFieldOption" | "MultiLineTextFieldOption" | "NumberFieldOption" | "TextFieldOption";
  /**
   * Unique ID for the option.
   */
  entityId: number;
}

export interface CatalogProductVariantPreviewProductFragment_productOptions_edges_node_MultipleChoiceOption_values_edges_node_MultipleChoiceOptionValue {
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

export interface CatalogProductVariantPreviewProductFragment_productOptions_edges_node_MultipleChoiceOption_values_edges_node_SwatchOptionValue {
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

export type CatalogProductVariantPreviewProductFragment_productOptions_edges_node_MultipleChoiceOption_values_edges_node = CatalogProductVariantPreviewProductFragment_productOptions_edges_node_MultipleChoiceOption_values_edges_node_MultipleChoiceOptionValue | CatalogProductVariantPreviewProductFragment_productOptions_edges_node_MultipleChoiceOption_values_edges_node_SwatchOptionValue;

export interface CatalogProductVariantPreviewProductFragment_productOptions_edges_node_MultipleChoiceOption_values_edges {
  __typename: "ProductOptionValueEdge";
  /**
   * The item at the end of the edge.
   */
  node: CatalogProductVariantPreviewProductFragment_productOptions_edges_node_MultipleChoiceOption_values_edges_node;
}

export interface CatalogProductVariantPreviewProductFragment_productOptions_edges_node_MultipleChoiceOption_values {
  __typename: "ProductOptionValueConnection";
  /**
   * A list of edges.
   */
  edges: (CatalogProductVariantPreviewProductFragment_productOptions_edges_node_MultipleChoiceOption_values_edges | null)[] | null;
}

export interface CatalogProductVariantPreviewProductFragment_productOptions_edges_node_MultipleChoiceOption {
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
  values: CatalogProductVariantPreviewProductFragment_productOptions_edges_node_MultipleChoiceOption_values;
}

export type CatalogProductVariantPreviewProductFragment_productOptions_edges_node = CatalogProductVariantPreviewProductFragment_productOptions_edges_node_CheckboxOption | CatalogProductVariantPreviewProductFragment_productOptions_edges_node_MultipleChoiceOption;

export interface CatalogProductVariantPreviewProductFragment_productOptions_edges {
  __typename: "ProductOptionEdge";
  /**
   * The item at the end of the edge.
   */
  node: CatalogProductVariantPreviewProductFragment_productOptions_edges_node;
}

export interface CatalogProductVariantPreviewProductFragment_productOptions {
  __typename: "ProductOptionConnection";
  /**
   * A list of edges.
   */
  edges: (CatalogProductVariantPreviewProductFragment_productOptions_edges | null)[] | null;
}

export interface CatalogProductVariantPreviewProductFragment_defaultImage {
  __typename: "Image";
  /**
   * Absolute path to image using store CDN.
   */
  url: string;
}

export interface CatalogProductVariantPreviewProductFragment_images_edges_node {
  __typename: "Image";
  /**
   * Indicates whether this is the primary image.
   */
  isDefault: boolean;
  /**
   * Absolute path to image using store CDN.
   */
  url: string;
}

export interface CatalogProductVariantPreviewProductFragment_images_edges {
  __typename: "ImageEdge";
  /**
   * The item at the end of the edge.
   */
  node: CatalogProductVariantPreviewProductFragment_images_edges_node;
}

export interface CatalogProductVariantPreviewProductFragment_images {
  __typename: "ImageConnection";
  /**
   * A list of edges.
   */
  edges: (CatalogProductVariantPreviewProductFragment_images_edges | null)[] | null;
}

export interface CatalogProductVariantPreviewProductFragment_variants_edges_node_defaultImage {
  __typename: "Image";
  /**
   * Indicates whether this is the primary image.
   */
  isDefault: boolean;
  /**
   * Absolute path to image using store CDN.
   */
  url: string;
}

export interface CatalogProductVariantPreviewProductFragment_variants_edges_node {
  __typename: "Variant";
  /**
   * The ID of an object
   */
  id: string;
  /**
   * Id of the variant.
   */
  entityId: number;
  /**
   * Default image for a variant.
   */
  defaultImage: CatalogProductVariantPreviewProductFragment_variants_edges_node_defaultImage | null;
}

export interface CatalogProductVariantPreviewProductFragment_variants_edges {
  __typename: "VariantEdge";
  /**
   * The item at the end of the edge.
   */
  node: CatalogProductVariantPreviewProductFragment_variants_edges_node;
}

export interface CatalogProductVariantPreviewProductFragment_variants {
  __typename: "VariantConnection";
  /**
   * A list of edges.
   */
  edges: (CatalogProductVariantPreviewProductFragment_variants_edges | null)[] | null;
}

export interface CatalogProductVariantPreviewProductFragment {
  __typename: "Product";
  /**
   * The ID of an object
   */
  id: string;
  /**
   * Product options.
   */
  productOptions: CatalogProductVariantPreviewProductFragment_productOptions;
  /**
   * Name of the product.
   */
  name: string;
  /**
   * Default image for a product.
   */
  defaultImage: CatalogProductVariantPreviewProductFragment_defaultImage | null;
  /**
   * A list of the images for a product.
   */
  images: CatalogProductVariantPreviewProductFragment_images;
  /**
   * Variants associated with the product.
   */
  variants: CatalogProductVariantPreviewProductFragment_variants;
}
