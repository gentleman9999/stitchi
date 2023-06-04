/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ProductBuyPageFormProductFragment
// ====================================================

export interface ProductBuyPageFormProductFragment_productOptions_edges_node_CheckboxOption {
  __typename: "CheckboxOption" | "DateFieldOption" | "FileUploadFieldOption" | "MultiLineTextFieldOption" | "NumberFieldOption" | "TextFieldOption";
  /**
   * Unique ID for the option.
   */
  entityId: number;
}

export interface ProductBuyPageFormProductFragment_productOptions_edges_node_MultipleChoiceOption_values_edges_node_MultipleChoiceOptionValue {
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

export interface ProductBuyPageFormProductFragment_productOptions_edges_node_MultipleChoiceOption_values_edges_node_SwatchOptionValue {
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

export type ProductBuyPageFormProductFragment_productOptions_edges_node_MultipleChoiceOption_values_edges_node = ProductBuyPageFormProductFragment_productOptions_edges_node_MultipleChoiceOption_values_edges_node_MultipleChoiceOptionValue | ProductBuyPageFormProductFragment_productOptions_edges_node_MultipleChoiceOption_values_edges_node_SwatchOptionValue;

export interface ProductBuyPageFormProductFragment_productOptions_edges_node_MultipleChoiceOption_values_edges {
  __typename: "ProductOptionValueEdge";
  /**
   * The item at the end of the edge.
   */
  node: ProductBuyPageFormProductFragment_productOptions_edges_node_MultipleChoiceOption_values_edges_node;
}

export interface ProductBuyPageFormProductFragment_productOptions_edges_node_MultipleChoiceOption_values {
  __typename: "ProductOptionValueConnection";
  /**
   * A list of edges.
   */
  edges: (ProductBuyPageFormProductFragment_productOptions_edges_node_MultipleChoiceOption_values_edges | null)[] | null;
}

export interface ProductBuyPageFormProductFragment_productOptions_edges_node_MultipleChoiceOption {
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
  values: ProductBuyPageFormProductFragment_productOptions_edges_node_MultipleChoiceOption_values;
}

export type ProductBuyPageFormProductFragment_productOptions_edges_node = ProductBuyPageFormProductFragment_productOptions_edges_node_CheckboxOption | ProductBuyPageFormProductFragment_productOptions_edges_node_MultipleChoiceOption;

export interface ProductBuyPageFormProductFragment_productOptions_edges {
  __typename: "ProductOptionEdge";
  /**
   * The item at the end of the edge.
   */
  node: ProductBuyPageFormProductFragment_productOptions_edges_node;
}

export interface ProductBuyPageFormProductFragment_productOptions {
  __typename: "ProductOptionConnection";
  /**
   * A list of edges.
   */
  edges: (ProductBuyPageFormProductFragment_productOptions_edges | null)[] | null;
}

export interface ProductBuyPageFormProductFragment {
  __typename: "Product";
  /**
   * The ID of an object
   */
  id: string;
  /**
   * Id of the product.
   */
  entityId: number;
  /**
   * Product options.
   */
  productOptions: ProductBuyPageFormProductFragment_productOptions;
}
