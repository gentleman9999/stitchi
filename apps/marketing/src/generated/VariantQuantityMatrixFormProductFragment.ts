/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: VariantQuantityMatrixFormProductFragment
// ====================================================

export interface VariantQuantityMatrixFormProductFragment_variants_edges_node_options_edges_node_values_edges_node {
  __typename: "ProductOptionValue";
  /**
   * Unique ID for the option value.
   */
  entityId: number;
}

export interface VariantQuantityMatrixFormProductFragment_variants_edges_node_options_edges_node_values_edges {
  __typename: "OptionValueEdge";
  /**
   * The item at the end of the edge.
   */
  node: VariantQuantityMatrixFormProductFragment_variants_edges_node_options_edges_node_values_edges_node;
}

export interface VariantQuantityMatrixFormProductFragment_variants_edges_node_options_edges_node_values {
  __typename: "OptionValueConnection";
  /**
   * A list of edges.
   */
  edges: (VariantQuantityMatrixFormProductFragment_variants_edges_node_options_edges_node_values_edges | null)[] | null;
}

export interface VariantQuantityMatrixFormProductFragment_variants_edges_node_options_edges_node {
  __typename: "ProductOption";
  /**
   * Option values.
   */
  values: VariantQuantityMatrixFormProductFragment_variants_edges_node_options_edges_node_values;
}

export interface VariantQuantityMatrixFormProductFragment_variants_edges_node_options_edges {
  __typename: "OptionEdge";
  /**
   * The item at the end of the edge.
   */
  node: VariantQuantityMatrixFormProductFragment_variants_edges_node_options_edges_node;
}

export interface VariantQuantityMatrixFormProductFragment_variants_edges_node_options {
  __typename: "OptionConnection";
  /**
   * A list of edges.
   */
  edges: (VariantQuantityMatrixFormProductFragment_variants_edges_node_options_edges | null)[] | null;
}

export interface VariantQuantityMatrixFormProductFragment_variants_edges_node {
  __typename: "Variant";
  /**
   * The ID of an object
   */
  id: string;
  /**
   * The options which define a variant.
   */
  options: VariantQuantityMatrixFormProductFragment_variants_edges_node_options;
}

export interface VariantQuantityMatrixFormProductFragment_variants_edges {
  __typename: "VariantEdge";
  /**
   * The item at the end of the edge.
   */
  node: VariantQuantityMatrixFormProductFragment_variants_edges_node;
}

export interface VariantQuantityMatrixFormProductFragment_variants {
  __typename: "VariantConnection";
  /**
   * A list of edges.
   */
  edges: (VariantQuantityMatrixFormProductFragment_variants_edges | null)[] | null;
}

export interface VariantQuantityMatrixFormProductFragment_productOptions_edges_node_CheckboxOption {
  __typename: "CheckboxOption" | "DateFieldOption" | "FileUploadFieldOption" | "MultiLineTextFieldOption" | "NumberFieldOption" | "TextFieldOption";
  /**
   * Unique ID for the option.
   */
  entityId: number;
}

export interface VariantQuantityMatrixFormProductFragment_productOptions_edges_node_MultipleChoiceOption_values_edges_node_MultipleChoiceOptionValue {
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

export interface VariantQuantityMatrixFormProductFragment_productOptions_edges_node_MultipleChoiceOption_values_edges_node_SwatchOptionValue {
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

export type VariantQuantityMatrixFormProductFragment_productOptions_edges_node_MultipleChoiceOption_values_edges_node = VariantQuantityMatrixFormProductFragment_productOptions_edges_node_MultipleChoiceOption_values_edges_node_MultipleChoiceOptionValue | VariantQuantityMatrixFormProductFragment_productOptions_edges_node_MultipleChoiceOption_values_edges_node_SwatchOptionValue;

export interface VariantQuantityMatrixFormProductFragment_productOptions_edges_node_MultipleChoiceOption_values_edges {
  __typename: "ProductOptionValueEdge";
  /**
   * The item at the end of the edge.
   */
  node: VariantQuantityMatrixFormProductFragment_productOptions_edges_node_MultipleChoiceOption_values_edges_node;
}

export interface VariantQuantityMatrixFormProductFragment_productOptions_edges_node_MultipleChoiceOption_values {
  __typename: "ProductOptionValueConnection";
  /**
   * A list of edges.
   */
  edges: (VariantQuantityMatrixFormProductFragment_productOptions_edges_node_MultipleChoiceOption_values_edges | null)[] | null;
}

export interface VariantQuantityMatrixFormProductFragment_productOptions_edges_node_MultipleChoiceOption {
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
  values: VariantQuantityMatrixFormProductFragment_productOptions_edges_node_MultipleChoiceOption_values;
}

export type VariantQuantityMatrixFormProductFragment_productOptions_edges_node = VariantQuantityMatrixFormProductFragment_productOptions_edges_node_CheckboxOption | VariantQuantityMatrixFormProductFragment_productOptions_edges_node_MultipleChoiceOption;

export interface VariantQuantityMatrixFormProductFragment_productOptions_edges {
  __typename: "ProductOptionEdge";
  /**
   * The item at the end of the edge.
   */
  node: VariantQuantityMatrixFormProductFragment_productOptions_edges_node;
}

export interface VariantQuantityMatrixFormProductFragment_productOptions {
  __typename: "ProductOptionConnection";
  /**
   * A list of edges.
   */
  edges: (VariantQuantityMatrixFormProductFragment_productOptions_edges | null)[] | null;
}

export interface VariantQuantityMatrixFormProductFragment {
  __typename: "Product";
  /**
   * The ID of an object
   */
  id: string;
  /**
   * Variants associated with the product.
   */
  variants: VariantQuantityMatrixFormProductFragment_variants;
  /**
   * Product options.
   */
  productOptions: VariantQuantityMatrixFormProductFragment_productOptions;
}
