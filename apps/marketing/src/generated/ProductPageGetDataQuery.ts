/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ProductPageGetDataQuery
// ====================================================

export interface ProductPageGetDataQuery_site_route_node_Brand {
  __typename: "Brand" | "Category" | "Variant";
  /**
   * The id of the object.
   */
  id: string;
}

export interface ProductPageGetDataQuery_site_route_node_Product_defaultImage {
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

export interface ProductPageGetDataQuery_site_route_node_Product_brand {
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

export interface ProductPageGetDataQuery_site_route_node_Product_seo {
  __typename: "SeoDetails";
  /**
   * Meta description.
   */
  metaDescription: string;
}

export interface ProductPageGetDataQuery_site_route_node_Product_productOptions_edges_node_CheckboxOption {
  __typename: "CheckboxOption" | "DateFieldOption" | "FileUploadFieldOption" | "MultiLineTextFieldOption" | "NumberFieldOption" | "TextFieldOption";
}

export interface ProductPageGetDataQuery_site_route_node_Product_productOptions_edges_node_MultipleChoiceOption_values_edges_node_MultipleChoiceOptionValue {
  __typename: "MultipleChoiceOptionValue" | "ProductPickListOptionValue";
  /**
   * Unique ID for the option value.
   */
  entityId: number;
}

export interface ProductPageGetDataQuery_site_route_node_Product_productOptions_edges_node_MultipleChoiceOption_values_edges_node_SwatchOptionValue {
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

export type ProductPageGetDataQuery_site_route_node_Product_productOptions_edges_node_MultipleChoiceOption_values_edges_node = ProductPageGetDataQuery_site_route_node_Product_productOptions_edges_node_MultipleChoiceOption_values_edges_node_MultipleChoiceOptionValue | ProductPageGetDataQuery_site_route_node_Product_productOptions_edges_node_MultipleChoiceOption_values_edges_node_SwatchOptionValue;

export interface ProductPageGetDataQuery_site_route_node_Product_productOptions_edges_node_MultipleChoiceOption_values_edges {
  __typename: "ProductOptionValueEdge";
  /**
   * The item at the end of the edge.
   */
  node: ProductPageGetDataQuery_site_route_node_Product_productOptions_edges_node_MultipleChoiceOption_values_edges_node;
}

export interface ProductPageGetDataQuery_site_route_node_Product_productOptions_edges_node_MultipleChoiceOption_values {
  __typename: "ProductOptionValueConnection";
  /**
   * A list of edges.
   */
  edges: (ProductPageGetDataQuery_site_route_node_Product_productOptions_edges_node_MultipleChoiceOption_values_edges | null)[] | null;
}

export interface ProductPageGetDataQuery_site_route_node_Product_productOptions_edges_node_MultipleChoiceOption {
  __typename: "MultipleChoiceOption";
  /**
   * Display name for the option.
   */
  displayName: string;
  /**
   * List of option values.
   */
  values: ProductPageGetDataQuery_site_route_node_Product_productOptions_edges_node_MultipleChoiceOption_values;
}

export type ProductPageGetDataQuery_site_route_node_Product_productOptions_edges_node = ProductPageGetDataQuery_site_route_node_Product_productOptions_edges_node_CheckboxOption | ProductPageGetDataQuery_site_route_node_Product_productOptions_edges_node_MultipleChoiceOption;

export interface ProductPageGetDataQuery_site_route_node_Product_productOptions_edges {
  __typename: "ProductOptionEdge";
  /**
   * The item at the end of the edge.
   */
  node: ProductPageGetDataQuery_site_route_node_Product_productOptions_edges_node;
}

export interface ProductPageGetDataQuery_site_route_node_Product_productOptions {
  __typename: "ProductOptionConnection";
  /**
   * A list of edges.
   */
  edges: (ProductPageGetDataQuery_site_route_node_Product_productOptions_edges | null)[] | null;
}

export interface ProductPageGetDataQuery_site_route_node_Product_variants_edges_node_defaultImage {
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

export interface ProductPageGetDataQuery_site_route_node_Product_variants_edges_node_options_edges_node_values_edges_node {
  __typename: "ProductOptionValue";
  /**
   * Unique ID for the option value.
   */
  entityId: number;
}

export interface ProductPageGetDataQuery_site_route_node_Product_variants_edges_node_options_edges_node_values_edges {
  __typename: "OptionValueEdge";
  /**
   * The item at the end of the edge.
   */
  node: ProductPageGetDataQuery_site_route_node_Product_variants_edges_node_options_edges_node_values_edges_node;
}

export interface ProductPageGetDataQuery_site_route_node_Product_variants_edges_node_options_edges_node_values {
  __typename: "OptionValueConnection";
  /**
   * A list of edges.
   */
  edges: (ProductPageGetDataQuery_site_route_node_Product_variants_edges_node_options_edges_node_values_edges | null)[] | null;
}

export interface ProductPageGetDataQuery_site_route_node_Product_variants_edges_node_options_edges_node {
  __typename: "ProductOption";
  /**
   * Option values.
   */
  values: ProductPageGetDataQuery_site_route_node_Product_variants_edges_node_options_edges_node_values;
}

export interface ProductPageGetDataQuery_site_route_node_Product_variants_edges_node_options_edges {
  __typename: "OptionEdge";
  /**
   * The item at the end of the edge.
   */
  node: ProductPageGetDataQuery_site_route_node_Product_variants_edges_node_options_edges_node;
}

export interface ProductPageGetDataQuery_site_route_node_Product_variants_edges_node_options {
  __typename: "OptionConnection";
  /**
   * A list of edges.
   */
  edges: (ProductPageGetDataQuery_site_route_node_Product_variants_edges_node_options_edges | null)[] | null;
}

export interface ProductPageGetDataQuery_site_route_node_Product_variants_edges_node {
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
  defaultImage: ProductPageGetDataQuery_site_route_node_Product_variants_edges_node_defaultImage | null;
  /**
   * The options which define a variant.
   */
  options: ProductPageGetDataQuery_site_route_node_Product_variants_edges_node_options;
}

export interface ProductPageGetDataQuery_site_route_node_Product_variants_edges {
  __typename: "VariantEdge";
  /**
   * The item at the end of the edge.
   */
  node: ProductPageGetDataQuery_site_route_node_Product_variants_edges_node;
}

export interface ProductPageGetDataQuery_site_route_node_Product_variants {
  __typename: "VariantConnection";
  /**
   * A list of edges.
   */
  edges: (ProductPageGetDataQuery_site_route_node_Product_variants_edges | null)[] | null;
}

export interface ProductPageGetDataQuery_site_route_node_Product {
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
   * Default image for a product.
   */
  defaultImage: ProductPageGetDataQuery_site_route_node_Product_defaultImage | null;
  /**
   * Brand associated with the product.
   */
  brand: ProductPageGetDataQuery_site_route_node_Product_brand | null;
  /**
   * Product SEO details.
   */
  seo: ProductPageGetDataQuery_site_route_node_Product_seo;
  /**
   * Product options.
   */
  productOptions: ProductPageGetDataQuery_site_route_node_Product_productOptions;
  /**
   * Id of the product.
   */
  entityId: number;
  /**
   * Description of the product.
   */
  description: string;
  /**
   * Variants associated with the product.
   */
  variants: ProductPageGetDataQuery_site_route_node_Product_variants;
}

export type ProductPageGetDataQuery_site_route_node = ProductPageGetDataQuery_site_route_node_Brand | ProductPageGetDataQuery_site_route_node_Product;

export interface ProductPageGetDataQuery_site_route {
  __typename: "Route";
  /**
   * Node
   */
  node: ProductPageGetDataQuery_site_route_node | null;
}

export interface ProductPageGetDataQuery_site {
  __typename: "Site";
  /**
   * Route for a node
   */
  route: ProductPageGetDataQuery_site_route;
}

export interface ProductPageGetDataQuery {
  /**
   * A site
   */
  site: ProductPageGetDataQuery_site;
}

export interface ProductPageGetDataQueryVariables {
  path: string;
}
