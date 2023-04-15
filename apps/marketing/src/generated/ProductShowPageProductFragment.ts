/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ProductShowPageProductFragment
// ====================================================

export interface ProductShowPageProductFragment_defaultImage {
  __typename: "Image";
  /**
   * Absolute path to image using store CDN.
   */
  seoImageUrl: string;
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

export interface ProductShowPageProductFragment_brand {
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

export interface ProductShowPageProductFragment_seo {
  __typename: "SeoDetails";
  /**
   * Meta description.
   */
  metaDescription: string;
}

export interface ProductShowPageProductFragment_variants_edges_node_prices_price {
  __typename: "Money";
  /**
   * Currency code of the current money.
   */
  currencyCode: string;
  /**
   * The amount of money.
   */
  value: any;
}

export interface ProductShowPageProductFragment_variants_edges_node_prices {
  __typename: "Prices";
  /**
   * Calculated price of the product.  Calculated price takes into account basePrice, salePrice, rules (modifier, option, option set) that apply to the product configuration, and customer group discounts.  It represents the in-cart price for a product configuration without bulk pricing rules.
   */
  price: ProductShowPageProductFragment_variants_edges_node_prices_price;
}

export interface ProductShowPageProductFragment_variants_edges_node_options_edges_node_values_edges_node {
  __typename: "ProductOptionValue";
  /**
   * Label for the option value.
   */
  label: string;
  /**
   * Unique ID for the option value.
   */
  entityId: number;
}

export interface ProductShowPageProductFragment_variants_edges_node_options_edges_node_values_edges {
  __typename: "OptionValueEdge";
  /**
   * The item at the end of the edge.
   */
  node: ProductShowPageProductFragment_variants_edges_node_options_edges_node_values_edges_node;
}

export interface ProductShowPageProductFragment_variants_edges_node_options_edges_node_values {
  __typename: "OptionValueConnection";
  /**
   * A list of edges.
   */
  edges: (ProductShowPageProductFragment_variants_edges_node_options_edges_node_values_edges | null)[] | null;
}

export interface ProductShowPageProductFragment_variants_edges_node_options_edges_node {
  __typename: "ProductOption";
  /**
   * Display name for the option.
   */
  displayName: string;
  /**
   * Option values.
   */
  values: ProductShowPageProductFragment_variants_edges_node_options_edges_node_values;
}

export interface ProductShowPageProductFragment_variants_edges_node_options_edges {
  __typename: "OptionEdge";
  /**
   * The item at the end of the edge.
   */
  node: ProductShowPageProductFragment_variants_edges_node_options_edges_node;
}

export interface ProductShowPageProductFragment_variants_edges_node_options {
  __typename: "OptionConnection";
  /**
   * A list of edges.
   */
  edges: (ProductShowPageProductFragment_variants_edges_node_options_edges | null)[] | null;
}

export interface ProductShowPageProductFragment_variants_edges_node_jsonLdImage {
  __typename: "Image";
  /**
   * Absolute path to image using store CDN.
   */
  url: string;
}

export interface ProductShowPageProductFragment_variants_edges_node_defaultImage {
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

export interface ProductShowPageProductFragment_variants_edges_node {
  __typename: "Variant";
  /**
   * The ID of an object
   */
  id: string;
  /**
   * Global trade item number.
   */
  gtin: string | null;
  /**
   * Manufacturer part number.
   */
  mpn: string | null;
  /**
   * Sku of the variant.
   */
  sku: string;
  /**
   * Variant prices
   */
  prices: ProductShowPageProductFragment_variants_edges_node_prices | null;
  /**
   * The options which define a variant.
   */
  options: ProductShowPageProductFragment_variants_edges_node_options;
  /**
   * Default image for a variant.
   */
  jsonLdImage: ProductShowPageProductFragment_variants_edges_node_jsonLdImage | null;
  /**
   * Id of the variant.
   */
  entityId: number;
  /**
   * Default image for a variant.
   */
  defaultImage: ProductShowPageProductFragment_variants_edges_node_defaultImage | null;
}

export interface ProductShowPageProductFragment_variants_edges {
  __typename: "VariantEdge";
  /**
   * The item at the end of the edge.
   */
  node: ProductShowPageProductFragment_variants_edges_node;
}

export interface ProductShowPageProductFragment_variants {
  __typename: "VariantConnection";
  /**
   * A list of edges.
   */
  edges: (ProductShowPageProductFragment_variants_edges | null)[] | null;
}

export interface ProductShowPageProductFragment_productOptions_edges_node_CheckboxOption {
  __typename: "CheckboxOption" | "DateFieldOption" | "FileUploadFieldOption" | "MultiLineTextFieldOption" | "NumberFieldOption" | "TextFieldOption";
}

export interface ProductShowPageProductFragment_productOptions_edges_node_MultipleChoiceOption_values_edges_node_MultipleChoiceOptionValue {
  __typename: "MultipleChoiceOptionValue" | "ProductPickListOptionValue";
  /**
   * Unique ID for the option value.
   */
  entityId: number;
}

export interface ProductShowPageProductFragment_productOptions_edges_node_MultipleChoiceOption_values_edges_node_SwatchOptionValue {
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

export type ProductShowPageProductFragment_productOptions_edges_node_MultipleChoiceOption_values_edges_node = ProductShowPageProductFragment_productOptions_edges_node_MultipleChoiceOption_values_edges_node_MultipleChoiceOptionValue | ProductShowPageProductFragment_productOptions_edges_node_MultipleChoiceOption_values_edges_node_SwatchOptionValue;

export interface ProductShowPageProductFragment_productOptions_edges_node_MultipleChoiceOption_values_edges {
  __typename: "ProductOptionValueEdge";
  /**
   * The item at the end of the edge.
   */
  node: ProductShowPageProductFragment_productOptions_edges_node_MultipleChoiceOption_values_edges_node;
}

export interface ProductShowPageProductFragment_productOptions_edges_node_MultipleChoiceOption_values {
  __typename: "ProductOptionValueConnection";
  /**
   * A list of edges.
   */
  edges: (ProductShowPageProductFragment_productOptions_edges_node_MultipleChoiceOption_values_edges | null)[] | null;
}

export interface ProductShowPageProductFragment_productOptions_edges_node_MultipleChoiceOption {
  __typename: "MultipleChoiceOption";
  /**
   * Display name for the option.
   */
  displayName: string;
  /**
   * List of option values.
   */
  values: ProductShowPageProductFragment_productOptions_edges_node_MultipleChoiceOption_values;
}

export type ProductShowPageProductFragment_productOptions_edges_node = ProductShowPageProductFragment_productOptions_edges_node_CheckboxOption | ProductShowPageProductFragment_productOptions_edges_node_MultipleChoiceOption;

export interface ProductShowPageProductFragment_productOptions_edges {
  __typename: "ProductOptionEdge";
  /**
   * The item at the end of the edge.
   */
  node: ProductShowPageProductFragment_productOptions_edges_node;
}

export interface ProductShowPageProductFragment_productOptions {
  __typename: "ProductOptionConnection";
  /**
   * A list of edges.
   */
  edges: (ProductShowPageProductFragment_productOptions_edges | null)[] | null;
}

export interface ProductShowPageProductFragment {
  __typename: "Product";
  /**
   * The ID of an object
   */
  id: string;
  /**
   * Name of the product.
   */
  name: string;
  /**
   * Relative URL path to product page.
   */
  path: string;
  /**
   * Description of the product in plain text.
   */
  plainTextDescription: string;
  /**
   * Global trade item number.
   */
  gtin: string | null;
  /**
   * Default image for a product.
   */
  defaultImage: ProductShowPageProductFragment_defaultImage | null;
  /**
   * Brand associated with the product.
   */
  brand: ProductShowPageProductFragment_brand | null;
  /**
   * Product SEO details.
   */
  seo: ProductShowPageProductFragment_seo;
  /**
   * Variants associated with the product.
   */
  variants: ProductShowPageProductFragment_variants;
  /**
   * Product options.
   */
  productOptions: ProductShowPageProductFragment_productOptions;
  /**
   * Id of the product.
   */
  entityId: number;
  /**
   * Description of the product.
   */
  description: string;
}
