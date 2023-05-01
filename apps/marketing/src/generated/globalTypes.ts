/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum ItemStatus {
  draft = "draft",
  published = "published",
  updated = "updated",
}

export interface ArticleModelFilter {
  _createdAt?: CreatedAtFilter | null;
  createdAt?: CreatedAtFilter | null;
  id?: ItemIdFilter | null;
  _firstPublishedAt?: PublishedAtFilter | null;
  _publicationScheduledAt?: PublishedAtFilter | null;
  _unpublishingScheduledAt?: PublishedAtFilter | null;
  _publishedAt?: PublishedAtFilter | null;
  _status?: StatusFilter | null;
  _updatedAt?: UpdatedAtFilter | null;
  updatedAt?: UpdatedAtFilter | null;
  _isValid?: BooleanFilter | null;
  author?: LinkFilter | null;
  categories?: LinksFilter | null;
  content?: StructuredTextFilter | null;
  image?: FileFilter | null;
  seoMetadata?: SeoFilter | null;
  shortDescription?: TextFilter | null;
  slug?: SlugFilter | null;
  title?: StringFilter | null;
  OR?: (ArticleModelFilter | null)[] | null;
  AND?: (ArticleModelFilter | null)[] | null;
}

/**
 * Specifies how to filter Boolean fields
 */
export interface BooleanFilter {
  eq?: any | null;
}

/**
 * Specifies how to filter by creation datetime
 */
export interface CreatedAtFilter {
  gt?: any | null;
  lt?: any | null;
  gte?: any | null;
  lte?: any | null;
  eq?: any | null;
  neq?: any | null;
  exists?: any | null;
}

/**
 * Specifies how to filter Single-file/image fields
 */
export interface FileFilter {
  eq?: any | null;
  neq?: any | null;
  in?: (any | null)[] | null;
  notIn?: (any | null)[] | null;
  exists?: any | null;
}

/**
 * Specifies how to filter by ID
 */
export interface ItemIdFilter {
  eq?: any | null;
  neq?: any | null;
  in?: (any | null)[] | null;
  notIn?: (any | null)[] | null;
}

/**
 * Specifies how to filter Single-link fields
 */
export interface LinkFilter {
  eq?: any | null;
  neq?: any | null;
  in?: (any | null)[] | null;
  notIn?: (any | null)[] | null;
  exists?: any | null;
}

/**
 * Specifies how to filter Multiple-links fields
 */
export interface LinksFilter {
  eq?: (any | null)[] | null;
  allIn?: (any | null)[] | null;
  anyIn?: (any | null)[] | null;
  notIn?: (any | null)[] | null;
  exists?: any | null;
}

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
 * Specifies how to filter by publication datetime
 */
export interface PublishedAtFilter {
  gt?: any | null;
  lt?: any | null;
  gte?: any | null;
  lte?: any | null;
  eq?: any | null;
  neq?: any | null;
  exists?: any | null;
}

export interface QuoteGeneratePrintLocationInput {
  colorCount: number;
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
 * Specifies how to filter SEO meta tags fields
 */
export interface SeoFilter {
  exists?: any | null;
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

/**
 * Specifies how to filter by status
 */
export interface StatusFilter {
  eq?: ItemStatus | null;
  neq?: ItemStatus | null;
  in?: (ItemStatus | null)[] | null;
  notIn?: (ItemStatus | null)[] | null;
}

/**
 * Specifies how to filter Single-line string fields
 */
export interface StringFilter {
  matches?: StringMatchesFilter | null;
  notMatches?: StringMatchesFilter | null;
  isBlank?: any | null;
  isPresent?: any | null;
  eq?: string | null;
  neq?: string | null;
  in?: (string | null)[] | null;
  notIn?: (string | null)[] | null;
  exists?: any | null;
}

export interface StringMatchesFilter {
  pattern: string;
  caseSensitive?: any | null;
  regexp?: any | null;
}

/**
 * Specifies how to filter Structured Text fields
 */
export interface StructuredTextFilter {
  matches?: StringMatchesFilter | null;
  notMatches?: StringMatchesFilter | null;
  isBlank?: any | null;
  isPresent?: any | null;
  exists?: any | null;
}

/**
 * Specifies how to filter text fields
 */
export interface TextFilter {
  matches?: StringMatchesFilter | null;
  notMatches?: StringMatchesFilter | null;
  isBlank?: any | null;
  isPresent?: any | null;
  exists?: any | null;
}

/**
 * Specifies how to filter by update datetime
 */
export interface UpdatedAtFilter {
  gt?: any | null;
  lt?: any | null;
  gte?: any | null;
  lte?: any | null;
  eq?: any | null;
  neq?: any | null;
  exists?: any | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
