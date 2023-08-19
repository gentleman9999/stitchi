/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CmsLandingPageCatalogSectionGetDataQuery
// ====================================================

export interface CmsLandingPageCatalogSectionGetDataQuery_site_category_products_edges_node_productOptions_edges_node_CheckboxOption {
  __typename: "CheckboxOption" | "DateFieldOption" | "FileUploadFieldOption" | "MultiLineTextFieldOption" | "NumberFieldOption" | "TextFieldOption";
  /**
   * Unique ID for the option.
   */
  entityId: number;
}

export interface CmsLandingPageCatalogSectionGetDataQuery_site_category_products_edges_node_productOptions_edges_node_MultipleChoiceOption_values_edges_node_MultipleChoiceOptionValue {
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

export interface CmsLandingPageCatalogSectionGetDataQuery_site_category_products_edges_node_productOptions_edges_node_MultipleChoiceOption_values_edges_node_SwatchOptionValue {
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

export type CmsLandingPageCatalogSectionGetDataQuery_site_category_products_edges_node_productOptions_edges_node_MultipleChoiceOption_values_edges_node = CmsLandingPageCatalogSectionGetDataQuery_site_category_products_edges_node_productOptions_edges_node_MultipleChoiceOption_values_edges_node_MultipleChoiceOptionValue | CmsLandingPageCatalogSectionGetDataQuery_site_category_products_edges_node_productOptions_edges_node_MultipleChoiceOption_values_edges_node_SwatchOptionValue;

export interface CmsLandingPageCatalogSectionGetDataQuery_site_category_products_edges_node_productOptions_edges_node_MultipleChoiceOption_values_edges {
  __typename: "ProductOptionValueEdge";
  /**
   * The item at the end of the edge.
   */
  node: CmsLandingPageCatalogSectionGetDataQuery_site_category_products_edges_node_productOptions_edges_node_MultipleChoiceOption_values_edges_node;
}

export interface CmsLandingPageCatalogSectionGetDataQuery_site_category_products_edges_node_productOptions_edges_node_MultipleChoiceOption_values {
  __typename: "ProductOptionValueConnection";
  /**
   * A list of edges.
   */
  edges: (CmsLandingPageCatalogSectionGetDataQuery_site_category_products_edges_node_productOptions_edges_node_MultipleChoiceOption_values_edges | null)[] | null;
}

export interface CmsLandingPageCatalogSectionGetDataQuery_site_category_products_edges_node_productOptions_edges_node_MultipleChoiceOption {
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
  values: CmsLandingPageCatalogSectionGetDataQuery_site_category_products_edges_node_productOptions_edges_node_MultipleChoiceOption_values;
}

export type CmsLandingPageCatalogSectionGetDataQuery_site_category_products_edges_node_productOptions_edges_node = CmsLandingPageCatalogSectionGetDataQuery_site_category_products_edges_node_productOptions_edges_node_CheckboxOption | CmsLandingPageCatalogSectionGetDataQuery_site_category_products_edges_node_productOptions_edges_node_MultipleChoiceOption;

export interface CmsLandingPageCatalogSectionGetDataQuery_site_category_products_edges_node_productOptions_edges {
  __typename: "ProductOptionEdge";
  /**
   * The item at the end of the edge.
   */
  node: CmsLandingPageCatalogSectionGetDataQuery_site_category_products_edges_node_productOptions_edges_node;
}

export interface CmsLandingPageCatalogSectionGetDataQuery_site_category_products_edges_node_productOptions {
  __typename: "ProductOptionConnection";
  /**
   * A list of edges.
   */
  edges: (CmsLandingPageCatalogSectionGetDataQuery_site_category_products_edges_node_productOptions_edges | null)[] | null;
}

export interface CmsLandingPageCatalogSectionGetDataQuery_site_category_products_edges_node_brand {
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

export interface CmsLandingPageCatalogSectionGetDataQuery_site_category_products_edges_node_defaultImage {
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

export interface CmsLandingPageCatalogSectionGetDataQuery_site_category_products_edges_node {
  __typename: "Product";
  /**
   * The ID of an object
   */
  id: string;
  /**
   * Product options.
   */
  productOptions: CmsLandingPageCatalogSectionGetDataQuery_site_category_products_edges_node_productOptions;
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
  brand: CmsLandingPageCatalogSectionGetDataQuery_site_category_products_edges_node_brand | null;
  /**
   * Default image for a product.
   */
  defaultImage: CmsLandingPageCatalogSectionGetDataQuery_site_category_products_edges_node_defaultImage | null;
}

export interface CmsLandingPageCatalogSectionGetDataQuery_site_category_products_edges {
  __typename: "ProductEdge";
  /**
   * The item at the end of the edge.
   */
  node: CmsLandingPageCatalogSectionGetDataQuery_site_category_products_edges_node;
}

export interface CmsLandingPageCatalogSectionGetDataQuery_site_category_products {
  __typename: "ProductConnection";
  /**
   * A list of edges.
   */
  edges: (CmsLandingPageCatalogSectionGetDataQuery_site_category_products_edges | null)[] | null;
}

export interface CmsLandingPageCatalogSectionGetDataQuery_site_category {
  __typename: "Category";
  /**
   * The ID of an object
   */
  id: string;
  /**
   * List of products associated with category
   */
  products: CmsLandingPageCatalogSectionGetDataQuery_site_category_products;
}

export interface CmsLandingPageCatalogSectionGetDataQuery_site {
  __typename: "Site";
  /**
   * Retrieve a category object by the id.
   */
  category: CmsLandingPageCatalogSectionGetDataQuery_site_category | null;
}

export interface CmsLandingPageCatalogSectionGetDataQuery {
  /**
   * A site
   */
  site: CmsLandingPageCatalogSectionGetDataQuery_site;
}

export interface CmsLandingPageCatalogSectionGetDataQueryVariables {
  categoryId: number;
}
