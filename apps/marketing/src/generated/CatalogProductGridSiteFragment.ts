/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: CatalogProductGridSiteFragment
// ====================================================

export interface CatalogProductGridSiteFragment_search_searchProducts_products_edges_node_productOptions_edges_node_CheckboxOption {
  __typename: "CheckboxOption" | "DateFieldOption" | "FileUploadFieldOption" | "MultiLineTextFieldOption" | "NumberFieldOption" | "TextFieldOption";
}

export interface CatalogProductGridSiteFragment_search_searchProducts_products_edges_node_productOptions_edges_node_MultipleChoiceOption_values_edges_node_MultipleChoiceOptionValue {
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

export interface CatalogProductGridSiteFragment_search_searchProducts_products_edges_node_productOptions_edges_node_MultipleChoiceOption_values_edges_node_SwatchOptionValue {
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

export type CatalogProductGridSiteFragment_search_searchProducts_products_edges_node_productOptions_edges_node_MultipleChoiceOption_values_edges_node = CatalogProductGridSiteFragment_search_searchProducts_products_edges_node_productOptions_edges_node_MultipleChoiceOption_values_edges_node_MultipleChoiceOptionValue | CatalogProductGridSiteFragment_search_searchProducts_products_edges_node_productOptions_edges_node_MultipleChoiceOption_values_edges_node_SwatchOptionValue;

export interface CatalogProductGridSiteFragment_search_searchProducts_products_edges_node_productOptions_edges_node_MultipleChoiceOption_values_edges {
  __typename: "ProductOptionValueEdge";
  /**
   * The item at the end of the edge.
   */
  node: CatalogProductGridSiteFragment_search_searchProducts_products_edges_node_productOptions_edges_node_MultipleChoiceOption_values_edges_node;
}

export interface CatalogProductGridSiteFragment_search_searchProducts_products_edges_node_productOptions_edges_node_MultipleChoiceOption_values {
  __typename: "ProductOptionValueConnection";
  /**
   * A list of edges.
   */
  edges: (CatalogProductGridSiteFragment_search_searchProducts_products_edges_node_productOptions_edges_node_MultipleChoiceOption_values_edges | null)[] | null;
}

export interface CatalogProductGridSiteFragment_search_searchProducts_products_edges_node_productOptions_edges_node_MultipleChoiceOption {
  __typename: "MultipleChoiceOption";
  /**
   * Display name for the option.
   */
  displayName: string;
  /**
   * List of option values.
   */
  values: CatalogProductGridSiteFragment_search_searchProducts_products_edges_node_productOptions_edges_node_MultipleChoiceOption_values;
}

export type CatalogProductGridSiteFragment_search_searchProducts_products_edges_node_productOptions_edges_node = CatalogProductGridSiteFragment_search_searchProducts_products_edges_node_productOptions_edges_node_CheckboxOption | CatalogProductGridSiteFragment_search_searchProducts_products_edges_node_productOptions_edges_node_MultipleChoiceOption;

export interface CatalogProductGridSiteFragment_search_searchProducts_products_edges_node_productOptions_edges {
  __typename: "ProductOptionEdge";
  /**
   * The item at the end of the edge.
   */
  node: CatalogProductGridSiteFragment_search_searchProducts_products_edges_node_productOptions_edges_node;
}

export interface CatalogProductGridSiteFragment_search_searchProducts_products_edges_node_productOptions {
  __typename: "ProductOptionConnection";
  /**
   * A list of edges.
   */
  edges: (CatalogProductGridSiteFragment_search_searchProducts_products_edges_node_productOptions_edges | null)[] | null;
}

export interface CatalogProductGridSiteFragment_search_searchProducts_products_edges_node_brand {
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

export interface CatalogProductGridSiteFragment_search_searchProducts_products_edges_node_defaultImage {
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

export interface CatalogProductGridSiteFragment_search_searchProducts_products_edges_node {
  __typename: "Product";
  /**
   * The ID of an object
   */
  id: string;
  /**
   * Id of the product.
   */
  entityId: number;
  /**
   * Product options.
   */
  productOptions: CatalogProductGridSiteFragment_search_searchProducts_products_edges_node_productOptions;
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
  brand: CatalogProductGridSiteFragment_search_searchProducts_products_edges_node_brand | null;
  /**
   * Default image for a product.
   */
  defaultImage: CatalogProductGridSiteFragment_search_searchProducts_products_edges_node_defaultImage | null;
}

export interface CatalogProductGridSiteFragment_search_searchProducts_products_edges {
  __typename: "ProductEdge";
  /**
   * The item at the end of the edge.
   */
  node: CatalogProductGridSiteFragment_search_searchProducts_products_edges_node;
}

export interface CatalogProductGridSiteFragment_search_searchProducts_products_pageInfo {
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

export interface CatalogProductGridSiteFragment_search_searchProducts_products {
  __typename: "ProductConnection";
  /**
   * A list of edges.
   */
  edges: (CatalogProductGridSiteFragment_search_searchProducts_products_edges | null)[] | null;
  /**
   * Information to aid in pagination.
   */
  pageInfo: CatalogProductGridSiteFragment_search_searchProducts_products_pageInfo;
}

export interface CatalogProductGridSiteFragment_search_searchProducts {
  __typename: "SearchProducts";
  /**
   * Details of the products.
   */
  products: CatalogProductGridSiteFragment_search_searchProducts_products;
}

export interface CatalogProductGridSiteFragment_search {
  __typename: "SearchQueries";
  /**
   * Details of the products and facets matching given search criteria.
   */
  searchProducts: CatalogProductGridSiteFragment_search_searchProducts;
}

export interface CatalogProductGridSiteFragment {
  __typename: "Site";
  /**
   * The Search queries.
   */
  search: CatalogProductGridSiteFragment_search;
}
