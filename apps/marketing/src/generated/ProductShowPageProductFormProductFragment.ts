/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ProductShowPageProductFormProductFragment
// ====================================================

export interface ProductShowPageProductFormProductFragment_productOptions_edges_node_CheckboxOption {
  __typename: "CheckboxOption" | "DateFieldOption" | "FileUploadFieldOption" | "MultiLineTextFieldOption" | "NumberFieldOption" | "TextFieldOption";
  /**
   * Unique ID for the option.
   */
  entityId: number;
}

export interface ProductShowPageProductFormProductFragment_productOptions_edges_node_MultipleChoiceOption_values_edges_node_MultipleChoiceOptionValue {
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

export interface ProductShowPageProductFormProductFragment_productOptions_edges_node_MultipleChoiceOption_values_edges_node_SwatchOptionValue {
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

export type ProductShowPageProductFormProductFragment_productOptions_edges_node_MultipleChoiceOption_values_edges_node = ProductShowPageProductFormProductFragment_productOptions_edges_node_MultipleChoiceOption_values_edges_node_MultipleChoiceOptionValue | ProductShowPageProductFormProductFragment_productOptions_edges_node_MultipleChoiceOption_values_edges_node_SwatchOptionValue;

export interface ProductShowPageProductFormProductFragment_productOptions_edges_node_MultipleChoiceOption_values_edges {
  __typename: "ProductOptionValueEdge";
  /**
   * The item at the end of the edge.
   */
  node: ProductShowPageProductFormProductFragment_productOptions_edges_node_MultipleChoiceOption_values_edges_node;
}

export interface ProductShowPageProductFormProductFragment_productOptions_edges_node_MultipleChoiceOption_values {
  __typename: "ProductOptionValueConnection";
  /**
   * A list of edges.
   */
  edges: (ProductShowPageProductFormProductFragment_productOptions_edges_node_MultipleChoiceOption_values_edges | null)[] | null;
}

export interface ProductShowPageProductFormProductFragment_productOptions_edges_node_MultipleChoiceOption {
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
  values: ProductShowPageProductFormProductFragment_productOptions_edges_node_MultipleChoiceOption_values;
}

export type ProductShowPageProductFormProductFragment_productOptions_edges_node = ProductShowPageProductFormProductFragment_productOptions_edges_node_CheckboxOption | ProductShowPageProductFormProductFragment_productOptions_edges_node_MultipleChoiceOption;

export interface ProductShowPageProductFormProductFragment_productOptions_edges {
  __typename: "ProductOptionEdge";
  /**
   * The item at the end of the edge.
   */
  node: ProductShowPageProductFormProductFragment_productOptions_edges_node;
}

export interface ProductShowPageProductFormProductFragment_productOptions {
  __typename: "ProductOptionConnection";
  /**
   * A list of edges.
   */
  edges: (ProductShowPageProductFormProductFragment_productOptions_edges | null)[] | null;
}

export interface ProductShowPageProductFormProductFragment {
  __typename: "Product";
  /**
   * The ID of an object
   */
  id: string;
  /**
   * Name of the product.
   */
  name: string;
  priceCents: number;
  /**
   * Product options.
   */
  productOptions: ProductShowPageProductFormProductFragment_productOptions;
}
