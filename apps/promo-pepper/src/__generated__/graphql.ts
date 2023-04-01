/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `BigDecimal` scalar type represents signed fractional values with arbitrary precision. */
  BigDecimal: any;
  /** Represents `true` or `false` values. */
  BooleanType: any;
  CustomData: any;
  /** ISO-8601 formatted date in UTC */
  DateTime: string;
  /** Represents signed double-precision fractional values as specified by [IEEE 754](http://en.wikipedia.org/wiki/IEEE_floating_point). */
  FloatType: any;
  /** Represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1. */
  IntType: any;
  ItemId: any;
  JsonField: any;
  /** The `Long` scalar type represents non-fractional signed whole numeric values. Long can represent values between -(2^63) and 2^63 - 1. */
  Long: any;
  MetaTagAttributes: any;
  UploadId: any;
};

/** Add wishlist items input object */
export type AddWishlistItemsInput = {
  /** The wishlist id */
  entityId: Scalars['Int'];
  /** The new wishlist items */
  items: Array<WishlistItemInput>;
};

/** Add wishlist items */
export type AddWishlistItemsResult = {
  __typename: 'AddWishlistItemsResult';
  /** The wishlist */
  result: Wishlist;
};

/** Aggregated */
export type Aggregated = {
  __typename: 'Aggregated';
  /** Number of available products in stock. This can be 'null' if inventory is not set orif the store's Inventory Settings disable displaying stock levels on the storefront. */
  availableToSell: Scalars['Long'];
  /** Indicates a threshold low-stock level.  This can be 'null' if the inventory warning level is not set or if the store's Inventory Settings disable displaying stock levels on the storefront. */
  warningLevel: Scalars['Int'];
};

/** Aggregated Product Inventory */
export type AggregatedInventory = {
  __typename: 'AggregatedInventory';
  /** Number of available products in stock. This can be 'null' if inventory is not set orif the store's Inventory Settings disable displaying stock levels on the storefront. */
  availableToSell: Scalars['Int'];
  /** Indicates a threshold low-stock level. This can be 'null' if the inventory warning level is not set or if the store's Inventory Settings disable displaying stock levels on the storefront. */
  warningLevel: Scalars['Int'];
};

export type AllNewsletterIssuesFilter = {
  first: Scalars['Int'];
  skip?: InputMaybe<Scalars['Int']>;
};

export type ArticleModelContentField = {
  __typename: 'ArticleModelContentField';
  blocks: Array<ImageRecord>;
  links: Array<ArticleModelContentLinksField>;
  value: Scalars['JsonField'];
};

export type ArticleModelContentLinksField = ArticleRecord | GlossaryEntryRecord;

/** Linking fields */
export enum ArticleModelFieldsReferencingGlossaryEntryModel {
  ARTICLE_CONTENT = 'article_content'
}

export type ArticleModelFilter = {
  OR?: InputMaybe<Array<InputMaybe<ArticleModelFilter>>>;
  _createdAt?: InputMaybe<CreatedAtFilter>;
  _firstPublishedAt?: InputMaybe<PublishedAtFilter>;
  _isValid?: InputMaybe<BooleanFilter>;
  _publicationScheduledAt?: InputMaybe<PublishedAtFilter>;
  _publishedAt?: InputMaybe<PublishedAtFilter>;
  _status?: InputMaybe<StatusFilter>;
  _unpublishingScheduledAt?: InputMaybe<PublishedAtFilter>;
  _updatedAt?: InputMaybe<UpdatedAtFilter>;
  author?: InputMaybe<LinkFilter>;
  categories?: InputMaybe<LinksFilter>;
  content?: InputMaybe<StructuredTextFilter>;
  createdAt?: InputMaybe<CreatedAtFilter>;
  id?: InputMaybe<ItemIdFilter>;
  image?: InputMaybe<FileFilter>;
  seoMetadata?: InputMaybe<SeoFilter>;
  shortDescription?: InputMaybe<TextFilter>;
  slug?: InputMaybe<SlugFilter>;
  title?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<UpdatedAtFilter>;
};

export enum ArticleModelOrderBy {
  _CREATEDAT_ASC = '_createdAt_ASC',
  _CREATEDAT_DESC = '_createdAt_DESC',
  _FIRSTPUBLISHEDAT_ASC = '_firstPublishedAt_ASC',
  _FIRSTPUBLISHEDAT_DESC = '_firstPublishedAt_DESC',
  _ISVALID_ASC = '_isValid_ASC',
  _ISVALID_DESC = '_isValid_DESC',
  _PUBLICATIONSCHEDULEDAT_ASC = '_publicationScheduledAt_ASC',
  _PUBLICATIONSCHEDULEDAT_DESC = '_publicationScheduledAt_DESC',
  _PUBLISHEDAT_ASC = '_publishedAt_ASC',
  _PUBLISHEDAT_DESC = '_publishedAt_DESC',
  _STATUS_ASC = '_status_ASC',
  _STATUS_DESC = '_status_DESC',
  _UNPUBLISHINGSCHEDULEDAT_ASC = '_unpublishingScheduledAt_ASC',
  _UNPUBLISHINGSCHEDULEDAT_DESC = '_unpublishingScheduledAt_DESC',
  _UPDATEDAT_ASC = '_updatedAt_ASC',
  _UPDATEDAT_DESC = '_updatedAt_DESC',
  CREATEDAT_ASC = 'createdAt_ASC',
  CREATEDAT_DESC = 'createdAt_DESC',
  ID_ASC = 'id_ASC',
  ID_DESC = 'id_DESC',
  TITLE_ASC = 'title_ASC',
  TITLE_DESC = 'title_DESC',
  UPDATEDAT_ASC = 'updatedAt_ASC',
  UPDATEDAT_DESC = 'updatedAt_DESC'
}

/** Record of type Article (article) */
export type ArticleRecord = RecordInterface & {
  __typename: 'ArticleRecord';
  _createdAt: Scalars['DateTime'];
  _firstPublishedAt?: Maybe<Scalars['DateTime']>;
  _isValid: Scalars['BooleanType'];
  _modelApiKey: Scalars['String'];
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>;
  _publishedAt?: Maybe<Scalars['DateTime']>;
  /** SEO meta tags */
  _seoMetaTags: Array<Tag>;
  _status: ItemStatus;
  _unpublishingScheduledAt?: Maybe<Scalars['DateTime']>;
  _updatedAt: Scalars['DateTime'];
  author?: Maybe<AuthorRecord>;
  categories: Array<CategoryRecord>;
  content?: Maybe<ArticleModelContentField>;
  createdAt: Scalars['DateTime'];
  id: Scalars['ItemId'];
  image?: Maybe<FileField>;
  seoMetadata?: Maybe<SeoField>;
  shortDescription?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
};


/** Record of type Article (article) */
export type ArticleRecordSeoMetaTagsArgs = {
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type Article (article) */
export type ArticleRecordShortDescriptionArgs = {
  markdown?: InputMaybe<Scalars['Boolean']>;
};

/** Author */
export type Author = {
  __typename: 'Author';
  /** Author name. */
  name: Scalars['String'];
};

export type AuthorModelFilter = {
  OR?: InputMaybe<Array<InputMaybe<AuthorModelFilter>>>;
  _createdAt?: InputMaybe<CreatedAtFilter>;
  _firstPublishedAt?: InputMaybe<PublishedAtFilter>;
  _isValid?: InputMaybe<BooleanFilter>;
  _publicationScheduledAt?: InputMaybe<PublishedAtFilter>;
  _publishedAt?: InputMaybe<PublishedAtFilter>;
  _status?: InputMaybe<StatusFilter>;
  _unpublishingScheduledAt?: InputMaybe<PublishedAtFilter>;
  _updatedAt?: InputMaybe<UpdatedAtFilter>;
  createdAt?: InputMaybe<CreatedAtFilter>;
  id?: InputMaybe<ItemIdFilter>;
  image?: InputMaybe<FileFilter>;
  name?: InputMaybe<StringFilter>;
  seoMetadata?: InputMaybe<SeoFilter>;
  slug?: InputMaybe<SlugFilter>;
  updatedAt?: InputMaybe<UpdatedAtFilter>;
};

export enum AuthorModelOrderBy {
  _CREATEDAT_ASC = '_createdAt_ASC',
  _CREATEDAT_DESC = '_createdAt_DESC',
  _FIRSTPUBLISHEDAT_ASC = '_firstPublishedAt_ASC',
  _FIRSTPUBLISHEDAT_DESC = '_firstPublishedAt_DESC',
  _ISVALID_ASC = '_isValid_ASC',
  _ISVALID_DESC = '_isValid_DESC',
  _PUBLICATIONSCHEDULEDAT_ASC = '_publicationScheduledAt_ASC',
  _PUBLICATIONSCHEDULEDAT_DESC = '_publicationScheduledAt_DESC',
  _PUBLISHEDAT_ASC = '_publishedAt_ASC',
  _PUBLISHEDAT_DESC = '_publishedAt_DESC',
  _STATUS_ASC = '_status_ASC',
  _STATUS_DESC = '_status_DESC',
  _UNPUBLISHINGSCHEDULEDAT_ASC = '_unpublishingScheduledAt_ASC',
  _UNPUBLISHINGSCHEDULEDAT_DESC = '_unpublishingScheduledAt_DESC',
  _UPDATEDAT_ASC = '_updatedAt_ASC',
  _UPDATEDAT_DESC = '_updatedAt_DESC',
  CREATEDAT_ASC = 'createdAt_ASC',
  CREATEDAT_DESC = 'createdAt_DESC',
  ID_ASC = 'id_ASC',
  ID_DESC = 'id_DESC',
  NAME_ASC = 'name_ASC',
  NAME_DESC = 'name_DESC',
  UPDATEDAT_ASC = 'updatedAt_ASC',
  UPDATEDAT_DESC = 'updatedAt_DESC'
}

/** Record of type Author (author) */
export type AuthorRecord = RecordInterface & {
  __typename: 'AuthorRecord';
  _createdAt: Scalars['DateTime'];
  _firstPublishedAt?: Maybe<Scalars['DateTime']>;
  _isValid: Scalars['BooleanType'];
  _modelApiKey: Scalars['String'];
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>;
  _publishedAt?: Maybe<Scalars['DateTime']>;
  /** SEO meta tags */
  _seoMetaTags: Array<Tag>;
  _status: ItemStatus;
  _unpublishingScheduledAt?: Maybe<Scalars['DateTime']>;
  _updatedAt: Scalars['DateTime'];
  createdAt: Scalars['DateTime'];
  id: Scalars['ItemId'];
  image?: Maybe<FileField>;
  name?: Maybe<Scalars['String']>;
  seoMetadata?: Maybe<SeoField>;
  slug?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
};


/** Record of type Author (author) */
export type AuthorRecordSeoMetaTagsArgs = {
  locale?: InputMaybe<SiteLocale>;
};

/** Record of type Blog Index Page (blog_index_page) */
export type BlogIndexPageRecord = RecordInterface & {
  __typename: 'BlogIndexPageRecord';
  _createdAt: Scalars['DateTime'];
  _firstPublishedAt?: Maybe<Scalars['DateTime']>;
  _isValid: Scalars['BooleanType'];
  _modelApiKey: Scalars['String'];
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>;
  _publishedAt?: Maybe<Scalars['DateTime']>;
  /** SEO meta tags */
  _seoMetaTags: Array<Tag>;
  _status: ItemStatus;
  _unpublishingScheduledAt?: Maybe<Scalars['DateTime']>;
  _updatedAt: Scalars['DateTime'];
  createdAt: Scalars['DateTime'];
  id: Scalars['ItemId'];
  seoMetadata?: Maybe<SeoField>;
  updatedAt: Scalars['DateTime'];
};


/** Record of type Blog Index Page (blog_index_page) */
export type BlogIndexPageRecordSeoMetaTagsArgs = {
  locale?: InputMaybe<SiteLocale>;
};

/** Specifies how to filter Boolean fields */
export type BooleanFilter = {
  /** Search for records with an exact match */
  eq?: InputMaybe<Scalars['BooleanType']>;
};

/** Brand */
export type Brand = Node & {
  __typename: 'Brand';
  /** Default image for brand. */
  defaultImage?: Maybe<Image>;
  /** Id of the brand. */
  entityId: Scalars['Int'];
  /** The ID of an object */
  id: Scalars['ID'];
  /**
   * Meta description for the brand.
   * @deprecated Use SEO details instead.
   */
  metaDesc: Scalars['String'];
  /**
   * Meta keywords for the brand.
   * @deprecated Use SEO details instead.
   */
  metaKeywords: Array<Scalars['String']>;
  /** Metafield data related to a brand. */
  metafields: MetafieldConnection;
  /** Name of the brand. */
  name: Scalars['String'];
  /**
   * Page title for the brand.
   * @deprecated Use SEO details instead.
   */
  pageTitle: Scalars['String'];
  /** Path for the brand page. */
  path: Scalars['String'];
  /** List of products associated with the brand. */
  products: ProductConnection;
  /** Search keywords for the brand. */
  searchKeywords: Array<Scalars['String']>;
  /** Brand SEO details. */
  seo: SeoDetails;
};


/** Brand */
export type BrandMetafieldsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  keys?: InputMaybe<Array<Scalars['String']>>;
  last?: InputMaybe<Scalars['Int']>;
  namespace: Scalars['String'];
};


/** Brand */
export type BrandProductsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  hideOutOfStock?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
};

/** A connection to a list of items. */
export type BrandConnection = {
  __typename: 'BrandConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<BrandEdge>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type BrandEdge = {
  __typename: 'BrandEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: Brand;
};

/** Brand Filter */
export type BrandSearchFilter = SearchProductFilter & {
  __typename: 'BrandSearchFilter';
  /** List of available brands. */
  brands: BrandSearchFilterItemConnection;
  /** Indicates whether to display product count next to the filter. */
  displayProductCount: Scalars['Boolean'];
  /** Indicates whether filter is collapsed by default. */
  isCollapsedByDefault: Scalars['Boolean'];
  /** Display name for the filter. */
  name: Scalars['String'];
};


/** Brand Filter */
export type BrandSearchFilterBrandsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

/** Specific brand filter item */
export type BrandSearchFilterItem = {
  __typename: 'BrandSearchFilterItem';
  /** Brand ID. */
  entityId: Scalars['Int'];
  /** Indicates whether brand is selected. */
  isSelected: Scalars['Boolean'];
  /** Brand name. */
  name: Scalars['String'];
  /** Indicates how many products available for this filter. */
  productCount: Scalars['Int'];
};

/** A connection to a list of items. */
export type BrandSearchFilterItemConnection = {
  __typename: 'BrandSearchFilterItemConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<BrandSearchFilterItemEdge>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type BrandSearchFilterItemEdge = {
  __typename: 'BrandSearchFilterItemEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: BrandSearchFilterItem;
};

/** Breadcrumb */
export type Breadcrumb = {
  __typename: 'Breadcrumb';
  /** Category id. */
  entityId: Scalars['Int'];
  /** Name of the category. */
  name: Scalars['String'];
};

/** A connection to a list of items. */
export type BreadcrumbConnection = {
  __typename: 'BreadcrumbConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<BreadcrumbEdge>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type BreadcrumbEdge = {
  __typename: 'BreadcrumbEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: Breadcrumb;
};

/** Bulk pricing tier that sets a fixed price for the product or variant. */
export type BulkPricingFixedPriceDiscount = BulkPricingTier & {
  __typename: 'BulkPricingFixedPriceDiscount';
  /** Maximum item quantity that applies to this bulk pricing tier - if not defined then the tier does not have an upper bound. */
  maximumQuantity?: Maybe<Scalars['Int']>;
  /** Minimum item quantity that applies to this bulk pricing tier. */
  minimumQuantity: Scalars['Int'];
  /** This price will override the current product price. */
  price: Scalars['BigDecimal'];
};

/** Bulk pricing tier that reduces the price of the product or variant by a percentage. */
export type BulkPricingPercentageDiscount = BulkPricingTier & {
  __typename: 'BulkPricingPercentageDiscount';
  /** Maximum item quantity that applies to this bulk pricing tier - if not defined then the tier does not have an upper bound. */
  maximumQuantity?: Maybe<Scalars['Int']>;
  /** Minimum item quantity that applies to this bulk pricing tier. */
  minimumQuantity: Scalars['Int'];
  /** The percentage that will be removed from the product price. */
  percentOff: Scalars['BigDecimal'];
};

/** Bulk pricing tier that will subtract an amount from the price of the product or variant. */
export type BulkPricingRelativePriceDiscount = BulkPricingTier & {
  __typename: 'BulkPricingRelativePriceDiscount';
  /** Maximum item quantity that applies to this bulk pricing tier - if not defined then the tier does not have an upper bound. */
  maximumQuantity?: Maybe<Scalars['Int']>;
  /** Minimum item quantity that applies to this bulk pricing tier. */
  minimumQuantity: Scalars['Int'];
  /** The price of the product/variant will be reduced by this priceAdjustment. */
  priceAdjustment: Scalars['BigDecimal'];
};

/** A set of bulk pricing tiers that define price discounts which apply when purchasing specified quantities of a product or variant. */
export type BulkPricingTier = {
  /** Maximum item quantity that applies to this bulk pricing tier - if not defined then the tier does not have an upper bound. */
  maximumQuantity?: Maybe<Scalars['Int']>;
  /** Minimum item quantity that applies to this bulk pricing tier. */
  minimumQuantity: Scalars['Int'];
};

/** Storefront catalog settings. */
export type Catalog = {
  __typename: 'Catalog';
  /** Product comparisons enabled. */
  productComparisonsEnabled?: Maybe<Scalars['Boolean']>;
};

/** Product Option */
export type CatalogProductOption = {
  /** Display name for the option. */
  displayName: Scalars['String'];
  /** Unique ID for the option. */
  entityId: Scalars['Int'];
  /** One of the option values is required to be selected for the checkout. */
  isRequired: Scalars['Boolean'];
  /** Indicates whether it is a variant option or modifier. */
  isVariantOption: Scalars['Boolean'];
};

/** Product Option Value */
export type CatalogProductOptionValue = {
  /** Unique ID for the option value. */
  entityId: Scalars['Int'];
  /** Indicates whether this value is the chosen default selected value. */
  isDefault: Scalars['Boolean'];
  /** Indicates whether this value is selected based on sku/variantEntityId/optionValueIds overlay requested on the product node level. */
  isSelected?: Maybe<Scalars['Boolean']>;
  /** Label for the option value. */
  label: Scalars['String'];
};

/** Category */
export type Category = Node & {
  __typename: 'Category';
  /** Category breadcrumbs. */
  breadcrumbs: BreadcrumbConnection;
  /** Default image for the category. */
  defaultImage?: Maybe<Image>;
  /** Category default product sort. */
  defaultProductSort?: Maybe<CategoryProductSort>;
  /** Category description. */
  description: Scalars['String'];
  /** Unique ID for the category. */
  entityId: Scalars['Int'];
  /** The ID of an object */
  id: Scalars['ID'];
  /** Metafield data related to a category. */
  metafields: MetafieldConnection;
  /** Category name. */
  name: Scalars['String'];
  /** Category path. */
  path: Scalars['String'];
  /** List of products associated with category */
  products: ProductConnection;
  /** Category SEO details. */
  seo: SeoDetails;
  /**
   * Category shop by price money ranges.
   * @deprecated Alpha version. Do not use in production.
   */
  shopByPriceRanges: ShopByPriceConnection;
};


/** Category */
export type CategoryBreadcrumbsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  depth: Scalars['Int'];
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


/** Category */
export type CategoryMetafieldsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  keys?: InputMaybe<Array<Scalars['String']>>;
  last?: InputMaybe<Scalars['Int']>;
  namespace: Scalars['String'];
};


/** Category */
export type CategoryProductsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  hideOutOfStock?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  sortBy?: InputMaybe<CategoryProductSort>;
};


/** Category */
export type CategoryShopByPriceRangesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  currencyCode?: InputMaybe<CurrencyCode>;
  first?: InputMaybe<Scalars['Int']>;
  includeTax?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
};

/** A connection to a list of items. */
export type CategoryConnection = {
  __typename: 'CategoryConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<CategoryEdge>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type CategoryEdge = {
  __typename: 'CategoryEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: Category;
};

export type CategoryModelDescriptionField = {
  __typename: 'CategoryModelDescriptionField';
  blocks: Array<Scalars['String']>;
  links: Array<Scalars['String']>;
  value: Scalars['JsonField'];
};

export type CategoryModelFilter = {
  OR?: InputMaybe<Array<InputMaybe<CategoryModelFilter>>>;
  _createdAt?: InputMaybe<CreatedAtFilter>;
  _firstPublishedAt?: InputMaybe<PublishedAtFilter>;
  _isValid?: InputMaybe<BooleanFilter>;
  _publicationScheduledAt?: InputMaybe<PublishedAtFilter>;
  _publishedAt?: InputMaybe<PublishedAtFilter>;
  _status?: InputMaybe<StatusFilter>;
  _unpublishingScheduledAt?: InputMaybe<PublishedAtFilter>;
  _updatedAt?: InputMaybe<UpdatedAtFilter>;
  createdAt?: InputMaybe<CreatedAtFilter>;
  description?: InputMaybe<StructuredTextFilter>;
  id?: InputMaybe<ItemIdFilter>;
  name?: InputMaybe<StringFilter>;
  seoMetadata?: InputMaybe<SeoFilter>;
  shortName?: InputMaybe<StringFilter>;
  slug?: InputMaybe<SlugFilter>;
  updatedAt?: InputMaybe<UpdatedAtFilter>;
};

export enum CategoryModelOrderBy {
  _CREATEDAT_ASC = '_createdAt_ASC',
  _CREATEDAT_DESC = '_createdAt_DESC',
  _FIRSTPUBLISHEDAT_ASC = '_firstPublishedAt_ASC',
  _FIRSTPUBLISHEDAT_DESC = '_firstPublishedAt_DESC',
  _ISVALID_ASC = '_isValid_ASC',
  _ISVALID_DESC = '_isValid_DESC',
  _PUBLICATIONSCHEDULEDAT_ASC = '_publicationScheduledAt_ASC',
  _PUBLICATIONSCHEDULEDAT_DESC = '_publicationScheduledAt_DESC',
  _PUBLISHEDAT_ASC = '_publishedAt_ASC',
  _PUBLISHEDAT_DESC = '_publishedAt_DESC',
  _STATUS_ASC = '_status_ASC',
  _STATUS_DESC = '_status_DESC',
  _UNPUBLISHINGSCHEDULEDAT_ASC = '_unpublishingScheduledAt_ASC',
  _UNPUBLISHINGSCHEDULEDAT_DESC = '_unpublishingScheduledAt_DESC',
  _UPDATEDAT_ASC = '_updatedAt_ASC',
  _UPDATEDAT_DESC = '_updatedAt_DESC',
  CREATEDAT_ASC = 'createdAt_ASC',
  CREATEDAT_DESC = 'createdAt_DESC',
  ID_ASC = 'id_ASC',
  ID_DESC = 'id_DESC',
  NAME_ASC = 'name_ASC',
  NAME_DESC = 'name_DESC',
  SHORTNAME_ASC = 'shortName_ASC',
  SHORTNAME_DESC = 'shortName_DESC',
  UPDATEDAT_ASC = 'updatedAt_ASC',
  UPDATEDAT_DESC = 'updatedAt_DESC'
}

/** Product sorting by categories. */
export enum CategoryProductSort {
  A_TO_Z = 'A_TO_Z',
  BEST_REVIEWED = 'BEST_REVIEWED',
  BEST_SELLING = 'BEST_SELLING',
  DEFAULT = 'DEFAULT',
  FEATURED = 'FEATURED',
  HIGHEST_PRICE = 'HIGHEST_PRICE',
  LOWEST_PRICE = 'LOWEST_PRICE',
  NEWEST = 'NEWEST',
  Z_TO_A = 'Z_TO_A'
}

/** Record of type Category (category) */
export type CategoryRecord = RecordInterface & {
  __typename: 'CategoryRecord';
  _createdAt: Scalars['DateTime'];
  _firstPublishedAt?: Maybe<Scalars['DateTime']>;
  _isValid: Scalars['BooleanType'];
  _modelApiKey: Scalars['String'];
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>;
  _publishedAt?: Maybe<Scalars['DateTime']>;
  /** SEO meta tags */
  _seoMetaTags: Array<Tag>;
  _status: ItemStatus;
  _unpublishingScheduledAt?: Maybe<Scalars['DateTime']>;
  _updatedAt: Scalars['DateTime'];
  createdAt: Scalars['DateTime'];
  description?: Maybe<CategoryModelDescriptionField>;
  id: Scalars['ItemId'];
  name?: Maybe<Scalars['String']>;
  seoMetadata?: Maybe<SeoField>;
  shortName?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
};


/** Record of type Category (category) */
export type CategoryRecordSeoMetaTagsArgs = {
  locale?: InputMaybe<SiteLocale>;
};

/** Category Filter */
export type CategorySearchFilter = SearchProductFilter & {
  __typename: 'CategorySearchFilter';
  /** List of available categories. */
  categories: CategorySearchFilterItemConnection;
  /** Indicates whether to display product count next to the filter. */
  displayProductCount: Scalars['Boolean'];
  /** Indicates whether filter is collapsed by default. */
  isCollapsedByDefault: Scalars['Boolean'];
  /** Display name for the filter. */
  name: Scalars['String'];
};


/** Category Filter */
export type CategorySearchFilterCategoriesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

/** Specific category filter item */
export type CategorySearchFilterItem = {
  __typename: 'CategorySearchFilterItem';
  /** Category ID. */
  entityId: Scalars['Int'];
  /** Indicates whether category is selected. */
  isSelected: Scalars['Boolean'];
  /** Category name. */
  name: Scalars['String'];
  /** Indicates how many products available for this filter. */
  productCount: Scalars['Int'];
  /** List of available sub-categories. */
  subCategories: SubCategorySearchFilterItemConnection;
};


/** Specific category filter item */
export type CategorySearchFilterItemSubCategoriesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

/** A connection to a list of items. */
export type CategorySearchFilterItemConnection = {
  __typename: 'CategorySearchFilterItemConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<CategorySearchFilterItemEdge>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type CategorySearchFilterItemEdge = {
  __typename: 'CategorySearchFilterItemEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: CategorySearchFilterItem;
};

/** An item in a tree of categories. */
export type CategoryTreeItem = {
  __typename: 'CategoryTreeItem';
  /** Subcategories of this category */
  children: Array<CategoryTreeItem>;
  /** The description of this category. */
  description: Scalars['String'];
  /** The id category. */
  entityId: Scalars['Int'];
  /** If a category has children. */
  hasChildren: Scalars['Boolean'];
  /** The category image. */
  image?: Maybe<Image>;
  /** The name of category. */
  name: Scalars['String'];
  /** Path assigned to this category */
  path: Scalars['String'];
  /** The number of products in this category. */
  productCount: Scalars['Int'];
};

/** The Channel */
export type Channel = {
  __typename: 'Channel';
  /** The ID of the channel. */
  entityId: Scalars['Long'];
  /** Metafield data related to a channel. */
  metafields: MetafieldConnection;
};


/** The Channel */
export type ChannelMetafieldsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  keys?: InputMaybe<Array<Scalars['String']>>;
  last?: InputMaybe<Scalars['Int']>;
  namespace: Scalars['String'];
};

/** A simple yes/no question represented by a checkbox. */
export type CheckboxOption = CatalogProductOption & {
  __typename: 'CheckboxOption';
  /** Indicates the default checked status. */
  checkedByDefault: Scalars['Boolean'];
  /** Display name for the option. */
  displayName: Scalars['String'];
  /** Unique ID for the option. */
  entityId: Scalars['Int'];
  /** One of the option values is required to be selected for the checkout. */
  isRequired: Scalars['Boolean'];
  /** Indicates whether it is a variant option or modifier. */
  isVariantOption: Scalars['Boolean'];
  /** Label of the checkbox option. */
  label: Scalars['String'];
};

/** Checkout settings. */
export type CheckoutSettings = {
  __typename: 'CheckoutSettings';
  /** Indicates whether ReCaptcha is enabled on checkout. */
  reCaptchaEnabled: Scalars['Boolean'];
};

/** Additional information about the collection. */
export type CollectionInfo = {
  __typename: 'CollectionInfo';
  /** Total items in the collection despite pagination. */
  totalItems?: Maybe<Scalars['Long']>;
};

