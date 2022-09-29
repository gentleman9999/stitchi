/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SearchProductsFiltersInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: UseFilterPreviewGetDataQuery
// ====================================================

export interface UseFilterPreviewGetDataQuery_site_search_searchProducts_products_edges_node {
  __typename: "Product";
  /**
   * The ID of an object
   */
  id: string;
}

export interface UseFilterPreviewGetDataQuery_site_search_searchProducts_products_edges {
  __typename: "ProductEdge";
  /**
   * The item at the end of the edge.
   */
  node: UseFilterPreviewGetDataQuery_site_search_searchProducts_products_edges_node;
}

export interface UseFilterPreviewGetDataQuery_site_search_searchProducts_products_pageInfo {
  __typename: "PageInfo";
  /**
   * When paginating forwards, are there more items?
   */
  hasNextPage: boolean;
}

export interface UseFilterPreviewGetDataQuery_site_search_searchProducts_products {
  __typename: "ProductConnection";
  /**
   * A list of edges.
   */
  edges: (UseFilterPreviewGetDataQuery_site_search_searchProducts_products_edges | null)[] | null;
  /**
   * Information to aid in pagination.
   */
  pageInfo: UseFilterPreviewGetDataQuery_site_search_searchProducts_products_pageInfo;
}

export interface UseFilterPreviewGetDataQuery_site_search_searchProducts {
  __typename: "SearchProducts";
  /**
   * Details of the products.
   */
  products: UseFilterPreviewGetDataQuery_site_search_searchProducts_products;
}

export interface UseFilterPreviewGetDataQuery_site_search {
  __typename: "SearchQueries";
  /**
   * Details of the products and facets matching given search criteria.
   */
  searchProducts: UseFilterPreviewGetDataQuery_site_search_searchProducts;
}

export interface UseFilterPreviewGetDataQuery_site {
  __typename: "Site";
  /**
   * The Search queries.
   */
  search: UseFilterPreviewGetDataQuery_site_search;
}

export interface UseFilterPreviewGetDataQuery {
  /**
   * A site
   */
  site: UseFilterPreviewGetDataQuery_site;
}

export interface UseFilterPreviewGetDataQueryVariables {
  filters: SearchProductsFiltersInput;
}
