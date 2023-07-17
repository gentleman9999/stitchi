/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ClosetDesignBuyPageGetDataQuery
// ====================================================

export interface ClosetDesignBuyPageGetDataQuery_site_route_node_Banner {
  __typename:
    | 'Banner'
    | 'Blog'
    | 'BlogPost'
    | 'Brand'
    | 'Cart'
    | 'Category'
    | 'Checkout'
    | 'ContactPage'
    | 'NormalPage'
    | 'RawHtmlPage'
    | 'Variant'
  /**
   * The id of the object.
   */
  id: string
}

export interface ClosetDesignBuyPageGetDataQuery_site_route_node_Product_brand {
  __typename: 'Brand'
  /**
   * The ID of an object
   */
  id: string
  /**
   * Name of the brand.
   */
  name: string
}

export interface ClosetDesignBuyPageGetDataQuery_site_route_node_Product_productOptions_edges_node_CheckboxOption {
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
  /**
   * Display name for the option.
   */
  displayName: string
}

export interface ClosetDesignBuyPageGetDataQuery_site_route_node_Product_productOptions_edges_node_MultipleChoiceOption_values_edges_node_MultipleChoiceOptionValue {
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

export interface ClosetDesignBuyPageGetDataQuery_site_route_node_Product_productOptions_edges_node_MultipleChoiceOption_values_edges_node_SwatchOptionValue {
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

export type ClosetDesignBuyPageGetDataQuery_site_route_node_Product_productOptions_edges_node_MultipleChoiceOption_values_edges_node =

    | ClosetDesignBuyPageGetDataQuery_site_route_node_Product_productOptions_edges_node_MultipleChoiceOption_values_edges_node_MultipleChoiceOptionValue
    | ClosetDesignBuyPageGetDataQuery_site_route_node_Product_productOptions_edges_node_MultipleChoiceOption_values_edges_node_SwatchOptionValue

export interface ClosetDesignBuyPageGetDataQuery_site_route_node_Product_productOptions_edges_node_MultipleChoiceOption_values_edges {
  __typename: 'ProductOptionValueEdge'
  /**
   * The item at the end of the edge.
   */
  node: ClosetDesignBuyPageGetDataQuery_site_route_node_Product_productOptions_edges_node_MultipleChoiceOption_values_edges_node
}

export interface ClosetDesignBuyPageGetDataQuery_site_route_node_Product_productOptions_edges_node_MultipleChoiceOption_values {
  __typename: 'ProductOptionValueConnection'
  /**
   * A list of edges.
   */
  edges:
    | (ClosetDesignBuyPageGetDataQuery_site_route_node_Product_productOptions_edges_node_MultipleChoiceOption_values_edges | null)[]
    | null
}

export interface ClosetDesignBuyPageGetDataQuery_site_route_node_Product_productOptions_edges_node_MultipleChoiceOption {
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
  values: ClosetDesignBuyPageGetDataQuery_site_route_node_Product_productOptions_edges_node_MultipleChoiceOption_values
}

export type ClosetDesignBuyPageGetDataQuery_site_route_node_Product_productOptions_edges_node =