export type CollectionMetadata = {
  __typename: 'CollectionMetadata';
  count: Scalars['IntType'];
};

export enum ColorBucketType {
  BLACK = 'black',
  BLUE = 'blue',
  BROWN = 'brown',
  CYAN = 'cyan',
  GREEN = 'green',
  GREY = 'grey',
  ORANGE = 'orange',
  PINK = 'pink',
  PURPLE = 'purple',
  RED = 'red',
  WHITE = 'white',
  YELLOW = 'yellow'
}

export type ColorField = {
  __typename: 'ColorField';
  alpha: Scalars['IntType'];
  blue: Scalars['IntType'];
  green: Scalars['IntType'];
  hex: Scalars['String'];
  red: Scalars['IntType'];
};

/** Contact field */
export type ContactField = {
  __typename: 'ContactField';
  /** Store address line. */
  address: Scalars['String'];
  /** Store address type. */
  addressType: Scalars['String'];
  /** Store country. */
  country: Scalars['String'];
  /** Store email. */
  email: Scalars['String'];
  /** Store phone number. */
  phone: Scalars['String'];
};

/** The page content. */
export type Content = {
  __typename: 'Content';
  /** The rendered regions by specific page. */
  renderedRegionsByPageType: RenderedRegionsByPageType;
  /** The rendered regions by specific page and id. */
  renderedRegionsByPageTypeAndEntityId: RenderedRegionsByPageType;
};


/** The page content. */
export type ContentRenderedRegionsByPageTypeArgs = {
  pageType: PageType;
};


/** The page content. */
export type ContentRenderedRegionsByPageTypeAndEntityIdArgs = {
  entityId: Scalars['Long'];
  entityPageType: EntityPageType;
};

/** Create wishlist input object */
export type CreateWishlistInput = {
  /** A wishlist visibility mode */
  isPublic: Scalars['Boolean'];
  /** A wishlist items */
  items?: InputMaybe<Array<WishlistItemInput>>;
  /** A wishlist name */
  name: Scalars['String'];
};

/** Create wishlist */
export type CreateWishlistResult = {
  __typename: 'CreateWishlistResult';
  /** The newly created wishlist */
  result: Wishlist;
};

/** Specifies how to filter by creation datetime */
export type CreatedAtFilter = {
  /** Filter records with a value that's within the specified minute range. Seconds and milliseconds are truncated from the argument. */
  eq?: InputMaybe<Scalars['DateTime']>;
  /** Filter records with the specified field defined (i.e. with any value) or not */
  exists?: InputMaybe<Scalars['BooleanType']>;
  /** Filter records with a value that's strictly greater than the one specified. Seconds and milliseconds are truncated from the argument. */
  gt?: InputMaybe<Scalars['DateTime']>;
  /** Filter records with a value that's greater than or equal to than the one specified. Seconds and milliseconds are truncated from the argument. */
  gte?: InputMaybe<Scalars['DateTime']>;
  /** Filter records with a value that's less than the one specified. Seconds and milliseconds are truncated from the argument. */
  lt?: InputMaybe<Scalars['DateTime']>;
  /** Filter records with a value that's less or equal than the one specified. Seconds and milliseconds are truncated from the argument. */
  lte?: InputMaybe<Scalars['DateTime']>;
  /** Filter records with a value that's outside the specified minute range. Seconds and milliseconds are truncated from the argument. */
  neq?: InputMaybe<Scalars['DateTime']>;
};

/** Currency details. */
export type Currency = {
  __typename: 'Currency';
  /** Currency code. */
  code: CurrencyCode;
  /** Currency display settings. */
  display: CurrencyDisplay;
  /** Currency ID. */
  entityId: Scalars['Int'];
  /** Exchange rate relative to default currency. */
  exchangeRate: Scalars['Float'];
  /** Flag image URL. */
  flagImage?: Maybe<Scalars['String']>;
  /** Indicates whether this currency is active. */
  isActive: Scalars['Boolean'];
  /** Indicates whether this currency is transactional. */
  isTransactional: Scalars['Boolean'];
  /** Currency name. */
  name: Scalars['String'];
};

/** A connection to a list of items. */
export type CurrencyConnection = {
  __typename: 'CurrencyConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<CurrencyEdge>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** Currency display settings. */
export type CurrencyDisplay = {
  __typename: 'CurrencyDisplay';
  /** Currency decimal places. */
  decimalPlaces: Scalars['Int'];
  /** Currency decimal token. */
  decimalToken: Scalars['String'];
  /** Currency symbol. */
  symbol: Scalars['String'];
  /** Currency symbol. */
  symbolPlacement: CurrencySymbolPosition;
  /** Currency thousands token. */
  thousandsToken: Scalars['String'];
};

/** An edge in a connection. */
export type CurrencyEdge = {
  __typename: 'CurrencyEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: Currency;
};

/** Currency symbol position */
export enum CurrencySymbolPosition {
  LEFT = 'LEFT',
  RIGHT = 'RIGHT'
}

/** Custom field */
export type CustomField = {
  __typename: 'CustomField';
  /** Custom field id. */
  entityId: Scalars['Int'];
  /** Name of the custom field. */
  name: Scalars['String'];
  /** Value of the custom field. */
  value: Scalars['String'];
};

/** A connection to a list of items. */
export type CustomFieldConnection = {
  __typename: 'CustomFieldConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<CustomFieldEdge>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type CustomFieldEdge = {
  __typename: 'CustomFieldEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: CustomField;
};

/** A customer that shops on a store */
export type Customer = {
  __typename: 'Customer';
  /** Customer addresses count. */
  addressCount: Scalars['Int'];
  /** Customer attributes count. */
  attributeCount: Scalars['Int'];
  /** Customer attributes. */
  attributes: CustomerAttributes;
  /** The company name of the customer. */
  company: Scalars['String'];
  /** The customer group id of the customer. */
  customerGroupId: Scalars['Int'];
  /** The email address of the customer. */
  email: Scalars['String'];
  /** The ID of the customer. */
  entityId: Scalars['Int'];
  /** The first name of the customer. */
  firstName: Scalars['String'];
  /** The last name of the customer. */
  lastName: Scalars['String'];
  /** The notes of the customer. */
  notes: Scalars['String'];
  /** The phone number of the customer. */
  phone: Scalars['String'];
  /** Customer store credit. */
  storeCredit: Array<Money>;
  /** The tax exempt category of the customer. */
  taxExemptCategory: Scalars['String'];
  /** Customer wishlists. */
  wishlists: WishlistConnection;
};


/** A customer that shops on a store */
export type CustomerWishlistsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filters?: InputMaybe<WishlistFiltersInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

/** A custom, store-specific attribute for a customer */
export type CustomerAttribute = {
  __typename: 'CustomerAttribute';
  /** The ID of the custom customer attribute */
  entityId: Scalars['Int'];
  /** The name of the custom customer attribute */
  name: Scalars['String'];
  /** The value of the custom customer attribute */
  value?: Maybe<Scalars['String']>;
};

/** Custom, store-specific customer attributes */
export type CustomerAttributes = {
  __typename: 'CustomerAttributes';
  /** A custom, store-specific attribute for a customer */
  attribute: CustomerAttribute;
};


/** Custom, store-specific customer attributes */
export type CustomerAttributesAttributeArgs = {
  entityId: Scalars['Int'];
};

/** A calendar for allowing selection of a date. */
export type DateFieldOption = CatalogProductOption & {
  __typename: 'DateFieldOption';
  /** The default timestamp of date option. */
  defaultValue?: Maybe<Scalars['DateTime']>;
  /** Display name for the option. */
  displayName: Scalars['String'];
  /** The earliest timestamp of date option. */
  earliest?: Maybe<Scalars['DateTime']>;
  /** Unique ID for the option. */
  entityId: Scalars['Int'];
  /** One of the option values is required to be selected for the checkout. */
  isRequired: Scalars['Boolean'];
  /** Indicates whether it is a variant option or modifier. */
  isVariantOption: Scalars['Boolean'];
  /** The latest timestamp of date option. */
  latest?: Maybe<Scalars['DateTime']>;
  /** Limit date by */
  limitDateBy: LimitDateOption;
};

/** Date Time Extended */
export type DateTimeExtended = {
  __typename: 'DateTimeExtended';
  /** ISO-8601 formatted date in UTC */
  utc: Scalars['DateTime'];
};

/** Delete wishlist items input object */
export type DeleteWishlistItemsInput = {
  /** The wishlist id */
  entityId: Scalars['Int'];
  /** The wishlist item ids */
  itemEntityIds: Array<Scalars['Int']>;
};

/** Delete wishlist items */
export type DeleteWishlistItemsResult = {
  __typename: 'DeleteWishlistItemsResult';
  /** The wishlist */
  result: Wishlist;
};

/** Delete wishlist */
export type DeleteWishlistResult = {
  __typename: 'DeleteWishlistResult';
  /** The result of the operation */
  result: Scalars['String'];
};

/** Delete wishlists input object */
export type DeleteWishlistsInput = {
  /** The wishlist ids */
  entityIds: Array<Scalars['Int']>;
};

/** Display field */
export type DisplayField = {
  __typename: 'DisplayField';
  /** Extended date format. */
  extendedDateFormat: Scalars['String'];
  /** Short date format. */
  shortDateFormat: Scalars['String'];
};

/** Distance */
export type Distance = {
  __typename: 'Distance';
  /** Length unit */
  lengthUnit: LengthUnit;
  /** Distance in specified length unit */
  value: Scalars['Float'];
};

/** Filter locations by the distance */
export type DistanceFilter = {
  /** Signed decimal degrees without compass direction */
  latitude: Scalars['Float'];
  /** Length unit */
  lengthUnit: LengthUnit;
  /** Signed decimal degrees without compass direction */
  longitude: Scalars['Float'];
  /** Radius of search in length units specified in lengthUnit argument */
  radius: Scalars['Float'];
};

/** Entity page type */
export enum EntityPageType {
  BLOG_POST = 'BLOG_POST',
  BRAND = 'BRAND',
  CATEGORY = 'CATEGORY',
  CONTACT_US = 'CONTACT_US',
  PAGE = 'PAGE',
  PRODUCT = 'PRODUCT'
}

export enum FaviconType {
  APPLETOUCHICON = 'appleTouchIcon',
  ICON = 'icon',
  MSAPPLICATION = 'msApplication'
}

export type FileField = FileFieldInterface & {
  __typename: 'FileField';
  _createdAt: Scalars['DateTime'];
  _updatedAt: Scalars['DateTime'];
  alt?: Maybe<Scalars['String']>;
  author?: Maybe<Scalars['String']>;
  basename: Scalars['String'];
  blurUpThumb?: Maybe<Scalars['String']>;
  blurhash?: Maybe<Scalars['String']>;
  colors: Array<ColorField>;
  copyright?: Maybe<Scalars['String']>;
  customData: Scalars['CustomData'];
  exifInfo: Scalars['CustomData'];
  filename: Scalars['String'];
  focalPoint?: Maybe<FocalPoint>;
  format: Scalars['String'];
  height?: Maybe<Scalars['IntType']>;
  id: Scalars['UploadId'];
  md5: Scalars['String'];
  mimeType: Scalars['String'];
  notes?: Maybe<Scalars['String']>;
  responsiveImage?: Maybe<ResponsiveImage>;
  size: Scalars['IntType'];
  smartTags: Array<Scalars['String']>;
  tags: Array<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  url: Scalars['String'];
  video?: Maybe<UploadVideoField>;
  width?: Maybe<Scalars['IntType']>;
};


export type FileFieldAltArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


export type FileFieldBlurUpThumbArgs = {
  imgixParams?: InputMaybe<ImgixParams>;
  punch?: Scalars['Float'];
  quality?: Scalars['Int'];
  size?: Scalars['Int'];
};


export type FileFieldCustomDataArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


export type FileFieldFocalPointArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


export type FileFieldResponsiveImageArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  imgixParams?: InputMaybe<ImgixParams>;
  locale?: InputMaybe<SiteLocale>;
  sizes?: InputMaybe<Scalars['String']>;
};


export type FileFieldTitleArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


export type FileFieldUrlArgs = {
  imgixParams?: InputMaybe<ImgixParams>;
};

export type FileFieldInterface = {
  _createdAt: Scalars['DateTime'];
  _updatedAt: Scalars['DateTime'];
  alt?: Maybe<Scalars['String']>;
  author?: Maybe<Scalars['String']>;
  basename: Scalars['String'];
  blurUpThumb?: Maybe<Scalars['String']>;
  blurhash?: Maybe<Scalars['String']>;
  colors: Array<ColorField>;
  copyright?: Maybe<Scalars['String']>;
  customData: Scalars['CustomData'];
  exifInfo: Scalars['CustomData'];
  filename: Scalars['String'];
  focalPoint?: Maybe<FocalPoint>;
  format: Scalars['String'];
  height?: Maybe<Scalars['IntType']>;
  id: Scalars['UploadId'];
  md5: Scalars['String'];
  mimeType: Scalars['String'];
  notes?: Maybe<Scalars['String']>;
  responsiveImage?: Maybe<ResponsiveImage>;
  size: Scalars['IntType'];
  smartTags: Array<Scalars['String']>;
  tags: Array<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  url: Scalars['String'];
  video?: Maybe<UploadVideoField>;
  width?: Maybe<Scalars['IntType']>;
};


export type FileFieldInterfaceAltArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


export type FileFieldInterfaceBlurUpThumbArgs = {
  imgixParams?: InputMaybe<ImgixParams>;
  punch?: Scalars['Float'];
  quality?: Scalars['Int'];
  size?: Scalars['Int'];
};


export type FileFieldInterfaceCustomDataArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


export type FileFieldInterfaceFocalPointArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


export type FileFieldInterfaceResponsiveImageArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  imgixParams?: InputMaybe<ImgixParams>;
  locale?: InputMaybe<SiteLocale>;
  sizes?: InputMaybe<Scalars['String']>;
};


export type FileFieldInterfaceTitleArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


export type FileFieldInterfaceUrlArgs = {
  imgixParams?: InputMaybe<ImgixParams>;
};

/** Specifies how to filter Single-file/image fields */
export type FileFilter = {
  /** Search for records with an exact match. The specified value must be an Upload ID */
  eq?: InputMaybe<Scalars['UploadId']>;
  /** Filter records with the specified field defined (i.e. with any value) or not */
  exists?: InputMaybe<Scalars['BooleanType']>;
  /** Filter records that have one of the specified uploads */
  in?: InputMaybe<Array<InputMaybe<Scalars['UploadId']>>>;
  /** Exclude records with an exact match. The specified value must be an Upload ID */
  neq?: InputMaybe<Scalars['UploadId']>;
  /** Filter records that do not have one of the specified uploads */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['UploadId']>>>;
};

/** A form allowing selection and uploading of a file from the user's local computer. */
export type FileUploadFieldOption = CatalogProductOption & {
  __typename: 'FileUploadFieldOption';
  /** Display name for the option. */
  displayName: Scalars['String'];
  /** Unique ID for the option. */
  entityId: Scalars['Int'];
  /** All possible file extensions. Empty means that all files allowed. */
  fileTypes: Array<Scalars['String']>;
  /** One of the option values is required to be selected for the checkout. */
  isRequired: Scalars['Boolean'];
  /** Indicates whether it is a variant option or modifier. */
  isVariantOption: Scalars['Boolean'];
  /** The maximum size of the file in kilobytes */
  maxFileSize: Scalars['Int'];
};

/** Gift wrapping for product */
export type GiftWrapping = {
  __typename: 'GiftWrapping';
  /** Indicates whether commenting is allowed for the gift wrapping. */
  allowComments: Scalars['Boolean'];
  /** Gift wrapping id. */
  entityId: Scalars['Int'];
  /** Gift wrapping name. */
  name: Scalars['String'];
  /** Gift wrapping preview image url. */
  previewImageUrl?: Maybe<Scalars['String']>;
};

/** A connection to a list of items. */
export type GiftWrappingConnection = {
  __typename: 'GiftWrappingConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<GiftWrappingEdge>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type GiftWrappingEdge = {
  __typename: 'GiftWrappingEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: GiftWrapping;
};

export enum GlobalRole {
  CUSTOMER = 'CUSTOMER',
  SUPERADMIN = 'SUPERADMIN'
}

export type GlobalSeoField = {
  __typename: 'GlobalSeoField';
  facebookPageUrl?: Maybe<Scalars['String']>;
  fallbackSeo?: Maybe<SeoField>;
  siteName?: Maybe<Scalars['String']>;
  titleSuffix?: Maybe<Scalars['String']>;
  twitterAccount?: Maybe<Scalars['String']>;
};

export type GlossaryCategoryModelFilter = {
  OR?: InputMaybe<Array<InputMaybe<GlossaryCategoryModelFilter>>>;
  _createdAt?: InputMaybe<CreatedAtFilter>;
  _firstPublishedAt?: InputMaybe<PublishedAtFilter>;
  _isValid?: InputMaybe<BooleanFilter>;
  _publicationScheduledAt?: InputMaybe<PublishedAtFilter>;
  _publishedAt?: InputMaybe<PublishedAtFilter>;
  _status?: InputMaybe<StatusFilter>;
  _unpublishingScheduledAt?: InputMaybe<PublishedAtFilter>;
  _updatedAt?: InputMaybe<UpdatedAtFilter>;
  createdAt?: InputMaybe<CreatedAtFilter>;
  description?: InputMaybe<TextFilter>;
  id?: InputMaybe<ItemIdFilter>;
  parent?: InputMaybe<ParentFilter>;
  position?: InputMaybe<PositionFilter>;
  seoMetadata?: InputMaybe<SeoFilter>;
  slug?: InputMaybe<SlugFilter>;
  title?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<UpdatedAtFilter>;
};

export enum GlossaryCategoryModelOrderBy {
  _CREATEDAT_ASC = '_createdAt_ASC',
  _CREATEDAT_DESC = '_createdAt_DESC',
  _FIRSTPUBLISHEDAT_ASC = '_firstPublishedAt_ASC',
  _FIRSTPUBLISHEDAT_DESC = '_firstPublishedAt_DESC',
  _ISVALID_ASC = '_isValid_ASC',
  _ISVALID_DESC = '_isValid_DESC',
  _PUBLICATIONSCHEDULEDAT_ASC = '_publicationScheduledAt_ASC',
  _PUBLICATIONSCHEDULEDAT_DESC = '_publicationScheduledAt_DESC',
  _PUBLISHEDAT_ASC = '_publishedAt_ASC',
  _PUBLISHEDAT_DESC = '_publishedAt_DESC',
  _STATUS_ASC = '_status_ASC',
  _STATUS_DESC = '_status_DESC',
  _UNPUBLISHINGSCHEDULEDAT_ASC = '_unpublishingScheduledAt_ASC',
  _UNPUBLISHINGSCHEDULEDAT_DESC = '_unpublishingScheduledAt_DESC',
  _UPDATEDAT_ASC = '_updatedAt_ASC',
  _UPDATEDAT_DESC = '_updatedAt_DESC',
  CREATEDAT_ASC = 'createdAt_ASC',
  CREATEDAT_DESC = 'createdAt_DESC',
  ID_ASC = 'id_ASC',
  ID_DESC = 'id_DESC',
  POSITION_ASC = 'position_ASC',
  POSITION_DESC = 'position_DESC',
  TITLE_ASC = 'title_ASC',
  TITLE_DESC = 'title_DESC',
  UPDATEDAT_ASC = 'updatedAt_ASC',
  UPDATEDAT_DESC = 'updatedAt_DESC'
}

/** Record of type Glossary Category (glossary_category) */
export type GlossaryCategoryRecord = RecordInterface & {
  __typename: 'GlossaryCategoryRecord';
  _allReferencingGlossaryEntries: Array<GlossaryEntryRecord>;
  /** Returns meta information regarding a record collection */
  _allReferencingGlossaryEntriesMeta: CollectionMetadata;
  _createdAt: Scalars['DateTime'];
  _firstPublishedAt?: Maybe<Scalars['DateTime']>;
  _isValid: Scalars['BooleanType'];
  _modelApiKey: Scalars['String'];
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>;
  _publishedAt?: Maybe<Scalars['DateTime']>;
  /** SEO meta tags */
  _seoMetaTags: Array<Tag>;
  _status: ItemStatus;
  _unpublishingScheduledAt?: Maybe<Scalars['DateTime']>;
  _updatedAt: Scalars['DateTime'];
  children?: Maybe<Array<Maybe<GlossaryCategoryRecord>>>;
  createdAt: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['ItemId'];
  parent?: Maybe<GlossaryCategoryRecord>;
  position?: Maybe<Scalars['IntType']>;
  seoMetadata?: Maybe<SeoField>;
  slug?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
};


/** Record of type Glossary Category (glossary_category) */
export type GlossaryCategoryRecordAllReferencingGlossaryEntriesArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  first?: InputMaybe<Scalars['IntType']>;
  locale?: InputMaybe<SiteLocale>;
  orderBy?: InputMaybe<Array<InputMaybe<GlossaryEntryModelOrderBy>>>;
  skip?: InputMaybe<Scalars['IntType']>;
  through?: InputMaybe<InverseRelationshipFilterBetweenGlossaryEntryAndGlossaryCategory>;
};


/** Record of type Glossary Category (glossary_category) */
export type GlossaryCategoryRecordAllReferencingGlossaryEntriesMetaArgs = {
  through?: InputMaybe<InverseRelationshipFilterBetweenGlossaryEntryAndGlossaryCategory>;
};


/** Record of type Glossary Category (glossary_category) */
export type GlossaryCategoryRecordSeoMetaTagsArgs = {
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type Glossary Category (glossary_category) */
export type GlossaryCategoryRecordDescriptionArgs = {
  markdown?: InputMaybe<Scalars['Boolean']>;
};

export type GlossaryEntryModelDescriptionField = {
  __typename: 'GlossaryEntryModelDescriptionField';
  blocks: Array<ImageRecord>;
  links: Array<GlossaryEntryModelDescriptionLinksField>;
  value: Scalars['JsonField'];
};

export type GlossaryEntryModelDescriptionLinksField = ArticleRecord | GlossaryEntryRecord;

/** Linking fields */
export enum GlossaryEntryModelFieldsReferencingGlossaryCategoryModel {
  GLOSSARYENTRY_CATEGORIES = 'glossaryEntry_categories'
}

/** Linking fields */
export enum GlossaryEntryModelFieldsReferencingGlossaryEntryModel {
  GLOSSARYENTRY_DESCRIPTION = 'glossaryEntry_description'
}

export type GlossaryEntryModelFilter = {
  OR?: InputMaybe<Array<InputMaybe<GlossaryEntryModelFilter>>>;
  _createdAt?: InputMaybe<CreatedAtFilter>;
  _firstPublishedAt?: InputMaybe<PublishedAtFilter>;
  _isValid?: InputMaybe<BooleanFilter>;
  _publicationScheduledAt?: InputMaybe<PublishedAtFilter>;
  _publishedAt?: InputMaybe<PublishedAtFilter>;
  _status?: InputMaybe<StatusFilter>;
  _unpublishingScheduledAt?: InputMaybe<PublishedAtFilter>;
  _updatedAt?: InputMaybe<UpdatedAtFilter>;
  affiliateUrl?: InputMaybe<StringFilter>;
  businessUrl?: InputMaybe<StringFilter>;
  categories?: InputMaybe<LinksFilter>;
  createdAt?: InputMaybe<CreatedAtFilter>;
  definition?: InputMaybe<TextFilter>;
  description?: InputMaybe<StructuredTextFilter>;
  entryType?: InputMaybe<StringFilter>;
  id?: InputMaybe<ItemIdFilter>;
  primaryImage?: InputMaybe<FileFilter>;
  slug?: InputMaybe<SlugFilter>;
  term?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<UpdatedAtFilter>;
};

export enum GlossaryEntryModelOrderBy {
  _CREATEDAT_ASC = '_createdAt_ASC',
  _CREATEDAT_DESC = '_createdAt_DESC',
  _FIRSTPUBLISHEDAT_ASC = '_firstPublishedAt_ASC',
  _FIRSTPUBLISHEDAT_DESC = '_firstPublishedAt_DESC',
  _ISVALID_ASC = '_isValid_ASC',
  _ISVALID_DESC = '_isValid_DESC',
  _PUBLICATIONSCHEDULEDAT_ASC = '_publicationScheduledAt_ASC',
  _PUBLICATIONSCHEDULEDAT_DESC = '_publicationScheduledAt_DESC',
  _PUBLISHEDAT_ASC = '_publishedAt_ASC',
  _PUBLISHEDAT_DESC = '_publishedAt_DESC',
  _STATUS_ASC = '_status_ASC',
  _STATUS_DESC = '_status_DESC',
  _UNPUBLISHINGSCHEDULEDAT_ASC = '_unpublishingScheduledAt_ASC',
  _UNPUBLISHINGSCHEDULEDAT_DESC = '_unpublishingScheduledAt_DESC',
  _UPDATEDAT_ASC = '_updatedAt_ASC',
  _UPDATEDAT_DESC = '_updatedAt_DESC',
  AFFILIATEURL_ASC = 'affiliateUrl_ASC',
  AFFILIATEURL_DESC = 'affiliateUrl_DESC',
  BUSINESSURL_ASC = 'businessUrl_ASC',
  BUSINESSURL_DESC = 'businessUrl_DESC',
  CREATEDAT_ASC = 'createdAt_ASC',
  CREATEDAT_DESC = 'createdAt_DESC',
  ENTRYTYPE_ASC = 'entryType_ASC',
  ENTRYTYPE_DESC = 'entryType_DESC',
  ID_ASC = 'id_ASC',
  ID_DESC = 'id_DESC',
  TERM_ASC = 'term_ASC',
  TERM_DESC = 'term_DESC',
  UPDATEDAT_ASC = 'updatedAt_ASC',
  UPDATEDAT_DESC = 'updatedAt_DESC'
}

/** Record of type Glossary Entry (glossary_entry) */
export type GlossaryEntryRecord = RecordInterface & {
  __typename: 'GlossaryEntryRecord';
  _allReferencingArticles: Array<ArticleRecord>;
  /** Returns meta information regarding a record collection */
  _allReferencingArticlesMeta: CollectionMetadata;
  _allReferencingGlossaryEntries: Array<GlossaryEntryRecord>;
  /** Returns meta information regarding a record collection */
  _allReferencingGlossaryEntriesMeta: CollectionMetadata;
  _createdAt: Scalars['DateTime'];
  _firstPublishedAt?: Maybe<Scalars['DateTime']>;
  _isValid: Scalars['BooleanType'];
  _modelApiKey: Scalars['String'];
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>;
  _publishedAt?: Maybe<Scalars['DateTime']>;
  /** SEO meta tags */
  _seoMetaTags: Array<Tag>;
  _status: ItemStatus;
  _unpublishingScheduledAt?: Maybe<Scalars['DateTime']>;
  _updatedAt: Scalars['DateTime'];
  affiliateUrl?: Maybe<Scalars['String']>;
  businessUrl?: Maybe<Scalars['String']>;
  categories: Array<GlossaryCategoryRecord>;
  createdAt: Scalars['DateTime'];
  definition?: Maybe<Scalars['String']>;
  description?: Maybe<GlossaryEntryModelDescriptionField>;
  entryType?: Maybe<Scalars['String']>;
  id: Scalars['ItemId'];
  primaryImage?: Maybe<FileField>;
  slug?: Maybe<Scalars['String']>;
  term?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
};


/** Record of type Glossary Entry (glossary_entry) */
export type GlossaryEntryRecordAllReferencingArticlesArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  first?: InputMaybe<Scalars['IntType']>;
  locale?: InputMaybe<SiteLocale>;
  orderBy?: InputMaybe<Array<InputMaybe<ArticleModelOrderBy>>>;
  skip?: InputMaybe<Scalars['IntType']>;
  through?: InputMaybe<InverseRelationshipFilterBetweenArticleAndGlossaryEntry>;
};


/** Record of type Glossary Entry (glossary_entry) */
export type GlossaryEntryRecordAllReferencingArticlesMetaArgs = {
  through?: InputMaybe<InverseRelationshipFilterBetweenArticleAndGlossaryEntry>;
};


