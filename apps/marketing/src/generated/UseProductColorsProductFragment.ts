/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: UseProductColorsProductFragment
// ====================================================

export interface UseProductColorsProductFragment_productOptions_edges_node_CheckboxOption {
  __typename: "CheckboxOption" | "DateFieldOption" | "FileUploadFieldOption" | "MultiLineTextFieldOption" | "NumberFieldOption" | "TextFieldOption";
}

export interface UseProductColorsProductFragment_productOptions_edges_node_MultipleChoiceOption_values_edges_node_MultipleChoiceOptionValue {
  __typename: "MultipleChoiceOptionValue" | "ProductPickListOptionValue";
  /**
   * Unique ID for the option value.
   */
  entityId: number;
}

export interface UseProductColorsProductFragment_productOptions_edges_node_MultipleChoiceOption_values_edges_node_SwatchOptionValue {
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

export type UseProductColorsProductFragment_productOptions_edges_node_MultipleChoiceOption_values_edges_node = UseProductColorsProductFragment_productOptions_edges_node_MultipleChoiceOption_values_edges_node_MultipleChoiceOptionValue | UseProductColorsProductFragment_productOptions_edges_node_MultipleChoiceOption_values_edges_node_SwatchOptionValue;

export interface UseProductColorsProductFragment_productOptions_edges_node_MultipleChoiceOption_values_edges {
  __typename: "ProductOptionValueEdge";
  /**
   * The item at the end of the edge.
   */
  node: UseProductColorsProductFragment_productOptions_edges_node_MultipleChoiceOption_values_edges_node;
}

export interface UseProductColorsProductFragment_productOptions_edges_node_MultipleChoiceOption_values {
  __typename: "ProductOptionValueConnection";
  /**
   * A list of edges.
   */
  edges: (UseProductColorsProductFragment_productOptions_edges_node_MultipleChoiceOption_values_edges | null)[] | null;
}

export interface UseProductColorsProductFragment_productOptions_edges_node_MultipleChoiceOption {
  __typename: "MultipleChoiceOption";
  /**
   * Display name for the option.
   */
  displayName: string;
  /**
   * List of option values.
   */
  values: UseProductColorsProductFragment_productOptions_edges_node_MultipleChoiceOption_values;
}

export type UseProductColorsProductFragment_productOptions_edges_node = UseProductColorsProductFragment_productOptions_edges_node_CheckboxOption | UseProductColorsProductFragment_productOptions_edges_node_MultipleChoiceOption;

export interface UseProductColorsProductFragment_productOptions_edges {
  __typename: "ProductOptionEdge";
  /**
   * The item at the end of the edge.
   */
  node: UseProductColorsProductFragment_productOptions_edges_node;
}

export interface UseProductColorsProductFragment_productOptions {
  __typename: "ProductOptionConnection";
  /**
   * A list of edges.
   */
  edges: (UseProductColorsProductFragment_productOptions_edges | null)[] | null;
}

export interface UseProductColorsProductFragment {
  __typename: "Product";
  /**
   * The ID of an object
   */
  id: string;
  /**
   * Product options.
   */
  productOptions: UseProductColorsProductFragment_productOptions;
}
