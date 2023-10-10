/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ProductShowPageHeroFragment
// ====================================================

export interface ProductShowPageHeroFragment_defaultImage {
  __typename: "Image";
  /**
   * Absolute path to image using store CDN.
   */
  seoImageUrl: string;
  /**
   * Absolute path to image using store CDN.
   */
  url: string;
  /**
   * Text description of an image that can be used for SEO and/or accessibility purposes.
   */
  altText: string;
}

export interface ProductShowPageHeroFragment_brand {
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

export interface ProductShowPageHeroFragment_seo {
  __typename: "SeoDetails";
  /**
   * Meta description.
   */
  metaDescription: string;
}

export interface ProductShowPageHeroFragment_relatedProducts_edges_node_productOptions_edges_node_CheckboxOption {
  __typename: "CheckboxOption" | "DateFieldOption" | "FileUploadFieldOption" | "MultiLineTextFieldOption" | "NumberFieldOption" | "TextFieldOption";
  /**
   * Unique ID for the option.
   */
  entityId: number;
}

export interface ProductShowPageHeroFragment_relatedProducts_edges_node_productOptions_edges_node_MultipleChoiceOption_values_edges_node_MultipleChoiceOptionValue {
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

export interface ProductShowPageHeroFragment_relatedProducts_edges_node_productOptions_edges_node_MultipleChoiceOption_values_edges_node_SwatchOptionValue {
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

export type ProductShowPageHeroFragment_relatedProducts_edges_node_productOptions_edges_node_MultipleChoiceOption_values_edges_node = ProductShowPageHeroFragment_relatedProducts_edges_node_productOptions_edges_node_MultipleChoiceOption_values_edges_node_MultipleChoiceOptionValue | ProductShowPageHeroFragment_relatedProducts_edges_node_productOptions_edges_node_MultipleChoiceOption_values_edges_node_SwatchOptionValue;

export interface ProductShowPageHeroFragment_relatedProducts_edges_node_productOptions_edges_node_MultipleChoiceOption_values_edges {
  __typename: "ProductOptionValueEdge";
  /**
   * The item at the end of the edge.
   */
  node: ProductShowPageHeroFragment_relatedProducts_edges_node_productOptions_edges_node_MultipleChoiceOption_values_edges_node;
}

export interface ProductShowPageHeroFragment_relatedProducts_edges_node_productOptions_edges_node_MultipleChoiceOption_values {
  __typename: "ProductOptionValueConnection";
  /**
   * A list of edges.
   */
  edges: (ProductShowPageHeroFragment_relatedProducts_edges_node_productOptions_edges_node_MultipleChoiceOption_values_edges | null)[] | null;
}

export interface ProductShowPageHeroFragment_relatedProducts_edges_node_productOptions_edges_node_MultipleChoiceOption {
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
  values: ProductShowPageHeroFragment_relatedProducts_edges_node_productOptions_edges_node_MultipleChoiceOption_values;
}

export type ProductShowPageHeroFragment_relatedProducts_edges_node_productOptions_edges_node = ProductShowPageHeroFragment_relatedProducts_edges_node_productOptions_edges_node_CheckboxOption | ProductShowPageHeroFragment_relatedProducts_edges_node_productOptions_edges_node_MultipleChoiceOption;

export interface ProductShowPageHeroFragment_relatedProducts_edges_node_productOptions_edges {
  __typename: "ProductOptionEdge";
  /**
   * The item at the end of the edge.
   */
  node: ProductShowPageHeroFragment_relatedProducts_edges_node_productOptions_edges_node;
}

export interface ProductShowPageHeroFragment_relatedProducts_edges_node_productOptions {
  __typename: "ProductOptionConnection";
  /**
   * A list of edges.
   */
  edges: (ProductShowPageHeroFragment_relatedProducts_edges_node_productOptions_edges | null)[] | null;
}

export interface ProductShowPageHeroFragment_relatedProducts_edges_node_brand {
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

export interface ProductShowPageHeroFragment_relatedProducts_edges_node_defaultImage {
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

export interface ProductShowPageHeroFragment_relatedProducts_edges_node {
  __typename: "Product";
  /**
   * The ID of an object
   */
  id: string;
  /**
   * Product options.
   */
  productOptions: ProductShowPageHeroFragment_relatedProducts_edges_node_productOptions;
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
  brand: ProductShowPageHeroFragment_relatedProducts_edges_node_brand | null;
  /**
   * Default image for a product.
   */
  defaultImage: ProductShowPageHeroFragment_relatedProducts_edges_node_defaultImage | null;
}

export interface ProductShowPageHeroFragment_relatedProducts_edges {
  __typename: "RelatedProductsEdge";
  /**
   * The item at the end of the edge.
   */
  node: ProductShowPageHeroFragment_relatedProducts_edges_node;
}

export interface ProductShowPageHeroFragment_relatedProducts {
  __typename: "RelatedProductsConnection";
  /**
   * A list of edges.
   */
  edges: (ProductShowPageHeroFragment_relatedProducts_edges | null)[] | null;
}

export interface ProductShowPageHeroFragment_variants_edges_node_options_edges_node_values_edges_node {
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

export interface ProductShowPageHeroFragment_variants_edges_node_options_edges_node_values_edges {
  __typename: "OptionValueEdge";
  /**
   * The item at the end of the edge.
   */
  node: ProductShowPageHeroFragment_variants_edges_node_options_edges_node_values_edges_node;
}

export interface ProductShowPageHeroFragment_variants_edges_node_options_edges_node_values {
  __typename: "OptionValueConnection";
  /**
   * A list of edges.
   */
  edges: (ProductShowPageHeroFragment_variants_edges_node_options_edges_node_values_edges | null)[] | null;
}

export interface ProductShowPageHeroFragment_variants_edges_node_options_edges_node {
  __typename: "ProductOption";
  /**
   * Display name for the option.
   */
  displayName: string;
  /**
   * Option values.
   */
  values: ProductShowPageHeroFragment_variants_edges_node_options_edges_node_values;
}

export interface ProductShowPageHeroFragment_variants_edges_node_options_edges {
  __typename: "OptionEdge";
  /**
   * The item at the end of the edge.
   */
  node: ProductShowPageHeroFragment_variants_edges_node_options_edges_node;
}

export interface ProductShowPageHeroFragment_variants_edges_node_options {
  __typename: "OptionConnection";
  /**
   * A list of edges.
   */
  edges: (ProductShowPageHeroFragment_variants_edges_node_options_edges | null)[] | null;
}

export interface ProductShowPageHeroFragment_variants_edges_node_jsonLdImage {
  __typename: "Image";
  /**
   * Absolute path to image using store CDN.
   */
  url: string;
}

export interface ProductShowPageHeroFragment_variants_edges_node_defaultImage {
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

export interface ProductShowPageHeroFragment_variants_edges_node {
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
   * The options which define a variant.
   */
  options: ProductShowPageHeroFragment_variants_edges_node_options;
  /**
   * Default image for a variant.
   */
  jsonLdImage: ProductShowPageHeroFragment_variants_edges_node_jsonLdImage | null;
  /**
   * Id of the variant.
   */
  entityId: number;
  /**
   * Default image for a variant.
   */
  defaultImage: ProductShowPageHeroFragment_variants_edges_node_defaultImage | null;
}

export interface ProductShowPageHeroFragment_variants_edges {
  __typename: "VariantEdge";
  /**
   * The item at the end of the edge.
   */
  node: ProductShowPageHeroFragment_variants_edges_node;
}

export interface ProductShowPageHeroFragment_variants {
  __typename: "VariantConnection";
  /**
   * A list of edges.
   */
  edges: (ProductShowPageHeroFragment_variants_edges | null)[] | null;
}

export interface ProductShowPageHeroFragment_productOptions_edges_node_CheckboxOption {
  __typename: "CheckboxOption" | "DateFieldOption" | "FileUploadFieldOption" | "MultiLineTextFieldOption" | "NumberFieldOption" | "TextFieldOption";
  /**
   * Unique ID for the option.
   */
  entityId: number;
}

export interface ProductShowPageHeroFragment_productOptions_edges_node_MultipleChoiceOption_values_edges_node_MultipleChoiceOptionValue {
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

export interface ProductShowPageHeroFragment_productOptions_edges_node_MultipleChoiceOption_values_edges_node_SwatchOptionValue {
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

export type ProductShowPageHeroFragment_productOptions_edges_node_MultipleChoiceOption_values_edges_node = ProductShowPageHeroFragment_productOptions_edges_node_MultipleChoiceOption_values_edges_node_MultipleChoiceOptionValue | ProductShowPageHeroFragment_productOptions_edges_node_MultipleChoiceOption_values_edges_node_SwatchOptionValue;

export interface ProductShowPageHeroFragment_productOptions_edges_node_MultipleChoiceOption_values_edges {
  __typename: "ProductOptionValueEdge";
  /**
   * The item at the end of the edge.
   */
  node: ProductShowPageHeroFragment_productOptions_edges_node_MultipleChoiceOption_values_edges_node;
}

export interface ProductShowPageHeroFragment_productOptions_edges_node_MultipleChoiceOption_values {
  __typename: "ProductOptionValueConnection";
  /**
   * A list of edges.
   */
  edges: (ProductShowPageHeroFragment_productOptions_edges_node_MultipleChoiceOption_values_edges | null)[] | null;
}

export interface ProductShowPageHeroFragment_productOptions_edges_node_MultipleChoiceOption {
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
  values: ProductShowPageHeroFragment_productOptions_edges_node_MultipleChoiceOption_values;
}

export type ProductShowPageHeroFragment_productOptions_edges_node = ProductShowPageHeroFragment_productOptions_edges_node_CheckboxOption | ProductShowPageHeroFragment_productOptions_edges_node_MultipleChoiceOption;

export interface ProductShowPageHeroFragment_productOptions_edges {
  __typename: "ProductOptionEdge";
  /**
   * The item at the end of the edge.
   */
  node: ProductShowPageHeroFragment_productOptions_edges_node;
}

export interface ProductShowPageHeroFragment_productOptions {
  __typename: "ProductOptionConnection";
  /**
   * A list of edges.
   */
  edges: (ProductShowPageHeroFragment_productOptions_edges | null)[] | null;
}

export interface ProductShowPageHeroFragment_categories_edges_node {
  __typename: "Category";
  /**
   * The ID of an object
   */
  id: string;
  /**
   * Category name.
   */
  name: string;
  /**
   * Category path.
   */
  path: string;
}

export interface ProductShowPageHeroFragment_categories_edges {
  __typename: "CategoryEdge";
  /**
   * The item at the end of the edge.
   */
  node: ProductShowPageHeroFragment_categories_edges_node;
}

export interface ProductShowPageHeroFragment_categories {
  __typename: "CategoryConnection";
  /**
   * A list of edges.
   */
  edges: (ProductShowPageHeroFragment_categories_edges | null)[] | null;
}

export interface ProductShowPageHeroFragment {
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
   * Global trade item number.
   */
  gtin: string | null;
  /**
   * Default product variant when no options are selected.
   */
  sku: string;
  priceCents: number;
  /**
   * Description of the product in plain text.
   */
  plainTextDescription: string;
  /**
   * Default image for a product.
   */
  defaultImage: ProductShowPageHeroFragment_defaultImage | null;
  /**
   * Brand associated with the product.
   */
  brand: ProductShowPageHeroFragment_brand | null;
  /**
   * Product SEO details.
   */
  seo: ProductShowPageHeroFragment_seo;
  /**
   * Related products for this product.
   */
  relatedProducts: ProductShowPageHeroFragment_relatedProducts;
  /**
   * Variants associated with the product.
   */
  variants: ProductShowPageHeroFragment_variants;
  /**
   * Product options.
   */
  productOptions: ProductShowPageHeroFragment_productOptions;
  /**
   * Id of the product.
   */
  entityId: number;
  /**
   * Description of the product.
   */
  description: string;
  /**
   * List of categories associated with the product.
   */
  categories: ProductShowPageHeroFragment_categories;
}