/** Record of type Glossary Entry (glossary_entry) */
export type GlossaryEntryRecordAllReferencingGlossaryEntriesArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  first?: InputMaybe<Scalars['IntType']>;
  locale?: InputMaybe<SiteLocale>;
  orderBy?: InputMaybe<Array<InputMaybe<GlossaryEntryModelOrderBy>>>;
  skip?: InputMaybe<Scalars['IntType']>;
  through?: InputMaybe<InverseRelationshipFilterBetweenGlossaryEntryAndGlossaryEntry>;
};


/** Record of type Glossary Entry (glossary_entry) */
export type GlossaryEntryRecordAllReferencingGlossaryEntriesMetaArgs = {
  through?: InputMaybe<InverseRelationshipFilterBetweenGlossaryEntryAndGlossaryEntry>;
};


/** Record of type Glossary Entry (glossary_entry) */
export type GlossaryEntryRecordSeoMetaTagsArgs = {
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type Glossary Entry (glossary_entry) */
export type GlossaryEntryRecordDefinitionArgs = {
  markdown?: InputMaybe<Scalars['Boolean']>;
};

/** Record of type Glossary Index Page (glossary_index_page) */
export type GlossaryIndexPageRecord = RecordInterface & {
  __typename: 'GlossaryIndexPageRecord';
  _createdAt: Scalars['DateTime'];
  _firstPublishedAt?: Maybe<Scalars['DateTime']>;
  _isValid: Scalars['BooleanType'];
  _modelApiKey: Scalars['String'];
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>;
  _publishedAt?: Maybe<Scalars['DateTime']>;
  /** SEO meta tags */
  _seoMetaTags: Array<Tag>;
  _status: ItemStatus;
  _unpublishingScheduledAt?: Maybe<Scalars['DateTime']>;
  _updatedAt: Scalars['DateTime'];
  createdAt: Scalars['DateTime'];
  id: Scalars['ItemId'];
  seoMetadata?: Maybe<SeoField>;
  updatedAt: Scalars['DateTime'];
};


/** Record of type Glossary Index Page (glossary_index_page) */
export type GlossaryIndexPageRecordSeoMetaTagsArgs = {
  locale?: InputMaybe<SiteLocale>;
};

/** Record of type HomePage (homepage) */
export type HomepageRecord = RecordInterface & {
  __typename: 'HomepageRecord';
  _createdAt: Scalars['DateTime'];
  _firstPublishedAt?: Maybe<Scalars['DateTime']>;
  _isValid: Scalars['BooleanType'];
  _modelApiKey: Scalars['String'];
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>;
  _publishedAt?: Maybe<Scalars['DateTime']>;
  /** SEO meta tags */
  _seoMetaTags: Array<Tag>;
  _status: ItemStatus;
  _unpublishingScheduledAt?: Maybe<Scalars['DateTime']>;
  _updatedAt: Scalars['DateTime'];
  createdAt: Scalars['DateTime'];
  id: Scalars['ItemId'];
  seoMetadata?: Maybe<SeoField>;
  updatedAt: Scalars['DateTime'];
};


/** Record of type HomePage (homepage) */
export type HomepageRecordSeoMetaTagsArgs = {
  locale?: InputMaybe<SiteLocale>;
};

/** Image */
export type Image = {
  __typename: 'Image';
  /** Text description of an image that can be used for SEO and/or accessibility purposes. */
  altText: Scalars['String'];
  /** Indicates whether this is the primary image. */
  isDefault: Scalars['Boolean'];
  /** Absolute path to image using store CDN. */
  url: Scalars['String'];
  /** Absolute path to original image using store CDN. */
  urlOriginal: Scalars['String'];
};


/** Image */
export type ImageUrlArgs = {
  height?: InputMaybe<Scalars['Int']>;
  width: Scalars['Int'];
};

/** A connection to a list of items. */
export type ImageConnection = {
  __typename: 'ImageConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<ImageEdge>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type ImageEdge = {
  __typename: 'ImageEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: Image;
};

/** Block of type Image (image) */
export type ImageRecord = RecordInterface & {
  __typename: 'ImageRecord';
  _createdAt: Scalars['DateTime'];
  _firstPublishedAt?: Maybe<Scalars['DateTime']>;
  _isValid: Scalars['BooleanType'];
  _modelApiKey: Scalars['String'];
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>;
  _publishedAt?: Maybe<Scalars['DateTime']>;
  /** SEO meta tags */
  _seoMetaTags: Array<Tag>;
  _status: ItemStatus;
  _unpublishingScheduledAt?: Maybe<Scalars['DateTime']>;
  _updatedAt: Scalars['DateTime'];
  createdAt: Scalars['DateTime'];
  id: Scalars['ItemId'];
  image?: Maybe<FileField>;
  updatedAt: Scalars['DateTime'];
};


/** Block of type Image (image) */
export type ImageRecordSeoMetaTagsArgs = {
  locale?: InputMaybe<SiteLocale>;
};

export type ImgixParams = {
  /**
   * Aspect Ratio
   *
   * Specifies an aspect ratio to maintain when resizing and cropping the image
   *
   * Depends on: `fit=crop`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/size/ar)
   */
  ar?: InputMaybe<Scalars['String']>;
  /**
   * Automatic
   *
   * Applies automatic enhancements to images.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/auto)
   */
  auto?: InputMaybe<Array<ImgixParamsAuto>>;
  /**
   * Background Color
   *
   * Colors the background of padded and partially-transparent images.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/bg)
   */
  bg?: InputMaybe<Scalars['String']>;
  /**
   * Blend
   *
   * Specifies the location of the blend image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/blending/blend)
   */
  blend?: InputMaybe<Scalars['String']>;
  /**
   * Blend Align
   *
   * Changes the blend alignment relative to the parent image.
   *
   * Depends on: `blend`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/blending/blend-align)
   */
  blendAlign?: InputMaybe<Array<ImgixParamsBlendAlign>>;
  /**
   * Blend Alpha
   *
   * Changes the alpha of the blend image.
   *
   * Depends on: `blend`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/blending/blend-alpha)
   */
  blendAlpha?: InputMaybe<Scalars['IntType']>;
  /**
   * Blend Color
   *
   * Specifies a color to use when applying the blend.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/blending/blend-color)
   */
  blendColor?: InputMaybe<Scalars['String']>;
  /**
   * Blend Crop
   *
   * Specifies the type of crop for blend images.
   *
   * Depends on: `blend`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/blending/blend-crop)
   */
  blendCrop?: InputMaybe<Array<ImgixParamsBlendCrop>>;
  /**
   * Blend Fit
   *
   * Specifies the fit mode for blend images.
   *
   * Depends on: `blend`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/blending/blend-fit)
   */
  blendFit?: InputMaybe<ImgixParamsBlendFit>;
  /**
   * Blend Height
   *
   * Adjusts the height of the blend image.
   *
   * Depends on: `blend`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/blending/blend-h)
   */
  blendH?: InputMaybe<Scalars['FloatType']>;
  /**
   * Blend Mode
   *
   * Sets the blend mode for a blend image.
   *
   * Depends on: `blend`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/blending/blend-mode)
   */
  blendMode?: InputMaybe<ImgixParamsBlendMode>;
  /**
   * Blend Padding
   *
   * Applies padding to the blend image.
   *
   * Depends on: `blend`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/blending/blend-pad)
   */
  blendPad?: InputMaybe<Scalars['IntType']>;
  /**
   * Blend Size
   *
   * Adjusts the size of the blend image.
   *
   * Depends on: `blend`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/blending/blend-size)
   */
  blendSize?: InputMaybe<ImgixParamsBlendSize>;
  /**
   * Blend Width
   *
   * Adjusts the width of the blend image.
   *
   * Depends on: `blend`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/blending/blend-w)
   */
  blendW?: InputMaybe<Scalars['FloatType']>;
  /**
   * Blend X Position
   *
   * Adjusts the x-offset of the blend image relative to its parent.
   *
   * Depends on: `blend`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/blending/blend-x)
   */
  blendX?: InputMaybe<Scalars['IntType']>;
  /**
   * Blend Y Position
   *
   * Adjusts the y-offset of the blend image relative to its parent.
   *
   * Depends on: `blend`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/blending/blend-y)
   */
  blendY?: InputMaybe<Scalars['IntType']>;
  /**
   * Gaussian Blur
   *
   * Applies a gaussian blur to an image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/stylize/blur)
   */
  blur?: InputMaybe<Scalars['IntType']>;
  /**
   * Border Size & Color
   *
   * Applies a border to an image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/border-and-padding/border)
   */
  border?: InputMaybe<Scalars['String']>;
  /**
   * Border Bottom
   *
   * Sets bottom border of an image.
   *
   * Depends on: `border`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/border-and-padding/border-bottom)
   */
  borderBottom?: InputMaybe<Scalars['IntType']>;
  /**
   * Border Left
   *
   * Sets left border of an image.
   *
   * Depends on: `border`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/border-and-padding/border-left)
   */
  borderLeft?: InputMaybe<Scalars['IntType']>;
  /**
   * Outer Border Radius
   *
   * Sets the outer radius of the image's border in pixels.
   *
   * Depends on: `border`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/border-and-padding/border-radius)
   */
  borderRadius?: InputMaybe<Scalars['String']>;
  /**
   * Inner Border Radius
   *
   * Sets the inner radius of the image's border in pixels.
   *
   * Depends on: `border`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/border-and-padding/border-radius-inner)
   */
  borderRadiusInner?: InputMaybe<Scalars['String']>;
  /**
   * Border Right
   *
   * Sets right border of an image.
   *
   * Depends on: `border`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/border-and-padding/border-right)
   */
  borderRight?: InputMaybe<Scalars['IntType']>;
  /**
   * Border Top
   *
   * Sets top border of an image.
   *
   * Depends on: `border`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/border-and-padding/border-top)
   */
  borderTop?: InputMaybe<Scalars['IntType']>;
  /**
   * Brightness
   *
   * Adjusts the brightness of the source image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/adjustment/bri)
   */
  bri?: InputMaybe<Scalars['IntType']>;
  /**
   * Client Hints
   *
   * Sets one or more Client-Hints headers
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/format/ch)
   */
  ch?: InputMaybe<Array<ImgixParamsCh>>;
  /**
   * Chroma Subsampling
   *
   * Specifies the output chroma subsampling rate.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/format/chromasub)
   */
  chromasub?: InputMaybe<Scalars['IntType']>;
  /**
   * Color Quantization
   *
   * Limits the number of unique colors in an image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/format/colorquant)
   */
  colorquant?: InputMaybe<Scalars['IntType']>;
  /**
   * Palette Color Count
   *
   * Specifies how many colors to include in a palette-extraction response.
   *
   * Depends on: `palette`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/color-palette/colors)
   */
  colors?: InputMaybe<Scalars['IntType']>;
  /**
   * Contrast
   *
   * Adjusts the contrast of the source image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/adjustment/con)
   */
  con?: InputMaybe<Scalars['IntType']>;
  /**
   * Mask Corner Radius
   *
   * Specifies the radius value for a rounded corner mask.
   *
   * Depends on: `mask=corners`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/mask/corner-radius)
   */
  cornerRadius?: InputMaybe<Scalars['String']>;
  /**
   * Crop Mode
   *
   * Specifies how to crop an image.
   *
   * Depends on: `fit=crop`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/size/crop)
   */
  crop?: InputMaybe<Array<ImgixParamsCrop>>;
  /**
   * Color Space
   *
   * Specifies the color space of the output image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/format/cs)
   */
  cs?: InputMaybe<ImgixParamsCs>;
  /**
   * Download
   *
   * Forces a URL to use send-file in its response.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/format/dl)
   */
  dl?: InputMaybe<Scalars['String']>;
  /**
   * Dots Per Inch
   *
   * Sets the DPI value in the EXIF header.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/format/dpi)
   */
  dpi?: InputMaybe<Scalars['IntType']>;
  /**
   * Device Pixel Ratio
   *
   * Adjusts the device-pixel ratio of the output image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/dpr)
   */
  dpr?: InputMaybe<Scalars['FloatType']>;
  /**
   * Duotone
   *
   * Applies a duotone effect to the source image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/stylize/duotone)
   */
  duotone?: InputMaybe<Scalars['String']>;
  /**
   * Duotone Alpha
   *
   * Changes the alpha of the duotone effect atop the source image.
   *
   * Depends on: `duotone`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/stylize/duotone-alpha)
   */
  duotoneAlpha?: InputMaybe<Scalars['IntType']>;
  /**
   * Exposure
   *
   * Adjusts the exposure of the output image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/adjustment/exp)
   */
  exp?: InputMaybe<Scalars['IntType']>;
  /**
   * Url Expiration Timestamp
   *
   * A Unix timestamp specifying a UTC time. Requests made to this URL after that time will output a 404 status code.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/expires)
   */
  expires?: InputMaybe<Scalars['IntType']>;
  /**
   * Face Index
   *
   * Selects a face to crop to.
   *
   * Depends on: `fit=facearea`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/face-detection/faceindex)
   */
  faceindex?: InputMaybe<Scalars['IntType']>;
  /**
   * Face Padding
   *
   * Adjusts padding around a selected face.
   *
   * Depends on: `fit=facearea`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/face-detection/facepad)
   */
  facepad?: InputMaybe<Scalars['FloatType']>;
  /**
   * Json Face Data
   *
   * Specifies that face data should be included in output when combined with `fm=json`.
   *
   * Depends on: `fm=json`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/face-detection/faces)
   */
  faces?: InputMaybe<Scalars['IntType']>;
  /**
   * Fill Mode
   *
   * Determines how to fill in additional space created by the fit setting
   *
   * Depends on: `fit`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/fill/fill)
   */
  fill?: InputMaybe<ImgixParamsFill>;
  /**
   * Fill Color
   *
   * Sets the fill color for images with additional space created by the fit setting
   *
   * Depends on: `fill=solid`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/fill/fill-color)
   */
  fillColor?: InputMaybe<Scalars['String']>;
  /**
   * Resize Fit Mode
   *
   * Specifies how to map the source image to the output image dimensions.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/size/fit)
   */
  fit?: InputMaybe<ImgixParamsFit>;
  /**
   * Flip Axis
   *
   * Flips an image on a specified axis.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/rotation/flip)
   */
  flip?: InputMaybe<ImgixParamsFlip>;
  /**
   * Output Format
   *
   * Changes the format of the output image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/format/fm)
   */
  fm?: InputMaybe<ImgixParamsFm>;
  /**
   * Focal Point Debug
   *
   * Displays crosshairs identifying the location of the set focal point
   *
   * Depends on: `fit=crop`, `crop=focalpoint`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/focalpoint-crop/fp-debug)
   */
  fpDebug?: InputMaybe<Scalars['BooleanType']>;
  /**
   * Focal Point X Position
   *
   * Sets the relative horizontal value for the focal point of an image
   *
   * Depends on: `fit=crop`, `crop=focalpoint`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/focalpoint-crop/fp-x)
   */
  fpX?: InputMaybe<Scalars['FloatType']>;
  /**
   * Focal Point Y Position
   *
   * Sets the relative vertical value for the focal point of an image
   *
   * Depends on: `fit=crop`, `crop=focalpoint`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/focalpoint-crop/fp-y)
   */
  fpY?: InputMaybe<Scalars['FloatType']>;
  /**
   * Focal Point Zoom
   *
   * Sets the relative zoom value for the focal point of an image
   *
   * Depends on: `fit=crop`, `crop=focalpoint`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/focalpoint-crop/fp-z)
   */
  fpZ?: InputMaybe<Scalars['FloatType']>;
  /**
   * Gamma
   *
   * Adjusts the gamma of the source image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/adjustment/gam)
   */
  gam?: InputMaybe<Scalars['IntType']>;
  /**
   * Grid Colors
   *
   * Sets grid colors for the transparency checkerboard grid.
   *
   * Depends on: `transparency`
   */
  gridColors?: InputMaybe<Scalars['String']>;
  /**
   * Grid Size
   *
   * Sets grid size for the transparency checkerboard grid.
   *
   * Depends on: `transparency`
   */
  gridSize?: InputMaybe<Scalars['IntType']>;
  /**
   * Image Height
   *
   * Adjusts the height of the output image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/size/h)
   */
  h?: InputMaybe<Scalars['FloatType']>;
  /**
   * Highlight
   *
   * Adjusts the highlights of the source image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/adjustment/high)
   */
  high?: InputMaybe<Scalars['IntType']>;
  /**
   * Halftone
   *
   * Applies a half-tone effect to the source image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/stylize/htn)
   */
  htn?: InputMaybe<Scalars['IntType']>;
  /**
   * Hue Shift
   *
   * Adjusts the hue of the source image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/adjustment/hue)
   */
  hue?: InputMaybe<Scalars['IntType']>;
  /**
   * Invert
   *
   * Inverts the colors on the source image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/adjustment/invert)
   */
  invert?: InputMaybe<Scalars['BooleanType']>;
  /**
   * Iptc Passthrough
   *
   * Determine if IPTC data should be passed for JPEG images.
   */
  iptc?: InputMaybe<ImgixParamsIptc>;
  /**
   * Lossless Compression
   *
   * Specifies that the output image should be a lossless variant.
   *
   * Depends on: `fm=webp`, `fm=jxr`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/format/lossless)
   */
  lossless?: InputMaybe<Scalars['BooleanType']>;
  /**
   * Watermark Image Url
   *
   * Specifies the location of the watermark image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/watermark/mark)
   */
  mark?: InputMaybe<Scalars['String']>;
  /**
   * Watermark Alignment Mode
   *
   * Changes the watermark alignment relative to the parent image.
   *
   * Depends on: `mark`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/watermark/mark-align)
   */
  markAlign?: InputMaybe<Array<ImgixParamsMarkAlign>>;
  /**
   * Watermark Alpha
   *
   * Changes the alpha of the watermark image.
   *
   * Depends on: `mark`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/watermark/mark-alpha)
   */
  markAlpha?: InputMaybe<Scalars['IntType']>;
  /**
   * Watermark Base Url
   *
   * Changes base URL of the watermark image.
   *
   * Depends on: `mark`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/watermark/mark-base)
   */
  markBase?: InputMaybe<Scalars['String']>;
  /**
   * Watermark Fit Mode
   *
   * Specifies the fit mode for watermark images.
   *
   * Depends on: `mark`, `markw`, `markh`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/watermark/mark-fit)
   */
  markFit?: InputMaybe<ImgixParamsMarkFit>;
  /**
   * Watermark Height
   *
   * Adjusts the height of the watermark image.
   *
   * Depends on: `mark`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/watermark/mark-h)
   */
  markH?: InputMaybe<Scalars['FloatType']>;
  /**
   * Watermark Padding
   *
   * Applies padding to the watermark image.
   *
   * Depends on: `mark`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/watermark/mark-pad)
   */
  markPad?: InputMaybe<Scalars['IntType']>;
  /**
   * Watermark Rotation
   *
   * Rotates a watermark or tiled watermarks by a specified number of degrees.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/watermark/mark-rot)
   */
  markRot?: InputMaybe<Scalars['FloatType']>;
  /**
   * Watermark Scale
   *
   * Adjusts the scale of the watermark image.
   *
   * Depends on: `mark`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/watermark/mark-scale)
   */
  markScale?: InputMaybe<Scalars['IntType']>;
  /**
   * Watermark Tile
   *
   * Adds tiled watermark.
   *
   * Depends on: `mark`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/watermark/mark-tile)
   */
  markTile?: InputMaybe<ImgixParamsMarkTile>;
  /**
   * Watermark Width
   *
   * Adjusts the width of the watermark image.
   *
   * Depends on: `mark`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/watermark/mark-w)
   */
  markW?: InputMaybe<Scalars['FloatType']>;
  /**
   * Watermark X Position
   *
   * Adjusts the x-offset of the watermark image relative to its parent.
   *
   * Depends on: `mark`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/watermark/mark-x)
   */
  markX?: InputMaybe<Scalars['IntType']>;
  /**
   * Watermark Y Position
   *
   * Adjusts the y-offset of the watermark image relative to its parent.
   *
   * Depends on: `mark`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/watermark/mark-y)
   */
  markY?: InputMaybe<Scalars['IntType']>;
  /**
   * Mask Type
   *
   * Defines the type of mask and specifies the URL if that type is selected.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/mask)
   */
  mask?: InputMaybe<Scalars['String']>;
  /**
   * Mask Background Color
   *
   * Colors the background of the transparent mask area of images
   *
   * Depends on: `mask`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/mask/mask-bg)
   */
  maskBg?: InputMaybe<Scalars['String']>;
  /**
   * Maximum Height
   *
   * Specifies the maximum height of the output image in pixels.
   *
   * Depends on: `fit=crop`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/size/max-height)
   */
  maxH?: InputMaybe<Scalars['IntType']>;
  /**
   * Maximum Width
   *
   * Specifies the maximum width of the output image in pixels.
   *
   * Depends on: `fit=crop`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/size/max-width)
   */
  maxW?: InputMaybe<Scalars['IntType']>;
  /**
   * Minimum Height
   *
   * Specifies the minimum height of the output image in pixels.
   *
   * Depends on: `fit=crop`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/size/min-height)
   */
  minH?: InputMaybe<Scalars['IntType']>;
  /**
   * Minimum Width
   *
   * Specifies the minimum width of the output image in pixels.
   *
   * Depends on: `fit=crop`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/size/min-width)
   */
  minW?: InputMaybe<Scalars['IntType']>;
  /**
   * Monochrome
   *
   * Applies a monochrome effect to the source image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/stylize/monochrome)
   */
  monochrome?: InputMaybe<Scalars['String']>;
  /**
   * Noise Reduction Bound
   *
   * Reduces the noise in an image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/noise-reduction/nr)
   */
  nr?: InputMaybe<Scalars['IntType']>;
  /**
   * Noise Reduction Sharpen
   *
   * Provides a threshold by which to sharpen an image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/noise-reduction/nrs)
   */
  nrs?: InputMaybe<Scalars['IntType']>;
  /**
   * Orientation
   *
   * Changes the image orientation.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/rotation/orient)
   */
  orient?: InputMaybe<Scalars['IntType']>;
  /**
   * Padding
   *
   * Pads an image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/border-and-padding/pad)
   */
  pad?: InputMaybe<Scalars['IntType']>;
  /**
   * Padding Bottom
   *
   * Sets bottom padding of an image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/border-and-padding/pad-bottom)
   */
  padBottom?: InputMaybe<Scalars['IntType']>;
  /**
   * Padding Left
   *
   * Sets left padding of an image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/border-and-padding/pad-left)
   */
  padLeft?: InputMaybe<Scalars['IntType']>;
  /**
   * Padding Right
   *
   * Sets right padding of an image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/border-and-padding/pad-right)
   */
  padRight?: InputMaybe<Scalars['IntType']>;
  /**
   * Padding Top
   *
   * Sets top padding of an image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/border-and-padding/pad-top)
   */
  padTop?: InputMaybe<Scalars['IntType']>;
  /**
   * Pdf Page Number
   *
   * Selects a page from a PDF for display.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/pdf/page)
   */
  page?: InputMaybe<Scalars['IntType']>;
  /**
   * Color Palette Extraction
   *
   * Specifies an output format for palette-extraction.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/color-palette/palette)
   */
  palette?: InputMaybe<ImgixParamsPalette>;
  /**
   * Pdf Annotation
   *
   * Enables or disables PDF annotation.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/pdf/pdf-annotation)
   */
  pdfAnnotation?: InputMaybe<Scalars['BooleanType']>;
  /**
   * Css Prefix
   *
   * Specifies a CSS prefix for all classes in palette-extraction.
   *
   * Depends on: `palette=css`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/color-palette/prefix)
   */
  prefix?: InputMaybe<Scalars['String']>;
  /**
   * Pixellate
   *
   * Applies a pixelation effect to an image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/stylize/px)
   */
  px?: InputMaybe<Scalars['IntType']>;
  /**
   * Output Quality
   *
   * Adjusts the quality of an output image.
   *
   * Depends on: `fm=jpg`, `fm=pjpg`, `fm=webp`, `fm=jxr`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/format/q)
   */
  q?: InputMaybe<Scalars['IntType']>;
  /**
   * Source Rectangle Region
   *
   * Crops an image to a specified rectangle.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/size/rect)
   */
  rect?: InputMaybe<Scalars['String']>;
  /**
   * Rotation
   *
   * Rotates an image by a specified number of degrees.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/rotation/rot)
   */
  rot?: InputMaybe<Scalars['FloatType']>;
  /**
   * Saturation
   *
   * Adjusts the saturation of an image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/adjustment/sat)
   */
  sat?: InputMaybe<Scalars['IntType']>;
  /**
   * Sepia Tone
   *
   * Applies a sepia effect to an image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/stylize/sepia)
   */
  sepia?: InputMaybe<Scalars['IntType']>;
  /**
   * Shadow
   *
   * Adjusts the highlights of the source image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/adjustment/shad)
   */
  shad?: InputMaybe<Scalars['FloatType']>;
  /**
   * Sharpen
   *
   * Adjusts the sharpness of the source image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/adjustment/sharp)
   */
  sharp?: InputMaybe<Scalars['FloatType']>;
  /**
   * Transparency
   *
   * Adds checkerboard behind images which support transparency.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/fill/transparency)
   */
  transparency?: InputMaybe<ImgixParamsTransparency>;
  /**
   * Trim Image
   *
   * Trims the source image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/trim/trim)
   */
  trim?: InputMaybe<ImgixParamsTrim>;
  /**
   * Trim Color
   *
   * Specifies a trim color on a trim operation.
   *
   * Depends on: `trim=color`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/trim/trim-color)
   */
  trimColor?: InputMaybe<Scalars['String']>;
  /**
   * Trim Mean Difference
   *
   * Specifies the mean difference on a trim operation.
   *
   * Depends on: `trim=auto`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/trim/trim-md)
   */
  trimMd?: InputMaybe<Scalars['FloatType']>;
  /**
   * Trim Padding
   *
   * Pads the area of the source image before trimming.
   *
   * Depends on: `trim`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/trim/trim-pad)
   */
  trimPad?: InputMaybe<Scalars['IntType']>;
  /**
   * Trim Standard Deviation
   *
   * Specifies the standard deviation on a trim operation.
   *
   * Depends on: `trim=auto`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/trim/trim-sd)
   */
  trimSd?: InputMaybe<Scalars['FloatType']>;
  /**
   * Trim Tolerance
   *
   * Specifies the tolerance on a trim operation.
   *
   * Depends on: `trim=color`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/trim/trim-tol)
   */
  trimTol?: InputMaybe<Scalars['FloatType']>;
  /**
   * Text String
   *
   * Sets the text string to render.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/text/txt)
   */
  txt?: InputMaybe<Scalars['String']>;
  /**
   * Text Align
   *
   * Sets the vertical and horizontal alignment of rendered text relative to the base image.
   *
   * Depends on: `txt`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/text/txt-align)
   */
  txtAlign?: InputMaybe<Array<ImgixParamsTxtAlign>>;
  /**
   * Text Clipping Mode
   *
   * Sets the clipping properties of rendered text.
   *
   * Depends on: `txt`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/text/txt-clip)
   */
  txtClip?: InputMaybe<Array<ImgixParamsTxtClip>>;
  /**
   * Text Color
   *
   * Specifies the color of rendered text.
   *
   * Depends on: `txt`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/text/txt-color)
   */
  txtColor?: InputMaybe<Scalars['String']>;
  /**
   * Text Fit Mode
   *
   * Specifies the fit approach for rendered text.
   *
   * Depends on: `txt`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/text/txt-fit)
   */
  txtFit?: InputMaybe<ImgixParamsTxtFit>;
  /**
   * Text Font
   *
   * Selects a font for rendered text.
   *
   * Depends on: `txt`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/text/txt-font)
   */
  txtFont?: InputMaybe<Scalars['String']>;
  /**
   * Text Leading
   *
   * Sets the leading (line spacing) for rendered text. Only works on the multi-line text endpoint.
   *
   * Depends on: `txt`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/typesetting/txt-lead)
   */
  txtLead?: InputMaybe<Scalars['IntType']>;
  /**
   * Text Ligatures
   *
   * Controls the level of ligature substitution
   *
   * Depends on: `txt`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/text/txt-lig)
   */
  txtLig?: InputMaybe<Scalars['IntType']>;
  /**
   * Text Outline
   *
   * Outlines the rendered text with a specified color.
   *
   * Depends on: `txt`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/text/txt-line)
   */
  txtLine?: InputMaybe<Scalars['IntType']>;
  /**
   * Text Outline Color
   *
   * Specifies a text outline color.
   *
   * Depends on: `txt`, `txtline`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/text/txt-line-color)
   */
  txtLineColor?: InputMaybe<Scalars['String']>;
  /**
   * Text Padding
   *
   * Specifies the padding (in device-independent pixels) between a textbox and the edges of the base image.
   *
   * Depends on: `txt`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/text/txt-pad)
   */
  txtPad?: InputMaybe<Scalars['IntType']>;
  /**
   * Text Shadow
   *
   * Applies a shadow to rendered text.
   *
   * Depends on: `txt`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/text/txt-shad)
   */
  txtShad?: InputMaybe<Scalars['FloatType']>;
  /**
   * Text Font Size
   *
   * Sets the font size of rendered text.
   *
   * Depends on: `txt`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/text/txt-size)
   */
  txtSize?: InputMaybe<Scalars['IntType']>;
  /**
   * Text Tracking
   *
   * Sets the tracking (letter spacing) for rendered text. Only works on the multi-line text endpoint.
   *
   * Depends on: `txt`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/typesetting/txt-track)
   */
  txtTrack?: InputMaybe<Scalars['IntType']>;
  /**
   * Text Width
   *
   * Sets the width of rendered text.
   *
   * Depends on: `txt`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/text/txt-width)
   */
  txtWidth?: InputMaybe<Scalars['IntType']>;
  /**
   * Text X Position
   *
   * Sets the horizontal (x) position of the text in pixels relative to the left edge of the base image.
   *
   * Depends on: `txt`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/text/txt-x)
   */
  txtX?: InputMaybe<Scalars['IntType']>;
  /**
   * Text Y Position
   *
   * Sets the vertical (y) position of the text in pixels relative to the top edge of the base image.
   *
   * Depends on: `txt`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/text/txt-y)
   */
  txtY?: InputMaybe<Scalars['IntType']>;
  /**
   * Unsharp Mask
   *
   * Sharpens the source image using an unsharp mask.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/adjustment/usm)
   */
  usm?: InputMaybe<Scalars['IntType']>;
  /**
   * Unsharp Mask Radius
   *
   * Specifies the radius for an unsharp mask operation.
   *
   * Depends on: `usm`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/adjustment/usmrad)
   */
  usmrad?: InputMaybe<Scalars['FloatType']>;
  /**
   * Vibrance
   *
   * Adjusts the vibrance of an image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/adjustment/vib)
   */
  vib?: InputMaybe<Scalars['IntType']>;
  /**
   * Image Width
   *
   * Adjusts the width of the output image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/size/w)
   */
  w?: InputMaybe<Scalars['FloatType']>;
};

export enum ImgixParamsAuto {
  COMPRESS = 'compress',
  ENHANCE = 'enhance',
  FORMAT = 'format',
  REDEYE = 'redeye'
}

export enum ImgixParamsBlendAlign {
  BOTTOM = 'bottom',
  CENTER = 'center',
  LEFT = 'left',
  MIDDLE = 'middle',
  RIGHT = 'right',
  TOP = 'top'
}

export enum ImgixParamsBlendCrop {
  BOTTOM = 'bottom',
  FACES = 'faces',
  LEFT = 'left',
  RIGHT = 'right',
  TOP = 'top'
}

export enum ImgixParamsBlendFit {
  CLAMP = 'clamp',
  CLIP = 'clip',
  CROP = 'crop',
  MAX = 'max',
  SCALE = 'scale'
}

export enum ImgixParamsBlendMode {
  BURN = 'burn',
  COLOR = 'color',
  DARKEN = 'darken',
  DIFFERENCE = 'difference',
  DODGE = 'dodge',
  EXCLUSION = 'exclusion',
  HARDLIGHT = 'hardlight',
  HUE = 'hue',
  LIGHTEN = 'lighten',
  LUMINOSITY = 'luminosity',
  MULTIPLY = 'multiply',
  NORMAL = 'normal',
  OVERLAY = 'overlay',
  SATURATION = 'saturation',
  SCREEN = 'screen',
  SOFTLIGHT = 'softlight'
}

export enum ImgixParamsBlendSize {
  INHERIT = 'inherit'
}

export enum ImgixParamsCh {
  DPR = 'dpr',
  SAVEDATA = 'saveData',
  WIDTH = 'width'
}

export enum ImgixParamsCrop {
  BOTTOM = 'bottom',
  EDGES = 'edges',
  ENTROPY = 'entropy',
  FACES = 'faces',
  FOCALPOINT = 'focalpoint',
  LEFT = 'left',
  RIGHT = 'right',
  TOP = 'top'
}

export enum ImgixParamsCs {
  ADOBERGB1998 = 'adobergb1998',
  SRGB = 'srgb',
  STRIP = 'strip',
  TINYSRGB = 'tinysrgb'
}

export enum ImgixParamsFill {
  BLUR = 'blur',
  SOLID = 'solid'
}

export enum ImgixParamsFit {
  CLAMP = 'clamp',
  CLIP = 'clip',
  CROP = 'crop',
  FACEAREA = 'facearea',
  FILL = 'fill',
  FILLMAX = 'fillmax',
  MAX = 'max',
  MIN = 'min',
  SCALE = 'scale'
}

export enum ImgixParamsFlip {
  H = 'h',
  HV = 'hv',
  V = 'v'
}

export enum ImgixParamsFm {
  AVIF = 'avif',
  BLURHASH = 'blurhash',
  GIF = 'gif',
  JP2 = 'jp2',
  JPG = 'jpg',
  JSON = 'json',
  JXR = 'jxr',
  MP4 = 'mp4',
  PJPG = 'pjpg',
  PNG = 'png',
  PNG8 = 'png8',
  PNG32 = 'png32',
  WEBM = 'webm',
  WEBP = 'webp'
}

export enum ImgixParamsIptc {
  ALLOW = 'allow',
  BLOCK = 'block'
}

export enum ImgixParamsMarkAlign {
  BOTTOM = 'bottom',
  CENTER = 'center',
  LEFT = 'left',
  MIDDLE = 'middle',
  RIGHT = 'right',
  TOP = 'top'
}

export enum ImgixParamsMarkFit {
  CLIP = 'clip',
  CROP = 'crop',
  FILL = 'fill',
  MAX = 'max',
  SCALE = 'scale'
}

export enum ImgixParamsMarkTile {
  GRID = 'grid'
}

export enum ImgixParamsPalette {
  CSS = 'css',
  JSON = 'json'
}

export enum ImgixParamsTransparency {
  GRID = 'grid'
}

export enum ImgixParamsTrim {
  AUTO = 'auto',
  COLOR = 'color'
}

export enum ImgixParamsTxtAlign {
  BOTTOM = 'bottom',
  CENTER = 'center',
  LEFT = 'left',
  MIDDLE = 'middle',
  RIGHT = 'right',
  TOP = 'top'
}

export enum ImgixParamsTxtClip {
  ELLIPSIS = 'ellipsis',
  END = 'end',
  MIDDLE = 'middle',
  START = 'start'
}

export enum ImgixParamsTxtFit {
  MAX = 'max'
}

/** Specifies how to filter by usage */
export type InUseFilter = {
  /** Search uploads that are currently used by some record or not */
  eq?: InputMaybe<Scalars['BooleanType']>;
};

/** An inventory */
export type Inventory = {
  __typename: 'Inventory';
  /** Locations */
  locations: InventoryLocationConnection;
};


/** An inventory */
export type InventoryLocationsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  cities?: InputMaybe<Array<Scalars['String']>>;
  codes?: InputMaybe<Array<Scalars['String']>>;
  countryCodes?: InputMaybe<Array<CountryCode>>;
  distanceFilter?: InputMaybe<DistanceFilter>;
  entityIds?: InputMaybe<Array<Scalars['Int']>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  serviceTypeIds?: InputMaybe<Array<Scalars['String']>>;
  states?: InputMaybe<Array<Scalars['String']>>;
  typeIds?: InputMaybe<Array<Scalars['String']>>;
};

