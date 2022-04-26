/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ProductShowPageProductFragment
// ====================================================

export interface ProductShowPageProductFragment_productOptions_edges_node_CheckboxOption {
  __typename: "CheckboxOption" | "DateFieldOption" | "FileUploadFieldOption" | "MultiLineTextFieldOption" | "NumberFieldOption" | "TextFieldOption";
}

export interface ProductShowPageProductFragment_productOptions_edges_node_MultipleChoiceOption_values_edges_node_MultipleChoiceOptionValue {
  __typename: "MultipleChoiceOptionValue" | "ProductPickListOptionValue";
  /**
   * Unique ID for the option value.
   */
  entityId: number;
}

export interface ProductShowPageProductFragment_productOptions_edges_node_MultipleChoiceOption_values_edges_node_SwatchOptionValue {
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

export type ProductShowPageProductFragment_productOptions_edges_node_MultipleChoiceOption_values_edges_node = ProductShowPageProductFragment_productOptions_edges_node_MultipleChoiceOption_values_edges_node_MultipleChoiceOptionValue | ProductShowPageProductFragment_productOptions_edges_node_MultipleChoiceOption_values_edges_node_SwatchOptionValue;

export interface ProductShowPageProductFragment_productOptions_edges_node_MultipleChoiceOption_values_edges {
  __typename: "ProductOptionValueEdge";
  /**
   * The item at the end of the edge.
   */
  node: ProductShowPageProductFragment_productOptions_edges_node_MultipleChoiceOption_values_edges_node;
}

export interface ProductShowPageProductFragment_productOptions_edges_node_MultipleChoiceOption_values {
  __typename: "ProductOptionValueConnection";
  /**
   * A list of edges.
   */
  edges: (ProductShowPageProductFragment_productOptions_edges_node_MultipleChoiceOption_values_edges | null)[] | null;
}

export interface ProductShowPageProductFragment_productOptions_edges_node_MultipleChoiceOption {
  __typename: "MultipleChoiceOption";
  /**
   * Display name for the option.
   */
  displayName: string;
  /**
   * List of option values.
   */
  values: ProductShowPageProductFragment_productOptions_edges_node_MultipleChoiceOption_values;
}

export type ProductShowPageProductFragment_productOptions_edges_node = ProductShowPageProductFragment_productOptions_edges_node_CheckboxOption | ProductShowPageProductFragment_productOptions_edges_node_MultipleChoiceOption;

export interface ProductShowPageProductFragment_productOptions_edges {
  __typename: "ProductOptionEdge";
  /**
   * The item at the end of the edge.
   */
  node: ProductShowPageProductFragment_productOptions_edges_node;
}

export interface ProductShowPageProductFragment_productOptions {
  __typename: "ProductOptionConnection";
  /**
   * A list of edges.
   */
  edges: (ProductShowPageProductFragment_productOptions_edges | null)[] | null;
}

export interface ProductShowPageProductFragment_defaultImage {
  __typename: "Image";
  /**
   * Text description of an image that can be used for SEO and/or accessibility purposes.
   */
  altText: string;
  /**
   * Absolute path to image using store CDN.
   */
  url: string;
}

export interface ProductShowPageProductFragment {
  __typename: "Product";
  /**
   * The ID of an object
   */
  id: string;
  /**
   * Product options.
   */
  productOptions: ProductShowPageProductFragment_productOptions;
  /**
   * Name of the product.
   */
  name: string;
  /**
   * Description of the product.
   */
  description: string;
  /**
   * Default image for a product.
   */
  defaultImage: ProductShowPageProductFragment_defaultImage | null;
}
