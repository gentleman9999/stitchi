/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: CatalogIndexPageProductGridSiteFragment
// ====================================================

export interface CatalogIndexPageProductGridSiteFragment_search_searchProducts_products_edges_node_productOptions_edges_node_CheckboxOption {
  __typename: "CheckboxOption" | "DateFieldOption" | "FileUploadFieldOption" | "MultiLineTextFieldOption" | "NumberFieldOption" | "TextFieldOption";
}

export interface CatalogIndexPageProductGridSiteFragment_search_searchProducts_products_edges_node_productOptions_edges_node_MultipleChoiceOption_values_edges_node_MultipleChoiceOptionValue {
  __typename: "MultipleChoiceOptionValue" | "ProductPickListOptionValue";
  /**
   * Unique ID for the option value.
   */
  entityId: number;
}

export interface CatalogIndexPageProductGridSiteFragment_search_searchProducts_products_edges_node_productOptions_edges_node_MultipleChoiceOption_values_edges_node_SwatchOptionValue {
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

export type CatalogIndexPageProductGridSiteFragment_search_searchProducts_products_edges_node_productOptions_edges_node_MultipleChoiceOption_values_edges_node = CatalogIndexPageProductGridSiteFragment_search_searchProducts_products_edges_node_productOptions_edges_node_MultipleChoiceOption_values_edges_node_MultipleChoiceOptionValue | CatalogIndexPageProductGridSiteFragment_search_searchProducts_products_edges_node_productOptions_edges_node_MultipleChoiceOption_values_edges_node_SwatchOptionValue;

export interface CatalogIndexPageProductGridSiteFragment_search_searchProducts_products_edges_node_productOptions_edges_node_MultipleChoiceOption_values_edges {
  __typename: "ProductOptionValueEdge";
  /**
   * The item at the end of the edge.
   */
  node: CatalogIndexPageProductGridSiteFragment_search_searchProducts_products_edges_node_productOptions_edges_node_MultipleChoiceOption_values_edges_node;
}

export interface CatalogIndexPageProductGridSiteFragment_search_searchProducts_products_edges_node_productOptions_edges_node_MultipleChoiceOption_values {
  __typename: "ProductOptionValueConnection";
  /**
   * A list of edges.
   */
  edges: (CatalogIndexPageProductGridSiteFragment_search_searchProducts_products_edges_node_productOptions_edges_node_MultipleChoiceOption_values_edges | null)[] | null;
}

export interface CatalogIndexPageProductGridSiteFragment_search_searchProducts_products_edges_node_productOptions_edges_node_MultipleChoiceOption {
  __typename: "MultipleChoiceOption";
  /**
   * Display name for the option.
   */
  displayName: string;
  /**
   * List of option values.
   */
  values: CatalogIndexPageProductGridSiteFragment_search_searchProducts_products_edges_node_productOptions_edges_node_MultipleChoiceOption_values;
}

export type CatalogIndexPageProductGridSiteFragment_search_searchProducts_products_edges_node_productOptions_edges_node = CatalogIndexPageProductGridSiteFragment_search_searchProducts_products_edges_node_productOptions_edges_node_CheckboxOption | CatalogIndexPageProductGridSiteFragment_search_searchProducts_products_edges_node_productOptions_edges_node_MultipleChoiceOption;

export interface CatalogIndexPageProductGridSiteFragment_search_searchProducts_products_edges_node_productOptions_edges {
  __typename: "ProductOptionEdge";
  /**
   * The item at the end of the edge.
   */
  node: CatalogIndexPageProductGridSiteFragment_search_searchProducts_products_edges_node_productOptions_edges_node;
}

export interface CatalogIndexPageProductGridSiteFragment_search_searchProducts_products_edges_node_productOptions {
  __typename: "ProductOptionConnection";
  /**
   * A list of edges.
   */
  edges: (CatalogIndexPageProductGridSiteFragment_search_searchProducts_products_edges_node_productOptions_edges | null)[] | null;
}

export interface CatalogIndexPageProductGridSiteFragment_search_searchProducts_products_edges_node_brand {
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

export interface CatalogIndexPageProductGridSiteFragment_search_searchProducts_products_edges_node_defaultImage {
  __typename: "Image";
  /**
   * Absolute path to image using store CDN.
   */
  url: string;
}

export interface CatalogIndexPageProductGridSiteFragment_search_searchProducts_products_edges_node {
  __typename: "Product";
  /**
   * The ID of an object
   */
  id: string;
  /**
   * Product options.
   */
  productOptions: CatalogIndexPageProductGridSiteFragment_search_searchProducts_products_edges_node_productOptions;
  /**
   * Name of the product.
   */
  name: string;
  /**
   * Brand associated with the product.
   */
  brand: CatalogIndexPageProductGridSiteFragment_search_searchProducts_products_edges_node_brand | null;
  /**
   * Default image for a product.
   */
  defaultImage: CatalogIndexPageProductGridSiteFragment_search_searchProducts_products_edges_node_defaultImage | null;
}

export interface CatalogIndexPageProductGridSiteFragment_search_searchProducts_products_edges {
  __typename: "ProductEdge";
  /**
   * The item at the end of the edge.
   */
  node: CatalogIndexPageProductGridSiteFragment_search_searchProducts_products_edges_node;
}

export interface CatalogIndexPageProductGridSiteFragment_search_searchProducts_products_pageInfo {
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

export interface CatalogIndexPageProductGridSiteFragment_search_searchProducts_products {
  __typename: "ProductConnection";
  /**
   * A list of edges.
   */
  edges: (CatalogIndexPageProductGridSiteFragment_search_searchProducts_products_edges | null)[] | null;
  /**
   * Information to aid in pagination.
   */
  pageInfo: CatalogIndexPageProductGridSiteFragment_search_searchProducts_products_pageInfo;
}

export interface CatalogIndexPageProductGridSiteFragment_search_searchProducts {
  __typename: "SearchProducts";
  /**
   * Details of the products.
   */
  products: CatalogIndexPageProductGridSiteFragment_search_searchProducts_products;
}

export interface CatalogIndexPageProductGridSiteFragment_search {
  __typename: "SearchQueries";
  /**
   * Details of the products and facets matching given search criteria.
   */
  searchProducts: CatalogIndexPageProductGridSiteFragment_search_searchProducts;
}

export interface CatalogIndexPageProductGridSiteFragment {
  __typename: "Site";
  /**
   * The Search queries.
   */
  search: CatalogIndexPageProductGridSiteFragment_search;
}