/** Address */
export type InventoryAddress = {
  __typename: 'InventoryAddress';
  /** Address line1. */
  address1: Scalars['String'];
  /** Address line2. */
  address2: Scalars['String'];
  /** Address city. */
  city: Scalars['String'];
  /** Address code. */
  code: Scalars['String'];
  /** Country code. */
  countryCode: Scalars['String'];
  /** Address description. */
  description?: Maybe<Scalars['String']>;
  /** Address email. */
  email: Scalars['String'];
  /** Address id. */
  entityId: Scalars['Int'];
  /** Address label. */
  label: Scalars['String'];
  /** Address latitude. */
  latitude?: Maybe<Scalars['Float']>;
  /** Address longitude. */
  longitude?: Maybe<Scalars['Float']>;
  /** Address phone. */
  phone: Scalars['String'];
  /** Address zip. */
  postalCode: Scalars['String'];
  /** Address state. */
  stateOrProvince: Scalars['String'];
};

/** Inventory By Locations */
export type InventoryByLocations = {
  __typename: 'InventoryByLocations';
  /** Number of available products in stock. */
  availableToSell: Scalars['Long'];
  /** Indicates whether this product is in stock. */
  isInStock: Scalars['Boolean'];
  /** Distance between location and specified longitude and latitude */
  locationDistance?: Maybe<Distance>;
  /** Location code. */
  locationEntityCode: Scalars['String'];
  /** Location id. */
  locationEntityId: Scalars['Long'];
  /**
   * Location service type ids.
   * @deprecated Deprecated. Will be substituted with pickup methods.
   */
  locationEntityServiceTypeIds: Array<Scalars['String']>;
  /** Location type id. */
  locationEntityTypeId?: Maybe<Scalars['String']>;
  /** Indicates a threshold low-stock level. */
  warningLevel: Scalars['Int'];
};

/** Location */
export type InventoryLocation = {
  __typename: 'InventoryLocation';
  /** Location address */
  address?: Maybe<InventoryAddress>;
  /**
   * Upcoming events
   * @deprecated Deprecated. Use specialHours instead
   */
  blackoutHours: Array<SpecialHour>;
  /** Location code. */
  code: Scalars['String'];
  /** Location description. */
  description?: Maybe<Scalars['String']>;
  /** Distance between location and specified longitude and latitude */
  distance?: Maybe<Distance>;
  /** Location id. */
  entityId: Scalars['Int'];
  /** Location label. */
  label: Scalars['String'];
  /** Metafield data related to a location. */
  metafields: MetafieldConnection;
  /** Location OperatingHours */
  operatingHours?: Maybe<OperatingHours>;
  /**
   * Location service type ids.
   * @deprecated Deprecated. Will be substituted with pickup methods.
   */
  serviceTypeIds: Array<Scalars['String']>;
  /** Upcoming events */
  specialHours: Array<SpecialHour>;
  /** Time zone of location */
  timeZone?: Maybe<Scalars['String']>;
  /** Location type id. */
  typeId?: Maybe<Scalars['String']>;
};


/** Location */
export type InventoryLocationMetafieldsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  keys?: InputMaybe<Array<Scalars['String']>>;
  last?: InputMaybe<Scalars['Int']>;
  namespace: Scalars['String'];
};

/** A connection to a list of items. */
export type InventoryLocationConnection = {
  __typename: 'InventoryLocationConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<InventoryLocationEdge>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type InventoryLocationEdge = {
  __typename: 'InventoryLocationEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: InventoryLocation;
};

/** Inventory settings from control panel. */
export type InventorySettings = {
  __typename: 'InventorySettings';
  /** Out of stock message. */
  defaultOutOfStockMessage: Scalars['String'];
  /** Flag to show or not on product filtering when option is out of stock */
  hideInProductFiltering: Scalars['Boolean'];
  /** The option out of stock behavior. */
  optionOutOfStockBehavior?: Maybe<OptionOutOfStockBehavior>;
  /** The product out of stock behavior. */
  productOutOfStockBehavior?: Maybe<ProductOutOfStockBehavior>;
  /** Show out of stock message on product listing pages */
  showOutOfStockMessage: Scalars['Boolean'];
  /** Show pre-order inventory */
  showPreOrderStockLevels: Scalars['Boolean'];
  /** Hide or show inventory node for product */
  stockLevelDisplay?: Maybe<StockLevelDisplay>;
};

/** Specifies how to filter by linking fields */
export type InverseRelationshipFieldFilterBetweenArticleAndGlossaryEntry = {
  /** Filter linking records that reference current record in at least one of the specified fields */
  anyIn?: InputMaybe<Array<ArticleModelFieldsReferencingGlossaryEntryModel>>;
  /** Filter linking records that do not reference current record in any of the specified fields */
  notIn?: InputMaybe<Array<ArticleModelFieldsReferencingGlossaryEntryModel>>;
};

/** Specifies how to filter by linking fields */
export type InverseRelationshipFieldFilterBetweenGlossaryEntryAndGlossaryCategory = {
  /** Filter linking records that reference current record in at least one of the specified fields */
  anyIn?: InputMaybe<Array<GlossaryEntryModelFieldsReferencingGlossaryCategoryModel>>;
  /** Filter linking records that do not reference current record in any of the specified fields */
  notIn?: InputMaybe<Array<GlossaryEntryModelFieldsReferencingGlossaryCategoryModel>>;
};

/** Specifies how to filter by linking fields */
export type InverseRelationshipFieldFilterBetweenGlossaryEntryAndGlossaryEntry = {
  /** Filter linking records that reference current record in at least one of the specified fields */
  anyIn?: InputMaybe<Array<GlossaryEntryModelFieldsReferencingGlossaryEntryModel>>;
  /** Filter linking records that do not reference current record in any of the specified fields */
  notIn?: InputMaybe<Array<GlossaryEntryModelFieldsReferencingGlossaryEntryModel>>;
};

/** Specifies how to filter linking records */
export type InverseRelationshipFilterBetweenArticleAndGlossaryEntry = {
  /** Specifies how to filter by linking fields */
  fields?: InputMaybe<InverseRelationshipFieldFilterBetweenArticleAndGlossaryEntry>;
  /** Specifies how to filter by linking locales */
  locales?: InputMaybe<LinkingLocalesFilter>;
};

/** Specifies how to filter linking records */
export type InverseRelationshipFilterBetweenGlossaryEntryAndGlossaryCategory = {
  /** Specifies how to filter by linking fields */
  fields?: InputMaybe<InverseRelationshipFieldFilterBetweenGlossaryEntryAndGlossaryCategory>;
  /** Specifies how to filter by linking locales */
  locales?: InputMaybe<LinkingLocalesFilter>;
};

/** Specifies how to filter linking records */
export type InverseRelationshipFilterBetweenGlossaryEntryAndGlossaryEntry = {
  /** Specifies how to filter by linking fields */
  fields?: InputMaybe<InverseRelationshipFieldFilterBetweenGlossaryEntryAndGlossaryEntry>;
  /** Specifies how to filter by linking locales */
  locales?: InputMaybe<LinkingLocalesFilter>;
};

/** Specifies how to filter by ID */
export type ItemIdFilter = {
  /** Search the record with the specified ID */
  eq?: InputMaybe<Scalars['ItemId']>;
  /** Search records with the specified IDs */
  in?: InputMaybe<Array<InputMaybe<Scalars['ItemId']>>>;
  /** Exclude the record with the specified ID */
  neq?: InputMaybe<Scalars['ItemId']>;
  /** Search records that do not have the specified IDs */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['ItemId']>>>;
};

export enum ItemStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  UPDATED = 'updated'
}

/** length unit */
export enum LengthUnit {
  KILOMETRES = 'Kilometres',
  MILES = 'Miles'
}

/** Limit date by */
export enum LimitDateOption {
  EARLIEST_DATE = 'EARLIEST_DATE',
  LATEST_DATE = 'LATEST_DATE',
  NO_LIMIT = 'NO_LIMIT',
  RANGE = 'RANGE'
}

/** Limit numbers by several options. */
export enum LimitInputBy {
  HIGHEST_VALUE = 'HIGHEST_VALUE',
  LOWEST_VALUE = 'LOWEST_VALUE',
  NO_LIMIT = 'NO_LIMIT',
  RANGE = 'RANGE'
}

/** Specifies how to filter Single-link fields */
export type LinkFilter = {
  /** Search for records with an exact match. The specified value must be a Record ID */
  eq?: InputMaybe<Scalars['ItemId']>;
  /** Filter records with the specified field defined (i.e. with any value) or not */
  exists?: InputMaybe<Scalars['BooleanType']>;
  /** Filter records linked to one of the specified records */
  in?: InputMaybe<Array<InputMaybe<Scalars['ItemId']>>>;
  /** Exclude records with an exact match. The specified value must be a Record ID */
  neq?: InputMaybe<Scalars['ItemId']>;
  /** Filter records not linked to one of the specified records */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['ItemId']>>>;
};

/** Linking locales */
export enum LinkingLocale {
  _NONLOCALIZED = '_nonLocalized',
  EN = 'en'
}

/** Specifies how to filter by linking locales */
export type LinkingLocalesFilter = {
  /** Filter linking records that link to current record in at least one of the specified locales */
  anyIn?: InputMaybe<Array<LinkingLocale>>;
  /** Filter linking records that do not link to current record in any of the specified locales */
  notIn?: InputMaybe<Array<LinkingLocale>>;
};

/** Specifies how to filter Multiple-links fields */
export type LinksFilter = {
  /** Filter records linked to all of the specified records. The specified values must be Record IDs */
  allIn?: InputMaybe<Array<InputMaybe<Scalars['ItemId']>>>;
  /** Filter records linked to at least one of the specified records. The specified values must be Record IDs */
  anyIn?: InputMaybe<Array<InputMaybe<Scalars['ItemId']>>>;
  /** Search for records with an exact match. The specified values must be Record IDs */
  eq?: InputMaybe<Array<InputMaybe<Scalars['ItemId']>>>;
  /** Filter records with the specified field defined (i.e. with any value) or not */
  exists?: InputMaybe<Scalars['BooleanType']>;
  /** Filter records not linked to any of the specified records. The specified values must be Record IDs */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['ItemId']>>>;
};

/** A connection to a list of items. */
export type LocationConnection = {
  __typename: 'LocationConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<LocationEdge>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type LocationEdge = {
  __typename: 'LocationEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: InventoryByLocations;
};

/** Login result */
export type LoginResult = {
  __typename: 'LoginResult';
  /** The currently logged in customer. */
  customer?: Maybe<Customer>;
  /**
   * The result of a login
   * @deprecated Use customer node instead.
   */
  result: Scalars['String'];
};

/** Logo field */
export type LogoField = {
  __typename: 'LogoField';
  /** Store logo image. */
  image: Image;
  /** Logo title. */
  title: Scalars['String'];
};

/** Logout result */
export type LogoutResult = {
  __typename: 'LogoutResult';
  /** The result of a logout */
  result: Scalars['String'];
};

/** Measurement */
export type Measurement = {
  __typename: 'Measurement';
  /** Unit of measurement. */
  unit: Scalars['String'];
  /** Unformatted weight measurement value. */
  value: Scalars['Float'];
};

export type Membership = {
  __typename: 'Membership';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  organization?: Maybe<Organization>;
  organizationId: Scalars['String'];
  role?: Maybe<MembershipRole>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  user?: Maybe<User>;
  userId: Scalars['String'];
};

export enum MembershipRole {
  OWNER = 'OWNER'
}

/** A connection to a list of items. */
export type MetafieldConnection = {
  __typename: 'MetafieldConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<MetafieldEdge>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type MetafieldEdge = {
  __typename: 'MetafieldEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: Metafields;
};

/** Key/Value pairs of data attached tied to a resource entity (product, brand, category, etc.) */
export type Metafields = {
  __typename: 'Metafields';
  /** The ID of the metafield when referencing via our backend API. */
  entityId: Scalars['Int'];
  /** The ID of an object */
  id: Scalars['ID'];
  /** A label for identifying a metafield data value. */
  key: Scalars['String'];
  /** A metafield value. */
  value: Scalars['String'];
};

/** A money object - includes currency code and a money amount */
export type Money = {
  __typename: 'Money';
  /** Currency code of the current money. */
  currencyCode: Scalars['String'];
  /**
   * The formatted currency string for the current money.
   * @deprecated Deprecated. Don't use - it will be removed soon.
   */
  formatted?: Maybe<Scalars['String']>;
  /** The amount of money. */
  value: Scalars['BigDecimal'];
};

/** A min and max pair of money objects */
export type MoneyRange = {
  __typename: 'MoneyRange';
  /** Maximum money object. */
  max: Money;
  /** Minimum money object. */
  min: Money;
};

/** A multi-line text input field, aka a text box. */
export type MultiLineTextFieldOption = CatalogProductOption & {
  __typename: 'MultiLineTextFieldOption';
  /** Default value of the multiline text field option. */
  defaultValue?: Maybe<Scalars['String']>;
  /** Display name for the option. */
  displayName: Scalars['String'];
  /** Unique ID for the option. */
  entityId: Scalars['Int'];
  /** One of the option values is required to be selected for the checkout. */
  isRequired: Scalars['Boolean'];
  /** Indicates whether it is a variant option or modifier. */
  isVariantOption: Scalars['Boolean'];
  /** The maximum number of characters. */
  maxLength?: Maybe<Scalars['Int']>;
  /** The maximum number of lines. */
  maxLines?: Maybe<Scalars['Int']>;
  /** The minimum number of characters. */
  minLength?: Maybe<Scalars['Int']>;
};

/** An option type that has a fixed list of values. */
export type MultipleChoiceOption = CatalogProductOption & {
  __typename: 'MultipleChoiceOption';
  /** Display name for the option. */
  displayName: Scalars['String'];
  /** The chosen display style for this multiple choice option. */
  displayStyle: Scalars['String'];
  /** Unique ID for the option. */
  entityId: Scalars['Int'];
  /** One of the option values is required to be selected for the checkout. */
  isRequired: Scalars['Boolean'];
  /** Indicates whether it is a variant option or modifier. */
  isVariantOption: Scalars['Boolean'];
  /** List of option values. */
  values: ProductOptionValueConnection;
};


/** An option type that has a fixed list of values. */
export type MultipleChoiceOptionValuesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

/** A simple multiple choice value comprised of an id and a label. */
export type MultipleChoiceOptionValue = CatalogProductOptionValue & {
  __typename: 'MultipleChoiceOptionValue';
  /** Unique ID for the option value. */
  entityId: Scalars['Int'];
  /** Indicates whether this value is the chosen default selected value. */
  isDefault: Scalars['Boolean'];
  /** Indicates whether this value is selected based on sku/variantEntityId/optionValueIds overlay requested on the product node level. */
  isSelected?: Maybe<Scalars['Boolean']>;
  /** Label for the option value. */
  label: Scalars['String'];
};

