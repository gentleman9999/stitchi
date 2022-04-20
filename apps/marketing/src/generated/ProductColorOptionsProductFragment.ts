/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ProductColorOptionsProductFragment
// ====================================================

export interface ProductColorOptionsProductFragment_productOptions_edges_node_CheckboxOption {
  __typename: "CheckboxOption" | "DateFieldOption" | "FileUploadFieldOption" | "MultiLineTextFieldOption" | "NumberFieldOption" | "TextFieldOption";
}

export interface ProductColorOptionsProductFragment_productOptions_edges_node_MultipleChoiceOption_values_edges_node_MultipleChoiceOptionValue {
  __typename: "MultipleChoiceOptionValue" | "ProductPickListOptionValue";
}

export interface ProductColorOptionsProductFragment_productOptions_edges_node_MultipleChoiceOption_values_edges_node_SwatchOptionValue {
  __typename: "SwatchOptionValue";
  /**
   * Label for the option value.
   */
  label: string;
  /**
   * List of up to 3 hex encoded colors to associate with a swatch value.
   */
  hexColors: string[];
}

export type ProductColorOptionsProductFragment_productOptions_edges_node_MultipleChoiceOption_values_edges_node = ProductColorOptionsProductFragment_productOptions_edges_node_MultipleChoiceOption_values_edges_node_MultipleChoiceOptionValue | ProductColorOptionsProductFragment_productOptions_edges_node_MultipleChoiceOption_values_edges_node_SwatchOptionValue;

export interface ProductColorOptionsProductFragment_productOptions_edges_node_MultipleChoiceOption_values_edges {
  __typename: "ProductOptionValueEdge";
  /**
   * The item at the end of the edge.
   */
  node: ProductColorOptionsProductFragment_productOptions_edges_node_MultipleChoiceOption_values_edges_node;
}

export interface ProductColorOptionsProductFragment_productOptions_edges_node_MultipleChoiceOption_values {
  __typename: "ProductOptionValueConnection";
  /**
   * A list of edges.
   */
  edges: (ProductColorOptionsProductFragment_productOptions_edges_node_MultipleChoiceOption_values_edges | null)[] | null;
}

export interface ProductColorOptionsProductFragment_productOptions_edges_node_MultipleChoiceOption {
  __typename: "MultipleChoiceOption";
  /**
   * Display name for the option.
   */
  displayName: string;
  /**
   * List of option values.
   */
  values: ProductColorOptionsProductFragment_productOptions_edges_node_MultipleChoiceOption_values;
}

export type ProductColorOptionsProductFragment_productOptions_edges_node = ProductColorOptionsProductFragment_productOptions_edges_node_CheckboxOption | ProductColorOptionsProductFragment_productOptions_edges_node_MultipleChoiceOption;

export interface ProductColorOptionsProductFragment_productOptions_edges {
  __typename: "ProductOptionEdge";
  /**
   * The item at the end of the edge.
   */
  node: ProductColorOptionsProductFragment_productOptions_edges_node;
}

export interface ProductColorOptionsProductFragment_productOptions {
  __typename: "ProductOptionConnection";
  /**
   * A list of edges.
   */
  edges: (ProductColorOptionsProductFragment_productOptions_edges | null)[] | null;
}

export interface ProductColorOptionsProductFragment {
  __typename: "Product";
  /**
   * The ID of an object
   */
  id: string;
  /**
   * Product options.
   */
  productOptions: ProductColorOptionsProductFragment_productOptions;
}
