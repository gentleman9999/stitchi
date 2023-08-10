/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ClosetDesignBuyPageFormProductFragment
// ====================================================

export interface ClosetDesignBuyPageFormProductFragment_variants_edges_node_options_edges_node_values_edges_node {
  __typename: 'ProductOptionValue'
  /**
   * Unique ID for the option value.
   */
  entityId: number
}

export interface ClosetDesignBuyPageFormProductFragment_variants_edges_node_options_edges_node_values_edges {
  __typename: 'OptionValueEdge'
  /**
   * The item at the end of the edge.
   */
  node: ClosetDesignBuyPageFormProductFragment_variants_edges_node_options_edges_node_values_edges_node
}

export interface ClosetDesignBuyPageFormProductFragment_variants_edges_node_options_edges_node_values {
  __typename: 'OptionValueConnection'
  /**
   * A list of edges.
   */
  edges:
    | (ClosetDesignBuyPageFormProductFragment_variants_edges_node_options_edges_node_values_edges | null)[]
    | null
}

export interface ClosetDesignBuyPageFormProductFragment_variants_edges_node_options_edges_node {
  __typename: 'ProductOption'
  /**
   * Option values.
   */
  values: ClosetDesignBuyPageFormProductFragment_variants_edges_node_options_edges_node_values
}

export interface ClosetDesignBuyPageFormProductFragment_variants_edges_node_options_edges {
  __typename: 'OptionEdge'
  /**
   * The item at the end of the edge.
   */
  node: ClosetDesignBuyPageFormProductFragment_variants_edges_node_options_edges_node
}

export interface ClosetDesignBuyPageFormProductFragment_variants_edges_node_options {
  __typename: 'OptionConnection'
  /**
   * A list of edges.
   */
  edges:
    | (ClosetDesignBuyPageFormProductFragment_variants_edges_node_options_edges | null)[]
    | null
}

export interface ClosetDesignBuyPageFormProductFragment_variants_edges_node {
  __typename: 'Variant'
  /**
   * The ID of an object
   */
  id: string
  /**
   * The options which define a variant.
   */
  options: ClosetDesignBuyPageFormProductFragment_variants_edges_node_options
}

export interface ClosetDesignBuyPageFormProductFragment_variants_edges {
  __typename: 'VariantEdge'
  /**
   * The item at the end of the edge.
   */
  node: ClosetDesignBuyPageFormProductFragment_variants_edges_node
}

export interface ClosetDesignBuyPageFormProductFragment_variants {
  __typename: 'VariantConnection'
  /**
   * A list of edges.
   */
  edges: (ClosetDesignBuyPageFormProductFragment_variants_edges | null)[] | null
}

export interface ClosetDesignBuyPageFormProductFragment_productOptions_edges_node_CheckboxOption {
  __typename:
    | 'CheckboxOption'
    | 'DateFieldOption'
    | 'FileUploadFieldOption'
    | 'MultiLineTextFieldOption'
    | 'NumberFieldOption'
    | 'TextFieldOption'
  /**
   * Unique ID for the option.
   */
  entityId: number
}

export interface ClosetDesignBuyPageFormProductFragment_productOptions_edges_node_MultipleChoiceOption_values_edges_node_MultipleChoiceOptionValue {
  __typename: 'MultipleChoiceOptionValue' | 'ProductPickListOptionValue'
  /**
   * Unique ID for the option value.
   */
  entityId: number
  /**
   * Label for the option value.
   */
  label: string
}

export interface ClosetDesignBuyPageFormProductFragment_productOptions_edges_node_MultipleChoiceOption_values_edges_node_SwatchOptionValue {
  __typename: 'SwatchOptionValue'
  /**
   * Unique ID for the option value.
   */
  entityId: number
  /**
   * Label for the option value.
   */
  label: string
  /**
   * List of up to 3 hex encoded colors to associate with a swatch value.
   */
  hexColors: string[]
}

export type ClosetDesignBuyPageFormProductFragment_productOptions_edges_node_MultipleChoiceOption_values_edges_node =

    | ClosetDesignBuyPageFormProductFragment_productOptions_edges_node_MultipleChoiceOption_values_edges_node_MultipleChoiceOptionValue
    | ClosetDesignBuyPageFormProductFragment_productOptions_edges_node_MultipleChoiceOption_values_edges_node_SwatchOptionValue

export interface ClosetDesignBuyPageFormProductFragment_productOptions_edges_node_MultipleChoiceOption_values_edges {
  __typename: 'ProductOptionValueEdge'
  /**
   * The item at the end of the edge.
   */
  node: ClosetDesignBuyPageFormProductFragment_productOptions_edges_node_MultipleChoiceOption_values_edges_node
}

export interface ClosetDesignBuyPageFormProductFragment_productOptions_edges_node_MultipleChoiceOption_values {
  __typename: 'ProductOptionValueConnection'
  /**
   * A list of edges.
   */
  edges:
    | (ClosetDesignBuyPageFormProductFragment_productOptions_edges_node_MultipleChoiceOption_values_edges | null)[]
    | null
}

export interface ClosetDesignBuyPageFormProductFragment_productOptions_edges_node_MultipleChoiceOption {
  __typename: 'MultipleChoiceOption'
  /**
   * Unique ID for the option.
   */
  entityId: number
  /**
   * Display name for the option.
   */
  displayName: string
  /**
   * List of option values.
   */
  values: ClosetDesignBuyPageFormProductFragment_productOptions_edges_node_MultipleChoiceOption_values
}

export type ClosetDesignBuyPageFormProductFragment_productOptions_edges_node =
  | ClosetDesignBuyPageFormProductFragment_productOptions_edges_node_CheckboxOption
  | ClosetDesignBuyPageFormProductFragment_productOptions_edges_node_MultipleChoiceOption

export interface ClosetDesignBuyPageFormProductFragment_productOptions_edges {
  __typename: 'ProductOptionEdge'
  /**
   * The item at the end of the edge.
   */
  node: ClosetDesignBuyPageFormProductFragment_productOptions_edges_node
}

export interface ClosetDesignBuyPageFormProductFragment_productOptions {
  __typename: 'ProductOptionConnection'
  /**
   * A list of edges.
   */
  edges:
    | (ClosetDesignBuyPageFormProductFragment_productOptions_edges | null)[]
    | null
}

export interface ClosetDesignBuyPageFormProductFragment {
  __typename: 'Product'
  /**
   * The ID of an object
   */
  id: string
  /**
   * Id of the product.
   */
  entityId: number
  /**
   * Variants associated with the product.
   */
  variants: ClosetDesignBuyPageFormProductFragment_variants
  /**
   * Product options.
   */
  productOptions: ClosetDesignBuyPageFormProductFragment_productOptions
}