export type Mutation = {
  __typename: 'Mutation';
  /** Customer login */
  login: LoginResult;
  /** Customer logout */
  logout: LogoutResult;
  /** Creates a new subscriber */
  subscriberCreate?: Maybe<SubscriberCreatePayload>;
  /** Bootstraps a new user with necessary resources */
  userBoostrap?: Maybe<User>;
  /** The wishlist mutations. */
  wishlist: WishlistMutations;
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationSubscriberCreateArgs = {
  input: SubscriberCreateInput;
};

export enum MuxThumbnailFormatType {
  GIF = 'gif',
  JPG = 'jpg',
  PNG = 'png'
}

export type Newsletter = {
  __typename: 'Newsletter';
  allNewsletterIssues?: Maybe<NewsletterIssueConnection>;
  newsletterIssue: NewsletterIssue;
};


export type NewsletterAllNewsletterIssuesArgs = {
  after?: InputMaybe<Scalars['String']>;
  first: Scalars['Int'];
};


export type NewsletterNewsletterIssueArgs = {
  slug: Scalars['String'];
};

export type NewsletterIssue = {
  __typename: 'NewsletterIssue';
  authorNames: Array<Maybe<Scalars['String']>>;
  contentHtml: Scalars['String'];
  createdAt: Scalars['DateTime'];
  displayAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  publishedAt?: Maybe<Scalars['DateTime']>;
  slug: Scalars['String'];
  status: NewsletterIssueStatus;
  subtitle: Scalars['String'];
  thumbnailUrl?: Maybe<Scalars['String']>;
  title: Scalars['String'];
};

export type NewsletterIssueConnection = {
  __typename: 'NewsletterIssueConnection';
  nodes: Array<Maybe<NewsletterIssue>>;
  totalCount: Scalars['Int'];
};

export type NewsletterIssueEdge = {
  __typename: 'NewsletterIssueEdge';
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Cursor */
  cursor: Scalars['String'];
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Node */
  node?: Maybe<NewsletterIssue>;
};

export enum NewsletterIssueStatus {
  ARCHIVED = 'ARCHIVED',
  CONFIRMED = 'CONFIRMED',
  DRAFT = 'DRAFT'
}

/** An object with an ID */
export type Node = {
  /** The id of the object. */
  id: Scalars['ID'];
};

/** A single line text input field that only accepts numbers. */
export type NumberFieldOption = CatalogProductOption & {
  __typename: 'NumberFieldOption';
  /** Default value of the text field option. */
  defaultValue?: Maybe<Scalars['Float']>;
  /** Display name for the option. */
  displayName: Scalars['String'];
  /** Unique ID for the option. */
  entityId: Scalars['Int'];
  /** The top limit of possible numbers. */
  highest?: Maybe<Scalars['Float']>;
  /** Allow whole numbers only. */
  isIntegerOnly: Scalars['Boolean'];
  /** One of the option values is required to be selected for the checkout. */
  isRequired: Scalars['Boolean'];
  /** Indicates whether it is a variant option or modifier. */
  isVariantOption: Scalars['Boolean'];
  /** Limit numbers by several options. */
  limitNumberBy: LimitInputBy;
  /** The bottom limit of possible numbers. */
  lowest?: Maybe<Scalars['Float']>;
};

/** Operating day */
export type OperatingDay = {
  __typename: 'OperatingDay';
  /** Closing. */
  closing: Scalars['String'];
  /** Open. */
  open: Scalars['Boolean'];
  /** Opening. */
  opening: Scalars['String'];
};

/** Operating hours */
export type OperatingHours = {
  __typename: 'OperatingHours';
  /** Friday. */
  friday?: Maybe<OperatingDay>;
  /** Monday. */
  monday?: Maybe<OperatingDay>;
  /** Saturday. */
  saturday?: Maybe<OperatingDay>;
  /** Sunday. */
  sunday?: Maybe<OperatingDay>;
  /** Thursday. */
  thursday?: Maybe<OperatingDay>;
  /** Tuesday. */
  tuesday?: Maybe<OperatingDay>;
  /** Wednesday. */
  wednesday?: Maybe<OperatingDay>;
};

/** A connection to a list of items. */
export type OptionConnection = {
  __typename: 'OptionConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<OptionEdge>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type OptionEdge = {
  __typename: 'OptionEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: ProductOption;
};

/** Behavior of the variant when stock is equal to 0 */
export enum OptionOutOfStockBehavior {
  DO_NOTHING = 'DO_NOTHING',
  HIDE_OPTION = 'HIDE_OPTION',
  LABEL_OPTION = 'LABEL_OPTION'
}

/** A connection to a list of items. */
export type OptionValueConnection = {
  __typename: 'OptionValueConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<OptionValueEdge>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type OptionValueEdge = {
  __typename: 'OptionValueEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: ProductOptionValue;
};

/** A variant option value id input object */
export type OptionValueId = {
  /** A variant option id filter */
  optionEntityId: Scalars['Int'];
  /** A variant value id filter. */
  valueEntityId: Scalars['Int'];
};

export type Organization = {
  __typename: 'Organization';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  memberships?: Maybe<Array<Maybe<Membership>>>;
  name?: Maybe<Scalars['String']>;
  role?: Maybe<GlobalRole>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

/** Specifies how to filter by image orientation */
export type OrientationFilter = {
  /** Search uploads with the specified orientation */
  eq?: InputMaybe<UploadOrientation>;
  /** Exclude uploads with the specified orientation */
  neq?: InputMaybe<UploadOrientation>;
};

/** Other Filter */
export type OtherSearchFilter = SearchProductFilter & {
  __typename: 'OtherSearchFilter';
  /** Indicates whether to display product count next to the filter. */
  displayProductCount: Scalars['Boolean'];
  /** Free shipping filter. */
  freeShipping?: Maybe<OtherSearchFilterItem>;
  /** Indicates whether filter is collapsed by default. */
  isCollapsedByDefault: Scalars['Boolean'];
  /** Is Featured filter. */
  isFeatured?: Maybe<OtherSearchFilterItem>;
  /** Is In Stock filter. */
  isInStock?: Maybe<OtherSearchFilterItem>;
  /** Display name for the filter. */
  name: Scalars['String'];
};

/** Other Filter Item */
export type OtherSearchFilterItem = {
  __typename: 'OtherSearchFilterItem';
  /** Indicates whether this filter is selected. */
  isSelected: Scalars['Boolean'];
  /** Indicates how many products available for this filter. */
  productCount: Scalars['Int'];
};

/** Information about pagination in a connection. */
export type PageInfo = {
  __typename: 'PageInfo';
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']>;
};

/** Page type */
export enum PageType {
  ACCOUNT_ADDRESS = 'ACCOUNT_ADDRESS',
  ACCOUNT_ADD_ADDRESS = 'ACCOUNT_ADD_ADDRESS',
  ACCOUNT_ADD_RETURN = 'ACCOUNT_ADD_RETURN',
  ACCOUNT_ADD_WISHLIST = 'ACCOUNT_ADD_WISHLIST',
  ACCOUNT_DOWNLOAD_ITEM = 'ACCOUNT_DOWNLOAD_ITEM',
  ACCOUNT_EDIT = 'ACCOUNT_EDIT',
  ACCOUNT_INBOX = 'ACCOUNT_INBOX',
  ACCOUNT_ORDERS_ALL = 'ACCOUNT_ORDERS_ALL',
  ACCOUNT_ORDERS_COMPLETED = 'ACCOUNT_ORDERS_COMPLETED',
  ACCOUNT_ORDERS_DETAILS = 'ACCOUNT_ORDERS_DETAILS',
  ACCOUNT_ORDERS_INVOICE = 'ACCOUNT_ORDERS_INVOICE',
  ACCOUNT_RECENT_ITEMS = 'ACCOUNT_RECENT_ITEMS',
  ACCOUNT_RETURNS = 'ACCOUNT_RETURNS',
  ACCOUNT_RETURN_SAVED = 'ACCOUNT_RETURN_SAVED',
  ACCOUNT_WISHLISTS = 'ACCOUNT_WISHLISTS',
  ACCOUNT_WISHLIST_DETAILS = 'ACCOUNT_WISHLIST_DETAILS',
  AUTH_ACCOUNT_CREATED = 'AUTH_ACCOUNT_CREATED',
  AUTH_CREATE_ACC = 'AUTH_CREATE_ACC',
  AUTH_FORGOT_PASS = 'AUTH_FORGOT_PASS',
  AUTH_LOGIN = 'AUTH_LOGIN',
  AUTH_NEW_PASS = 'AUTH_NEW_PASS',
  BLOG = 'BLOG',
  BRANDS = 'BRANDS',
  CART = 'CART',
  COMPARE = 'COMPARE',
  GIFT_CERT_BALANCE = 'GIFT_CERT_BALANCE',
  GIFT_CERT_PURCHASE = 'GIFT_CERT_PURCHASE',
  GIFT_CERT_REDEEM = 'GIFT_CERT_REDEEM',
  HOME = 'HOME',
  ORDER_INFO = 'ORDER_INFO',
  SEARCH = 'SEARCH',
  SITEMAP = 'SITEMAP',
  SUBSCRIBED = 'SUBSCRIBED',
  UNSUBSCRIBE = 'UNSUBSCRIBE'
}

/** Specifies how to filter by parent (tree-like collections only) */
export type ParentFilter = {
  /** Filter records children of the specified record. Value must be a Record ID */
  eq?: InputMaybe<Scalars['ItemId']>;
  /** Filter records with a parent record or not */
  exists?: InputMaybe<Scalars['BooleanType']>;
};

/** A connection to a list of items. */
export type PopularBrandConnection = {
  __typename: 'PopularBrandConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<PopularBrandEdge>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type PopularBrandEdge = {
  __typename: 'PopularBrandEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: PopularBrandType;
};

/** PopularBrandType */
export type PopularBrandType = {
  __typename: 'PopularBrandType';
  /** Brand count */
  count: Scalars['Int'];
  /** Brand id */
  entityId: Scalars['Int'];
  /** Brand name */
  name: Scalars['String'];
  /** Brand URL as a relative path */
  path?: Maybe<Scalars['String']>;
  /** Full Brand URL */
  url?: Maybe<Scalars['String']>;
};

/** Specifies how to filter by position (sorted and tree-like collections) */
export type PositionFilter = {
  /** Search for records with an exact match */
  eq?: InputMaybe<Scalars['IntType']>;
  /** Filter records with a value that's strictly greater than the one specified */
  gt?: InputMaybe<Scalars['IntType']>;
  /** Filter records with a value that's greater than or equal to the one specified */
  gte?: InputMaybe<Scalars['IntType']>;
  /** Filter records with a value that's less than the one specified */
  lt?: InputMaybe<Scalars['IntType']>;
  /** Filter records with a value that's less or equal than the one specified */
  lte?: InputMaybe<Scalars['IntType']>;
  /** Exclude records with an exact match */
  neq?: InputMaybe<Scalars['IntType']>;
};

/** The min and max range of prices that apply to this product. */
export type PriceRanges = {
  __typename: 'PriceRanges';
  /** Product price min/max range. */
  priceRange: MoneyRange;
  /** Product retail price min/max range. */
  retailPriceRange?: Maybe<MoneyRange>;
};

/** Price Filter */
export type PriceSearchFilter = SearchProductFilter & {
  __typename: 'PriceSearchFilter';
  /** Indicates whether filter is collapsed by default. */
  isCollapsedByDefault: Scalars['Boolean'];
  /** Display name for the filter. */
  name: Scalars['String'];
  /** Selected price filters. */
  selected?: Maybe<PriceSearchFilterItem>;
};

/** Search by price range. At least a minPrice or maxPrice must be supplied. */
export type PriceSearchFilterInput = {
  /** Maximum price of the product. */
  maxPrice?: InputMaybe<Scalars['Float']>;
  /** Minimum price of the product. */
  minPrice?: InputMaybe<Scalars['Float']>;
};

/** Price filter range */
export type PriceSearchFilterItem = {
  __typename: 'PriceSearchFilterItem';
  /** Maximum price of the product. */
  maxPrice?: Maybe<Scalars['Float']>;
  /** Minimum price of the product. */
  minPrice?: Maybe<Scalars['Float']>;
};

/** The various prices that can be set on a product. */
export type Prices = {
  __typename: 'Prices';
  /** Original price of the product. */
  basePrice?: Maybe<Money>;
  /** List of bulk pricing tiers applicable to a product or variant. */
  bulkPricing: Array<BulkPricingTier>;
  /** Minimum advertised price of the product. */
  mapPrice?: Maybe<Money>;
  /** Calculated price of the product.  Calculated price takes into account basePrice, salePrice, rules (modifier, option, option set) that apply to the product configuration, and customer group discounts.  It represents the in-cart price for a product configuration without bulk pricing rules. */
  price: Money;
  /** Product price min/max range. */
  priceRange: MoneyRange;
  /** Retail price of the product. */
  retailPrice?: Maybe<Money>;
  /** Product retail price min/max range. */
  retailPriceRange?: Maybe<MoneyRange>;
  /** Sale price of the product. */
  salePrice?: Maybe<Money>;
  /** The difference between the retail price (MSRP) and the current price, which can be presented to the shopper as their savings. */
  saved?: Maybe<Money>;
};

export type PrivacyPolicyPageModelContentField = {
  __typename: 'PrivacyPolicyPageModelContentField';
  blocks: Array<Scalars['String']>;
  links: Array<Scalars['String']>;
  value: Scalars['JsonField'];
};

/** Record of type Privacy Policy Page (privacy_policy_page) */
export type PrivacyPolicyPageRecord = RecordInterface & {
  __typename: 'PrivacyPolicyPageRecord';
  _createdAt: Scalars['DateTime'];
  _firstPublishedAt?: Maybe<Scalars['DateTime']>;
  _isValid: Scalars['BooleanType'];
  _modelApiKey: Scalars['String'];
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>;
  _publishedAt?: Maybe<Scalars['DateTime']>;
  /** SEO meta tags */
  _seoMetaTags: Array<Tag>;
  _status: ItemStatus;
  _unpublishingScheduledAt?: Maybe<Scalars['DateTime']>;
  _updatedAt: Scalars['DateTime'];
  content?: Maybe<PrivacyPolicyPageModelContentField>;
  createdAt: Scalars['DateTime'];
  id: Scalars['ItemId'];
  seoMetadata?: Maybe<SeoField>;
  updatedAt: Scalars['DateTime'];
};


/** Record of type Privacy Policy Page (privacy_policy_page) */
export type PrivacyPolicyPageRecordSeoMetaTagsArgs = {
  locale?: InputMaybe<SiteLocale>;
};

/** Product */
export type Product = Node & {
  __typename: 'Product';
  /** Absolute URL path for adding a product to cart. */
  addToCartUrl: Scalars['String'];
  /**
   * Absolute URL path for adding a product to customer's wishlist.
   * @deprecated Deprecated.
   */
  addToWishlistUrl: Scalars['String'];
  /**
   * The availability state of the product.
   * @deprecated Use status inside availabilityV2 instead.
   */
  availability: Scalars['String'];
  /**
   * A few words telling the customer how long it will normally take to ship this product, such as 'Usually ships in 24 hours'.
   * @deprecated Use description inside availabilityV2 instead.
   */
  availabilityDescription: Scalars['String'];
  /** The availability state of the product. */
  availabilityV2: ProductAvailability;
  /** Brand associated with the product. */
  brand?: Maybe<Brand>;
  /** List of categories associated with the product. */
  categories: CategoryConnection;
  /** Product condition */
  condition?: Maybe<ProductConditionType>;
  /**
   * Product creation date
   * @deprecated Alpha version. Do not use in production.
   */
  createdAt: DateTimeExtended;
  /** Custom fields of the product. */
  customFields: CustomFieldConnection;
  /** Default image for a product. */
  defaultImage?: Maybe<Image>;
  /** Depth of the product. */
  depth?: Maybe<Measurement>;
  /** Description of the product. */
  description: Scalars['String'];
  /** Id of the product. */
  entityId: Scalars['Int'];
  /** Gift wrapping options available for the product. */
  giftWrappingOptions: GiftWrappingConnection;
  /** Global trade item number. */
  gtin?: Maybe<Scalars['String']>;
  /** Height of the product. */
  height?: Maybe<Measurement>;
  /** The ID of an object */
  id: Scalars['ID'];
  /** A list of the images for a product. */
  images: ImageConnection;
  /** Inventory information of the product. */
  inventory: ProductInventory;
  /** Maximum purchasable quantity for this product in a single order. */
  maxPurchaseQuantity?: Maybe<Scalars['Int']>;
  /** Metafield data related to a product. */
  metafields: MetafieldConnection;
  /** Minimum purchasable quantity for this product in a single order. */
  minPurchaseQuantity?: Maybe<Scalars['Int']>;
  /** Manufacturer part number. */
  mpn?: Maybe<Scalars['String']>;
  /** Name of the product. */
  name: Scalars['String'];
  /**
   * Product options.
   * @deprecated Use productOptions instead.
   */
  options: OptionConnection;
  /** Relative URL path to product page. */
  path: Scalars['String'];
  /** Description of the product in plain text. */
  plainTextDescription: Scalars['String'];
  /**
   * The minimum and maximum price of this product based on variant pricing and/or modifier price rules.
   * @deprecated Use priceRanges inside prices node instead.
   */
  priceRanges?: Maybe<PriceRanges>;
  /** Prices object determined by supplied product ID, variant ID, and selected option IDs. */
  prices?: Maybe<Prices>;
  /** Product options. */
  productOptions: ProductOptionConnection;
  /** Related products for this product. */
  relatedProducts: RelatedProductsConnection;
  /** Summary of the product reviews, includes the total number of reviews submitted and summation of the ratings on the reviews (ratings range from 0-5 per review). */
  reviewSummary: Reviews;
  /** Reviews associated with the product. */
  reviews: ReviewConnection;
  /** Product SEO details. */
  seo: SeoDetails;
  /** Whether or not the cart call to action should be visible for this product. */
  showCartAction: Scalars['Boolean'];
  /** Default product variant when no options are selected. */
  sku: Scalars['String'];
  /** Type of product, ex: physical, digital */
  type: Scalars['String'];
  /** Universal product code. */
  upc?: Maybe<Scalars['String']>;
  /** Variants associated with the product. */
  variants: VariantConnection;
  /** Warranty information of the product. */
  warranty: Scalars['String'];
  /** Weight of the product. */
  weight?: Maybe<Measurement>;
  /** Width of the product. */
  width?: Maybe<Measurement>;
};


/** Product */
export type ProductCategoriesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


/** Product */
export type ProductCustomFieldsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  names?: InputMaybe<Array<Scalars['String']>>;
};


/** Product */
export type ProductGiftWrappingOptionsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


/** Product */
export type ProductImagesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


/** Product */
export type ProductMetafieldsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  keys?: InputMaybe<Array<Scalars['String']>>;
  last?: InputMaybe<Scalars['Int']>;
  namespace: Scalars['String'];
};


/** Product */
export type ProductOptionsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


/** Product */
export type ProductPlainTextDescriptionArgs = {
  characterLimit?: InputMaybe<Scalars['Int']>;
};


/** Product */
export type ProductPriceRangesArgs = {
  includeTax?: InputMaybe<Scalars['Boolean']>;
};


/** Product */
export type ProductPricesArgs = {
  currencyCode?: InputMaybe<CurrencyCode>;
  includeTax?: InputMaybe<Scalars['Boolean']>;
};


/** Product */
export type ProductProductOptionsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


/** Product */
export type ProductRelatedProductsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  hideOutOfStock?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
};


/** Product */
export type ProductReviewsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filters?: InputMaybe<ProductReviewsFiltersInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<ProductReviewsSortInput>;
};


/** Product */
export type ProductVariantsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  entityIds?: InputMaybe<Array<Scalars['Int']>>;
  first?: InputMaybe<Scalars['Int']>;
  isPurchasable?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  optionValueIds?: InputMaybe<Array<OptionValueId>>;
};

/** Product Attribute Filter */
export type ProductAttributeSearchFilter = SearchProductFilter & {
  __typename: 'ProductAttributeSearchFilter';
  /** List of available product attributes. */
  attributes: ProductAttributeSearchFilterItemConnection;
  /** Indicates whether to display product count next to the filter. */
  displayProductCount: Scalars['Boolean'];
  /** Indicates whether filter is collapsed by default. */
  isCollapsedByDefault: Scalars['Boolean'];
  /** Display name for the filter. */
  name: Scalars['String'];
};


/** Product Attribute Filter */
export type ProductAttributeSearchFilterAttributesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

/** Filter by the attributes of products such as Product Options and Product Custom Fields. This filter will do nothing unless your store has the Product Filtering feature available on your plan and enabled. If it is supplied when your store does not have the feature enabled, it will be silently ignored. */
export type ProductAttributeSearchFilterInput = {
  /** Product attributes */
  attribute: Scalars['String'];
  /** Product attribute values */
  values: Array<Scalars['String']>;
};

/** Specific product attribute filter item */
export type ProductAttributeSearchFilterItem = {
  __typename: 'ProductAttributeSearchFilterItem';
  /** Indicates whether product attribute is selected. */
  isSelected: Scalars['Boolean'];
  /** Indicates how many products available for this filter. */
  productCount: Scalars['Int'];
  /** Product attribute value. */
  value: Scalars['String'];
};

/** A connection to a list of items. */
export type ProductAttributeSearchFilterItemConnection = {
  __typename: 'ProductAttributeSearchFilterItemConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<ProductAttributeSearchFilterItemEdge>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type ProductAttributeSearchFilterItemEdge = {
  __typename: 'ProductAttributeSearchFilterItemEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: ProductAttributeSearchFilterItem;
};

/** Product availability */
export type ProductAvailability = {
  /** A few words telling the customer how long it will normally take to ship this product, such as 'Usually ships in 24 hours'. */
  description: Scalars['String'];
  /** The availability state of the product. */
  status: ProductAvailabilityStatus;
};

/** Product availability status */
export enum ProductAvailabilityStatus {
  AVAILABLE = 'Available',
  PREORDER = 'Preorder',
  UNAVAILABLE = 'Unavailable'
}

/** Available Product */
export type ProductAvailable = ProductAvailability & {
  __typename: 'ProductAvailable';
  /** A few words telling the customer how long it will normally take to ship this product, such as 'Usually ships in 24 hours'. */
  description: Scalars['String'];
  /** The availability state of the product. */
  status: ProductAvailabilityStatus;
};

/** Product condition */
export enum ProductConditionType {
  NEW = 'NEW',
  REFURBISHED = 'REFURBISHED',
  USED = 'USED'
}

/** A connection to a list of items. */
export type ProductConnection = {
  __typename: 'ProductConnection';
  /** Collection info */
  collectionInfo?: Maybe<CollectionInfo>;
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<ProductEdge>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type ProductEdge = {
  __typename: 'ProductEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: Product;
};

/** Product Inventory Information */
export type ProductInventory = {
  __typename: 'ProductInventory';
  /** Aggregated product inventory information. This data may not be available if not set or if the store's Inventory Settings have disabled displaying stock levels on the storefront. */
  aggregated?: Maybe<AggregatedInventory>;
  /** Indicates whether this product's inventory is being tracked on variant level. If true, you may wish to check the variants node to understand the true inventory of each individual variant, rather than relying on this product-level aggregate to understand how many items may be added to cart. */
  hasVariantInventory: Scalars['Boolean'];
  /** Indicates whether this product is in stock. */
  isInStock: Scalars['Boolean'];
};

/** Product Option */
export type ProductOption = {
  __typename: 'ProductOption';
  /** Display name for the option. */
  displayName: Scalars['String'];
  /** Unique ID for the option. */
  entityId: Scalars['Int'];
  /** One of the option values is required to be selected for the checkout. */
  isRequired: Scalars['Boolean'];
  /** Option values. */
  values: OptionValueConnection;
};


/** Product Option */
export type ProductOptionValuesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

/** A connection to a list of items. */
export type ProductOptionConnection = {
  __typename: 'ProductOptionConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<ProductOptionEdge>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type ProductOptionEdge = {
  __typename: 'ProductOptionEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: CatalogProductOption;
};

/** Product Option Value */
export type ProductOptionValue = {
  __typename: 'ProductOptionValue';
  /** Unique ID for the option value. */
  entityId: Scalars['Int'];
  /** Label for the option value. */
  label: Scalars['String'];
};

/** A connection to a list of items. */
export type ProductOptionValueConnection = {
  __typename: 'ProductOptionValueConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<ProductOptionValueEdge>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type ProductOptionValueEdge = {
  __typename: 'ProductOptionValueEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: CatalogProductOptionValue;
};

/** Behavior of the product when stock is equal to 0 */
export enum ProductOutOfStockBehavior {
  DO_NOTHING = 'DO_NOTHING',
  HIDE_PRODUCT = 'HIDE_PRODUCT',
  HIDE_PRODUCT_AND_ACCESSIBLE = 'HIDE_PRODUCT_AND_ACCESSIBLE',
  HIDE_PRODUCT_AND_REDIRECT = 'HIDE_PRODUCT_AND_REDIRECT'
}

/** A Product PickList Value - a product to be mapped to the base product if selected. */
export type ProductPickListOptionValue = CatalogProductOptionValue & {
  __typename: 'ProductPickListOptionValue';
  /** Default image for a pick list product. */
  defaultImage?: Maybe<Image>;
  /** Unique ID for the option value. */
  entityId: Scalars['Int'];
  /** Indicates whether this value is the chosen default selected value. */
  isDefault: Scalars['Boolean'];
  /** Indicates whether this value is selected based on sku/variantEntityId/optionValueIds overlay requested on the product node level. */
  isSelected?: Maybe<Scalars['Boolean']>;
  /** Label for the option value. */
  label: Scalars['String'];
  /** The ID of the product associated with this option value. */
  productId: Scalars['Int'];
};

/** PreOrder Product */
export type ProductPreOrder = ProductAvailability & {
  __typename: 'ProductPreOrder';
  /** A few words telling the customer how long it will normally take to ship this product, such as 'Usually ships in 24 hours'. */
  description: Scalars['String'];
  /** The message to be shown in the store when a product is put into the pre-order availability state, e.g. "Expected release date is %%DATE%%" */
  message?: Maybe<Scalars['String']>;
  /** The availability state of the product. */
  status: ProductAvailabilityStatus;
  /** Product release date */
  willBeReleasedAt?: Maybe<DateTimeExtended>;
};

/** Product reviews filters. */
export type ProductReviewsFiltersInput = {
  /** Product reviews filter by rating. */
  rating?: InputMaybe<ProductReviewsRatingFilterInput>;
};

/** Product reviews filter by rating. */
export type ProductReviewsRatingFilterInput = {
  /** Maximum rating of the product. */
  maxRating?: InputMaybe<Scalars['Int']>;
  /** Minimum rating of the product. */
  minRating?: InputMaybe<Scalars['Int']>;
};

/** Product reviews sorting. */
export enum ProductReviewsSortInput {
  HIGHEST_RATING = 'HIGHEST_RATING',
  LOWEST_RATING = 'LOWEST_RATING',
  NEWEST = 'NEWEST',
  OLDEST = 'OLDEST'
}

/** Unavailable Product */
export type ProductUnavailable = ProductAvailability & {
  __typename: 'ProductUnavailable';
  /** A few words telling the customer how long it will normally take to ship this product, such as 'Usually ships in 24 hours'. */
  description: Scalars['String'];
  /** The message to be shown in the store when "Call for pricing" is enabled for this product, e.g. "Contact us at 555-5555" */
  message?: Maybe<Scalars['String']>;
  /** The availability state of the product. */
  status: ProductAvailabilityStatus;
};

/** Public Wishlist */
export type PublicWishlist = {
  __typename: 'PublicWishlist';
  /** The wishlist id. */
  entityId: Scalars['Int'];
  /** A list of the wishlist items */
  items: WishlistItemConnection;
  /** The wishlist name. */
  name: Scalars['String'];
  /** The wishlist token. */
  token: Scalars['String'];
};


/** Public Wishlist */
export type PublicWishlistItemsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  hideOutOfStock?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
};

/** Specifies how to filter by publication datetime */
export type PublishedAtFilter = {
  /** Filter records with a value that's within the specified minute range. Seconds and milliseconds are truncated from the argument. */
  eq?: InputMaybe<Scalars['DateTime']>;
  /** Filter records with the specified field defined (i.e. with any value) or not */
  exists?: InputMaybe<Scalars['BooleanType']>;
  /** Filter records with a value that's strictly greater than the one specified. Seconds and milliseconds are truncated from the argument. */
  gt?: InputMaybe<Scalars['DateTime']>;
  /** Filter records with a value that's greater than or equal to than the one specified. Seconds and milliseconds are truncated from the argument. */
  gte?: InputMaybe<Scalars['DateTime']>;
  /** Filter records with a value that's less than the one specified. Seconds and milliseconds are truncated from the argument. */
  lt?: InputMaybe<Scalars['DateTime']>;
  /** Filter records with a value that's less or equal than the one specified. Seconds and milliseconds are truncated from the argument. */
  lte?: InputMaybe<Scalars['DateTime']>;
  /** Filter records with a value that's outside the specified minute range. Seconds and milliseconds are truncated from the argument. */
  neq?: InputMaybe<Scalars['DateTime']>;
};

export type Query = {
  __typename: 'Query';
  /** Returns meta information regarding a record collection */
  _allArticlesMeta: CollectionMetadata;
  /** Returns meta information regarding a record collection */
  _allAuthorsMeta: CollectionMetadata;
  /** Returns meta information regarding a record collection */
  _allCategoriesMeta: CollectionMetadata;
  /** Returns meta information regarding a record collection */
  _allGlossaryCategoriesMeta: CollectionMetadata;
  /** Returns meta information regarding a record collection */
  _allGlossaryEntriesMeta: CollectionMetadata;
  /** Returns meta information regarding an assets collection */
  _allUploadsMeta?: Maybe<CollectionMetadata>;
  /** Returns the single instance record */
  _site: Site;
  /** Returns a collection of records */
  allArticles: Array<ArticleRecord>;
  /** Returns a collection of records */
  allAuthors: Array<AuthorRecord>;
  /** Returns a collection of records */
  allCategories: Array<CategoryRecord>;
  /** Returns a collection of records */
  allGlossaryCategories: Array<GlossaryCategoryRecord>;
  /** Returns a collection of records */
  allGlossaryEntries: Array<GlossaryEntryRecord>;
  /** Returns a collection of assets */
  allUploads: Array<FileField>;
  /** Returns a specific record */
  article?: Maybe<ArticleRecord>;
  /** Returns a specific record */
  author?: Maybe<AuthorRecord>;
  /** Returns the single instance record */
  blogIndexPage?: Maybe<BlogIndexPageRecord>;
  /** Returns a specific record */
  category?: Maybe<CategoryRecord>;
  /** The current channel. */
  channel: Channel;
  /** The currently logged in customer. */
  customer?: Maybe<Customer>;
  /** Returns a specific record */
  glossaryCategory?: Maybe<GlossaryCategoryRecord>;
  /** Returns a specific record */
  glossaryEntry?: Maybe<GlossaryEntryRecord>;
  /** Returns the single instance record */
  glossaryIndexPage?: Maybe<GlossaryIndexPageRecord>;
  /** Returns the single instance record */
  homepage?: Maybe<HomepageRecord>;
  /** An inventory */
  inventory: Inventory;
  newsletter?: Maybe<Newsletter>;
  /** Fetches an object given its ID */
  node?: Maybe<Node>;
  /** Returns the single instance record */
  privacyPolicyPage?: Maybe<PrivacyPolicyPageRecord>;
  /** A site */
  site: Site;
  /** Returns the single instance record */
  termsOfUsePage?: Maybe<TermsOfUsePageRecord>;
  /** Returns a specific asset */
  upload?: Maybe<FileField>;
  viewer?: Maybe<Membership>;
};


export type QueryAllArticlesMetaArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<ArticleModelFilter>;
  locale?: InputMaybe<SiteLocale>;
};


export type QueryAllAuthorsMetaArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<AuthorModelFilter>;
  locale?: InputMaybe<SiteLocale>;
};


export type QueryAllCategoriesMetaArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<CategoryModelFilter>;
  locale?: InputMaybe<SiteLocale>;
};


export type QueryAllGlossaryCategoriesMetaArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<GlossaryCategoryModelFilter>;
  locale?: InputMaybe<SiteLocale>;
};


export type QueryAllGlossaryEntriesMetaArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<GlossaryEntryModelFilter>;
  locale?: InputMaybe<SiteLocale>;
};


export type QueryAllUploadsMetaArgs = {
  filter?: InputMaybe<UploadFilter>;
  locale?: InputMaybe<SiteLocale>;
};


export type QuerySiteArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


export type QueryAllArticlesArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<ArticleModelFilter>;
  first?: InputMaybe<Scalars['IntType']>;
  locale?: InputMaybe<SiteLocale>;
  orderBy?: InputMaybe<Array<InputMaybe<ArticleModelOrderBy>>>;
  skip?: InputMaybe<Scalars['IntType']>;
};


export type QueryAllAuthorsArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<AuthorModelFilter>;
  first?: InputMaybe<Scalars['IntType']>;
  locale?: InputMaybe<SiteLocale>;
  orderBy?: InputMaybe<Array<InputMaybe<AuthorModelOrderBy>>>;
  skip?: InputMaybe<Scalars['IntType']>;
};


export type QueryAllCategoriesArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<CategoryModelFilter>;
  first?: InputMaybe<Scalars['IntType']>;
  locale?: InputMaybe<SiteLocale>;
  orderBy?: InputMaybe<Array<InputMaybe<CategoryModelOrderBy>>>;
  skip?: InputMaybe<Scalars['IntType']>;
};


export type QueryAllGlossaryCategoriesArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<GlossaryCategoryModelFilter>;
  first?: InputMaybe<Scalars['IntType']>;
  locale?: InputMaybe<SiteLocale>;
  orderBy?: InputMaybe<Array<InputMaybe<GlossaryCategoryModelOrderBy>>>;
  skip?: InputMaybe<Scalars['IntType']>;
};


export type QueryAllGlossaryEntriesArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<GlossaryEntryModelFilter>;
  first?: InputMaybe<Scalars['IntType']>;
  locale?: InputMaybe<SiteLocale>;
  orderBy?: InputMaybe<Array<InputMaybe<GlossaryEntryModelOrderBy>>>;
  skip?: InputMaybe<Scalars['IntType']>;
};


export type QueryAllUploadsArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<UploadFilter>;
  first?: InputMaybe<Scalars['IntType']>;
  locale?: InputMaybe<SiteLocale>;
  orderBy?: InputMaybe<Array<InputMaybe<UploadOrderBy>>>;
  skip?: InputMaybe<Scalars['IntType']>;
};


export type QueryArticleArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<ArticleModelFilter>;
  locale?: InputMaybe<SiteLocale>;
  orderBy?: InputMaybe<Array<InputMaybe<ArticleModelOrderBy>>>;
};


export type QueryAuthorArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<AuthorModelFilter>;
  locale?: InputMaybe<SiteLocale>;
  orderBy?: InputMaybe<Array<InputMaybe<AuthorModelOrderBy>>>;
};


export type QueryBlogIndexPageArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


export type QueryCategoryArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<CategoryModelFilter>;
  locale?: InputMaybe<SiteLocale>;
  orderBy?: InputMaybe<Array<InputMaybe<CategoryModelOrderBy>>>;
};


export type QueryGlossaryCategoryArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<GlossaryCategoryModelFilter>;
  locale?: InputMaybe<SiteLocale>;
  orderBy?: InputMaybe<Array<InputMaybe<GlossaryCategoryModelOrderBy>>>;
};


export type QueryGlossaryEntryArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<GlossaryEntryModelFilter>;
  locale?: InputMaybe<SiteLocale>;
  orderBy?: InputMaybe<Array<InputMaybe<GlossaryEntryModelOrderBy>>>;
};


export type QueryGlossaryIndexPageArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


export type QueryHomepageArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


export type QueryNodeArgs = {
  id: Scalars['ID'];
};


export type QueryPrivacyPolicyPageArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


export type QueryTermsOfUsePageArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


export type QueryUploadArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<UploadFilter>;
  locale?: InputMaybe<SiteLocale>;
  orderBy?: InputMaybe<Array<InputMaybe<UploadOrderBy>>>;
};

/** Rating Filter */
export type RatingSearchFilter = SearchProductFilter & {
  __typename: 'RatingSearchFilter';
  /** Indicates whether filter is collapsed by default. */
  isCollapsedByDefault: Scalars['Boolean'];
  /** Display name for the filter. */
  name: Scalars['String'];
  /** List of available ratings. */
  ratings: RatingSearchFilterItemConnection;
};


/** Rating Filter */
export type RatingSearchFilterRatingsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

/** Filter by rating. At least a minRating or maxRating must be supplied. This filter will do nothing unless your store has the Product Filtering feature available on your plan and enabled. If it is supplied when your store does not have the feature enabled, it will be silently ignored. */
export type RatingSearchFilterInput = {
  /** Maximum rating of the product. */
  maxRating?: InputMaybe<Scalars['Float']>;
  /** Minimum rating of the product. */
  minRating?: InputMaybe<Scalars['Float']>;
};

/** Specific rating filter item */
export type RatingSearchFilterItem = {
  __typename: 'RatingSearchFilterItem';
  /** Indicates whether rating is selected. */
  isSelected: Scalars['Boolean'];
  /** Indicates how many products available for this filter. */
  productCount: Scalars['Int'];
  /** Rating value. */
  value: Scalars['String'];
};

/** A connection to a list of items. */
export type RatingSearchFilterItemConnection = {
  __typename: 'RatingSearchFilterItemConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<RatingSearchFilterItemEdge>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type RatingSearchFilterItemEdge = {
  __typename: 'RatingSearchFilterItemEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: RatingSearchFilterItem;
};

/** ReCaptcha settings. */
export type ReCaptchaSettings = {
  __typename: 'ReCaptchaSettings';
  /** ReCaptcha site key. */
  siteKey: Scalars['String'];
};

export type RecordInterface = {
  _createdAt: Scalars['DateTime'];
  _firstPublishedAt?: Maybe<Scalars['DateTime']>;
  _isValid: Scalars['BooleanType'];
  _modelApiKey: Scalars['String'];
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>;
  _publishedAt?: Maybe<Scalars['DateTime']>;
  /** SEO meta tags */
  _seoMetaTags: Array<Tag>;
  _status: ItemStatus;
  _unpublishingScheduledAt?: Maybe<Scalars['DateTime']>;
  _updatedAt: Scalars['DateTime'];
  id: Scalars['ItemId'];
};


export type RecordInterfaceSeoMetaTagsArgs = {
  locale?: InputMaybe<SiteLocale>;
};

/** The region object */
export type Region = {
  __typename: 'Region';
  /** The rendered HTML content targeted at the region. */
  html: Scalars['String'];
  /** The name of a region. */
  name: Scalars['String'];
};

/** A connection to a list of items. */
export type RelatedProductsConnection = {
  __typename: 'RelatedProductsConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<RelatedProductsEdge>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type RelatedProductsEdge = {
  __typename: 'RelatedProductsEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: Product;
};

/** The rendered regions by specific page. */
export type RenderedRegionsByPageType = {
  __typename: 'RenderedRegionsByPageType';
  /** List of regions */
  regions: Array<Region>;
};

/** Specifies how to filter by upload type */
export type ResolutionFilter = {
  /** Search uploads with the specified resolution */
  eq?: InputMaybe<ResolutionType>;
  /** Search uploads with the specified resolutions */
  in?: InputMaybe<Array<InputMaybe<ResolutionType>>>;
  /** Exclude uploads with the specified resolution */
  neq?: InputMaybe<ResolutionType>;
  /** Search uploads without the specified resolutions */
  notIn?: InputMaybe<Array<InputMaybe<ResolutionType>>>;
};

export enum ResolutionType {
  ICON = 'icon',
  LARGE = 'large',
  MEDIUM = 'medium',
  SMALL = 'small'
}

export type ResponsiveImage = {
  __typename: 'ResponsiveImage';
  alt?: Maybe<Scalars['String']>;
  aspectRatio: Scalars['FloatType'];
  base64?: Maybe<Scalars['String']>;
  bgColor?: Maybe<Scalars['String']>;
  height: Scalars['IntType'];
  sizes: Scalars['String'];
  src: Scalars['String'];
  srcSet: Scalars['String'];
  title?: Maybe<Scalars['String']>;
  webpSrcSet: Scalars['String'];
  width: Scalars['IntType'];
};

/** Review */
export type Review = {
  __typename: 'Review';
  /** Product review author. */
  author: Author;
  /** Product review creation date. */
  createdAt: DateTimeExtended;
  /** Unique ID for the product review. */
  entityId: Scalars['Long'];
  /** Product review rating. */
  rating: Scalars['Int'];
  /** Product review text. */
  text: Scalars['String'];
  /** Product review title. */
  title: Scalars['String'];
};

/** A connection to a list of items. */
export type ReviewConnection = {
  __typename: 'ReviewConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<ReviewEdge>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type ReviewEdge = {
  __typename: 'ReviewEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: Review;
};

/** Review Rating Summary */
export type Reviews = {
  __typename: 'Reviews';
  /**
   * Average rating of the product.
   * @deprecated Alpha version. Do not use in production.
   */
  averageRating: Scalars['Float'];
  /** Total number of reviews on product. */
  numberOfReviews: Scalars['Int'];
  /** Summation of rating scores from each review. */
  summationOfRatings: Scalars['Int'];
};

/** route */
export type Route = {
  __typename: 'Route';
  /** Node */
  node?: Maybe<Node>;
};

/** Store search settings. */
export type Search = {
  __typename: 'Search';
  /** Product filtering enabled. */
  productFilteringEnabled: Scalars['Boolean'];
};

/** Search Product Filter */
export type SearchProductFilter = {
  /** Indicates whether filter is collapsed by default. */
  isCollapsedByDefault: Scalars['Boolean'];
  /** Display name for the filter. */
  name: Scalars['String'];
};

/** A connection to a list of items. */
export type SearchProductFilterConnection = {
  __typename: 'SearchProductFilterConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<SearchProductFilterEdge>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type SearchProductFilterEdge = {
  __typename: 'SearchProductFilterEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: SearchProductFilter;
};

/** Container for catalog search results, which may contain both products as well as a list of search filters for further refinement. */
export type SearchProducts = {
  __typename: 'SearchProducts';
  /** Available product filters. */
  filters: SearchProductFilterConnection;
  /** Details of the products. */
  products: ProductConnection;
};


/** Container for catalog search results, which may contain both products as well as a list of search filters for further refinement. */
export type SearchProductsFiltersArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


/** Container for catalog search results, which may contain both products as well as a list of search filters for further refinement. */
export type SearchProductsProductsArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
};

/** Object containing available search filters for use when querying Products. */
export type SearchProductsFiltersInput = {
  /** Filter by products belonging to any of the specified Brands. */
  brandEntityIds?: InputMaybe<Array<Scalars['Int']>>;
  /** Filter by products belonging to a single Category. This is intended for use when presenting a Category page in a PLP experience. This argument must be used in order for custom product sorts and custom product filtering settings targeted at a particular category to take effect. */
  categoryEntityId?: InputMaybe<Scalars['Int']>;
  /** Filter by products belonging to any of the specified Categories. Intended for Advanced Search and Faceted Search/Product Filtering use cases, not for a page for a specific Category. */
  categoryEntityIds?: InputMaybe<Array<Scalars['Int']>>;
  /** When set to True, hides products which are out of stock. Defaults to False. This filter will do nothing unless your store has the Product Filtering feature available on your plan and enabled. If it is supplied when your store does not have the feature enabled, it will be silently ignored. */
  hideOutOfStock?: InputMaybe<Scalars['Boolean']>;
  /** Filters by Products which have explicitly been marked as Featured within the catalog. If not supplied, the Featured status of products will not be considered when returning the list of products. */
  isFeatured?: InputMaybe<Scalars['Boolean']>;
  /** Filters by Products which have explicit Free Shipping configured within the catalog. If not supplied, the Free Shipping status of products will not be considered when returning the list of products. */
  isFreeShipping?: InputMaybe<Scalars['Boolean']>;
  /** Search by price range. At least a minPrice or maxPrice must be supplied. */
  price?: InputMaybe<PriceSearchFilterInput>;
  /** Filter by the attributes of products such as Product Options and Product Custom Fields. This filter will do nothing unless your store has the Product Filtering feature available on your plan and enabled. If it is supplied when your store does not have the feature enabled, it will be silently ignored. */
  productAttributes?: InputMaybe<Array<ProductAttributeSearchFilterInput>>;
  /** Filter by rating. At least a minRating or maxRating must be supplied. This filter will do nothing unless your store has the Product Filtering feature available on your plan and enabled. If it is supplied when your store does not have the feature enabled, it will be silently ignored. */
  rating?: InputMaybe<RatingSearchFilterInput>;
  /** Boolean argument to determine whether products within sub-Categories will be returned when filtering products by Category. Defaults to False if not supplied. */
  searchSubCategories?: InputMaybe<Scalars['Boolean']>;
  /** Textual search term. Used to search for products based on text entered by a shopper, typically in a search box. Searches against several fields on the product including Name, SKU, and Description. */
  searchTerm?: InputMaybe<Scalars['String']>;
};

/** Sort to use for the product results. Relevance is the default for textual search terms, and “Featured” is the default for category page contexts without a search term. */
export enum SearchProductsSortInput {
  A_TO_Z = 'A_TO_Z',
  BEST_REVIEWED = 'BEST_REVIEWED',
  BEST_SELLING = 'BEST_SELLING',
  FEATURED = 'FEATURED',
  HIGHEST_PRICE = 'HIGHEST_PRICE',
  LOWEST_PRICE = 'LOWEST_PRICE',
  NEWEST = 'NEWEST',
  RELEVANCE = 'RELEVANCE',
  Z_TO_A = 'Z_TO_A'
}

/** The Search queries. */
export type SearchQueries = {
  __typename: 'SearchQueries';
  /** Details of the products and facets matching given search criteria. */
  searchProducts: SearchProducts;
};


/** The Search queries. */
export type SearchQueriesSearchProductsArgs = {
  filters: SearchProductsFiltersInput;
  sort?: InputMaybe<SearchProductsSortInput>;
};

/** Seo Details */
export type SeoDetails = {
  __typename: 'SeoDetails';
  /** Meta description. */
  metaDescription: Scalars['String'];
  /** Meta keywords. */
  metaKeywords: Scalars['String'];
  /** Page title. */
  pageTitle: Scalars['String'];
};

export type SeoField = {
  __typename: 'SeoField';
  description?: Maybe<Scalars['String']>;
  image?: Maybe<FileField>;
  title?: Maybe<Scalars['String']>;
  twitterCard?: Maybe<Scalars['String']>;
};

/** Specifies how to filter SEO meta tags fields */
export type SeoFilter = {
  /** Filter records with the specified field defined (i.e. with any value) or not */
  exists?: InputMaybe<Scalars['BooleanType']>;
};

/** Store settings information from the control panel. */
export type Settings = {
  __typename: 'Settings';
  /** Channel ID. */
  channelId: Scalars['Long'];
  /** Checkout settings. */
  checkout?: Maybe<CheckoutSettings>;
  /** Contact information for the store. */
  contact?: Maybe<ContactField>;
  /** Store display format information. */
  display: DisplayField;
  /** Inventory settings. */
  inventory?: Maybe<InventorySettings>;
  /**
   * Logo information for the store.
   * @deprecated Use `logoV2` instead.
   */
  logo: LogoField;
  /** Logo information for the store. */
  logoV2: StoreLogo;
  /** ReCaptcha settings. */
  reCaptcha: ReCaptchaSettings;
  /** Store search settings. */
  search: Search;
  /** The social media links of connected platforms to the storefront. */
  socialMediaLinks: Array<SocialMediaLink>;
  /** The current store status. */
  status: StorefrontStatusType;
  /** The hash of the store. */
  storeHash: Scalars['String'];
  /** The name of the store. */
  storeName: Scalars['String'];
  /** Storefront settings. */
  storefront: Storefront;
  /** The tax display settings object */
  tax?: Maybe<TaxDisplaySettings>;
  /** Store urls. */
  url: UrlField;
};

/** A connection to a list of items. */
export type ShopByPriceConnection = {
  __typename: 'ShopByPriceConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<ShopByPriceEdge>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type ShopByPriceEdge = {
  __typename: 'ShopByPriceEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: ShopByPriceRange;
};

/** Category shop by price money ranges */
export type ShopByPriceRange = {
  __typename: 'ShopByPriceRange';
  /** Category shop by price range. */
  ranges: MoneyRange;
};

/** A site */
export type Site = {
  __typename: 'Site';
  /** Details of the best selling products. */
  bestSellingProducts: ProductConnection;
  /** Details of the brand. */
  brands: BrandConnection;
  /** Retrieve a category object by the id. */
  category?: Maybe<Category>;
  /** A tree of categories. */
  categoryTree: Array<CategoryTreeItem>;
  /** The page content. */
  content: Content;
  /** Store Currencies. */
  currencies: CurrencyConnection;
  /** Currency details. */
  currency?: Maybe<Currency>;
  favicon?: Maybe<FileField>;
  faviconMetaTags: Array<Tag>;
  /** Details of the featured products. */
  featuredProducts: ProductConnection;
  globalSeo?: Maybe<GlobalSeoField>;
  locales: Array<SiteLocale>;
  /** Details of the newest products. */
  newestProducts: ProductConnection;
  /** List of brands sorted by product count. */
  popularBrands: PopularBrandConnection;
  /** A single product object with variant pricing overlay capabilities. */
  product?: Maybe<Product>;
  /** Details of the products. */
  products: ProductConnection;
  /** Public Wishlist */
  publicWishlist?: Maybe<PublicWishlist>;
  /** Route for a node */
  route: Route;
  /** The Search queries. */
  search: SearchQueries;
  /** Store settings. */
  settings?: Maybe<Settings>;
};


/** A site */
export type SiteBestSellingProductsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  hideOutOfStock?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
};


/** A site */
export type SiteBrandsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  entityIds?: InputMaybe<Array<Scalars['Int']>>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  productEntityIds?: InputMaybe<Array<Scalars['Int']>>;
};


/** A site */
export type SiteCategoryArgs = {
  entityId: Scalars['Int'];
};


/** A site */
export type SiteCategoryTreeArgs = {
  rootEntityId?: InputMaybe<Scalars['Int']>;
};


/** A site */
export type SiteCurrenciesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


/** A site */
export type SiteCurrencyArgs = {
  currencyCode: CurrencyCode;
};


/** A site */
export type SiteFaviconMetaTagsArgs = {
  variants?: InputMaybe<Array<InputMaybe<FaviconType>>>;
};


/** A site */
export type SiteFeaturedProductsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  hideOutOfStock?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
};


/** A site */
export type SiteGlobalSeoArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** A site */
export type SiteNewestProductsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  hideOutOfStock?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
};


/** A site */
export type SitePopularBrandsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


/** A site */
export type SiteProductArgs = {
  entityId?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['ID']>;
  optionValueIds?: InputMaybe<Array<OptionValueId>>;
  sku?: InputMaybe<Scalars['String']>;
  useDefaultOptionSelections?: InputMaybe<Scalars['Boolean']>;
  variantEntityId?: InputMaybe<Scalars['Int']>;
};


/** A site */
export type SiteProductsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  entityIds?: InputMaybe<Array<Scalars['Int']>>;
  first?: InputMaybe<Scalars['Int']>;
  hideOutOfStock?: InputMaybe<Scalars['Boolean']>;
  ids?: InputMaybe<Array<Scalars['ID']>>;
  last?: InputMaybe<Scalars['Int']>;
};


/** A site */
export type SitePublicWishlistArgs = {
  token: Scalars['String'];
};


/** A site */
export type SiteRouteArgs = {
  path: Scalars['String'];
};

export enum SiteLocale {
  EN = 'en'
}