    | ClosetDesignBuyPageGetDataQuery_site_route_node_Product_productOptions_edges_node_CheckboxOption
    | ClosetDesignBuyPageGetDataQuery_site_route_node_Product_productOptions_edges_node_MultipleChoiceOption

export interface ClosetDesignBuyPageGetDataQuery_site_route_node_Product_productOptions_edges {
  __typename: 'ProductOptionEdge'
  /**
   * The item at the end of the edge.
   */
  node: ClosetDesignBuyPageGetDataQuery_site_route_node_Product_productOptions_edges_node
}

export interface ClosetDesignBuyPageGetDataQuery_site_route_node_Product_productOptions {
  __typename: 'ProductOptionConnection'
  /**
   * A list of edges.
   */
  edges:
    | (ClosetDesignBuyPageGetDataQuery_site_route_node_Product_productOptions_edges | null)[]
    | null
}

export interface ClosetDesignBuyPageGetDataQuery_site_route_node_Product_defaultImage {
  __typename: 'Image'
  /**
   * Absolute path to image using store CDN.
   */
  url: string
  /**
   * Text description of an image that can be used for SEO and/or accessibility purposes.
   */
  altText: string
}

export interface ClosetDesignBuyPageGetDataQuery_site_route_node_Product_variants_edges_node_defaultImage {
  __typename: 'Image'
  /**
   * Absolute path to image using store CDN.
   */
  url: string
  /**
   * Text description of an image that can be used for SEO and/or accessibility purposes.
   */
  altText: string
}

export interface ClosetDesignBuyPageGetDataQuery_site_route_node_Product_variants_edges_node_options_edges_node_values_edges_node {
  __typename: 'ProductOptionValue'
  /**
   * Unique ID for the option value.
   */
  entityId: number
}

export interface ClosetDesignBuyPageGetDataQuery_site_route_node_Product_variants_edges_node_options_edges_node_values_edges {
  __typename: 'OptionValueEdge'
  /**
   * The item at the end of the edge.
   */
  node: ClosetDesignBuyPageGetDataQuery_site_route_node_Product_variants_edges_node_options_edges_node_values_edges_node
}

export interface ClosetDesignBuyPageGetDataQuery_site_route_node_Product_variants_edges_node_options_edges_node_values {
  __typename: 'OptionValueConnection'
  /**
   * A list of edges.
   */
  edges:
    | (ClosetDesignBuyPageGetDataQuery_site_route_node_Product_variants_edges_node_options_edges_node_values_edges | null)[]
    | null
}

export interface ClosetDesignBuyPageGetDataQuery_site_route_node_Product_variants_edges_node_options_edges_node {
  __typename: 'ProductOption'
  /**
   * Option values.
   */
  values: ClosetDesignBuyPageGetDataQuery_site_route_node_Product_variants_edges_node_options_edges_node_values
}

export interface ClosetDesignBuyPageGetDataQuery_site_route_node_Product_variants_edges_node_options_edges {
  __typename: 'OptionEdge'
  /**
   * The item at the end of the edge.
   */
  node: ClosetDesignBuyPageGetDataQuery_site_route_node_Product_variants_edges_node_options_edges_node
}

export interface ClosetDesignBuyPageGetDataQuery_site_route_node_Product_variants_edges_node_options {
  __typename: 'OptionConnection'
  /**
   * A list of edges.
   */
  edges:
    | (ClosetDesignBuyPageGetDataQuery_site_route_node_Product_variants_edges_node_options_edges | null)[]
    | null
}

export interface ClosetDesignBuyPageGetDataQuery_site_route_node_Product_variants_edges_node {
  __typename: 'Variant'
  /**
   * The ID of an object
   */
  id: string
  /**
   * Id of the variant.
   */
  entityId: number
  /**
   * Default image for a variant.
   */
  defaultImage: ClosetDesignBuyPageGetDataQuery_site_route_node_Product_variants_edges_node_defaultImage | null
  /**
   * The options which define a variant.
   */
  options: ClosetDesignBuyPageGetDataQuery_site_route_node_Product_variants_edges_node_options
}

export interface ClosetDesignBuyPageGetDataQuery_site_route_node_Product_variants_edges {
  __typename: 'VariantEdge'
  /**
   * The item at the end of the edge.
   */
  node: ClosetDesignBuyPageGetDataQuery_site_route_node_Product_variants_edges_node
}

export interface ClosetDesignBuyPageGetDataQuery_site_route_node_Product_variants {
  __typename: 'VariantConnection'
  /**
   * A list of edges.
   */
  edges:
    | (ClosetDesignBuyPageGetDataQuery_site_route_node_Product_variants_edges | null)[]
    | null
}

export interface ClosetDesignBuyPageGetDataQuery_site_route_node_Product {
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
   * Name of the product.
   */
  name: string
  /**
   * Brand associated with the product.
   */
  brand: ClosetDesignBuyPageGetDataQuery_site_route_node_Product_brand | null
  /**
   * Product options.
   */
  productOptions: ClosetDesignBuyPageGetDataQuery_site_route_node_Product_productOptions
  /**
   * Default image for a product.
   */
  defaultImage: ClosetDesignBuyPageGetDataQuery_site_route_node_Product_defaultImage | null
  /**
   * Variants associated with the product.
   */
  variants: ClosetDesignBuyPageGetDataQuery_site_route_node_Product_variants
}

export type ClosetDesignBuyPageGetDataQuery_site_route_node =
  | ClosetDesignBuyPageGetDataQuery_site_route_node_Banner
  | ClosetDesignBuyPageGetDataQuery_site_route_node_Product

export interface ClosetDesignBuyPageGetDataQuery_site_route {
  __typename: 'Route'
  /**
   * Node
   */
  node: ClosetDesignBuyPageGetDataQuery_site_route_node | null
}

export interface ClosetDesignBuyPageGetDataQuery_site {
  __typename: 'Site'
  /**
   * Route for a node
   */
  route: ClosetDesignBuyPageGetDataQuery_site_route
}

export interface ClosetDesignBuyPageGetDataQuery {
  /**
   * A site
   */
  site: ClosetDesignBuyPageGetDataQuery_site
}

export interface ClosetDesignBuyPageGetDataQueryVariables {
  path: string
  variantsFirst?: number | null
}
