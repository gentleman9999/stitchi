/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ProductDialogProductFragment
// ====================================================

export interface ProductDialogProductFragment_productOptions_edges_node_CheckboxOption {
  __typename: "CheckboxOption" | "DateFieldOption" | "FileUploadFieldOption" | "MultiLineTextFieldOption" | "NumberFieldOption" | "TextFieldOption";
}

export interface ProductDialogProductFragment_productOptions_edges_node_MultipleChoiceOption_values_edges_node_MultipleChoiceOptionValue {
  __typename: "MultipleChoiceOptionValue" | "ProductPickListOptionValue";
  /**
   * Unique ID for the option value.
   */
  entityId: number;
}

export interface ProductDialogProductFragment_productOptions_edges_node_MultipleChoiceOption_values_edges_node_SwatchOptionValue {
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

export type ProductDialogProductFragment_productOptions_edges_node_MultipleChoiceOption_values_edges_node = ProductDialogProductFragment_productOptions_edges_node_MultipleChoiceOption_values_edges_node_MultipleChoiceOptionValue | ProductDialogProductFragment_productOptions_edges_node_MultipleChoiceOption_values_edges_node_SwatchOptionValue;

export interface ProductDialogProductFragment_productOptions_edges_node_MultipleChoiceOption_values_edges {
  __typename: "ProductOptionValueEdge";
  /**
   * The item at the end of the edge.
   */
  node: ProductDialogProductFragment_productOptions_edges_node_MultipleChoiceOption_values_edges_node;
}

export interface ProductDialogProductFragment_productOptions_edges_node_MultipleChoiceOption_values {
  __typename: "ProductOptionValueConnection";
  /**
   * A list of edges.
   */
  edges: (ProductDialogProductFragment_productOptions_edges_node_MultipleChoiceOption_values_edges | null)[] | null;
}

export interface ProductDialogProductFragment_productOptions_edges_node_MultipleChoiceOption {
  __typename: "MultipleChoiceOption";
  /**
   * Display name for the option.
   */
  displayName: string;
  /**
   * List of option values.
   */
  values: ProductDialogProductFragment_productOptions_edges_node_MultipleChoiceOption_values;
}

export type ProductDialogProductFragment_productOptions_edges_node = ProductDialogProductFragment_productOptions_edges_node_CheckboxOption | ProductDialogProductFragment_productOptions_edges_node_MultipleChoiceOption;

export interface ProductDialogProductFragment_productOptions_edges {
  __typename: "ProductOptionEdge";
  /**
   * The item at the end of the edge.
   */
  node: ProductDialogProductFragment_productOptions_edges_node;
}

export interface ProductDialogProductFragment_productOptions {
  __typename: "ProductOptionConnection";
  /**
   * A list of edges.
   */
  edges: (ProductDialogProductFragment_productOptions_edges | null)[] | null;
}

export interface ProductDialogProductFragment_brand {
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

export interface ProductDialogProductFragment_defaultImage {
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

export interface ProductDialogProductFragment_variants_edges_node_defaultImage {
  __typename: "Image";
  /**
   * Absolute path to image using store CDN.
   */
  url: string;
  /**
   * Text description of an image that can be used for SEO and/or accessibility purposes.
   */
  altText: string;
}

export interface ProductDialogProductFragment_variants_edges_node_options_edges_node_values_edges_node {
  __typename: "ProductOptionValue";
  /**
   * Unique ID for the option value.
   */
  entityId: number;
}

export interface ProductDialogProductFragment_variants_edges_node_options_edges_node_values_edges {
  __typename: "OptionValueEdge";
  /**
   * The item at the end of the edge.
   */
  node: ProductDialogProductFragment_variants_edges_node_options_edges_node_values_edges_node;
}

export interface ProductDialogProductFragment_variants_edges_node_options_edges_node_values {
  __typename: "OptionValueConnection";
  /**
   * A list of edges.
   */
  edges: (ProductDialogProductFragment_variants_edges_node_options_edges_node_values_edges | null)[] | null;
}

export interface ProductDialogProductFragment_variants_edges_node_options_edges_node {
  __typename: "ProductOption";
  /**
   * Option values.
   */
  values: ProductDialogProductFragment_variants_edges_node_options_edges_node_values;
}

export interface ProductDialogProductFragment_variants_edges_node_options_edges {
  __typename: "OptionEdge";
  /**
   * The item at the end of the edge.
   */
  node: ProductDialogProductFragment_variants_edges_node_options_edges_node;
}

export interface ProductDialogProductFragment_variants_edges_node_options {
  __typename: "OptionConnection";
  /**
   * A list of edges.
   */
  edges: (ProductDialogProductFragment_variants_edges_node_options_edges | null)[] | null;
}

export interface ProductDialogProductFragment_variants_edges_node {
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
  defaultImage: ProductDialogProductFragment_variants_edges_node_defaultImage | null;
  /**
   * The options which define a variant.
   */
  options: ProductDialogProductFragment_variants_edges_node_options;
}

export interface ProductDialogProductFragment_variants_edges {
  __typename: "VariantEdge";
  /**
   * The item at the end of the edge.
   */
  node: ProductDialogProductFragment_variants_edges_node;
}

export interface ProductDialogProductFragment_variants {
  __typename: "VariantConnection";
  /**
   * A list of edges.
   */
  edges: (ProductDialogProductFragment_variants_edges | null)[] | null;
}

export interface ProductDialogProductFragment {
  __typename: "Product";
  /**
   * The ID of an object
   */
  id: string;
  /**
   * Product options.
   */
  productOptions: ProductDialogProductFragment_productOptions;
  /**
   * Id of the product.
   */
  entityId: number;
  /**
   * Name of the product.
   */
  name: string;
  /**
   * Description of the product.
   */
  description: string;
  /**
   * Brand associated with the product.
   */
  brand: ProductDialogProductFragment_brand | null;
  /**
   * Default image for a product.
   */
  defaultImage: ProductDialogProductFragment_defaultImage | null;
  /**
   * Variants associated with the product.
   */
  variants: ProductDialogProductFragment_variants;
}
