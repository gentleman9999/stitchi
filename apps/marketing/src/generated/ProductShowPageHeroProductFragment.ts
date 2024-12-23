/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ProductShowPageHeroProductFragment
// ====================================================

export interface ProductShowPageHeroProductFragment_productOptions_edges_node_CheckboxOption {
  __typename: "CheckboxOption" | "DateFieldOption" | "FileUploadFieldOption" | "MultiLineTextFieldOption" | "NumberFieldOption" | "TextFieldOption";
  /**
   * Unique ID for the option.
   */
  entityId: number;
}

export interface ProductShowPageHeroProductFragment_productOptions_edges_node_MultipleChoiceOption_values_edges_node_MultipleChoiceOptionValue {
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

export interface ProductShowPageHeroProductFragment_productOptions_edges_node_MultipleChoiceOption_values_edges_node_SwatchOptionValue {
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

export type ProductShowPageHeroProductFragment_productOptions_edges_node_MultipleChoiceOption_values_edges_node = ProductShowPageHeroProductFragment_productOptions_edges_node_MultipleChoiceOption_values_edges_node_MultipleChoiceOptionValue | ProductShowPageHeroProductFragment_productOptions_edges_node_MultipleChoiceOption_values_edges_node_SwatchOptionValue;

export interface ProductShowPageHeroProductFragment_productOptions_edges_node_MultipleChoiceOption_values_edges {
  __typename: "ProductOptionValueEdge";
  /**
   * The item at the end of the edge.
   */
  node: ProductShowPageHeroProductFragment_productOptions_edges_node_MultipleChoiceOption_values_edges_node;
}

export interface ProductShowPageHeroProductFragment_productOptions_edges_node_MultipleChoiceOption_values {
  __typename: "ProductOptionValueConnection";
  /**
   * A list of edges.
   */
  edges: (ProductShowPageHeroProductFragment_productOptions_edges_node_MultipleChoiceOption_values_edges | null)[] | null;
}

export interface ProductShowPageHeroProductFragment_productOptions_edges_node_MultipleChoiceOption {
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
  values: ProductShowPageHeroProductFragment_productOptions_edges_node_MultipleChoiceOption_values;
}

export type ProductShowPageHeroProductFragment_productOptions_edges_node = ProductShowPageHeroProductFragment_productOptions_edges_node_CheckboxOption | ProductShowPageHeroProductFragment_productOptions_edges_node_MultipleChoiceOption;

export interface ProductShowPageHeroProductFragment_productOptions_edges {
  __typename: "ProductOptionEdge";
  /**
   * The item at the end of the edge.
   */
  node: ProductShowPageHeroProductFragment_productOptions_edges_node;
}

export interface ProductShowPageHeroProductFragment_productOptions {
  __typename: "ProductOptionConnection";
  /**
   * A list of edges.
   */
  edges: (ProductShowPageHeroProductFragment_productOptions_edges | null)[] | null;
}

export interface ProductShowPageHeroProductFragment_defaultImage {
  __typename: "Image";
  /**
   * Absolute path to image using store CDN.
   */
  url: string;
}

export interface ProductShowPageHeroProductFragment_images_edges_node {
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

export interface ProductShowPageHeroProductFragment_images_edges {
  __typename: "ImageEdge";
  /**
   * The item at the end of the edge.
   */
  node: ProductShowPageHeroProductFragment_images_edges_node;
}

export interface ProductShowPageHeroProductFragment_images {
  __typename: "ImageConnection";
  /**
   * A list of edges.
   */
  edges: (ProductShowPageHeroProductFragment_images_edges | null)[] | null;
}

export interface ProductShowPageHeroProductFragment_variants_edges_node_defaultImage {
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

export interface ProductShowPageHeroProductFragment_variants_edges_node_options_edges_node_values_edges_node {
  __typename: "ProductOptionValue";
  /**
   * Unique ID for the option value.
   */
  entityId: number;
}

export interface ProductShowPageHeroProductFragment_variants_edges_node_options_edges_node_values_edges {
  __typename: "OptionValueEdge";
  /**
   * The item at the end of the edge.
   */
  node: ProductShowPageHeroProductFragment_variants_edges_node_options_edges_node_values_edges_node;
}

export interface ProductShowPageHeroProductFragment_variants_edges_node_options_edges_node_values {
  __typename: "OptionValueConnection";
  /**
   * A list of edges.
   */
  edges: (ProductShowPageHeroProductFragment_variants_edges_node_options_edges_node_values_edges | null)[] | null;
}

export interface ProductShowPageHeroProductFragment_variants_edges_node_options_edges_node {
  __typename: "ProductOption";
  /**
   * Display name for the option.
   */
  displayName: string;
  /**
   * Option values.
   */
  values: ProductShowPageHeroProductFragment_variants_edges_node_options_edges_node_values;
}

export interface ProductShowPageHeroProductFragment_variants_edges_node_options_edges {
  __typename: "OptionEdge";
  /**
   * The item at the end of the edge.
   */
  node: ProductShowPageHeroProductFragment_variants_edges_node_options_edges_node;
}

export interface ProductShowPageHeroProductFragment_variants_edges_node_options {
  __typename: "OptionConnection";
  /**
   * A list of edges.
   */
  edges: (ProductShowPageHeroProductFragment_variants_edges_node_options_edges | null)[] | null;
}

export interface ProductShowPageHeroProductFragment_variants_edges_node {
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
  defaultImage: ProductShowPageHeroProductFragment_variants_edges_node_defaultImage | null;
  /**
   * The options which define a variant.
   */
  options: ProductShowPageHeroProductFragment_variants_edges_node_options;
}

export interface ProductShowPageHeroProductFragment_variants_edges {
  __typename: "VariantEdge";
  /**
   * The item at the end of the edge.
   */
  node: ProductShowPageHeroProductFragment_variants_edges_node;
}

export interface ProductShowPageHeroProductFragment_variants {
  __typename: "VariantConnection";
  /**
   * A list of edges.
   */
  edges: (ProductShowPageHeroProductFragment_variants_edges | null)[] | null;
}

export interface ProductShowPageHeroProductFragment_brand {
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

export interface ProductShowPageHeroProductFragment {
  __typename: "Product";
  /**
   * The ID of an object
   */
  id: string;
  /**
   * Product options.
   */
  productOptions: ProductShowPageHeroProductFragment_productOptions;
  /**
   * Name of the product.
   */
  name: string;
  /**
   * Default image for a product.
   */
  defaultImage: ProductShowPageHeroProductFragment_defaultImage | null;
  /**
   * A list of the images for a product.
   */
  images: ProductShowPageHeroProductFragment_images;
  /**
   * Variants associated with the product.
   */
  variants: ProductShowPageHeroProductFragment_variants;
  /**
   * Brand associated with the product.
   */
  brand: ProductShowPageHeroProductFragment_brand | null;
  /**
   * Id of the product.
   */
  entityId: number;
  /**
   * Relative URL path to product page.
   */
  path: string;
}
