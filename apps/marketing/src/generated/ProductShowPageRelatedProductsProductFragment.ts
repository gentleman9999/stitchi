/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ProductShowPageRelatedProductsProductFragment
// ====================================================

export interface ProductShowPageRelatedProductsProductFragment_productOptions_edges_node_CheckboxOption {
  __typename: "CheckboxOption" | "DateFieldOption" | "FileUploadFieldOption" | "MultiLineTextFieldOption" | "NumberFieldOption" | "TextFieldOption";
  /**
   * Unique ID for the option.
   */
  entityId: number;
}

export interface ProductShowPageRelatedProductsProductFragment_productOptions_edges_node_MultipleChoiceOption_values_edges_node_MultipleChoiceOptionValue {
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

export interface ProductShowPageRelatedProductsProductFragment_productOptions_edges_node_MultipleChoiceOption_values_edges_node_SwatchOptionValue {
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

export type ProductShowPageRelatedProductsProductFragment_productOptions_edges_node_MultipleChoiceOption_values_edges_node = ProductShowPageRelatedProductsProductFragment_productOptions_edges_node_MultipleChoiceOption_values_edges_node_MultipleChoiceOptionValue | ProductShowPageRelatedProductsProductFragment_productOptions_edges_node_MultipleChoiceOption_values_edges_node_SwatchOptionValue;

export interface ProductShowPageRelatedProductsProductFragment_productOptions_edges_node_MultipleChoiceOption_values_edges {
  __typename: "ProductOptionValueEdge";
  /**
   * The item at the end of the edge.
   */
  node: ProductShowPageRelatedProductsProductFragment_productOptions_edges_node_MultipleChoiceOption_values_edges_node;
}

export interface ProductShowPageRelatedProductsProductFragment_productOptions_edges_node_MultipleChoiceOption_values {
  __typename: "ProductOptionValueConnection";
  /**
   * A list of edges.
   */
  edges: (ProductShowPageRelatedProductsProductFragment_productOptions_edges_node_MultipleChoiceOption_values_edges | null)[] | null;
}

export interface ProductShowPageRelatedProductsProductFragment_productOptions_edges_node_MultipleChoiceOption {
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
  values: ProductShowPageRelatedProductsProductFragment_productOptions_edges_node_MultipleChoiceOption_values;
}

export type ProductShowPageRelatedProductsProductFragment_productOptions_edges_node = ProductShowPageRelatedProductsProductFragment_productOptions_edges_node_CheckboxOption | ProductShowPageRelatedProductsProductFragment_productOptions_edges_node_MultipleChoiceOption;

export interface ProductShowPageRelatedProductsProductFragment_productOptions_edges {
  __typename: "ProductOptionEdge";
  /**
   * The item at the end of the edge.
   */
  node: ProductShowPageRelatedProductsProductFragment_productOptions_edges_node;
}

export interface ProductShowPageRelatedProductsProductFragment_productOptions {
  __typename: "ProductOptionConnection";
  /**
   * A list of edges.
   */
  edges: (ProductShowPageRelatedProductsProductFragment_productOptions_edges | null)[] | null;
}

export interface ProductShowPageRelatedProductsProductFragment_brand {
  __typename: "Brand";
  /**
   * The ID of an object
   */
  id: string;
  /**
   * Name of the brand.
   */
  name: string;
  /**
   * Path for the brand page.
   */
  path: string;
}

export interface ProductShowPageRelatedProductsProductFragment_defaultImage {
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

export interface ProductShowPageRelatedProductsProductFragment {
  __typename: "Product";
  /**
   * The ID of an object
   */
  id: string;
  /**
   * Product options.
   */
  productOptions: ProductShowPageRelatedProductsProductFragment_productOptions;
  /**
   * Name of the product.
   */
  name: string;
  /**
   * Relative URL path to product page.
   */
  path: string;
  priceCents: number;
  /**
   * Brand associated with the product.
   */
  brand: ProductShowPageRelatedProductsProductFragment_brand | null;
  /**
   * Default image for a product.
   */
  defaultImage: ProductShowPageRelatedProductsProductFragment_defaultImage | null;
}
