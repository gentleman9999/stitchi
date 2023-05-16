/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SearchProductsFiltersInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: UseFilterPreviewGetDataQuery
// ====================================================

export interface UseFilterPreviewGetDataQuery_site_search_searchProducts_products_collectionInfo {
  __typename: "CollectionInfo";
  /**
   * Total items in the collection despite pagination.
   */
  totalItems: any | null;
}

export interface UseFilterPreviewGetDataQuery_site_search_searchProducts_products {
  __typename: "ProductConnection";
  /**
   * Collection info
   */
  collectionInfo: UseFilterPreviewGetDataQuery_site_search_searchProducts_products_collectionInfo | null;
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
