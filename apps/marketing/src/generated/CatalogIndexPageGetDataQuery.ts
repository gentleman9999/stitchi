/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SearchProductsFiltersInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: CatalogIndexPageGetDataQuery
// ====================================================

export interface CatalogIndexPageGetDataQuery_site_search_searchProducts_products_edges_node_productOptions_edges_node_CheckboxOption {
  __typename: "CheckboxOption" | "DateFieldOption" | "FileUploadFieldOption" | "MultiLineTextFieldOption" | "NumberFieldOption" | "TextFieldOption";
}

export interface CatalogIndexPageGetDataQuery_site_search_searchProducts_products_edges_node_productOptions_edges_node_MultipleChoiceOption_values_edges_node_MultipleChoiceOptionValue {
  __typename: "MultipleChoiceOptionValue" | "ProductPickListOptionValue";
  /**
   * Unique ID for the option value.
   */
  entityId: number;
}

export interface CatalogIndexPageGetDataQuery_site_search_searchProducts_products_edges_node_productOptions_edges_node_MultipleChoiceOption_values_edges_node_SwatchOptionValue {
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

export type CatalogIndexPageGetDataQuery_site_search_searchProducts_products_edges_node_productOptions_edges_node_MultipleChoiceOption_values_edges_node = CatalogIndexPageGetDataQuery_site_search_searchProducts_products_edges_node_productOptions_edges_node_MultipleChoiceOption_values_edges_node_MultipleChoiceOptionValue | CatalogIndexPageGetDataQuery_site_search_searchProducts_products_edges_node_productOptions_edges_node_MultipleChoiceOption_values_edges_node_SwatchOptionValue;

export interface CatalogIndexPageGetDataQuery_site_search_searchProducts_products_edges_node_productOptions_edges_node_MultipleChoiceOption_values_edges {
  __typename: "ProductOptionValueEdge";
  /**
   * The item at the end of the edge.
   */
  node: CatalogIndexPageGetDataQuery_site_search_searchProducts_products_edges_node_productOptions_edges_node_MultipleChoiceOption_values_edges_node;
}

export interface CatalogIndexPageGetDataQuery_site_search_searchProducts_products_edges_node_productOptions_edges_node_MultipleChoiceOption_values {
  __typename: "ProductOptionValueConnection";
  /**
   * A list of edges.
   */
  edges: (CatalogIndexPageGetDataQuery_site_search_searchProducts_products_edges_node_productOptions_edges_node_MultipleChoiceOption_values_edges | null)[] | null;
}

export interface CatalogIndexPageGetDataQuery_site_search_searchProducts_products_edges_node_productOptions_edges_node_MultipleChoiceOption {
  __typename: "MultipleChoiceOption";
  /**
   * Display name for the option.
   */
  displayName: string;
  /**
   * List of option values.
   */
  values: CatalogIndexPageGetDataQuery_site_search_searchProducts_products_edges_node_productOptions_edges_node_MultipleChoiceOption_values;
}

export type CatalogIndexPageGetDataQuery_site_search_searchProducts_products_edges_node_productOptions_edges_node = CatalogIndexPageGetDataQuery_site_search_searchProducts_products_edges_node_productOptions_edges_node_CheckboxOption | CatalogIndexPageGetDataQuery_site_search_searchProducts_products_edges_node_productOptions_edges_node_MultipleChoiceOption;

export interface CatalogIndexPageGetDataQuery_site_search_searchProducts_products_edges_node_productOptions_edges {
  __typename: "ProductOptionEdge";
  /**
   * The item at the end of the edge.
   */
  node: CatalogIndexPageGetDataQuery_site_search_searchProducts_products_edges_node_productOptions_edges_node;
}

export interface CatalogIndexPageGetDataQuery_site_search_searchProducts_products_edges_node_productOptions {
  __typename: "ProductOptionConnection";
  /**
   * A list of edges.
   */
  edges: (CatalogIndexPageGetDataQuery_site_search_searchProducts_products_edges_node_productOptions_edges | null)[] | null;
}

export interface CatalogIndexPageGetDataQuery_site_search_searchProducts_products_edges_node_brand {
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

export interface CatalogIndexPageGetDataQuery_site_search_searchProducts_products_edges_node_defaultImage {
  __typename: "Image";
  /**
   * Absolute path to image using store CDN.
   */
  url: string;
}

export interface CatalogIndexPageGetDataQuery_site_search_searchProducts_products_edges_node {
  __typename: "Product";
  /**
   * The ID of an object
   */
  id: string;
  /**
   * Product options.
   */
  productOptions: CatalogIndexPageGetDataQuery_site_search_searchProducts_products_edges_node_productOptions;
  /**
   * Name of the product.
   */
  name: string;
  /**
   * Brand associated with the product.
   */
  brand: CatalogIndexPageGetDataQuery_site_search_searchProducts_products_edges_node_brand | null;
  /**
   * Default image for a product.
   */
  defaultImage: CatalogIndexPageGetDataQuery_site_search_searchProducts_products_edges_node_defaultImage | null;
}

export interface CatalogIndexPageGetDataQuery_site_search_searchProducts_products_edges {
  __typename: "ProductEdge";
  /**
   * The item at the end of the edge.
   */
  node: CatalogIndexPageGetDataQuery_site_search_searchProducts_products_edges_node;
}

export interface CatalogIndexPageGetDataQuery_site_search_searchProducts_products_pageInfo {
  __typename: "PageInfo";
  /**
   * When paginating forwards, are there more items?
   */
  hasNextPage: boolean;
  /**
   * When paginating forwards, the cursor to continue.
   */
  endCursor: string | null;
}

export interface CatalogIndexPageGetDataQuery_site_search_searchProducts_products {
  __typename: "ProductConnection";
  /**
   * A list of edges.
   */
  edges: (CatalogIndexPageGetDataQuery_site_search_searchProducts_products_edges | null)[] | null;
  /**
   * Information to aid in pagination.
   */
  pageInfo: CatalogIndexPageGetDataQuery_site_search_searchProducts_products_pageInfo;
}

export interface CatalogIndexPageGetDataQuery_site_search_searchProducts {
  __typename: "SearchProducts";
  /**
   * Details of the products.
   */
  products: CatalogIndexPageGetDataQuery_site_search_searchProducts_products;
}

export interface CatalogIndexPageGetDataQuery_site_search {
  __typename: "SearchQueries";
  /**
   * Details of the products and facets matching given search criteria.
   */
  searchProducts: CatalogIndexPageGetDataQuery_site_search_searchProducts;
}

export interface CatalogIndexPageGetDataQuery_site {
  __typename: "Site";
  /**
   * The Search queries.
   */
  search: CatalogIndexPageGetDataQuery_site_search;
}

export interface CatalogIndexPageGetDataQuery {
  site: CatalogIndexPageGetDataQuery_site;
}

export interface CatalogIndexPageGetDataQueryVariables {
  filters: SearchProductsFiltersInput;
  first: number;
  after?: string | null;
}
