/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: CatalogIndexPageProductProductFragment
// ====================================================

export interface CatalogIndexPageProductProductFragment_productOptions_edges_node_CheckboxOption {
  __typename: "CheckboxOption" | "DateFieldOption" | "FileUploadFieldOption" | "MultiLineTextFieldOption" | "NumberFieldOption" | "TextFieldOption";
}

export interface CatalogIndexPageProductProductFragment_productOptions_edges_node_MultipleChoiceOption_values_edges_node_MultipleChoiceOptionValue {
  __typename: "MultipleChoiceOptionValue" | "ProductPickListOptionValue";
}

export interface CatalogIndexPageProductProductFragment_productOptions_edges_node_MultipleChoiceOption_values_edges_node_SwatchOptionValue {
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

export type CatalogIndexPageProductProductFragment_productOptions_edges_node_MultipleChoiceOption_values_edges_node = CatalogIndexPageProductProductFragment_productOptions_edges_node_MultipleChoiceOption_values_edges_node_MultipleChoiceOptionValue | CatalogIndexPageProductProductFragment_productOptions_edges_node_MultipleChoiceOption_values_edges_node_SwatchOptionValue;

export interface CatalogIndexPageProductProductFragment_productOptions_edges_node_MultipleChoiceOption_values_edges {
  __typename: "ProductOptionValueEdge";
  /**
   * The item at the end of the edge.
   */
  node: CatalogIndexPageProductProductFragment_productOptions_edges_node_MultipleChoiceOption_values_edges_node;
}

export interface CatalogIndexPageProductProductFragment_productOptions_edges_node_MultipleChoiceOption_values {
  __typename: "ProductOptionValueConnection";
  /**
   * A list of edges.
   */
  edges: (CatalogIndexPageProductProductFragment_productOptions_edges_node_MultipleChoiceOption_values_edges | null)[] | null;
}

export interface CatalogIndexPageProductProductFragment_productOptions_edges_node_MultipleChoiceOption {
  __typename: "MultipleChoiceOption";
  /**
   * Display name for the option.
   */
  displayName: string;
  /**
   * List of option values.
   */
  values: CatalogIndexPageProductProductFragment_productOptions_edges_node_MultipleChoiceOption_values;
}

export type CatalogIndexPageProductProductFragment_productOptions_edges_node = CatalogIndexPageProductProductFragment_productOptions_edges_node_CheckboxOption | CatalogIndexPageProductProductFragment_productOptions_edges_node_MultipleChoiceOption;

export interface CatalogIndexPageProductProductFragment_productOptions_edges {
  __typename: "ProductOptionEdge";
  /**
   * The item at the end of the edge.
   */
  node: CatalogIndexPageProductProductFragment_productOptions_edges_node;
}

export interface CatalogIndexPageProductProductFragment_productOptions {
  __typename: "ProductOptionConnection";
  /**
   * A list of edges.
   */
  edges: (CatalogIndexPageProductProductFragment_productOptions_edges | null)[] | null;
}

export interface CatalogIndexPageProductProductFragment_brand {
  __typename: "Brand";
  /**
   * The ID of an object
   */
  id: string;
  /**
   * Name of the brand.
   */
  name: string;
}

export interface CatalogIndexPageProductProductFragment_defaultImage {
  __typename: "Image";
  /**
   * Absolute path to image using store CDN.
   */
  url: string;
}

export interface CatalogIndexPageProductProductFragment {
  __typename: "Product";
  /**
   * The ID of an object
   */
  id: string;
  /**
   * Product options.
   */
  productOptions: CatalogIndexPageProductProductFragment_productOptions;
  /**
   * Name of the product.
   */
  name: string;
  /**
   * Brand associated with the product.
   */
  brand: CatalogIndexPageProductProductFragment_brand | null;
  /**
   * Default image for a product.
   */
  defaultImage: CatalogIndexPageProductProductFragment_defaultImage | null;
}