/** Specifies how to filter Slug fields */
export type SlugFilter = {
  /** Search for records with an exact match */
  eq?: InputMaybe<Scalars['String']>;
  /** Filter records that have one of the specified slugs */
  in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Exclude records with an exact match */
  neq?: InputMaybe<Scalars['String']>;
  /** Filter records that do have one of the specified slugs */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

/** The social media link. */
export type SocialMediaLink = {
  __typename: 'SocialMediaLink';
  /** The name of the social media link. */
  name: Scalars['String'];
  /** The url of the social media link. */
  url: Scalars['String'];
};

/** Special hour */
export type SpecialHour = {
  __typename: 'SpecialHour';
  /** Closing time */
  closing?: Maybe<Scalars['DateTime']>;
  /** Upcoming event name */
  label: Scalars['String'];
  /** Is open */
  open: Scalars['Boolean'];
  /** Opening time */
  opening?: Maybe<Scalars['DateTime']>;
};

/** Specifies how to filter by status */
export type StatusFilter = {
  /** Search the record with the specified status */
  eq?: InputMaybe<ItemStatus>;
  /** Search records with the specified statuses */
  in?: InputMaybe<Array<InputMaybe<ItemStatus>>>;
  /** Exclude the record with the specified status */
  neq?: InputMaybe<ItemStatus>;
  /** Search records without the specified statuses */
  notIn?: InputMaybe<Array<InputMaybe<ItemStatus>>>;
};

/** Stock level display setting */
export enum StockLevelDisplay {
  DONT_SHOW = 'DONT_SHOW',
  SHOW = 'SHOW',
  SHOW_WHEN_LOW = 'SHOW_WHEN_LOW'
}

/** Store logo as image. */
export type StoreImageLogo = {
  __typename: 'StoreImageLogo';
  /** Logo image. */
  image: Image;
};

/** Store logo. */
export type StoreLogo = StoreImageLogo | StoreTextLogo;

/** Store logo as text. */
export type StoreTextLogo = {
  __typename: 'StoreTextLogo';
  /** Logo text. */
  text: Scalars['String'];
};

/** Storefront settings. */
export type Storefront = {
  __typename: 'Storefront';
  /** Storefront catalog settings. */
  catalog?: Maybe<Catalog>;
};

/** Storefront Mode */
export enum StorefrontStatusType {
  HIBERNATION = 'HIBERNATION',
  LAUNCHED = 'LAUNCHED',
  MAINTENANCE = 'MAINTENANCE',
  PRE_LAUNCH = 'PRE_LAUNCH'
}

/** Specifies how to filter Single-line string fields */
export type StringFilter = {
  /** Search for records with an exact match */
  eq?: InputMaybe<Scalars['String']>;
  /** Filter records with the specified field defined (i.e. with any value) or not [DEPRECATED] */
  exists?: InputMaybe<Scalars['BooleanType']>;
  /** Filter records that equal one of the specified values */
  in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Filter records with the specified field set as blank (null or empty string) */
  isBlank?: InputMaybe<Scalars['BooleanType']>;
  /** Filter records with the specified field present (neither null, nor empty string) */
  isPresent?: InputMaybe<Scalars['BooleanType']>;
  /** Filter records based on a regular expression */
  matches?: InputMaybe<StringMatchesFilter>;
  /** Exclude records with an exact match */
  neq?: InputMaybe<Scalars['String']>;
  /** Filter records that do not equal one of the specified values */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Exclude records based on a regular expression */
  notMatches?: InputMaybe<StringMatchesFilter>;
};

export type StringMatchesFilter = {
  caseSensitive?: InputMaybe<Scalars['BooleanType']>;
  pattern: Scalars['String'];
  regexp?: InputMaybe<Scalars['BooleanType']>;
};

/** Specifies how to filter Structured Text fields */
export type StructuredTextFilter = {
  /** Filter records with the specified field defined (i.e. with any value) or not [DEPRECATED] */
  exists?: InputMaybe<Scalars['BooleanType']>;
  /** Filter records with the specified field set as blank (null or single empty paragraph) */
  isBlank?: InputMaybe<Scalars['BooleanType']>;
  /** Filter records with the specified field present (neither null, nor empty string) */
  isPresent?: InputMaybe<Scalars['BooleanType']>;
  /** Filter records based on a regular expression */
  matches?: InputMaybe<StringMatchesFilter>;
  /** Exclude records based on a regular expression */
  notMatches?: InputMaybe<StringMatchesFilter>;
};

/** Specific sub-category filter item */
export type SubCategorySearchFilterItem = {
  __typename: 'SubCategorySearchFilterItem';
  /** Category ID. */
  entityId: Scalars['Int'];
  /** Indicates whether category is selected. */
  isSelected: Scalars['Boolean'];
  /** Category name. */
  name: Scalars['String'];
  /** Indicates how many products available for this filter. */
  productCount: Scalars['Int'];
  /** List of available sub-categories. */
  subCategories: SubCategorySearchFilterItemConnection;
};


/** Specific sub-category filter item */
export type SubCategorySearchFilterItemSubCategoriesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

/** A connection to a list of items. */
export type SubCategorySearchFilterItemConnection = {
  __typename: 'SubCategorySearchFilterItemConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<SubCategorySearchFilterItemEdge>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type SubCategorySearchFilterItemEdge = {
  __typename: 'SubCategorySearchFilterItemEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: SubCategorySearchFilterItem;
};

export type Subscriber = {
  __typename: 'Subscriber';
  email: Scalars['String'];
  id: Scalars['String'];
};

export type SubscriberCreateInput = {
  email: Scalars['String'];
};

export type SubscriberCreatePayload = {
  __typename: 'SubscriberCreatePayload';
  subscriber?: Maybe<Subscriber>;
};

/** A swatch option value - swatch values can be associated with a list of hexidecimal colors or an image. */
export type SwatchOptionValue = CatalogProductOptionValue & {
  __typename: 'SwatchOptionValue';
  /** Unique ID for the option value. */
  entityId: Scalars['Int'];
  /** List of up to 3 hex encoded colors to associate with a swatch value. */
  hexColors: Array<Scalars['String']>;
  /** Absolute path of a swatch texture image. */
  imageUrl?: Maybe<Scalars['String']>;
  /** Indicates whether this value is the chosen default selected value. */
  isDefault: Scalars['Boolean'];
  /** Indicates whether this value is selected based on sku/variantEntityId/optionValueIds overlay requested on the product node level. */
  isSelected?: Maybe<Scalars['Boolean']>;
  /** Label for the option value. */
  label: Scalars['String'];
};


/** A swatch option value - swatch values can be associated with a list of hexidecimal colors or an image. */
export type SwatchOptionValueImageUrlArgs = {
  height?: InputMaybe<Scalars['Int']>;
  width: Scalars['Int'];
};

export type Tag = {
  __typename: 'Tag';
  attributes?: Maybe<Scalars['MetaTagAttributes']>;
  content?: Maybe<Scalars['String']>;
  tag: Scalars['String'];
};

/** The tax display settings object */
export type TaxDisplaySettings = {
  __typename: 'TaxDisplaySettings';
  /** Tax display setting for Product Details Page. */
  pdp: TaxPriceDisplay;
  /** Tax display setting for Product List Page. */
  plp: TaxPriceDisplay;
};

/** Tax setting can be set included or excluded (Tax setting can also be set to both on PDP/PLP). */
export enum TaxPriceDisplay {
  BOTH = 'BOTH',
  EX = 'EX',
  INC = 'INC'
}

export type TermsOfUsePageModelContentField = {
  __typename: 'TermsOfUsePageModelContentField';
  blocks: Array<Scalars['String']>;
  links: Array<Scalars['String']>;
  value: Scalars['JsonField'];
};

/** Record of type Terms of Use Page (terms_of_use_page) */
export type TermsOfUsePageRecord = RecordInterface & {
  __typename: 'TermsOfUsePageRecord';
  _createdAt: Scalars['DateTime'];
  _firstPublishedAt?: Maybe<Scalars['DateTime']>;
  _isValid: Scalars['BooleanType'];
  _modelApiKey: Scalars['String'];
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>;
  _publishedAt?: Maybe<Scalars['DateTime']>;
  /** SEO meta tags */
  _seoMetaTags: Array<Tag>;
  _status: ItemStatus;
  _unpublishingScheduledAt?: Maybe<Scalars['DateTime']>;
  _updatedAt: Scalars['DateTime'];
  content?: Maybe<TermsOfUsePageModelContentField>;
  createdAt: Scalars['DateTime'];
  id: Scalars['ItemId'];
  seoMetadata?: Maybe<SeoField>;
  updatedAt: Scalars['DateTime'];
};


/** Record of type Terms of Use Page (terms_of_use_page) */
export type TermsOfUsePageRecordSeoMetaTagsArgs = {
  locale?: InputMaybe<SiteLocale>;
};

/** A single line text input field. */
export type TextFieldOption = CatalogProductOption & {
  __typename: 'TextFieldOption';
  /** Default value of the text field option. */
  defaultValue?: Maybe<Scalars['String']>;
  /** Display name for the option. */
  displayName: Scalars['String'];
  /** Unique ID for the option. */
  entityId: Scalars['Int'];
  /** One of the option values is required to be selected for the checkout. */
  isRequired: Scalars['Boolean'];
  /** Indicates whether it is a variant option or modifier. */
  isVariantOption: Scalars['Boolean'];
  /** The maximum number of characters. */
  maxLength?: Maybe<Scalars['Int']>;
  /** The minimum number of characters. */
  minLength?: Maybe<Scalars['Int']>;
};

/** Specifies how to filter text fields */
export type TextFilter = {
  /** Filter records with the specified field defined (i.e. with any value) or not [DEPRECATED] */
  exists?: InputMaybe<Scalars['BooleanType']>;
  /** Filter records with the specified field set as blank (null or empty string) */
  isBlank?: InputMaybe<Scalars['BooleanType']>;
  /** Filter records with the specified field present (neither null, nor empty string) */
  isPresent?: InputMaybe<Scalars['BooleanType']>;
  /** Filter records based on a regular expression */
  matches?: InputMaybe<StringMatchesFilter>;
  /** Exclude records based on a regular expression */
  notMatches?: InputMaybe<StringMatchesFilter>;
};

/** Specifies how to filter by upload type */
export type TypeFilter = {
  /** Search uploads with the specified type */
  eq?: InputMaybe<UploadType>;
  /** Search uploads with the specified types */
  in?: InputMaybe<Array<InputMaybe<UploadType>>>;
  /** Exclude uploads with the specified type */
  neq?: InputMaybe<UploadType>;
  /** Search uploads without the specified types */
  notIn?: InputMaybe<Array<InputMaybe<UploadType>>>;
};

/** Update wishlist input object */
export type UpdateWishlistInput = {
  /** Wishlist data to update */
  data: WishlistUpdateDataInput;
  /** The wishlist id */
  entityId: Scalars['Int'];
};

/** Update wishlist */
export type UpdateWishlistResult = {
  __typename: 'UpdateWishlistResult';
  /** The wishlist */
  result: Wishlist;
};

/** Specifies how to filter by update datetime */
export type UpdatedAtFilter = {
  /** Filter records with a value that's within the specified minute range. Seconds and milliseconds are truncated from the argument. */
  eq?: InputMaybe<Scalars['DateTime']>;
  /** Filter records with the specified field defined (i.e. with any value) or not */
  exists?: InputMaybe<Scalars['BooleanType']>;
  /** Filter records with a value that's strictly greater than the one specified. Seconds and milliseconds are truncated from the argument. */
  gt?: InputMaybe<Scalars['DateTime']>;
  /** Filter records with a value that's greater than or equal to than the one specified. Seconds and milliseconds are truncated from the argument. */
  gte?: InputMaybe<Scalars['DateTime']>;
  /** Filter records with a value that's less than the one specified. Seconds and milliseconds are truncated from the argument. */
  lt?: InputMaybe<Scalars['DateTime']>;
  /** Filter records with a value that's less or equal than the one specified. Seconds and milliseconds are truncated from the argument. */
  lte?: InputMaybe<Scalars['DateTime']>;
  /** Filter records with a value that's outside the specified minute range. Seconds and milliseconds are truncated from the argument. */
  neq?: InputMaybe<Scalars['DateTime']>;
};

/** Specifies how to filter by default alt */
export type UploadAltFilter = {
  /** Search the uploads with the specified alt */
  eq?: InputMaybe<Scalars['String']>;
  /** Filter uploads with the specified field defined (i.e. with any value) or not */
  exists?: InputMaybe<Scalars['BooleanType']>;
  /** Search uploads with the specified values as default alt */
  in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Filter uploads based on a regular expression */
  matches?: InputMaybe<StringMatchesFilter>;
  /** Exclude the uploads with the specified alt */
  neq?: InputMaybe<Scalars['String']>;
  /** Search uploads that do not have the specified values as default alt */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Exclude uploads based on a regular expression */
  notMatches?: InputMaybe<StringMatchesFilter>;
};

/** Specifies how to filter by auhtor */
export type UploadAuthorFilter = {
  /** Filter uploads with the specified field defined (i.e. with any value) or not */
  exists?: InputMaybe<Scalars['BooleanType']>;
  /** Filter uploads based on a regular expression */
  matches?: InputMaybe<StringMatchesFilter>;
  /** Exclude uploads based on a regular expression */
  notMatches?: InputMaybe<StringMatchesFilter>;
};

/** Specifies how to filter by basename */
export type UploadBasenameFilter = {
  /** Filter uploads based on a regular expression */
  matches?: InputMaybe<StringMatchesFilter>;
  /** Exclude uploads based on a regular expression */
  notMatches?: InputMaybe<StringMatchesFilter>;
};

/** Specifies how to filter by colors */
export type UploadColorsFilter = {
  /** Filter uploads that have all of the specified colors */
  allIn?: InputMaybe<Array<InputMaybe<ColorBucketType>>>;
  /** Filter uploads that have at least one of the specified colors */
  anyIn?: InputMaybe<Array<InputMaybe<ColorBucketType>>>;
  /** Filter uploads that have the specified colors */
  contains?: InputMaybe<ColorBucketType>;
  /** Search for uploads with an exact match */
  eq?: InputMaybe<Array<InputMaybe<ColorBucketType>>>;
  /** Filter uploads that do not have any of the specified colors */
  notIn?: InputMaybe<Array<InputMaybe<ColorBucketType>>>;
};

/** Specifies how to filter by copyright */
export type UploadCopyrightFilter = {
  /** Filter records with the specified field defined (i.e. with any value) or not */
  exists?: InputMaybe<Scalars['BooleanType']>;
  /** Filter uploads based on a regular expression */
  matches?: InputMaybe<StringMatchesFilter>;
  /** Exclude uploads based on a regular expression */
  notMatches?: InputMaybe<StringMatchesFilter>;
};

/** Specifies how to filter by creation datetime */
export type UploadCreatedAtFilter = {
  /** Search for uploads with an exact match */
  eq?: InputMaybe<Scalars['DateTime']>;
  /** Filter uploads with a value that's strictly greater than the one specified */
  gt?: InputMaybe<Scalars['DateTime']>;
  /** Filter uploads with a value that's greater than or equal to the one specified */
  gte?: InputMaybe<Scalars['DateTime']>;
  /** Filter uploads with a value that's less than the one specified */
  lt?: InputMaybe<Scalars['DateTime']>;
  /** Filter uploads with a value that's less or equal than the one specified */
  lte?: InputMaybe<Scalars['DateTime']>;
  /** Exclude uploads with an exact match */
  neq?: InputMaybe<Scalars['DateTime']>;
};

/** Specifies how to filter by filename */
export type UploadFilenameFilter = {
  /** Filter uploads based on a regular expression */
  matches?: InputMaybe<StringMatchesFilter>;
  /** Exclude uploads based on a regular expression */
  notMatches?: InputMaybe<StringMatchesFilter>;
};

export type UploadFilter = {
  OR?: InputMaybe<Array<InputMaybe<UploadFilter>>>;
  _createdAt?: InputMaybe<UploadCreatedAtFilter>;
  _updatedAt?: InputMaybe<UploadUpdatedAtFilter>;
  alt?: InputMaybe<UploadAltFilter>;
  author?: InputMaybe<UploadAuthorFilter>;
  basename?: InputMaybe<UploadBasenameFilter>;
  colors?: InputMaybe<UploadColorsFilter>;
  copyright?: InputMaybe<UploadCopyrightFilter>;
  filename?: InputMaybe<UploadFilenameFilter>;
  format?: InputMaybe<UploadFormatFilter>;
  height?: InputMaybe<UploadHeightFilter>;
  id?: InputMaybe<UploadIdFilter>;
  inUse?: InputMaybe<InUseFilter>;
  md5?: InputMaybe<UploadMd5Filter>;
  mimeType?: InputMaybe<UploadMimeTypeFilter>;
  notes?: InputMaybe<UploadNotesFilter>;
  orientation?: InputMaybe<OrientationFilter>;
  resolution?: InputMaybe<ResolutionFilter>;
  size?: InputMaybe<UploadSizeFilter>;
  smartTags?: InputMaybe<UploadTagsFilter>;
  tags?: InputMaybe<UploadTagsFilter>;
  title?: InputMaybe<UploadTitleFilter>;
  type?: InputMaybe<TypeFilter>;
  width?: InputMaybe<UploadWidthFilter>;
};

/** Specifies how to filter by format */
export type UploadFormatFilter = {
  /** Search the asset with the specified format */
  eq?: InputMaybe<Scalars['String']>;
  /** Search assets with the specified formats */
  in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Exclude the asset with the specified format */
  neq?: InputMaybe<Scalars['String']>;
  /** Search assets that do not have the specified formats */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

/** Specifies how to filter by height */
export type UploadHeightFilter = {
  /** Search assets with the specified height */
  eq?: InputMaybe<Scalars['IntType']>;
  /** Search all assets larger than the specified height */
  gt?: InputMaybe<Scalars['IntType']>;
  /** Search all assets larger or equal to the specified height */
  gte?: InputMaybe<Scalars['IntType']>;
  /** Search all assets smaller than the specified height */
  lt?: InputMaybe<Scalars['IntType']>;
  /** Search all assets larger or equal to the specified height */
  lte?: InputMaybe<Scalars['IntType']>;
  /** Search assets that do not have the specified height */
  neq?: InputMaybe<Scalars['IntType']>;
};

/** Specifies how to filter by ID */
export type UploadIdFilter = {
  /** Search the asset with the specified ID */
  eq?: InputMaybe<Scalars['UploadId']>;
  /** Search assets with the specified IDs */
  in?: InputMaybe<Array<InputMaybe<Scalars['UploadId']>>>;
  /** Exclude the asset with the specified ID */
  neq?: InputMaybe<Scalars['UploadId']>;
  /** Search assets that do not have the specified IDs */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['UploadId']>>>;
};

/** Specifies how to filter by MD5 */
export type UploadMd5Filter = {
  /** Search the asset with the specified MD5 */
  eq?: InputMaybe<Scalars['String']>;
  /** Search assets with the specified MD5s */
  in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Exclude the asset with the specified MD5 */
  neq?: InputMaybe<Scalars['String']>;
  /** Search assets that do not have the specified MD5s */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

/** Specifies how to filter by mime type */
export type UploadMimeTypeFilter = {
  /** Search the asset with the specified mime type */
  eq?: InputMaybe<Scalars['String']>;
  /** Search assets with the specified mime types */
  in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Filter uploads based on a regular expression */
  matches?: InputMaybe<StringMatchesFilter>;
  /** Exclude the asset with the specified mime type */
  neq?: InputMaybe<Scalars['String']>;
  /** Search assets that do not have the specified mime types */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Exclude uploads based on a regular expression */
  notMatches?: InputMaybe<StringMatchesFilter>;
};

/** Specifies how to filter by notes */
export type UploadNotesFilter = {
  /** Filter records with the specified field defined (i.e. with any value) or not */
  exists?: InputMaybe<Scalars['BooleanType']>;
  /** Filter uploads based on a regular expression */
  matches?: InputMaybe<StringMatchesFilter>;
  /** Exclude uploads based on a regular expression */
  notMatches?: InputMaybe<StringMatchesFilter>;
};

export enum UploadOrderBy {
  _CREATEDAT_ASC = '_createdAt_ASC',
  _CREATEDAT_DESC = '_createdAt_DESC',
  _UPDATEDAT_ASC = '_updatedAt_ASC',
  _UPDATEDAT_DESC = '_updatedAt_DESC',
  BASENAME_ASC = 'basename_ASC',
  BASENAME_DESC = 'basename_DESC',
  FILENAME_ASC = 'filename_ASC',
  FILENAME_DESC = 'filename_DESC',
  FORMAT_ASC = 'format_ASC',
  FORMAT_DESC = 'format_DESC',
  ID_ASC = 'id_ASC',
  ID_DESC = 'id_DESC',
  MIMETYPE_ASC = 'mimeType_ASC',
  MIMETYPE_DESC = 'mimeType_DESC',
  RESOLUTION_ASC = 'resolution_ASC',
  RESOLUTION_DESC = 'resolution_DESC',
  SIZE_ASC = 'size_ASC',
  SIZE_DESC = 'size_DESC'
}

export enum UploadOrientation {
  LANDSCAPE = 'landscape',
  PORTRAIT = 'portrait',
  SQUARE = 'square'
}

/** Specifies how to filter by size */
export type UploadSizeFilter = {
  /** Search assets with the specified size (in bytes) */
  eq?: InputMaybe<Scalars['IntType']>;
  /** Search all assets larger than the specified size (in bytes) */
  gt?: InputMaybe<Scalars['IntType']>;
  /** Search all assets larger or equal to the specified size (in bytes) */
  gte?: InputMaybe<Scalars['IntType']>;
  /** Search all assets smaller than the specified size (in bytes) */
  lt?: InputMaybe<Scalars['IntType']>;
  /** Search all assets larger or equal to the specified size (in bytes) */
  lte?: InputMaybe<Scalars['IntType']>;
  /** Search assets that do not have the specified size (in bytes) */
  neq?: InputMaybe<Scalars['IntType']>;
};

/** Specifies how to filter by tags */
export type UploadTagsFilter = {
  /** Filter uploads linked to all of the specified tags */
  allIn?: InputMaybe<Array<Scalars['String']>>;
  /** Filter uploads linked to at least one of the specified tags */
  anyIn?: InputMaybe<Array<Scalars['String']>>;
  /** Filter uploads linked to the specified tag */
  contains?: InputMaybe<Scalars['String']>;
  /** Search for uploads with an exact match */
  eq?: InputMaybe<Array<Scalars['String']>>;
  /** Filter uploads not linked to any of the specified tags */
  notIn?: InputMaybe<Array<Scalars['String']>>;
};

/** Specifies how to filter by default title */
export type UploadTitleFilter = {
  /** Search the asset with the specified title */
  eq?: InputMaybe<Scalars['String']>;
  /** Filter assets with the specified field defined (i.e. with any value) or not */
  exists?: InputMaybe<Scalars['BooleanType']>;
  /** Search assets with the specified as default title */
  in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Filter uploads based on a regular expression */
  matches?: InputMaybe<StringMatchesFilter>;
  /** Exclude the asset with the specified title */
  neq?: InputMaybe<Scalars['String']>;
  /** Search assets that do not have the specified as default title */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Exclude uploads based on a regular expression */
  notMatches?: InputMaybe<StringMatchesFilter>;
};

export enum UploadType {
  ARCHIVE = 'archive',
  AUDIO = 'audio',
  IMAGE = 'image',
  PDFDOCUMENT = 'pdfdocument',
  PRESENTATION = 'presentation',
  RICHTEXT = 'richtext',
  SPREADSHEET = 'spreadsheet',
  VIDEO = 'video'
}

/** Specifies how to filter by update datetime */
export type UploadUpdatedAtFilter = {
  /** Search for uploads with an exact match */
  eq?: InputMaybe<Scalars['DateTime']>;
  /** Filter uploads with a value that's strictly greater than the one specified */
  gt?: InputMaybe<Scalars['DateTime']>;
  /** Filter uploads with a value that's greater than or equal to the one specified */
  gte?: InputMaybe<Scalars['DateTime']>;
  /** Filter uploads with a value that's less than the one specified */
  lt?: InputMaybe<Scalars['DateTime']>;
  /** Filter uploads with a value that's less or equal than the one specified */
  lte?: InputMaybe<Scalars['DateTime']>;
  /** Exclude uploads with an exact match */
  neq?: InputMaybe<Scalars['DateTime']>;
};

export type UploadVideoField = {
  __typename: 'UploadVideoField';
  duration?: Maybe<Scalars['Int']>;
  framerate?: Maybe<Scalars['Int']>;
  mp4Url?: Maybe<Scalars['String']>;
  muxAssetId: Scalars['String'];
  muxPlaybackId: Scalars['String'];
  streamingUrl: Scalars['String'];
  thumbnailUrl: Scalars['String'];
};


export type UploadVideoFieldMp4UrlArgs = {
  exactRes?: InputMaybe<VideoMp4Res>;
  res?: InputMaybe<VideoMp4Res>;
};


export type UploadVideoFieldThumbnailUrlArgs = {
  format?: InputMaybe<MuxThumbnailFormatType>;
};

/** Specifies how to filter by width */
export type UploadWidthFilter = {
  /** Search assets with the specified width */
  eq?: InputMaybe<Scalars['IntType']>;
  /** Search all assets larger than the specified width */
  gt?: InputMaybe<Scalars['IntType']>;
  /** Search all assets larger or equal to the specified width */
  gte?: InputMaybe<Scalars['IntType']>;
  /** Search all assets smaller than the specified width */
  lt?: InputMaybe<Scalars['IntType']>;
  /** Search all assets larger or equal to the specified width */
  lte?: InputMaybe<Scalars['IntType']>;
  /** Search assets that do not have the specified width */
  neq?: InputMaybe<Scalars['IntType']>;
};

/** Url field */
export type UrlField = {
  __typename: 'UrlField';
  /** CDN url to fetch assets. */
  cdnUrl: Scalars['String'];
  /** Checkout url. */
  checkoutUrl?: Maybe<Scalars['String']>;
  /** Store url. */
  vanityUrl: Scalars['String'];
};

export type User = {
  __typename: 'User';
  createdAt?: Maybe<Scalars['DateTime']>;
  email?: Maybe<Scalars['String']>;
  emailVerified?: Maybe<Scalars['Boolean']>;
  familyName?: Maybe<Scalars['String']>;
  givenName?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  lastLogin?: Maybe<Scalars['DateTime']>;
  loginsCount?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  nickname?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
  phoneVerified?: Maybe<Scalars['Boolean']>;
  picture?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  username?: Maybe<Scalars['String']>;
};

/** Variant */
export type Variant = Node & {
  __typename: 'Variant';
  /** Default image for a variant. */
  defaultImage?: Maybe<Image>;
  /** The variant's depth. If a depth was not explicitly specified on the variant, this will be the product's depth. */
  depth?: Maybe<Measurement>;
  /** Id of the variant. */
  entityId: Scalars['Int'];
  /** Global trade item number. */
  gtin?: Maybe<Scalars['String']>;
  /** The variant's height. If a height was not explicitly specified on the variant, this will be the product's height. */
  height?: Maybe<Measurement>;
  /** The ID of an object */
  id: Scalars['ID'];
  /** Variant inventory */
  inventory?: Maybe<VariantInventory>;
  /** Whether the product can be purchased */
  isPurchasable: Scalars['Boolean'];
  /** Metafield data related to a variant. */
  metafields: MetafieldConnection;
  /** Manufacturer part number. */
  mpn?: Maybe<Scalars['String']>;
  /** The options which define a variant. */
  options: OptionConnection;
  /** Variant prices */
  prices?: Maybe<Prices>;
  /** Product options that compose this variant. */
  productOptions: ProductOptionConnection;
  /** Sku of the variant. */
  sku: Scalars['String'];
  /** Universal product code. */
  upc?: Maybe<Scalars['String']>;
  /** The variant's weight. If a weight was not explicitly specified on the variant, this will be the product's weight. */
  weight?: Maybe<Measurement>;
  /** The variant's width. If a width was not explicitly specified on the variant, this will be the product's width. */
  width?: Maybe<Measurement>;
};


/** Variant */
export type VariantMetafieldsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  keys?: InputMaybe<Array<Scalars['String']>>;
  last?: InputMaybe<Scalars['Int']>;
  namespace: Scalars['String'];
};


/** Variant */
export type VariantOptionsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


/** Variant */
export type VariantPricesArgs = {
  currencyCode?: InputMaybe<CurrencyCode>;
  includeTax?: InputMaybe<Scalars['Boolean']>;
};


/** Variant */
export type VariantProductOptionsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

/** A connection to a list of items. */
export type VariantConnection = {
  __typename: 'VariantConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<VariantEdge>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type VariantEdge = {
  __typename: 'VariantEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: Variant;
};

/** Variant Inventory */
export type VariantInventory = {
  __typename: 'VariantInventory';
  /** Aggregated product variant inventory information. This data may not be available if not set or if the store's Inventory Settings have disabled displaying stock levels on the storefront. */
  aggregated?: Maybe<Aggregated>;
  /** Inventory by locations. */
  byLocation?: Maybe<LocationConnection>;
  /** Indicates whether this product is in stock. */
  isInStock: Scalars['Boolean'];
};


/** Variant Inventory */
export type VariantInventoryByLocationArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  distanceFilter?: InputMaybe<DistanceFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locationEntityCodes?: InputMaybe<Array<Scalars['String']>>;
  locationEntityIds?: InputMaybe<Array<Scalars['Int']>>;
  locationEntityServiceTypeIds?: InputMaybe<Array<Scalars['String']>>;
  locationEntityTypeIds?: InputMaybe<Array<Scalars['String']>>;
};

export enum VideoMp4Res {
  HIGH = 'high',
  LOW = 'low',
  MEDIUM = 'medium'
}

/** A wishlist */
export type Wishlist = {
  __typename: 'Wishlist';
  /** The wishlist id. */
  entityId: Scalars['Int'];
  /** Is the wishlist public? */
  isPublic: Scalars['Boolean'];
  /** A list of the wishlist items */
  items: WishlistItemConnection;
  /** The wishlist name. */
  name: Scalars['String'];
  /** The wishlist token. */
  token: Scalars['String'];
};


/** A wishlist */
export type WishlistItemsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  hideOutOfStock?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
};

/** A connection to a list of items. */
export type WishlistConnection = {
  __typename: 'WishlistConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<WishlistEdge>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type WishlistEdge = {
  __typename: 'WishlistEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: Wishlist;
};

/** Wishlist filters input object */
export type WishlistFiltersInput = {
  /** A wishlist ids filter. */
  entityIds?: InputMaybe<Array<Scalars['Int']>>;
};

/** The wishlist item */
export type WishlistItem = {
  __typename: 'WishlistItem';
  /** Wishlist item id. */
  entityId: Scalars['Int'];
  /** A product included in the wishlist. */
  product: Product;
  /** An id of the product from the wishlist. */
  productEntityId: Scalars['Int'];
  /** An id of the specific product variant from the wishlist. */
  variantEntityId?: Maybe<Scalars['Int']>;
};

/** A connection to a list of items. */
export type WishlistItemConnection = {
  __typename: 'WishlistItemConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<WishlistItemEdge>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type WishlistItemEdge = {
  __typename: 'WishlistItemEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: WishlistItem;
};

/** Wishlist item input object */
export type WishlistItemInput = {
  /** An id of the product from the wishlist. */
  productEntityId: Scalars['Int'];
  /** An id of the specific product variant from the wishlist. */
  variantEntityId?: InputMaybe<Scalars['Int']>;
};

/** The wishlist mutations. */
export type WishlistMutations = {
  __typename: 'WishlistMutations';
  /** Add wishlist items */
  addWishlistItems?: Maybe<AddWishlistItemsResult>;
  /** Create wishlist */
  createWishlist?: Maybe<CreateWishlistResult>;
  /** Delete wishlist items */
  deleteWishlistItems?: Maybe<DeleteWishlistItemsResult>;
  /** Delete wishlist */
  deleteWishlists?: Maybe<DeleteWishlistResult>;
  /** Update wishlist */
  updateWishlist?: Maybe<UpdateWishlistResult>;
};


/** The wishlist mutations. */
export type WishlistMutationsAddWishlistItemsArgs = {
  input: AddWishlistItemsInput;
};


/** The wishlist mutations. */
export type WishlistMutationsCreateWishlistArgs = {
  input: CreateWishlistInput;
};


/** The wishlist mutations. */
export type WishlistMutationsDeleteWishlistItemsArgs = {
  input: DeleteWishlistItemsInput;
};


/** The wishlist mutations. */
export type WishlistMutationsDeleteWishlistsArgs = {
  input: DeleteWishlistsInput;
};


/** The wishlist mutations. */
export type WishlistMutationsUpdateWishlistArgs = {
  input: UpdateWishlistInput;
};

/** Wishlist data to update */
export type WishlistUpdateDataInput = {
  /** A new wishlist visibility mode */
  isPublic?: InputMaybe<Scalars['Boolean']>;
  /** A new wishlist name */
  name?: InputMaybe<Scalars['String']>;
};

/** Country Code */
export enum CountryCode {
  AD = 'AD',
  AE = 'AE',
  AF = 'AF',
  AG = 'AG',
  AI = 'AI',
  AL = 'AL',
  AM = 'AM',
  AO = 'AO',
  AQ = 'AQ',
  AR = 'AR',
  AS = 'AS',
  AT = 'AT',
  AU = 'AU',
  AW = 'AW',
  AX = 'AX',
  AZ = 'AZ',
  BA = 'BA',
  BB = 'BB',
  BD = 'BD',
  BE = 'BE',
  BF = 'BF',
  BG = 'BG',
  BH = 'BH',
  BI = 'BI',
  BJ = 'BJ',
  BL = 'BL',
  BM = 'BM',
  BN = 'BN',
  BO = 'BO',
  BQ = 'BQ',
  BR = 'BR',
  BS = 'BS',
  BT = 'BT',
  BV = 'BV',
  BW = 'BW',
  BY = 'BY',
  BZ = 'BZ',
  CA = 'CA',
  CC = 'CC',
  CD = 'CD',
  CF = 'CF',
  CG = 'CG',
  CH = 'CH',
  CI = 'CI',
  CK = 'CK',
  CL = 'CL',
  CM = 'CM',
  CN = 'CN',
  CO = 'CO',
  CR = 'CR',
  CU = 'CU',
  CV = 'CV',
  CW = 'CW',
  CX = 'CX',
  CY = 'CY',
  CZ = 'CZ',
  DE = 'DE',
  DJ = 'DJ',
  DK = 'DK',
  DM = 'DM',
  DO = 'DO',
  DZ = 'DZ',
  EC = 'EC',
  EE = 'EE',
  EG = 'EG',
  EH = 'EH',
  ER = 'ER',
  ES = 'ES',
  ET = 'ET',
  FI = 'FI',
  FJ = 'FJ',
  FK = 'FK',
  FM = 'FM',
  FO = 'FO',
  FR = 'FR',
  GA = 'GA',
  GB = 'GB',
  GD = 'GD',
  GE = 'GE',
  GF = 'GF',
  GG = 'GG',
  GH = 'GH',
  GI = 'GI',
  GL = 'GL',
  GM = 'GM',
  GN = 'GN',
  GP = 'GP',
  GQ = 'GQ',
  GR = 'GR',
  GS = 'GS',
  GT = 'GT',
  GU = 'GU',
  GW = 'GW',
  GY = 'GY',
  HK = 'HK',
  HM = 'HM',
  HN = 'HN',
  HR = 'HR',
  HT = 'HT',
  HU = 'HU',
  ID = 'ID',
  IE = 'IE',
  IL = 'IL',
  IM = 'IM',
  IN = 'IN',
  IO = 'IO',
  IQ = 'IQ',
  IR = 'IR',
  IS = 'IS',
  IT = 'IT',
  JE = 'JE',
  JM = 'JM',
  JO = 'JO',
  JP = 'JP',
  KE = 'KE',
  KG = 'KG',
  KH = 'KH',
  KI = 'KI',
  KM = 'KM',
  KN = 'KN',
  KP = 'KP',
  KR = 'KR',
  KW = 'KW',
  KY = 'KY',
  KZ = 'KZ',
  LA = 'LA',
  LB = 'LB',
  LC = 'LC',
  LI = 'LI',
  LK = 'LK',
  LR = 'LR',
  LS = 'LS',
  LT = 'LT',
  LU = 'LU',
  LV = 'LV',
  LY = 'LY',
  MA = 'MA',
  MC = 'MC',
  MD = 'MD',
  ME = 'ME',
  MF = 'MF',
  MG = 'MG',
  MH = 'MH',
  MK = 'MK',
  ML = 'ML',
  MM = 'MM',
  MN = 'MN',
  MO = 'MO',
  MP = 'MP',
  MQ = 'MQ',
  MR = 'MR',
  MS = 'MS',
  MT = 'MT',
  MU = 'MU',
  MV = 'MV',
  MW = 'MW',
  MX = 'MX',
  MY = 'MY',
  MZ = 'MZ',
  NA = 'NA',
  NC = 'NC',
  NE = 'NE',
  NF = 'NF',
  NG = 'NG',
  NI = 'NI',
  NL = 'NL',
  NO = 'NO',
  NP = 'NP',
  NR = 'NR',
  NU = 'NU',
  NZ = 'NZ',
  OM = 'OM',
  PA = 'PA',
  PE = 'PE',
  PF = 'PF',
  PG = 'PG',
  PH = 'PH',
  PK = 'PK',
  PL = 'PL',
  PM = 'PM',
  PN = 'PN',
  PR = 'PR',
  PS = 'PS',
  PT = 'PT',
  PW = 'PW',
  PY = 'PY',
  QA = 'QA',
  RE = 'RE',
  RO = 'RO',
  RS = 'RS',
  RU = 'RU',
  RW = 'RW',
  SA = 'SA',
  SB = 'SB',
  SC = 'SC',
  SD = 'SD',
  SE = 'SE',
  SG = 'SG',
  SH = 'SH',
  SI = 'SI',
  SJ = 'SJ',
  SK = 'SK',
  SL = 'SL',
  SM = 'SM',
  SN = 'SN',
  SO = 'SO',
  SR = 'SR',
  SS = 'SS',
  ST = 'ST',
  SV = 'SV',
  SX = 'SX',
  SY = 'SY',
  SZ = 'SZ',
  TC = 'TC',
  TD = 'TD',
  TF = 'TF',
  TG = 'TG',
  TH = 'TH',
  TJ = 'TJ',
  TK = 'TK',
  TL = 'TL',
  TM = 'TM',
  TN = 'TN',
  TO = 'TO',
  TR = 'TR',
  TT = 'TT',
  TV = 'TV',
  TW = 'TW',
  TZ = 'TZ',
  UA = 'UA',
  UG = 'UG',
  UM = 'UM',
  US = 'US',
  UY = 'UY',
  UZ = 'UZ',
  VA = 'VA',
  VC = 'VC',
  VE = 'VE',
  VG = 'VG',
  VI = 'VI',
  VN = 'VN',
  VU = 'VU',
  WF = 'WF',
  WS = 'WS',
  YE = 'YE',
  YT = 'YT',
  ZA = 'ZA',
  ZM = 'ZM',
  ZW = 'ZW'
}

