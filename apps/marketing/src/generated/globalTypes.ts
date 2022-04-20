/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export interface PriceSearchFilterInput {
  minPrice?: number | null;
  maxPrice?: number | null;
}

export interface ProductAttributeSearchFilterInput {
  attribute: string;
  values: string[];
}

export interface RatingSearchFilterInput {
  minRating?: number | null;
  maxRating?: number | null;
}

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
