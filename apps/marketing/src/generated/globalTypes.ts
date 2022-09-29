/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

/**
 * Search by price range. At least a minPrice or maxPrice must be supplied.
 */
export interface PriceSearchFilterInput {
  minPrice?: number | null;
  maxPrice?: number | null;
}

/**
 * Filter by the attributes of products such as Product Options and Product Custom Fields. This filter will do nothing unless your store has the Product Filtering feature available on your plan and enabled. If it is supplied when your store does not have the feature enabled, it will be silently ignored.
 */
export interface ProductAttributeSearchFilterInput {
  attribute: string;
  values: string[];
}

/**
 * Filter by rating. At least a minRating or maxRating must be supplied. This filter will do nothing unless your store has the Product Filtering feature available on your plan and enabled. If it is supplied when your store does not have the feature enabled, it will be silently ignored.
 */
export interface RatingSearchFilterInput {
  minRating?: number | null;
  maxRating?: number | null;
}

/**
 * Object containing available search filters for use when querying Products.
 */
export interface SearchProductsFiltersInput {
  searchTerm?: string | null;
  price?: PriceSearchFilterInput | null;
  rating?: RatingSearchFilterInput | null;
  categoryEntityId?: number | null;
  categoryEntityIds?: number[] | null;
  searchSubCategories?: boolean | null;
  brandEntityIds?: number[] | null;
  productAttributes?: ProductAttributeSearchFilterInput[] | null;
  isFreeShipping?: boolean | null;
  isFeatured?: boolean | null;
  hideOutOfStock?: boolean | null;
}

/**
 * Specifies how to filter Slug fields
 */
export interface SlugFilter {
  eq?: string | null;
  neq?: string | null;
  in?: (string | null)[] | null;
  notIn?: (string | null)[] | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