/** Currency Code */
export enum CurrencyCode {
  ADP = 'ADP',
  AED = 'AED',
  AFA = 'AFA',
  AFN = 'AFN',
  ALK = 'ALK',
  ALL = 'ALL',
  AMD = 'AMD',
  ANG = 'ANG',
  AOA = 'AOA',
  AOK = 'AOK',
  AON = 'AON',
  AOR = 'AOR',
  ARA = 'ARA',
  ARL = 'ARL',
  ARM = 'ARM',
  ARP = 'ARP',
  ARS = 'ARS',
  ATS = 'ATS',
  AUD = 'AUD',
  AWG = 'AWG',
  AZM = 'AZM',
  AZN = 'AZN',
  BAD = 'BAD',
  BAM = 'BAM',
  BAN = 'BAN',
  BBD = 'BBD',
  BDT = 'BDT',
  BEC = 'BEC',
  BEF = 'BEF',
  BEL = 'BEL',
  BGL = 'BGL',
  BGM = 'BGM',
  BGN = 'BGN',
  BGO = 'BGO',
  BHD = 'BHD',
  BIF = 'BIF',
  BMD = 'BMD',
  BND = 'BND',
  BOB = 'BOB',
  BOL = 'BOL',
  BOP = 'BOP',
  BOV = 'BOV',
  BRB = 'BRB',
  BRC = 'BRC',
  BRE = 'BRE',
  BRL = 'BRL',
  BRN = 'BRN',
  BRR = 'BRR',
  BRZ = 'BRZ',
  BSD = 'BSD',
  BTN = 'BTN',
  BUK = 'BUK',
  BWP = 'BWP',
  BYB = 'BYB',
  BYN = 'BYN',
  BYR = 'BYR',
  BZD = 'BZD',
  CAD = 'CAD',
  CDF = 'CDF',
  CHE = 'CHE',
  CHF = 'CHF',
  CHW = 'CHW',
  CLE = 'CLE',
  CLF = 'CLF',
  CLP = 'CLP',
  CNX = 'CNX',
  CNY = 'CNY',
  COP = 'COP',
  COU = 'COU',
  CRC = 'CRC',
  CSD = 'CSD',
  CSK = 'CSK',
  CUC = 'CUC',
  CUP = 'CUP',
  CVE = 'CVE',
  CYP = 'CYP',
  CZK = 'CZK',
  DDM = 'DDM',
  DEM = 'DEM',
  DJF = 'DJF',
  DKK = 'DKK',
  DOP = 'DOP',
  DZD = 'DZD',
  ECS = 'ECS',
  ECV = 'ECV',
  EEK = 'EEK',
  EGP = 'EGP',
  ERN = 'ERN',
  ESA = 'ESA',
  ESB = 'ESB',
  ESP = 'ESP',
  ETB = 'ETB',
  EUR = 'EUR',
  FIM = 'FIM',
  FJD = 'FJD',
  FKP = 'FKP',
  FRF = 'FRF',
  GBP = 'GBP',
  GEK = 'GEK',
  GEL = 'GEL',
  GHC = 'GHC',
  GHS = 'GHS',
  GIP = 'GIP',
  GMD = 'GMD',
  GNF = 'GNF',
  GNS = 'GNS',
  GQE = 'GQE',
  GRD = 'GRD',
  GTQ = 'GTQ',
  GWE = 'GWE',
  GWP = 'GWP',
  GYD = 'GYD',
  HKD = 'HKD',
  HNL = 'HNL',
  HRD = 'HRD',
  HRK = 'HRK',
  HTG = 'HTG',
  HUF = 'HUF',
  IDR = 'IDR',
  IEP = 'IEP',
  ILP = 'ILP',
  ILR = 'ILR',
  ILS = 'ILS',
  INR = 'INR',
  IQD = 'IQD',
  IRR = 'IRR',
  ISJ = 'ISJ',
  ISK = 'ISK',
  ITL = 'ITL',
  JMD = 'JMD',
  JOD = 'JOD',
  JPY = 'JPY',
  KES = 'KES',
  KGS = 'KGS',
  KHR = 'KHR',
  KMF = 'KMF',
  KPW = 'KPW',
  KRH = 'KRH',
  KRO = 'KRO',
  KRW = 'KRW',
  KWD = 'KWD',
  KYD = 'KYD',
  KZT = 'KZT',
  LAK = 'LAK',
  LBP = 'LBP',
  LKR = 'LKR',
  LRD = 'LRD',
  LSL = 'LSL',
  LTL = 'LTL',
  LTT = 'LTT',
  LUC = 'LUC',
  LUF = 'LUF',
  LUL = 'LUL',
  LVL = 'LVL',
  LVR = 'LVR',
  LYD = 'LYD',
  MAD = 'MAD',
  MAF = 'MAF',
  MCF = 'MCF',
  MDC = 'MDC',
  MDL = 'MDL',
  MGA = 'MGA',
  MGF = 'MGF',
  MKD = 'MKD',
  MKN = 'MKN',
  MLF = 'MLF',
  MMK = 'MMK',
  MNT = 'MNT',
  MOP = 'MOP',
  MRO = 'MRO',
  MTL = 'MTL',
  MTP = 'MTP',
  MUR = 'MUR',
  MVP = 'MVP',
  MVR = 'MVR',
  MWK = 'MWK',
  MXN = 'MXN',
  MXP = 'MXP',
  MXV = 'MXV',
  MYR = 'MYR',
  MZE = 'MZE',
  MZM = 'MZM',
  MZN = 'MZN',
  NAD = 'NAD',
  NGN = 'NGN',
  NIC = 'NIC',
  NIO = 'NIO',
  NLG = 'NLG',
  NOK = 'NOK',
  NPR = 'NPR',
  NZD = 'NZD',
  OMR = 'OMR',
  PAB = 'PAB',
  PEI = 'PEI',
  PEN = 'PEN',
  PES = 'PES',
  PGK = 'PGK',
  PHP = 'PHP',
  PKR = 'PKR',
  PLN = 'PLN',
  PLZ = 'PLZ',
  PTE = 'PTE',
  PYG = 'PYG',
  QAR = 'QAR',
  RHD = 'RHD',
  ROL = 'ROL',
  RON = 'RON',
  RSD = 'RSD',
  RUB = 'RUB',
  RUR = 'RUR',
  RWF = 'RWF',
  SAR = 'SAR',
  SBD = 'SBD',
  SCR = 'SCR',
  SDD = 'SDD',
  SDG = 'SDG',
  SDP = 'SDP',
  SEK = 'SEK',
  SGD = 'SGD',
  SHP = 'SHP',
  SIT = 'SIT',
  SKK = 'SKK',
  SLL = 'SLL',
  SOS = 'SOS',
  SRD = 'SRD',
  SRG = 'SRG',
  SSP = 'SSP',
  STD = 'STD',
  SUR = 'SUR',
  SVC = 'SVC',
  SYP = 'SYP',
  SZL = 'SZL',
  THB = 'THB',
  TJR = 'TJR',
  TJS = 'TJS',
  TMM = 'TMM',
  TMT = 'TMT',
  TND = 'TND',
  TOP = 'TOP',
  TPE = 'TPE',
  TRL = 'TRL',
  TRY = 'TRY',
  TTD = 'TTD',
  TWD = 'TWD',
  TZS = 'TZS',
  UAH = 'UAH',
  UAK = 'UAK',
  UGS = 'UGS',
  UGX = 'UGX',
  USD = 'USD',
  USN = 'USN',
  USS = 'USS',
  UYI = 'UYI',
  UYP = 'UYP',
  UYU = 'UYU',
  UZS = 'UZS',
  VEB = 'VEB',
  VEF = 'VEF',
  VND = 'VND',
  VNN = 'VNN',
  VUV = 'VUV',
  WST = 'WST',
  XAF = 'XAF',
  XCD = 'XCD',
  XEU = 'XEU',
  XFO = 'XFO',
  XFU = 'XFU',
  XOF = 'XOF',
  XPF = 'XPF',
  XRE = 'XRE',
  YDD = 'YDD',
  YER = 'YER',
  YUD = 'YUD',
  YUM = 'YUM',
  YUN = 'YUN',
  YUR = 'YUR',
  ZAL = 'ZAL',
  ZAR = 'ZAR',
  ZMK = 'ZMK',
  ZMW = 'ZMW',
  ZRN = 'ZRN',
  ZRZ = 'ZRZ',
  ZWD = 'ZWD',
  ZWL = 'ZWL',
  ZWR = 'ZWR'
}

export type FocalPoint = {
  __typename: 'focalPoint';
  x: Scalars['FloatType'];
  y: Scalars['FloatType'];
};

export type CompanyPageGetDataQueryVariables = Exact<{
  companySlug: Scalars['String'];
}>;


export type CompanyPageGetDataQuery = { __typename: 'Query', company?: { __typename: 'GlossaryEntryRecord', id: any, term?: string | null, definition?: string | null, businessUrl?: string | null, affiliateUrl?: string | null, description?: (
      { __typename: 'GlossaryEntryModelDescriptionField', value: any }
      & { ' $fragmentRefs'?: { 'CmsStructuredTextGlossaryDescriptionFragment': CmsStructuredTextGlossaryDescriptionFragment } }
    ) | null, primaryImage?: { __typename: 'FileField', id: any, responsiveImage?: (
        { __typename: 'ResponsiveImage' }
        & { ' $fragmentRefs'?: { 'CmsImageFragment': CmsImageFragment } }
      ) | null } | null } | null };

export type CompanyCardCompanyFragment = { __typename: 'GlossaryEntryRecord', id: any, slug?: string | null, definition?: string | null, name?: string | null, primaryImage?: { __typename: 'FileField', id: any, responsiveImage?: (
      { __typename: 'ResponsiveImage' }
      & { ' $fragmentRefs'?: { 'CmsImageFragment': CmsImageFragment } }
    ) | null } | null } & { ' $fragmentName'?: 'CompanyCardCompanyFragment' };

export type CompanyCardGridCompanyFragment = (
  { __typename: 'GlossaryEntryRecord', id: any }
  & { ' $fragmentRefs'?: { 'CompanyCardCompanyFragment': CompanyCardCompanyFragment } }
) & { ' $fragmentName'?: 'CompanyCardGridCompanyFragment' };

export type DirectoryIndexPageGetDataQueryVariables = Exact<{
  first?: InputMaybe<Scalars['IntType']>;
  skip?: InputMaybe<Scalars['IntType']>;
  filter?: InputMaybe<GlossaryEntryModelFilter>;
}>;


export type DirectoryIndexPageGetDataQuery = { __typename: 'Query', directory: Array<(
    { __typename: 'GlossaryEntryRecord', id: any }
    & { ' $fragmentRefs'?: { 'CompanyCardGridCompanyFragment': CompanyCardGridCompanyFragment } }
  )>, directoryMetadata: { __typename: 'CollectionMetadata', count: any } };

export type FilterDialogDirectoryGategoriesFragmentFragment = { __typename: 'GlossaryCategoryRecord', id: any, title?: string | null, description?: string | null, children?: Array<{ __typename: 'GlossaryCategoryRecord', id: any, title?: string | null, description?: string | null } | null> | null } & { ' $fragmentName'?: 'FilterDialogDirectoryGategoriesFragmentFragment' };

export type DirectoryFiltersDataQueryVariables = Exact<{ [key: string]: never; }>;


export type DirectoryFiltersDataQuery = { __typename: 'Query', featuredCategories: Array<{ __typename: 'GlossaryCategoryRecord', id: any, slug?: string | null, title?: string | null }>, topLevelCategories: Array<(
    { __typename: 'GlossaryCategoryRecord', id: any, slug?: string | null, title?: string | null, children?: Array<{ __typename: 'GlossaryCategoryRecord', id: any, slug?: string | null, title?: string | null } | null> | null }
    & { ' $fragmentRefs'?: { 'FilterDialogDirectoryGategoriesFragmentFragment': FilterDialogDirectoryGategoriesFragmentFragment } }
  )> };

export type GetFilterPreviewQueryVariables = Exact<{
  filter?: InputMaybe<GlossaryEntryModelFilter>;
}>;


export type GetFilterPreviewQuery = { __typename: 'Query', _allGlossaryEntriesMeta: { __typename: 'CollectionMetadata', count: any } };

export type GetCategoryPageDataQueryVariables = Exact<{
  filter?: InputMaybe<GlossaryCategoryModelFilter>;
}>;


export type GetCategoryPageDataQuery = { __typename: 'Query', glossaryCategory?: { __typename: 'GlossaryCategoryRecord', id: any, title?: string | null, description?: string | null, parent?: { __typename: 'GlossaryCategoryRecord', id: any } | null } | null };

export type GetNewsletterIssueDataQueryVariables = Exact<{
  slug: Scalars['String'];
}>;


export type GetNewsletterIssueDataQuery = { __typename: 'Query', newsletter?: { __typename: 'Newsletter', newsletterIssue: { __typename: 'NewsletterIssue', id: string, title: string, subtitle: string, thumbnailUrl?: string | null, contentHtml: string } } | null };

export type IssueCardIssueFragment = { __typename: 'NewsletterIssue', id: string, slug: string, title: string, subtitle: string, thumbnailUrl?: string | null, authorNames: Array<string | null>, createdAt: string, publishedAt?: string | null } & { ' $fragmentName'?: 'IssueCardIssueFragment' };

export type GetNewsletterIssuesDataQueryVariables = Exact<{
  first: Scalars['Int'];
  after?: InputMaybe<Scalars['String']>;
}>;


export type GetNewsletterIssuesDataQuery = { __typename: 'Query', newsletter?: { __typename: 'Newsletter', allNewsletterIssues?: { __typename: 'NewsletterIssueConnection', nodes: Array<(
        { __typename: 'NewsletterIssue', id: string }
        & { ' $fragmentRefs'?: { 'IssueCardIssueFragment': IssueCardIssueFragment } }
      ) | null> } | null } | null };

export type GlossaryCategoryFragmentFragment = { __typename: 'GlossaryCategoryRecord', id: any, slug?: string | null, children?: Array<{ __typename: 'GlossaryCategoryRecord', id: any, title?: string | null, slug?: string | null } | null> | null } & { ' $fragmentName'?: 'GlossaryCategoryFragmentFragment' };

export type GetHomePageDataQueryVariables = Exact<{ [key: string]: never; }>;


export type GetHomePageDataQuery = { __typename: 'Query', newsletter?: { __typename: 'Newsletter', allNewsletterIssues?: { __typename: 'NewsletterIssueConnection', nodes: Array<{ __typename: 'NewsletterIssue', id: string, slug: string, title: string, subtitle: string, thumbnailUrl?: string | null } | null> } | null } | null, featuredCategories?: (
    { __typename: 'GlossaryCategoryRecord', id: any }
    & { ' $fragmentRefs'?: { 'GlossaryCategoryFragmentFragment': GlossaryCategoryFragmentFragment } }
  ) | null, supplyChainCategories?: (
    { __typename: 'GlossaryCategoryRecord', id: any }
    & { ' $fragmentRefs'?: { 'GlossaryCategoryFragmentFragment': GlossaryCategoryFragmentFragment } }
  ) | null, productTypeCategories?: (
    { __typename: 'GlossaryCategoryRecord', id: any }
    & { ' $fragmentRefs'?: { 'GlossaryCategoryFragmentFragment': GlossaryCategoryFragmentFragment } }
  ) | null };

export type CmsImageFragment = { __typename: 'ResponsiveImage', srcSet: string, webpSrcSet: string, sizes: string, src: string, width: any, height: any, aspectRatio: any, alt?: string | null, title?: string | null, base64?: string | null } & { ' $fragmentName'?: 'CmsImageFragment' };

export type CmsStructuredTextGlossaryDescriptionFragment = { __typename: 'GlossaryEntryModelDescriptionField', value: any, blocks: Array<(
    { __typename: 'ImageRecord', id: any }
    & { ' $fragmentRefs'?: { 'CmsStructuredTextImageRecordFragment': CmsStructuredTextImageRecordFragment } }
  )>, links: Array<{ __typename: 'ArticleRecord', id: any, slug?: string | null, title?: string | null } | { __typename: 'GlossaryEntryRecord', id: any, slug?: string | null, term?: string | null }> } & { ' $fragmentName'?: 'CmsStructuredTextGlossaryDescriptionFragment' };

export type CmsStructuredTextImageRecordFragment = { __typename: 'ImageRecord', id: any, image?: { __typename: 'FileField', id: any, responsiveImage?: (
      { __typename: 'ResponsiveImage' }
      & { ' $fragmentRefs'?: { 'CmsImageFragment': CmsImageFragment } }
    ) | null } | null } & { ' $fragmentName'?: 'CmsStructuredTextImageRecordFragment' };

export type UseNewsletterSubscribeMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type UseNewsletterSubscribeMutation = { __typename: 'Mutation', subscriberCreate?: { __typename: 'SubscriberCreatePayload', subscriber?: { __typename: 'Subscriber', id: string, email: string } | null } | null };

export const CmsImageFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CmsImage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ResponsiveImage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"srcSet"}},{"kind":"Field","name":{"kind":"Name","value":"webpSrcSet"}},{"kind":"Field","name":{"kind":"Name","value":"sizes"}},{"kind":"Field","name":{"kind":"Name","value":"src"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"aspectRatio"}},{"kind":"Field","name":{"kind":"Name","value":"alt"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"base64"}}]}}]} as unknown as DocumentNode<CmsImageFragment, unknown>;
export const CompanyCardCompanyFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CompanyCardCompany"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GlossaryEntryRecord"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","alias":{"kind":"Name","value":"name"},"name":{"kind":"Name","value":"term"}},{"kind":"Field","name":{"kind":"Name","value":"definition"}},{"kind":"Field","name":{"kind":"Name","value":"primaryImage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"responsiveImage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CmsImage"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CmsImage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ResponsiveImage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"srcSet"}},{"kind":"Field","name":{"kind":"Name","value":"webpSrcSet"}},{"kind":"Field","name":{"kind":"Name","value":"sizes"}},{"kind":"Field","name":{"kind":"Name","value":"src"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"aspectRatio"}},{"kind":"Field","name":{"kind":"Name","value":"alt"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"base64"}}]}}]} as unknown as DocumentNode<CompanyCardCompanyFragment, unknown>;
export const CompanyCardGridCompanyFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CompanyCardGridCompany"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GlossaryEntryRecord"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"CompanyCardCompany"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CmsImage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ResponsiveImage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"srcSet"}},{"kind":"Field","name":{"kind":"Name","value":"webpSrcSet"}},{"kind":"Field","name":{"kind":"Name","value":"sizes"}},{"kind":"Field","name":{"kind":"Name","value":"src"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"aspectRatio"}},{"kind":"Field","name":{"kind":"Name","value":"alt"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"base64"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CompanyCardCompany"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GlossaryEntryRecord"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","alias":{"kind":"Name","value":"name"},"name":{"kind":"Name","value":"term"}},{"kind":"Field","name":{"kind":"Name","value":"definition"}},{"kind":"Field","name":{"kind":"Name","value":"primaryImage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"responsiveImage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CmsImage"}}]}}]}}]}}]} as unknown as DocumentNode<CompanyCardGridCompanyFragment, unknown>;
export const FilterDialogDirectoryGategoriesFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FilterDialogDirectoryGategoriesFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GlossaryCategoryRecord"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"children"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]} as unknown as DocumentNode<FilterDialogDirectoryGategoriesFragmentFragment, unknown>;
export const IssueCardIssueFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"IssueCardIssue"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"NewsletterIssue"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"subtitle"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnailUrl"}},{"kind":"Field","name":{"kind":"Name","value":"authorNames"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"publishedAt"}}]}}]} as unknown as DocumentNode<IssueCardIssueFragment, unknown>;
export const GlossaryCategoryFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"GlossaryCategoryFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GlossaryCategoryRecord"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"children"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}}]} as unknown as DocumentNode<GlossaryCategoryFragmentFragment, unknown>;
export const CmsStructuredTextImageRecordFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CmsStructuredTextImageRecord"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ImageRecord"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"responsiveImage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CmsImage"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CmsImage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ResponsiveImage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"srcSet"}},{"kind":"Field","name":{"kind":"Name","value":"webpSrcSet"}},{"kind":"Field","name":{"kind":"Name","value":"sizes"}},{"kind":"Field","name":{"kind":"Name","value":"src"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"aspectRatio"}},{"kind":"Field","name":{"kind":"Name","value":"alt"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"base64"}}]}}]} as unknown as DocumentNode<CmsStructuredTextImageRecordFragment, unknown>;
export const CmsStructuredTextGlossaryDescriptionFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CmsStructuredTextGlossaryDescription"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GlossaryEntryModelDescriptionField"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"blocks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ImageRecord"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CmsStructuredTextImageRecord"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"links"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ArticleRecord"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GlossaryEntryRecord"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"term"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CmsImage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ResponsiveImage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"srcSet"}},{"kind":"Field","name":{"kind":"Name","value":"webpSrcSet"}},{"kind":"Field","name":{"kind":"Name","value":"sizes"}},{"kind":"Field","name":{"kind":"Name","value":"src"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"aspectRatio"}},{"kind":"Field","name":{"kind":"Name","value":"alt"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"base64"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CmsStructuredTextImageRecord"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ImageRecord"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"responsiveImage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CmsImage"}}]}}]}}]}}]} as unknown as DocumentNode<CmsStructuredTextGlossaryDescriptionFragment, unknown>;
export const CompanyPageGetDataDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CompanyPageGetData"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"companySlug"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"company"},"name":{"kind":"Name","value":"glossaryEntry"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"slug"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"companySlug"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"term"}},{"kind":"Field","name":{"kind":"Name","value":"definition"}},{"kind":"Field","name":{"kind":"Name","value":"businessUrl"}},{"kind":"Field","name":{"kind":"Name","value":"affiliateUrl"}},{"kind":"Field","name":{"kind":"Name","value":"description"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"CmsStructuredTextGlossaryDescription"}}]}},{"kind":"Field","name":{"kind":"Name","value":"primaryImage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"responsiveImage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CmsImage"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CmsImage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ResponsiveImage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"srcSet"}},{"kind":"Field","name":{"kind":"Name","value":"webpSrcSet"}},{"kind":"Field","name":{"kind":"Name","value":"sizes"}},{"kind":"Field","name":{"kind":"Name","value":"src"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"aspectRatio"}},{"kind":"Field","name":{"kind":"Name","value":"alt"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"base64"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CmsStructuredTextImageRecord"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ImageRecord"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"responsiveImage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CmsImage"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CmsStructuredTextGlossaryDescription"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GlossaryEntryModelDescriptionField"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"blocks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ImageRecord"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CmsStructuredTextImageRecord"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"links"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ArticleRecord"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GlossaryEntryRecord"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"term"}}]}}]}}]}}]} as unknown as DocumentNode<CompanyPageGetDataQuery, CompanyPageGetDataQueryVariables>;
export const DirectoryIndexPageGetDataDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"DirectoryIndexPageGetData"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"IntType"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"IntType"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"GlossaryEntryModelFilter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"directory"},"name":{"kind":"Name","value":"allGlossaryEntries"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"CompanyCardGridCompany"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"directoryMetadata"},"name":{"kind":"Name","value":"_allGlossaryEntriesMeta"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CmsImage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ResponsiveImage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"srcSet"}},{"kind":"Field","name":{"kind":"Name","value":"webpSrcSet"}},{"kind":"Field","name":{"kind":"Name","value":"sizes"}},{"kind":"Field","name":{"kind":"Name","value":"src"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"aspectRatio"}},{"kind":"Field","name":{"kind":"Name","value":"alt"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"base64"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CompanyCardCompany"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GlossaryEntryRecord"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","alias":{"kind":"Name","value":"name"},"name":{"kind":"Name","value":"term"}},{"kind":"Field","name":{"kind":"Name","value":"definition"}},{"kind":"Field","name":{"kind":"Name","value":"primaryImage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"responsiveImage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CmsImage"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CompanyCardGridCompany"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GlossaryEntryRecord"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"CompanyCardCompany"}}]}}]} as unknown as DocumentNode<DirectoryIndexPageGetDataQuery, DirectoryIndexPageGetDataQueryVariables>;
export const DirectoryFiltersDataDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"DirectoryFiltersData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"featuredCategories"},"name":{"kind":"Name","value":"allGlossaryCategories"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"5"}},{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"parent"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"IntValue","value":"147376160"}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"topLevelCategories"},"name":{"kind":"Name","value":"allGlossaryCategories"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"parent"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"exists"},"value":{"kind":"BooleanValue","value":false}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"children"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FilterDialogDirectoryGategoriesFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FilterDialogDirectoryGategoriesFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GlossaryCategoryRecord"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"children"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]} as unknown as DocumentNode<DirectoryFiltersDataQuery, DirectoryFiltersDataQueryVariables>;
export const GetFilterPreviewDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetFilterPreview"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"GlossaryEntryModelFilter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_allGlossaryEntriesMeta"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]}}]} as unknown as DocumentNode<GetFilterPreviewQuery, GetFilterPreviewQueryVariables>;
export const GetCategoryPageDataDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCategoryPageData"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"GlossaryCategoryModelFilter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"glossaryCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"parent"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<GetCategoryPageDataQuery, GetCategoryPageDataQueryVariables>;
export const GetNewsletterIssueDataDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetNewsletterIssueData"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"slug"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"newsletter"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"newsletterIssue"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"slug"},"value":{"kind":"Variable","name":{"kind":"Name","value":"slug"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"subtitle"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnailUrl"}},{"kind":"Field","name":{"kind":"Name","value":"contentHtml"}}]}}]}}]}}]} as unknown as DocumentNode<GetNewsletterIssueDataQuery, GetNewsletterIssueDataQueryVariables>;
export const GetNewsletterIssuesDataDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetNewsletterIssuesData"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"newsletter"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allNewsletterIssues"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"IssueCardIssue"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"IssueCardIssue"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"NewsletterIssue"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"subtitle"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnailUrl"}},{"kind":"Field","name":{"kind":"Name","value":"authorNames"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"publishedAt"}}]}}]} as unknown as DocumentNode<GetNewsletterIssuesDataQuery, GetNewsletterIssuesDataQueryVariables>;
export const GetHomePageDataDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetHomePageData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"newsletter"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allNewsletterIssues"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"4"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"subtitle"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnailUrl"}}]}}]}}]}},{"kind":"Field","alias":{"kind":"Name","value":"featuredCategories"},"name":{"kind":"Name","value":"glossaryCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"StringValue","value":"147376160","block":false}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"GlossaryCategoryFragment"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"supplyChainCategories"},"name":{"kind":"Name","value":"glossaryCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"StringValue","value":"146755585","block":false}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"GlossaryCategoryFragment"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"productTypeCategories"},"name":{"kind":"Name","value":"glossaryCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"StringValue","value":"146755607","block":false}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"GlossaryCategoryFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"GlossaryCategoryFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GlossaryCategoryRecord"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"children"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}}]} as unknown as DocumentNode<GetHomePageDataQuery, GetHomePageDataQueryVariables>;
export const UseNewsletterSubscribeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UseNewsletterSubscribe"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"subscriberCreate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"subscriber"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]}}]} as unknown as DocumentNode<UseNewsletterSubscribeMutation, UseNewsletterSubscribeMutationVariables>;