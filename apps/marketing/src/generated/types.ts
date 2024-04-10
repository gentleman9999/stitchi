
              /** THIS FILE IS AUTO-GENERATED **/
              /** DO NOT EDIT **/
              /* eslint-disable */
              
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  BigDecimal: { input: any; output: any; }
  BooleanType: { input: any; output: any; }
  CustomData: { input: any; output: any; }
  Date: { input: any; output: any; }
  DateTime: { input: any; output: any; }
  FloatType: { input: any; output: any; }
  IntType: { input: any; output: any; }
  ItemId: { input: any; output: any; }
  JsonField: { input: any; output: any; }
  Long: { input: any; output: any; }
  MetaTagAttributes: { input: any; output: any; }
  UploadId: { input: any; output: any; }
}

/** An error due to customer registration being disabled on a storefront. */
export interface AccountCreationDisabledError extends Error {
  __typename: 'AccountCreationDisabledError';
  /** A description of the error. */
  message: Scalars['String']['output'];
}

/** Add cart line items data object */
export interface AddCartLineItemsDataInput {
  /** List of gift certificates */
  giftCertificates?: InputMaybe<Array<CartGiftCertificateInput>>;
  /** List of cart line items */
  lineItems?: InputMaybe<Array<CartLineItemInput>>;
}

/** Add cart line items input object */
export interface AddCartLineItemsInput {
  /** The cart id */
  cartEntityId: Scalars['String']['input'];
  /** Add cart line items data object */
  data: AddCartLineItemsDataInput;
}

/** Add cart line items result */
export interface AddCartLineItemsResult {
  __typename: 'AddCartLineItemsResult';
  /** The Cart that is updated as a result of mutation. */
  cart: Maybe<Cart>;
}

/** Add checkout billing address data object */
export interface AddCheckoutBillingAddressDataInput {
  /** The checkout billing address */
  address: CheckoutAddressInput;
}

/** Add checkout billing address input object */
export interface AddCheckoutBillingAddressInput {
  /** The checkout id */
  checkoutEntityId: Scalars['String']['input'];
  /** Add checkout billing address data object */
  data: AddCheckoutBillingAddressDataInput;
}

/** Add checkout billing address result */
export interface AddCheckoutBillingAddressResult {
  __typename: 'AddCheckoutBillingAddressResult';
  /** The Checkout that is updated as a result of mutation. */
  checkout: Maybe<Checkout>;
}

/** Add checkout shipping consignments data object */
export interface AddCheckoutShippingConsignmentsDataInput {
  /** The list of shipping consignments */
  consignments: Array<CheckoutShippingConsignmentInput>;
}

/** Add checkout shipping consignments input object */
export interface AddCheckoutShippingConsignmentsInput {
  /** The checkout id */
  checkoutEntityId: Scalars['String']['input'];
  /** Add checkout shipping consignments data object */
  data: AddCheckoutShippingConsignmentsDataInput;
}

/** Apply checkout shipping consignments result */
export interface AddCheckoutShippingConsignmentsResult {
  __typename: 'AddCheckoutShippingConsignmentsResult';
  /** The Checkout that is updated as a result of mutation. */
  checkout: Maybe<Checkout>;
}

/** Possible response error when attempting to use AddCustomerAddress mutation. */
export type AddCustomerAddressError = CustomerAddressCreationError | CustomerNotLoggedInError | ValidationError;

/** Input for adding a customer address. */
export interface AddCustomerAddressInput {
  /** First line for the street address. */
  address1: Scalars['String']['input'];
  /** Second line for the street address. */
  address2?: InputMaybe<Scalars['String']['input']>;
  /** City. */
  city: Scalars['String']['input'];
  /** Company name associated with the address. */
  company?: InputMaybe<Scalars['String']['input']>;
  /** 2-letter country code. */
  countryCode: Scalars['String']['input'];
  /** First name of the address owner. */
  firstName: Scalars['String']['input'];
  /** Additional form fields defined by merchant. */
  formFields?: InputMaybe<CustomerFormFieldsInput>;
  /** Last name of the address owner. */
  lastName: Scalars['String']['input'];
  /** Phone number. */
  phone?: InputMaybe<Scalars['String']['input']>;
  /** Postal code for the address. This is only required for certain countries. */
  postalCode?: InputMaybe<Scalars['String']['input']>;
  /** Name of State or Province. */
  stateOrProvince?: InputMaybe<Scalars['String']['input']>;
}

/** Result of AddCustomerAddress mutation. */
export interface AddCustomerAddressResult {
  __typename: 'AddCustomerAddressResult';
  /** Customer address that was created. */
  address: Maybe<CustomerAddress>;
  /** List of response errors when attempting to submit an address. */
  errors: Array<AddCustomerAddressError>;
}

/** Add wishlist items input object */
export interface AddWishlistItemsInput {
  /** The wishlist id */
  entityId: Scalars['Int']['input'];
  /** The new wishlist items */
  items: Array<WishlistItemInput>;
}

/** Add wishlist items */
export interface AddWishlistItemsResult {
  __typename: 'AddWishlistItemsResult';
  /** The wishlist */
  result: Wishlist;
}

/** An error due to providing an invalid or non-existent address ID.  */
export interface AddressDoesNotExistError extends Error {
  __typename: 'AddressDoesNotExistError';
  /** Error message. */
  message: Scalars['String']['output'];
}

/** Aggregated */
export interface Aggregated {
  __typename: 'Aggregated';
  /** Number of available products in stock. This can be 'null' if inventory is not set orif the store's Inventory Settings disable displaying stock levels on the storefront. */
  availableToSell: Scalars['Long']['output'];
  /** Indicates a threshold low-stock level.  This can be 'null' if the inventory warning level is not set or if the store's Inventory Settings disable displaying stock levels on the storefront. */
  warningLevel: Scalars['Int']['output'];
}

/** Aggregated Product Inventory */
export interface AggregatedInventory {
  __typename: 'AggregatedInventory';
  /** Number of available products in stock. This can be 'null' if inventory is not set orif the store's Inventory Settings disable displaying stock levels on the storefront. */
  availableToSell: Scalars['Int']['output'];
  /** Indicates a threshold low-stock level. This can be 'null' if the inventory warning level is not set or if the store's Inventory Settings disable displaying stock levels on the storefront. */
  warningLevel: Scalars['Int']['output'];
}

/** Apply checkout coupon data object */
export interface ApplyCheckoutCouponDataInput {
  /** The checkout coupon code */
  couponCode: Scalars['String']['input'];
}

/** Apply checkout coupon input object */
export interface ApplyCheckoutCouponInput {
  /** The checkout id */
  checkoutEntityId: Scalars['String']['input'];
  /** Apply checkout coupon data object */
  data: ApplyCheckoutCouponDataInput;
}

/** Apply checkout coupon result */
export interface ApplyCheckoutCouponResult {
  __typename: 'ApplyCheckoutCouponResult';
  /** The Checkout that is updated as a result of mutation. */
  checkout: Maybe<Checkout>;
}

/** Apply checkout spam protection data object */
export interface ApplyCheckoutSpamProtectionDataInput {
  /** The checkout spam protection token */
  token: Scalars['String']['input'];
}

/** Apply checkout spam protection input object */
export interface ApplyCheckoutSpamProtectionInput {
  /** The checkout id */
  checkoutEntityId: Scalars['String']['input'];
  /** Apply checkout spam protection data object */
  data: ApplyCheckoutSpamProtectionDataInput;
}

/** Apply checkout spam protection result */
export interface ApplyCheckoutSpamProtectionResult {
  __typename: 'ApplyCheckoutSpamProtectionResult';
  /** The Checkout that is updated as a result of mutation. */
  checkout: Maybe<Checkout>;
}

export interface ArticleModelContentField {
  __typename: 'ArticleModelContentField';
  blocks: Array<ImageRecord>;
  links: Array<ArticleModelContentLinksField>;
  value: Scalars['JsonField']['output'];
}

export type ArticleModelContentLinksField = ArticleRecord | CustomComponentRecord | GlossaryEntryRecord | TableRecord;

/** Linking fields */
export enum ArticleModelFieldsReferencingGlossaryEntryModel {
  article_content = 'article_content'
}

export interface ArticleModelFilter {
  AND?: InputMaybe<Array<InputMaybe<ArticleModelFilter>>>;
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
}

export enum ArticleModelOrderBy {
  _createdAt_ASC = '_createdAt_ASC',
  _createdAt_DESC = '_createdAt_DESC',
  _firstPublishedAt_ASC = '_firstPublishedAt_ASC',
  _firstPublishedAt_DESC = '_firstPublishedAt_DESC',
  _isValid_ASC = '_isValid_ASC',
  _isValid_DESC = '_isValid_DESC',
  _publicationScheduledAt_ASC = '_publicationScheduledAt_ASC',
  _publicationScheduledAt_DESC = '_publicationScheduledAt_DESC',
  _publishedAt_ASC = '_publishedAt_ASC',
  _publishedAt_DESC = '_publishedAt_DESC',
  _status_ASC = '_status_ASC',
  _status_DESC = '_status_DESC',
  _unpublishingScheduledAt_ASC = '_unpublishingScheduledAt_ASC',
  _unpublishingScheduledAt_DESC = '_unpublishingScheduledAt_DESC',
  _updatedAt_ASC = '_updatedAt_ASC',
  _updatedAt_DESC = '_updatedAt_DESC',
  createdAt_ASC = 'createdAt_ASC',
  createdAt_DESC = 'createdAt_DESC',
  id_ASC = 'id_ASC',
  id_DESC = 'id_DESC',
  title_ASC = 'title_ASC',
  title_DESC = 'title_DESC',
  updatedAt_ASC = 'updatedAt_ASC',
  updatedAt_DESC = 'updatedAt_DESC'
}

/** Record of type Article (article) */
export interface ArticleRecord extends RecordInterface {
  __typename: 'ArticleRecord';
  _createdAt: Scalars['DateTime']['output'];
  /** Editing URL */
  _editingUrl: Maybe<Scalars['String']['output']>;
  _firstPublishedAt: Maybe<Scalars['DateTime']['output']>;
  _isValid: Scalars['BooleanType']['output'];
  _modelApiKey: Scalars['String']['output'];
  _publicationScheduledAt: Maybe<Scalars['DateTime']['output']>;
  _publishedAt: Maybe<Scalars['DateTime']['output']>;
  /** Generates SEO and Social card meta tags to be used in your frontend */
  _seoMetaTags: Array<Tag>;
  _status: ItemStatus;
  _unpublishingScheduledAt: Maybe<Scalars['DateTime']['output']>;
  _updatedAt: Scalars['DateTime']['output'];
  author: Maybe<AuthorRecord>;
  categories: Array<CategoryRecord>;
  content: Maybe<ArticleModelContentField>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ItemId']['output'];
  image: Maybe<FileField>;
  seoMetadata: Maybe<SeoField>;
  shortDescription: Maybe<Scalars['String']['output']>;
  slug: Maybe<Scalars['String']['output']>;
  title: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
}


/** Record of type Article (article) */
export interface ArticleRecord_seoMetaTagsArgs {
  locale?: InputMaybe<SiteLocale>;
}


/** Record of type Article (article) */
export interface ArticleRecordshortDescriptionArgs {
  markdown?: InputMaybe<Scalars['Boolean']['input']>;
}

/** Assign cart to the customer input object. */
export interface AssignCartToCustomerInput {
  /** The cart id. */
  cartEntityId: Scalars['String']['input'];
}

/** Assign cart to the customer result. */
export interface AssignCartToCustomerResult {
  __typename: 'AssignCartToCustomerResult';
  /** The Cart that is updated as a result of mutation. */
  cart: Maybe<Cart>;
}

/** Author */
export interface Author {
  __typename: 'Author';
  /** Author name. */
  name: Scalars['String']['output'];
}

export interface AuthorModelFilter {
  AND?: InputMaybe<Array<InputMaybe<AuthorModelFilter>>>;
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
}

export enum AuthorModelOrderBy {
  _createdAt_ASC = '_createdAt_ASC',
  _createdAt_DESC = '_createdAt_DESC',
  _firstPublishedAt_ASC = '_firstPublishedAt_ASC',
  _firstPublishedAt_DESC = '_firstPublishedAt_DESC',
  _isValid_ASC = '_isValid_ASC',
  _isValid_DESC = '_isValid_DESC',
  _publicationScheduledAt_ASC = '_publicationScheduledAt_ASC',
  _publicationScheduledAt_DESC = '_publicationScheduledAt_DESC',
  _publishedAt_ASC = '_publishedAt_ASC',
  _publishedAt_DESC = '_publishedAt_DESC',
  _status_ASC = '_status_ASC',
  _status_DESC = '_status_DESC',
  _unpublishingScheduledAt_ASC = '_unpublishingScheduledAt_ASC',
  _unpublishingScheduledAt_DESC = '_unpublishingScheduledAt_DESC',
  _updatedAt_ASC = '_updatedAt_ASC',
  _updatedAt_DESC = '_updatedAt_DESC',
  createdAt_ASC = 'createdAt_ASC',
  createdAt_DESC = 'createdAt_DESC',
  id_ASC = 'id_ASC',
  id_DESC = 'id_DESC',
  name_ASC = 'name_ASC',
  name_DESC = 'name_DESC',
  updatedAt_ASC = 'updatedAt_ASC',
  updatedAt_DESC = 'updatedAt_DESC'
}

/** Record of type Author (author) */
export interface AuthorRecord extends RecordInterface {
  __typename: 'AuthorRecord';
  _createdAt: Scalars['DateTime']['output'];
  /** Editing URL */
  _editingUrl: Maybe<Scalars['String']['output']>;
  _firstPublishedAt: Maybe<Scalars['DateTime']['output']>;
  _isValid: Scalars['BooleanType']['output'];
  _modelApiKey: Scalars['String']['output'];
  _publicationScheduledAt: Maybe<Scalars['DateTime']['output']>;
  _publishedAt: Maybe<Scalars['DateTime']['output']>;
  /** Generates SEO and Social card meta tags to be used in your frontend */
  _seoMetaTags: Array<Tag>;
  _status: ItemStatus;
  _unpublishingScheduledAt: Maybe<Scalars['DateTime']['output']>;
  _updatedAt: Scalars['DateTime']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ItemId']['output'];
  image: Maybe<FileField>;
  name: Maybe<Scalars['String']['output']>;
  seoMetadata: Maybe<SeoField>;
  slug: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
}


/** Record of type Author (author) */
export interface AuthorRecord_seoMetaTagsArgs {
  locale?: InputMaybe<SiteLocale>;
}

/** Banner details. */
export interface Banner extends Node {
  __typename: 'Banner';
  /** The content of the Banner. */
  content: Scalars['String']['output'];
  /** The id of the Banner. */
  entityId: Scalars['Long']['output'];
  /** The ID of the banner. */
  id: Scalars['ID']['output'];
  /** The location of the Banner. */
  location: BannerLocation;
  /** The name of the Banner. */
  name: Scalars['String']['output'];
}

/** A connection to a list of items. */
export interface BannerConnection {
  __typename: 'BannerConnection';
  /** A list of edges. */
  edges: Maybe<Array<BannerEdge>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
}

/** An edge in a connection. */
export interface BannerEdge {
  __typename: 'BannerEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: Banner;
}

/** Banner location */
export enum BannerLocation {
  BOTTOM = 'BOTTOM',
  TOP = 'TOP'
}

/** Banners details. */
export interface Banners {
  __typename: 'Banners';
  /** List of brand page banners. */
  brandPage: BrandPageBannerConnection;
  /** List of category page banners. */
  categoryPage: CategoryPageBannerConnection;
  /** List of home page banners. */
  homePage: BannerConnection;
  /** List of search page banners. */
  searchPage: BannerConnection;
}


/** Banners details. */
export interface BannersbrandPageArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  brandEntityId: Scalars['Int']['input'];
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
}


/** Banners details. */
export interface BannerscategoryPageArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  categoryEntityId: Scalars['Int']['input'];
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
}


/** Banners details. */
export interface BannershomePageArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
}


/** Banners details. */
export interface BannerssearchPageArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
}

/** Blog details. */
export interface Blog extends Node {
  __typename: 'Blog';
  /** The description of the Blog. */
  description: Scalars['String']['output'];
  /** The ID of an object */
  id: Scalars['ID']['output'];
  /** Whether or not the blog should be visible in the navigation menu. */
  isVisibleInNavigation: Scalars['Boolean']['output'];
  /** The name of the Blog. */
  name: Scalars['String']['output'];
  /** The path of the Blog. */
  path: Scalars['String']['output'];
  /** Blog post details. */
  post: Maybe<BlogPost>;
  /** Details of the Blog posts. */
  posts: BlogPostConnection;
  /** The rendered regions for the blog index. */
  renderedRegions: RenderedRegionsByPageType;
}


/** Blog details. */
export interface BlogpostArgs {
  entityId: Scalars['Int']['input'];
}


/** Blog details. */
export interface BlogpostsArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filters?: InputMaybe<BlogPostsFiltersInput>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<sortBy>;
}

/** A blog index page. */
export interface BlogIndexPage extends Node, WebPage {
  __typename: 'BlogIndexPage';
  /** Unique ID for the web page. */
  entityId: Scalars['Int']['output'];
  /** The ID of an object */
  id: Scalars['ID']['output'];
  /** Whether or not the page should be visible in the navigation menu. */
  isVisibleInNavigation: Scalars['Boolean']['output'];
  /** Page name. */
  name: Scalars['String']['output'];
  /** Unique ID for the parent page. */
  parentEntityId: Maybe<Scalars['Int']['output']>;
  /** The URL path of the page. */
  path: Scalars['String']['output'];
  /** The rendered regions for the web page. */
  renderedRegions: RenderedRegionsByPageType;
  /** Page SEO details. */
  seo: SeoDetails;
}

/** Record of type Blog Index Page (blog_index_page) */
export interface BlogIndexPageRecord extends RecordInterface {
  __typename: 'BlogIndexPageRecord';
  _createdAt: Scalars['DateTime']['output'];
  /** Editing URL */
  _editingUrl: Maybe<Scalars['String']['output']>;
  _firstPublishedAt: Maybe<Scalars['DateTime']['output']>;
  _isValid: Scalars['BooleanType']['output'];
  _modelApiKey: Scalars['String']['output'];
  _publicationScheduledAt: Maybe<Scalars['DateTime']['output']>;
  _publishedAt: Maybe<Scalars['DateTime']['output']>;
  /** Generates SEO and Social card meta tags to be used in your frontend */
  _seoMetaTags: Array<Tag>;
  _status: ItemStatus;
  _unpublishingScheduledAt: Maybe<Scalars['DateTime']['output']>;
  _updatedAt: Scalars['DateTime']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ItemId']['output'];
  seoMetadata: Maybe<SeoField>;
  updatedAt: Scalars['DateTime']['output'];
}


/** Record of type Blog Index Page (blog_index_page) */
export interface BlogIndexPageRecord_seoMetaTagsArgs {
  locale?: InputMaybe<SiteLocale>;
}

/** Blog post details. */
export interface BlogPost extends Node {
  __typename: 'BlogPost';
  /** Blog post author. */
  author: Maybe<Scalars['String']['output']>;
  /** Unique ID for the blog post. */
  entityId: Scalars['Int']['output'];
  /** The body of the Blog post. */
  htmlBody: Scalars['String']['output'];
  /** The ID of an object */
  id: Scalars['ID']['output'];
  /** Blog post name. */
  name: Scalars['String']['output'];
  /** Blog post path. */
  path: Scalars['String']['output'];
  /** The plain text summary of the Blog post. */
  plainTextSummary: Scalars['String']['output'];
  /** Blog post published date. */
  publishedDate: DateTimeExtended;
  /** The rendered regions for the blog post. */
  renderedRegions: RenderedRegionsByPageType;
  /** Blog post SEO details. */
  seo: SeoDetails;
  /** Blog post tags. */
  tags: Array<Scalars['String']['output']>;
  /** Blog post thumbnail image. */
  thumbnailImage: Maybe<Image>;
}


/** Blog post details. */
export interface BlogPostplainTextSummaryArgs {
  characterLimit?: InputMaybe<Scalars['Int']['input']>;
}

/** A connection to a list of items. */
export interface BlogPostConnection {
  __typename: 'BlogPostConnection';
  /** Collection info */
  collectionInfo: Maybe<CollectionInfo>;
  /** A list of edges. */
  edges: Maybe<Array<BlogPostEdge>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
}

/** An edge in a connection. */
export interface BlogPostEdge {
  __typename: 'BlogPostEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: BlogPost;
}

/** Redirect to a blog post. */
export interface BlogPostRedirect {
  __typename: 'BlogPostRedirect';
  /** Entity id. */
  entityId: Scalars['Int']['output'];
  /** The ID of an object. */
  id: Scalars['ID']['output'];
  /** Relative destination url. */
  path: Scalars['String']['output'];
}

/** Object containing the filters for querying blog posts */
export interface BlogPostsFiltersInput {
  /** Ids of the expected blog posts. */
  entityIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  /** Tags of the expected blog posts. */
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
}

/** Specifies how to filter Boolean fields */
export interface BooleanFilter {
  /** Search for records with an exact match */
  eq?: InputMaybe<Scalars['BooleanType']['input']>;
}

/** Brand */
export interface Brand extends Node {
  __typename: 'Brand';
  /** Default image for brand. */
  defaultImage: Maybe<Image>;
  /** Id of the brand. */
  entityId: Scalars['Int']['output'];
  /** The ID of an object */
  id: Scalars['ID']['output'];
  /**
   * Meta description for the brand.
   * @deprecated Use SEO details instead.
   */
  metaDesc: Scalars['String']['output'];
  /**
   * Meta keywords for the brand.
   * @deprecated Use SEO details instead.
   */
  metaKeywords: Array<Scalars['String']['output']>;
  /** Metafield data related to a brand. */
  metafields: MetafieldConnection;
  /** Name of the brand. */
  name: Scalars['String']['output'];
  /**
   * Page title for the brand.
   * @deprecated Use SEO details instead.
   */
  pageTitle: Scalars['String']['output'];
  /** Path for the brand page. */
  path: Scalars['String']['output'];
  /** List of products associated with the brand. */
  products: ProductConnection;
  /** Search keywords for the brand. */
  searchKeywords: Array<Scalars['String']['output']>;
  /** Brand SEO details. */
  seo: SeoDetails;
}


/** Brand */
export interface BrandmetafieldsArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  keys?: InputMaybe<Array<Scalars['String']['input']>>;
  last?: InputMaybe<Scalars['Int']['input']>;
  namespace: Scalars['String']['input'];
}


/** Brand */
export interface BrandproductsArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  hideOutOfStock?: InputMaybe<Scalars['Boolean']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
}

/** A connection to a list of items. */
export interface BrandConnection {
  __typename: 'BrandConnection';
  /** A list of edges. */
  edges: Maybe<Array<BrandEdge>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
}

/** An edge in a connection. */
export interface BrandEdge {
  __typename: 'BrandEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: Brand;
}

/** A connection to a list of items. */
export interface BrandPageBannerConnection {
  __typename: 'BrandPageBannerConnection';
  /** A list of edges. */
  edges: Maybe<Array<BrandPageBannerEdge>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
}

/** An edge in a connection. */
export interface BrandPageBannerEdge {
  __typename: 'BrandPageBannerEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: Banner;
}

/** Redirect to a brand. */
export interface BrandRedirect {
  __typename: 'BrandRedirect';
  /** Entity id. */
  entityId: Scalars['Int']['output'];
  /** The ID of an object. */
  id: Scalars['ID']['output'];
  /** Relative destination url. */
  path: Scalars['String']['output'];
}

/** Brand Filter */
export interface BrandSearchFilter extends SearchProductFilter {
  __typename: 'BrandSearchFilter';
  /** List of available brands. */
  brands: BrandSearchFilterItemConnection;
  /** Indicates whether to display product count next to the filter. */
  displayProductCount: Scalars['Boolean']['output'];
  /** Indicates whether filter is collapsed by default. */
  isCollapsedByDefault: Scalars['Boolean']['output'];
  /** Display name for the filter. */
  name: Scalars['String']['output'];
}


/** Brand Filter */
export interface BrandSearchFilterbrandsArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
}

/** Specific brand filter item */
export interface BrandSearchFilterItem {
  __typename: 'BrandSearchFilterItem';
  /** Brand ID. */
  entityId: Scalars['Int']['output'];
  /** Indicates whether brand is selected. */
  isSelected: Scalars['Boolean']['output'];
  /** Brand name. */
  name: Scalars['String']['output'];
  /** Indicates how many products available for this filter. */
  productCount: Scalars['Int']['output'];
}

/** A connection to a list of items. */
export interface BrandSearchFilterItemConnection {
  __typename: 'BrandSearchFilterItemConnection';
  /** A list of edges. */
  edges: Maybe<Array<BrandSearchFilterItemEdge>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
}

/** An edge in a connection. */
export interface BrandSearchFilterItemEdge {
  __typename: 'BrandSearchFilterItemEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: BrandSearchFilterItem;
}

/** Breadcrumb */
export interface Breadcrumb {
  __typename: 'Breadcrumb';
  /** Category id. */
  entityId: Scalars['Int']['output'];
  /** Name of the category. */
  name: Scalars['String']['output'];
  /** Path to the category. */
  path: Maybe<Scalars['String']['output']>;
}

/** A connection to a list of items. */
export interface BreadcrumbConnection {
  __typename: 'BreadcrumbConnection';
  /** A list of edges. */
  edges: Maybe<Array<BreadcrumbEdge>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
}

/** An edge in a connection. */
export interface BreadcrumbEdge {
  __typename: 'BreadcrumbEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: Breadcrumb;
}

/** Bulk pricing tier that sets a fixed price for the product or variant. */
export interface BulkPricingFixedPriceDiscount extends BulkPricingTier {
  __typename: 'BulkPricingFixedPriceDiscount';
  /** Maximum item quantity that applies to this bulk pricing tier - if not defined then the tier does not have an upper bound. */
  maximumQuantity: Maybe<Scalars['Int']['output']>;
  /** Minimum item quantity that applies to this bulk pricing tier. */
  minimumQuantity: Scalars['Int']['output'];
  /** This price will override the current product price. */
  price: Scalars['BigDecimal']['output'];
}

/** Bulk pricing tier that reduces the price of the product or variant by a percentage. */
export interface BulkPricingPercentageDiscount extends BulkPricingTier {
  __typename: 'BulkPricingPercentageDiscount';
  /** Maximum item quantity that applies to this bulk pricing tier - if not defined then the tier does not have an upper bound. */
  maximumQuantity: Maybe<Scalars['Int']['output']>;
  /** Minimum item quantity that applies to this bulk pricing tier. */
  minimumQuantity: Scalars['Int']['output'];
  /** The percentage that will be removed from the product price. */
  percentOff: Scalars['BigDecimal']['output'];
}

/** Bulk pricing tier that will subtract an amount from the price of the product or variant. */
export interface BulkPricingRelativePriceDiscount extends BulkPricingTier {
  __typename: 'BulkPricingRelativePriceDiscount';
  /** Maximum item quantity that applies to this bulk pricing tier - if not defined then the tier does not have an upper bound. */
  maximumQuantity: Maybe<Scalars['Int']['output']>;
  /** Minimum item quantity that applies to this bulk pricing tier. */
  minimumQuantity: Scalars['Int']['output'];
  /** The price of the product/variant will be reduced by this priceAdjustment. */
  priceAdjustment: Scalars['BigDecimal']['output'];
}

/** A set of bulk pricing tiers that define price discounts which apply when purchasing specified quantities of a product or variant. */
export interface BulkPricingTier {
  /** Maximum item quantity that applies to this bulk pricing tier - if not defined then the tier does not have an upper bound. */
  maximumQuantity: Maybe<Scalars['Int']['output']>;
  /** Minimum item quantity that applies to this bulk pricing tier. */
  minimumQuantity: Scalars['Int']['output'];
}

/** Block of type Call To Action Button (call_to_action_button) */
export interface CallToActionButtonRecord extends RecordInterface {
  __typename: 'CallToActionButtonRecord';
  _createdAt: Scalars['DateTime']['output'];
  /** Editing URL */
  _editingUrl: Maybe<Scalars['String']['output']>;
  _firstPublishedAt: Maybe<Scalars['DateTime']['output']>;
  _isValid: Scalars['BooleanType']['output'];
  _modelApiKey: Scalars['String']['output'];
  _publicationScheduledAt: Maybe<Scalars['DateTime']['output']>;
  _publishedAt: Maybe<Scalars['DateTime']['output']>;
  /** Generates SEO and Social card meta tags to be used in your frontend */
  _seoMetaTags: Array<Tag>;
  _status: ItemStatus;
  _unpublishingScheduledAt: Maybe<Scalars['DateTime']['output']>;
  _updatedAt: Scalars['DateTime']['output'];
  createdAt: Scalars['DateTime']['output'];
  icon: Array<HeroIconRecord>;
  id: Scalars['ItemId']['output'];
  label: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  url: Maybe<Scalars['String']['output']>;
}


/** Block of type Call To Action Button (call_to_action_button) */
export interface CallToActionButtonRecord_seoMetaTagsArgs {
  locale?: InputMaybe<SiteLocale>;
}

/** A cart */
export interface Cart extends Node {
  __typename: 'Cart';
  /** Sum of line-items amounts, minus cart-level discounts and coupons. This amount includes taxes (where applicable). */
  amount: Money;
  /** Cost of cart's contents, before applying discounts. */
  baseAmount: Money;
  /** Time when the cart was created. */
  createdAt: DateTimeExtended;
  /** ISO-4217 currency code. */
  currencyCode: Scalars['String']['output'];
  /** Discounted amount. */
  discountedAmount: Money;
  /** List of discounts applied to this cart. */
  discounts: Array<CartDiscount>;
  /** Cart ID. */
  entityId: Scalars['String']['output'];
  /** The ID of an object */
  id: Scalars['ID']['output'];
  /** Whether this item is taxable. */
  isTaxIncluded: Scalars['Boolean']['output'];
  /** List of line items. */
  lineItems: CartLineItems;
  /** Locale of the cart. */
  locale: Scalars['String']['output'];
  /** Metafield data related to a cart. */
  metafields: MetafieldConnection;
  /** Time when the cart was last updated. */
  updatedAt: DateTimeExtended;
}


/** A cart */
export interface CartmetafieldsArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  keys?: InputMaybe<Array<Scalars['String']['input']>>;
  last?: InputMaybe<Scalars['Int']['input']>;
  namespace: Scalars['String']['input'];
}

/** Cart custom item. */
export interface CartCustomItem {
  __typename: 'CartCustomItem';
  /** ID of the custom item. */
  entityId: Scalars['String']['output'];
  /** Item's list price multiplied by the quantity. */
  extendedListPrice: Money;
  /** Price of the item. With or without tax depending on your stores set up. */
  listPrice: Money;
  /** Custom item name. */
  name: Scalars['String']['output'];
  /** Quantity of this item. */
  quantity: Scalars['Int']['output'];
  /** Custom item sku. */
  sku: Maybe<Scalars['String']['output']>;
}

/** Cart digital item. */
export interface CartDigitalItem {
  __typename: 'CartDigitalItem';
  /** The product brand. */
  brand: Maybe<Scalars['String']['output']>;
  /** The total value of all coupons applied to this item. */
  couponAmount: Money;
  /** The total value of all discounts applied to this item (excluding coupon). */
  discountedAmount: Money;
  /** List of discounts applied to this item. */
  discounts: Array<CartDiscount>;
  /** The line-item ID. */
  entityId: Scalars['String']['output'];
  /** Item's list price multiplied by the quantity. */
  extendedListPrice: Money;
  /** Item's sale price multiplied by the quantity. */
  extendedSalePrice: Money;
  /** URL of an image of this item, accessible on the internet. */
  imageUrl: Maybe<Scalars['String']['output']>;
  /** Whether the item is taxable. */
  isTaxable: Scalars['Boolean']['output'];
  /** The net item price before discounts and coupons. It is based on the product default price or sale price (if set) configured in BigCommerce Admin. */
  listPrice: Money;
  /** The item's product name. */
  name: Scalars['String']['output'];
  /** An item’s original price is the same as the product default price in the admin panel. */
  originalPrice: Money;
  /** The product is part of a bundle such as a product pick list, then the parentId or the main product id will populate. */
  parentEntityId: Maybe<Scalars['String']['output']>;
  /** ID of the product. */
  productEntityId: Scalars['Int']['output'];
  /** Quantity of this item. */
  quantity: Scalars['Int']['output'];
  /** Item's price after all discounts are applied. (The final price before tax calculation). */
  salePrice: Money;
  /** The list of selected options for this product. */
  selectedOptions: Array<CartSelectedOption>;
  /** SKU of the variant. */
  sku: Maybe<Scalars['String']['output']>;
  /** The product URL. */
  url: Scalars['String']['output'];
  /** ID of the variant. */
  variantEntityId: Maybe<Scalars['Int']['output']>;
}

/** Discount applied to the cart. */
export interface CartDiscount {
  __typename: 'CartDiscount';
  /** The discounted amount applied within a given context. */
  discountedAmount: Money;
  /** ID of the applied discount. */
  entityId: Scalars['String']['output'];
}

/** Cart gift certificate */
export interface CartGiftCertificate {
  __typename: 'CartGiftCertificate';
  /** Value must be between 1.00 and 1,000.00 in the store's default currency. */
  amount: Money;
  /** ID of this gift certificate. */
  entityId: Scalars['String']['output'];
  /** Whether or not the gift certificate is taxable. */
  isTaxable: Scalars['Boolean']['output'];
  /** Message that will be sent to the gift certificate's recipient. Limited to 200 characters. */
  message: Maybe<Scalars['String']['output']>;
  /** GiftCertificate-provided name that will appear in the control panel. */
  name: Scalars['String']['output'];
  /** Recipient of the gift certificate. */
  recipient: CartGiftCertificateRecipient;
  /** Sender of the gift certificate. */
  sender: CartGiftCertificateSender;
  /** Currently supports Birthday, Boy, Celebration, Christmas, General, and Girl. */
  theme: CartGiftCertificateTheme;
}

/** Cart gift certificate input object */
export interface CartGiftCertificateInput {
  /** Value must be between 1.00 and 1,000.00 in the store's default currency. */
  amount: Scalars['BigDecimal']['input'];
  /** Message that will be sent to the gift certificate's recipient. Limited to 200 characters. */
  message?: InputMaybe<Scalars['String']['input']>;
  /** GiftCertificate-provided name that will appear in the control panel. */
  name: Scalars['String']['input'];
  /** The total number of certificates */
  quantity: Scalars['Int']['input'];
  /** Recipient of the gift certificate. */
  recipient: CartGiftCertificateRecipientInput;
  /** Sender of the gift certificate. */
  sender: CartGiftCertificateSenderInput;
  /** Currently supports Birthday, Boy, Celebration, Christmas, General, and Girl. */
  theme: CartGiftCertificateTheme;
}

/** Cart gift certificate recipient */
export interface CartGiftCertificateRecipient {
  __typename: 'CartGiftCertificateRecipient';
  /** Contact's email address. */
  email: Scalars['String']['output'];
  /** Contact's name. */
  name: Scalars['String']['output'];
}

/** Cart gift certificate recipient input object */
export interface CartGiftCertificateRecipientInput {
  /** Contact's email address. */
  email: Scalars['String']['input'];
  /** Contact's name. */
  name: Scalars['String']['input'];
}

/** Cart gift certificate sender */
export interface CartGiftCertificateSender {
  __typename: 'CartGiftCertificateSender';
  /** Contact's email address. */
  email: Scalars['String']['output'];
  /** Contact's name. */
  name: Scalars['String']['output'];
}

/** Cart gift certificate sender input object */
export interface CartGiftCertificateSenderInput {
  /** Contact's email address. */
  email: Scalars['String']['input'];
  /** Contact's name. */
  name: Scalars['String']['input'];
}

/** Cart gift certificate theme */
export enum CartGiftCertificateTheme {
  BIRTHDAY = 'BIRTHDAY',
  BOY = 'BOY',
  CELEBRATION = 'CELEBRATION',
  CHRISTMAS = 'CHRISTMAS',
  GENERAL = 'GENERAL',
  GIRL = 'GIRL'
}

/** Gift wrapping for the item */
export interface CartGiftWrapping {
  __typename: 'CartGiftWrapping';
  /** Gift-wrapping price per product. */
  amount: Money;
  /** Custom gift message along with items wrapped in this wrapping option. */
  message: Maybe<Scalars['String']['output']>;
  /** Name of the gift-wrapping option. */
  name: Scalars['String']['output'];
}

/** Cart line item input object */
export interface CartLineItemInput {
  /** The product id */
  productEntityId: Scalars['Int']['input'];
  /** Total number of line items. */
  quantity: Scalars['Int']['input'];
  /** The list of selected options for this item. */
  selectedOptions?: InputMaybe<CartSelectedOptionsInput>;
  /** The variant id */
  variantEntityId?: InputMaybe<Scalars['Int']['input']>;
}

/** Cart line items */
export interface CartLineItems {
  __typename: 'CartLineItems';
  /** List of custom items. */
  customItems: Array<CartCustomItem>;
  /** List of digital items. */
  digitalItems: Array<CartDigitalItem>;
  /** List of gift certificates. */
  giftCertificates: Array<CartGiftCertificate>;
  /** List of physical items. */
  physicalItems: Array<CartPhysicalItem>;
  /** Total number of line items. */
  totalQuantity: Scalars['Int']['output'];
}

/** Cart mutations */
export interface CartMutations {
  __typename: 'CartMutations';
  /** Adds line item(s) to the cart. */
  addCartLineItems: Maybe<AddCartLineItemsResult>;
  /** Assign cart to the customer. */
  assignCartToCustomer: Maybe<AssignCartToCustomerResult>;
  /** Creates a cart and generates a cart ID. */
  createCart: Maybe<CreateCartResult>;
  /** Deletes a Cart. */
  deleteCart: Maybe<DeleteCartResult>;
  /** Delete line item in the cart. Removing the last line item in the Cart deletes the Cart. */
  deleteCartLineItem: Maybe<DeleteCartLineItemResult>;
  /** Unassign cart from the customer. */
  unassignCartFromCustomer: Maybe<UnassignCartFromCustomerResult>;
  /** Update currency of the cart. */
  updateCartCurrency: Maybe<UpdateCartCurrencyResult>;
  /** Updates line item in the cart. */
  updateCartLineItem: Maybe<UpdateCartLineItemResult>;
}


/** Cart mutations */
export interface CartMutationsaddCartLineItemsArgs {
  input: AddCartLineItemsInput;
}


/** Cart mutations */
export interface CartMutationsassignCartToCustomerArgs {
  input: AssignCartToCustomerInput;
}


/** Cart mutations */
export interface CartMutationscreateCartArgs {
  input: CreateCartInput;
}


/** Cart mutations */
export interface CartMutationsdeleteCartArgs {
  input: DeleteCartInput;
}


/** Cart mutations */
export interface CartMutationsdeleteCartLineItemArgs {
  input: DeleteCartLineItemInput;
}


/** Cart mutations */
export interface CartMutationsunassignCartFromCustomerArgs {
  input: UnassignCartFromCustomerInput;
}


/** Cart mutations */
export interface CartMutationsupdateCartCurrencyArgs {
  input: UpdateCartCurrencyInput;
}


/** Cart mutations */
export interface CartMutationsupdateCartLineItemArgs {
  input: UpdateCartLineItemInput;
}

/** Cart physical item. */
export interface CartPhysicalItem {
  __typename: 'CartPhysicalItem';
  /** The product brand. */
  brand: Maybe<Scalars['String']['output']>;
  /** The total value of all coupons applied to this item. */
  couponAmount: Money;
  /** The total value of all discounts applied to this item (excluding coupon). */
  discountedAmount: Money;
  /** List of discounts applied to this item. */
  discounts: Array<CartDiscount>;
  /** The line-item ID. */
  entityId: Scalars['String']['output'];
  /** Item's list price multiplied by the quantity. */
  extendedListPrice: Money;
  /** Item's sale price multiplied by the quantity. */
  extendedSalePrice: Money;
  /** Gift wrapping for this item. */
  giftWrapping: Maybe<CartGiftWrapping>;
  /** URL of an image of this item, accessible on the internet. */
  imageUrl: Maybe<Scalars['String']['output']>;
  /** Whether this item requires shipping to a physical address. */
  isShippingRequired: Scalars['Boolean']['output'];
  /** Whether the item is taxable. */
  isTaxable: Scalars['Boolean']['output'];
  /** The net item price before discounts and coupons. It is based on the product default price or sale price (if set) configured in BigCommerce Admin. */
  listPrice: Money;
  /** The item's product name. */
  name: Scalars['String']['output'];
  /** An item’s original price is the same as the product default price in the admin panel. */
  originalPrice: Money;
  /** The product is part of a bundle such as a product pick list, then the parentId or the main product id will populate. */
  parentEntityId: Maybe<Scalars['String']['output']>;
  /** ID of the product. */
  productEntityId: Scalars['Int']['output'];
  /** Quantity of this item. */
  quantity: Scalars['Int']['output'];
  /** Item's price after all discounts are applied. (The final price before tax calculation). */
  salePrice: Money;
  /** The list of selected options for this item. */
  selectedOptions: Array<CartSelectedOption>;
  /** SKU of the variant. */
  sku: Maybe<Scalars['String']['output']>;
  /** The product URL. */
  url: Scalars['String']['output'];
  /** ID of the variant. */
  variantEntityId: Maybe<Scalars['Int']['output']>;
}

/** Selected checkbox option. */
export interface CartSelectedCheckboxOption extends CartSelectedOption {
  __typename: 'CartSelectedCheckboxOption';
  /** The product option ID. */
  entityId: Scalars['Int']['output'];
  /** The product option name. */
  name: Scalars['String']['output'];
  /** The product option value. */
  value: Scalars['String']['output'];
  /** The product option value ID. */
  valueEntityId: Scalars['Int']['output'];
}

/** Cart selected checkbox option input object */
export interface CartSelectedCheckboxOptionInput {
  /** The product option ID. */
  optionEntityId: Scalars['Int']['input'];
  /** The product option value ID. */
  optionValueEntityId: Scalars['Int']['input'];
}

/** Selected date field option. */
export interface CartSelectedDateFieldOption extends CartSelectedOption {
  __typename: 'CartSelectedDateFieldOption';
  /** Date value. */
  date: DateTimeExtended;
  /** The product option ID. */
  entityId: Scalars['Int']['output'];
  /** The product option name. */
  name: Scalars['String']['output'];
}

/** Cart selected date field option input object */
export interface CartSelectedDateFieldOptionInput {
  /** Date value. */
  date: Scalars['DateTime']['input'];
  /** The product option ID. */
  optionEntityId: Scalars['Int']['input'];
}

/** Selected file upload option. */
export interface CartSelectedFileUploadOption extends CartSelectedOption {
  __typename: 'CartSelectedFileUploadOption';
  /** The product option ID. */
  entityId: Scalars['Int']['output'];
  /** Uploaded file name. */
  fileName: Scalars['String']['output'];
  /** The product option name. */
  name: Scalars['String']['output'];
}

/** Selected multi-line text field option. */
export interface CartSelectedMultiLineTextFieldOption extends CartSelectedOption {
  __typename: 'CartSelectedMultiLineTextFieldOption';
  /** The product option ID. */
  entityId: Scalars['Int']['output'];
  /** The product option name. */
  name: Scalars['String']['output'];
  /** Text value. */
  text: Scalars['String']['output'];
}

/** Cart selected multiple line text field option input object */
export interface CartSelectedMultiLineTextFieldOptionInput {
  /** The product option ID. */
  optionEntityId: Scalars['Int']['input'];
  /** Text value. */
  text: Scalars['String']['input'];
}

/** Selected multiple choice option. */
export interface CartSelectedMultipleChoiceOption extends CartSelectedOption {
  __typename: 'CartSelectedMultipleChoiceOption';
  /** The product option ID. */
  entityId: Scalars['Int']['output'];
  /** The product option name. */
  name: Scalars['String']['output'];
  /** The product option value. */
  value: Scalars['String']['output'];
  /** The product option value ID. */
  valueEntityId: Scalars['Int']['output'];
}

/** Cart selected multiple choice option input object */
export interface CartSelectedMultipleChoiceOptionInput {
  /** The product option ID. */
  optionEntityId: Scalars['Int']['input'];
  /** The product option value ID. */
  optionValueEntityId: Scalars['Int']['input'];
}

/** Selected number field option. */
export interface CartSelectedNumberFieldOption extends CartSelectedOption {
  __typename: 'CartSelectedNumberFieldOption';
  /** The product option ID. */
  entityId: Scalars['Int']['output'];
  /** The product option name. */
  name: Scalars['String']['output'];
  /** Number value. */
  number: Scalars['Float']['output'];
}

/** Cart selected number field option input object */
export interface CartSelectedNumberFieldOptionInput {
  /** Number value. */
  number: Scalars['Float']['input'];
  /** The product option ID. */
  optionEntityId: Scalars['Int']['input'];
}

/** Selected option for the item. */
export interface CartSelectedOption {
  /** The product option ID. */
  entityId: Scalars['Int']['output'];
  /** The product option name. */
  name: Scalars['String']['output'];
}

/** Selected product options. */
export interface CartSelectedOptionsInput {
  /** List of selected checkbox options. */
  checkboxes?: InputMaybe<Array<CartSelectedCheckboxOptionInput>>;
  /** List of selected date field options. */
  dateFields?: InputMaybe<Array<CartSelectedDateFieldOptionInput>>;
  /** List of selected multi-line text field options. */
  multiLineTextFields?: InputMaybe<Array<CartSelectedMultiLineTextFieldOptionInput>>;
  /** List of selected multiple choice options. */
  multipleChoices?: InputMaybe<Array<CartSelectedMultipleChoiceOptionInput>>;
  /** List of selected number field options. */
  numberFields?: InputMaybe<Array<CartSelectedNumberFieldOptionInput>>;
  /** List of selected text field options. */
  textFields?: InputMaybe<Array<CartSelectedTextFieldOptionInput>>;
}

/** Selected text field option. */
export interface CartSelectedTextFieldOption extends CartSelectedOption {
  __typename: 'CartSelectedTextFieldOption';
  /** The product option ID. */
  entityId: Scalars['Int']['output'];
  /** The product option name. */
  name: Scalars['String']['output'];
  /** Text value. */
  text: Scalars['String']['output'];
}

/** Cart selected multiple line text field option input object */
export interface CartSelectedTextFieldOptionInput {
  /** The product option ID. */
  optionEntityId: Scalars['Int']['input'];
  /** TODO */
  text: Scalars['String']['input'];
}

/** Storefront catalog settings. */
export interface Catalog {
  __typename: 'Catalog';
  /** Product comparisons enabled. */
  productComparisonsEnabled: Maybe<Scalars['Boolean']['output']>;
}

export interface CatalogBrand {
  __typename: 'CatalogBrand';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  slug: Scalars['String']['output'];
}

export interface CatalogCategory {
  __typename: 'CatalogCategory';
  bigCommerceEntityId: Scalars['ID']['output'];
  description: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  subcategories: Maybe<CatalogCategory>;
}

/** Block of type Catalog Category (catalog_category) */
export interface CatalogCategoryRecord extends RecordInterface {
  __typename: 'CatalogCategoryRecord';
  _createdAt: Scalars['DateTime']['output'];
  /** Editing URL */
  _editingUrl: Maybe<Scalars['String']['output']>;
  _firstPublishedAt: Maybe<Scalars['DateTime']['output']>;
  _isValid: Scalars['BooleanType']['output'];
  _modelApiKey: Scalars['String']['output'];
  _publicationScheduledAt: Maybe<Scalars['DateTime']['output']>;
  _publishedAt: Maybe<Scalars['DateTime']['output']>;
  /** Generates SEO and Social card meta tags to be used in your frontend */
  _seoMetaTags: Array<Tag>;
  _status: ItemStatus;
  _unpublishingScheduledAt: Maybe<Scalars['DateTime']['output']>;
  _updatedAt: Scalars['DateTime']['output'];
  bigCommerceCategoryId: Maybe<Scalars['IntType']['output']>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ItemId']['output'];
  image: Maybe<FileField>;
  name: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
}


/** Block of type Catalog Category (catalog_category) */
export interface CatalogCategoryRecord_seoMetaTagsArgs {
  locale?: InputMaybe<SiteLocale>;
}

export interface CatalogProduct {
  __typename: 'CatalogProduct';
  brand: Maybe<CatalogBrand>;
  brandId: Maybe<Scalars['ID']['output']>;
  categoryIds: Array<Scalars['ID']['output']>;
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  images: Array<CatalogProductImage>;
  name: Scalars['String']['output'];
  priceCents: Scalars['Int']['output'];
  primaryImage: Maybe<CatalogProductImage>;
  relatedProductIds: Array<Scalars['ID']['output']>;
  slug: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  visible: Scalars['Boolean']['output'];
}

export enum CatalogProductCustomizationAddonType {
  PRINT_LOCATION = 'PRINT_LOCATION'
}

export interface CatalogProductCustomizeAddonInput {
  name: Scalars['String']['input'];
  type: CatalogProductCustomizationAddonType;
}

export interface CatalogProductCustomizeInput {
  addons: Array<CatalogProductCustomizeAddonInput>;
  catalogProductId: Scalars['ID']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  fileIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  items: Array<CatalogProductCustomizeItemsInput>;
  name?: InputMaybe<Scalars['String']['input']>;
}

export interface CatalogProductCustomizeItemsInput {
  catalogProductVariantId: Scalars['ID']['input'];
  quantity: Scalars['Int']['input'];
}

export interface CatalogProductCustomizePayload {
  __typename: 'CatalogProductCustomizePayload';
  designRequest: Maybe<DesignRequest>;
  order: Maybe<Order>;
}

export interface CatalogProductImage {
  __typename: 'CatalogProductImage';
  isDefault: Scalars['Boolean']['output'];
  order: Maybe<Scalars['Int']['output']>;
  url: Scalars['String']['output'];
  urlStandard: Scalars['String']['output'];
  urlThumbnail: Scalars['String']['output'];
  urlTiny: Scalars['String']['output'];
  urlZoom: Scalars['String']['output'];
}

/** Product Option */
export interface CatalogProductOption {
  /** Display name for the option. */
  displayName: Scalars['String']['output'];
  /** Unique ID for the option. */
  entityId: Scalars['Int']['output'];
  /** One of the option values is required to be selected for the checkout. */
  isRequired: Scalars['Boolean']['output'];
  /** Indicates whether it is a variant option or modifier. */
  isVariantOption: Scalars['Boolean']['output'];
}

/** Product Option Value */
export interface CatalogProductOptionValue {
  /** Unique ID for the option value. */
  entityId: Scalars['Int']['output'];
  /** Indicates whether this value is the chosen default selected value. */
  isDefault: Scalars['Boolean']['output'];
  /** Indicates whether this value is selected based on sku/variantEntityId/optionValueIds overlay requested on the product node level. */
  isSelected: Maybe<Scalars['Boolean']['output']>;
  /** Label for the option value. */
  label: Scalars['String']['output'];
}

export interface CatalogProductQuoteCreateAddonInput {
  printLocation?: InputMaybe<CatalogProductQuoteCreatePrintLocationInput>;
}

export interface CatalogProductQuoteCreateInput {
  addons: Array<CatalogProductQuoteCreateAddonInput>;
  catalogProductId: Scalars['ID']['input'];
  items: Array<CatalogProductQuoteCreateItemsInput>;
}

export interface CatalogProductQuoteCreateItemsInput {
  catalogProductVariantId: Scalars['ID']['input'];
  quantity: Scalars['Int']['input'];
}

export interface CatalogProductQuoteCreatePayload {
  __typename: 'CatalogProductQuoteCreatePayload';
  quote: Maybe<Quote>;
}

export interface CatalogProductQuoteCreatePrintLocationInput {
  colorCount: Scalars['Int']['input'];
}

/** Category */
export interface Category extends Node {
  __typename: 'Category';
  /** Category breadcrumbs. */
  breadcrumbs: BreadcrumbConnection;
  /** Default image for the category. */
  defaultImage: Maybe<Image>;
  /** Category default product sort. */
  defaultProductSort: Maybe<CategoryProductSort>;
  /** Category description. */
  description: Scalars['String']['output'];
  /** Unique ID for the category. */
  entityId: Scalars['Int']['output'];
  /** The ID of an object */
  id: Scalars['ID']['output'];
  /** Metafield data related to a category. */
  metafields: MetafieldConnection;
  /** Category name. */
  name: Scalars['String']['output'];
  /** Category path. */
  path: Scalars['String']['output'];
  /** List of products associated with category */
  products: ProductConnection;
  /** Category SEO details. */
  seo: SeoDetails;
  /**
   * Category shop by price money ranges.
   * @deprecated Alpha version. Do not use in production.
   */
  shopByPriceRanges: ShopByPriceConnection;
}


/** Category */
export interface CategorybreadcrumbsArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  depth: Scalars['Int']['input'];
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
}


/** Category */
export interface CategorymetafieldsArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  keys?: InputMaybe<Array<Scalars['String']['input']>>;
  last?: InputMaybe<Scalars['Int']['input']>;
  namespace: Scalars['String']['input'];
}


/** Category */
export interface CategoryproductsArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  hideOutOfStock?: InputMaybe<Scalars['Boolean']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  sortBy?: InputMaybe<CategoryProductSort>;
}


/** Category */
export interface CategoryshopByPriceRangesArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  currencyCode?: InputMaybe<currencyCode>;
  first?: InputMaybe<Scalars['Int']['input']>;
  includeTax?: InputMaybe<Scalars['Boolean']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
}

/** A connection to a list of items. */
export interface CategoryConnection {
  __typename: 'CategoryConnection';
  /** A list of edges. */
  edges: Maybe<Array<CategoryEdge>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
}

/** An edge in a connection. */
export interface CategoryEdge {
  __typename: 'CategoryEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: Category;
}

export interface CategoryModelDescriptionField {
  __typename: 'CategoryModelDescriptionField';
  blocks: Array<Scalars['String']['output']>;
  links: Array<Scalars['String']['output']>;
  value: Scalars['JsonField']['output'];
}

export interface CategoryModelFilter {
  AND?: InputMaybe<Array<InputMaybe<CategoryModelFilter>>>;
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
}

export enum CategoryModelOrderBy {
  _createdAt_ASC = '_createdAt_ASC',
  _createdAt_DESC = '_createdAt_DESC',
  _firstPublishedAt_ASC = '_firstPublishedAt_ASC',
  _firstPublishedAt_DESC = '_firstPublishedAt_DESC',
  _isValid_ASC = '_isValid_ASC',
  _isValid_DESC = '_isValid_DESC',
  _publicationScheduledAt_ASC = '_publicationScheduledAt_ASC',
  _publicationScheduledAt_DESC = '_publicationScheduledAt_DESC',
  _publishedAt_ASC = '_publishedAt_ASC',
  _publishedAt_DESC = '_publishedAt_DESC',
  _status_ASC = '_status_ASC',
  _status_DESC = '_status_DESC',
  _unpublishingScheduledAt_ASC = '_unpublishingScheduledAt_ASC',
  _unpublishingScheduledAt_DESC = '_unpublishingScheduledAt_DESC',
  _updatedAt_ASC = '_updatedAt_ASC',
  _updatedAt_DESC = '_updatedAt_DESC',
  createdAt_ASC = 'createdAt_ASC',
  createdAt_DESC = 'createdAt_DESC',
  id_ASC = 'id_ASC',
  id_DESC = 'id_DESC',
  name_ASC = 'name_ASC',
  name_DESC = 'name_DESC',
  shortName_ASC = 'shortName_ASC',
  shortName_DESC = 'shortName_DESC',
  updatedAt_ASC = 'updatedAt_ASC',
  updatedAt_DESC = 'updatedAt_DESC'
}

/** A connection to a list of items. */
export interface CategoryPageBannerConnection {
  __typename: 'CategoryPageBannerConnection';
  /** A list of edges. */
  edges: Maybe<Array<CategoryPageBannerEdge>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
}

/** An edge in a connection. */
export interface CategoryPageBannerEdge {
  __typename: 'CategoryPageBannerEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: Banner;
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
export interface CategoryRecord extends RecordInterface {
  __typename: 'CategoryRecord';
  _createdAt: Scalars['DateTime']['output'];
  /** Editing URL */
  _editingUrl: Maybe<Scalars['String']['output']>;
  _firstPublishedAt: Maybe<Scalars['DateTime']['output']>;
  _isValid: Scalars['BooleanType']['output'];
  _modelApiKey: Scalars['String']['output'];
  _publicationScheduledAt: Maybe<Scalars['DateTime']['output']>;
  _publishedAt: Maybe<Scalars['DateTime']['output']>;
  /** Generates SEO and Social card meta tags to be used in your frontend */
  _seoMetaTags: Array<Tag>;
  _status: ItemStatus;
  _unpublishingScheduledAt: Maybe<Scalars['DateTime']['output']>;
  _updatedAt: Scalars['DateTime']['output'];
  createdAt: Scalars['DateTime']['output'];
  description: Maybe<CategoryModelDescriptionField>;
  id: Scalars['ItemId']['output'];
  name: Maybe<Scalars['String']['output']>;
  seoMetadata: Maybe<SeoField>;
  shortName: Maybe<Scalars['String']['output']>;
  slug: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
}


/** Record of type Category (category) */
export interface CategoryRecord_seoMetaTagsArgs {
  locale?: InputMaybe<SiteLocale>;
}

/** Redirect to a category. */
export interface CategoryRedirect {
  __typename: 'CategoryRedirect';
  /** Entity id. */
  entityId: Scalars['Int']['output'];
  /** The ID of an object. */
  id: Scalars['ID']['output'];
  /** Relative destination url. */
  path: Scalars['String']['output'];
}

/** Category Filter */
export interface CategorySearchFilter extends SearchProductFilter {
  __typename: 'CategorySearchFilter';
  /** List of available categories. */
  categories: CategorySearchFilterItemConnection;
  /** Indicates whether to display product count next to the filter. */
  displayProductCount: Scalars['Boolean']['output'];
  /** Indicates whether filter is collapsed by default. */
  isCollapsedByDefault: Scalars['Boolean']['output'];
  /** Display name for the filter. */
  name: Scalars['String']['output'];
}


/** Category Filter */
export interface CategorySearchFiltercategoriesArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
}

/** Specific category filter item */
export interface CategorySearchFilterItem {
  __typename: 'CategorySearchFilterItem';
  /** Category ID. */
  entityId: Scalars['Int']['output'];
  /** Indicates whether category is selected. */
  isSelected: Scalars['Boolean']['output'];
  /** Category name. */
  name: Scalars['String']['output'];
  /** Indicates how many products available for this filter. */
  productCount: Scalars['Int']['output'];
  /** List of available sub-categories. */
  subCategories: SubCategorySearchFilterItemConnection;
}


/** Specific category filter item */
export interface CategorySearchFilterItemsubCategoriesArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
}

/** A connection to a list of items. */
export interface CategorySearchFilterItemConnection {
  __typename: 'CategorySearchFilterItemConnection';
  /** A list of edges. */
  edges: Maybe<Array<CategorySearchFilterItemEdge>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
}

/** An edge in a connection. */
export interface CategorySearchFilterItemEdge {
  __typename: 'CategorySearchFilterItemEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: CategorySearchFilterItem;
}

/** An item in a tree of categories. */
export interface CategoryTreeItem {
  __typename: 'CategoryTreeItem';
  /** Subcategories of this category */
  children: Array<CategoryTreeItem>;
  /** The description of this category. */
  description: Scalars['String']['output'];
  /** The id category. */
  entityId: Scalars['Int']['output'];
  /** If a category has children. */
  hasChildren: Scalars['Boolean']['output'];
  /** The category image. */
  image: Maybe<Image>;
  /** The name of category. */
  name: Scalars['String']['output'];
  /** Path assigned to this category */
  path: Scalars['String']['output'];
  /** The number of products in this category. */
  productCount: Scalars['Int']['output'];
}

/** An error that occurred while changing a password. */
export type ChangePasswordError = CustomerDoesNotExistError | CustomerNotLoggedInError | CustomerPasswordError | ValidationError;

/** The input for changing a customer password. */
export interface ChangePasswordInput {
  /** The current password. Do not pass this directly in the query, use GraphQL variables. */
  currentPassword: Scalars['String']['input'];
  /** The new password. Do not pass this directly in the query, use GraphQL variables. */
  newPassword: Scalars['String']['input'];
}

/** The result of changing a password. */
export interface ChangePasswordResult {
  __typename: 'ChangePasswordResult';
  /** Errors encountered while changing the password. */
  errors: Array<ChangePasswordError>;
}

/** The Channel */
export interface Channel {
  __typename: 'Channel';
  /** The ID of the channel. */
  entityId: Scalars['Long']['output'];
  /** Metafield data related to a channel. */
  metafields: MetafieldConnection;
}


/** The Channel */
export interface ChannelmetafieldsArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  keys?: InputMaybe<Array<Scalars['String']['input']>>;
  last?: InputMaybe<Scalars['Int']['input']>;
  namespace: Scalars['String']['input'];
}

/** A simple yes/no question represented by a checkbox. */
export interface CheckboxOption extends CatalogProductOption {
  __typename: 'CheckboxOption';
  /** Indicates the default checked status. */
  checkedByDefault: Scalars['Boolean']['output'];
  /** Option value entity ID used for specifying the checkbox is checked. */
  checkedOptionValueEntityId: Scalars['Int']['output'];
  /** Display name for the option. */
  displayName: Scalars['String']['output'];
  /** Unique ID for the option. */
  entityId: Scalars['Int']['output'];
  /** One of the option values is required to be selected for the checkout. */
  isRequired: Scalars['Boolean']['output'];
  /** Indicates whether it is a variant option or modifier. */
  isVariantOption: Scalars['Boolean']['output'];
  /** Label of the checkbox option. */
  label: Scalars['String']['output'];
  /** Option value entity ID used for specifying the checkbox is not checked. */
  uncheckedOptionValueEntityId: Scalars['Int']['output'];
}

/** Checkboxes form field. */
export interface CheckboxesFormField extends FormField {
  __typename: 'CheckboxesFormField';
  /** The entity ID of the form field. */
  entityId: Scalars['Int']['output'];
  /** Indicates whether the form field is built-in. */
  isBuiltIn: Scalars['Boolean']['output'];
  /** Indicates whether the form field is required. */
  isRequired: Scalars['Boolean']['output'];
  /** The label to display for the form field. */
  label: Scalars['String']['output'];
  /** The options for the form field. */
  options: Array<FormFieldOption>;
  /** The sort order priority of the form field. */
  sortOrder: Scalars['Int']['output'];
}

/** The user input for checkbox form fields. */
export interface CheckboxesFormFieldInput {
  /** The custom form field ID. */
  fieldEntityId: Scalars['Int']['input'];
  /** List of custom form field value IDs. */
  fieldValueEntityIds: Array<Scalars['Int']['input']>;
}

/** Checkboxes custom form field result. */
export interface CheckboxesFormFieldValue extends CustomerFormFieldValue {
  __typename: 'CheckboxesFormFieldValue';
  /** Entity ID of a custom form field value on a customer or customer address. */
  entityId: Scalars['Int']['output'];
  /** The name of the form field that the value is for. */
  name: Scalars['String']['output'];
  /** List of checkbox value ids selected by customer. */
  valueEntityIds: Array<Scalars['Int']['output']>;
  /** List of checkbox values selected by customer. */
  values: Array<Scalars['String']['output']>;
}

/** The checkout. */
export interface Checkout extends Node {
  __typename: 'Checkout';
  /** Billing address information. */
  billingAddress: Maybe<CheckoutBillingAddress>;
  /** Cart associated with the checkout. */
  cart: Maybe<Cart>;
  /** Coupons applied at checkout level. */
  coupons: Array<CheckoutCoupon>;
  /** Time when the checkout was created. */
  createdAt: DateTimeExtended;
  /** Shopper's message provided as details for the order to be created from the checkout. */
  customerMessage: Maybe<Scalars['String']['output']>;
  /** Checkout ID. */
  entityId: Scalars['String']['output'];
  /** Gift wrapping cost for all items, including or excluding tax. */
  giftWrappingCostTotal: Maybe<Money>;
  /** The total payable amount, before applying any store credit or gift certificate. */
  grandTotal: Maybe<Money>;
  /** Handling cost for all consignments including or excluding tax. */
  handlingCostTotal: Maybe<Money>;
  /** The ID of an object */
  id: Scalars['ID']['output'];
  /** Order associated with the checkout. */
  order: Maybe<Order>;
  /** GrandTotal subtract the store-credit amount. */
  outstandingBalance: Maybe<Money>;
  /** List of promotions */
  promotions: Array<CheckoutPromotion>;
  /** List of shipping consignments. */
  shippingConsignments: Maybe<Array<CheckoutShippingConsignment>>;
  /** Total shipping cost before any discounts are applied. */
  shippingCostTotal: Maybe<Money>;
  /** Subtotal of the checkout before applying item-level discounts. Tax inclusive based on the store settings. */
  subtotal: Maybe<Money>;
  /** Total amount of taxes applied. */
  taxTotal: Maybe<Money>;
  /** List of taxes applied. */
  taxes: Maybe<Array<CheckoutTax>>;
  /** Time when the checkout was last updated. */
  updatedAt: DateTimeExtended;
}

/** Checkout address. */
export interface CheckoutAddress {
  /** Address line 1. */
  address1: Maybe<Scalars['String']['output']>;
  /** Address line 2. */
  address2: Maybe<Scalars['String']['output']>;
  /** Name of the city. */
  city: Maybe<Scalars['String']['output']>;
  /** Company name. */
  company: Maybe<Scalars['String']['output']>;
  /** Country code. */
  countryCode: Scalars['String']['output'];
  /** List of custom fields. */
  customFields: Array<CheckoutAddressCustomField>;
  /** Email address. */
  email: Maybe<Scalars['String']['output']>;
  /** The first name. */
  firstName: Maybe<Scalars['String']['output']>;
  /** The last name. */
  lastName: Maybe<Scalars['String']['output']>;
  /** Phone number. */
  phone: Maybe<Scalars['String']['output']>;
  /** Postal code. */
  postalCode: Maybe<Scalars['String']['output']>;
  /** State or province. */
  stateOrProvince: Maybe<Scalars['String']['output']>;
  /** Code of the state or province. */
  stateOrProvinceCode: Maybe<Scalars['String']['output']>;
}

/** Checkboxes custom field. */
export interface CheckoutAddressCheckboxesCustomField extends CheckoutAddressCustomField {
  __typename: 'CheckoutAddressCheckboxesCustomField';
  /** Custom field ID. */
  entityId: Scalars['Int']['output'];
  /** List of custom field value IDs. */
  valueEntityIds: Array<Scalars['Int']['output']>;
}

/** Checkout address checkboxes custom field input object */
export interface CheckoutAddressCheckboxesCustomFieldInput {
  /** The custom field ID. */
  fieldEntityId: Scalars['Int']['input'];
  /** List of custom field value IDs. */
  fieldValueEntityIds: Array<Scalars['Int']['input']>;
}

/** Custom field of the checkout address. */
export interface CheckoutAddressCustomField {
  /** Custom field ID. */
  entityId: Scalars['Int']['output'];
}

/** Checkout address custom field input object */
export interface CheckoutAddressCustomFieldInput {
  /** List of checkboxes custom fields. */
  checkboxes?: InputMaybe<Array<CheckoutAddressCheckboxesCustomFieldInput>>;
  /** List of date custom fields. */
  dates?: InputMaybe<Array<CheckoutAddressDateCustomFieldInput>>;
  /** List of multiple choice custom fields. */
  multipleChoices?: InputMaybe<Array<CheckoutAddressMultipleChoiceCustomFieldInput>>;
  /** List of number custom fields. */
  numbers?: InputMaybe<Array<CheckoutAddressNumberCustomFieldInput>>;
  /** List of password custom fields. */
  passwords?: InputMaybe<Array<CheckoutAddressPasswordCustomFieldInput>>;
  /** List of text custom fields. */
  texts?: InputMaybe<Array<CheckoutAddressTextCustomFieldInput>>;
}

/** Date custom field. */
export interface CheckoutAddressDateCustomField extends CheckoutAddressCustomField {
  __typename: 'CheckoutAddressDateCustomField';
  /** Date value. */
  date: DateTimeExtended;
  /** Custom field ID. */
  entityId: Scalars['Int']['output'];
}

/** Checkout address date custom field input object */
export interface CheckoutAddressDateCustomFieldInput {
  /** Date value. */
  date: Scalars['DateTime']['input'];
  /** The custom field ID. */
  fieldEntityId: Scalars['Int']['input'];
}

/** Checkout address input object */
export interface CheckoutAddressInput {
  /** Address line 1 */
  address1?: InputMaybe<Scalars['String']['input']>;
  /** Address line 2 */
  address2?: InputMaybe<Scalars['String']['input']>;
  /** Name of the city */
  city?: InputMaybe<Scalars['String']['input']>;
  /** Company name */
  company?: InputMaybe<Scalars['String']['input']>;
  /** Country code */
  countryCode: Scalars['String']['input'];
  /** List of custom fields */
  customFields?: InputMaybe<CheckoutAddressCustomFieldInput>;
  /** Email address */
  email?: InputMaybe<Scalars['String']['input']>;
  /** The first name */
  firstName?: InputMaybe<Scalars['String']['input']>;
  /** The last name */
  lastName?: InputMaybe<Scalars['String']['input']>;
  /** Phone number */
  phone?: InputMaybe<Scalars['String']['input']>;
  /** Postal code */
  postalCode?: InputMaybe<Scalars['String']['input']>;
  /** Should we save this address? */
  shouldSaveAddress: Scalars['Boolean']['input'];
  /** State or province */
  stateOrProvince?: InputMaybe<Scalars['String']['input']>;
  /** Code of the state or province */
  stateOrProvinceCode?: InputMaybe<Scalars['String']['input']>;
}

/** Multiple choice custom field. */
export interface CheckoutAddressMultipleChoiceCustomField extends CheckoutAddressCustomField {
  __typename: 'CheckoutAddressMultipleChoiceCustomField';
  /** Custom field ID. */
  entityId: Scalars['Int']['output'];
  /** Custom field value ID. */
  valueEntityId: Scalars['Int']['output'];
}

/** Checkout address multiple choice custom field input object */
export interface CheckoutAddressMultipleChoiceCustomFieldInput {
  /** The custom field ID. */
  fieldEntityId: Scalars['Int']['input'];
  /** The custom field value ID. */
  fieldValueEntityId: Scalars['Int']['input'];
}

/** Number custom field. */
export interface CheckoutAddressNumberCustomField extends CheckoutAddressCustomField {
  __typename: 'CheckoutAddressNumberCustomField';
  /** Custom field ID. */
  entityId: Scalars['Int']['output'];
  /** Number value. */
  number: Scalars['Float']['output'];
}

/** Checkout address number custom field input object */
export interface CheckoutAddressNumberCustomFieldInput {
  /** The custom field ID. */
  fieldEntityId: Scalars['Int']['input'];
  /** Number value. */
  number: Scalars['Float']['input'];
}

/** Password custom field. */
export interface CheckoutAddressPasswordCustomField extends CheckoutAddressCustomField {
  __typename: 'CheckoutAddressPasswordCustomField';
  /** Custom field ID. */
  entityId: Scalars['Int']['output'];
  /** Password value. */
  password: Scalars['String']['output'];
}

/** Checkout address password custom field input object */
export interface CheckoutAddressPasswordCustomFieldInput {
  /** The custom field ID. */
  fieldEntityId: Scalars['Int']['input'];
  /** Password value. */
  password: Scalars['String']['input'];
}

/** Checkout address text custom field input object */
export interface CheckoutAddressTextCustomFieldInput {
  /** The custom field ID. */
  fieldEntityId: Scalars['Int']['input'];
  /** Text value. */
  text: Scalars['String']['input'];
}

/** Text custom field. */
export interface CheckoutAddressTextFieldCustomField extends CheckoutAddressCustomField {
  __typename: 'CheckoutAddressTextFieldCustomField';
  /** Custom field ID. */
  entityId: Scalars['Int']['output'];
  /** Text value. */
  text: Scalars['String']['output'];
}

/** Available shipping option. */
export interface CheckoutAvailableShippingOption {
  __typename: 'CheckoutAvailableShippingOption';
  /** Shipping option cost. */
  cost: Money;
  /** Shipping option description. */
  description: Scalars['String']['output'];
  /** Shipping option ID. */
  entityId: Scalars['String']['output'];
  /** Shipping option image URL. */
  imageUrl: Maybe<Scalars['String']['output']>;
  /** Is this shipping method the recommended shipping option or not. */
  isRecommended: Scalars['Boolean']['output'];
  /** An estimate of the arrival time. */
  transitTime: Maybe<Scalars['String']['output']>;
  /** Shipping option type. Flat rate, UPS, etc. */
  type: Scalars['String']['output'];
}

/** Checkboxes billing address. */
export interface CheckoutBillingAddress extends CheckoutAddress {
  __typename: 'CheckoutBillingAddress';
  /** Address line 1. */
  address1: Maybe<Scalars['String']['output']>;
  /** Address line 2. */
  address2: Maybe<Scalars['String']['output']>;
  /** Name of the city. */
  city: Maybe<Scalars['String']['output']>;
  /** Company name. */
  company: Maybe<Scalars['String']['output']>;
  /** Country code. */
  countryCode: Scalars['String']['output'];
  /** List of custom fields. */
  customFields: Array<CheckoutAddressCustomField>;
  /** Email address. */
  email: Maybe<Scalars['String']['output']>;
  /** Billing address ID. */
  entityId: Scalars['String']['output'];
  /** The first name. */
  firstName: Maybe<Scalars['String']['output']>;
  /** The last name. */
  lastName: Maybe<Scalars['String']['output']>;
  /** Phone number. */
  phone: Maybe<Scalars['String']['output']>;
  /** Postal code. */
  postalCode: Maybe<Scalars['String']['output']>;
  /** State or province. */
  stateOrProvince: Maybe<Scalars['String']['output']>;
  /** Code of the state or province. */
  stateOrProvinceCode: Maybe<Scalars['String']['output']>;
}

/** Checkboxes consignment address. */
export interface CheckoutConsignmentAddress extends CheckoutAddress {
  __typename: 'CheckoutConsignmentAddress';
  /** Address line 1. */
  address1: Maybe<Scalars['String']['output']>;
  /** Address line 2. */
  address2: Maybe<Scalars['String']['output']>;
  /** Name of the city. */
  city: Maybe<Scalars['String']['output']>;
  /** Company name. */
  company: Maybe<Scalars['String']['output']>;
  /** Country code. */
  countryCode: Scalars['String']['output'];
  /** List of custom fields. */
  customFields: Array<CheckoutAddressCustomField>;
  /** Email address. */
  email: Maybe<Scalars['String']['output']>;
  /** The first name. */
  firstName: Maybe<Scalars['String']['output']>;
  /** The last name. */
  lastName: Maybe<Scalars['String']['output']>;
  /** Phone number. */
  phone: Maybe<Scalars['String']['output']>;
  /** Postal code. */
  postalCode: Maybe<Scalars['String']['output']>;
  /** State or province. */
  stateOrProvince: Maybe<Scalars['String']['output']>;
  /** Code of the state or province. */
  stateOrProvinceCode: Maybe<Scalars['String']['output']>;
}

/** Checkout consignment line item input object */
export interface CheckoutConsignmentLineItemInput {
  /** The line item id */
  lineItemEntityId: Scalars['String']['input'];
  /** The total number of consignment line items */
  quantity: Scalars['Int']['input'];
}

/** The checkout coupon. */
export interface CheckoutCoupon {
  __typename: 'CheckoutCoupon';
  /** The coupon code. */
  code: Scalars['String']['output'];
  /** The coupon type. */
  couponType: Maybe<CouponType>;
  /** The discounted amount applied within a given context. */
  discountedAmount: Money;
  /** The coupon ID. */
  entityId: Scalars['Int']['output'];
}

/** Checkout mutations */
export interface CheckoutMutations {
  __typename: 'CheckoutMutations';
  /** Creates a checkout billing address. */
  addCheckoutBillingAddress: Maybe<AddCheckoutBillingAddressResult>;
  /** Creates a checkout shipping consignments. */
  addCheckoutShippingConsignments: Maybe<AddCheckoutShippingConsignmentsResult>;
  /** Applies a checkout coupon. */
  applyCheckoutCoupon: Maybe<ApplyCheckoutCouponResult>;
  /** Applies a checkout spam protection. */
  applyCheckoutSpamProtection: Maybe<ApplyCheckoutSpamProtectionResult>;
  /** Completes the checkout. */
  completeCheckout: Maybe<CompleteCheckoutResult>;
  /** Deletes a checkout consignment. */
  deleteCheckoutConsignment: Maybe<DeleteCheckoutConsignmentResult>;
  /** Selects a checkout shipping option. */
  selectCheckoutShippingOption: Maybe<SelectCheckoutShippingOptionResult>;
  /** Unapply a checkout coupon. */
  unapplyCheckoutCoupon: Maybe<UnapplyCheckoutCouponResult>;
  /** Update a checkout billing address. */
  updateCheckoutBillingAddress: Maybe<UpdateCheckoutBillingAddressResult>;
  /** Updates a checkout customer message. */
  updateCheckoutCustomerMessage: Maybe<UpdateCheckoutCustomerMessageResult>;
  /** Updates a checkout shipping consignments. */
  updateCheckoutShippingConsignment: Maybe<UpdateCheckoutShippingConsignmentResult>;
}


/** Checkout mutations */
export interface CheckoutMutationsaddCheckoutBillingAddressArgs {
  input: AddCheckoutBillingAddressInput;
}


/** Checkout mutations */
export interface CheckoutMutationsaddCheckoutShippingConsignmentsArgs {
  input: AddCheckoutShippingConsignmentsInput;
}


/** Checkout mutations */
export interface CheckoutMutationsapplyCheckoutCouponArgs {
  input: ApplyCheckoutCouponInput;
}


/** Checkout mutations */
export interface CheckoutMutationsapplyCheckoutSpamProtectionArgs {
  input: ApplyCheckoutSpamProtectionInput;
}


/** Checkout mutations */
export interface CheckoutMutationscompleteCheckoutArgs {
  input: CompleteCheckoutInput;
}


/** Checkout mutations */
export interface CheckoutMutationsdeleteCheckoutConsignmentArgs {
  input: DeleteCheckoutConsignmentInput;
}


/** Checkout mutations */
export interface CheckoutMutationsselectCheckoutShippingOptionArgs {
  input: SelectCheckoutShippingOptionInput;
}


/** Checkout mutations */
export interface CheckoutMutationsunapplyCheckoutCouponArgs {
  input: UnapplyCheckoutCouponInput;
}


/** Checkout mutations */
export interface CheckoutMutationsupdateCheckoutBillingAddressArgs {
  input: UpdateCheckoutBillingAddressInput;
}


/** Checkout mutations */
export interface CheckoutMutationsupdateCheckoutCustomerMessageArgs {
  input: UpdateCheckoutCustomerMessageInput;
}


/** Checkout mutations */
export interface CheckoutMutationsupdateCheckoutShippingConsignmentArgs {
  input: UpdateCheckoutShippingConsignmentInput;
}

/** The checkout promotion */
export interface CheckoutPromotion {
  __typename: 'CheckoutPromotion';
  /** The checkout promotion banners. */
  banners: Array<CheckoutPromotionBanner>;
}

/** The checkout promotion banner */
export interface CheckoutPromotionBanner {
  __typename: 'CheckoutPromotionBanner';
  /** The checkout promotion banner ID. */
  entityId: Scalars['Int']['output'];
  /** The list of the locations where the banner will display. */
  locations: Array<CheckoutPromotionBannerLocation>;
  /** Text of the banner. */
  text: Scalars['String']['output'];
  /** Type of the banner. */
  type: CheckoutPromotionBannerType;
}

/** Checkout promotion banner location. */
export enum CheckoutPromotionBannerLocation {
  CART_PAGE = 'CART_PAGE',
  CHECKOUT_PAGE = 'CHECKOUT_PAGE',
  HOME_PAGE = 'HOME_PAGE',
  PRODUCT_PAGE = 'PRODUCT_PAGE'
}

/** Checkout promotion banner type. */
export enum CheckoutPromotionBannerType {
  APPLIED = 'APPLIED',
  ELIGIBLE = 'ELIGIBLE',
  PROMOTION = 'PROMOTION',
  UPSELL = 'UPSELL'
}

/** Selected shipping option. */
export interface CheckoutSelectedShippingOption {
  __typename: 'CheckoutSelectedShippingOption';
  /** Shipping option cost. */
  cost: Money;
  /** Shipping option description. */
  description: Scalars['String']['output'];
  /** Shipping option ID. */
  entityId: Scalars['String']['output'];
  /** Shipping option image URL. */
  imageUrl: Maybe<Scalars['String']['output']>;
  /** An estimate of the arrival time. */
  transitTime: Maybe<Scalars['String']['output']>;
  /** Shipping option type. Flat rate, UPS, etc. */
  type: Scalars['String']['output'];
}

/** Checkout settings. */
export interface CheckoutSettings {
  __typename: 'CheckoutSettings';
  /** Indicates whether ReCaptcha is enabled on checkout. */
  reCaptchaEnabled: Scalars['Boolean']['output'];
}

/** Checkout shipping consignment. */
export interface CheckoutShippingConsignment {
  __typename: 'CheckoutShippingConsignment';
  /** Shipping consignment address. */
  address: CheckoutConsignmentAddress;
  /** List of available shipping options. */
  availableShippingOptions: Maybe<Array<CheckoutAvailableShippingOption>>;
  /** List of coupons applied to this shipping consignment. */
  coupons: Maybe<Array<CheckoutCoupon>>;
  /** Shipping consignment ID. */
  entityId: Scalars['String']['output'];
  /** The handling cost of shipping for the consignment. */
  handlingCost: Maybe<Money>;
  /** List of line item IDs for the consignment. */
  lineItemIds: Array<Scalars['String']['output']>;
  /** Selected shipping option. */
  selectedShippingOption: Maybe<CheckoutSelectedShippingOption>;
  /** The shipping cost for the consignment. */
  shippingCost: Maybe<Money>;
}

/** Checkout shipping consignments input object */
export interface CheckoutShippingConsignmentInput {
  /** Shipping consignment address. */
  address: CheckoutAddressInput;
  /** List of line items for the consignment. */
  lineItems: Array<CheckoutConsignmentLineItemInput>;
}

/** The checkout. */
export interface CheckoutTax {
  __typename: 'CheckoutTax';
  /** Tax amount. */
  amount: Money;
  /** Name of the tax. */
  name: Scalars['String']['output'];
}

/** Additional information about the collection. */
export interface CollectionInfo {
  __typename: 'CollectionInfo';
  /** Total items in the collection despite pagination. */
  totalItems: Maybe<Scalars['Long']['output']>;
}

export interface CollectionMetadata {
  __typename: 'CollectionMetadata';
  count: Scalars['IntType']['output'];
}

export interface Color {
  __typename: 'Color';
  cmykC: Maybe<Scalars['Int']['output']>;
  cmykK: Maybe<Scalars['Int']['output']>;
  cmykM: Maybe<Scalars['Int']['output']>;
  cmykY: Maybe<Scalars['Int']['output']>;
  hex: Scalars['String']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  pantone: Maybe<Scalars['String']['output']>;
}

export enum ColorBucketType {
  black = 'black',
  blue = 'blue',
  brown = 'brown',
  cyan = 'cyan',
  green = 'green',
  grey = 'grey',
  orange = 'orange',
  pink = 'pink',
  purple = 'purple',
  red = 'red',
  white = 'white',
  yellow = 'yellow'
}

export interface ColorField {
  __typename: 'ColorField';
  alpha: Scalars['IntType']['output'];
  blue: Scalars['IntType']['output'];
  cssRgb: Scalars['String']['output'];
  green: Scalars['IntType']['output'];
  hex: Scalars['String']['output'];
  red: Scalars['IntType']['output'];
}

/** Complete checkout input object */
export interface CompleteCheckoutInput {
  /** The checkout id */
  checkoutEntityId: Scalars['String']['input'];
}

/** Complete checkout result */
export interface CompleteCheckoutResult {
  __typename: 'CompleteCheckoutResult';
  /** The Order ID created as a result of the checkout. */
  orderEntityId: Maybe<Scalars['Int']['output']>;
  /** The access token to be used to complete a payment. */
  paymentAccessToken: Maybe<Scalars['String']['output']>;
}

/** Contact field */
export interface ContactField {
  __typename: 'ContactField';
  /** Store address line. */
  address: Scalars['String']['output'];
  /** Store address type. */
  addressType: Scalars['String']['output'];
  /** Store country. */
  country: Scalars['String']['output'];
  /** Store email. */
  email: Scalars['String']['output'];
  /** Store phone number. */
  phone: Scalars['String']['output'];
}

/** A contact page. */
export interface ContactPage extends Node, WebPage {
  __typename: 'ContactPage';
  /** The contact fields that should be used on the page. */
  contactFields: Array<Scalars['String']['output']>;
  /** Unique ID for the web page. */
  entityId: Scalars['Int']['output'];
  /** The body of the page. */
  htmlBody: Scalars['String']['output'];
  /** The ID of an object */
  id: Scalars['ID']['output'];
  /** Whether or not the page should be visible in the navigation menu. */
  isVisibleInNavigation: Scalars['Boolean']['output'];
  /** Page name. */
  name: Scalars['String']['output'];
  /** Unique ID for the parent page. */
  parentEntityId: Maybe<Scalars['Int']['output']>;
  /** The URL path of the page. */
  path: Scalars['String']['output'];
  /** The plain text summary of the page body. */
  plainTextSummary: Scalars['String']['output'];
  /** The rendered regions for the web page. */
  renderedRegions: RenderedRegionsByPageType;
  /** Page SEO details. */
  seo: SeoDetails;
}


/** A contact page. */
export interface ContactPageplainTextSummaryArgs {
  characterLimit?: InputMaybe<Scalars['Int']['input']>;
}

/** The page content. */
export interface Content {
  __typename: 'Content';
  /** Banners details. */
  banners: Maybe<Banners>;
  /** Blog details. */
  blog: Maybe<Blog>;
  /** Page details. */
  page: Maybe<WebPage>;
  /** Details of the pages. */
  pages: PageConnection;
  /** The rendered regions by specific page. */
  renderedRegionsByPageType: RenderedRegionsByPageType;
  /** The rendered regions by specific page and id. */
  renderedRegionsByPageTypeAndEntityId: RenderedRegionsByPageType;
}


/** The page content. */
export interface ContentpageArgs {
  entityId: Scalars['Int']['input'];
}


/** The page content. */
export interface ContentpagesArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filters?: InputMaybe<WebPagesFiltersInput>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
}


/** The page content. */
export interface ContentrenderedRegionsByPageTypeArgs {
  pageType: PageType;
}


/** The page content. */
export interface ContentrenderedRegionsByPageTypeAndEntityIdArgs {
  entityId: Scalars['Long']['input'];
  entityPageType: EntityPageType;
}

export interface Conversation {
  __typename: 'Conversation';
  id: Scalars['ID']['output'];
  messages: Array<ConversationMessage>;
}

export interface ConversationMessage {
  __typename: 'ConversationMessage';
  conversationId: Scalars['ID']['output'];
  createdAt: Scalars['DateTime']['output'];
  fileIds: Array<Scalars['ID']['output']>;
  files: Array<File>;
  id: Scalars['ID']['output'];
  message: Scalars['String']['output'];
  sender: Maybe<Membership>;
  senderMembershipId: Maybe<Scalars['ID']['output']>;
  viewerIsSender: Scalars['Boolean']['output'];
}

/** The coupon type. */
export enum CouponType {
  FREE_SHIPPING = 'FREE_SHIPPING',
  PERCENTAGE_DISCOUNT = 'PERCENTAGE_DISCOUNT',
  PER_ITEM_DISCOUNT = 'PER_ITEM_DISCOUNT',
  PER_TOTAL_DISCOUNT = 'PER_TOTAL_DISCOUNT',
  PROMOTION = 'PROMOTION',
  SHIPPING_DISCOUNT = 'SHIPPING_DISCOUNT'
}

/** Create cart input object */
export interface CreateCartInput {
  /** ISO-4217 currency code */
  currencyCode?: InputMaybe<Scalars['String']['input']>;
  /** List of gift certificates */
  giftCertificates?: InputMaybe<Array<CartGiftCertificateInput>>;
  /** List of cart line items */
  lineItems?: InputMaybe<Array<CartLineItemInput>>;
  /** Locale of the cart */
  locale?: InputMaybe<Scalars['String']['input']>;
}

/** Create cart result */
export interface CreateCartResult {
  __typename: 'CreateCartResult';
  /** The Cart that is created as a result of mutation. */
  cart: Maybe<Cart>;
}

/** Create wishlist input object */
export interface CreateWishlistInput {
  /** A wishlist visibility mode */
  isPublic: Scalars['Boolean']['input'];
  /** A wishlist items */
  items?: InputMaybe<Array<WishlistItemInput>>;
  /** A wishlist name */
  name: Scalars['String']['input'];
}

/** Create wishlist */
export interface CreateWishlistResult {
  __typename: 'CreateWishlistResult';
  /** The newly created wishlist */
  result: Wishlist;
}

/** Specifies how to filter by creation datetime */
export interface CreatedAtFilter {
  /** Filter records with a value that's within the specified minute range. Seconds and milliseconds are truncated from the argument. */
  eq?: InputMaybe<Scalars['DateTime']['input']>;
  /** Filter records with the specified field defined (i.e. with any value) or not */
  exists?: InputMaybe<Scalars['BooleanType']['input']>;
  /** Filter records with a value that's strictly greater than the one specified. Seconds and milliseconds are truncated from the argument. */
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** Filter records with a value that's greater than or equal to than the one specified. Seconds and milliseconds are truncated from the argument. */
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Filter records with a value that's less than the one specified. Seconds and milliseconds are truncated from the argument. */
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** Filter records with a value that's less or equal than the one specified. Seconds and milliseconds are truncated from the argument. */
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Filter records with a value that's outside the specified minute range. Seconds and milliseconds are truncated from the argument. */
  neq?: InputMaybe<Scalars['DateTime']['input']>;
}

/** Currency details. */
export interface Currency {
  __typename: 'Currency';
  /** Currency code. */
  code: currencyCode;
  /** Currency display settings. */
  display: CurrencyDisplay;
  /** Currency ID. */
  entityId: Scalars['Int']['output'];
  /** Exchange rate relative to default currency. */
  exchangeRate: Scalars['Float']['output'];
  /** Flag image URL. */
  flagImage: Maybe<Scalars['String']['output']>;
  /** Indicates whether this currency is active. */
  isActive: Scalars['Boolean']['output'];
  /** Indicates whether this currency is transactional. */
  isTransactional: Scalars['Boolean']['output'];
  /** Currency name. */
  name: Scalars['String']['output'];
}

/** A connection to a list of items. */
export interface CurrencyConnection {
  __typename: 'CurrencyConnection';
  /** A list of edges. */
  edges: Maybe<Array<CurrencyEdge>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
}

/** Currency display settings. */
export interface CurrencyDisplay {
  __typename: 'CurrencyDisplay';
  /** Currency decimal places. */
  decimalPlaces: Scalars['Int']['output'];
  /** Currency decimal token. */
  decimalToken: Scalars['String']['output'];
  /** Currency symbol. */
  symbol: Scalars['String']['output'];
  /** Currency symbol. */
  symbolPlacement: CurrencySymbolPosition;
  /** Currency thousands token. */
  thousandsToken: Scalars['String']['output'];
}

/** An edge in a connection. */
export interface CurrencyEdge {
  __typename: 'CurrencyEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: Currency;
}

/** Currency symbol position */
export enum CurrencySymbolPosition {
  LEFT = 'LEFT',
  RIGHT = 'RIGHT'
}

export interface CustomComponentModelFilter {
  AND?: InputMaybe<Array<InputMaybe<CustomComponentModelFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<CustomComponentModelFilter>>>;
  _createdAt?: InputMaybe<CreatedAtFilter>;
  _firstPublishedAt?: InputMaybe<PublishedAtFilter>;
  _isValid?: InputMaybe<BooleanFilter>;
  _publicationScheduledAt?: InputMaybe<PublishedAtFilter>;
  _publishedAt?: InputMaybe<PublishedAtFilter>;
  _status?: InputMaybe<StatusFilter>;
  _unpublishingScheduledAt?: InputMaybe<PublishedAtFilter>;
  _updatedAt?: InputMaybe<UpdatedAtFilter>;
  componentData?: InputMaybe<JsonFilter>;
  componentId?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<CreatedAtFilter>;
  id?: InputMaybe<ItemIdFilter>;
  internalName?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<UpdatedAtFilter>;
}

export enum CustomComponentModelOrderBy {
  _createdAt_ASC = '_createdAt_ASC',
  _createdAt_DESC = '_createdAt_DESC',
  _firstPublishedAt_ASC = '_firstPublishedAt_ASC',
  _firstPublishedAt_DESC = '_firstPublishedAt_DESC',
  _isValid_ASC = '_isValid_ASC',
  _isValid_DESC = '_isValid_DESC',
  _publicationScheduledAt_ASC = '_publicationScheduledAt_ASC',
  _publicationScheduledAt_DESC = '_publicationScheduledAt_DESC',
  _publishedAt_ASC = '_publishedAt_ASC',
  _publishedAt_DESC = '_publishedAt_DESC',
  _status_ASC = '_status_ASC',
  _status_DESC = '_status_DESC',
  _unpublishingScheduledAt_ASC = '_unpublishingScheduledAt_ASC',
  _unpublishingScheduledAt_DESC = '_unpublishingScheduledAt_DESC',
  _updatedAt_ASC = '_updatedAt_ASC',
  _updatedAt_DESC = '_updatedAt_DESC',
  componentId_ASC = 'componentId_ASC',
  componentId_DESC = 'componentId_DESC',
  createdAt_ASC = 'createdAt_ASC',
  createdAt_DESC = 'createdAt_DESC',
  id_ASC = 'id_ASC',
  id_DESC = 'id_DESC',
  internalName_ASC = 'internalName_ASC',
  internalName_DESC = 'internalName_DESC',
  updatedAt_ASC = 'updatedAt_ASC',
  updatedAt_DESC = 'updatedAt_DESC'
}

/** Record of type Custom Component (custom_component) */
export interface CustomComponentRecord extends RecordInterface {
  __typename: 'CustomComponentRecord';
  _createdAt: Scalars['DateTime']['output'];
  /** Editing URL */
  _editingUrl: Maybe<Scalars['String']['output']>;
  _firstPublishedAt: Maybe<Scalars['DateTime']['output']>;
  _isValid: Scalars['BooleanType']['output'];
  _modelApiKey: Scalars['String']['output'];
  _publicationScheduledAt: Maybe<Scalars['DateTime']['output']>;
  _publishedAt: Maybe<Scalars['DateTime']['output']>;
  /** Generates SEO and Social card meta tags to be used in your frontend */
  _seoMetaTags: Array<Tag>;
  _status: ItemStatus;
  _unpublishingScheduledAt: Maybe<Scalars['DateTime']['output']>;
  _updatedAt: Scalars['DateTime']['output'];
  componentData: Maybe<Scalars['JsonField']['output']>;
  componentId: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ItemId']['output'];
  internalName: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
}


/** Record of type Custom Component (custom_component) */
export interface CustomComponentRecord_seoMetaTagsArgs {
  locale?: InputMaybe<SiteLocale>;
}

/** Custom field */
export interface CustomField {
  __typename: 'CustomField';
  /** Custom field id. */
  entityId: Scalars['Int']['output'];
  /** Name of the custom field. */
  name: Scalars['String']['output'];
  /** Value of the custom field. */
  value: Scalars['String']['output'];
}

/** A connection to a list of items. */
export interface CustomFieldConnection {
  __typename: 'CustomFieldConnection';
  /** A list of edges. */
  edges: Maybe<Array<CustomFieldEdge>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
}

/** An edge in a connection. */
export interface CustomFieldEdge {
  __typename: 'CustomFieldEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: CustomField;
}

/** A customer that shops on a store */
export interface Customer {
  __typename: 'Customer';
  /** Customer addresses count. */
  addressCount: Scalars['Int']['output'];
  /** Customer attributes count. */
  attributeCount: Scalars['Int']['output'];
  /** Customer attributes. */
  attributes: CustomerAttributes;
  /** The company name of the customer. */
  company: Scalars['String']['output'];
  /** The customer group id of the customer. */
  customerGroupId: Scalars['Int']['output'];
  /** The email address of the customer. */
  email: Scalars['String']['output'];
  /** The ID of the customer. */
  entityId: Scalars['Int']['output'];
  /** The first name of the customer. */
  firstName: Scalars['String']['output'];
  /** The last name of the customer. */
  lastName: Scalars['String']['output'];
  /** Metafield data related to a customer. */
  metafields: MetafieldConnection;
  /**
   * The notes of the customer.
   * @deprecated Notes aren't supported in Storefront GQL API.
   */
  notes: Scalars['String']['output'];
  /** The phone number of the customer. */
  phone: Scalars['String']['output'];
  /** Customer store credit. */
  storeCredit: Array<Money>;
  /** The tax exempt category of the customer. */
  taxExemptCategory: Scalars['String']['output'];
  /** Customer wishlists. */
  wishlists: WishlistConnection;
}


/** A customer that shops on a store */
export interface CustomermetafieldsArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  keys?: InputMaybe<Array<Scalars['String']['input']>>;
  last?: InputMaybe<Scalars['Int']['input']>;
  namespace: Scalars['String']['input'];
}


/** A customer that shops on a store */
export interface CustomerwishlistsArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filters?: InputMaybe<WishlistFiltersInput>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
}

/** Address that is associated with a customer account. */
export interface CustomerAddress {
  __typename: 'CustomerAddress';
  /** First line for the street address. */
  address1: Scalars['String']['output'];
  /** Second line for the street address. */
  address2: Maybe<Scalars['String']['output']>;
  /** City. */
  city: Scalars['String']['output'];
  /** Company name associated with the address. */
  company: Maybe<Scalars['String']['output']>;
  /** 2-letter country code. */
  countryCode: Scalars['String']['output'];
  /** Customer address ID. */
  entityId: Scalars['Int']['output'];
  /** First name of the address owner. */
  firstName: Scalars['String']['output'];
  /** The form field values of the customer address. */
  formFields: Array<CustomerFormFieldValue>;
  /** Last name of the address owner. */
  lastName: Scalars['String']['output'];
  /** Phone number. */
  phone: Maybe<Scalars['String']['output']>;
  /** Postal code. */
  postalCode: Maybe<Scalars['String']['output']>;
  /** Name of State or Province. */
  stateOrProvince: Maybe<Scalars['String']['output']>;
}

/** Unexpected error while creating a customer address. */
export interface CustomerAddressCreationError extends Error {
  __typename: 'CustomerAddressCreationError';
  /** Error message. */
  message: Scalars['String']['output'];
}

/** Unexpected error while deleting a customer address. */
export interface CustomerAddressDeletionError extends Error {
  __typename: 'CustomerAddressDeletionError';
  /** Error message. */
  message: Scalars['String']['output'];
}

/** An unexpected error while updating an address for a customer. */
export interface CustomerAddressUpdateError extends Error {
  __typename: 'CustomerAddressUpdateError';
  /** Error message. */
  message: Scalars['String']['output'];
}

/** A custom, store-specific attribute for a customer */
export interface CustomerAttribute {
  __typename: 'CustomerAttribute';
  /** The ID of the custom customer attribute */
  entityId: Scalars['Int']['output'];
  /** The name of the custom customer attribute */
  name: Scalars['String']['output'];
  /** The value of the custom customer attribute */
  value: Maybe<Scalars['String']['output']>;
}

/** Custom, store-specific customer attributes */
export interface CustomerAttributes {
  __typename: 'CustomerAttributes';
  /** A custom, store-specific attribute for a customer */
  attribute: CustomerAttribute;
}


/** Custom, store-specific customer attributes */
export interface CustomerAttributesattributeArgs {
  entityId: Scalars['Int']['input'];
}

/** An error due to customer not existing when attempting to update customer information. */
export interface CustomerDoesNotExistError extends Error {
  __typename: 'CustomerDoesNotExistError';
  /** Error message. */
  message: Scalars['String']['output'];
}

/** Custom form field value as submitted by customer. */
export interface CustomerFormFieldValue {
  /** Entity ID of a custom form field value on a customer or customer address. */
  entityId: Scalars['Int']['output'];
  /** The name of the form field that the value is for. */
  name: Scalars['String']['output'];
}

/** The input for the filled out customer form fields. */
export interface CustomerFormFieldsInput {
  /** List of checkboxes custom form fields input. */
  checkboxes?: InputMaybe<Array<CheckboxesFormFieldInput>>;
  /** List of date custom form fields input. */
  dates?: InputMaybe<Array<DateFormFieldInput>>;
  /** List of multiple choice custom form fields input. This includes pick lists. */
  multipleChoices?: InputMaybe<Array<MultipleChoiceFormFieldInput>>;
  /** List of number custom form fields input. */
  numbers?: InputMaybe<Array<NumberFormFieldInput>>;
  /** List of password custom form fields input. */
  passwords?: InputMaybe<Array<PasswordFormFieldInput>>;
  /** List of text custom form fields input. */
  texts?: InputMaybe<Array<TextFormFieldInput>>;
}

/** Mutations for customers domain. */
export interface CustomerMutations {
  __typename: 'CustomerMutations';
  /** Submit a customer address. */
  addCustomerAddress: AddCustomerAddressResult;
  /** Change the password for a customer. */
  changePassword: ChangePasswordResult;
  /** Delete a customer address. */
  deleteCustomerAddress: DeleteCustomerAddressResult;
  /** Register a new customer. */
  registerCustomer: RegisterCustomerResult;
  /** Request reset password email. */
  requestResetPassword: RequestResetPasswordResult;
  /** Reset customer password */
  resetPassword: ResetPasswordResult;
  /** Update a customer. */
  updateCustomer: UpdateCustomerResult;
  /** Update a customer address. */
  updateCustomerAddress: UpdateCustomerAddressResult;
}


/** Mutations for customers domain. */
export interface CustomerMutationsaddCustomerAddressArgs {
  input: AddCustomerAddressInput;
  reCaptchaV2?: InputMaybe<ReCaptchaV2Input>;
}


/** Mutations for customers domain. */
export interface CustomerMutationschangePasswordArgs {
  input: ChangePasswordInput;
}


/** Mutations for customers domain. */
export interface CustomerMutationsdeleteCustomerAddressArgs {
  input: DeleteCustomerAddressInput;
  reCaptchaV2?: InputMaybe<ReCaptchaV2Input>;
}


/** Mutations for customers domain. */
export interface CustomerMutationsregisterCustomerArgs {
  input: RegisterCustomerInput;
  reCaptchaV2?: InputMaybe<ReCaptchaV2Input>;
}


/** Mutations for customers domain. */
export interface CustomerMutationsrequestResetPasswordArgs {
  input: RequestResetPasswordInput;
  reCaptchaV2?: InputMaybe<ReCaptchaV2Input>;
}


/** Mutations for customers domain. */
export interface CustomerMutationsresetPasswordArgs {
  input: ResetPasswordInput;
}


/** Mutations for customers domain. */
export interface CustomerMutationsupdateCustomerArgs {
  input: UpdateCustomerInput;
  reCaptchaV2?: InputMaybe<ReCaptchaV2Input>;
}


/** Mutations for customers domain. */
export interface CustomerMutationsupdateCustomerAddressArgs {
  input: UpdateCustomerAddressInput;
  reCaptchaV2?: InputMaybe<ReCaptchaV2Input>;
}

/** An error due to not supplying a customer ID either via customer-id header (when using a customer impersonation token) or by logging into the storefront as a customer. */
export interface CustomerNotLoggedInError extends Error {
  __typename: 'CustomerNotLoggedInError';
  /** Error message. */
  message: Scalars['String']['output'];
}

/** An error that occurred when a customer password is being changed or reset. */
export interface CustomerPasswordError extends Error {
  __typename: 'CustomerPasswordError';
  /** Details of the error. */
  message: Scalars['String']['output'];
}

/** An unexpected error while registering a customer. */
export interface CustomerRegistrationError extends Error {
  __typename: 'CustomerRegistrationError';
  /** A description of the error. */
  message: Scalars['String']['output'];
}

/** A calendar for allowing selection of a date. */
export interface DateFieldOption extends CatalogProductOption {
  __typename: 'DateFieldOption';
  /** The default timestamp of date option. */
  defaultValue: Maybe<Scalars['DateTime']['output']>;
  /** Display name for the option. */
  displayName: Scalars['String']['output'];
  /** The earliest timestamp of date option. */
  earliest: Maybe<Scalars['DateTime']['output']>;
  /** Unique ID for the option. */
  entityId: Scalars['Int']['output'];
  /** One of the option values is required to be selected for the checkout. */
  isRequired: Scalars['Boolean']['output'];
  /** Indicates whether it is a variant option or modifier. */
  isVariantOption: Scalars['Boolean']['output'];
  /** The latest timestamp of date option. */
  latest: Maybe<Scalars['DateTime']['output']>;
  /** Limit date by */
  limitDateBy: LimitDateOption;
}

export interface DateFilterInput {
  gte?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
}

/** Date form field. */
export interface DateFormField extends FormField {
  __typename: 'DateFormField';
  /** The default date value for the form field. */
  defaultDate: Maybe<Scalars['DateTime']['output']>;
  /** The entity ID of the form field. */
  entityId: Scalars['Int']['output'];
  /** Indicates whether the form field is built-in. */
  isBuiltIn: Scalars['Boolean']['output'];
  /** Indicates whether the form field is required. */
  isRequired: Scalars['Boolean']['output'];
  /** The label to display for the form field. */
  label: Scalars['String']['output'];
  /** The latest date that can be selected for the form field. */
  maxDate: Maybe<Scalars['DateTime']['output']>;
  /** The earliest date that can be selected for the form field. */
  minDate: Maybe<Scalars['DateTime']['output']>;
  /** The sort order priority of the form field. */
  sortOrder: Scalars['Int']['output'];
}

/** The user input for date form fields. */
export interface DateFormFieldInput {
  /** The user date input for the form field in ISO-8601 format. */
  date: Scalars['DateTime']['input'];
  /** The custom form field ID. */
  fieldEntityId: Scalars['Int']['input'];
}

/** Date custom form field value. */
export interface DateFormFieldValue extends CustomerFormFieldValue {
  __typename: 'DateFormFieldValue';
  /** The date submitted by a customer. */
  date: DateTimeExtended;
  /** Entity ID of a custom form field value on a customer or customer address. */
  entityId: Scalars['Int']['output'];
  /** The name of the form field that the value is for. */
  name: Scalars['String']['output'];
}

/** Date Time Extended */
export interface DateTimeExtended {
  __typename: 'DateTimeExtended';
  /** ISO-8601 formatted date in UTC. (e.g. 2024-01-01T00:00:00Z) */
  utc: Scalars['DateTime']['output'];
}

/** Delete cart input object */
export interface DeleteCartInput {
  /** The cart id */
  cartEntityId: Scalars['String']['input'];
}

/** Delete cart line item input object */
export interface DeleteCartLineItemInput {
  /** The cart id */
  cartEntityId: Scalars['String']['input'];
  /** The line item id */
  lineItemEntityId: Scalars['String']['input'];
}

/** Delete cart lien item result */
export interface DeleteCartLineItemResult {
  __typename: 'DeleteCartLineItemResult';
  /** The Cart that is updated as a result of mutation. */
  cart: Maybe<Cart>;
  /** The ID of the Cart if it is deleted as a result of mutation. */
  deletedCartEntityId: Maybe<Scalars['String']['output']>;
  /** The ID of the line item that is deleted as a result of mutation. */
  deletedLineItemEntityId: Maybe<Scalars['String']['output']>;
}

/** Delete cart result */
export interface DeleteCartResult {
  __typename: 'DeleteCartResult';
  /** The ID of the Cart that is deleted as a result of mutation. */
  deletedCartEntityId: Maybe<Scalars['String']['output']>;
}

/** Delete checkout consignment input object */
export interface DeleteCheckoutConsignmentInput {
  /** The checkout id */
  checkoutEntityId: Scalars['String']['input'];
  /** The consignment id */
  consignmentEntityId: Scalars['String']['input'];
}

/** Delete checkout consignment result */
export interface DeleteCheckoutConsignmentResult {
  __typename: 'DeleteCheckoutConsignmentResult';
  /** The Checkout that is updated as a result of mutation. */
  checkout: Maybe<Checkout>;
}

/** Possible response errors when attempting to delete a customer address. */
export type DeleteCustomerAddressError = CustomerAddressDeletionError | CustomerNotLoggedInError;

/** Input for deleting a customer address. */
export interface DeleteCustomerAddressInput {
  /** Address entity ID for the customer address to delete. */
  addressEntityId: Scalars['Int']['input'];
}

/** Result of DeleteCustomerAddress mutation. */
export interface DeleteCustomerAddressResult {
  __typename: 'DeleteCustomerAddressResult';
  /** Response errors that occurred while attempting to delete a customer address. */
  errors: Array<DeleteCustomerAddressError>;
}

/** Delete wishlist items input object */
export interface DeleteWishlistItemsInput {
  /** The wishlist id */
  entityId: Scalars['Int']['input'];
  /** The wishlist item ids */
  itemEntityIds: Array<Scalars['Int']['input']>;
}

/** Delete wishlist items */
export interface DeleteWishlistItemsResult {
  __typename: 'DeleteWishlistItemsResult';
  /** The wishlist */
  result: Wishlist;
}

/** Delete wishlist */
export interface DeleteWishlistResult {
  __typename: 'DeleteWishlistResult';
  /** The result of the operation */
  result: Scalars['String']['output'];
}

/** Delete wishlists input object */
export interface DeleteWishlistsInput {
  /** The wishlist ids */
  entityIds: Array<Scalars['Int']['input']>;
}

export interface DesignCategoryModelFilter {
  AND?: InputMaybe<Array<InputMaybe<DesignCategoryModelFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<DesignCategoryModelFilter>>>;
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
  internalName?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  seoMetadata?: InputMaybe<SeoFilter>;
  slug?: InputMaybe<SlugFilter>;
  updatedAt?: InputMaybe<UpdatedAtFilter>;
}

export enum DesignCategoryModelOrderBy {
  _createdAt_ASC = '_createdAt_ASC',
  _createdAt_DESC = '_createdAt_DESC',
  _firstPublishedAt_ASC = '_firstPublishedAt_ASC',
  _firstPublishedAt_DESC = '_firstPublishedAt_DESC',
  _isValid_ASC = '_isValid_ASC',
  _isValid_DESC = '_isValid_DESC',
  _publicationScheduledAt_ASC = '_publicationScheduledAt_ASC',
  _publicationScheduledAt_DESC = '_publicationScheduledAt_DESC',
  _publishedAt_ASC = '_publishedAt_ASC',
  _publishedAt_DESC = '_publishedAt_DESC',
  _status_ASC = '_status_ASC',
  _status_DESC = '_status_DESC',
  _unpublishingScheduledAt_ASC = '_unpublishingScheduledAt_ASC',
  _unpublishingScheduledAt_DESC = '_unpublishingScheduledAt_DESC',
  _updatedAt_ASC = '_updatedAt_ASC',
  _updatedAt_DESC = '_updatedAt_DESC',
  createdAt_ASC = 'createdAt_ASC',
  createdAt_DESC = 'createdAt_DESC',
  id_ASC = 'id_ASC',
  id_DESC = 'id_DESC',
  internalName_ASC = 'internalName_ASC',
  internalName_DESC = 'internalName_DESC',
  name_ASC = 'name_ASC',
  name_DESC = 'name_DESC',
  updatedAt_ASC = 'updatedAt_ASC',
  updatedAt_DESC = 'updatedAt_DESC'
}

/** Record of type Design Category (design_category) */
export interface DesignCategoryRecord extends RecordInterface {
  __typename: 'DesignCategoryRecord';
  _allReferencingDesigns: Array<DesignRecord>;
  /** Returns meta information regarding a record collection */
  _allReferencingDesignsMeta: CollectionMetadata;
  _createdAt: Scalars['DateTime']['output'];
  /** Editing URL */
  _editingUrl: Maybe<Scalars['String']['output']>;
  _firstPublishedAt: Maybe<Scalars['DateTime']['output']>;
  _isValid: Scalars['BooleanType']['output'];
  _modelApiKey: Scalars['String']['output'];
  _publicationScheduledAt: Maybe<Scalars['DateTime']['output']>;
  _publishedAt: Maybe<Scalars['DateTime']['output']>;
  /** Generates SEO and Social card meta tags to be used in your frontend */
  _seoMetaTags: Array<Tag>;
  _status: ItemStatus;
  _unpublishingScheduledAt: Maybe<Scalars['DateTime']['output']>;
  _updatedAt: Scalars['DateTime']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ItemId']['output'];
  internalName: Maybe<Scalars['String']['output']>;
  name: Maybe<Scalars['String']['output']>;
  seoMetadata: Maybe<SeoField>;
  slug: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
}


/** Record of type Design Category (design_category) */
export interface DesignCategoryRecord_allReferencingDesignsArgs {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<DesignModelFilter>;
  first?: InputMaybe<Scalars['IntType']['input']>;
  locale?: InputMaybe<SiteLocale>;
  orderBy?: InputMaybe<Array<InputMaybe<DesignModelOrderBy>>>;
  skip?: InputMaybe<Scalars['IntType']['input']>;
  through?: InputMaybe<InverseRelationshipFilterBetweenDesignAndDesignCategory>;
}


/** Record of type Design Category (design_category) */
export interface DesignCategoryRecord_allReferencingDesignsMetaArgs {
  filter?: InputMaybe<DesignModelFilter>;
  locale?: InputMaybe<SiteLocale>;
  through?: InputMaybe<InverseRelationshipFilterBetweenDesignAndDesignCategory>;
}


/** Record of type Design Category (design_category) */
export interface DesignCategoryRecord_seoMetaTagsArgs {
  locale?: InputMaybe<SiteLocale>;
}

/** Linking fields */
export enum DesignModelFieldsReferencingDesignCategoryModel {
  design_categories = 'design_categories'
}

export interface DesignModelFilter {
  AND?: InputMaybe<Array<InputMaybe<DesignModelFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<DesignModelFilter>>>;
  _createdAt?: InputMaybe<CreatedAtFilter>;
  _firstPublishedAt?: InputMaybe<PublishedAtFilter>;
  _isValid?: InputMaybe<BooleanFilter>;
  _publicationScheduledAt?: InputMaybe<PublishedAtFilter>;
  _publishedAt?: InputMaybe<PublishedAtFilter>;
  _status?: InputMaybe<StatusFilter>;
  _unpublishingScheduledAt?: InputMaybe<PublishedAtFilter>;
  _updatedAt?: InputMaybe<UpdatedAtFilter>;
  categories?: InputMaybe<LinksFilter>;
  createdAt?: InputMaybe<CreatedAtFilter>;
  id?: InputMaybe<ItemIdFilter>;
  name?: InputMaybe<StringFilter>;
  primaryImage?: InputMaybe<FileFilter>;
  updatedAt?: InputMaybe<UpdatedAtFilter>;
}

export enum DesignModelOrderBy {
  _createdAt_ASC = '_createdAt_ASC',
  _createdAt_DESC = '_createdAt_DESC',
  _firstPublishedAt_ASC = '_firstPublishedAt_ASC',
  _firstPublishedAt_DESC = '_firstPublishedAt_DESC',
  _isValid_ASC = '_isValid_ASC',
  _isValid_DESC = '_isValid_DESC',
  _publicationScheduledAt_ASC = '_publicationScheduledAt_ASC',
  _publicationScheduledAt_DESC = '_publicationScheduledAt_DESC',
  _publishedAt_ASC = '_publishedAt_ASC',
  _publishedAt_DESC = '_publishedAt_DESC',
  _status_ASC = '_status_ASC',
  _status_DESC = '_status_DESC',
  _unpublishingScheduledAt_ASC = '_unpublishingScheduledAt_ASC',
  _unpublishingScheduledAt_DESC = '_unpublishingScheduledAt_DESC',
  _updatedAt_ASC = '_updatedAt_ASC',
  _updatedAt_DESC = '_updatedAt_DESC',
  createdAt_ASC = 'createdAt_ASC',
  createdAt_DESC = 'createdAt_DESC',
  id_ASC = 'id_ASC',
  id_DESC = 'id_DESC',
  name_ASC = 'name_ASC',
  name_DESC = 'name_DESC',
  updatedAt_ASC = 'updatedAt_ASC',
  updatedAt_DESC = 'updatedAt_DESC'
}

export interface DesignProduct {
  __typename: 'DesignProduct';
  catalogProductId: Scalars['ID']['output'];
  colors: Array<DesignProductColor>;
  createdAt: Scalars['DateTime']['output'];
  description: Maybe<Scalars['String']['output']>;
  designProofId: Scalars['ID']['output'];
  designRequestId: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
  inProductionQty: Scalars['Int']['output'];
  inStockQty: Scalars['Int']['output'];
  membershipId: Maybe<Scalars['ID']['output']>;
  name: Scalars['String']['output'];
  orders: Array<Order>;
  organizationId: Maybe<Scalars['ID']['output']>;
  primaryImageFile: Maybe<FileImage>;
  primaryImageFileId: Maybe<Scalars['ID']['output']>;
  sizes: Array<DesignProductSize>;
  termsConditionsAgreed: Scalars['Boolean']['output'];
  updatedAt: Scalars['DateTime']['output'];
  variants: Array<DesignProductVariant>;
}


export interface DesignProductordersArgs {
  limit?: InputMaybe<Scalars['Int']['input']>;
}

export interface DesignProductColor {
  __typename: 'DesignProductColor';
  catalogProductColorId: Scalars['ID']['output'];
  designRequestProductId: Scalars['ID']['output'];
  hex: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  imageFileIds: Array<Scalars['ID']['output']>;
  images: Array<FileImage>;
  name: Maybe<Scalars['String']['output']>;
}

export interface DesignProductConnection {
  __typename: 'DesignProductConnection';
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Edge-Types */
  edges: Maybe<Array<Maybe<DesignProductEdge>>>;
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-undefined.PageInfo */
  pageInfo: PageInfo;
}

export interface DesignProductCreateOrderInput {
  designProductId: Scalars['ID']['input'];
  orderItems: Array<DesignProductCreateOrderItemInput>;
  shippingAddressId?: InputMaybe<Scalars['ID']['input']>;
}

export interface DesignProductCreateOrderItemInput {
  catalogProductVariantId: Scalars['ID']['input'];
  quantity: Scalars['Int']['input'];
}

export interface DesignProductCreateOrderPayload {
  __typename: 'DesignProductCreateOrderPayload';
  order: Maybe<Order>;
}

export interface DesignProductCreateQuoteInput {
  designProductId: Scalars['ID']['input'];
  variants: Array<DesignProductCreateQuoteVariantInput>;
}

export interface DesignProductCreateQuotePayload {
  __typename: 'DesignProductCreateQuotePayload';
  quote: Maybe<Quote>;
}

export interface DesignProductCreateQuoteVariantInput {
  catalogProductVariantId: Scalars['ID']['input'];
  quantity: Scalars['Int']['input'];
}

export interface DesignProductEdge {
  __typename: 'DesignProductEdge';
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Cursor */
  cursor: Maybe<Scalars['String']['output']>;
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Node */
  node: Maybe<DesignProduct>;
}

export interface DesignProductSize {
  __typename: 'DesignProductSize';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
}

export interface DesignProductVariant {
  __typename: 'DesignProductVariant';
  catalogProductColorId: Maybe<Scalars['ID']['output']>;
  catalogProductId: Scalars['ID']['output'];
  catalogProductSizeId: Maybe<Scalars['ID']['output']>;
  catalogProductVariantId: Scalars['ID']['output'];
  colorName: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  sizeName: Maybe<Scalars['String']['output']>;
}

export interface DesignProof {
  __typename: 'DesignProof';
  artist: Maybe<Membership>;
  artistMembershipId: Scalars['ID']['output'];
  colors: Array<DesignProofColor>;
  createdAt: Scalars['DateTime']['output'];
  designProofColorIds: Array<Scalars['ID']['output']>;
  designProofLocationIds: Array<Scalars['ID']['output']>;
  designRequest: Maybe<DesignRequest>;
  designRequestId: Maybe<Scalars['ID']['output']>;
  id: Scalars['ID']['output'];
  locations: Array<DesignProofLocation>;
  membership: Maybe<Membership>;
  primaryImageFile: Maybe<FileImage>;
  primaryImageFileId: Maybe<Scalars['ID']['output']>;
}

export interface DesignProofColor {
  __typename: 'DesignProofColor';
  catalogProductColorId: Scalars['ID']['output'];
  designProofId: Scalars['ID']['output'];
  hexCode: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  imageFileIds: Array<Scalars['ID']['output']>;
  images: Array<FileImage>;
  name: Maybe<Scalars['String']['output']>;
}

export interface DesignProofLocation {
  __typename: 'DesignProofLocation';
  colorCount: Maybe<Scalars['Int']['output']>;
  designProofId: Scalars['ID']['output'];
  file: Maybe<File>;
  fileId: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
  placement: Maybe<Scalars['String']['output']>;
}

/** Record of type Design (design) */
export interface DesignRecord extends RecordInterface {
  __typename: 'DesignRecord';
  _createdAt: Scalars['DateTime']['output'];
  /** Editing URL */
  _editingUrl: Maybe<Scalars['String']['output']>;
  _firstPublishedAt: Maybe<Scalars['DateTime']['output']>;
  _isValid: Scalars['BooleanType']['output'];
  _modelApiKey: Scalars['String']['output'];
  _publicationScheduledAt: Maybe<Scalars['DateTime']['output']>;
  _publishedAt: Maybe<Scalars['DateTime']['output']>;
  /** Generates SEO and Social card meta tags to be used in your frontend */
  _seoMetaTags: Array<Tag>;
  _status: ItemStatus;
  _unpublishingScheduledAt: Maybe<Scalars['DateTime']['output']>;
  _updatedAt: Scalars['DateTime']['output'];
  categories: Array<DesignCategoryRecord>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ItemId']['output'];
  name: Maybe<Scalars['String']['output']>;
  primaryImage: Maybe<FileField>;
  updatedAt: Scalars['DateTime']['output'];
}


/** Record of type Design (design) */
export interface DesignRecord_seoMetaTagsArgs {
  locale?: InputMaybe<SiteLocale>;
}

export interface DesignRequest {
  __typename: 'DesignRequest';
  approvedDesignProofId: Maybe<Scalars['ID']['output']>;
  approvedProof: Maybe<DesignProof>;
  conversationId: Maybe<Scalars['ID']['output']>;
  createdAt: Scalars['DateTime']['output'];
  description: Maybe<Scalars['String']['output']>;
  designProducts: Array<DesignProduct>;
  designProofIds: Array<Scalars['ID']['output']>;
  designRequestLocationIds: Array<Scalars['ID']['output']>;
  designRequestLocations: Array<DesignRequestDesignLocation>;
  designRequestProduct: DesignRequestProduct;
  designRequestProductId: Scalars['ID']['output'];
  designRevisionRequestIds: Array<Scalars['ID']['output']>;
  designRevisionRequests: Array<DesignRequestRevisionRequest>;
  fileIds: Array<Scalars['ID']['output']>;
  fileUploadDirectory: Scalars['String']['output'];
  files: Array<File>;
  history: Array<DesignRequestHistoryItem>;
  humanizedStatus: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  membership: Maybe<Membership>;
  membershipId: Maybe<Scalars['ID']['output']>;
  name: Scalars['String']['output'];
  orders: Array<Order>;
  previewImage: Maybe<FileImage>;
  previewImageUrl: Maybe<Scalars['String']['output']>;
  proofs: Array<DesignProof>;
  status: DesignRequestStatus;
  updatedAt: Maybe<Scalars['DateTime']['output']>;
  useCase: Maybe<Scalars['String']['output']>;
}


export interface DesignRequestproofsArgs {
  limit?: InputMaybe<Scalars['Int']['input']>;
}

export interface DesignRequestApproveInput {
  description?: InputMaybe<Scalars['String']['input']>;
  designProofId: Scalars['ID']['input'];
  designRequestId: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  termsConditionsAgreed: Scalars['Boolean']['input'];
}

export interface DesignRequestApprovePayload {
  __typename: 'DesignRequestApprovePayload';
  design: Maybe<DesignProduct>;
  designRequest: Maybe<DesignRequest>;
}

export interface DesignRequestArchiveInput {
  designRequestId: Scalars['String']['input'];
}

export interface DesignRequestArchivePayload {
  __typename: 'DesignRequestArchivePayload';
  designRequest: Maybe<DesignRequest>;
}

export interface DesignRequestAssignInput {
  designRequestId: Scalars['String']['input'];
  membershipId: Scalars['String']['input'];
}

export interface DesignRequestAssignPayload {
  __typename: 'DesignRequestAssignPayload';
  designRequest: Maybe<DesignRequest>;
}

export interface DesignRequestConnection {
  __typename: 'DesignRequestConnection';
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Edge-Types */
  edges: Maybe<Array<Maybe<DesignRequestEdge>>>;
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-undefined.PageInfo */
  pageInfo: PageInfo;
}

export interface DesignRequestConversationMessageCreateInput {
  designRequestId: Scalars['ID']['input'];
  fileIds: Array<Scalars['String']['input']>;
  message: Scalars['String']['input'];
}

export interface DesignRequestConversationMessageCreatePayload {
  __typename: 'DesignRequestConversationMessageCreatePayload';
  designRequest: Maybe<DesignRequest>;
}

export interface DesignRequestCreateInput {
  description?: InputMaybe<Scalars['String']['input']>;
  fileIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  name?: InputMaybe<Scalars['String']['input']>;
  product: DesignRequestProductCreateInput;
  useCase?: InputMaybe<Scalars['String']['input']>;
}

export interface DesignRequestCreatePayload {
  __typename: 'DesignRequestCreatePayload';
  designRequest: Maybe<DesignRequest>;
}

export interface DesignRequestDesignLocation {
  __typename: 'DesignRequestDesignLocation';
  description: Maybe<Scalars['String']['output']>;
  fileIds: Array<Scalars['ID']['output']>;
  fileUploadDirectory: Scalars['String']['output'];
  files: Array<File>;
  id: Scalars['ID']['output'];
  placement: Maybe<Scalars['String']['output']>;
}

export interface DesignRequestDesignLocationCreateInput {
  description?: InputMaybe<Scalars['String']['input']>;
  designRequestId: Scalars['ID']['input'];
  fileIds: Array<Scalars['ID']['input']>;
  placement: Scalars['String']['input'];
}

export interface DesignRequestDesignLocationCreatePayload {
  __typename: 'DesignRequestDesignLocationCreatePayload';
  designRequest: Maybe<DesignRequest>;
  designRequestDesignLocation: Maybe<DesignRequestDesignLocation>;
}

export interface DesignRequestDesignLocationDeleteInput {
  designRequestDesignLocationId: Scalars['ID']['input'];
  designRequestId: Scalars['ID']['input'];
}

export interface DesignRequestDesignLocationDeletePayload {
  __typename: 'DesignRequestDesignLocationDeletePayload';
  designRequest: Maybe<DesignRequest>;
}

export interface DesignRequestDesignLocationUpdateInput {
  description?: InputMaybe<Scalars['String']['input']>;
  designRequestDesignLocationId: Scalars['ID']['input'];
  designRequestId: Scalars['ID']['input'];
  fileIds: Array<Scalars['ID']['input']>;
  placement?: InputMaybe<Scalars['String']['input']>;
}

export interface DesignRequestDesignLocationUpdatePayload {
  __typename: 'DesignRequestDesignLocationUpdatePayload';
  designRequest: Maybe<DesignRequest>;
  designRequestDesignLocation: Maybe<DesignRequestDesignLocation>;
}

export interface DesignRequestEdge {
  __typename: 'DesignRequestEdge';
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Cursor */
  cursor: Maybe<Scalars['String']['output']>;
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Node */
  node: Maybe<DesignRequest>;
}

export type DesignRequestHistoryItem = ConversationMessage | DesignProof | DesignRequestHistoryItemDesignRequestEvent | DesignRequestRevisionRequest;

export interface DesignRequestHistoryItemAddedPayload {
  __typename: 'DesignRequestHistoryItemAddedPayload';
  historyItemAdded: Scalars['Boolean']['output'];
}

export interface DesignRequestHistoryItemDesignRequestEvent {
  __typename: 'DesignRequestHistoryItemDesignRequestEvent';
  actor: Maybe<Membership>;
  id: Scalars['ID']['output'];
  membershipId: Maybe<Scalars['ID']['output']>;
  method: DesignRequestHistoryItemDesignRequestEventMethod;
  timestamp: Scalars['DateTime']['output'];
}

export enum DesignRequestHistoryItemDesignRequestEventMethod {
  CREATE = 'CREATE'
}

export interface DesignRequestProduct {
  __typename: 'DesignRequestProduct';
  catalogProduct: Maybe<CatalogProduct>;
  catalogProductId: Scalars['String']['output'];
  colors: Array<DesignRequestProductColors>;
  id: Scalars['ID']['output'];
}

export interface DesignRequestProductColorCreateInput {
  catalogProductColorId: Scalars['ID']['input'];
  hexCode?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
}

export interface DesignRequestProductColors {
  __typename: 'DesignRequestProductColors';
  catalogProductColorId: Scalars['ID']['output'];
  hexCode: Maybe<Scalars['String']['output']>;
  name: Maybe<Scalars['String']['output']>;
}

export interface DesignRequestProductCreateInput {
  catalogProductId: Scalars['ID']['input'];
  colors: Array<DesignRequestProductColorCreateInput>;
}

export interface DesignRequestProofCreateInput {
  designRequestId: Scalars['ID']['input'];
  message?: InputMaybe<Scalars['String']['input']>;
  primaryImageFileId: Scalars['String']['input'];
  proofLocations: Array<DesignRequestProofCreateProofLocationInput>;
  proofVariants: Array<DesignRequestProofCreateProofVariantInput>;
}

export interface DesignRequestProofCreatePayload {
  __typename: 'DesignRequestProofCreatePayload';
  designRequest: Maybe<DesignRequest>;
}

export interface DesignRequestProofCreateProofLocationInput {
  colorCount?: InputMaybe<Scalars['Int']['input']>;
  fileId: Scalars['ID']['input'];
  placement: Scalars['String']['input'];
}

export interface DesignRequestProofCreateProofVariantInput {
  catalogProductColorId: Scalars['ID']['input'];
  hexCode: Scalars['String']['input'];
  imageFileIds: Array<Scalars['ID']['input']>;
  name: Scalars['String']['input'];
}

export interface DesignRequestRejectInput {
  designRequestId: Scalars['String']['input'];
  message: Scalars['String']['input'];
}

export interface DesignRequestRejectPayload {
  __typename: 'DesignRequestRejectPayload';
  designRequest: Maybe<DesignRequest>;
}

export interface DesignRequestRevisionRequest {
  __typename: 'DesignRequestRevisionRequest';
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  designRequestId: Scalars['ID']['output'];
  fileIds: Array<Scalars['ID']['output']>;
  files: Array<File>;
  id: Scalars['ID']['output'];
  membership: Maybe<Membership>;
  membershipId: Scalars['ID']['output'];
}

export interface DesignRequestRevisionRequestCreateInput {
  description: Scalars['String']['input'];
  designRequestId: Scalars['ID']['input'];
  fileIds: Array<Scalars['String']['input']>;
}

export interface DesignRequestRevisionRequestCreatePayload {
  __typename: 'DesignRequestRevisionRequestCreatePayload';
  designRequest: Maybe<DesignRequest>;
}

export enum DesignRequestStatus {
  APPROVED = 'APPROVED',
  ARCHIVED = 'ARCHIVED',
  AWAITING_APPROVAL = 'AWAITING_APPROVAL',
  AWAITING_REVISION = 'AWAITING_REVISION',
  DRAFT = 'DRAFT',
  REJECTED = 'REJECTED',
  SUBMITTED = 'SUBMITTED'
}

export interface DesignRequestSubmitInput {
  designRequestId: Scalars['ID']['input'];
}

export interface DesignRequestSubmitPayload {
  __typename: 'DesignRequestSubmitPayload';
  designRequest: Maybe<DesignRequest>;
}

export interface DesignRequestUpdateInput {
  description?: InputMaybe<Scalars['String']['input']>;
  designRequestId: Scalars['ID']['input'];
  fileIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  locations?: InputMaybe<Array<DesignRequestUpdateLocationInput>>;
  name?: InputMaybe<Scalars['String']['input']>;
  useCase?: InputMaybe<Scalars['String']['input']>;
}

export interface DesignRequestUpdateLocationInput {
  description?: InputMaybe<Scalars['String']['input']>;
  designLocationId?: InputMaybe<Scalars['ID']['input']>;
  fileIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  placement?: InputMaybe<Scalars['String']['input']>;
}

export interface DesignRequestUpdatePayload {
  __typename: 'DesignRequestUpdatePayload';
  designRequest: Maybe<DesignRequest>;
}

/** Display field */
export interface DisplayField {
  __typename: 'DisplayField';
  /** Extended date format. */
  extendedDateFormat: Scalars['String']['output'];
  /** Short date format. */
  shortDateFormat: Scalars['String']['output'];
}

/** Distance */
export interface Distance {
  __typename: 'Distance';
  /** Length unit */
  lengthUnit: LengthUnit;
  /** Distance in specified length unit */
  value: Scalars['Float']['output'];
}

/** Filter locations by the distance */
export interface DistanceFilter {
  /** Signed decimal degrees without compass direction */
  latitude: Scalars['Float']['input'];
  /** Length unit */
  lengthUnit: LengthUnit;
  /** Signed decimal degrees without compass direction */
  longitude: Scalars['Float']['input'];
  /** Radius of search in length units specified in lengthUnit argument */
  radius: Scalars['Float']['input'];
}

/** An error due to the customer email already being in use when attempting registration. */
export interface EmailAlreadyInUseError extends Error {
  __typename: 'EmailAlreadyInUseError';
  /** A description of the error. */
  message: Scalars['String']['output'];
}

/** Entity page type */
export enum EntityPageType {
  BLOG_POST = 'BLOG_POST',
  BRAND = 'BRAND',
  CATEGORY = 'CATEGORY',
  CONTACT_US = 'CONTACT_US',
  PAGE = 'PAGE',
  PRODUCT = 'PRODUCT'
}

/** An error object, indicating what went wrong with a mutation. */
export interface Error {
  /** A description of the error */
  message: Scalars['String']['output'];
}

/** An external link page. */
export interface ExternalLinkPage extends WebPage {
  __typename: 'ExternalLinkPage';
  /** Unique ID for the web page. */
  entityId: Scalars['Int']['output'];
  /** Whether or not the page should be visible in the navigation menu. */
  isVisibleInNavigation: Scalars['Boolean']['output'];
  /** The URL that the page links to. */
  link: Scalars['String']['output'];
  /** Page name. */
  name: Scalars['String']['output'];
  /** Unique ID for the parent page. */
  parentEntityId: Maybe<Scalars['Int']['output']>;
  /** Page SEO details. */
  seo: SeoDetails;
}

/** Block of type FAQ Group (faq_group) */
export interface FaqGroupRecord extends RecordInterface {
  __typename: 'FaqGroupRecord';
  _createdAt: Scalars['DateTime']['output'];
  /** Editing URL */
  _editingUrl: Maybe<Scalars['String']['output']>;
  _firstPublishedAt: Maybe<Scalars['DateTime']['output']>;
  _isValid: Scalars['BooleanType']['output'];
  _modelApiKey: Scalars['String']['output'];
  _publicationScheduledAt: Maybe<Scalars['DateTime']['output']>;
  _publishedAt: Maybe<Scalars['DateTime']['output']>;
  /** Generates SEO and Social card meta tags to be used in your frontend */
  _seoMetaTags: Array<Tag>;
  _status: ItemStatus;
  _unpublishingScheduledAt: Maybe<Scalars['DateTime']['output']>;
  _updatedAt: Scalars['DateTime']['output'];
  createdAt: Scalars['DateTime']['output'];
  expandAll: Maybe<Scalars['BooleanType']['output']>;
  faqs: Array<FaqRecord>;
  id: Scalars['ItemId']['output'];
  updatedAt: Scalars['DateTime']['output'];
}


/** Block of type FAQ Group (faq_group) */
export interface FaqGroupRecord_seoMetaTagsArgs {
  locale?: InputMaybe<SiteLocale>;
}

/** Block of type FAQ (faq) */
export interface FaqRecord extends RecordInterface {
  __typename: 'FaqRecord';
  _createdAt: Scalars['DateTime']['output'];
  /** Editing URL */
  _editingUrl: Maybe<Scalars['String']['output']>;
  _firstPublishedAt: Maybe<Scalars['DateTime']['output']>;
  _isValid: Scalars['BooleanType']['output'];
  _modelApiKey: Scalars['String']['output'];
  _publicationScheduledAt: Maybe<Scalars['DateTime']['output']>;
  _publishedAt: Maybe<Scalars['DateTime']['output']>;
  /** Generates SEO and Social card meta tags to be used in your frontend */
  _seoMetaTags: Array<Tag>;
  _status: ItemStatus;
  _unpublishingScheduledAt: Maybe<Scalars['DateTime']['output']>;
  _updatedAt: Scalars['DateTime']['output'];
  answer: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ItemId']['output'];
  question: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
}


/** Block of type FAQ (faq) */
export interface FaqRecord_seoMetaTagsArgs {
  locale?: InputMaybe<SiteLocale>;
}


/** Block of type FAQ (faq) */
export interface FaqRecordanswerArgs {
  markdown?: InputMaybe<Scalars['Boolean']['input']>;
}

export enum FaviconType {
  appleTouchIcon = 'appleTouchIcon',
  icon = 'icon',
  msApplication = 'msApplication'
}

/** Block of type Feature Grid Feature (feature_grid_feature) */
export interface FeatureGridFeatureRecord extends RecordInterface {
  __typename: 'FeatureGridFeatureRecord';
  _createdAt: Scalars['DateTime']['output'];
  /** Editing URL */
  _editingUrl: Maybe<Scalars['String']['output']>;
  _firstPublishedAt: Maybe<Scalars['DateTime']['output']>;
  _isValid: Scalars['BooleanType']['output'];
  _modelApiKey: Scalars['String']['output'];
  _publicationScheduledAt: Maybe<Scalars['DateTime']['output']>;
  _publishedAt: Maybe<Scalars['DateTime']['output']>;
  /** Generates SEO and Social card meta tags to be used in your frontend */
  _seoMetaTags: Array<Tag>;
  _status: ItemStatus;
  _unpublishingScheduledAt: Maybe<Scalars['DateTime']['output']>;
  _updatedAt: Scalars['DateTime']['output'];
  callToActionText: Maybe<Scalars['String']['output']>;
  callToActionUrl: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  icon: Array<HeroIconRecord>;
  id: Scalars['ItemId']['output'];
  name: Maybe<Scalars['String']['output']>;
  shortDescription: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
}


/** Block of type Feature Grid Feature (feature_grid_feature) */
export interface FeatureGridFeatureRecord_seoMetaTagsArgs {
  locale?: InputMaybe<SiteLocale>;
}


/** Block of type Feature Grid Feature (feature_grid_feature) */
export interface FeatureGridFeatureRecordshortDescriptionArgs {
  markdown?: InputMaybe<Scalars['Boolean']['input']>;
}

/** Block of type Feature Grid (feature_grid) */
export interface FeatureGridRecord extends RecordInterface {
  __typename: 'FeatureGridRecord';
  _createdAt: Scalars['DateTime']['output'];
  /** Editing URL */
  _editingUrl: Maybe<Scalars['String']['output']>;
  _firstPublishedAt: Maybe<Scalars['DateTime']['output']>;
  _isValid: Scalars['BooleanType']['output'];
  _modelApiKey: Scalars['String']['output'];
  _publicationScheduledAt: Maybe<Scalars['DateTime']['output']>;
  _publishedAt: Maybe<Scalars['DateTime']['output']>;
  /** Generates SEO and Social card meta tags to be used in your frontend */
  _seoMetaTags: Array<Tag>;
  _status: ItemStatus;
  _unpublishingScheduledAt: Maybe<Scalars['DateTime']['output']>;
  _updatedAt: Scalars['DateTime']['output'];
  createdAt: Scalars['DateTime']['output'];
  features: Array<FeatureGridFeatureRecord>;
  id: Scalars['ItemId']['output'];
  updatedAt: Scalars['DateTime']['output'];
}


/** Block of type Feature Grid (feature_grid) */
export interface FeatureGridRecord_seoMetaTagsArgs {
  locale?: InputMaybe<SiteLocale>;
}

/** Record of type Feature Index Page (feature_index_page) */
export interface FeatureIndexPageRecord extends RecordInterface {
  __typename: 'FeatureIndexPageRecord';
  _createdAt: Scalars['DateTime']['output'];
  /** Editing URL */
  _editingUrl: Maybe<Scalars['String']['output']>;
  _firstPublishedAt: Maybe<Scalars['DateTime']['output']>;
  _isValid: Scalars['BooleanType']['output'];
  _modelApiKey: Scalars['String']['output'];
  _publicationScheduledAt: Maybe<Scalars['DateTime']['output']>;
  _publishedAt: Maybe<Scalars['DateTime']['output']>;
  /** Generates SEO and Social card meta tags to be used in your frontend */
  _seoMetaTags: Array<Tag>;
  _status: ItemStatus;
  _unpublishingScheduledAt: Maybe<Scalars['DateTime']['output']>;
  _updatedAt: Scalars['DateTime']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ItemId']['output'];
  seoMetadata: Maybe<SeoField>;
  updatedAt: Scalars['DateTime']['output'];
}


/** Record of type Feature Index Page (feature_index_page) */
export interface FeatureIndexPageRecord_seoMetaTagsArgs {
  locale?: InputMaybe<SiteLocale>;
}

export interface File {
  bytes: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  fileType: FileType;
  format: Scalars['String']['output'];
  humanizedBytes: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  membershipId: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  organizationId: Maybe<Scalars['String']['output']>;
  updatedAt: Maybe<Scalars['DateTime']['output']>;
  url: Scalars['String']['output'];
}

export interface FileConnection {
  __typename: 'FileConnection';
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Edge-Types */
  edges: Maybe<Array<Maybe<FileEdge>>>;
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-undefined.PageInfo */
  pageInfo: PageInfo;
}

export interface FileCreateBatchInput {
  files: Array<FileCreateInput>;
}

export interface FileCreateBatchPayload {
  __typename: 'FileCreateBatchPayload';
  files: Maybe<Array<File>>;
}

export interface FileCreateInput {
  bytes: Scalars['Int']['input'];
  cloudinaryAssetId?: InputMaybe<Scalars['String']['input']>;
  fileType: FileType;
  format: Scalars['String']['input'];
  height?: InputMaybe<Scalars['Int']['input']>;
  name: Scalars['String']['input'];
  originalFilename: Scalars['String']['input'];
  url: Scalars['String']['input'];
  width?: InputMaybe<Scalars['Int']['input']>;
}

export interface FileCreatePayload {
  __typename: 'FileCreatePayload';
  file: Maybe<File>;
}

export interface FileEdge {
  __typename: 'FileEdge';
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Cursor */
  cursor: Maybe<Scalars['String']['output']>;
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Node */
  node: Maybe<File>;
}

export interface FileField extends FileFieldInterface {
  __typename: 'FileField';
  _createdAt: Scalars['DateTime']['output'];
  /** The DatoCMS URL where you can edit this entity. To use this field, you need to set a X-Base-Editing-Url header in the request */
  _editingUrl: Maybe<Scalars['String']['output']>;
  _updatedAt: Scalars['DateTime']['output'];
  alt: Maybe<Scalars['String']['output']>;
  author: Maybe<Scalars['String']['output']>;
  basename: Scalars['String']['output'];
  blurUpThumb: Maybe<Scalars['String']['output']>;
  blurhash: Maybe<Scalars['String']['output']>;
  colors: Array<ColorField>;
  copyright: Maybe<Scalars['String']['output']>;
  customData: Scalars['CustomData']['output'];
  exifInfo: Scalars['CustomData']['output'];
  filename: Scalars['String']['output'];
  focalPoint: Maybe<focalPoint>;
  format: Scalars['String']['output'];
  height: Maybe<Scalars['IntType']['output']>;
  id: Scalars['UploadId']['output'];
  md5: Scalars['String']['output'];
  mimeType: Scalars['String']['output'];
  notes: Maybe<Scalars['String']['output']>;
  responsiveImage: Maybe<ResponsiveImage>;
  size: Scalars['IntType']['output'];
  smartTags: Array<Scalars['String']['output']>;
  tags: Array<Scalars['String']['output']>;
  thumbhash: Maybe<Scalars['String']['output']>;
  title: Maybe<Scalars['String']['output']>;
  url: Scalars['String']['output'];
  video: Maybe<UploadVideoField>;
  width: Maybe<Scalars['IntType']['output']>;
}


export interface FileFieldaltArgs {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
}


export interface FileFieldblurUpThumbArgs {
  imgixParams?: InputMaybe<ImgixParams>;
  punch?: Scalars['Float']['input'];
  quality?: Scalars['Int']['input'];
  size?: Scalars['Int']['input'];
}


export interface FileFieldcustomDataArgs {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
}


export interface FileFieldfocalPointArgs {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
}


export interface FileFieldresponsiveImageArgs {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  imgixParams?: InputMaybe<ImgixParams>;
  locale?: InputMaybe<SiteLocale>;
  sizes?: InputMaybe<Scalars['String']['input']>;
}


export interface FileFieldtitleArgs {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
}


export interface FileFieldurlArgs {
  imgixParams?: InputMaybe<ImgixParams>;
}

export interface FileFieldInterface {
  _createdAt: Scalars['DateTime']['output'];
  /** The DatoCMS URL where you can edit this entity. To use this field, you need to set a X-Base-Editing-Url header in the request */
  _editingUrl: Maybe<Scalars['String']['output']>;
  _updatedAt: Scalars['DateTime']['output'];
  alt: Maybe<Scalars['String']['output']>;
  author: Maybe<Scalars['String']['output']>;
  basename: Scalars['String']['output'];
  blurUpThumb: Maybe<Scalars['String']['output']>;
  blurhash: Maybe<Scalars['String']['output']>;
  colors: Array<ColorField>;
  copyright: Maybe<Scalars['String']['output']>;
  customData: Scalars['CustomData']['output'];
  exifInfo: Scalars['CustomData']['output'];
  filename: Scalars['String']['output'];
  focalPoint: Maybe<focalPoint>;
  format: Scalars['String']['output'];
  height: Maybe<Scalars['IntType']['output']>;
  id: Scalars['UploadId']['output'];
  md5: Scalars['String']['output'];
  mimeType: Scalars['String']['output'];
  notes: Maybe<Scalars['String']['output']>;
  responsiveImage: Maybe<ResponsiveImage>;
  size: Scalars['IntType']['output'];
  smartTags: Array<Scalars['String']['output']>;
  tags: Array<Scalars['String']['output']>;
  thumbhash: Maybe<Scalars['String']['output']>;
  title: Maybe<Scalars['String']['output']>;
  url: Scalars['String']['output'];
  video: Maybe<UploadVideoField>;
  width: Maybe<Scalars['IntType']['output']>;
}


export interface FileFieldInterfacealtArgs {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
}


export interface FileFieldInterfaceblurUpThumbArgs {
  imgixParams?: InputMaybe<ImgixParams>;
  punch?: Scalars['Float']['input'];
  quality?: Scalars['Int']['input'];
  size?: Scalars['Int']['input'];
}


export interface FileFieldInterfacecustomDataArgs {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
}


export interface FileFieldInterfacefocalPointArgs {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
}


export interface FileFieldInterfaceresponsiveImageArgs {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  imgixParams?: InputMaybe<ImgixParams>;
  locale?: InputMaybe<SiteLocale>;
  sizes?: InputMaybe<Scalars['String']['input']>;
}


export interface FileFieldInterfacetitleArgs {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
}


export interface FileFieldInterfaceurlArgs {
  imgixParams?: InputMaybe<ImgixParams>;
}

/** Specifies how to filter Single-file/image fields */
export interface FileFilter {
  /** Search for records with an exact match. The specified value must be an Upload ID */
  eq?: InputMaybe<Scalars['UploadId']['input']>;
  /** Filter records with the specified field defined (i.e. with any value) or not */
  exists?: InputMaybe<Scalars['BooleanType']['input']>;
  /** Filter records that have one of the specified uploads */
  in?: InputMaybe<Array<InputMaybe<Scalars['UploadId']['input']>>>;
  /** Exclude records with an exact match. The specified value must be an Upload ID */
  neq?: InputMaybe<Scalars['UploadId']['input']>;
  /** Filter records that do not have one of the specified uploads */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['UploadId']['input']>>>;
}

export interface FileImage extends File {
  __typename: 'FileImage';
  bytes: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  fileType: FileType;
  format: Scalars['String']['output'];
  height: Scalars['Int']['output'];
  humanizedBytes: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  membershipId: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  organizationId: Maybe<Scalars['String']['output']>;
  updatedAt: Maybe<Scalars['DateTime']['output']>;
  url: Scalars['String']['output'];
  width: Scalars['Int']['output'];
}

export interface FilePdf extends File {
  __typename: 'FilePdf';
  bytes: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  fileType: FileType;
  format: Scalars['String']['output'];
  humanizedBytes: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  membershipId: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  organizationId: Maybe<Scalars['String']['output']>;
  updatedAt: Maybe<Scalars['DateTime']['output']>;
  url: Scalars['String']['output'];
}

export enum FileType {
  IMAGE = 'IMAGE',
  PDF = 'PDF',
  UNKNOWN = 'UNKNOWN',
  VIDEO = 'VIDEO'
}

export interface FileUnknown extends File {
  __typename: 'FileUnknown';
  bytes: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  fileType: FileType;
  format: Scalars['String']['output'];
  humanizedBytes: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  membershipId: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  organizationId: Maybe<Scalars['String']['output']>;
  updatedAt: Maybe<Scalars['DateTime']['output']>;
  url: Scalars['String']['output'];
}

/** A form allowing selection and uploading of a file from the user's local computer. */
export interface FileUploadFieldOption extends CatalogProductOption {
  __typename: 'FileUploadFieldOption';
  /** Display name for the option. */
  displayName: Scalars['String']['output'];
  /** Unique ID for the option. */
  entityId: Scalars['Int']['output'];
  /** All possible file extensions. Empty means that all files allowed. */
  fileTypes: Array<Scalars['String']['output']>;
  /** One of the option values is required to be selected for the checkout. */
  isRequired: Scalars['Boolean']['output'];
  /** Indicates whether it is a variant option or modifier. */
  isVariantOption: Scalars['Boolean']['output'];
  /** The maximum size of the file in kilobytes */
  maxFileSize: Scalars['Int']['output'];
}

/** The details of a form field. */
export interface FormField {
  /** The entity ID of the form field. */
  entityId: Scalars['Int']['output'];
  /** Indicates whether the form field is built-in. */
  isBuiltIn: Scalars['Boolean']['output'];
  /** Indicates whether the form field is required. */
  isRequired: Scalars['Boolean']['output'];
  /** The label to display for the form field. */
  label: Scalars['String']['output'];
  /** The sort order priority of the form field. */
  sortOrder: Scalars['Int']['output'];
}

/** Object containing filters for querying form fields. */
export interface FormFieldFiltersInput {
  /** Filter by form field entity IDs. */
  entityIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  /** Filter by built-in form fields. */
  isBuiltIn?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by required form fields. */
  isRequired?: InputMaybe<Scalars['Boolean']['input']>;
}

/** The details of an option for a checkbox or multiple choice form field. */
export interface FormFieldOption {
  __typename: 'FormFieldOption';
  /** The entity ID of the form field option. */
  entityId: Scalars['Int']['output'];
  /** The label to display for the form field option. */
  label: Scalars['String']['output'];
}

/** The sorting to use on form field results. */
export enum FormFieldSortInput {
  FIELD_ID = 'FIELD_ID',
  SORT_ORDER = 'SORT_ORDER'
}

/** The types of form fields that can be queried. */
export interface FormFields {
  __typename: 'FormFields';
  /** The billing address form fields. */
  billingAddress: Array<FormField>;
  /** The customer form fields. */
  customer: Array<FormField>;
  /** The shipping address form fields. */
  shippingAddress: Array<FormField>;
}


/** The types of form fields that can be queried. */
export interface FormFieldsbillingAddressArgs {
  filters?: InputMaybe<FormFieldFiltersInput>;
  sortBy?: InputMaybe<FormFieldSortInput>;
}


/** The types of form fields that can be queried. */
export interface FormFieldscustomerArgs {
  filters?: InputMaybe<FormFieldFiltersInput>;
  sortBy?: InputMaybe<FormFieldSortInput>;
}


/** The types of form fields that can be queried. */
export interface FormFieldsshippingAddressArgs {
  filters?: InputMaybe<FormFieldFiltersInput>;
  sortBy?: InputMaybe<FormFieldSortInput>;
}

export interface Fulfillment {
  __typename: 'Fulfillment';
  createdAt: Scalars['DateTime']['output'];
  fulfillmentOrderItems: Array<FulfillmentOrderItem>;
  fulfillmentTrackingInfoId: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  membershipId: Maybe<Scalars['String']['output']>;
  orderId: Scalars['String']['output'];
  organizationId: Maybe<Scalars['String']['output']>;
  trackingInfo: FulfillmentTrackingInfo;
  updatedAt: Scalars['DateTime']['output'];
}

export interface FulfillmentCreateInput {
  carrier: Scalars['String']['input'];
  orderId: Scalars['String']['input'];
  trackingNumber: Scalars['String']['input'];
  trackingUrl: Scalars['String']['input'];
}

export interface FulfillmentCreatePayload {
  __typename: 'FulfillmentCreatePayload';
  fulfillment: Maybe<Fulfillment>;
}

export interface FulfillmentOrderItem {
  __typename: 'FulfillmentOrderItem';
  createdAt: Scalars['DateTime']['output'];
  fulfillmentId: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  orderItemId: Scalars['String']['output'];
  quantity: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
}

export interface FulfillmentTrackingInfo {
  __typename: 'FulfillmentTrackingInfo';
  carrier: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  trackingNumber: Scalars['String']['output'];
  trackingUrl: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
}

/** Gift wrapping for product */
export interface GiftWrapping {
  __typename: 'GiftWrapping';
  /** Indicates whether commenting is allowed for the gift wrapping. */
  allowComments: Scalars['Boolean']['output'];
  /** Gift wrapping id. */
  entityId: Scalars['Int']['output'];
  /** Gift wrapping name. */
  name: Scalars['String']['output'];
  /** Gift wrapping preview image url. */
  previewImageUrl: Maybe<Scalars['String']['output']>;
}

/** A connection to a list of items. */
export interface GiftWrappingConnection {
  __typename: 'GiftWrappingConnection';
  /** A list of edges. */
  edges: Maybe<Array<GiftWrappingEdge>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
}

/** An edge in a connection. */
export interface GiftWrappingEdge {
  __typename: 'GiftWrappingEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: GiftWrapping;
}

export enum GlobalRole {
  CUSTOMER = 'CUSTOMER',
  SUPERADMIN = 'SUPERADMIN'
}

export interface GlobalSeoField {
  __typename: 'GlobalSeoField';
  facebookPageUrl: Maybe<Scalars['String']['output']>;
  fallbackSeo: Maybe<SeoField>;
  siteName: Maybe<Scalars['String']['output']>;
  titleSuffix: Maybe<Scalars['String']['output']>;
  twitterAccount: Maybe<Scalars['String']['output']>;
}

export interface GlossaryCategoryModelFilter {
  AND?: InputMaybe<Array<InputMaybe<GlossaryCategoryModelFilter>>>;
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
}

export enum GlossaryCategoryModelOrderBy {
  _createdAt_ASC = '_createdAt_ASC',
  _createdAt_DESC = '_createdAt_DESC',
  _firstPublishedAt_ASC = '_firstPublishedAt_ASC',
  _firstPublishedAt_DESC = '_firstPublishedAt_DESC',
  _isValid_ASC = '_isValid_ASC',
  _isValid_DESC = '_isValid_DESC',
  _publicationScheduledAt_ASC = '_publicationScheduledAt_ASC',
  _publicationScheduledAt_DESC = '_publicationScheduledAt_DESC',
  _publishedAt_ASC = '_publishedAt_ASC',
  _publishedAt_DESC = '_publishedAt_DESC',
  _status_ASC = '_status_ASC',
  _status_DESC = '_status_DESC',
  _unpublishingScheduledAt_ASC = '_unpublishingScheduledAt_ASC',
  _unpublishingScheduledAt_DESC = '_unpublishingScheduledAt_DESC',
  _updatedAt_ASC = '_updatedAt_ASC',
  _updatedAt_DESC = '_updatedAt_DESC',
  createdAt_ASC = 'createdAt_ASC',
  createdAt_DESC = 'createdAt_DESC',
  id_ASC = 'id_ASC',
  id_DESC = 'id_DESC',
  position_ASC = 'position_ASC',
  position_DESC = 'position_DESC',
  title_ASC = 'title_ASC',
  title_DESC = 'title_DESC',
  updatedAt_ASC = 'updatedAt_ASC',
  updatedAt_DESC = 'updatedAt_DESC'
}

/** Record of type Glossary Category (glossary_category) */
export interface GlossaryCategoryRecord extends RecordInterface {
  __typename: 'GlossaryCategoryRecord';
  _allReferencingGlossaryEntries: Array<GlossaryEntryRecord>;
  /** Returns meta information regarding a record collection */
  _allReferencingGlossaryEntriesMeta: CollectionMetadata;
  _createdAt: Scalars['DateTime']['output'];
  /** Editing URL */
  _editingUrl: Maybe<Scalars['String']['output']>;
  _firstPublishedAt: Maybe<Scalars['DateTime']['output']>;
  _isValid: Scalars['BooleanType']['output'];
  _modelApiKey: Scalars['String']['output'];
  _publicationScheduledAt: Maybe<Scalars['DateTime']['output']>;
  _publishedAt: Maybe<Scalars['DateTime']['output']>;
  /** Generates SEO and Social card meta tags to be used in your frontend */
  _seoMetaTags: Array<Tag>;
  _status: ItemStatus;
  _unpublishingScheduledAt: Maybe<Scalars['DateTime']['output']>;
  _updatedAt: Scalars['DateTime']['output'];
  children: Maybe<Array<Maybe<GlossaryCategoryRecord>>>;
  createdAt: Scalars['DateTime']['output'];
  description: Maybe<Scalars['String']['output']>;
  id: Scalars['ItemId']['output'];
  parent: Maybe<GlossaryCategoryRecord>;
  position: Maybe<Scalars['IntType']['output']>;
  seoMetadata: Maybe<SeoField>;
  slug: Maybe<Scalars['String']['output']>;
  title: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
}


/** Record of type Glossary Category (glossary_category) */
export interface GlossaryCategoryRecord_allReferencingGlossaryEntriesArgs {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<GlossaryEntryModelFilter>;
  first?: InputMaybe<Scalars['IntType']['input']>;
  locale?: InputMaybe<SiteLocale>;
  orderBy?: InputMaybe<Array<InputMaybe<GlossaryEntryModelOrderBy>>>;
  skip?: InputMaybe<Scalars['IntType']['input']>;
  through?: InputMaybe<InverseRelationshipFilterBetweenGlossaryEntryAndGlossaryCategory>;
}


/** Record of type Glossary Category (glossary_category) */
export interface GlossaryCategoryRecord_allReferencingGlossaryEntriesMetaArgs {
  filter?: InputMaybe<GlossaryEntryModelFilter>;
  locale?: InputMaybe<SiteLocale>;
  through?: InputMaybe<InverseRelationshipFilterBetweenGlossaryEntryAndGlossaryCategory>;
}


/** Record of type Glossary Category (glossary_category) */
export interface GlossaryCategoryRecord_seoMetaTagsArgs {
  locale?: InputMaybe<SiteLocale>;
}


/** Record of type Glossary Category (glossary_category) */
export interface GlossaryCategoryRecorddescriptionArgs {
  markdown?: InputMaybe<Scalars['Boolean']['input']>;
}

export interface GlossaryEntryModelDescriptionField {
  __typename: 'GlossaryEntryModelDescriptionField';
  blocks: Array<ImageRecord>;
  links: Array<GlossaryEntryModelDescriptionLinksField>;
  value: Scalars['JsonField']['output'];
}

export type GlossaryEntryModelDescriptionLinksField = ArticleRecord | GlossaryEntryRecord;

/** Linking fields */
export enum GlossaryEntryModelFieldsReferencingGlossaryCategoryModel {
  glossaryEntry_categories = 'glossaryEntry_categories'
}

/** Linking fields */
export enum GlossaryEntryModelFieldsReferencingGlossaryEntryModel {
  glossaryEntry_description = 'glossaryEntry_description'
}

export interface GlossaryEntryModelFilter {
  AND?: InputMaybe<Array<InputMaybe<GlossaryEntryModelFilter>>>;
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
}

export enum GlossaryEntryModelOrderBy {
  _createdAt_ASC = '_createdAt_ASC',
  _createdAt_DESC = '_createdAt_DESC',
  _firstPublishedAt_ASC = '_firstPublishedAt_ASC',
  _firstPublishedAt_DESC = '_firstPublishedAt_DESC',
  _isValid_ASC = '_isValid_ASC',
  _isValid_DESC = '_isValid_DESC',
  _publicationScheduledAt_ASC = '_publicationScheduledAt_ASC',
  _publicationScheduledAt_DESC = '_publicationScheduledAt_DESC',
  _publishedAt_ASC = '_publishedAt_ASC',
  _publishedAt_DESC = '_publishedAt_DESC',
  _status_ASC = '_status_ASC',
  _status_DESC = '_status_DESC',
  _unpublishingScheduledAt_ASC = '_unpublishingScheduledAt_ASC',
  _unpublishingScheduledAt_DESC = '_unpublishingScheduledAt_DESC',
  _updatedAt_ASC = '_updatedAt_ASC',
  _updatedAt_DESC = '_updatedAt_DESC',
  affiliateUrl_ASC = 'affiliateUrl_ASC',
  affiliateUrl_DESC = 'affiliateUrl_DESC',
  businessUrl_ASC = 'businessUrl_ASC',
  businessUrl_DESC = 'businessUrl_DESC',
  createdAt_ASC = 'createdAt_ASC',
  createdAt_DESC = 'createdAt_DESC',
  entryType_ASC = 'entryType_ASC',
  entryType_DESC = 'entryType_DESC',
  id_ASC = 'id_ASC',
  id_DESC = 'id_DESC',
  term_ASC = 'term_ASC',
  term_DESC = 'term_DESC',
  updatedAt_ASC = 'updatedAt_ASC',
  updatedAt_DESC = 'updatedAt_DESC'
}

/** Record of type Glossary Entry (glossary_entry) */
export interface GlossaryEntryRecord extends RecordInterface {
  __typename: 'GlossaryEntryRecord';
  _allReferencingArticles: Array<ArticleRecord>;
  /** Returns meta information regarding a record collection */
  _allReferencingArticlesMeta: CollectionMetadata;
  _allReferencingGlossaryEntries: Array<GlossaryEntryRecord>;
  /** Returns meta information regarding a record collection */
  _allReferencingGlossaryEntriesMeta: CollectionMetadata;
  _createdAt: Scalars['DateTime']['output'];
  /** Editing URL */
  _editingUrl: Maybe<Scalars['String']['output']>;
  _firstPublishedAt: Maybe<Scalars['DateTime']['output']>;
  _isValid: Scalars['BooleanType']['output'];
  _modelApiKey: Scalars['String']['output'];
  _publicationScheduledAt: Maybe<Scalars['DateTime']['output']>;
  _publishedAt: Maybe<Scalars['DateTime']['output']>;
  /** Generates SEO and Social card meta tags to be used in your frontend */
  _seoMetaTags: Array<Tag>;
  _status: ItemStatus;
  _unpublishingScheduledAt: Maybe<Scalars['DateTime']['output']>;
  _updatedAt: Scalars['DateTime']['output'];
  affiliateUrl: Maybe<Scalars['String']['output']>;
  businessUrl: Maybe<Scalars['String']['output']>;
  categories: Array<GlossaryCategoryRecord>;
  createdAt: Scalars['DateTime']['output'];
  definition: Maybe<Scalars['String']['output']>;
  description: Maybe<GlossaryEntryModelDescriptionField>;
  entryType: Maybe<Scalars['String']['output']>;
  id: Scalars['ItemId']['output'];
  primaryImage: Maybe<FileField>;
  slug: Maybe<Scalars['String']['output']>;
  term: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
}


/** Record of type Glossary Entry (glossary_entry) */
export interface GlossaryEntryRecord_allReferencingArticlesArgs {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<ArticleModelFilter>;
  first?: InputMaybe<Scalars['IntType']['input']>;
  locale?: InputMaybe<SiteLocale>;
  orderBy?: InputMaybe<Array<InputMaybe<ArticleModelOrderBy>>>;
  skip?: InputMaybe<Scalars['IntType']['input']>;
  through?: InputMaybe<InverseRelationshipFilterBetweenArticleAndGlossaryEntry>;
}


/** Record of type Glossary Entry (glossary_entry) */
export interface GlossaryEntryRecord_allReferencingArticlesMetaArgs {
  filter?: InputMaybe<ArticleModelFilter>;
  locale?: InputMaybe<SiteLocale>;
  through?: InputMaybe<InverseRelationshipFilterBetweenArticleAndGlossaryEntry>;
}


/** Record of type Glossary Entry (glossary_entry) */
export interface GlossaryEntryRecord_allReferencingGlossaryEntriesArgs {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<GlossaryEntryModelFilter>;
  first?: InputMaybe<Scalars['IntType']['input']>;
  locale?: InputMaybe<SiteLocale>;
  orderBy?: InputMaybe<Array<InputMaybe<GlossaryEntryModelOrderBy>>>;
  skip?: InputMaybe<Scalars['IntType']['input']>;
  through?: InputMaybe<InverseRelationshipFilterBetweenGlossaryEntryAndGlossaryEntry>;
}


/** Record of type Glossary Entry (glossary_entry) */
export interface GlossaryEntryRecord_allReferencingGlossaryEntriesMetaArgs {
  filter?: InputMaybe<GlossaryEntryModelFilter>;
  locale?: InputMaybe<SiteLocale>;
  through?: InputMaybe<InverseRelationshipFilterBetweenGlossaryEntryAndGlossaryEntry>;
}


/** Record of type Glossary Entry (glossary_entry) */
export interface GlossaryEntryRecord_seoMetaTagsArgs {
  locale?: InputMaybe<SiteLocale>;
}


/** Record of type Glossary Entry (glossary_entry) */
export interface GlossaryEntryRecorddefinitionArgs {
  markdown?: InputMaybe<Scalars['Boolean']['input']>;
}

/** Record of type Glossary Index Page (glossary_index_page) */
export interface GlossaryIndexPageRecord extends RecordInterface {
  __typename: 'GlossaryIndexPageRecord';
  _createdAt: Scalars['DateTime']['output'];
  /** Editing URL */
  _editingUrl: Maybe<Scalars['String']['output']>;
  _firstPublishedAt: Maybe<Scalars['DateTime']['output']>;
  _isValid: Scalars['BooleanType']['output'];
  _modelApiKey: Scalars['String']['output'];
  _publicationScheduledAt: Maybe<Scalars['DateTime']['output']>;
  _publishedAt: Maybe<Scalars['DateTime']['output']>;
  /** Generates SEO and Social card meta tags to be used in your frontend */
  _seoMetaTags: Array<Tag>;
  _status: ItemStatus;
  _unpublishingScheduledAt: Maybe<Scalars['DateTime']['output']>;
  _updatedAt: Scalars['DateTime']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ItemId']['output'];
  seoMetadata: Maybe<SeoField>;
  updatedAt: Scalars['DateTime']['output'];
}


/** Record of type Glossary Index Page (glossary_index_page) */
export interface GlossaryIndexPageRecord_seoMetaTagsArgs {
  locale?: InputMaybe<SiteLocale>;
}

/** Block of type HeroIcon (hero_icon) */
export interface HeroIconRecord extends RecordInterface {
  __typename: 'HeroIconRecord';
  _createdAt: Scalars['DateTime']['output'];
  /** Editing URL */
  _editingUrl: Maybe<Scalars['String']['output']>;
  _firstPublishedAt: Maybe<Scalars['DateTime']['output']>;
  _isValid: Scalars['BooleanType']['output'];
  _modelApiKey: Scalars['String']['output'];
  _publicationScheduledAt: Maybe<Scalars['DateTime']['output']>;
  _publishedAt: Maybe<Scalars['DateTime']['output']>;
  /** Generates SEO and Social card meta tags to be used in your frontend */
  _seoMetaTags: Array<Tag>;
  _status: ItemStatus;
  _unpublishingScheduledAt: Maybe<Scalars['DateTime']['output']>;
  _updatedAt: Scalars['DateTime']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ItemId']['output'];
  tag: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
}


/** Block of type HeroIcon (hero_icon) */
export interface HeroIconRecord_seoMetaTagsArgs {
  locale?: InputMaybe<SiteLocale>;
}

/** Record of type HomePage (homepage) */
export interface HomepageRecord extends RecordInterface {
  __typename: 'HomepageRecord';
  _createdAt: Scalars['DateTime']['output'];
  /** Editing URL */
  _editingUrl: Maybe<Scalars['String']['output']>;
  _firstPublishedAt: Maybe<Scalars['DateTime']['output']>;
  _isValid: Scalars['BooleanType']['output'];
  _modelApiKey: Scalars['String']['output'];
  _publicationScheduledAt: Maybe<Scalars['DateTime']['output']>;
  _publishedAt: Maybe<Scalars['DateTime']['output']>;
  /** Generates SEO and Social card meta tags to be used in your frontend */
  _seoMetaTags: Array<Tag>;
  _status: ItemStatus;
  _unpublishingScheduledAt: Maybe<Scalars['DateTime']['output']>;
  _updatedAt: Scalars['DateTime']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ItemId']['output'];
  seoMetadata: Maybe<SeoField>;
  updatedAt: Scalars['DateTime']['output'];
}


/** Record of type HomePage (homepage) */
export interface HomepageRecord_seoMetaTagsArgs {
  locale?: InputMaybe<SiteLocale>;
}

/** Image */
export interface Image {
  __typename: 'Image';
  /** Text description of an image that can be used for SEO and/or accessibility purposes. */
  altText: Scalars['String']['output'];
  /** Indicates whether this is the primary image. */
  isDefault: Scalars['Boolean']['output'];
  /** Absolute path to image using store CDN. */
  url: Scalars['String']['output'];
  /** Absolute path to original image using store CDN. */
  urlOriginal: Scalars['String']['output'];
  /** A templatized URL containing a {:size} parameter which can be replaced with a string specifying the desired image size in either inherent width (123w) or width and height (123x123). */
  urlTemplate: Scalars['String']['output'];
}


/** Image */
export interface ImageurlArgs {
  height?: InputMaybe<Scalars['Int']['input']>;
  width: Scalars['Int']['input'];
}

/** A connection to a list of items. */
export interface ImageConnection {
  __typename: 'ImageConnection';
  /** A list of edges. */
  edges: Maybe<Array<ImageEdge>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
}

/** An edge in a connection. */
export interface ImageEdge {
  __typename: 'ImageEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: Image;
}

/** Block of type Image (image) */
export interface ImageRecord extends RecordInterface {
  __typename: 'ImageRecord';
  _createdAt: Scalars['DateTime']['output'];
  /** Editing URL */
  _editingUrl: Maybe<Scalars['String']['output']>;
  _firstPublishedAt: Maybe<Scalars['DateTime']['output']>;
  _isValid: Scalars['BooleanType']['output'];
  _modelApiKey: Scalars['String']['output'];
  _publicationScheduledAt: Maybe<Scalars['DateTime']['output']>;
  _publishedAt: Maybe<Scalars['DateTime']['output']>;
  /** Generates SEO and Social card meta tags to be used in your frontend */
  _seoMetaTags: Array<Tag>;
  _status: ItemStatus;
  _unpublishingScheduledAt: Maybe<Scalars['DateTime']['output']>;
  _updatedAt: Scalars['DateTime']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ItemId']['output'];
  image: Maybe<FileField>;
  updatedAt: Scalars['DateTime']['output'];
}


/** Block of type Image (image) */
export interface ImageRecord_seoMetaTagsArgs {
  locale?: InputMaybe<SiteLocale>;
}

export interface ImgixParams {
  /**
   * Aspect Ratio
   *
   * Specifies an aspect ratio to maintain when resizing and cropping the image
   *
   * Depends on: `fit=crop`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/size/ar)
   */
  ar?: InputMaybe<Scalars['String']['input']>;
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
  bg?: InputMaybe<Scalars['String']['input']>;
  /**
   * Background Removal
   *
   * Removes background from image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/rendering/background-removal/bg-remove)
   */
  bgRemove?: InputMaybe<Scalars['BooleanType']['input']>;
  /**
   * Blend
   *
   * Specifies the location of the blend image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/blending/blend)
   */
  blend?: InputMaybe<Scalars['String']['input']>;
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
  blendAlpha?: InputMaybe<Scalars['IntType']['input']>;
  /**
   * Blend Color
   *
   * Specifies a color to use when applying the blend.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/blending/blend-color)
   */
  blendColor?: InputMaybe<Scalars['String']['input']>;
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
  blendH?: InputMaybe<Scalars['FloatType']['input']>;
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
  blendPad?: InputMaybe<Scalars['IntType']['input']>;
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
  blendW?: InputMaybe<Scalars['FloatType']['input']>;
  /**
   * Blend X Position
   *
   * Adjusts the x-offset of the blend image relative to its parent.
   *
   * Depends on: `blend`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/blending/blend-x)
   */
  blendX?: InputMaybe<Scalars['IntType']['input']>;
  /**
   * Blend Y Position
   *
   * Adjusts the y-offset of the blend image relative to its parent.
   *
   * Depends on: `blend`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/blending/blend-y)
   */
  blendY?: InputMaybe<Scalars['IntType']['input']>;
  /**
   * Gaussian Blur
   *
   * Applies a gaussian blur to an image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/stylize/blur)
   */
  blur?: InputMaybe<Scalars['IntType']['input']>;
  /**
   * Border Size & Color
   *
   * Applies a border to an image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/border-and-padding/border)
   */
  border?: InputMaybe<Scalars['String']['input']>;
  /**
   * Border Bottom
   *
   * Sets bottom border of an image.
   *
   * Depends on: `border`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/border-and-padding/border-bottom)
   */
  borderBottom?: InputMaybe<Scalars['IntType']['input']>;
  /**
   * Border Left
   *
   * Sets left border of an image.
   *
   * Depends on: `border`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/border-and-padding/border-left)
   */
  borderLeft?: InputMaybe<Scalars['IntType']['input']>;
  /**
   * Outer Border Radius
   *
   * Sets the outer radius of the image's border in pixels.
   *
   * Depends on: `border`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/border-and-padding/border-radius)
   */
  borderRadius?: InputMaybe<Scalars['String']['input']>;
  /**
   * Inner Border Radius
   *
   * Sets the inner radius of the image's border in pixels.
   *
   * Depends on: `border`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/border-and-padding/border-radius-inner)
   */
  borderRadiusInner?: InputMaybe<Scalars['String']['input']>;
  /**
   * Border Right
   *
   * Sets right border of an image.
   *
   * Depends on: `border`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/border-and-padding/border-right)
   */
  borderRight?: InputMaybe<Scalars['IntType']['input']>;
  /**
   * Border Top
   *
   * Sets top border of an image.
   *
   * Depends on: `border`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/border-and-padding/border-top)
   */
  borderTop?: InputMaybe<Scalars['IntType']['input']>;
  /**
   * Brightness
   *
   * Adjusts the brightness of the source image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/adjustment/bri)
   */
  bri?: InputMaybe<Scalars['IntType']['input']>;
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
  chromasub?: InputMaybe<Scalars['IntType']['input']>;
  /**
   * Color Quantization
   *
   * Limits the number of unique colors in an image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/format/colorquant)
   */
  colorquant?: InputMaybe<Scalars['IntType']['input']>;
  /**
   * Palette Color Count
   *
   * Specifies how many colors to include in a palette-extraction response.
   *
   * Depends on: `palette`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/color-palette/colors)
   */
  colors?: InputMaybe<Scalars['IntType']['input']>;
  /**
   * Contrast
   *
   * Adjusts the contrast of the source image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/adjustment/con)
   */
  con?: InputMaybe<Scalars['IntType']['input']>;
  /**
   * Mask Corner Radius
   *
   * Specifies the radius value for a rounded corner mask.
   *
   * Depends on: `mask=corners`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/mask/corner-radius)
   */
  cornerRadius?: InputMaybe<Scalars['String']['input']>;
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
  dl?: InputMaybe<Scalars['String']['input']>;
  /**
   * Dots Per Inch
   *
   * Sets the DPI value in the EXIF header.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/format/dpi)
   */
  dpi?: InputMaybe<Scalars['IntType']['input']>;
  /**
   * Device Pixel Ratio
   *
   * Adjusts the device-pixel ratio of the output image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/dpr)
   */
  dpr?: InputMaybe<Scalars['FloatType']['input']>;
  /**
   * Duotone
   *
   * Applies a duotone effect to the source image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/stylize/duotone)
   */
  duotone?: InputMaybe<Scalars['String']['input']>;
  /**
   * Duotone Alpha
   *
   * Changes the alpha of the duotone effect atop the source image.
   *
   * Depends on: `duotone`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/stylize/duotone-alpha)
   */
  duotoneAlpha?: InputMaybe<Scalars['IntType']['input']>;
  /**
   * Exposure
   *
   * Adjusts the exposure of the output image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/adjustment/exp)
   */
  exp?: InputMaybe<Scalars['IntType']['input']>;
  /**
   * Url Expiration Timestamp
   *
   * A Unix timestamp specifying a UTC time. Requests made to this URL after that time will output a 404 status code.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/expires)
   */
  expires?: InputMaybe<Scalars['IntType']['input']>;
  /**
   * Face Index
   *
   * Selects a face to crop to.
   *
   * Depends on: `fit=facearea`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/face-detection/faceindex)
   */
  faceindex?: InputMaybe<Scalars['IntType']['input']>;
  /**
   * Face Padding
   *
   * Adjusts padding around a selected face.
   *
   * Depends on: `fit=facearea`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/face-detection/facepad)
   */
  facepad?: InputMaybe<Scalars['FloatType']['input']>;
  /**
   * Json Face Data
   *
   * Specifies that face data should be included in output when combined with `fm=json`.
   *
   * Depends on: `fm=json`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/face-detection/faces)
   */
  faces?: InputMaybe<Scalars['IntType']['input']>;
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
  fillColor?: InputMaybe<Scalars['String']['input']>;
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
  fpDebug?: InputMaybe<Scalars['BooleanType']['input']>;
  /**
   * Focal Point X Position
   *
   * Sets the relative horizontal value for the focal point of an image
   *
   * Depends on: `fit=crop`, `crop=focalpoint`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/focalpoint-crop/fp-x)
   */
  fpX?: InputMaybe<Scalars['FloatType']['input']>;
  /**
   * Focal Point Y Position
   *
   * Sets the relative vertical value for the focal point of an image
   *
   * Depends on: `fit=crop`, `crop=focalpoint`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/focalpoint-crop/fp-y)
   */
  fpY?: InputMaybe<Scalars['FloatType']['input']>;
  /**
   * Focal Point Zoom
   *
   * Sets the relative zoom value for the focal point of an image
   *
   * Depends on: `fit=crop`, `crop=focalpoint`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/focalpoint-crop/fp-z)
   */
  fpZ?: InputMaybe<Scalars['FloatType']['input']>;
  /**
   * Frames Per Second
   *
   * Specifies the framerate of the generated image.
   */
  fps?: InputMaybe<Scalars['IntType']['input']>;
  /**
   * Frame Selection
   *
   * Specifies the frame of an animated image to use.
   */
  frame?: InputMaybe<Scalars['String']['input']>;
  /**
   * Gamma
   *
   * Adjusts the gamma of the source image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/adjustment/gam)
   */
  gam?: InputMaybe<Scalars['IntType']['input']>;
  /**
   * Animated Gif Quality
   *
   * Depends on: `fm=gif`
   */
  gifQ?: InputMaybe<Scalars['IntType']['input']>;
  /**
   * Grid Colors
   *
   * Sets grid colors for the transparency checkerboard grid.
   *
   * Depends on: `transparency`
   */
  gridColors?: InputMaybe<Scalars['String']['input']>;
  /**
   * Grid Size
   *
   * Sets grid size for the transparency checkerboard grid.
   *
   * Depends on: `transparency`
   */
  gridSize?: InputMaybe<Scalars['IntType']['input']>;
  /**
   * Image Height
   *
   * Adjusts the height of the output image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/size/h)
   */
  h?: InputMaybe<Scalars['FloatType']['input']>;
  /**
   * Highlight
   *
   * Adjusts the highlights of the source image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/adjustment/high)
   */
  high?: InputMaybe<Scalars['IntType']['input']>;
  /**
   * Halftone
   *
   * Applies a half-tone effect to the source image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/stylize/htn)
   */
  htn?: InputMaybe<Scalars['IntType']['input']>;
  /**
   * Hue Shift
   *
   * Adjusts the hue of the source image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/adjustment/hue)
   */
  hue?: InputMaybe<Scalars['IntType']['input']>;
  /**
   * Frame Interval
   *
   * Displays every Nth frame starting with the first frame.
   */
  interval?: InputMaybe<Scalars['IntType']['input']>;
  /**
   * Invert
   *
   * Inverts the colors on the source image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/adjustment/invert)
   */
  invert?: InputMaybe<Scalars['BooleanType']['input']>;
  /**
   * Iptc Passthrough
   *
   * Determine if IPTC data should be passed for JPEG images.
   */
  iptc?: InputMaybe<ImgixParamsIptc>;
  /**
   * Animation Loop Count
   *
   * Specifies the number of times an animated image should repeat. A value of 0 means infinite looping.
   */
  loop?: InputMaybe<Scalars['IntType']['input']>;
  /**
   * Lossless Compression
   *
   * Specifies that the output image should be a lossless variant.
   *
   * Depends on: `fm=webp`, `fm=jxr`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/format/lossless)
   */
  lossless?: InputMaybe<Scalars['BooleanType']['input']>;
  /**
   * Watermark Image Url
   *
   * Specifies the location of the watermark image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/watermark/mark)
   */
  mark?: InputMaybe<Scalars['String']['input']>;
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
  markAlpha?: InputMaybe<Scalars['IntType']['input']>;
  /**
   * Watermark Base Url
   *
   * Changes base URL of the watermark image.
   *
   * Depends on: `mark`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/watermark/mark-base)
   */
  markBase?: InputMaybe<Scalars['String']['input']>;
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
  markH?: InputMaybe<Scalars['FloatType']['input']>;
  /**
   * Watermark Padding
   *
   * Applies padding to the watermark image.
   *
   * Depends on: `mark`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/watermark/mark-pad)
   */
  markPad?: InputMaybe<Scalars['IntType']['input']>;
  /**
   * Watermark Rotation
   *
   * Rotates a watermark or tiled watermarks by a specified number of degrees.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/watermark/mark-rot)
   */
  markRot?: InputMaybe<Scalars['FloatType']['input']>;
  /**
   * Watermark Scale
   *
   * Adjusts the scale of the watermark image.
   *
   * Depends on: `mark`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/watermark/mark-scale)
   */
  markScale?: InputMaybe<Scalars['IntType']['input']>;
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
  markW?: InputMaybe<Scalars['FloatType']['input']>;
  /**
   * Watermark X Position
   *
   * Adjusts the x-offset of the watermark image relative to its parent.
   *
   * Depends on: `mark`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/watermark/mark-x)
   */
  markX?: InputMaybe<Scalars['IntType']['input']>;
  /**
   * Watermark Y Position
   *
   * Adjusts the y-offset of the watermark image relative to its parent.
   *
   * Depends on: `mark`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/watermark/mark-y)
   */
  markY?: InputMaybe<Scalars['IntType']['input']>;
  /**
   * Mask Type
   *
   * Defines the type of mask and specifies the URL if that type is selected.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/mask)
   */
  mask?: InputMaybe<Scalars['String']['input']>;
  /**
   * Mask Background Color
   *
   * Colors the background of the transparent mask area of images
   *
   * Depends on: `mask`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/mask/mask-bg)
   */
  maskBg?: InputMaybe<Scalars['String']['input']>;
  /**
   * Maximum Height
   *
   * Specifies the maximum height of the output image in pixels.
   *
   * Depends on: `fit=crop`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/size/max-height)
   */
  maxH?: InputMaybe<Scalars['IntType']['input']>;
  /**
   * Maximum Width
   *
   * Specifies the maximum width of the output image in pixels.
   *
   * Depends on: `fit=crop`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/size/max-width)
   */
  maxW?: InputMaybe<Scalars['IntType']['input']>;
  /**
   * Minimum Height
   *
   * Specifies the minimum height of the output image in pixels.
   *
   * Depends on: `fit=crop`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/size/min-height)
   */
  minH?: InputMaybe<Scalars['IntType']['input']>;
  /**
   * Minimum Width
   *
   * Specifies the minimum width of the output image in pixels.
   *
   * Depends on: `fit=crop`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/size/min-width)
   */
  minW?: InputMaybe<Scalars['IntType']['input']>;
  /**
   * Monochrome
   *
   * Applies a monochrome effect to the source image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/stylize/monochrome)
   */
  monochrome?: InputMaybe<Scalars['String']['input']>;
  /**
   * Noise Reduction Bound
   *
   * Reduces the noise in an image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/noise-reduction/nr)
   */
  nr?: InputMaybe<Scalars['IntType']['input']>;
  /**
   * Noise Reduction Sharpen
   *
   * Provides a threshold by which to sharpen an image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/noise-reduction/nrs)
   */
  nrs?: InputMaybe<Scalars['IntType']['input']>;
  /**
   * Orientation
   *
   * Changes the image orientation.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/rotation/orient)
   */
  orient?: InputMaybe<Scalars['IntType']['input']>;
  /**
   * Padding
   *
   * Pads an image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/border-and-padding/pad)
   */
  pad?: InputMaybe<Scalars['IntType']['input']>;
  /**
   * Padding Bottom
   *
   * Sets bottom padding of an image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/border-and-padding/pad-bottom)
   */
  padBottom?: InputMaybe<Scalars['IntType']['input']>;
  /**
   * Padding Left
   *
   * Sets left padding of an image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/border-and-padding/pad-left)
   */
  padLeft?: InputMaybe<Scalars['IntType']['input']>;
  /**
   * Padding Right
   *
   * Sets right padding of an image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/border-and-padding/pad-right)
   */
  padRight?: InputMaybe<Scalars['IntType']['input']>;
  /**
   * Padding Top
   *
   * Sets top padding of an image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/border-and-padding/pad-top)
   */
  padTop?: InputMaybe<Scalars['IntType']['input']>;
  /**
   * Pdf Page Number
   *
   * Selects a page from a PDF for display.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/pdf/page)
   */
  page?: InputMaybe<Scalars['IntType']['input']>;
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
  pdfAnnotation?: InputMaybe<Scalars['BooleanType']['input']>;
  /**
   * Css Prefix
   *
   * Specifies a CSS prefix for all classes in palette-extraction.
   *
   * Depends on: `palette=css`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/color-palette/prefix)
   */
  prefix?: InputMaybe<Scalars['String']['input']>;
  /**
   * Pixellate
   *
   * Applies a pixelation effect to an image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/stylize/px)
   */
  px?: InputMaybe<Scalars['IntType']['input']>;
  /**
   * Output Quality
   *
   * Adjusts the quality of an output image.
   *
   * Depends on: `fm=jpg`, `fm=pjpg`, `fm=webp`, `fm=jxr`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/format/q)
   */
  q?: InputMaybe<Scalars['IntType']['input']>;
  /**
   * Source Rectangle Region
   *
   * Crops an image to a specified rectangle.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/size/rect)
   */
  rect?: InputMaybe<Scalars['String']['input']>;
  /**
   * Reverse
   *
   * Reverses the frame order on the source animation.
   */
  reverse?: InputMaybe<Scalars['BooleanType']['input']>;
  /**
   * Rotation
   *
   * Rotates an image by a specified number of degrees.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/rotation/rot)
   */
  rot?: InputMaybe<Scalars['FloatType']['input']>;
  /**
   * Saturation
   *
   * Adjusts the saturation of an image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/adjustment/sat)
   */
  sat?: InputMaybe<Scalars['IntType']['input']>;
  /**
   * Sepia Tone
   *
   * Applies a sepia effect to an image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/stylize/sepia)
   */
  sepia?: InputMaybe<Scalars['IntType']['input']>;
  /**
   * Shadow
   *
   * Adjusts the highlights of the source image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/adjustment/shad)
   */
  shad?: InputMaybe<Scalars['FloatType']['input']>;
  /**
   * Sharpen
   *
   * Adjusts the sharpness of the source image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/adjustment/sharp)
   */
  sharp?: InputMaybe<Scalars['FloatType']['input']>;
  /**
   * Frame Skip
   *
   * Skips every Nth frame starting with the first frame.
   */
  skip?: InputMaybe<Scalars['IntType']['input']>;
  /**
   * Bypasses any [DatoCMS Automatic Image Optimization](https://www.datocms.com/docs/cdn-settings/advanced-asset-settings) that might be set up for the project.
   *
   * Exercise caution when using this parameter, as it could significantly increase your bandwidth costs.
   */
  skipDefaultOptimizations?: InputMaybe<Scalars['BooleanType']['input']>;
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
  trimColor?: InputMaybe<Scalars['String']['input']>;
  /**
   * Trim Mean Difference
   *
   * Specifies the mean difference on a trim operation.
   *
   * Depends on: `trim=auto`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/trim/trim-md)
   */
  trimMd?: InputMaybe<Scalars['FloatType']['input']>;
  /**
   * Trim Padding
   *
   * Pads the area of the source image before trimming.
   *
   * Depends on: `trim`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/trim/trim-pad)
   */
  trimPad?: InputMaybe<Scalars['IntType']['input']>;
  /**
   * Trim Standard Deviation
   *
   * Specifies the standard deviation on a trim operation.
   *
   * Depends on: `trim=auto`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/trim/trim-sd)
   */
  trimSd?: InputMaybe<Scalars['FloatType']['input']>;
  /**
   * Trim Tolerance
   *
   * Specifies the tolerance on a trim operation.
   *
   * Depends on: `trim=color`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/trim/trim-tol)
   */
  trimTol?: InputMaybe<Scalars['FloatType']['input']>;
  /**
   * Text String
   *
   * Sets the text string to render.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/text/txt)
   */
  txt?: InputMaybe<Scalars['String']['input']>;
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
  txtColor?: InputMaybe<Scalars['String']['input']>;
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
  txtFont?: InputMaybe<Scalars['String']['input']>;
  /**
   * Text Leading
   *
   * Sets the leading (line spacing) for rendered text. Only works on the multi-line text endpoint.
   *
   * Depends on: `txt`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/typesetting/txt-lead)
   */
  txtLead?: InputMaybe<Scalars['IntType']['input']>;
  /**
   * Text Ligatures
   *
   * Controls the level of ligature substitution
   *
   * Depends on: `txt`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/text/txt-lig)
   */
  txtLig?: InputMaybe<Scalars['IntType']['input']>;
  /**
   * Text Outline
   *
   * Outlines the rendered text with a specified color.
   *
   * Depends on: `txt`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/text/txt-line)
   */
  txtLine?: InputMaybe<Scalars['IntType']['input']>;
  /**
   * Text Outline Color
   *
   * Specifies a text outline color.
   *
   * Depends on: `txt`, `txtline`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/text/txt-line-color)
   */
  txtLineColor?: InputMaybe<Scalars['String']['input']>;
  /**
   * Text Padding
   *
   * Specifies the padding (in device-independent pixels) between a textbox and the edges of the base image.
   *
   * Depends on: `txt`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/text/txt-pad)
   */
  txtPad?: InputMaybe<Scalars['IntType']['input']>;
  /**
   * Text Shadow
   *
   * Applies a shadow to rendered text.
   *
   * Depends on: `txt`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/text/txt-shad)
   */
  txtShad?: InputMaybe<Scalars['FloatType']['input']>;
  /**
   * Text Font Size
   *
   * Sets the font size of rendered text.
   *
   * Depends on: `txt`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/text/txt-size)
   */
  txtSize?: InputMaybe<Scalars['IntType']['input']>;
  /**
   * Text Tracking
   *
   * Sets the tracking (letter spacing) for rendered text. Only works on the multi-line text endpoint.
   *
   * Depends on: `txt`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/typesetting/txt-track)
   */
  txtTrack?: InputMaybe<Scalars['IntType']['input']>;
  /**
   * Text Width
   *
   * Sets the width of rendered text.
   *
   * Depends on: `txt`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/text/txt-width)
   */
  txtWidth?: InputMaybe<Scalars['IntType']['input']>;
  /**
   * Text X Position
   *
   * Sets the horizontal (x) position of the text in pixels relative to the left edge of the base image.
   *
   * Depends on: `txt`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/text/txt-x)
   */
  txtX?: InputMaybe<Scalars['IntType']['input']>;
  /**
   * Text Y Position
   *
   * Sets the vertical (y) position of the text in pixels relative to the top edge of the base image.
   *
   * Depends on: `txt`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/text/txt-y)
   */
  txtY?: InputMaybe<Scalars['IntType']['input']>;
  /**
   * Unsharp Mask
   *
   * Sharpens the source image using an unsharp mask.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/adjustment/usm)
   */
  usm?: InputMaybe<Scalars['IntType']['input']>;
  /**
   * Unsharp Mask Radius
   *
   * Specifies the radius for an unsharp mask operation.
   *
   * Depends on: `usm`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/adjustment/usmrad)
   */
  usmrad?: InputMaybe<Scalars['FloatType']['input']>;
  /**
   * Vibrance
   *
   * Adjusts the vibrance of an image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/adjustment/vib)
   */
  vib?: InputMaybe<Scalars['IntType']['input']>;
  /**
   * Image Width
   *
   * Adjusts the width of the output image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/size/w)
   */
  w?: InputMaybe<Scalars['FloatType']['input']>;
}

export enum ImgixParamsAuto {
  compress = 'compress',
  enhance = 'enhance',
  format = 'format',
  redeye = 'redeye'
}

export enum ImgixParamsBlendAlign {
  bottom = 'bottom',
  center = 'center',
  left = 'left',
  middle = 'middle',
  right = 'right',
  top = 'top'
}

export enum ImgixParamsBlendCrop {
  bottom = 'bottom',
  faces = 'faces',
  left = 'left',
  right = 'right',
  top = 'top'
}

export enum ImgixParamsBlendFit {
  clamp = 'clamp',
  clip = 'clip',
  crop = 'crop',
  max = 'max',
  scale = 'scale'
}

export enum ImgixParamsBlendMode {
  burn = 'burn',
  color = 'color',
  darken = 'darken',
  difference = 'difference',
  dodge = 'dodge',
  exclusion = 'exclusion',
  hardlight = 'hardlight',
  hue = 'hue',
  lighten = 'lighten',
  luminosity = 'luminosity',
  multiply = 'multiply',
  normal = 'normal',
  overlay = 'overlay',
  saturation = 'saturation',
  screen = 'screen',
  softlight = 'softlight'
}

export enum ImgixParamsBlendSize {
  inherit = 'inherit'
}

export enum ImgixParamsCh {
  dpr = 'dpr',
  saveData = 'saveData',
  width = 'width'
}

export enum ImgixParamsCrop {
  bottom = 'bottom',
  edges = 'edges',
  entropy = 'entropy',
  faces = 'faces',
  focalpoint = 'focalpoint',
  left = 'left',
  right = 'right',
  top = 'top'
}

export enum ImgixParamsCs {
  adobergb1998 = 'adobergb1998',
  srgb = 'srgb',
  strip = 'strip',
  tinysrgb = 'tinysrgb'
}

export enum ImgixParamsFill {
  blur = 'blur',
  solid = 'solid'
}

export enum ImgixParamsFit {
  clamp = 'clamp',
  clip = 'clip',
  crop = 'crop',
  facearea = 'facearea',
  fill = 'fill',
  fillmax = 'fillmax',
  max = 'max',
  min = 'min',
  scale = 'scale'
}

export enum ImgixParamsFlip {
  h = 'h',
  hv = 'hv',
  v = 'v'
}

export enum ImgixParamsFm {
  avif = 'avif',
  blurhash = 'blurhash',
  gif = 'gif',
  jp2 = 'jp2',
  jpg = 'jpg',
  json = 'json',
  jxr = 'jxr',
  mp4 = 'mp4',
  pjpg = 'pjpg',
  png = 'png',
  png8 = 'png8',
  png32 = 'png32',
  webm = 'webm',
  webp = 'webp'
}

export enum ImgixParamsIptc {
  allow = 'allow',
  block = 'block'
}

export enum ImgixParamsMarkAlign {
  bottom = 'bottom',
  center = 'center',
  left = 'left',
  middle = 'middle',
  right = 'right',
  top = 'top'
}

export enum ImgixParamsMarkFit {
  clip = 'clip',
  crop = 'crop',
  fill = 'fill',
  max = 'max',
  scale = 'scale'
}

export enum ImgixParamsMarkTile {
  grid = 'grid'
}

export enum ImgixParamsPalette {
  css = 'css',
  json = 'json'
}

export enum ImgixParamsTransparency {
  grid = 'grid'
}

export enum ImgixParamsTrim {
  auto = 'auto',
  color = 'color'
}

export enum ImgixParamsTxtAlign {
  bottom = 'bottom',
  center = 'center',
  left = 'left',
  middle = 'middle',
  right = 'right',
  top = 'top'
}

export enum ImgixParamsTxtClip {
  ellipsis = 'ellipsis',
  end = 'end',
  middle = 'middle',
  start = 'start'
}

export enum ImgixParamsTxtFit {
  max = 'max'
}

/** Specifies how to filter by usage */
export interface InUseFilter {
  /** Search uploads that are currently used by some record or not */
  eq?: InputMaybe<Scalars['BooleanType']['input']>;
}

/** An inventory */
export interface Inventory {
  __typename: 'Inventory';
  /** Locations */
  locations: InventoryLocationConnection;
}


/** An inventory */
export interface InventorylocationsArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  cities?: InputMaybe<Array<Scalars['String']['input']>>;
  codes?: InputMaybe<Array<Scalars['String']['input']>>;
  countryCodes?: InputMaybe<Array<countryCode>>;
  distanceFilter?: InputMaybe<DistanceFilter>;
  entityIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  serviceTypeIds?: InputMaybe<Array<Scalars['String']['input']>>;
  states?: InputMaybe<Array<Scalars['String']['input']>>;
  typeIds?: InputMaybe<Array<Scalars['String']['input']>>;
}

/** Address */
export interface InventoryAddress {
  __typename: 'InventoryAddress';
  /** Address line1. */
  address1: Scalars['String']['output'];
  /** Address line2. */
  address2: Scalars['String']['output'];
  /** Address city. */
  city: Scalars['String']['output'];
  /** Address code. */
  code: Scalars['String']['output'];
  /** Country code. */
  countryCode: Scalars['String']['output'];
  /** Address description. */
  description: Maybe<Scalars['String']['output']>;
  /** Address email. */
  email: Scalars['String']['output'];
  /** Address id. */
  entityId: Scalars['Int']['output'];
  /** Address label. */
  label: Scalars['String']['output'];
  /** Address latitude. */
  latitude: Maybe<Scalars['Float']['output']>;
  /** Address longitude. */
  longitude: Maybe<Scalars['Float']['output']>;
  /** Address phone. */
  phone: Scalars['String']['output'];
  /** Address zip. */
  postalCode: Scalars['String']['output'];
  /** Address state. */
  stateOrProvince: Scalars['String']['output'];
}

/** Inventory By Locations */
export interface InventoryByLocations {
  __typename: 'InventoryByLocations';
  /** Number of available products in stock. */
  availableToSell: Scalars['Long']['output'];
  /** Indicates whether this product is in stock. */
  isInStock: Scalars['Boolean']['output'];
  /** Distance between location and specified longitude and latitude */
  locationDistance: Maybe<Distance>;
  /** Location code. */
  locationEntityCode: Scalars['String']['output'];
  /** Location id. */
  locationEntityId: Scalars['Long']['output'];
  /**
   * Location service type ids.
   * @deprecated Deprecated. Will be substituted with pickup methods.
   */
  locationEntityServiceTypeIds: Array<Scalars['String']['output']>;
  /** Location type id. */
  locationEntityTypeId: Maybe<Scalars['String']['output']>;
  /** Indicates a threshold low-stock level. */
  warningLevel: Scalars['Int']['output'];
}

/** Location */
export interface InventoryLocation {
  __typename: 'InventoryLocation';
  /** Location address */
  address: Maybe<InventoryAddress>;
  /**
   * Upcoming events
   * @deprecated Deprecated. Use specialHours instead
   */
  blackoutHours: Array<SpecialHour>;
  /** Location code. */
  code: Scalars['String']['output'];
  /** Location description. */
  description: Maybe<Scalars['String']['output']>;
  /** Distance between location and specified longitude and latitude */
  distance: Maybe<Distance>;
  /** Location id. */
  entityId: Scalars['Int']['output'];
  /** Location label. */
  label: Scalars['String']['output'];
  /** Metafield data related to a location. */
  metafields: MetafieldConnection;
  /** Location OperatingHours */
  operatingHours: Maybe<OperatingHours>;
  /**
   * Location service type ids.
   * @deprecated Deprecated. Will be substituted with pickup methods.
   */
  serviceTypeIds: Array<Scalars['String']['output']>;
  /** Upcoming events */
  specialHours: Array<SpecialHour>;
  /** Time zone of location */
  timeZone: Maybe<Scalars['String']['output']>;
  /** Location type id. */
  typeId: Maybe<Scalars['String']['output']>;
}


/** Location */
export interface InventoryLocationmetafieldsArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  keys?: InputMaybe<Array<Scalars['String']['input']>>;
  last?: InputMaybe<Scalars['Int']['input']>;
  namespace: Scalars['String']['input'];
}

/** A connection to a list of items. */
export interface InventoryLocationConnection {
  __typename: 'InventoryLocationConnection';
  /** A list of edges. */
  edges: Maybe<Array<InventoryLocationEdge>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
}

/** An edge in a connection. */
export interface InventoryLocationEdge {
  __typename: 'InventoryLocationEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: InventoryLocation;
}

/** Inventory settings from control panel. */
export interface InventorySettings {
  __typename: 'InventorySettings';
  /** Out of stock message. */
  defaultOutOfStockMessage: Scalars['String']['output'];
  /** Flag to show or not on product filtering when option is out of stock */
  hideInProductFiltering: Scalars['Boolean']['output'];
  /** The option out of stock behavior. */
  optionOutOfStockBehavior: Maybe<OptionOutOfStockBehavior>;
  /** The product out of stock behavior. */
  productOutOfStockBehavior: Maybe<ProductOutOfStockBehavior>;
  /** Show out of stock message on product listing pages */
  showOutOfStockMessage: Scalars['Boolean']['output'];
  /** Show pre-order inventory */
  showPreOrderStockLevels: Scalars['Boolean']['output'];
  /** Hide or show inventory node for product */
  stockLevelDisplay: Maybe<StockLevelDisplay>;
  /** The behavior to use to update stock levels. */
  updateStockBehavior: Maybe<UpdateStockBehavior>;
}

/** Specifies how to filter by linking fields */
export interface InverseRelationshipFieldFilterBetweenArticleAndGlossaryEntry {
  /** Filter linking records that reference current record in at least one of the specified fields */
  anyIn?: InputMaybe<Array<ArticleModelFieldsReferencingGlossaryEntryModel>>;
  /** Filter linking records that do not reference current record in any of the specified fields */
  notIn?: InputMaybe<Array<ArticleModelFieldsReferencingGlossaryEntryModel>>;
}

/** Specifies how to filter by linking fields */
export interface InverseRelationshipFieldFilterBetweenDesignAndDesignCategory {
  /** Filter linking records that reference current record in at least one of the specified fields */
  anyIn?: InputMaybe<Array<DesignModelFieldsReferencingDesignCategoryModel>>;
  /** Filter linking records that do not reference current record in any of the specified fields */
  notIn?: InputMaybe<Array<DesignModelFieldsReferencingDesignCategoryModel>>;
}

/** Specifies how to filter by linking fields */
export interface InverseRelationshipFieldFilterBetweenGlossaryEntryAndGlossaryCategory {
  /** Filter linking records that reference current record in at least one of the specified fields */
  anyIn?: InputMaybe<Array<GlossaryEntryModelFieldsReferencingGlossaryCategoryModel>>;
  /** Filter linking records that do not reference current record in any of the specified fields */
  notIn?: InputMaybe<Array<GlossaryEntryModelFieldsReferencingGlossaryCategoryModel>>;
}

/** Specifies how to filter by linking fields */
export interface InverseRelationshipFieldFilterBetweenGlossaryEntryAndGlossaryEntry {
  /** Filter linking records that reference current record in at least one of the specified fields */
  anyIn?: InputMaybe<Array<GlossaryEntryModelFieldsReferencingGlossaryEntryModel>>;
  /** Filter linking records that do not reference current record in any of the specified fields */
  notIn?: InputMaybe<Array<GlossaryEntryModelFieldsReferencingGlossaryEntryModel>>;
}

/** Specifies how to filter by linking fields */
export interface InverseRelationshipFieldFilterBetweenLandingPageLinkAndLandingPage {
  /** Filter linking records that reference current record in at least one of the specified fields */
  anyIn?: InputMaybe<Array<LandingPageLinkModelFieldsReferencingLandingPageModel>>;
  /** Filter linking records that do not reference current record in any of the specified fields */
  notIn?: InputMaybe<Array<LandingPageLinkModelFieldsReferencingLandingPageModel>>;
}

/** Specifies how to filter linking records */
export interface InverseRelationshipFilterBetweenArticleAndGlossaryEntry {
  /** Specifies how to filter by linking fields */
  fields?: InputMaybe<InverseRelationshipFieldFilterBetweenArticleAndGlossaryEntry>;
  /** Specifies how to filter by linking locales */
  locales?: InputMaybe<LinkingLocalesFilter>;
}

/** Specifies how to filter linking records */
export interface InverseRelationshipFilterBetweenDesignAndDesignCategory {
  /** Specifies how to filter by linking fields */
  fields?: InputMaybe<InverseRelationshipFieldFilterBetweenDesignAndDesignCategory>;
  /** Specifies how to filter by linking locales */
  locales?: InputMaybe<LinkingLocalesFilter>;
}

/** Specifies how to filter linking records */
export interface InverseRelationshipFilterBetweenGlossaryEntryAndGlossaryCategory {
  /** Specifies how to filter by linking fields */
  fields?: InputMaybe<InverseRelationshipFieldFilterBetweenGlossaryEntryAndGlossaryCategory>;
  /** Specifies how to filter by linking locales */
  locales?: InputMaybe<LinkingLocalesFilter>;
}

/** Specifies how to filter linking records */
export interface InverseRelationshipFilterBetweenGlossaryEntryAndGlossaryEntry {
  /** Specifies how to filter by linking fields */
  fields?: InputMaybe<InverseRelationshipFieldFilterBetweenGlossaryEntryAndGlossaryEntry>;
  /** Specifies how to filter by linking locales */
  locales?: InputMaybe<LinkingLocalesFilter>;
}

/** Specifies how to filter linking records */
export interface InverseRelationshipFilterBetweenLandingPageLinkAndLandingPage {
  /** Specifies how to filter by linking fields */
  fields?: InputMaybe<InverseRelationshipFieldFilterBetweenLandingPageLinkAndLandingPage>;
  /** Specifies how to filter by linking locales */
  locales?: InputMaybe<LinkingLocalesFilter>;
}

/** Specifies how to filter by ID */
export interface ItemIdFilter {
  /** Search the record with the specified ID */
  eq?: InputMaybe<Scalars['ItemId']['input']>;
  /** Search records with the specified IDs */
  in?: InputMaybe<Array<InputMaybe<Scalars['ItemId']['input']>>>;
  /** Exclude the record with the specified ID */
  neq?: InputMaybe<Scalars['ItemId']['input']>;
  /** Search records that do not have the specified IDs */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['ItemId']['input']>>>;
}

export enum ItemStatus {
  draft = 'draft',
  published = 'published',
  updated = 'updated'
}

/** Specifies how to filter JSON fields */
export interface JsonFilter {
  /** Filter records with the specified field defined (i.e. with any value) or not */
  exists?: InputMaybe<Scalars['BooleanType']['input']>;
}

/** Block of type Landing Page Grid (landing_page_grid) */
export interface LandingPageGridRecord extends RecordInterface {
  __typename: 'LandingPageGridRecord';
  _createdAt: Scalars['DateTime']['output'];
  /** Editing URL */
  _editingUrl: Maybe<Scalars['String']['output']>;
  _firstPublishedAt: Maybe<Scalars['DateTime']['output']>;
  _isValid: Scalars['BooleanType']['output'];
  _modelApiKey: Scalars['String']['output'];
  _publicationScheduledAt: Maybe<Scalars['DateTime']['output']>;
  _publishedAt: Maybe<Scalars['DateTime']['output']>;
  /** Generates SEO and Social card meta tags to be used in your frontend */
  _seoMetaTags: Array<Tag>;
  _status: ItemStatus;
  _unpublishingScheduledAt: Maybe<Scalars['DateTime']['output']>;
  _updatedAt: Scalars['DateTime']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ItemId']['output'];
  landingPages: Array<LandingPageLinkRecord>;
  updatedAt: Scalars['DateTime']['output'];
}


/** Block of type Landing Page Grid (landing_page_grid) */
export interface LandingPageGridRecord_seoMetaTagsArgs {
  locale?: InputMaybe<SiteLocale>;
}

/** Linking fields */
export enum LandingPageLinkModelFieldsReferencingLandingPageModel {
  landingPageLink_landingPage = 'landingPageLink_landingPage'
}

export interface LandingPageLinkModelFilter {
  AND?: InputMaybe<Array<InputMaybe<LandingPageLinkModelFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<LandingPageLinkModelFilter>>>;
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
  landingPage?: InputMaybe<LinkFilter>;
  title?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<UpdatedAtFilter>;
}

export enum LandingPageLinkModelOrderBy {
  _createdAt_ASC = '_createdAt_ASC',
  _createdAt_DESC = '_createdAt_DESC',
  _firstPublishedAt_ASC = '_firstPublishedAt_ASC',
  _firstPublishedAt_DESC = '_firstPublishedAt_DESC',
  _isValid_ASC = '_isValid_ASC',
  _isValid_DESC = '_isValid_DESC',
  _publicationScheduledAt_ASC = '_publicationScheduledAt_ASC',
  _publicationScheduledAt_DESC = '_publicationScheduledAt_DESC',
  _publishedAt_ASC = '_publishedAt_ASC',
  _publishedAt_DESC = '_publishedAt_DESC',
  _status_ASC = '_status_ASC',
  _status_DESC = '_status_DESC',
  _unpublishingScheduledAt_ASC = '_unpublishingScheduledAt_ASC',
  _unpublishingScheduledAt_DESC = '_unpublishingScheduledAt_DESC',
  _updatedAt_ASC = '_updatedAt_ASC',
  _updatedAt_DESC = '_updatedAt_DESC',
  createdAt_ASC = 'createdAt_ASC',
  createdAt_DESC = 'createdAt_DESC',
  id_ASC = 'id_ASC',
  id_DESC = 'id_DESC',
  title_ASC = 'title_ASC',
  title_DESC = 'title_DESC',
  updatedAt_ASC = 'updatedAt_ASC',
  updatedAt_DESC = 'updatedAt_DESC'
}

/** Record of type Landing Page Link (landing_page_link) */
export interface LandingPageLinkRecord extends RecordInterface {
  __typename: 'LandingPageLinkRecord';
  _createdAt: Scalars['DateTime']['output'];
  /** Editing URL */
  _editingUrl: Maybe<Scalars['String']['output']>;
  _firstPublishedAt: Maybe<Scalars['DateTime']['output']>;
  _isValid: Scalars['BooleanType']['output'];
  _modelApiKey: Scalars['String']['output'];
  _publicationScheduledAt: Maybe<Scalars['DateTime']['output']>;
  _publishedAt: Maybe<Scalars['DateTime']['output']>;
  /** Generates SEO and Social card meta tags to be used in your frontend */
  _seoMetaTags: Array<Tag>;
  _status: ItemStatus;
  _unpublishingScheduledAt: Maybe<Scalars['DateTime']['output']>;
  _updatedAt: Scalars['DateTime']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ItemId']['output'];
  landingPage: Maybe<LandingPageRecord>;
  title: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
}


/** Record of type Landing Page Link (landing_page_link) */
export interface LandingPageLinkRecord_seoMetaTagsArgs {
  locale?: InputMaybe<SiteLocale>;
}

export type LandingPageModelContentField = PageCallToActionRecord | PageHeroRecord | PageSectionCatalogRecord | PageSectionRecord;

export interface LandingPageModelFilter {
  AND?: InputMaybe<Array<InputMaybe<LandingPageModelFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<LandingPageModelFilter>>>;
  _createdAt?: InputMaybe<CreatedAtFilter>;
  _firstPublishedAt?: InputMaybe<PublishedAtFilter>;
  _isValid?: InputMaybe<BooleanFilter>;
  _publicationScheduledAt?: InputMaybe<PublishedAtFilter>;
  _publishedAt?: InputMaybe<PublishedAtFilter>;
  _status?: InputMaybe<StatusFilter>;
  _unpublishingScheduledAt?: InputMaybe<PublishedAtFilter>;
  _updatedAt?: InputMaybe<UpdatedAtFilter>;
  category?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<CreatedAtFilter>;
  id?: InputMaybe<ItemIdFilter>;
  internalName?: InputMaybe<StringFilter>;
  seoMetadata?: InputMaybe<SeoFilter>;
  slug?: InputMaybe<SlugFilter>;
  title?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<UpdatedAtFilter>;
}

export enum LandingPageModelOrderBy {
  _createdAt_ASC = '_createdAt_ASC',
  _createdAt_DESC = '_createdAt_DESC',
  _firstPublishedAt_ASC = '_firstPublishedAt_ASC',
  _firstPublishedAt_DESC = '_firstPublishedAt_DESC',
  _isValid_ASC = '_isValid_ASC',
  _isValid_DESC = '_isValid_DESC',
  _publicationScheduledAt_ASC = '_publicationScheduledAt_ASC',
  _publicationScheduledAt_DESC = '_publicationScheduledAt_DESC',
  _publishedAt_ASC = '_publishedAt_ASC',
  _publishedAt_DESC = '_publishedAt_DESC',
  _status_ASC = '_status_ASC',
  _status_DESC = '_status_DESC',
  _unpublishingScheduledAt_ASC = '_unpublishingScheduledAt_ASC',
  _unpublishingScheduledAt_DESC = '_unpublishingScheduledAt_DESC',
  _updatedAt_ASC = '_updatedAt_ASC',
  _updatedAt_DESC = '_updatedAt_DESC',
  category_ASC = 'category_ASC',
  category_DESC = 'category_DESC',
  createdAt_ASC = 'createdAt_ASC',
  createdAt_DESC = 'createdAt_DESC',
  id_ASC = 'id_ASC',
  id_DESC = 'id_DESC',
  internalName_ASC = 'internalName_ASC',
  internalName_DESC = 'internalName_DESC',
  title_ASC = 'title_ASC',
  title_DESC = 'title_DESC',
  updatedAt_ASC = 'updatedAt_ASC',
  updatedAt_DESC = 'updatedAt_DESC'
}

/** Record of type Landing Page (landing_page) */
export interface LandingPageRecord extends RecordInterface {
  __typename: 'LandingPageRecord';
  _allReferencingLandingPageLinks: Array<LandingPageLinkRecord>;
  /** Returns meta information regarding a record collection */
  _allReferencingLandingPageLinksMeta: CollectionMetadata;
  _createdAt: Scalars['DateTime']['output'];
  /** Editing URL */
  _editingUrl: Maybe<Scalars['String']['output']>;
  _firstPublishedAt: Maybe<Scalars['DateTime']['output']>;
  _isValid: Scalars['BooleanType']['output'];
  _modelApiKey: Scalars['String']['output'];
  _publicationScheduledAt: Maybe<Scalars['DateTime']['output']>;
  _publishedAt: Maybe<Scalars['DateTime']['output']>;
  /** Generates SEO and Social card meta tags to be used in your frontend */
  _seoMetaTags: Array<Tag>;
  _status: ItemStatus;
  _unpublishingScheduledAt: Maybe<Scalars['DateTime']['output']>;
  _updatedAt: Scalars['DateTime']['output'];
  category: Maybe<Scalars['String']['output']>;
  categoryMetadata: Array<TradeshowCategoryMetadataModelRecord>;
  content: Array<LandingPageModelContentField>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ItemId']['output'];
  internalName: Maybe<Scalars['String']['output']>;
  seoMetadata: Maybe<SeoField>;
  slug: Maybe<Scalars['String']['output']>;
  title: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
}


/** Record of type Landing Page (landing_page) */
export interface LandingPageRecord_allReferencingLandingPageLinksArgs {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<LandingPageLinkModelFilter>;
  first?: InputMaybe<Scalars['IntType']['input']>;
  locale?: InputMaybe<SiteLocale>;
  orderBy?: InputMaybe<Array<InputMaybe<LandingPageLinkModelOrderBy>>>;
  skip?: InputMaybe<Scalars['IntType']['input']>;
  through?: InputMaybe<InverseRelationshipFilterBetweenLandingPageLinkAndLandingPage>;
}


/** Record of type Landing Page (landing_page) */
export interface LandingPageRecord_allReferencingLandingPageLinksMetaArgs {
  filter?: InputMaybe<LandingPageLinkModelFilter>;
  locale?: InputMaybe<SiteLocale>;
  through?: InputMaybe<InverseRelationshipFilterBetweenLandingPageLinkAndLandingPage>;
}


/** Record of type Landing Page (landing_page) */
export interface LandingPageRecord_seoMetaTagsArgs {
  locale?: InputMaybe<SiteLocale>;
}

/** length unit */
export enum LengthUnit {
  Kilometres = 'Kilometres',
  Miles = 'Miles'
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
export interface LinkFilter {
  /** Search for records with an exact match. The specified value must be a Record ID */
  eq?: InputMaybe<Scalars['ItemId']['input']>;
  /** Filter records with the specified field defined (i.e. with any value) or not */
  exists?: InputMaybe<Scalars['BooleanType']['input']>;
  /** Filter records linked to one of the specified records */
  in?: InputMaybe<Array<InputMaybe<Scalars['ItemId']['input']>>>;
  /** Exclude records with an exact match. The specified value must be a Record ID */
  neq?: InputMaybe<Scalars['ItemId']['input']>;
  /** Filter records not linked to one of the specified records */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['ItemId']['input']>>>;
}

/** Linking locales */
export enum LinkingLocale {
  _nonLocalized = '_nonLocalized',
  en = 'en'
}

/** Specifies how to filter by linking locales */
export interface LinkingLocalesFilter {
  /** Filter linking records that link to current record in at least one of the specified locales */
  anyIn?: InputMaybe<Array<LinkingLocale>>;
  /** Filter linking records that do not link to current record in any of the specified locales */
  notIn?: InputMaybe<Array<LinkingLocale>>;
}

/** Specifies how to filter Multiple-links fields */
export interface LinksFilter {
  /** Filter records linked to all of the specified records. The specified values must be Record IDs */
  allIn?: InputMaybe<Array<InputMaybe<Scalars['ItemId']['input']>>>;
  /** Filter records linked to at least one of the specified records. The specified values must be Record IDs */
  anyIn?: InputMaybe<Array<InputMaybe<Scalars['ItemId']['input']>>>;
  /** Search for records with an exact match. The specified values must be Record IDs */
  eq?: InputMaybe<Array<InputMaybe<Scalars['ItemId']['input']>>>;
  /** Filter records with the specified field defined (i.e. with any value) or not */
  exists?: InputMaybe<Scalars['BooleanType']['input']>;
  /** Filter records not linked to any of the specified records. The specified values must be Record IDs */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['ItemId']['input']>>>;
}

/** A connection to a list of items. */
export interface LocationConnection {
  __typename: 'LocationConnection';
  /** A list of edges. */
  edges: Maybe<Array<LocationEdge>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
}

/** An edge in a connection. */
export interface LocationEdge {
  __typename: 'LocationEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: InventoryByLocations;
}

/** Login result */
export interface LoginResult {
  __typename: 'LoginResult';
  /** The currently logged in customer. */
  customer: Maybe<Customer>;
  /**
   * The result of a login
   * @deprecated Use customer node instead.
   */
  result: Scalars['String']['output'];
}

/** Logo field */
export interface LogoField {
  __typename: 'LogoField';
  /** Store logo image. */
  image: Image;
  /** Logo title. */
  title: Scalars['String']['output'];
}

/** Logout result */
export interface LogoutResult {
  __typename: 'LogoutResult';
  /** The result of a logout */
  result: Scalars['String']['output'];
}

export interface MailingAddress {
  __typename: 'MailingAddress';
  address1: Maybe<Scalars['String']['output']>;
  address2: Maybe<Scalars['String']['output']>;
  city: Maybe<Scalars['String']['output']>;
  company: Maybe<Scalars['String']['output']>;
  country: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  firstName: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  lastName: Maybe<Scalars['String']['output']>;
  latitude: Maybe<Scalars['Float']['output']>;
  longitude: Maybe<Scalars['Float']['output']>;
  membershipId: Maybe<Scalars['String']['output']>;
  name: Maybe<Scalars['String']['output']>;
  organizationId: Maybe<Scalars['String']['output']>;
  phone: Maybe<Scalars['String']['output']>;
  province: Maybe<Scalars['String']['output']>;
  provinceCode: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  zip: Maybe<Scalars['String']['output']>;
}

export interface MailingAddressCreateInput {
  address1?: InputMaybe<Scalars['String']['input']>;
  address2?: InputMaybe<Scalars['String']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  company?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  province?: InputMaybe<Scalars['String']['input']>;
  provinceCode?: InputMaybe<Scalars['String']['input']>;
  zip?: InputMaybe<Scalars['String']['input']>;
}

export interface MailingAddressCreatePayload {
  __typename: 'MailingAddressCreatePayload';
  mailingAddress: Maybe<MailingAddress>;
}

/** Redirect to manually input url. */
export interface ManualRedirect {
  __typename: 'ManualRedirect';
  /** Url. */
  url: Scalars['String']['output'];
}

/** Measurement */
export interface Measurement {
  __typename: 'Measurement';
  /** Unit of measurement. */
  unit: Scalars['String']['output'];
  /** Unformatted weight measurement value. */
  value: Scalars['Float']['output'];
}

export interface Membership {
  __typename: 'Membership';
  createdAt: Scalars['DateTime']['output'];
  designProducts: DesignProductConnection;
  designRequests: DesignRequestConnection;
  flags: MembershipFlags;
  hasDesignProducts: Scalars['Boolean']['output'];
  hasDesignRequests: Scalars['Boolean']['output'];
  hasOrders: Scalars['Boolean']['output'];
  humanizedRole: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  invitedEmail: Maybe<Scalars['String']['output']>;
  notifications: Maybe<NotificationConnection>;
  orders: Maybe<OrderConnection>;
  organization: Organization;
  organizationId: Scalars['String']['output'];
  role: Maybe<MembershipRole>;
  scopes: Array<Scope>;
  unassignedDesignRequests: DesignRequestConnection;
  unseenWebNotificationsCount: Scalars['Int']['output'];
  updatedAt: Maybe<Scalars['DateTime']['output']>;
  user: Maybe<User>;
  userId: Maybe<Scalars['String']['output']>;
}


export interface MembershipdesignProductsArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<MembershipDesignProductsFilterInput>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
}


export interface MembershipdesignRequestsArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<MembershipDesignRequestsFilterInput>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
}


export interface MembershipnotificationsArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
}


export interface MembershipordersArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<MembershipOrdersFilterInput>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
}


export interface MembershipunassignedDesignRequestsArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
}

export interface MembershipConnectAnonymousResourcesPayload {
  __typename: 'MembershipConnectAnonymousResourcesPayload';
  membership: Membership;
}

export interface MembershipDesignProductsFilterInput {
  where?: InputMaybe<MembershipDesignProductsWhereFilterInput>;
}

export interface MembershipDesignProductsWhereFilterInput {
  createdAt?: InputMaybe<DateFilterInput>;
  membershipId?: InputMaybe<StringFilterInput>;
}

export interface MembershipDesignRequestsFilterInput {
  where?: InputMaybe<MembershipDesignRequestsWhereFilterInput>;
}

export interface MembershipDesignRequestsWhereFilterInput {
  artistMembershipId?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateFilterInput>;
  membershipId?: InputMaybe<StringFilterInput>;
  status?: InputMaybe<MembershipDesignRequestsWhereFilterStatusInput>;
}

export interface MembershipDesignRequestsWhereFilterStatusInput {
  equals?: InputMaybe<DesignRequestStatus>;
  in?: InputMaybe<Array<DesignRequestStatus>>;
  notIn?: InputMaybe<Array<DesignRequestStatus>>;
}

export interface MembershipFlags {
  __typename: 'MembershipFlags';
  isBetaTester: Scalars['Boolean']['output'];
}

export interface MembershipInvite {
  __typename: 'MembershipInvite';
  accepted: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  invitedEmail: Maybe<Scalars['String']['output']>;
  membershipId: Scalars['ID']['output'];
  organizationId: Scalars['ID']['output'];
  organizationName: Maybe<Scalars['String']['output']>;
}

export interface MembershipInviteAcceptInput {
  membershipId: Scalars['String']['input'];
}

export interface MembershipInviteAcceptPayload {
  __typename: 'MembershipInviteAcceptPayload';
  membership: Membership;
}

export interface MembershipInviteInput {
  emails: Array<Scalars['String']['input']>;
}

export interface MembershipInvitePayload {
  __typename: 'MembershipInvitePayload';
  memberships: Array<Membership>;
}

export interface MembershipInviteResendInput {
  membershipId: Scalars['String']['input'];
}

export interface MembershipInviteResendPayload {
  __typename: 'MembershipInviteResendPayload';
  membership: Membership;
}

export interface MembershipInviteRevokeInput {
  membershipId: Scalars['String']['input'];
}

export interface MembershipInviteRevokePayload {
  __typename: 'MembershipInviteRevokePayload';
  membership: Membership;
}

export interface MembershipOrdersFilterInput {
  where?: InputMaybe<MembershipOrdersWhereFilterInput>;
}

export interface MembershipOrdersWhereFilterInput {
  createdAt?: InputMaybe<DateFilterInput>;
}

export enum MembershipRole {
  OWNER = 'OWNER',
  STITCHI_ADMIN = 'STITCHI_ADMIN',
  STITCHI_DESIGNER = 'STITCHI_DESIGNER'
}

/** A connection to a list of items. */
export interface MetafieldConnection {
  __typename: 'MetafieldConnection';
  /** A list of edges. */
  edges: Maybe<Array<MetafieldEdge>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
}

/** An edge in a connection. */
export interface MetafieldEdge {
  __typename: 'MetafieldEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: Metafields;
}

/** Key/Value pairs of data attached tied to a resource entity (product, brand, category, etc.) */
export interface Metafields {
  __typename: 'Metafields';
  /** The ID of the metafield when referencing via our backend API. */
  entityId: Scalars['Int']['output'];
  /** The ID of metafield. */
  id: Scalars['ID']['output'];
  /** A label for identifying metafield's data value. */
  key: Scalars['String']['output'];
  /** A metafield's value. */
  value: Scalars['String']['output'];
}

/** A money object - includes currency code and a money amount */
export interface Money {
  __typename: 'Money';
  /** Currency code of the current money. */
  currencyCode: Scalars['String']['output'];
  /**
   * The formatted currency string for the current money.
   * @deprecated Deprecated. Don't use - it will be removed soon.
   */
  formatted: Maybe<Scalars['String']['output']>;
  /** The amount of money. */
  value: Scalars['BigDecimal']['output'];
}

/** A min and max pair of money objects */
export interface MoneyRange {
  __typename: 'MoneyRange';
  /** Maximum money object. */
  max: Money;
  /** Minimum money object. */
  min: Money;
}

/** A multi-line text input field, aka a text box. */
export interface MultiLineTextFieldOption extends CatalogProductOption {
  __typename: 'MultiLineTextFieldOption';
  /** Default value of the multiline text field option. */
  defaultValue: Maybe<Scalars['String']['output']>;
  /** Display name for the option. */
  displayName: Scalars['String']['output'];
  /** Unique ID for the option. */
  entityId: Scalars['Int']['output'];
  /** One of the option values is required to be selected for the checkout. */
  isRequired: Scalars['Boolean']['output'];
  /** Indicates whether it is a variant option or modifier. */
  isVariantOption: Scalars['Boolean']['output'];
  /** The maximum number of characters. */
  maxLength: Maybe<Scalars['Int']['output']>;
  /** The maximum number of lines. */
  maxLines: Maybe<Scalars['Int']['output']>;
  /** The minimum number of characters. */
  minLength: Maybe<Scalars['Int']['output']>;
}

/** Multiline text form field. */
export interface MultilineTextFormField extends FormField {
  __typename: 'MultilineTextFormField';
  /** The default text value for the form field. */
  defaultText: Maybe<Scalars['String']['output']>;
  /** The entity ID of the form field. */
  entityId: Scalars['Int']['output'];
  /** Indicates whether the form field is built-in. */
  isBuiltIn: Scalars['Boolean']['output'];
  /** Indicates whether the form field is required. */
  isRequired: Scalars['Boolean']['output'];
  /** The label to display for the form field. */
  label: Scalars['String']['output'];
  /** The amount of rows for the form field. */
  rows: Scalars['Int']['output'];
  /** The sort order priority of the form field. */
  sortOrder: Scalars['Int']['output'];
}

/** The user input for multiple choice form fields. */
export interface MultipleChoiceFormFieldInput {
  /** The custom form field ID. */
  fieldEntityId: Scalars['Int']['input'];
  /** The custom form field value ID. */
  fieldValueEntityId: Scalars['Int']['input'];
}

/** Multiple choice (includes radio button and pick list) custom form field result. */
export interface MultipleChoiceFormFieldValue extends CustomerFormFieldValue {
  __typename: 'MultipleChoiceFormFieldValue';
  /** Entity ID of a custom form field value on a customer or customer address. */
  entityId: Scalars['Int']['output'];
  /** The name of the form field that the value is for. */
  name: Scalars['String']['output'];
  /** The multiple choice value selected by customer. */
  value: Scalars['String']['output'];
  /** The multiple choice value id selected by customer. */
  valueEntityId: Scalars['Int']['output'];
}

/** An option type that has a fixed list of values. */
export interface MultipleChoiceOption extends CatalogProductOption {
  __typename: 'MultipleChoiceOption';
  /** Display name for the option. */
  displayName: Scalars['String']['output'];
  /** The chosen display style for this multiple choice option. */
  displayStyle: Scalars['String']['output'];
  /** Unique ID for the option. */
  entityId: Scalars['Int']['output'];
  /** One of the option values is required to be selected for the checkout. */
  isRequired: Scalars['Boolean']['output'];
  /** Indicates whether it is a variant option or modifier. */
  isVariantOption: Scalars['Boolean']['output'];
  /** List of option values. */
  values: ProductOptionValueConnection;
}


/** An option type that has a fixed list of values. */
export interface MultipleChoiceOptionvaluesArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
}

/** A simple multiple choice value comprised of an id and a label. */
export interface MultipleChoiceOptionValue extends CatalogProductOptionValue {
  __typename: 'MultipleChoiceOptionValue';
  /** Unique ID for the option value. */
  entityId: Scalars['Int']['output'];
  /** Indicates whether this value is the chosen default selected value. */
  isDefault: Scalars['Boolean']['output'];
  /** Indicates whether this value is selected based on sku/variantEntityId/optionValueIds overlay requested on the product node level. */
  isSelected: Maybe<Scalars['Boolean']['output']>;
  /** Label for the option value. */
  label: Scalars['String']['output'];
}

export interface Mutation {
  __typename: 'Mutation';
  /** The Cart mutations. */
  cart: CartMutations;
  catalogProductCustomize: Maybe<CatalogProductCustomizePayload>;
  catalogProductQuoteCreate: Maybe<CatalogProductQuoteCreatePayload>;
  /** The Checkout mutations. */
  checkout: CheckoutMutations;
  /** The customer mutations. */
  customer: CustomerMutations;
  designProductCreateOrder: Maybe<DesignProductCreateOrderPayload>;
  designProductCreateQuote: Maybe<DesignProductCreateQuotePayload>;
  designRequestApprove: Maybe<DesignRequestApprovePayload>;
  designRequestArchive: Maybe<DesignRequestArchivePayload>;
  designRequestAssign: Maybe<DesignRequestAssignPayload>;
  designRequestConversationMessageCreate: Maybe<DesignRequestConversationMessageCreatePayload>;
  designRequestCreate: Maybe<DesignRequestCreatePayload>;
  designRequestDesignLocationCreate: Maybe<DesignRequestDesignLocationCreatePayload>;
  designRequestDesignLocationDelete: Maybe<DesignRequestDesignLocationDeletePayload>;
  designRequestDesignLocationUpdate: Maybe<DesignRequestDesignLocationUpdatePayload>;
  designRequestProofCreate: Maybe<DesignRequestProofCreatePayload>;
  designRequestReject: Maybe<DesignRequestRejectPayload>;
  designRequestRevisionRequestCreate: Maybe<DesignRequestRevisionRequestCreatePayload>;
  designRequestSubmit: Maybe<DesignRequestSubmitPayload>;
  designRequestUpdate: Maybe<DesignRequestUpdatePayload>;
  fileCreate: Maybe<FileCreatePayload>;
  fileCreateBatch: Maybe<FileCreateBatchPayload>;
  fulfillmentCreate: Maybe<FulfillmentCreatePayload>;
  /** Customer login */
  login: LoginResult;
  /** Customer logout */
  logout: LogoutResult;
  /** Creates a new mailing address for the user */
  mailingAddressCreate: Maybe<MailingAddressCreatePayload>;
  membershipConnectAnonymousResources: Maybe<MembershipConnectAnonymousResourcesPayload>;
  membershipInvite: Maybe<MembershipInvitePayload>;
  membershipInviteAccept: Maybe<MembershipInviteAcceptPayload>;
  membershipInviteResend: Maybe<MembershipInviteResendPayload>;
  membershipInviteRevoke: Maybe<MembershipInviteRevokePayload>;
  notificationMarkAsSeen: Maybe<NotificationMarkAsSeenPayload>;
  /** Confirms an order with a customers details */
  orderConfirm: Maybe<OrderConfirmPayload>;
  /** Updates the (temporary) status of an order */
  orderStatusTemporaryUpdate: Maybe<OrderStatusTemporaryUpdatePayload>;
  organizationBrandColorCreate: Maybe<OrganizationBrandColorCreatePayload>;
  organizationBrandColorDelete: Maybe<OrganizationBrandColorDeletePayload>;
  organizationBrandColorUpdate: Maybe<OrganizationBrandColorUpdatePayload>;
  organizationBrandFileCreateBatch: Maybe<OrganizationBrandFileCreateBatchPayload>;
  organizationBrandFileDeleteBatch: Maybe<OrganizationBrandFileDeleteBatchPayload>;
  organizationUpdate: Maybe<OrganizationUpdatePayload>;
  paymentIntentCreate: Maybe<PaymentIntentCreatePayload>;
  /** Contact us mutation. */
  submitContactUs: SubmitContactUsResult;
  /** Creates a new email subscriber */
  subscriberCreate: Maybe<SubscriberCreatePayload>;
  /** Bootstraps a new user with necessary resources */
  userBoostrap: Maybe<User>;
  userLogout: Maybe<UserLogoutPayload>;
  userOnboardingUpdate: Maybe<UserOnboardingUpdatePayload>;
  userOrganizationCreate: Maybe<UserOrganizationCreatePayload>;
  userSetOrganization: Maybe<UserSetOrganizationPayload>;
  /** The wishlist mutations. */
  wishlist: WishlistMutations;
}


export interface MutationcatalogProductCustomizeArgs {
  input: CatalogProductCustomizeInput;
}


export interface MutationcatalogProductQuoteCreateArgs {
  input: CatalogProductQuoteCreateInput;
}


export interface MutationdesignProductCreateOrderArgs {
  input: DesignProductCreateOrderInput;
}


export interface MutationdesignProductCreateQuoteArgs {
  input: DesignProductCreateQuoteInput;
}


export interface MutationdesignRequestApproveArgs {
  input: DesignRequestApproveInput;
}


export interface MutationdesignRequestArchiveArgs {
  input: DesignRequestArchiveInput;
}


export interface MutationdesignRequestAssignArgs {
  input: DesignRequestAssignInput;
}


export interface MutationdesignRequestConversationMessageCreateArgs {
  input: DesignRequestConversationMessageCreateInput;
}


export interface MutationdesignRequestCreateArgs {
  input: DesignRequestCreateInput;
}


export interface MutationdesignRequestDesignLocationCreateArgs {
  input: DesignRequestDesignLocationCreateInput;
}


export interface MutationdesignRequestDesignLocationDeleteArgs {
  input: DesignRequestDesignLocationDeleteInput;
}


export interface MutationdesignRequestDesignLocationUpdateArgs {
  input: DesignRequestDesignLocationUpdateInput;
}


export interface MutationdesignRequestProofCreateArgs {
  input: DesignRequestProofCreateInput;
}


export interface MutationdesignRequestRejectArgs {
  input: DesignRequestRejectInput;
}


export interface MutationdesignRequestRevisionRequestCreateArgs {
  input: DesignRequestRevisionRequestCreateInput;
}


export interface MutationdesignRequestSubmitArgs {
  input: DesignRequestSubmitInput;
}


export interface MutationdesignRequestUpdateArgs {
  input: DesignRequestUpdateInput;
}


export interface MutationfileCreateArgs {
  input: FileCreateInput;
}


export interface MutationfileCreateBatchArgs {
  input: FileCreateBatchInput;
}


export interface MutationfulfillmentCreateArgs {
  input: FulfillmentCreateInput;
}


export interface MutationloginArgs {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}


export interface MutationmailingAddressCreateArgs {
  input: MailingAddressCreateInput;
}


export interface MutationmembershipInviteArgs {
  input: MembershipInviteInput;
}


export interface MutationmembershipInviteAcceptArgs {
  input: MembershipInviteAcceptInput;
}


export interface MutationmembershipInviteResendArgs {
  input: MembershipInviteResendInput;
}


export interface MutationmembershipInviteRevokeArgs {
  input: MembershipInviteRevokeInput;
}


export interface MutationnotificationMarkAsSeenArgs {
  input: NotificationMarkAsSeenInput;
}


export interface MutationorderConfirmArgs {
  input: OrderConfirmInput;
}


export interface MutationorderStatusTemporaryUpdateArgs {
  input: OrderStatusTemporaryUpdateInput;
}


export interface MutationorganizationBrandColorCreateArgs {
  input: OrganizationBrandColorCreateInput;
}


export interface MutationorganizationBrandColorDeleteArgs {
  input: OrganizationBrandColorDeleteInput;
}


export interface MutationorganizationBrandColorUpdateArgs {
  input: OrganizationBrandColorUpdateInput;
}


export interface MutationorganizationBrandFileCreateBatchArgs {
  input: OrganizationBrandFileCreateBatchInput;
}


export interface MutationorganizationBrandFileDeleteBatchArgs {
  input: OrganizationBrandFileDeleteBatchInput;
}


export interface MutationorganizationUpdateArgs {
  input: OrganizationUpdateInput;
}


export interface MutationpaymentIntentCreateArgs {
  input: PaymentIntentCreateInput;
}


export interface MutationsubmitContactUsArgs {
  input: SubmitContactUsInput;
  reCaptchaV2?: InputMaybe<ReCaptchaV2Input>;
}


export interface MutationsubscriberCreateArgs {
  input: SubscriberCreateInput;
}


export interface MutationuserOnboardingUpdateArgs {
  input: UserOnboardingUpdateInput;
}


export interface MutationuserOrganizationCreateArgs {
  input: UserOrganizationCreateInput;
}


export interface MutationuserSetOrganizationArgs {
  input: UserSetOrganizationInput;
}

export enum MuxThumbnailFormatType {
  gif = 'gif',
  jpg = 'jpg',
  png = 'png'
}

/** An object with an ID */
export interface Node {
  /** The id of the object. */
  id: Scalars['ID']['output'];
}

/** A normal page. */
export interface NormalPage extends Node, WebPage {
  __typename: 'NormalPage';
  /** Unique ID for the web page. */
  entityId: Scalars['Int']['output'];
  /** The body of the page. */
  htmlBody: Scalars['String']['output'];
  /** The ID of an object */
  id: Scalars['ID']['output'];
  /** Whether or not the page should be visible in the navigation menu. */
  isVisibleInNavigation: Scalars['Boolean']['output'];
  /** Page name. */
  name: Scalars['String']['output'];
  /** Unique ID for the parent page. */
  parentEntityId: Maybe<Scalars['Int']['output']>;
  /** The URL path of the page. */
  path: Scalars['String']['output'];
  /** The plain text summary of the page body. */
  plainTextSummary: Scalars['String']['output'];
  /** The rendered regions for the web page. */
  renderedRegions: RenderedRegionsByPageType;
  /** Page SEO details. */
  seo: SeoDetails;
}


/** A normal page. */
export interface NormalPageplainTextSummaryArgs {
  characterLimit?: InputMaybe<Scalars['Int']['input']>;
}

export interface Notification {
  __typename: 'Notification';
  channels: Array<Maybe<NotificationChannel>>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  membershipId: Maybe<Scalars['String']['output']>;
  notificationTopicId: Maybe<Scalars['String']['output']>;
  notificationWorkflowId: Scalars['String']['output'];
  organizationId: Maybe<Scalars['String']['output']>;
  updatedAt: Maybe<Scalars['DateTime']['output']>;
}

export interface NotificationChannel {
  channelType: NotificationChannelType;
  id: Scalars['ID']['output'];
}

export interface NotificationChannelEmail extends NotificationChannel {
  __typename: 'NotificationChannelEmail';
  channelType: NotificationChannelType;
  htmlBody: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  recipientEmail: Scalars['String']['output'];
  recipientName: Maybe<Scalars['String']['output']>;
  subject: Scalars['String']['output'];
  textBody: Maybe<Scalars['String']['output']>;
}

export enum NotificationChannelType {
  EMAIL = 'EMAIL',
  WEB = 'WEB'
}

export interface NotificationChannelWeb extends NotificationChannel {
  __typename: 'NotificationChannelWeb';
  channelType: NotificationChannelType;
  ctaText: Maybe<Scalars['String']['output']>;
  ctaUrl: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  message: Scalars['String']['output'];
  seenAt: Maybe<Scalars['DateTime']['output']>;
}

export interface NotificationConnection {
  __typename: 'NotificationConnection';
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Edge-Types */
  edges: Maybe<Array<Maybe<NotificationEdge>>>;
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-undefined.PageInfo */
  pageInfo: PageInfo;
}

export interface NotificationEdge {
  __typename: 'NotificationEdge';
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Cursor */
  cursor: Maybe<Scalars['String']['output']>;
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Node */
  node: Maybe<Notification>;
}

export interface NotificationMarkAsSeenInput {
  notificationId: Scalars['ID']['input'];
}

export interface NotificationMarkAsSeenPayload {
  __typename: 'NotificationMarkAsSeenPayload';
  notification: Maybe<Notification>;
}

/** A single line text input field that only accepts numbers. */
export interface NumberFieldOption extends CatalogProductOption {
  __typename: 'NumberFieldOption';
  /** Default value of the text field option. */
  defaultValue: Maybe<Scalars['Float']['output']>;
  /** Display name for the option. */
  displayName: Scalars['String']['output'];
  /** Unique ID for the option. */
  entityId: Scalars['Int']['output'];
  /** The top limit of possible numbers. */
  highest: Maybe<Scalars['Float']['output']>;
  /** Allow whole numbers only. */
  isIntegerOnly: Scalars['Boolean']['output'];
  /** One of the option values is required to be selected for the checkout. */
  isRequired: Scalars['Boolean']['output'];
  /** Indicates whether it is a variant option or modifier. */
  isVariantOption: Scalars['Boolean']['output'];
  /** Limit numbers by several options. */
  limitNumberBy: LimitInputBy;
  /** The bottom limit of possible numbers. */
  lowest: Maybe<Scalars['Float']['output']>;
}

/** Number only form field. */
export interface NumberFormField extends FormField {
  __typename: 'NumberFormField';
  /** The default number value for the form field. */
  defaultNumber: Maybe<Scalars['Float']['output']>;
  /** The entity ID of the form field. */
  entityId: Scalars['Int']['output'];
  /** Indicates whether the form field is built-in. */
  isBuiltIn: Scalars['Boolean']['output'];
  /** Indicates whether the form field is required. */
  isRequired: Scalars['Boolean']['output'];
  /** The label to display for the form field. */
  label: Scalars['String']['output'];
  /** The maximum amount of characters that can be entered into text form field. */
  maxLength: Maybe<Scalars['Int']['output']>;
  /** The highest allowed number to be entered in the form field. */
  maxNumber: Maybe<Scalars['Int']['output']>;
  /** The lowest allowed number to be entered in the form field. */
  minNumber: Maybe<Scalars['Int']['output']>;
  /** The sort order priority of the form field. */
  sortOrder: Scalars['Int']['output'];
}

/** The user input for number form fields. */
export interface NumberFormFieldInput {
  /** The custom form field ID. */
  fieldEntityId: Scalars['Int']['input'];
  /** The number input of the number field. */
  number: Scalars['Float']['input'];
}

/** Numbers custom form field value. */
export interface NumberFormFieldValue extends CustomerFormFieldValue {
  __typename: 'NumberFormFieldValue';
  /** Entity ID of a custom form field value on a customer or customer address. */
  entityId: Scalars['Int']['output'];
  /** The name of the form field that the value is for. */
  name: Scalars['String']['output'];
  /** The number value submitted by customer. */
  number: Scalars['Float']['output'];
}

/** Operating day */
export interface OperatingDay {
  __typename: 'OperatingDay';
  /** Closing. */
  closing: Scalars['String']['output'];
  /** Open. */
  open: Scalars['Boolean']['output'];
  /** Opening. */
  opening: Scalars['String']['output'];
}

/** Operating hours */
export interface OperatingHours {
  __typename: 'OperatingHours';
  /** Friday. */
  friday: Maybe<OperatingDay>;
  /** Monday. */
  monday: Maybe<OperatingDay>;
  /** Saturday. */
  saturday: Maybe<OperatingDay>;
  /** Sunday. */
  sunday: Maybe<OperatingDay>;
  /** Thursday. */
  thursday: Maybe<OperatingDay>;
  /** Tuesday. */
  tuesday: Maybe<OperatingDay>;
  /** Wednesday. */
  wednesday: Maybe<OperatingDay>;
}

/** A connection to a list of items. */
export interface OptionConnection {
  __typename: 'OptionConnection';
  /** A list of edges. */
  edges: Maybe<Array<OptionEdge>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
}

/** An edge in a connection. */
export interface OptionEdge {
  __typename: 'OptionEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: ProductOption;
}

/** Behavior of the variant when stock is equal to 0 */
export enum OptionOutOfStockBehavior {
  DO_NOTHING = 'DO_NOTHING',
  HIDE_OPTION = 'HIDE_OPTION',
  LABEL_OPTION = 'LABEL_OPTION'
}

/** A connection to a list of items. */
export interface OptionValueConnection {
  __typename: 'OptionValueConnection';
  /** A list of edges. */
  edges: Maybe<Array<OptionValueEdge>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
}

/** An edge in a connection. */
export interface OptionValueEdge {
  __typename: 'OptionValueEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: ProductOptionValue;
}

/** A variant option value id input object */
export interface OptionValueId {
  /** A variant option id filter */
  optionEntityId: Scalars['Int']['input'];
  /** A variant value id filter. */
  valueEntityId: Scalars['Int']['input'];
}

/** The order. */
export interface Order {
  __typename: 'Order';
  createdAt: Scalars['DateTime']['output'];
  customerEmail: Maybe<Scalars['String']['output']>;
  customerFirstName: Maybe<Scalars['String']['output']>;
  customerLastName: Maybe<Scalars['String']['output']>;
  customerPhone: Maybe<Scalars['String']['output']>;
  designRequestId: Maybe<Scalars['String']['output']>;
  /** Order ID. */
  entityId: Scalars['Int']['output'];
  fulfillments: Array<Fulfillment>;
  humanOrderId: Scalars['String']['output'];
  humanPaymentStatus: Scalars['String']['output'];
  humanStatusTemporary: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  itemSummaries: Array<OrderItemSummary>;
  items: Array<OrderItem>;
  lastPaymentMethod: Maybe<PaymentMethod>;
  membershipId: Maybe<Scalars['String']['output']>;
  organization: Maybe<Organization>;
  organizationId: Maybe<Scalars['String']['output']>;
  owner: Maybe<Membership>;
  paymentIntents: Array<PaymentIntent>;
  paymentStatus: OrderPaymentStatus;
  shippingAddress: Maybe<MailingAddress>;
  shippingAddressId: Maybe<Scalars['String']['output']>;
  statusTemporary: OrderStatusTemporary;
  subtotalPriceCents: Scalars['Int']['output'];
  totalAmountDueCents: Scalars['Int']['output'];
  totalAmountPaidCents: Scalars['Int']['output'];
  totalAmountRefundedCents: Scalars['Int']['output'];
  totalPriceCents: Scalars['Int']['output'];
  totalProcessingFeeCents: Scalars['Int']['output'];
  totalShippingCents: Scalars['Int']['output'];
  totalTaxCents: Scalars['Int']['output'];
  type: OrderType;
  updatedAt: Maybe<Scalars['DateTime']['output']>;
}

export interface OrderConfirmInput {
  customerEmail: Scalars['String']['input'];
  customerFirstName: Scalars['String']['input'];
  customerLastName: Scalars['String']['input'];
  customerPhone: Scalars['String']['input'];
  orderId: Scalars['ID']['input'];
  shippingAddress: OrderConfirmMailingAddressInput;
}

export interface OrderConfirmMailingAddressInput {
  address1?: InputMaybe<Scalars['String']['input']>;
  address2?: InputMaybe<Scalars['String']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  company?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  province?: InputMaybe<Scalars['String']['input']>;
  provinceCode?: InputMaybe<Scalars['String']['input']>;
  zip?: InputMaybe<Scalars['String']['input']>;
}

export interface OrderConfirmPayload {
  __typename: 'OrderConfirmPayload';
  order: Maybe<Order>;
}

export interface OrderConnection {
  __typename: 'OrderConnection';
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Edge-Types */
  edges: Maybe<Array<Maybe<OrderEdge>>>;
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-undefined.PageInfo */
  pageInfo: PageInfo;
}

export interface OrderEdge {
  __typename: 'OrderEdge';
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Cursor */
  cursor: Maybe<Scalars['String']['output']>;
  /** https://facebook.github.io/relay/graphql/connections.htm#sec-Node */
  node: Maybe<Order>;
}

export interface OrderItem {
  __typename: 'OrderItem';
  createdAt: Scalars['DateTime']['output'];
  designId: Maybe<Scalars['String']['output']>;
  designProduct: Maybe<DesignProduct>;
  id: Scalars['ID']['output'];
  orderId: Scalars['String']['output'];
  productId: Maybe<Scalars['String']['output']>;
  productVariantId: Maybe<Scalars['String']['output']>;
  quantity: Scalars['Int']['output'];
  title: Scalars['String']['output'];
  totalPriceCents: Scalars['Int']['output'];
  type: OrderItemType;
  unitPriceCents: Scalars['Int']['output'];
  updatedAt: Maybe<Scalars['DateTime']['output']>;
}

export interface OrderItemSummary {
  __typename: 'OrderItemSummary';
  id: Scalars['ID']['output'];
  quantity: Scalars['Int']['output'];
  title: Scalars['String']['output'];
  totalPriceCents: Scalars['Int']['output'];
}

export enum OrderItemType {
  BIG_COMMERCE_PRODUCT = 'BIG_COMMERCE_PRODUCT',
  CUSTOM = 'CUSTOM'
}

export enum OrderPaymentStatus {
  NOT_PAID = 'NOT_PAID',
  PAID = 'PAID',
  PARTIALLY_PAID = 'PARTIALLY_PAID',
  PARTIALLY_REFUNDED = 'PARTIALLY_REFUNDED',
  REFUNDED = 'REFUNDED'
}

export enum OrderStatusTemporary {
  COMPLETED = 'COMPLETED',
  CONFIRMED = 'CONFIRMED',
  IN_FULFILLMENT = 'IN_FULFILLMENT',
  IN_PRODUCTION = 'IN_PRODUCTION',
  UNCONFIRMED = 'UNCONFIRMED'
}

export interface OrderStatusTemporaryUpdateInput {
  orderId: Scalars['ID']['input'];
  status: OrderStatusTemporary;
}

export interface OrderStatusTemporaryUpdatePayload {
  __typename: 'OrderStatusTemporaryUpdatePayload';
  order: Maybe<Order>;
}

export enum OrderType {
  CART = 'CART',
  CONFIRMED = 'CONFIRMED'
}

export interface Organization {
  __typename: 'Organization';
  brand: Maybe<OrganizationBrand>;
  createdAt: Scalars['DateTime']['output'];
  deletedAt: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  memberships: Array<Membership>;
  name: Maybe<Scalars['String']['output']>;
  role: Maybe<GlobalRole>;
  updatedAt: Scalars['DateTime']['output'];
}

export interface OrganizationBrand {
  __typename: 'OrganizationBrand';
  colors: Array<Color>;
  fileUploadDirectory: Scalars['String']['output'];
  files: FileConnection;
  id: Scalars['ID']['output'];
  organizationId: Scalars['ID']['output'];
}


export interface OrganizationBrandfilesArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
}

export interface OrganizationBrandColorCreateInput {
  cmykC: Scalars['Int']['input'];
  cmykK: Scalars['Int']['input'];
  cmykM: Scalars['Int']['input'];
  cmykY: Scalars['Int']['input'];
  hex: Scalars['String']['input'];
  name: Scalars['String']['input'];
  organizationId: Scalars['ID']['input'];
  pantone?: InputMaybe<Scalars['String']['input']>;
}

export interface OrganizationBrandColorCreatePayload {
  __typename: 'OrganizationBrandColorCreatePayload';
  brand: Maybe<OrganizationBrand>;
  color: Color;
}

export interface OrganizationBrandColorDeleteInput {
  colorId: Scalars['String']['input'];
  organizationId: Scalars['ID']['input'];
}

export interface OrganizationBrandColorDeletePayload {
  __typename: 'OrganizationBrandColorDeletePayload';
  brand: Maybe<OrganizationBrand>;
  color: Color;
}

export interface OrganizationBrandColorUpdateInput {
  cmykC: Scalars['Int']['input'];
  cmykK: Scalars['Int']['input'];
  cmykM: Scalars['Int']['input'];
  cmykY: Scalars['Int']['input'];
  hex: Scalars['String']['input'];
  id: Scalars['String']['input'];
  name: Scalars['String']['input'];
  organizationId: Scalars['ID']['input'];
  pantone?: InputMaybe<Scalars['String']['input']>;
}

export interface OrganizationBrandColorUpdatePayload {
  __typename: 'OrganizationBrandColorUpdatePayload';
  brand: Maybe<OrganizationBrand>;
  color: Color;
}

export interface OrganizationBrandFileCreateBatchFileInput {
  fileId: Scalars['ID']['input'];
}

export interface OrganizationBrandFileCreateBatchInput {
  files: Array<OrganizationBrandFileCreateBatchFileInput>;
  organizationId: Scalars['ID']['input'];
}

export interface OrganizationBrandFileCreateBatchPayload {
  __typename: 'OrganizationBrandFileCreateBatchPayload';
  brand: Maybe<OrganizationBrand>;
  files: Array<File>;
}

export interface OrganizationBrandFileDeleteBatchInput {
  fileIds: Array<Scalars['ID']['input']>;
}

export interface OrganizationBrandFileDeleteBatchPayload {
  __typename: 'OrganizationBrandFileDeleteBatchPayload';
  brand: Maybe<OrganizationBrand>;
  files: Array<File>;
}

export interface OrganizationUpdateInput {
  name?: InputMaybe<Scalars['String']['input']>;
  organizationId: Scalars['ID']['input'];
}

export interface OrganizationUpdatePayload {
  __typename: 'OrganizationUpdatePayload';
  organization: Maybe<Organization>;
}

/** Specifies how to filter by image orientation */
export interface OrientationFilter {
  /** Search uploads with the specified orientation */
  eq?: InputMaybe<UploadOrientation>;
  /** Exclude uploads with the specified orientation */
  neq?: InputMaybe<UploadOrientation>;
}

/** Other Filter */
export interface OtherSearchFilter extends SearchProductFilter {
  __typename: 'OtherSearchFilter';
  /** Indicates whether to display product count next to the filter. */
  displayProductCount: Scalars['Boolean']['output'];
  /** Free shipping filter. */
  freeShipping: Maybe<OtherSearchFilterItem>;
  /** Indicates whether filter is collapsed by default. */
  isCollapsedByDefault: Scalars['Boolean']['output'];
  /** Is Featured filter. */
  isFeatured: Maybe<OtherSearchFilterItem>;
  /** Is In Stock filter. */
  isInStock: Maybe<OtherSearchFilterItem>;
  /** Display name for the filter. */
  name: Scalars['String']['output'];
}

/** Other Filter Item */
export interface OtherSearchFilterItem {
  __typename: 'OtherSearchFilterItem';
  /** Indicates whether this filter is selected. */
  isSelected: Scalars['Boolean']['output'];
  /** Indicates how many products available for this filter. */
  productCount: Scalars['Int']['output'];
}

/** Block of type Page Call To Action (page_call_to_action) */
export interface PageCallToActionRecord extends RecordInterface {
  __typename: 'PageCallToActionRecord';
  _createdAt: Scalars['DateTime']['output'];
  /** Editing URL */
  _editingUrl: Maybe<Scalars['String']['output']>;
  _firstPublishedAt: Maybe<Scalars['DateTime']['output']>;
  _isValid: Scalars['BooleanType']['output'];
  _modelApiKey: Scalars['String']['output'];
  _publicationScheduledAt: Maybe<Scalars['DateTime']['output']>;
  _publishedAt: Maybe<Scalars['DateTime']['output']>;
  /** Generates SEO and Social card meta tags to be used in your frontend */
  _seoMetaTags: Array<Tag>;
  _status: ItemStatus;
  _unpublishingScheduledAt: Maybe<Scalars['DateTime']['output']>;
  _updatedAt: Scalars['DateTime']['output'];
  actions: Array<CallToActionButtonRecord>;
  createdAt: Scalars['DateTime']['output'];
  description: Maybe<Scalars['String']['output']>;
  id: Scalars['ItemId']['output'];
  title: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
}


/** Block of type Page Call To Action (page_call_to_action) */
export interface PageCallToActionRecord_seoMetaTagsArgs {
  locale?: InputMaybe<SiteLocale>;
}


/** Block of type Page Call To Action (page_call_to_action) */
export interface PageCallToActionRecorddescriptionArgs {
  markdown?: InputMaybe<Scalars['Boolean']['input']>;
}

/** A connection to a list of items. */
export interface PageConnection {
  __typename: 'PageConnection';
  /** A list of edges. */
  edges: Maybe<Array<PageEdge>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
}

/** An edge in a connection. */
export interface PageEdge {
  __typename: 'PageEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: WebPage;
}

/** Block of type Page Hero (page_hero) */
export interface PageHeroRecord extends RecordInterface {
  __typename: 'PageHeroRecord';
  _createdAt: Scalars['DateTime']['output'];
  /** Editing URL */
  _editingUrl: Maybe<Scalars['String']['output']>;
  _firstPublishedAt: Maybe<Scalars['DateTime']['output']>;
  _isValid: Scalars['BooleanType']['output'];
  _modelApiKey: Scalars['String']['output'];
  _publicationScheduledAt: Maybe<Scalars['DateTime']['output']>;
  _publishedAt: Maybe<Scalars['DateTime']['output']>;
  /** Generates SEO and Social card meta tags to be used in your frontend */
  _seoMetaTags: Array<Tag>;
  _status: ItemStatus;
  _unpublishingScheduledAt: Maybe<Scalars['DateTime']['output']>;
  _updatedAt: Scalars['DateTime']['output'];
  callToActions: Array<CallToActionButtonRecord>;
  createdAt: Scalars['DateTime']['output'];
  description: Maybe<Scalars['String']['output']>;
  id: Scalars['ItemId']['output'];
  title: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
}


/** Block of type Page Hero (page_hero) */
export interface PageHeroRecord_seoMetaTagsArgs {
  locale?: InputMaybe<SiteLocale>;
}


/** Block of type Page Hero (page_hero) */
export interface PageHeroRecorddescriptionArgs {
  markdown?: InputMaybe<Scalars['Boolean']['input']>;
}

/** Information about pagination in a connection. */
export interface PageInfo {
  __typename: 'PageInfo';
  /** When paginating forwards, the cursor to continue. */
  endCursor: Maybe<Scalars['String']['output']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean']['output'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean']['output'];
  /** When paginating backwards, the cursor to continue. */
  startCursor: Maybe<Scalars['String']['output']>;
}

/** Redirect to a page. */
export interface PageRedirect {
  __typename: 'PageRedirect';
  /** Entity id. */
  entityId: Scalars['Int']['output'];
  /** The ID of an object. */
  id: Scalars['ID']['output'];
  /** Relative destination url. */
  path: Scalars['String']['output'];
}

/** Block of type Page Section - Catalog (page_section_catalog) */
export interface PageSectionCatalogRecord extends RecordInterface {
  __typename: 'PageSectionCatalogRecord';
  _createdAt: Scalars['DateTime']['output'];
  /** Editing URL */
  _editingUrl: Maybe<Scalars['String']['output']>;
  _firstPublishedAt: Maybe<Scalars['DateTime']['output']>;
  _isValid: Scalars['BooleanType']['output'];
  _modelApiKey: Scalars['String']['output'];
  _publicationScheduledAt: Maybe<Scalars['DateTime']['output']>;
  _publishedAt: Maybe<Scalars['DateTime']['output']>;
  /** Generates SEO and Social card meta tags to be used in your frontend */
  _seoMetaTags: Array<Tag>;
  _status: ItemStatus;
  _unpublishingScheduledAt: Maybe<Scalars['DateTime']['output']>;
  _updatedAt: Scalars['DateTime']['output'];
  categories: Array<CatalogCategoryRecord>;
  createdAt: Scalars['DateTime']['output'];
  description: Maybe<Scalars['String']['output']>;
  disableDefaultCategories: Maybe<Scalars['BooleanType']['output']>;
  id: Scalars['ItemId']['output'];
  title: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
}


/** Block of type Page Section - Catalog (page_section_catalog) */
export interface PageSectionCatalogRecord_seoMetaTagsArgs {
  locale?: InputMaybe<SiteLocale>;
}


/** Block of type Page Section - Catalog (page_section_catalog) */
export interface PageSectionCatalogRecorddescriptionArgs {
  markdown?: InputMaybe<Scalars['Boolean']['input']>;
}

export type PageSectionModelContentField = FaqGroupRecord | FeatureGridRecord | LandingPageGridRecord | RichContentRecord;

/** Block of type Page Section (page_section) */
export interface PageSectionRecord extends RecordInterface {
  __typename: 'PageSectionRecord';
  _createdAt: Scalars['DateTime']['output'];
  /** Editing URL */
  _editingUrl: Maybe<Scalars['String']['output']>;
  _firstPublishedAt: Maybe<Scalars['DateTime']['output']>;
  _isValid: Scalars['BooleanType']['output'];
  _modelApiKey: Scalars['String']['output'];
  _publicationScheduledAt: Maybe<Scalars['DateTime']['output']>;
  _publishedAt: Maybe<Scalars['DateTime']['output']>;
  /** Generates SEO and Social card meta tags to be used in your frontend */
  _seoMetaTags: Array<Tag>;
  _status: ItemStatus;
  _unpublishingScheduledAt: Maybe<Scalars['DateTime']['output']>;
  _updatedAt: Scalars['DateTime']['output'];
  content: Array<PageSectionModelContentField>;
  createdAt: Scalars['DateTime']['output'];
  gutter: Maybe<Scalars['String']['output']>;
  id: Scalars['ItemId']['output'];
  image: Maybe<FileField>;
  imageAlignment: Maybe<Scalars['String']['output']>;
  sectionName: Maybe<Scalars['String']['output']>;
  subtitle: Maybe<Scalars['String']['output']>;
  textAlignment: Maybe<Scalars['String']['output']>;
  title: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
}


/** Block of type Page Section (page_section) */
export interface PageSectionRecord_seoMetaTagsArgs {
  locale?: InputMaybe<SiteLocale>;
}


/** Block of type Page Section (page_section) */
export interface PageSectionRecordsubtitleArgs {
  markdown?: InputMaybe<Scalars['Boolean']['input']>;
}


/** Block of type Page Section (page_section) */
export interface PageSectionRecordtitleArgs {
  markdown?: InputMaybe<Scalars['Boolean']['input']>;
}

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
export interface ParentFilter {
  /** Filter records children of the specified record. Value must be a Record ID */
  eq?: InputMaybe<Scalars['ItemId']['input']>;
  /** Filter records with a parent record or not */
  exists?: InputMaybe<Scalars['BooleanType']['input']>;
}

/** Password form field. */
export interface PasswordFormField extends FormField {
  __typename: 'PasswordFormField';
  /** The default text value for the form field. */
  defaultText: Maybe<Scalars['String']['output']>;
  /** The entity ID of the form field. */
  entityId: Scalars['Int']['output'];
  /** Indicates whether the form field is built-in. */
  isBuiltIn: Scalars['Boolean']['output'];
  /** Indicates whether the form field is required. */
  isRequired: Scalars['Boolean']['output'];
  /** The label to display for the form field. */
  label: Scalars['String']['output'];
  /** The maximum amount of characters that can be entered into the form field. */
  maxLength: Maybe<Scalars['Int']['output']>;
  /** The sort order priority of the form field. */
  sortOrder: Scalars['Int']['output'];
}

/** The user input for password form fields. */
export interface PasswordFormFieldInput {
  /** The custom form field ID. */
  fieldEntityId: Scalars['Int']['input'];
  /** Password value. */
  password: Scalars['String']['input'];
}

/** Password custom form field value. */
export interface PasswordFormFieldValue extends CustomerFormFieldValue {
  __typename: 'PasswordFormFieldValue';
  /** Entity ID of a custom form field value on a customer or customer address. */
  entityId: Scalars['Int']['output'];
  /** The name of the form field that the value is for. */
  name: Scalars['String']['output'];
  /** The password text submitted by a customer. */
  password: Scalars['String']['output'];
}

export interface PaymentIntent {
  __typename: 'PaymentIntent';
  amount: Scalars['Int']['output'];
  clientSecret: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
}

export interface PaymentIntentCreateInput {
  orderId: Scalars['String']['input'];
}

export interface PaymentIntentCreatePayload {
  __typename: 'PaymentIntentCreatePayload';
  paymentIntent: Maybe<PaymentIntent>;
}

export interface PaymentMethod {
  __typename: 'PaymentMethod';
  billingDetails: Maybe<PaymentMethodBillingDetails>;
  card: Maybe<PaymentMethodCard>;
  id: Scalars['String']['output'];
  type: Scalars['String']['output'];
}

export interface PaymentMethodBillingDetails {
  __typename: 'PaymentMethodBillingDetails';
  city: Maybe<Scalars['String']['output']>;
  country: Maybe<Scalars['String']['output']>;
  email: Maybe<Scalars['String']['output']>;
  line1: Maybe<Scalars['String']['output']>;
  line2: Maybe<Scalars['String']['output']>;
  name: Maybe<Scalars['String']['output']>;
  phone: Maybe<Scalars['String']['output']>;
  postalCode: Maybe<Scalars['String']['output']>;
  state: Maybe<Scalars['String']['output']>;
}

export interface PaymentMethodCard {
  __typename: 'PaymentMethodCard';
  brand: Maybe<Scalars['String']['output']>;
  expMonth: Maybe<Scalars['Int']['output']>;
  expYear: Maybe<Scalars['Int']['output']>;
  last4: Maybe<Scalars['String']['output']>;
}

/** Pick list form field. Similar to Radio Buttons, but should be rendered as a dropdown select. */
export interface PicklistFormField extends FormField {
  __typename: 'PicklistFormField';
  /** The text to display before a user has made a selection. */
  choosePrefix: Scalars['String']['output'];
  /** The entity ID of the form field. */
  entityId: Scalars['Int']['output'];
  /** Indicates whether the form field is built-in. */
  isBuiltIn: Scalars['Boolean']['output'];
  /** Indicates whether the form field is required. */
  isRequired: Scalars['Boolean']['output'];
  /** The label to display for the form field. */
  label: Scalars['String']['output'];
  /** The options for the form field. */
  options: Array<FormFieldOption>;
  /** The sort order priority of the form field. */
  sortOrder: Scalars['Int']['output'];
}

/** A connection to a list of items. */
export interface PopularBrandConnection {
  __typename: 'PopularBrandConnection';
  /** A list of edges. */
  edges: Maybe<Array<PopularBrandEdge>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
}

/** An edge in a connection. */
export interface PopularBrandEdge {
  __typename: 'PopularBrandEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: PopularBrandType;
}

/** PopularBrandType */
export interface PopularBrandType {
  __typename: 'PopularBrandType';
  /** Brand count */
  count: Scalars['Int']['output'];
  /** Brand id */
  entityId: Scalars['Int']['output'];
  /** Brand name */
  name: Scalars['String']['output'];
  /** Brand URL as a relative path */
  path: Maybe<Scalars['String']['output']>;
}

/** Specifies how to filter by position (sorted and tree-like collections) */
export interface PositionFilter {
  /** Search for records with an exact match */
  eq?: InputMaybe<Scalars['IntType']['input']>;
  /** Filter records with a value that's strictly greater than the one specified */
  gt?: InputMaybe<Scalars['IntType']['input']>;
  /** Filter records with a value that's greater than or equal to the one specified */
  gte?: InputMaybe<Scalars['IntType']['input']>;
  /** Filter records with a value that's less than the one specified */
  lt?: InputMaybe<Scalars['IntType']['input']>;
  /** Filter records with a value that's less or equal than the one specified */
  lte?: InputMaybe<Scalars['IntType']['input']>;
  /** Exclude records with an exact match */
  neq?: InputMaybe<Scalars['IntType']['input']>;
}

/** The min and max range of prices that apply to this product. */
export interface PriceRanges {
  __typename: 'PriceRanges';
  /** Product price min/max range. */
  priceRange: MoneyRange;
  /** Product retail price min/max range. */
  retailPriceRange: Maybe<MoneyRange>;
}

/** Price Filter */
export interface PriceSearchFilter extends SearchProductFilter {
  __typename: 'PriceSearchFilter';
  /** Indicates whether filter is collapsed by default. */
  isCollapsedByDefault: Scalars['Boolean']['output'];
  /** Display name for the filter. */
  name: Scalars['String']['output'];
  /** Selected price filters. */
  selected: Maybe<PriceSearchFilterItem>;
}

/** Search by price range. At least a minPrice or maxPrice must be supplied. */
export interface PriceSearchFilterInput {
  /** Maximum price of the product. */
  maxPrice?: InputMaybe<Scalars['Float']['input']>;
  /** Minimum price of the product. */
  minPrice?: InputMaybe<Scalars['Float']['input']>;
}

/** Price filter range */
export interface PriceSearchFilterItem {
  __typename: 'PriceSearchFilterItem';
  /** Maximum price of the product. */
  maxPrice: Maybe<Scalars['Float']['output']>;
  /** Minimum price of the product. */
  minPrice: Maybe<Scalars['Float']['output']>;
}

/** The various prices that can be set on a product. */
export interface Prices {
  __typename: 'Prices';
  /** Original price of the product. */
  basePrice: Maybe<Money>;
  /** List of bulk pricing tiers applicable to a product or variant. */
  bulkPricing: Array<BulkPricingTier>;
  /** Minimum advertised price of the product. */
  mapPrice: Maybe<Money>;
  /** Calculated price of the product.  Calculated price takes into account basePrice, salePrice, rules (modifier, option, option set) that apply to the product configuration, and customer group discounts.  It represents the in-cart price for a product configuration without bulk pricing rules. */
  price: Money;
  /** Product price min/max range. */
  priceRange: MoneyRange;
  /** Retail price of the product. */
  retailPrice: Maybe<Money>;
  /** Product retail price min/max range. */
  retailPriceRange: Maybe<MoneyRange>;
  /** Sale price of the product. */
  salePrice: Maybe<Money>;
  /** The difference between the retail price (MSRP) and the current price, which can be presented to the shopper as their savings. */
  saved: Maybe<Money>;
}

export interface PrivacyPolicyPageModelContentField {
  __typename: 'PrivacyPolicyPageModelContentField';
  blocks: Array<Scalars['String']['output']>;
  links: Array<Scalars['String']['output']>;
  value: Scalars['JsonField']['output'];
}

/** Record of type Privacy Policy Page (privacy_policy_page) */
export interface PrivacyPolicyPageRecord extends RecordInterface {
  __typename: 'PrivacyPolicyPageRecord';
  _createdAt: Scalars['DateTime']['output'];
  /** Editing URL */
  _editingUrl: Maybe<Scalars['String']['output']>;
  _firstPublishedAt: Maybe<Scalars['DateTime']['output']>;
  _isValid: Scalars['BooleanType']['output'];
  _modelApiKey: Scalars['String']['output'];
  _publicationScheduledAt: Maybe<Scalars['DateTime']['output']>;
  _publishedAt: Maybe<Scalars['DateTime']['output']>;
  /** Generates SEO and Social card meta tags to be used in your frontend */
  _seoMetaTags: Array<Tag>;
  _status: ItemStatus;
  _unpublishingScheduledAt: Maybe<Scalars['DateTime']['output']>;
  _updatedAt: Scalars['DateTime']['output'];
  content: Maybe<PrivacyPolicyPageModelContentField>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ItemId']['output'];
  seoMetadata: Maybe<SeoField>;
  updatedAt: Scalars['DateTime']['output'];
}


/** Record of type Privacy Policy Page (privacy_policy_page) */
export interface PrivacyPolicyPageRecord_seoMetaTagsArgs {
  locale?: InputMaybe<SiteLocale>;
}

/** Product */
export interface Product extends Node {
  __typename: 'Product';
  /** Absolute URL path for adding a product to cart. */
  addToCartUrl: Scalars['String']['output'];
  /**
   * Absolute URL path for adding a product to customer's wishlist.
   * @deprecated Deprecated.
   */
  addToWishlistUrl: Scalars['String']['output'];
  allImages: Array<CatalogProductImage>;
  /**
   * The availability state of the product.
   * @deprecated Use status inside availabilityV2 instead.
   */
  availability: Scalars['String']['output'];
  /**
   * A few words telling the customer how long it will normally take to ship this product, such as 'Usually ships in 24 hours'.
   * @deprecated Use description inside availabilityV2 instead.
   */
  availabilityDescription: Scalars['String']['output'];
  /** The availability state of the product. */
  availabilityV2: ProductAvailability;
  /** Brand associated with the product. */
  brand: Maybe<Brand>;
  /** List of categories associated with the product. */
  categories: CategoryConnection;
  /** Product condition */
  condition: Maybe<ProductConditionType>;
  /**
   * Product creation date
   * @deprecated Alpha version. Do not use in production.
   */
  createdAt: DateTimeExtended;
  /** Custom fields of the product. */
  customFields: CustomFieldConnection;
  /** Default image for a product. */
  defaultImage: Maybe<Image>;
  /** Depth of the product. */
  depth: Maybe<Measurement>;
  /** Description of the product. */
  description: Scalars['String']['output'];
  /** Id of the product. */
  entityId: Scalars['Int']['output'];
  /** Gift wrapping options available for the product. */
  giftWrappingOptions: GiftWrappingConnection;
  /** Global trade item number. */
  gtin: Maybe<Scalars['String']['output']>;
  /** Height of the product. */
  height: Maybe<Measurement>;
  humanizedName: Scalars['String']['output'];
  /** The ID of an object */
  id: Scalars['ID']['output'];
  /** A list of the images for a product. */
  images: ImageConnection;
  /** Inventory information of the product. */
  inventory: ProductInventory;
  /** Maximum purchasable quantity for this product in a single order. */
  maxPurchaseQuantity: Maybe<Scalars['Int']['output']>;
  /** Metafield data related to a product. */
  metafields: MetafieldConnection;
  /** Minimum purchasable quantity for this product in a single order. */
  minPurchaseQuantity: Maybe<Scalars['Int']['output']>;
  /** Manufacturer part number. */
  mpn: Maybe<Scalars['String']['output']>;
  /** Name of the product. */
  name: Scalars['String']['output'];
  /**
   * Product options.
   * @deprecated Use productOptions instead.
   */
  options: OptionConnection;
  /** Relative URL path to product page. */
  path: Scalars['String']['output'];
  /** Description of the product in plain text. */
  plainTextDescription: Scalars['String']['output'];
  /**
   * The minimum and maximum price of this product based on variant pricing and/or modifier price rules.
   * @deprecated Use priceRanges inside prices node instead.
   */
  priceRanges: Maybe<PriceRanges>;
  /** Prices object determined by supplied product ID, variant ID, and selected option IDs. */
  prices: Maybe<Prices>;
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
  showCartAction: Scalars['Boolean']['output'];
  /** Default product variant when no options are selected. */
  sku: Scalars['String']['output'];
  /** Type of product, ex: physical, digital */
  type: Scalars['String']['output'];
  /** Universal product code. */
  upc: Maybe<Scalars['String']['output']>;
  /** Variants associated with the product. */
  variants: VariantConnection;
  /** Warranty information of the product. */
  warranty: Scalars['String']['output'];
  /** Weight of the product. */
  weight: Maybe<Measurement>;
  /** Width of the product. */
  width: Maybe<Measurement>;
}


/** Product */
export interface ProductcategoriesArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
}


/** Product */
export interface ProductcustomFieldsArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  names?: InputMaybe<Array<Scalars['String']['input']>>;
}


/** Product */
export interface ProductgiftWrappingOptionsArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
}


/** Product */
export interface ProductimagesArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
}


/** Product */
export interface ProductmetafieldsArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  keys?: InputMaybe<Array<Scalars['String']['input']>>;
  last?: InputMaybe<Scalars['Int']['input']>;
  namespace: Scalars['String']['input'];
}


/** Product */
export interface ProductoptionsArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
}


/** Product */
export interface ProductplainTextDescriptionArgs {
  characterLimit?: InputMaybe<Scalars['Int']['input']>;
}


/** Product */
export interface ProductpriceRangesArgs {
  includeTax?: InputMaybe<Scalars['Boolean']['input']>;
}


/** Product */
export interface ProductpricesArgs {
  currencyCode?: InputMaybe<currencyCode>;
  includeTax?: InputMaybe<Scalars['Boolean']['input']>;
}


/** Product */
export interface ProductproductOptionsArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
}


/** Product */
export interface ProductrelatedProductsArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  hideOutOfStock?: InputMaybe<Scalars['Boolean']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
}


/** Product */
export interface ProductreviewsArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  filters?: InputMaybe<ProductReviewsFiltersInput>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<ProductReviewsSortInput>;
}


/** Product */
export interface ProductvariantsArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  entityIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  first?: InputMaybe<Scalars['Int']['input']>;
  isPurchasable?: InputMaybe<Scalars['Boolean']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  optionValueIds?: InputMaybe<Array<OptionValueId>>;
  skus?: InputMaybe<Array<Scalars['String']['input']>>;
}

/** Product Attribute Filter */
export interface ProductAttributeSearchFilter extends SearchProductFilter {
  __typename: 'ProductAttributeSearchFilter';
  /** List of available product attributes. */
  attributes: ProductAttributeSearchFilterItemConnection;
  /** Indicates whether to display product count next to the filter. */
  displayProductCount: Scalars['Boolean']['output'];
  /** Filter name for building filter URLs */
  filterName: Scalars['String']['output'];
  /** Indicates whether filter is collapsed by default. */
  isCollapsedByDefault: Scalars['Boolean']['output'];
  /** Display name for the filter. */
  name: Scalars['String']['output'];
}


/** Product Attribute Filter */
export interface ProductAttributeSearchFilterattributesArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
}

/** Filter by the attributes of products such as Product Options and Product Custom Fields. This filter will do nothing unless your store has the Product Filtering feature available on your plan and enabled. If it is supplied when your store does not have the feature enabled, it will be silently ignored. */
export interface ProductAttributeSearchFilterInput {
  /** Product attributes */
  attribute: Scalars['String']['input'];
  /** Product attribute values */
  values: Array<Scalars['String']['input']>;
}

/** Specific product attribute filter item */
export interface ProductAttributeSearchFilterItem {
  __typename: 'ProductAttributeSearchFilterItem';
  /** Indicates whether product attribute is selected. */
  isSelected: Scalars['Boolean']['output'];
  /** Indicates how many products available for this filter. */
  productCount: Scalars['Int']['output'];
  /** Product attribute value. */
  value: Scalars['String']['output'];
}

/** A connection to a list of items. */
export interface ProductAttributeSearchFilterItemConnection {
  __typename: 'ProductAttributeSearchFilterItemConnection';
  /** A list of edges. */
  edges: Maybe<Array<ProductAttributeSearchFilterItemEdge>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
}

/** An edge in a connection. */
export interface ProductAttributeSearchFilterItemEdge {
  __typename: 'ProductAttributeSearchFilterItemEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: ProductAttributeSearchFilterItem;
}

/** Product availability */
export interface ProductAvailability {
  /** A few words telling the customer how long it will normally take to ship this product, such as 'Usually ships in 24 hours'. */
  description: Scalars['String']['output'];
  /** The availability state of the product. */
  status: ProductAvailabilityStatus;
}

/** Product availability status */
export enum ProductAvailabilityStatus {
  Available = 'Available',
  Preorder = 'Preorder',
  Unavailable = 'Unavailable'
}

/** Available Product */
export interface ProductAvailable extends ProductAvailability {
  __typename: 'ProductAvailable';
  /** A few words telling the customer how long it will normally take to ship this product, such as 'Usually ships in 24 hours'. */
  description: Scalars['String']['output'];
  /** The availability state of the product. */
  status: ProductAvailabilityStatus;
}

/** Product condition */
export enum ProductConditionType {
  NEW = 'NEW',
  REFURBISHED = 'REFURBISHED',
  USED = 'USED'
}

/** A connection to a list of items. */
export interface ProductConnection {
  __typename: 'ProductConnection';
  /** Collection info */
  collectionInfo: Maybe<CollectionInfo>;
  /** A list of edges. */
  edges: Maybe<Array<ProductEdge>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
}

/** Record of type Product Discovery Page (product_discovery_page) */
export interface ProductDiscoveryPageRecord extends RecordInterface {
  __typename: 'ProductDiscoveryPageRecord';
  _createdAt: Scalars['DateTime']['output'];
  /** Editing URL */
  _editingUrl: Maybe<Scalars['String']['output']>;
  _firstPublishedAt: Maybe<Scalars['DateTime']['output']>;
  _isValid: Scalars['BooleanType']['output'];
  _modelApiKey: Scalars['String']['output'];
  _publicationScheduledAt: Maybe<Scalars['DateTime']['output']>;
  _publishedAt: Maybe<Scalars['DateTime']['output']>;
  /** Generates SEO and Social card meta tags to be used in your frontend */
  _seoMetaTags: Array<Tag>;
  _status: ItemStatus;
  _unpublishingScheduledAt: Maybe<Scalars['DateTime']['output']>;
  _updatedAt: Scalars['DateTime']['output'];
  createdAt: Scalars['DateTime']['output'];
  featuredCategories: Array<CatalogCategoryRecord>;
  featuredCollections: Array<CatalogCategoryRecord>;
  id: Scalars['ItemId']['output'];
  updatedAt: Scalars['DateTime']['output'];
}


/** Record of type Product Discovery Page (product_discovery_page) */
export interface ProductDiscoveryPageRecord_seoMetaTagsArgs {
  locale?: InputMaybe<SiteLocale>;
}

/** An edge in a connection. */
export interface ProductEdge {
  __typename: 'ProductEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: Product;
}

/** Product Inventory Information */
export interface ProductInventory {
  __typename: 'ProductInventory';
  /** Aggregated product inventory information. This data may not be available if not set or if the store's Inventory Settings have disabled displaying stock levels on the storefront. */
  aggregated: Maybe<AggregatedInventory>;
  /** Indicates whether this product's inventory is being tracked on variant level. If true, you may wish to check the variants node to understand the true inventory of each individual variant, rather than relying on this product-level aggregate to understand how many items may be added to cart. */
  hasVariantInventory: Scalars['Boolean']['output'];
  /** Indicates whether this product is in stock. */
  isInStock: Scalars['Boolean']['output'];
}

export interface ProductKey {
  entityId: Scalars['ID']['input'];
  id: Scalars['ID']['input'];
  name: Scalars['ID']['input'];
}

/** Product Option */
export interface ProductOption {
  __typename: 'ProductOption';
  /** Display name for the option. */
  displayName: Scalars['String']['output'];
  /** Unique ID for the option. */
  entityId: Scalars['Int']['output'];
  /** One of the option values is required to be selected for the checkout. */
  isRequired: Scalars['Boolean']['output'];
  /** Option values. */
  values: OptionValueConnection;
}


/** Product Option */
export interface ProductOptionvaluesArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
}

/** A connection to a list of items. */
export interface ProductOptionConnection {
  __typename: 'ProductOptionConnection';
  /** A list of edges. */
  edges: Maybe<Array<ProductOptionEdge>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
}

/** An edge in a connection. */
export interface ProductOptionEdge {
  __typename: 'ProductOptionEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: CatalogProductOption;
}

/** Product Option Value */
export interface ProductOptionValue {
  __typename: 'ProductOptionValue';
  /** Unique ID for the option value. */
  entityId: Scalars['Int']['output'];
  /** Label for the option value. */
  label: Scalars['String']['output'];
}

/** A connection to a list of items. */
export interface ProductOptionValueConnection {
  __typename: 'ProductOptionValueConnection';
  /** A list of edges. */
  edges: Maybe<Array<ProductOptionValueEdge>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
}

/** An edge in a connection. */
export interface ProductOptionValueEdge {
  __typename: 'ProductOptionValueEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: CatalogProductOptionValue;
}

/** Behavior of the product when stock is equal to 0 */
export enum ProductOutOfStockBehavior {
  DO_NOTHING = 'DO_NOTHING',
  HIDE_PRODUCT = 'HIDE_PRODUCT',
  HIDE_PRODUCT_AND_ACCESSIBLE = 'HIDE_PRODUCT_AND_ACCESSIBLE',
  HIDE_PRODUCT_AND_REDIRECT = 'HIDE_PRODUCT_AND_REDIRECT'
}

/** A Product PickList Value - a product to be mapped to the base product if selected. */
export interface ProductPickListOptionValue extends CatalogProductOptionValue {
  __typename: 'ProductPickListOptionValue';
  /** Default image for a pick list product. */
  defaultImage: Maybe<Image>;
  /** Unique ID for the option value. */
  entityId: Scalars['Int']['output'];
  /** Indicates whether this value is the chosen default selected value. */
  isDefault: Scalars['Boolean']['output'];
  /** Indicates whether this value is selected based on sku/variantEntityId/optionValueIds overlay requested on the product node level. */
  isSelected: Maybe<Scalars['Boolean']['output']>;
  /** Label for the option value. */
  label: Scalars['String']['output'];
  /** The ID of the product associated with this option value. */
  productId: Scalars['Int']['output'];
}

/** PreOrder Product */
export interface ProductPreOrder extends ProductAvailability {
  __typename: 'ProductPreOrder';
  /** A few words telling the customer how long it will normally take to ship this product, such as 'Usually ships in 24 hours'. */
  description: Scalars['String']['output'];
  /** The message to be shown in the store when a product is put into the pre-order availability state, e.g. "Expected release date is %%DATE%%" */
  message: Maybe<Scalars['String']['output']>;
  /** The availability state of the product. */
  status: ProductAvailabilityStatus;
  /** Product release date */
  willBeReleasedAt: Maybe<DateTimeExtended>;
}

export interface ProductPriceMetadata {
  __typename: 'ProductPriceMetadata';
  maxPriceCents: Scalars['Int']['output'];
  minPriceCents: Scalars['Int']['output'];
}

/** Redirect to a product. */
export interface ProductRedirect {
  __typename: 'ProductRedirect';
  /** Entity id. */
  entityId: Scalars['Int']['output'];
  /** The ID of an object. */
  id: Scalars['ID']['output'];
  /** Relative destination url. */
  path: Scalars['String']['output'];
}

/** Product reviews filters. */
export interface ProductReviewsFiltersInput {
  /** Product reviews filter by rating. */
  rating?: InputMaybe<ProductReviewsRatingFilterInput>;
}

/** Product reviews filter by rating. */
export interface ProductReviewsRatingFilterInput {
  /** Maximum rating of the product. */
  maxRating?: InputMaybe<Scalars['Int']['input']>;
  /** Minimum rating of the product. */
  minRating?: InputMaybe<Scalars['Int']['input']>;
}

/** Product reviews sorting. */
export enum ProductReviewsSortInput {
  HIGHEST_RATING = 'HIGHEST_RATING',
  LOWEST_RATING = 'LOWEST_RATING',
  NEWEST = 'NEWEST',
  OLDEST = 'OLDEST'
}

/** Unavailable Product */
export interface ProductUnavailable extends ProductAvailability {
  __typename: 'ProductUnavailable';
  /** A few words telling the customer how long it will normally take to ship this product, such as 'Usually ships in 24 hours'. */
  description: Scalars['String']['output'];
  /** The message to be shown in the store when "Call for pricing" is enabled for this product, e.g. "Contact us at 555-5555" */
  message: Maybe<Scalars['String']['output']>;
  /** The availability state of the product. */
  status: ProductAvailabilityStatus;
}

/** Public Wishlist */
export interface PublicWishlist {
  __typename: 'PublicWishlist';
  /** The wishlist id. */
  entityId: Scalars['Int']['output'];
  /** A list of the wishlist items */
  items: WishlistItemConnection;
  /** The wishlist name. */
  name: Scalars['String']['output'];
  /** The wishlist token. */
  token: Scalars['String']['output'];
}


/** Public Wishlist */
export interface PublicWishlistitemsArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  hideOutOfStock?: InputMaybe<Scalars['Boolean']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
}

/** Specifies how to filter by publication datetime */
export interface PublishedAtFilter {
  /** Filter records with a value that's within the specified minute range. Seconds and milliseconds are truncated from the argument. */
  eq?: InputMaybe<Scalars['DateTime']['input']>;
  /** Filter records with the specified field defined (i.e. with any value) or not */
  exists?: InputMaybe<Scalars['BooleanType']['input']>;
  /** Filter records with a value that's strictly greater than the one specified. Seconds and milliseconds are truncated from the argument. */
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** Filter records with a value that's greater than or equal to than the one specified. Seconds and milliseconds are truncated from the argument. */
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Filter records with a value that's less than the one specified. Seconds and milliseconds are truncated from the argument. */
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** Filter records with a value that's less or equal than the one specified. Seconds and milliseconds are truncated from the argument. */
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Filter records with a value that's outside the specified minute range. Seconds and milliseconds are truncated from the argument. */
  neq?: InputMaybe<Scalars['DateTime']['input']>;
}

export interface Query {
  __typename: 'Query';
  /** Returns meta information regarding a record collection */
  _allArticlesMeta: CollectionMetadata;
  /** Returns meta information regarding a record collection */
  _allAuthorsMeta: CollectionMetadata;
  /** Returns meta information regarding a record collection */
  _allCategoriesMeta: CollectionMetadata;
  /** Returns meta information regarding a record collection */
  _allCustomComponentsMeta: CollectionMetadata;
  /** Returns meta information regarding a record collection */
  _allDesignCategoriesMeta: CollectionMetadata;
  /** Returns meta information regarding a record collection */
  _allDesignsMeta: CollectionMetadata;
  /** Returns meta information regarding a record collection */
  _allGlossaryCategoriesMeta: CollectionMetadata;
  /** Returns meta information regarding a record collection */
  _allGlossaryEntriesMeta: CollectionMetadata;
  /** Returns meta information regarding a record collection */
  _allLandingPageLinksMeta: CollectionMetadata;
  /** Returns meta information regarding a record collection */
  _allLandingPagesMeta: CollectionMetadata;
  /** Returns meta information regarding a record collection */
  _allTablesMeta: CollectionMetadata;
  /** Returns meta information regarding an assets collection */
  _allUploadsMeta: CollectionMetadata;
  _products: Maybe<Array<Maybe<Product>>>;
  /** Returns the single instance record */
  _site: Site;
  /** Returns a collection of records */
  allArticles: Array<ArticleRecord>;
  /** Returns a collection of records */
  allAuthors: Array<AuthorRecord>;
  /** Returns a collection of records */
  allCategories: Array<CategoryRecord>;
  /** Returns a collection of records */
  allCustomComponents: Array<CustomComponentRecord>;
  /** Returns a collection of records */
  allDesignCategories: Array<DesignCategoryRecord>;
  /** Returns a collection of records */
  allDesigns: Array<DesignRecord>;
  /** Returns a collection of records */
  allGlossaryCategories: Array<GlossaryCategoryRecord>;
  /** Returns a collection of records */
  allGlossaryEntries: Array<GlossaryEntryRecord>;
  /** Returns a collection of records */
  allLandingPageLinks: Array<LandingPageLinkRecord>;
  /** Returns a collection of records */
  allLandingPages: Array<LandingPageRecord>;
  /** Returns a collection of records */
  allTables: Array<TableRecord>;
  /** Returns a collection of assets */
  allUploads: Array<FileField>;
  /** Returns a specific record */
  article: Maybe<ArticleRecord>;
  /** Returns a specific record */
  author: Maybe<AuthorRecord>;
  /** Returns the single instance record */
  blogIndexPage: Maybe<BlogIndexPageRecord>;
  /** Returns a specific record */
  category: Maybe<CategoryRecord>;
  /** The current channel. */
  channel: Channel;
  /** Returns a specific record */
  customComponent: Maybe<CustomComponentRecord>;
  /** The currently logged in customer. */
  customer: Maybe<Customer>;
  /** Returns a specific record */
  design: Maybe<DesignRecord>;
  /** Returns a specific record */
  designCategory: Maybe<DesignCategoryRecord>;
  designProduct: Maybe<DesignProduct>;
  designProof: Maybe<DesignProof>;
  designRequest: Maybe<DesignRequest>;
  /** Returns the single instance record */
  featureIndexPage: Maybe<FeatureIndexPageRecord>;
  /** Returns a specific record */
  glossaryCategory: Maybe<GlossaryCategoryRecord>;
  /** Returns a specific record */
  glossaryEntry: Maybe<GlossaryEntryRecord>;
  /** Returns the single instance record */
  glossaryIndexPage: Maybe<GlossaryIndexPageRecord>;
  /** Returns the single instance record */
  homepage: Maybe<HomepageRecord>;
  /** An inventory */
  inventory: Inventory;
  /** Returns a specific record */
  landingPage: Maybe<LandingPageRecord>;
  /** Returns a specific record */
  landingPageLink: Maybe<LandingPageLinkRecord>;
  membershipInvite: MembershipInvite;
  /** Fetches an object given its ID */
  node: Maybe<Node>;
  order: Maybe<Order>;
  /** Returns the single instance record */
  privacyPolicyPage: Maybe<PrivacyPolicyPageRecord>;
  /** Returns the single instance record */
  productDiscoveryPage: Maybe<ProductDiscoveryPageRecord>;
  /** A site */
  site: Site;
  /** Returns a specific record */
  table: Maybe<TableRecord>;
  /** Returns the single instance record */
  termsOfUsePage: Maybe<TermsOfUsePageRecord>;
  /** Returns a specific asset */
  upload: Maybe<FileField>;
  userMemberships: Array<Membership>;
  viewer: Maybe<Membership>;
}


export interface Query_allArticlesMetaArgs {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<ArticleModelFilter>;
  locale?: InputMaybe<SiteLocale>;
}


export interface Query_allAuthorsMetaArgs {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<AuthorModelFilter>;
  locale?: InputMaybe<SiteLocale>;
}


export interface Query_allCategoriesMetaArgs {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<CategoryModelFilter>;
  locale?: InputMaybe<SiteLocale>;
}


export interface Query_allCustomComponentsMetaArgs {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<CustomComponentModelFilter>;
  locale?: InputMaybe<SiteLocale>;
}


export interface Query_allDesignCategoriesMetaArgs {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<DesignCategoryModelFilter>;
  locale?: InputMaybe<SiteLocale>;
}


export interface Query_allDesignsMetaArgs {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<DesignModelFilter>;
  locale?: InputMaybe<SiteLocale>;
}


export interface Query_allGlossaryCategoriesMetaArgs {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<GlossaryCategoryModelFilter>;
  locale?: InputMaybe<SiteLocale>;
}


export interface Query_allGlossaryEntriesMetaArgs {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<GlossaryEntryModelFilter>;
  locale?: InputMaybe<SiteLocale>;
}


export interface Query_allLandingPageLinksMetaArgs {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<LandingPageLinkModelFilter>;
  locale?: InputMaybe<SiteLocale>;
}


export interface Query_allLandingPagesMetaArgs {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<LandingPageModelFilter>;
  locale?: InputMaybe<SiteLocale>;
}


export interface Query_allTablesMetaArgs {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<TableModelFilter>;
  locale?: InputMaybe<SiteLocale>;
}


export interface Query_allUploadsMetaArgs {
  filter?: InputMaybe<UploadFilter>;
  locale?: InputMaybe<SiteLocale>;
}


export interface Query_productsArgs {
  products: Array<ProductKey>;
}


export interface Query_siteArgs {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
}


export interface QueryallArticlesArgs {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<ArticleModelFilter>;
  first?: InputMaybe<Scalars['IntType']['input']>;
  locale?: InputMaybe<SiteLocale>;
  orderBy?: InputMaybe<Array<InputMaybe<ArticleModelOrderBy>>>;
  skip?: InputMaybe<Scalars['IntType']['input']>;
}


export interface QueryallAuthorsArgs {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<AuthorModelFilter>;
  first?: InputMaybe<Scalars['IntType']['input']>;
  locale?: InputMaybe<SiteLocale>;
  orderBy?: InputMaybe<Array<InputMaybe<AuthorModelOrderBy>>>;
  skip?: InputMaybe<Scalars['IntType']['input']>;
}


export interface QueryallCategoriesArgs {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<CategoryModelFilter>;
  first?: InputMaybe<Scalars['IntType']['input']>;
  locale?: InputMaybe<SiteLocale>;
  orderBy?: InputMaybe<Array<InputMaybe<CategoryModelOrderBy>>>;
  skip?: InputMaybe<Scalars['IntType']['input']>;
}


export interface QueryallCustomComponentsArgs {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<CustomComponentModelFilter>;
  first?: InputMaybe<Scalars['IntType']['input']>;
  locale?: InputMaybe<SiteLocale>;
  orderBy?: InputMaybe<Array<InputMaybe<CustomComponentModelOrderBy>>>;
  skip?: InputMaybe<Scalars['IntType']['input']>;
}


export interface QueryallDesignCategoriesArgs {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<DesignCategoryModelFilter>;
  first?: InputMaybe<Scalars['IntType']['input']>;
  locale?: InputMaybe<SiteLocale>;
  orderBy?: InputMaybe<Array<InputMaybe<DesignCategoryModelOrderBy>>>;
  skip?: InputMaybe<Scalars['IntType']['input']>;
}


export interface QueryallDesignsArgs {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<DesignModelFilter>;
  first?: InputMaybe<Scalars['IntType']['input']>;
  locale?: InputMaybe<SiteLocale>;
  orderBy?: InputMaybe<Array<InputMaybe<DesignModelOrderBy>>>;
  skip?: InputMaybe<Scalars['IntType']['input']>;
}


export interface QueryallGlossaryCategoriesArgs {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<GlossaryCategoryModelFilter>;
  first?: InputMaybe<Scalars['IntType']['input']>;
  locale?: InputMaybe<SiteLocale>;
  orderBy?: InputMaybe<Array<InputMaybe<GlossaryCategoryModelOrderBy>>>;
  skip?: InputMaybe<Scalars['IntType']['input']>;
}


export interface QueryallGlossaryEntriesArgs {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<GlossaryEntryModelFilter>;
  first?: InputMaybe<Scalars['IntType']['input']>;
  locale?: InputMaybe<SiteLocale>;
  orderBy?: InputMaybe<Array<InputMaybe<GlossaryEntryModelOrderBy>>>;
  skip?: InputMaybe<Scalars['IntType']['input']>;
}


export interface QueryallLandingPageLinksArgs {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<LandingPageLinkModelFilter>;
  first?: InputMaybe<Scalars['IntType']['input']>;
  locale?: InputMaybe<SiteLocale>;
  orderBy?: InputMaybe<Array<InputMaybe<LandingPageLinkModelOrderBy>>>;
  skip?: InputMaybe<Scalars['IntType']['input']>;
}


export interface QueryallLandingPagesArgs {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<LandingPageModelFilter>;
  first?: InputMaybe<Scalars['IntType']['input']>;
  locale?: InputMaybe<SiteLocale>;
  orderBy?: InputMaybe<Array<InputMaybe<LandingPageModelOrderBy>>>;
  skip?: InputMaybe<Scalars['IntType']['input']>;
}


export interface QueryallTablesArgs {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<TableModelFilter>;
  first?: InputMaybe<Scalars['IntType']['input']>;
  locale?: InputMaybe<SiteLocale>;
  orderBy?: InputMaybe<Array<InputMaybe<TableModelOrderBy>>>;
  skip?: InputMaybe<Scalars['IntType']['input']>;
}


export interface QueryallUploadsArgs {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<UploadFilter>;
  first?: InputMaybe<Scalars['IntType']['input']>;
  locale?: InputMaybe<SiteLocale>;
  orderBy?: InputMaybe<Array<InputMaybe<UploadOrderBy>>>;
  skip?: InputMaybe<Scalars['IntType']['input']>;
}


export interface QueryarticleArgs {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<ArticleModelFilter>;
  locale?: InputMaybe<SiteLocale>;
  orderBy?: InputMaybe<Array<InputMaybe<ArticleModelOrderBy>>>;
}


export interface QueryauthorArgs {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<AuthorModelFilter>;
  locale?: InputMaybe<SiteLocale>;
  orderBy?: InputMaybe<Array<InputMaybe<AuthorModelOrderBy>>>;
}


export interface QueryblogIndexPageArgs {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
}


export interface QuerycategoryArgs {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<CategoryModelFilter>;
  locale?: InputMaybe<SiteLocale>;
  orderBy?: InputMaybe<Array<InputMaybe<CategoryModelOrderBy>>>;
}


export interface QuerycustomComponentArgs {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<CustomComponentModelFilter>;
  locale?: InputMaybe<SiteLocale>;
  orderBy?: InputMaybe<Array<InputMaybe<CustomComponentModelOrderBy>>>;
}


export interface QuerydesignArgs {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<DesignModelFilter>;
  locale?: InputMaybe<SiteLocale>;
  orderBy?: InputMaybe<Array<InputMaybe<DesignModelOrderBy>>>;
}


export interface QuerydesignCategoryArgs {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<DesignCategoryModelFilter>;
  locale?: InputMaybe<SiteLocale>;
  orderBy?: InputMaybe<Array<InputMaybe<DesignCategoryModelOrderBy>>>;
}


export interface QuerydesignProductArgs {
  id: Scalars['ID']['input'];
}


export interface QuerydesignProofArgs {
  id: Scalars['ID']['input'];
}


export interface QuerydesignRequestArgs {
  id: Scalars['ID']['input'];
}


export interface QueryfeatureIndexPageArgs {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
}


export interface QueryglossaryCategoryArgs {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<GlossaryCategoryModelFilter>;
  locale?: InputMaybe<SiteLocale>;
  orderBy?: InputMaybe<Array<InputMaybe<GlossaryCategoryModelOrderBy>>>;
}


export interface QueryglossaryEntryArgs {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<GlossaryEntryModelFilter>;
  locale?: InputMaybe<SiteLocale>;
  orderBy?: InputMaybe<Array<InputMaybe<GlossaryEntryModelOrderBy>>>;
}


export interface QueryglossaryIndexPageArgs {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
}


export interface QueryhomepageArgs {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
}


export interface QuerylandingPageArgs {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<LandingPageModelFilter>;
  locale?: InputMaybe<SiteLocale>;
  orderBy?: InputMaybe<Array<InputMaybe<LandingPageModelOrderBy>>>;
}


export interface QuerylandingPageLinkArgs {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<LandingPageLinkModelFilter>;
  locale?: InputMaybe<SiteLocale>;
  orderBy?: InputMaybe<Array<InputMaybe<LandingPageLinkModelOrderBy>>>;
}


export interface QuerymembershipInviteArgs {
  id: Scalars['ID']['input'];
}


export interface QuerynodeArgs {
  id: Scalars['ID']['input'];
}


export interface QueryorderArgs {
  id: Scalars['ID']['input'];
}


export interface QueryprivacyPolicyPageArgs {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
}


export interface QueryproductDiscoveryPageArgs {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
}


export interface QuerytableArgs {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<TableModelFilter>;
  locale?: InputMaybe<SiteLocale>;
  orderBy?: InputMaybe<Array<InputMaybe<TableModelOrderBy>>>;
}


export interface QuerytermsOfUsePageArgs {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
}


export interface QueryuploadArgs {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<UploadFilter>;
  locale?: InputMaybe<SiteLocale>;
  orderBy?: InputMaybe<Array<InputMaybe<UploadOrderBy>>>;
}

export interface Quote {
  __typename: 'Quote';
  id: Scalars['ID']['output'];
  /** The cost of the product with shipping, taxes, and other. */
  productTotalCostCents: Scalars['Int']['output'];
  /** The cost of the product without shipping, taxes, or other. */
  productUnitCostCents: Scalars['Int']['output'];
}

export interface QuoteGeneratePrintLocationInput {
  colorCount: Scalars['Int']['input'];
}

/** Radio buttons form field. */
export interface RadioButtonsFormField extends FormField {
  __typename: 'RadioButtonsFormField';
  /** The entity ID of the form field. */
  entityId: Scalars['Int']['output'];
  /** Indicates whether the form field is built-in. */
  isBuiltIn: Scalars['Boolean']['output'];
  /** Indicates whether the form field is required. */
  isRequired: Scalars['Boolean']['output'];
  /** The label to display for the form field. */
  label: Scalars['String']['output'];
  /** The options for the form field. */
  options: Array<FormFieldOption>;
  /** The sort order priority of the form field. */
  sortOrder: Scalars['Int']['output'];
}

/** Rating Filter */
export interface RatingSearchFilter extends SearchProductFilter {
  __typename: 'RatingSearchFilter';
  /** Indicates whether filter is collapsed by default. */
  isCollapsedByDefault: Scalars['Boolean']['output'];
  /** Display name for the filter. */
  name: Scalars['String']['output'];
  /** List of available ratings. */
  ratings: RatingSearchFilterItemConnection;
}


/** Rating Filter */
export interface RatingSearchFilterratingsArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
}

/** Filter by rating. At least a minRating or maxRating must be supplied. This filter will do nothing unless your store has the Product Filtering feature available on your plan and enabled. If it is supplied when your store does not have the feature enabled, it will be silently ignored. */
export interface RatingSearchFilterInput {
  /** Maximum rating of the product. */
  maxRating?: InputMaybe<Scalars['Float']['input']>;
  /** Minimum rating of the product. */
  minRating?: InputMaybe<Scalars['Float']['input']>;
}

/** Specific rating filter item */
export interface RatingSearchFilterItem {
  __typename: 'RatingSearchFilterItem';
  /** Indicates whether rating is selected. */
  isSelected: Scalars['Boolean']['output'];
  /** Indicates how many products available for this filter. */
  productCount: Scalars['Int']['output'];
  /** Rating value. */
  value: Scalars['String']['output'];
}

/** A connection to a list of items. */
export interface RatingSearchFilterItemConnection {
  __typename: 'RatingSearchFilterItemConnection';
  /** A list of edges. */
  edges: Maybe<Array<RatingSearchFilterItemEdge>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
}

/** An edge in a connection. */
export interface RatingSearchFilterItemEdge {
  __typename: 'RatingSearchFilterItemEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: RatingSearchFilterItem;
}

/** A raw HTML page. */
export interface RawHtmlPage extends Node, WebPage {
  __typename: 'RawHtmlPage';
  /** Unique ID for the web page. */
  entityId: Scalars['Int']['output'];
  /** The body of the page. */
  htmlBody: Scalars['String']['output'];
  /** The ID of an object */
  id: Scalars['ID']['output'];
  /** Whether or not the page should be visible in the navigation menu. */
  isVisibleInNavigation: Scalars['Boolean']['output'];
  /** Page name. */
  name: Scalars['String']['output'];
  /** Unique ID for the parent page. */
  parentEntityId: Maybe<Scalars['Int']['output']>;
  /** The URL path of the page. */
  path: Scalars['String']['output'];
  /** The plain text summary of the page body. */
  plainTextSummary: Scalars['String']['output'];
  /** Page SEO details. */
  seo: SeoDetails;
}


/** A raw HTML page. */
export interface RawHtmlPageplainTextSummaryArgs {
  characterLimit?: InputMaybe<Scalars['Int']['input']>;
}

/** ReCaptcha settings. */
export interface ReCaptchaSettings {
  __typename: 'ReCaptchaSettings';
  /** Indicates whether ReCaptcha is enabled on the storefront. */
  isEnabledOnStorefront: Scalars['Boolean']['output'];
  /** ReCaptcha site key. */
  siteKey: Scalars['String']['output'];
}

/** Recaptcha input (in case Recaptcha is enabled on a store) */
export interface ReCaptchaV2Input {
  /** Recaptcha token */
  token: Scalars['String']['input'];
}

export interface RecordInterface {
  _createdAt: Scalars['DateTime']['output'];
  /** Editing URL */
  _editingUrl: Maybe<Scalars['String']['output']>;
  _firstPublishedAt: Maybe<Scalars['DateTime']['output']>;
  _isValid: Scalars['BooleanType']['output'];
  _modelApiKey: Scalars['String']['output'];
  _publicationScheduledAt: Maybe<Scalars['DateTime']['output']>;
  _publishedAt: Maybe<Scalars['DateTime']['output']>;
  /** Generates SEO and Social card meta tags to be used in your frontend */
  _seoMetaTags: Array<Tag>;
  _status: ItemStatus;
  _unpublishingScheduledAt: Maybe<Scalars['DateTime']['output']>;
  _updatedAt: Scalars['DateTime']['output'];
  id: Scalars['ItemId']['output'];
}


export interface RecordInterface_seoMetaTagsArgs {
  locale?: InputMaybe<SiteLocale>;
}

/** Redirect. */
export interface Redirect extends Node {
  __typename: 'Redirect';
  /** Redirected url. */
  fromPath: Scalars['String']['output'];
  /** The ID of an object. */
  id: Scalars['ID']['output'];
  /** Additional information about redirect. */
  to: RedirectTo;
  /** Full destination url. */
  toUrl: Scalars['String']['output'];
}

/** Type of the redirect. */
export type RedirectTo = BlogPostRedirect | BrandRedirect | CategoryRedirect | ManualRedirect | PageRedirect | ProductRedirect;

/** The region object */
export interface Region {
  __typename: 'Region';
  /** The rendered HTML content targeted at the region. */
  html: Scalars['String']['output'];
  /** The name of a region. */
  name: Scalars['String']['output'];
}

/** An error when registering a customer. */
export type RegisterCustomerError = AccountCreationDisabledError | CustomerRegistrationError | EmailAlreadyInUseError | ValidationError;

/** The values to use for customer registration. */
export interface RegisterCustomerInput {
  /** The address of the customer. */
  address?: InputMaybe<AddCustomerAddressInput>;
  /** The company of the customer. */
  company?: InputMaybe<Scalars['String']['input']>;
  /** The email of the customer. */
  email: Scalars['String']['input'];
  /** The first name of the customer. */
  firstName: Scalars['String']['input'];
  /** The custom form fields that the customer filled out. */
  formFields?: InputMaybe<CustomerFormFieldsInput>;
  /** The last name of the customer. */
  lastName: Scalars['String']['input'];
  /** The password supplied by the customer. */
  password: Scalars['String']['input'];
  /** The phone number of the customer. */
  phone?: InputMaybe<Scalars['String']['input']>;
}

/** The result of registering a customer. */
export interface RegisterCustomerResult {
  __typename: 'RegisterCustomerResult';
  /** The customer that was registered. */
  customer: Maybe<Customer>;
  /** The errors, if any, that occured during the registration. */
  errors: Array<RegisterCustomerError>;
}

/** A connection to a list of items. */
export interface RelatedProductsConnection {
  __typename: 'RelatedProductsConnection';
  /** A list of edges. */
  edges: Maybe<Array<RelatedProductsEdge>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
}

/** An edge in a connection. */
export interface RelatedProductsEdge {
  __typename: 'RelatedProductsEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: Product;
}

/** The rendered regions by specific page. */
export interface RenderedRegionsByPageType {
  __typename: 'RenderedRegionsByPageType';
  /** List of regions */
  regions: Array<Region>;
}

/** An error when requesting a reset password email. */
export type RequestResetPasswordError = ValidationError;

/** Input for requesting a reset password email. */
export interface RequestResetPasswordInput {
  /** The email address of the customer requesting a reset password email. */
  email: Scalars['String']['input'];
  /** A path to direct the customer to from the email. */
  path?: InputMaybe<Scalars['String']['input']>;
}

/** The result of requesting a reset password email. */
export interface RequestResetPasswordResult {
  __typename: 'RequestResetPasswordResult';
  /** The errors, if any, that occured during the request. */
  errors: Array<RequestResetPasswordError>;
}

/** An error when resetting a password. */
export type ResetPasswordError = CustomerPasswordError | ValidationError;

/** Input for resetting a password. */
export interface ResetPasswordInput {
  /** The customer ID of the customer resetting their password. */
  customerEntityId: Scalars['Int']['input'];
  /** The new password for the customer. */
  newPassword: Scalars['String']['input'];
  /** The token sent to the customer in the reset password email. */
  token: Scalars['String']['input'];
}

/** The result of resetting a password. */
export interface ResetPasswordResult {
  __typename: 'ResetPasswordResult';
  /** The errors, if any, that occurred during the request. */
  errors: Array<ResetPasswordError>;
}

/** Specifies how to filter by upload type */
export interface ResolutionFilter {
  /** Search uploads with the specified resolution */
  eq?: InputMaybe<ResolutionType>;
  /** Search uploads with the specified resolutions */
  in?: InputMaybe<Array<InputMaybe<ResolutionType>>>;
  /** Exclude uploads with the specified resolution */
  neq?: InputMaybe<ResolutionType>;
  /** Search uploads without the specified resolutions */
  notIn?: InputMaybe<Array<InputMaybe<ResolutionType>>>;
}

export enum ResolutionType {
  icon = 'icon',
  large = 'large',
  medium = 'medium',
  small = 'small'
}

export interface ResponsiveImage {
  __typename: 'ResponsiveImage';
  alt: Maybe<Scalars['String']['output']>;
  aspectRatio: Scalars['FloatType']['output'];
  base64: Maybe<Scalars['String']['output']>;
  bgColor: Maybe<Scalars['String']['output']>;
  height: Scalars['IntType']['output'];
  sizes: Scalars['String']['output'];
  src: Scalars['String']['output'];
  srcSet: Scalars['String']['output'];
  title: Maybe<Scalars['String']['output']>;
  webpSrcSet: Scalars['String']['output'];
  width: Scalars['IntType']['output'];
}

/** Review */
export interface Review {
  __typename: 'Review';
  /** Product review author. */
  author: Author;
  /** Product review creation date. */
  createdAt: DateTimeExtended;
  /** Unique ID for the product review. */
  entityId: Scalars['Long']['output'];
  /** Product review rating. */
  rating: Scalars['Int']['output'];
  /** Product review text. */
  text: Scalars['String']['output'];
  /** Product review title. */
  title: Scalars['String']['output'];
}

/** A connection to a list of items. */
export interface ReviewConnection {
  __typename: 'ReviewConnection';
  /** A list of edges. */
  edges: Maybe<Array<ReviewEdge>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
}

/** An edge in a connection. */
export interface ReviewEdge {
  __typename: 'ReviewEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: Review;
}

/** Review Rating Summary */
export interface Reviews {
  __typename: 'Reviews';
  /**
   * Average rating of the product.
   * @deprecated Alpha version. Do not use in production.
   */
  averageRating: Scalars['Float']['output'];
  /** Total number of reviews on product. */
  numberOfReviews: Scalars['Int']['output'];
  /** Summation of rating scores from each review. */
  summationOfRatings: Scalars['Int']['output'];
}

export interface RichContentModelContentField {
  __typename: 'RichContentModelContentField';
  blocks: Array<ImageRecord>;
  links: Array<Scalars['String']['output']>;
  value: Scalars['JsonField']['output'];
}

/** Block of type Rich Content (rich_content) */
export interface RichContentRecord extends RecordInterface {
  __typename: 'RichContentRecord';
  _createdAt: Scalars['DateTime']['output'];
  /** Editing URL */
  _editingUrl: Maybe<Scalars['String']['output']>;
  _firstPublishedAt: Maybe<Scalars['DateTime']['output']>;
  _isValid: Scalars['BooleanType']['output'];
  _modelApiKey: Scalars['String']['output'];
  _publicationScheduledAt: Maybe<Scalars['DateTime']['output']>;
  _publishedAt: Maybe<Scalars['DateTime']['output']>;
  /** Generates SEO and Social card meta tags to be used in your frontend */
  _seoMetaTags: Array<Tag>;
  _status: ItemStatus;
  _unpublishingScheduledAt: Maybe<Scalars['DateTime']['output']>;
  _updatedAt: Scalars['DateTime']['output'];
  content: Maybe<RichContentModelContentField>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ItemId']['output'];
  updatedAt: Scalars['DateTime']['output'];
}


/** Block of type Rich Content (rich_content) */
export interface RichContentRecord_seoMetaTagsArgs {
  locale?: InputMaybe<SiteLocale>;
}

/** route */
export interface Route {
  __typename: 'Route';
  /** Node */
  node: Maybe<Node>;
  /** Redirect details for a given path (if exists). */
  redirect: Maybe<Redirect>;
}

/** Enum value to specify the desired behavior when encountering a redirect for the requested route. */
export enum RouteRedirectBehavior {
  /** If there is a dynamic/association redirect configured, the `node` node will return a resulting entity (category, product, etc.) that a redirect points to. If there is a static/manual redirect configured, the `node` node will return null, as there is no entity associated with it, the `redirect node` however will return the redirect details. */
  FOLLOW = 'FOLLOW',
  /** No redirects are taken into account, relying on custom URLs only. If there is the same path for both redirect and entity URL configured, both `redirect` node and `node` node return respective non-null values. */
  IGNORE = 'IGNORE'
}

export interface Scope {
  __typename: 'Scope';
  action: ScopeAction;
  modifier: Maybe<ScopeModifier>;
  resource: ScopeResource;
}

export enum ScopeAction {
  CREATE = 'CREATE',
  DELETE = 'DELETE',
  READ = 'READ',
  UPDATE = 'UPDATE'
}

export enum ScopeModifier {
  ALL = 'ALL',
  OWN = 'OWN'
}

export enum ScopeResource {
  DesignProduct = 'DesignProduct',
  DesignProof = 'DesignProof',
  DesignRequest = 'DesignRequest',
  DesignRequestRevisionRequest = 'DesignRequestRevisionRequest',
  Integration = 'Integration',
  Membership = 'Membership',
  Order = 'Order',
  OrderFulfillment = 'OrderFulfillment',
  Organization = 'Organization'
}

/** Store search settings. */
export interface Search {
  __typename: 'Search';
  /** Product filtering enabled. */
  productFilteringEnabled: Scalars['Boolean']['output'];
}

/** Search Product Filter */
export interface SearchProductFilter {
  /** Indicates whether filter is collapsed by default. */
  isCollapsedByDefault: Scalars['Boolean']['output'];
  /** Display name for the filter. */
  name: Scalars['String']['output'];
}

/** A connection to a list of items. */
export interface SearchProductFilterConnection {
  __typename: 'SearchProductFilterConnection';
  /** A list of edges. */
  edges: Maybe<Array<SearchProductFilterEdge>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
}

/** An edge in a connection. */
export interface SearchProductFilterEdge {
  __typename: 'SearchProductFilterEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: SearchProductFilter;
}

/** Container for catalog search results, which may contain both products as well as a list of search filters for further refinement. */
export interface SearchProducts {
  __typename: 'SearchProducts';
  /** Available product filters. */
  filters: SearchProductFilterConnection;
  /** Details of the products. */
  products: ProductConnection;
}


/** Container for catalog search results, which may contain both products as well as a list of search filters for further refinement. */
export interface SearchProductsfiltersArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
}


/** Container for catalog search results, which may contain both products as well as a list of search filters for further refinement. */
export interface SearchProductsproductsArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
}

/** Object containing available search filters for use when querying Products. */
export interface SearchProductsFiltersInput {
  /** Filter by products belonging to any of the specified Brands. */
  brandEntityIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  /** Filter by products belonging to a single Category. This is intended for use when presenting a Category page in a PLP experience. This argument must be used in order for custom product sorts and custom product filtering settings targeted at a particular category to take effect. */
  categoryEntityId?: InputMaybe<Scalars['Int']['input']>;
  /** Filter by products belonging to any of the specified Categories. Intended for Advanced Search and Faceted Search/Product Filtering use cases, not for a page for a specific Category. */
  categoryEntityIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  /** When set to True, hides products which are out of stock. Defaults to False. This filter will do nothing unless your store has the Product Filtering feature available on your plan and enabled. If it is supplied when your store does not have the feature enabled, it will be silently ignored. */
  hideOutOfStock?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filters by Products which have explicitly been marked as Featured within the catalog. If not supplied, the Featured status of products will not be considered when returning the list of products. */
  isFeatured?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filters by Products which have explicit Free Shipping configured within the catalog. If not supplied, the Free Shipping status of products will not be considered when returning the list of products. */
  isFreeShipping?: InputMaybe<Scalars['Boolean']['input']>;
  /** Search by price range. At least a minPrice or maxPrice must be supplied. */
  price?: InputMaybe<PriceSearchFilterInput>;
  /** Filter by the attributes of products such as Product Options and Product Custom Fields. This filter will do nothing unless your store has the Product Filtering feature available on your plan and enabled. If it is supplied when your store does not have the feature enabled, it will be silently ignored. */
  productAttributes?: InputMaybe<Array<ProductAttributeSearchFilterInput>>;
  /** Filter by rating. At least a minRating or maxRating must be supplied. This filter will do nothing unless your store has the Product Filtering feature available on your plan and enabled. If it is supplied when your store does not have the feature enabled, it will be silently ignored. */
  rating?: InputMaybe<RatingSearchFilterInput>;
  /** Boolean argument to determine whether products within sub-Categories will be returned when filtering products by Category. Defaults to False if not supplied. */
  searchSubCategories?: InputMaybe<Scalars['Boolean']['input']>;
  /** Textual search term. Used to search for products based on text entered by a shopper, typically in a search box. Searches against several fields on the product including Name, SKU, and Description. */
  searchTerm?: InputMaybe<Scalars['String']['input']>;
}

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
export interface SearchQueries {
  __typename: 'SearchQueries';
  /** Details of the products and facets matching given search criteria. */
  searchProducts: SearchProducts;
}


/** The Search queries. */
export interface SearchQueriessearchProductsArgs {
  filters: SearchProductsFiltersInput;
  sort?: InputMaybe<SearchProductsSortInput>;
}

/** Select checkout shipping option input data object */
export interface SelectCheckoutShippingOptionDataInput {
  /** The shipping option id */
  shippingOptionEntityId: Scalars['String']['input'];
}

/** Select checkout shipping option input object */
export interface SelectCheckoutShippingOptionInput {
  /** The checkout id */
  checkoutEntityId: Scalars['String']['input'];
  /** The consignment id */
  consignmentEntityId: Scalars['String']['input'];
  /** Select checkout shipping option data object */
  data: SelectCheckoutShippingOptionDataInput;
}

/** Select checkout shipping option result */
export interface SelectCheckoutShippingOptionResult {
  __typename: 'SelectCheckoutShippingOptionResult';
  /** The Checkout that is updated as a result of mutation. */
  checkout: Maybe<Checkout>;
}

/** Seo Details */
export interface SeoDetails {
  __typename: 'SeoDetails';
  /** Meta description. */
  metaDescription: Scalars['String']['output'];
  /** Meta keywords. */
  metaKeywords: Scalars['String']['output'];
  /** Page title. */
  pageTitle: Scalars['String']['output'];
}

export interface SeoField {
  __typename: 'SeoField';
  description: Maybe<Scalars['String']['output']>;
  image: Maybe<FileField>;
  noIndex: Maybe<Scalars['BooleanType']['output']>;
  title: Maybe<Scalars['String']['output']>;
  twitterCard: Maybe<Scalars['String']['output']>;
}

/** Specifies how to filter SEO meta tags fields */
export interface SeoFilter {
  /** Filter records with the specified field defined (i.e. with any value) or not */
  exists?: InputMaybe<Scalars['BooleanType']['input']>;
}

/** Store settings information from the control panel. */
export interface Settings {
  __typename: 'Settings';
  /** Channel ID. */
  channelId: Scalars['Long']['output'];
  /** Checkout settings. */
  checkout: Maybe<CheckoutSettings>;
  /** Contact information for the store. */
  contact: Maybe<ContactField>;
  /** Store display format information. */
  display: DisplayField;
  /** The form fields to display on the storefront during customer registration or address creation. */
  formFields: FormFields;
  /** Inventory settings. */
  inventory: Maybe<InventorySettings>;
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
  /** The customer-facing message associated with the current store status. */
  statusMessage: Maybe<Scalars['String']['output']>;
  /** The hash of the store. */
  storeHash: Scalars['String']['output'];
  /** The name of the store. */
  storeName: Scalars['String']['output'];
  /** Storefront settings. */
  storefront: Storefront;
  /** The tax display settings object */
  tax: Maybe<TaxDisplaySettings>;
  /** Store urls. */
  url: UrlField;
}

/** A connection to a list of items. */
export interface ShopByPriceConnection {
  __typename: 'ShopByPriceConnection';
  /** A list of edges. */
  edges: Maybe<Array<ShopByPriceEdge>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
}

/** An edge in a connection. */
export interface ShopByPriceEdge {
  __typename: 'ShopByPriceEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: ShopByPriceRange;
}

/** Category shop by price money ranges */
export interface ShopByPriceRange {
  __typename: 'ShopByPriceRange';
  /** Category shop by price range. */
  ranges: MoneyRange;
}

/** A site */
export interface Site {
  __typename: 'Site';
  /** Details of the best selling products. */
  bestSellingProducts: ProductConnection;
  /** Details of a brand. */
  brand: Maybe<Brand>;
  /** Details of the brand. */
  brands: BrandConnection;
  /** The Cart of the current customer. */
  cart: Maybe<Cart>;
  /** Retrieve a category object by the id. */
  category: Maybe<Category>;
  /** A tree of categories. */
  categoryTree: Array<CategoryTreeItem>;
  /** The checkout of the current customer. */
  checkout: Maybe<Checkout>;
  /** The page content. */
  content: Content;
  /** Store Currencies. */
  currencies: CurrencyConnection;
  /** Currency details. */
  currency: Maybe<Currency>;
  favicon: Maybe<FileField>;
  faviconMetaTags: Array<Tag>;
  /** Details of the featured products. */
  featuredProducts: ProductConnection;
  globalSeo: Maybe<GlobalSeoField>;
  locales: Array<SiteLocale>;
  /** Details of the newest products. */
  newestProducts: ProductConnection;
  noIndex: Maybe<Scalars['BooleanType']['output']>;
  /** List of brands sorted by product count. */
  popularBrands: PopularBrandConnection;
  /** A single product object with variant pricing overlay capabilities. */
  product: Maybe<Product>;
  /** Details of the products. */
  products: ProductConnection;
  /** Public Wishlist */
  publicWishlist: Maybe<PublicWishlist>;
  /** Route for a node */
  route: Route;
  /** The Search queries. */
  search: SearchQueries;
  /** Store settings. */
  settings: Maybe<Settings>;
}


/** A site */
export interface SitebestSellingProductsArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  hideOutOfStock?: InputMaybe<Scalars['Boolean']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
}


/** A site */
export interface SitebrandArgs {
  entityId: Scalars['Int']['input'];
}


/** A site */
export interface SitebrandsArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  entityIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  productEntityIds?: InputMaybe<Array<Scalars['Int']['input']>>;
}


/** A site */
export interface SitecartArgs {
  entityId?: InputMaybe<Scalars['String']['input']>;
}


/** A site */
export interface SitecategoryArgs {
  entityId: Scalars['Int']['input'];
}


/** A site */
export interface SitecategoryTreeArgs {
  rootEntityId?: InputMaybe<Scalars['Int']['input']>;
}


/** A site */
export interface SitecheckoutArgs {
  entityId?: InputMaybe<Scalars['String']['input']>;
}


/** A site */
export interface SitecurrenciesArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
}


/** A site */
export interface SitecurrencyArgs {
  currencyCode: currencyCode;
}


/** A site */
export interface SitefaviconMetaTagsArgs {
  variants?: InputMaybe<Array<InputMaybe<FaviconType>>>;
}


/** A site */
export interface SitefeaturedProductsArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  hideOutOfStock?: InputMaybe<Scalars['Boolean']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
}


/** A site */
export interface SiteglobalSeoArgs {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
}


/** A site */
export interface SitenewestProductsArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  hideOutOfStock?: InputMaybe<Scalars['Boolean']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
}


/** A site */
export interface SitepopularBrandsArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
}


/** A site */
export interface SiteproductArgs {
  entityId?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  optionValueIds?: InputMaybe<Array<OptionValueId>>;
  sku?: InputMaybe<Scalars['String']['input']>;
  useDefaultOptionSelections?: InputMaybe<Scalars['Boolean']['input']>;
  variantEntityId?: InputMaybe<Scalars['Int']['input']>;
}


/** A site */
export interface SiteproductsArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  entityIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  first?: InputMaybe<Scalars['Int']['input']>;
  hideOutOfStock?: InputMaybe<Scalars['Boolean']['input']>;
  ids?: InputMaybe<Array<Scalars['ID']['input']>>;
  last?: InputMaybe<Scalars['Int']['input']>;
}


/** A site */
export interface SitepublicWishlistArgs {
  token: Scalars['String']['input'];
}


/** A site */
export interface SiterouteArgs {
  path: Scalars['String']['input'];
  redirectBehavior?: RouteRedirectBehavior;
}

export enum SiteLocale {
  en = 'en'
}

/** Specifies how to filter Slug fields */
export interface SlugFilter {
  /** Search for records with an exact match */
  eq?: InputMaybe<Scalars['String']['input']>;
  /** Filter records that have one of the specified slugs */
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Exclude records with an exact match */
  neq?: InputMaybe<Scalars['String']['input']>;
  /** Filter records that do have one of the specified slugs */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
}

/** The social media link. */
export interface SocialMediaLink {
  __typename: 'SocialMediaLink';
  /** The name of the social media link. */
  name: Scalars['String']['output'];
  /** The url of the social media link. */
  url: Scalars['String']['output'];
}

/** Special hour */
export interface SpecialHour {
  __typename: 'SpecialHour';
  /** Closing time */
  closing: Maybe<Scalars['DateTime']['output']>;
  /** Upcoming event name */
  label: Scalars['String']['output'];
  /** Is open */
  open: Scalars['Boolean']['output'];
  /** Opening time */
  opening: Maybe<Scalars['DateTime']['output']>;
}

/** Specifies how to filter by status */
export interface StatusFilter {
  /** Search the record with the specified status */
  eq?: InputMaybe<ItemStatus>;
  /** Search records with the specified statuses */
  in?: InputMaybe<Array<InputMaybe<ItemStatus>>>;
  /** Exclude the record with the specified status */
  neq?: InputMaybe<ItemStatus>;
  /** Search records without the specified statuses */
  notIn?: InputMaybe<Array<InputMaybe<ItemStatus>>>;
}

/** Stock level display setting */
export enum StockLevelDisplay {
  DONT_SHOW = 'DONT_SHOW',
  SHOW = 'SHOW',
  SHOW_WHEN_LOW = 'SHOW_WHEN_LOW'
}

/** Store logo as image. */
export interface StoreImageLogo {
  __typename: 'StoreImageLogo';
  /** Logo image. */
  image: Image;
}

/** Store logo. */
export type StoreLogo = StoreImageLogo | StoreTextLogo;

/** Store logo as text. */
export interface StoreTextLogo {
  __typename: 'StoreTextLogo';
  /** Logo text. */
  text: Scalars['String']['output'];
}

/** Storefront settings. */
export interface Storefront {
  __typename: 'Storefront';
  /** Storefront catalog settings. */
  catalog: Maybe<Catalog>;
}

/** Storefront Mode */
export enum StorefrontStatusType {
  HIBERNATION = 'HIBERNATION',
  LAUNCHED = 'LAUNCHED',
  MAINTENANCE = 'MAINTENANCE',
  PRE_LAUNCH = 'PRE_LAUNCH'
}

/** Specifies how to filter Single-line string fields */
export interface StringFilter {
  /** Search for records with an exact match */
  eq?: InputMaybe<Scalars['String']['input']>;
  /** Filter records with the specified field defined (i.e. with any value) or not [DEPRECATED] */
  exists?: InputMaybe<Scalars['BooleanType']['input']>;
  /** Filter records that equal one of the specified values */
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Filter records with the specified field set as blank (null or empty string) */
  isBlank?: InputMaybe<Scalars['BooleanType']['input']>;
  /** Filter records with the specified field present (neither null, nor empty string) */
  isPresent?: InputMaybe<Scalars['BooleanType']['input']>;
  /** Filter records based on a regular expression */
  matches?: InputMaybe<StringMatchesFilter>;
  /** Exclude records with an exact match */
  neq?: InputMaybe<Scalars['String']['input']>;
  /** Filter records that do not equal one of the specified values */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Exclude records based on a regular expression */
  notMatches?: InputMaybe<StringMatchesFilter>;
}

export interface StringFilterInput {
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
}

export interface StringMatchesFilter {
  caseSensitive?: InputMaybe<Scalars['BooleanType']['input']>;
  pattern: Scalars['String']['input'];
  regexp?: InputMaybe<Scalars['BooleanType']['input']>;
}

/** Specifies how to filter Structured Text fields values */
export interface StructuredTextFilter {
  /** Filter records with the specified field defined (i.e. with any value) or not [DEPRECATED] */
  exists?: InputMaybe<Scalars['BooleanType']['input']>;
  /** Filter records with the specified field set as blank (null or single empty paragraph) */
  isBlank?: InputMaybe<Scalars['BooleanType']['input']>;
  /** Filter records with the specified field present (neither null, nor empty string) */
  isPresent?: InputMaybe<Scalars['BooleanType']['input']>;
  /** Filter records based on a regular expression */
  matches?: InputMaybe<StringMatchesFilter>;
  /** Exclude records based on a regular expression */
  notMatches?: InputMaybe<StringMatchesFilter>;
}

/** Specific sub-category filter item */
export interface SubCategorySearchFilterItem {
  __typename: 'SubCategorySearchFilterItem';
  /** Category ID. */
  entityId: Scalars['Int']['output'];
  /** Indicates whether category is selected. */
  isSelected: Scalars['Boolean']['output'];
  /** Category name. */
  name: Scalars['String']['output'];
  /** Indicates how many products available for this filter. */
  productCount: Scalars['Int']['output'];
  /** List of available sub-categories. */
  subCategories: SubCategorySearchFilterItemConnection;
}


/** Specific sub-category filter item */
export interface SubCategorySearchFilterItemsubCategoriesArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
}

/** A connection to a list of items. */
export interface SubCategorySearchFilterItemConnection {
  __typename: 'SubCategorySearchFilterItemConnection';
  /** A list of edges. */
  edges: Maybe<Array<SubCategorySearchFilterItemEdge>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
}

/** An edge in a connection. */
export interface SubCategorySearchFilterItemEdge {
  __typename: 'SubCategorySearchFilterItemEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: SubCategorySearchFilterItem;
}

/** Input for contact us form */
export interface SubmitContactUsDataInput {
  /** Comments */
  comments: Scalars['String']['input'];
  /** Company name */
  companyName?: InputMaybe<Scalars['String']['input']>;
  /** Customer email */
  email: Scalars['String']['input'];
  /** Customer full name */
  fullName?: InputMaybe<Scalars['String']['input']>;
  /** Order number */
  orderNumber?: InputMaybe<Scalars['String']['input']>;
  /** Customer phone number */
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  /** RMA number */
  rmaNumber?: InputMaybe<Scalars['String']['input']>;
}

/** Error that occurred when submitting the contact us email */
export type SubmitContactUsError = ValidationError;

/** Input for contact us form */
export interface SubmitContactUsInput {
  /** The form data we are submitting */
  data: SubmitContactUsDataInput;
  /** The contact page we're sending on behalf of */
  pageEntityId: Scalars['Int']['input'];
}

/** Result of submitting contact us form */
export interface SubmitContactUsResult {
  __typename: 'SubmitContactUsResult';
  /** List of errors that occurred executing the mutation. */
  errors: Array<SubmitContactUsError>;
}

export interface Subscriber {
  __typename: 'Subscriber';
  email: Scalars['String']['output'];
  id: Scalars['String']['output'];
}

export interface SubscriberCreateInput {
  email: Scalars['String']['input'];
  lists: Array<SubscriberListEnum>;
}

export interface SubscriberCreatePayload {
  __typename: 'SubscriberCreatePayload';
  subscriber: Maybe<Subscriber>;
}

export enum SubscriberListEnum {
  NEWSLETTER_SUBSCRIBER = 'NEWSLETTER_SUBSCRIBER',
  NEW_USER = 'NEW_USER',
  STUDENT_MERCH_DOWNLOAD = 'STUDENT_MERCH_DOWNLOAD'
}

export interface Subscription {
  __typename: 'Subscription';
  designRequestHistoryItemAdded: Maybe<DesignRequestHistoryItemAddedPayload>;
}


export interface SubscriptiondesignRequestHistoryItemAddedArgs {
  designRequestId: Scalars['ID']['input'];
}

/** A swatch option value - swatch values can be associated with a list of hexidecimal colors or an image. */
export interface SwatchOptionValue extends CatalogProductOptionValue {
  __typename: 'SwatchOptionValue';
  /** Unique ID for the option value. */
  entityId: Scalars['Int']['output'];
  /** List of up to 3 hex encoded colors to associate with a swatch value. */
  hexColors: Array<Scalars['String']['output']>;
  /** Absolute path of a swatch texture image. */
  imageUrl: Maybe<Scalars['String']['output']>;
  /** Indicates whether this value is the chosen default selected value. */
  isDefault: Scalars['Boolean']['output'];
  /** Indicates whether this value is selected based on sku/variantEntityId/optionValueIds overlay requested on the product node level. */
  isSelected: Maybe<Scalars['Boolean']['output']>;
  /** Label for the option value. */
  label: Scalars['String']['output'];
}


/** A swatch option value - swatch values can be associated with a list of hexidecimal colors or an image. */
export interface SwatchOptionValueimageUrlArgs {
  height?: InputMaybe<Scalars['Int']['input']>;
  width: Scalars['Int']['input'];
}

export interface TableModelFilter {
  AND?: InputMaybe<Array<InputMaybe<TableModelFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<TableModelFilter>>>;
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
  internalName?: InputMaybe<StringFilter>;
  table?: InputMaybe<JsonFilter>;
  updatedAt?: InputMaybe<UpdatedAtFilter>;
}

export enum TableModelOrderBy {
  _createdAt_ASC = '_createdAt_ASC',
  _createdAt_DESC = '_createdAt_DESC',
  _firstPublishedAt_ASC = '_firstPublishedAt_ASC',
  _firstPublishedAt_DESC = '_firstPublishedAt_DESC',
  _isValid_ASC = '_isValid_ASC',
  _isValid_DESC = '_isValid_DESC',
  _publicationScheduledAt_ASC = '_publicationScheduledAt_ASC',
  _publicationScheduledAt_DESC = '_publicationScheduledAt_DESC',
  _publishedAt_ASC = '_publishedAt_ASC',
  _publishedAt_DESC = '_publishedAt_DESC',
  _status_ASC = '_status_ASC',
  _status_DESC = '_status_DESC',
  _unpublishingScheduledAt_ASC = '_unpublishingScheduledAt_ASC',
  _unpublishingScheduledAt_DESC = '_unpublishingScheduledAt_DESC',
  _updatedAt_ASC = '_updatedAt_ASC',
  _updatedAt_DESC = '_updatedAt_DESC',
  createdAt_ASC = 'createdAt_ASC',
  createdAt_DESC = 'createdAt_DESC',
  id_ASC = 'id_ASC',
  id_DESC = 'id_DESC',
  internalName_ASC = 'internalName_ASC',
  internalName_DESC = 'internalName_DESC',
  updatedAt_ASC = 'updatedAt_ASC',
  updatedAt_DESC = 'updatedAt_DESC'
}

/** Record of type Table (table) */
export interface TableRecord extends RecordInterface {
  __typename: 'TableRecord';
  _createdAt: Scalars['DateTime']['output'];
  /** Editing URL */
  _editingUrl: Maybe<Scalars['String']['output']>;
  _firstPublishedAt: Maybe<Scalars['DateTime']['output']>;
  _isValid: Scalars['BooleanType']['output'];
  _modelApiKey: Scalars['String']['output'];
  _publicationScheduledAt: Maybe<Scalars['DateTime']['output']>;
  _publishedAt: Maybe<Scalars['DateTime']['output']>;
  /** Generates SEO and Social card meta tags to be used in your frontend */
  _seoMetaTags: Array<Tag>;
  _status: ItemStatus;
  _unpublishingScheduledAt: Maybe<Scalars['DateTime']['output']>;
  _updatedAt: Scalars['DateTime']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ItemId']['output'];
  internalName: Maybe<Scalars['String']['output']>;
  table: Maybe<Scalars['JsonField']['output']>;
  updatedAt: Scalars['DateTime']['output'];
}


/** Record of type Table (table) */
export interface TableRecord_seoMetaTagsArgs {
  locale?: InputMaybe<SiteLocale>;
}

export interface Tag {
  __typename: 'Tag';
  attributes: Maybe<Scalars['MetaTagAttributes']['output']>;
  content: Maybe<Scalars['String']['output']>;
  tag: Scalars['String']['output'];
}

/** The tax display settings object */
export interface TaxDisplaySettings {
  __typename: 'TaxDisplaySettings';
  /** Tax display setting for Product Details Page. */
  pdp: TaxPriceDisplay;
  /** Tax display setting for Product List Page. */
  plp: TaxPriceDisplay;
}

/** Tax setting can be set included or excluded (Tax setting can also be set to both on PDP/PLP). */
export enum TaxPriceDisplay {
  BOTH = 'BOTH',
  EX = 'EX',
  INC = 'INC'
}

export interface TermsOfUsePageModelContentField {
  __typename: 'TermsOfUsePageModelContentField';
  blocks: Array<Scalars['String']['output']>;
  links: Array<Scalars['String']['output']>;
  value: Scalars['JsonField']['output'];
}

/** Record of type Terms of Use Page (terms_of_use_page) */
export interface TermsOfUsePageRecord extends RecordInterface {
  __typename: 'TermsOfUsePageRecord';
  _createdAt: Scalars['DateTime']['output'];
  /** Editing URL */
  _editingUrl: Maybe<Scalars['String']['output']>;
  _firstPublishedAt: Maybe<Scalars['DateTime']['output']>;
  _isValid: Scalars['BooleanType']['output'];
  _modelApiKey: Scalars['String']['output'];
  _publicationScheduledAt: Maybe<Scalars['DateTime']['output']>;
  _publishedAt: Maybe<Scalars['DateTime']['output']>;
  /** Generates SEO and Social card meta tags to be used in your frontend */
  _seoMetaTags: Array<Tag>;
  _status: ItemStatus;
  _unpublishingScheduledAt: Maybe<Scalars['DateTime']['output']>;
  _updatedAt: Scalars['DateTime']['output'];
  content: Maybe<TermsOfUsePageModelContentField>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ItemId']['output'];
  seoMetadata: Maybe<SeoField>;
  updatedAt: Scalars['DateTime']['output'];
}


/** Record of type Terms of Use Page (terms_of_use_page) */
export interface TermsOfUsePageRecord_seoMetaTagsArgs {
  locale?: InputMaybe<SiteLocale>;
}

/** A single line text input field. */
export interface TextFieldOption extends CatalogProductOption {
  __typename: 'TextFieldOption';
  /** Default value of the text field option. */
  defaultValue: Maybe<Scalars['String']['output']>;
  /** Display name for the option. */
  displayName: Scalars['String']['output'];
  /** Unique ID for the option. */
  entityId: Scalars['Int']['output'];
  /** One of the option values is required to be selected for the checkout. */
  isRequired: Scalars['Boolean']['output'];
  /** Indicates whether it is a variant option or modifier. */
  isVariantOption: Scalars['Boolean']['output'];
  /** The maximum number of characters. */
  maxLength: Maybe<Scalars['Int']['output']>;
  /** The minimum number of characters. */
  minLength: Maybe<Scalars['Int']['output']>;
}

/** Specifies how to filter text fields */
export interface TextFilter {
  /** Filter records with the specified field defined (i.e. with any value) or not [DEPRECATED] */
  exists?: InputMaybe<Scalars['BooleanType']['input']>;
  /** Filter records with the specified field set as blank (null or empty string) */
  isBlank?: InputMaybe<Scalars['BooleanType']['input']>;
  /** Filter records with the specified field present (neither null, nor empty string) */
  isPresent?: InputMaybe<Scalars['BooleanType']['input']>;
  /** Filter records based on a regular expression */
  matches?: InputMaybe<StringMatchesFilter>;
  /** Exclude records based on a regular expression */
  notMatches?: InputMaybe<StringMatchesFilter>;
}

/** A single line text form field. */
export interface TextFormField extends FormField {
  __typename: 'TextFormField';
  /** The default text value of the text form field. */
  defaultText: Maybe<Scalars['String']['output']>;
  /** The entity ID of the form field. */
  entityId: Scalars['Int']['output'];
  /** Indicates whether the form field is built-in. */
  isBuiltIn: Scalars['Boolean']['output'];
  /** Indicates whether the form field is required. */
  isRequired: Scalars['Boolean']['output'];
  /** The label to display for the form field. */
  label: Scalars['String']['output'];
  /** The maximum amount of characters that can be entered into the form field. */
  maxLength: Maybe<Scalars['Int']['output']>;
  /** The sort order priority of the form field. */
  sortOrder: Scalars['Int']['output'];
}

/** The user input for text form fields. */
export interface TextFormFieldInput {
  /** The custom form field ID. */
  fieldEntityId: Scalars['Int']['input'];
  /** Text value. */
  text: Scalars['String']['input'];
}

/** Text (includes basic text field and multi-line text) custom form field value. */
export interface TextFormFieldValue extends CustomerFormFieldValue {
  __typename: 'TextFormFieldValue';
  /** Entity ID of a custom form field value on a customer or customer address. */
  entityId: Scalars['Int']['output'];
  /** The name of the form field that the value is for. */
  name: Scalars['String']['output'];
  /** The text submitted by a customer. */
  text: Scalars['String']['output'];
}

/** Block of type Tradeshow Category Metadata (tradeshow_category_metadata_model) */
export interface TradeshowCategoryMetadataModelRecord extends RecordInterface {
  __typename: 'TradeshowCategoryMetadataModelRecord';
  _createdAt: Scalars['DateTime']['output'];
  /** Editing URL */
  _editingUrl: Maybe<Scalars['String']['output']>;
  _firstPublishedAt: Maybe<Scalars['DateTime']['output']>;
  _isValid: Scalars['BooleanType']['output'];
  _modelApiKey: Scalars['String']['output'];
  _publicationScheduledAt: Maybe<Scalars['DateTime']['output']>;
  _publishedAt: Maybe<Scalars['DateTime']['output']>;
  /** Generates SEO and Social card meta tags to be used in your frontend */
  _seoMetaTags: Array<Tag>;
  _status: ItemStatus;
  _unpublishingScheduledAt: Maybe<Scalars['DateTime']['output']>;
  _updatedAt: Scalars['DateTime']['output'];
  createdAt: Scalars['DateTime']['output'];
  endDate: Maybe<Scalars['Date']['output']>;
  id: Scalars['ItemId']['output'];
  startDate: Maybe<Scalars['Date']['output']>;
  updatedAt: Scalars['DateTime']['output'];
}


/** Block of type Tradeshow Category Metadata (tradeshow_category_metadata_model) */
export interface TradeshowCategoryMetadataModelRecord_seoMetaTagsArgs {
  locale?: InputMaybe<SiteLocale>;
}

/** Specifies how to filter by upload type */
export interface TypeFilter {
  /** Search uploads with the specified type */
  eq?: InputMaybe<UploadType>;
  /** Search uploads with the specified types */
  in?: InputMaybe<Array<InputMaybe<UploadType>>>;
  /** Exclude uploads with the specified type */
  neq?: InputMaybe<UploadType>;
  /** Search uploads without the specified types */
  notIn?: InputMaybe<Array<InputMaybe<UploadType>>>;
}

/** Unapply checkout coupon data object */
export interface UnapplyCheckoutCouponDataInput {
  /** The checkout coupon code */
  couponCode: Scalars['String']['input'];
}

/** Unapply checkout coupon input object */
export interface UnapplyCheckoutCouponInput {
  /** The checkout id */
  checkoutEntityId: Scalars['String']['input'];
  /** Unapply checkout coupon data object */
  data: UnapplyCheckoutCouponDataInput;
}

/** Unapply checkout coupon result */
export interface UnapplyCheckoutCouponResult {
  __typename: 'UnapplyCheckoutCouponResult';
  /** The Checkout that is updated as a result of mutation. */
  checkout: Maybe<Checkout>;
}

/** Unassign cart from the customer input object. */
export interface UnassignCartFromCustomerInput {
  /** The cart id. */
  cartEntityId: Scalars['String']['input'];
}

/** Unassign cart from the customer result. */
export interface UnassignCartFromCustomerResult {
  __typename: 'UnassignCartFromCustomerResult';
  /** The Cart that is updated as a result of mutation. */
  cart: Maybe<Cart>;
}

/** Update cart currency data object */
export interface UpdateCartCurrencyDataInput {
  /** ISO-4217 currency code */
  currencyCode: Scalars['String']['input'];
}

/** Update cart currency input object */
export interface UpdateCartCurrencyInput {
  /** The cart id */
  cartEntityId: Scalars['String']['input'];
  /** Update cart currency data object */
  data: UpdateCartCurrencyDataInput;
}

/** Update cart currency result */
export interface UpdateCartCurrencyResult {
  __typename: 'UpdateCartCurrencyResult';
  /** The Cart that is updated as a result of mutation. */
  cart: Maybe<Cart>;
}

/** Update cart line item data object */
export interface UpdateCartLineItemDataInput {
  /** The gift certificate */
  giftCertificate?: InputMaybe<CartGiftCertificateInput>;
  /** The cart line item */
  lineItem?: InputMaybe<CartLineItemInput>;
}

/** Update cart line item input object */
export interface UpdateCartLineItemInput {
  /** The cart id */
  cartEntityId: Scalars['String']['input'];
  /** Update cart line item data object */
  data: UpdateCartLineItemDataInput;
  /** The line item id */
  lineItemEntityId: Scalars['String']['input'];
}

/** Update cart line item result */
export interface UpdateCartLineItemResult {
  __typename: 'UpdateCartLineItemResult';
  /** The Cart that is updated as a result of mutation. */
  cart: Maybe<Cart>;
}

/** Update checkout billing address data object */
export interface UpdateCheckoutBillingAddressDataInput {
  /** The checkout billing address */
  address: CheckoutAddressInput;
}

/** Update checkout billing address input object */
export interface UpdateCheckoutBillingAddressInput {
  /** The address id */
  addressEntityId: Scalars['String']['input'];
  /** The checkout id */
  checkoutEntityId: Scalars['String']['input'];
  /** Update checkout billing address data object */
  data: UpdateCheckoutBillingAddressDataInput;
}

/** Update checkout billing address result */
export interface UpdateCheckoutBillingAddressResult {
  __typename: 'UpdateCheckoutBillingAddressResult';
  /** The Checkout that is updated as a result of mutation. */
  checkout: Maybe<Checkout>;
}

/** Update checkout customer message data object */
export interface UpdateCheckoutCustomerMessageDataInput {
  /** The checkout customer message */
  message: Scalars['String']['input'];
}

/** Update checkout customer message input object */
export interface UpdateCheckoutCustomerMessageInput {
  /** The checkout id */
  checkoutEntityId: Scalars['String']['input'];
  /** Update checkout customer message data object */
  data: UpdateCheckoutCustomerMessageDataInput;
}

/** Update checkout customer message result */
export interface UpdateCheckoutCustomerMessageResult {
  __typename: 'UpdateCheckoutCustomerMessageResult';
  /** The Checkout that is updated as a result of mutation. */
  checkout: Maybe<Checkout>;
}

/** Update checkout shipping consignment data object */
export interface UpdateCheckoutShippingConsignmentDataInput {
  /** Checkout shipping consignment input object */
  consignment: CheckoutShippingConsignmentInput;
}

/** Update checkout shipping consignment input object */
export interface UpdateCheckoutShippingConsignmentInput {
  /** The checkout id */
  checkoutEntityId: Scalars['String']['input'];
  /** The consignment id */
  consignmentEntityId: Scalars['String']['input'];
  /** Update checkout shipping consignment data object */
  data: UpdateCheckoutShippingConsignmentDataInput;
}

/** Update checkout shipping consignment result */
export interface UpdateCheckoutShippingConsignmentResult {
  __typename: 'UpdateCheckoutShippingConsignmentResult';
  /** The Checkout that is updated as a result of mutation. */
  checkout: Maybe<Checkout>;
}

/** Data fields to update on address. */
export interface UpdateCustomerAddressDataInput {
  /** First line for the street address. */
  address1?: InputMaybe<Scalars['String']['input']>;
  /** Second line for the street address. */
  address2?: InputMaybe<Scalars['String']['input']>;
  /** City. */
  city?: InputMaybe<Scalars['String']['input']>;
  /** Company name associated with the address. */
  company?: InputMaybe<Scalars['String']['input']>;
  /** 2-letter country code. */
  countryCode?: InputMaybe<Scalars['String']['input']>;
  /** First name of address owner. */
  firstName?: InputMaybe<Scalars['String']['input']>;
  /** Additional form fields defined by merchant. */
  formFields?: InputMaybe<CustomerFormFieldsInput>;
  /** Last name of the address owner. */
  lastName?: InputMaybe<Scalars['String']['input']>;
  /** Phone number. */
  phone?: InputMaybe<Scalars['String']['input']>;
  /** Postal code for the address. This is only required for certain countries. */
  postalCode?: InputMaybe<Scalars['String']['input']>;
  /** Name of State or Province. */
  stateOrProvince?: InputMaybe<Scalars['String']['input']>;
}

/** Possible response error when attempting to use UpdateCustomerAddress mutation. */
export type UpdateCustomerAddressError = AddressDoesNotExistError | CustomerAddressUpdateError | CustomerNotLoggedInError | ValidationError;

/** Input for updating a customer address. */
export interface UpdateCustomerAddressInput {
  /** ID of the address to update. */
  addressEntityId: Scalars['Int']['input'];
  /** Data fields to update on address. */
  data: UpdateCustomerAddressDataInput;
}

/** Result of UpdateCustomerAddress mutation. */
export interface UpdateCustomerAddressResult {
  __typename: 'UpdateCustomerAddressResult';
  /** Customer address that was updated. */
  address: Maybe<CustomerAddress>;
  /** List of response errors when attempting to update an address. */
  errors: Array<UpdateCustomerAddressError>;
}

/** An error when updating a customer. */
export type UpdateCustomerError = CustomerDoesNotExistError | CustomerNotLoggedInError | EmailAlreadyInUseError | ValidationError;

/** The values to use for customer update operation. */
export interface UpdateCustomerInput {
  /** The company of the customer. */
  company?: InputMaybe<Scalars['String']['input']>;
  /** The email of the customer. */
  email?: InputMaybe<Scalars['String']['input']>;
  /** The first name of the customer. */
  firstName?: InputMaybe<Scalars['String']['input']>;
  /** The custom form fields that the customer filled out. */
  formFields?: InputMaybe<CustomerFormFieldsInput>;
  /** The last name of the customer. */
  lastName?: InputMaybe<Scalars['String']['input']>;
  /** The phone number of the customer. */
  phone?: InputMaybe<Scalars['String']['input']>;
}

/** The result of updating a customer. */
export interface UpdateCustomerResult {
  __typename: 'UpdateCustomerResult';
  /** The customer that was updated. */
  customer: Maybe<Customer>;
  /** The errors, if any, that occured during the update operation. */
  errors: Array<UpdateCustomerError>;
}

/** The behavior type for updating stock levels. */
export enum UpdateStockBehavior {
  ORDER_COMPLETED_OR_SHIPPED = 'ORDER_COMPLETED_OR_SHIPPED',
  ORDER_PLACED = 'ORDER_PLACED'
}

/** Update wishlist input object */
export interface UpdateWishlistInput {
  /** Wishlist data to update */
  data: WishlistUpdateDataInput;
  /** The wishlist id */
  entityId: Scalars['Int']['input'];
}

/** Update wishlist */
export interface UpdateWishlistResult {
  __typename: 'UpdateWishlistResult';
  /** The wishlist */
  result: Wishlist;
}

/** Specifies how to filter by update datetime */
export interface UpdatedAtFilter {
  /** Filter records with a value that's within the specified minute range. Seconds and milliseconds are truncated from the argument. */
  eq?: InputMaybe<Scalars['DateTime']['input']>;
  /** Filter records with the specified field defined (i.e. with any value) or not */
  exists?: InputMaybe<Scalars['BooleanType']['input']>;
  /** Filter records with a value that's strictly greater than the one specified. Seconds and milliseconds are truncated from the argument. */
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** Filter records with a value that's greater than or equal to than the one specified. Seconds and milliseconds are truncated from the argument. */
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Filter records with a value that's less than the one specified. Seconds and milliseconds are truncated from the argument. */
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** Filter records with a value that's less or equal than the one specified. Seconds and milliseconds are truncated from the argument. */
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Filter records with a value that's outside the specified minute range. Seconds and milliseconds are truncated from the argument. */
  neq?: InputMaybe<Scalars['DateTime']['input']>;
}

/** Specifies how to filter by default alt */
export interface UploadAltFilter {
  /** Search the uploads with the specified alt */
  eq?: InputMaybe<Scalars['String']['input']>;
  /** Filter uploads with the specified field defined (i.e. with any value) or not */
  exists?: InputMaybe<Scalars['BooleanType']['input']>;
  /** Search uploads with the specified values as default alt */
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Filter uploads based on a regular expression */
  matches?: InputMaybe<StringMatchesFilter>;
  /** Exclude the uploads with the specified alt */
  neq?: InputMaybe<Scalars['String']['input']>;
  /** Search uploads that do not have the specified values as default alt */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Exclude uploads based on a regular expression */
  notMatches?: InputMaybe<StringMatchesFilter>;
}

/** Specifies how to filter by auhtor */
export interface UploadAuthorFilter {
  /** Filter uploads with the specified field defined (i.e. with any value) or not */
  exists?: InputMaybe<Scalars['BooleanType']['input']>;
  /** Filter uploads based on a regular expression */
  matches?: InputMaybe<StringMatchesFilter>;
  /** Exclude uploads based on a regular expression */
  notMatches?: InputMaybe<StringMatchesFilter>;
}

/** Specifies how to filter by basename */
export interface UploadBasenameFilter {
  /** Filter uploads based on a regular expression */
  matches?: InputMaybe<StringMatchesFilter>;
  /** Exclude uploads based on a regular expression */
  notMatches?: InputMaybe<StringMatchesFilter>;
}

/** Specifies how to filter by colors */
export interface UploadColorsFilter {
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
}

/** Specifies how to filter by copyright */
export interface UploadCopyrightFilter {
  /** Filter records with the specified field defined (i.e. with any value) or not */
  exists?: InputMaybe<Scalars['BooleanType']['input']>;
  /** Filter uploads based on a regular expression */
  matches?: InputMaybe<StringMatchesFilter>;
  /** Exclude uploads based on a regular expression */
  notMatches?: InputMaybe<StringMatchesFilter>;
}

/** Specifies how to filter by creation datetime */
export interface UploadCreatedAtFilter {
  /** Search for uploads with an exact match */
  eq?: InputMaybe<Scalars['DateTime']['input']>;
  /** Filter uploads with a value that's strictly greater than the one specified */
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** Filter uploads with a value that's greater than or equal to the one specified */
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Filter uploads with a value that's less than the one specified */
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** Filter uploads with a value that's less or equal than the one specified */
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Exclude uploads with an exact match */
  neq?: InputMaybe<Scalars['DateTime']['input']>;
}

/** Specifies how to filter by filename */
export interface UploadFilenameFilter {
  /** Filter uploads based on a regular expression */
  matches?: InputMaybe<StringMatchesFilter>;
  /** Exclude uploads based on a regular expression */
  notMatches?: InputMaybe<StringMatchesFilter>;
}

export interface UploadFilter {
  AND?: InputMaybe<Array<InputMaybe<UploadFilter>>>;
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
}

/** Specifies how to filter by format */
export interface UploadFormatFilter {
  /** Search the asset with the specified format */
  eq?: InputMaybe<Scalars['String']['input']>;
  /** Search assets with the specified formats */
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Exclude the asset with the specified format */
  neq?: InputMaybe<Scalars['String']['input']>;
  /** Search assets that do not have the specified formats */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
}

/** Specifies how to filter by height */
export interface UploadHeightFilter {
  /** Search assets with the specified height */
  eq?: InputMaybe<Scalars['IntType']['input']>;
  /** Search all assets larger than the specified height */
  gt?: InputMaybe<Scalars['IntType']['input']>;
  /** Search all assets larger or equal to the specified height */
  gte?: InputMaybe<Scalars['IntType']['input']>;
  /** Search all assets smaller than the specified height */
  lt?: InputMaybe<Scalars['IntType']['input']>;
  /** Search all assets larger or equal to the specified height */
  lte?: InputMaybe<Scalars['IntType']['input']>;
  /** Search assets that do not have the specified height */
  neq?: InputMaybe<Scalars['IntType']['input']>;
}

/** Specifies how to filter by ID */
export interface UploadIdFilter {
  /** Search the asset with the specified ID */
  eq?: InputMaybe<Scalars['UploadId']['input']>;
  /** Search assets with the specified IDs */
  in?: InputMaybe<Array<InputMaybe<Scalars['UploadId']['input']>>>;
  /** Exclude the asset with the specified ID */
  neq?: InputMaybe<Scalars['UploadId']['input']>;
  /** Search assets that do not have the specified IDs */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['UploadId']['input']>>>;
}

/** Specifies how to filter by MD5 */
export interface UploadMd5Filter {
  /** Search the asset with the specified MD5 */
  eq?: InputMaybe<Scalars['String']['input']>;
  /** Search assets with the specified MD5s */
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Exclude the asset with the specified MD5 */
  neq?: InputMaybe<Scalars['String']['input']>;
  /** Search assets that do not have the specified MD5s */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
}

/** Specifies how to filter by mime type */
export interface UploadMimeTypeFilter {
  /** Search the asset with the specified mime type */
  eq?: InputMaybe<Scalars['String']['input']>;
  /** Search assets with the specified mime types */
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Filter uploads based on a regular expression */
  matches?: InputMaybe<StringMatchesFilter>;
  /** Exclude the asset with the specified mime type */
  neq?: InputMaybe<Scalars['String']['input']>;
  /** Search assets that do not have the specified mime types */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Exclude uploads based on a regular expression */
  notMatches?: InputMaybe<StringMatchesFilter>;
}

/** Specifies how to filter by notes */
export interface UploadNotesFilter {
  /** Filter records with the specified field defined (i.e. with any value) or not */
  exists?: InputMaybe<Scalars['BooleanType']['input']>;
  /** Filter uploads based on a regular expression */
  matches?: InputMaybe<StringMatchesFilter>;
  /** Exclude uploads based on a regular expression */
  notMatches?: InputMaybe<StringMatchesFilter>;
}

export enum UploadOrderBy {
  _createdAt_ASC = '_createdAt_ASC',
  _createdAt_DESC = '_createdAt_DESC',
  _updatedAt_ASC = '_updatedAt_ASC',
  _updatedAt_DESC = '_updatedAt_DESC',
  basename_ASC = 'basename_ASC',
  basename_DESC = 'basename_DESC',
  filename_ASC = 'filename_ASC',
  filename_DESC = 'filename_DESC',
  format_ASC = 'format_ASC',
  format_DESC = 'format_DESC',
  id_ASC = 'id_ASC',
  id_DESC = 'id_DESC',
  mimeType_ASC = 'mimeType_ASC',
  mimeType_DESC = 'mimeType_DESC',
  resolution_ASC = 'resolution_ASC',
  resolution_DESC = 'resolution_DESC',
  size_ASC = 'size_ASC',
  size_DESC = 'size_DESC'
}

export enum UploadOrientation {
  landscape = 'landscape',
  portrait = 'portrait',
  square = 'square'
}

/** Specifies how to filter by size */
export interface UploadSizeFilter {
  /** Search assets with the specified size (in bytes) */
  eq?: InputMaybe<Scalars['IntType']['input']>;
  /** Search all assets larger than the specified size (in bytes) */
  gt?: InputMaybe<Scalars['IntType']['input']>;
  /** Search all assets larger or equal to the specified size (in bytes) */
  gte?: InputMaybe<Scalars['IntType']['input']>;
  /** Search all assets smaller than the specified size (in bytes) */
  lt?: InputMaybe<Scalars['IntType']['input']>;
  /** Search all assets larger or equal to the specified size (in bytes) */
  lte?: InputMaybe<Scalars['IntType']['input']>;
  /** Search assets that do not have the specified size (in bytes) */
  neq?: InputMaybe<Scalars['IntType']['input']>;
}

/** Specifies how to filter by tags */
export interface UploadTagsFilter {
  /** Filter uploads linked to all of the specified tags */
  allIn?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Filter uploads linked to at least one of the specified tags */
  anyIn?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Filter uploads linked to the specified tag */
  contains?: InputMaybe<Scalars['String']['input']>;
  /** Search for uploads with an exact match */
  eq?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Filter uploads not linked to any of the specified tags */
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
}

/** Specifies how to filter by default title */
export interface UploadTitleFilter {
  /** Search the asset with the specified title */
  eq?: InputMaybe<Scalars['String']['input']>;
  /** Filter assets with the specified field defined (i.e. with any value) or not */
  exists?: InputMaybe<Scalars['BooleanType']['input']>;
  /** Search assets with the specified as default title */
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Filter uploads based on a regular expression */
  matches?: InputMaybe<StringMatchesFilter>;
  /** Exclude the asset with the specified title */
  neq?: InputMaybe<Scalars['String']['input']>;
  /** Search assets that do not have the specified as default title */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Exclude uploads based on a regular expression */
  notMatches?: InputMaybe<StringMatchesFilter>;
}

export enum UploadType {
  archive = 'archive',
  audio = 'audio',
  image = 'image',
  pdfdocument = 'pdfdocument',
  presentation = 'presentation',
  richtext = 'richtext',
  spreadsheet = 'spreadsheet',
  video = 'video'
}

/** Specifies how to filter by update datetime */
export interface UploadUpdatedAtFilter {
  /** Search for uploads with an exact match */
  eq?: InputMaybe<Scalars['DateTime']['input']>;
  /** Filter uploads with a value that's strictly greater than the one specified */
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  /** Filter uploads with a value that's greater than or equal to the one specified */
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Filter uploads with a value that's less than the one specified */
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  /** Filter uploads with a value that's less or equal than the one specified */
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  /** Exclude uploads with an exact match */
  neq?: InputMaybe<Scalars['DateTime']['input']>;
}

export interface UploadVideoField {
  __typename: 'UploadVideoField';
  alt: Maybe<Scalars['String']['output']>;
  blurUpThumb: Maybe<Scalars['String']['output']>;
  blurhash: Maybe<Scalars['String']['output']>;
  duration: Maybe<Scalars['Int']['output']>;
  framerate: Maybe<Scalars['Int']['output']>;
  height: Scalars['IntType']['output'];
  mp4Url: Maybe<Scalars['String']['output']>;
  muxAssetId: Scalars['String']['output'];
  muxPlaybackId: Scalars['String']['output'];
  streamingUrl: Scalars['String']['output'];
  thumbhash: Maybe<Scalars['String']['output']>;
  thumbnailUrl: Scalars['String']['output'];
  title: Maybe<Scalars['String']['output']>;
  width: Scalars['IntType']['output'];
}


export interface UploadVideoFieldaltArgs {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
}


export interface UploadVideoFieldblurUpThumbArgs {
  imgixParams?: InputMaybe<ImgixParams>;
  punch?: Scalars['Float']['input'];
  quality?: Scalars['Int']['input'];
  size?: Scalars['Int']['input'];
}


export interface UploadVideoFieldmp4UrlArgs {
  exactRes?: InputMaybe<VideoMp4Res>;
  res?: InputMaybe<VideoMp4Res>;
}


export interface UploadVideoFieldthumbnailUrlArgs {
  format?: InputMaybe<MuxThumbnailFormatType>;
}


export interface UploadVideoFieldtitleArgs {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
}

/** Specifies how to filter by width */
export interface UploadWidthFilter {
  /** Search assets with the specified width */
  eq?: InputMaybe<Scalars['IntType']['input']>;
  /** Search all assets larger than the specified width */
  gt?: InputMaybe<Scalars['IntType']['input']>;
  /** Search all assets larger or equal to the specified width */
  gte?: InputMaybe<Scalars['IntType']['input']>;
  /** Search all assets smaller than the specified width */
  lt?: InputMaybe<Scalars['IntType']['input']>;
  /** Search all assets larger or equal to the specified width */
  lte?: InputMaybe<Scalars['IntType']['input']>;
  /** Search assets that do not have the specified width */
  neq?: InputMaybe<Scalars['IntType']['input']>;
}

/** Url field */
export interface UrlField {
  __typename: 'UrlField';
  /** CDN url to fetch assets. */
  cdnUrl: Scalars['String']['output'];
  /** Checkout url. */
  checkoutUrl: Maybe<Scalars['String']['output']>;
  /** Store url. */
  vanityUrl: Scalars['String']['output'];
}

export interface User {
  __typename: 'User';
  createdAt: Maybe<Scalars['DateTime']['output']>;
  email: Maybe<Scalars['String']['output']>;
  emailVerified: Maybe<Scalars['Boolean']['output']>;
  familyName: Maybe<Scalars['String']['output']>;
  givenName: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  intercomUserHash: Maybe<Scalars['String']['output']>;
  lastLogin: Maybe<Scalars['DateTime']['output']>;
  loginsCount: Maybe<Scalars['Int']['output']>;
  memberships: Array<Membership>;
  name: Maybe<Scalars['String']['output']>;
  nickname: Maybe<Scalars['String']['output']>;
  onboarding: Maybe<UserOnboarding>;
  organizations: Array<Organization>;
  phoneNumber: Maybe<Scalars['String']['output']>;
  phoneVerified: Maybe<Scalars['Boolean']['output']>;
  picture: Maybe<Scalars['String']['output']>;
  updatedAt: Maybe<Scalars['DateTime']['output']>;
  username: Maybe<Scalars['String']['output']>;
}

export interface UserLogoutPayload {
  __typename: 'UserLogoutPayload';
  success: Scalars['Boolean']['output'];
}

export interface UserOnboarding {
  __typename: 'UserOnboarding';
  id: Scalars['ID']['output'];
  /** Onboarding banner we show on the design hub / index page */
  seenDesignIndexPageOnboardingBanner: Maybe<Scalars['Boolean']['output']>;
  /** Message we show first time a user sees a design request */
  seenDesignRequestDraftOnboarding: Maybe<Scalars['Boolean']['output']>;
  /** Onboarding banner we show on the inventory hub / index page */
  seenInventoryIndexPageOnboardingBanner: Maybe<Scalars['Boolean']['output']>;
}

export interface UserOnboardingUpdateInput {
  seenDesignIndexPageOnboardingBanner?: InputMaybe<Scalars['Boolean']['input']>;
  seenDesignRequestDraftOnboarding?: InputMaybe<Scalars['Boolean']['input']>;
  seenInventoryIndexPageOnboardingBanner?: InputMaybe<Scalars['Boolean']['input']>;
}

export interface UserOnboardingUpdatePayload {
  __typename: 'UserOnboardingUpdatePayload';
  userOnboarding: Maybe<UserOnboarding>;
}

export interface UserOrganizationCreateInput {
  name: Scalars['String']['input'];
}

export interface UserOrganizationCreatePayload {
  __typename: 'UserOrganizationCreatePayload';
  membership: Maybe<Membership>;
  organization: Maybe<Organization>;
}

export interface UserSetOrganizationInput {
  membershipId: Scalars['ID']['input'];
  organizationId: Scalars['ID']['input'];
}

export interface UserSetOrganizationPayload {
  __typename: 'UserSetOrganizationPayload';
  membershipId: Maybe<Scalars['String']['output']>;
  organizationId: Maybe<Scalars['String']['output']>;
}

/** Validation error that occurred during a graphql request */
export interface ValidationError extends Error {
  __typename: 'ValidationError';
  /** A description of the error */
  message: Scalars['String']['output'];
  /** Path to the field that caused the error, if applicable */
  path: Array<Scalars['String']['output']>;
}

/** Variant */
export interface Variant extends Node {
  __typename: 'Variant';
  /** Default image for a variant. */
  defaultImage: Maybe<Image>;
  /** The variant's depth. If a depth was not explicitly specified on the variant, this will be the product's depth. */
  depth: Maybe<Measurement>;
  /** Id of the variant. */
  entityId: Scalars['Int']['output'];
  /** Global trade item number. */
  gtin: Maybe<Scalars['String']['output']>;
  /** The variant's height. If a height was not explicitly specified on the variant, this will be the product's height. */
  height: Maybe<Measurement>;
  /** The ID of an object */
  id: Scalars['ID']['output'];
  /** Variant inventory */
  inventory: Maybe<VariantInventory>;
  /** Whether the product can be purchased */
  isPurchasable: Scalars['Boolean']['output'];
  /** Metafield data related to a variant. */
  metafields: MetafieldConnection;
  /** Manufacturer part number. */
  mpn: Maybe<Scalars['String']['output']>;
  /** The options which define a variant. */
  options: OptionConnection;
  /** Variant prices */
  prices: Maybe<Prices>;
  /** Product options that compose this variant. */
  productOptions: ProductOptionConnection;
  /** Sku of the variant. */
  sku: Scalars['String']['output'];
  /** Universal product code. */
  upc: Maybe<Scalars['String']['output']>;
  /** The variant's weight. If a weight was not explicitly specified on the variant, this will be the product's weight. */
  weight: Maybe<Measurement>;
  /** The variant's width. If a width was not explicitly specified on the variant, this will be the product's width. */
  width: Maybe<Measurement>;
}


/** Variant */
export interface VariantmetafieldsArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  keys?: InputMaybe<Array<Scalars['String']['input']>>;
  last?: InputMaybe<Scalars['Int']['input']>;
  namespace: Scalars['String']['input'];
}


/** Variant */
export interface VariantoptionsArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
}


/** Variant */
export interface VariantpricesArgs {
  currencyCode?: InputMaybe<currencyCode>;
  includeTax?: InputMaybe<Scalars['Boolean']['input']>;
}


/** Variant */
export interface VariantproductOptionsArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
}

/** A connection to a list of items. */
export interface VariantConnection {
  __typename: 'VariantConnection';
  /** A list of edges. */
  edges: Maybe<Array<VariantEdge>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
}

/** An edge in a connection. */
export interface VariantEdge {
  __typename: 'VariantEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: Variant;
}

/** Variant Inventory */
export interface VariantInventory {
  __typename: 'VariantInventory';
  /** Aggregated product variant inventory information. This data may not be available if not set or if the store's Inventory Settings have disabled displaying stock levels on the storefront. */
  aggregated: Maybe<Aggregated>;
  /** Inventory by locations. */
  byLocation: Maybe<LocationConnection>;
  /** Indicates whether this product is in stock. */
  isInStock: Scalars['Boolean']['output'];
}


/** Variant Inventory */
export interface VariantInventorybyLocationArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  distanceFilter?: InputMaybe<DistanceFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  locationEntityCodes?: InputMaybe<Array<Scalars['String']['input']>>;
  locationEntityIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  locationEntityServiceTypeIds?: InputMaybe<Array<Scalars['String']['input']>>;
  locationEntityTypeIds?: InputMaybe<Array<Scalars['String']['input']>>;
}

export enum VideoMp4Res {
  high = 'high',
  low = 'low',
  medium = 'medium'
}

/** WebPage details. */
export interface WebPage {
  /** Unique ID for the web page. */
  entityId: Scalars['Int']['output'];
  /** Whether or not the page should be visible in the navigation menu. */
  isVisibleInNavigation: Scalars['Boolean']['output'];
  /** Page name. */
  name: Scalars['String']['output'];
  /** Unique ID for the parent page. */
  parentEntityId: Maybe<Scalars['Int']['output']>;
  /** Page SEO details. */
  seo: SeoDetails;
}

/** Web page type */
export enum WebPageType {
  BLOG = 'BLOG',
  CONTACT = 'CONTACT',
  LINK = 'LINK',
  NORMAL = 'NORMAL',
  RAW = 'RAW'
}

/** Object containing filters for querying web pages */
export interface WebPagesFiltersInput {
  /** Ids of the expected pages. */
  entityIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  /** Whether the expected pages are visible in the navigation bar. */
  isVisibleInNavigation?: InputMaybe<Scalars['Boolean']['input']>;
  /** Type of the expected pages. */
  pageType?: InputMaybe<WebPageType>;
}

/** A wishlist */
export interface Wishlist {
  __typename: 'Wishlist';
  /** The wishlist id. */
  entityId: Scalars['Int']['output'];
  /** Is the wishlist public? */
  isPublic: Scalars['Boolean']['output'];
  /** A list of the wishlist items */
  items: WishlistItemConnection;
  /** The wishlist name. */
  name: Scalars['String']['output'];
  /** The wishlist token. */
  token: Scalars['String']['output'];
}


/** A wishlist */
export interface WishlistitemsArgs {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  hideOutOfStock?: InputMaybe<Scalars['Boolean']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
}

/** A connection to a list of items. */
export interface WishlistConnection {
  __typename: 'WishlistConnection';
  /** A list of edges. */
  edges: Maybe<Array<WishlistEdge>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
}

/** An edge in a connection. */
export interface WishlistEdge {
  __typename: 'WishlistEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: Wishlist;
}

/** Wishlist filters input object */
export interface WishlistFiltersInput {
  /** A wishlist ids filter. */
  entityIds?: InputMaybe<Array<Scalars['Int']['input']>>;
}

/** The wishlist item */
export interface WishlistItem {
  __typename: 'WishlistItem';
  /** Wishlist item id. */
  entityId: Scalars['Int']['output'];
  /** A product included in the wishlist. */
  product: Product;
  /** An id of the product from the wishlist. */
  productEntityId: Scalars['Int']['output'];
  /** An id of the specific product variant from the wishlist. */
  variantEntityId: Maybe<Scalars['Int']['output']>;
}

/** A connection to a list of items. */
export interface WishlistItemConnection {
  __typename: 'WishlistItemConnection';
  /** A list of edges. */
  edges: Maybe<Array<WishlistItemEdge>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
}

/** An edge in a connection. */
export interface WishlistItemEdge {
  __typename: 'WishlistItemEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node: WishlistItem;
}

/** Wishlist item input object */
export interface WishlistItemInput {
  /** An id of the product from the wishlist. */
  productEntityId: Scalars['Int']['input'];
  /** An id of the specific product variant from the wishlist. */
  variantEntityId?: InputMaybe<Scalars['Int']['input']>;
}

/** The wishlist mutations. */
export interface WishlistMutations {
  __typename: 'WishlistMutations';
  /** Add wishlist items */
  addWishlistItems: Maybe<AddWishlistItemsResult>;
  /** Create wishlist */
  createWishlist: Maybe<CreateWishlistResult>;
  /** Delete wishlist items */
  deleteWishlistItems: Maybe<DeleteWishlistItemsResult>;
  /** Delete wishlist */
  deleteWishlists: Maybe<DeleteWishlistResult>;
  /** Update wishlist */
  updateWishlist: Maybe<UpdateWishlistResult>;
}


/** The wishlist mutations. */
export interface WishlistMutationsaddWishlistItemsArgs {
  input: AddWishlistItemsInput;
}


/** The wishlist mutations. */
export interface WishlistMutationscreateWishlistArgs {
  input: CreateWishlistInput;
}


/** The wishlist mutations. */
export interface WishlistMutationsdeleteWishlistItemsArgs {
  input: DeleteWishlistItemsInput;
}


/** The wishlist mutations. */
export interface WishlistMutationsdeleteWishlistsArgs {
  input: DeleteWishlistsInput;
}


/** The wishlist mutations. */
export interface WishlistMutationsupdateWishlistArgs {
  input: UpdateWishlistInput;
}

/** Wishlist data to update */
export interface WishlistUpdateDataInput {
  /** A new wishlist visibility mode */
  isPublic?: InputMaybe<Scalars['Boolean']['input']>;
  /** A new wishlist name */
  name?: InputMaybe<Scalars['String']['input']>;
}

/** Country Code */
export enum countryCode {
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
export enum currencyCode {
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

export interface focalPoint {
  __typename: 'focalPoint';
  x: Scalars['FloatType']['output'];
  y: Scalars['FloatType']['output'];
}

/** Blog post sort */
export enum sortBy {
  NEWEST = 'NEWEST',
  OLDEST = 'OLDEST'
}

export type NotificationsSlideoverGetDataQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
}>;


export type NotificationsSlideoverGetDataQuery = { __typename: 'Query', viewer: { __typename: 'Membership', id: string, notifications: { __typename: 'NotificationConnection', edges: Array<{ __typename: 'NotificationEdge', node: { __typename: 'Notification', id: string, createdAt: any, channels: Array<{ __typename: 'NotificationChannelEmail', id: string } | { __typename: 'NotificationChannelWeb', message: string, ctaText: string | null, ctaUrl: string | null, seenAt: any | null, id: string } | null> } | null } | null> | null, pageInfo: { __typename: 'PageInfo', hasNextPage: boolean, endCursor: string | null } } | null } | null };

export type NotificationsButtonGetDataQueryVariables = Exact<{ [key: string]: never; }>;


export type NotificationsButtonGetDataQuery = { __typename: 'Query', viewer: { __typename: 'Membership', id: string, unseenWebNotificationsCount: number } | null };

export type ClosetBrandIndexPageColorsGetDataQueryVariables = Exact<{ [key: string]: never; }>;


export type ClosetBrandIndexPageColorsGetDataQuery = { __typename: 'Query', viewer: { __typename: 'Membership', id: string, organization: { __typename: 'Organization', id: string, brand: { __typename: 'OrganizationBrand', id: string, colors: Array<{ __typename: 'Color', id: string, name: string, hex: string, cmykC: number | null, cmykM: number | null, cmykY: number | null, cmykK: number | null }> } | null } } | null };

export type ClosetBrandIndexPageColorsColorPreviewColorFragment = { __typename: 'Color', id: string, name: string, hex: string, cmykC: number | null, cmykM: number | null, cmykY: number | null, cmykK: number | null };

export type UseClosetBrandIndexPageColorsCreateColorMutationVariables = Exact<{
  input: OrganizationBrandColorCreateInput;
}>;


export type UseClosetBrandIndexPageColorsCreateColorMutation = { __typename: 'Mutation', organizationBrandColorCreate: { __typename: 'OrganizationBrandColorCreatePayload', brand: { __typename: 'OrganizationBrand', id: string } | null } | null };

export type UseClosetBrandIndexPageColorsUpdateColorMutationVariables = Exact<{
  input: OrganizationBrandColorUpdateInput;
}>;


export type UseClosetBrandIndexPageColorsUpdateColorMutation = { __typename: 'Mutation', organizationBrandColorUpdate: { __typename: 'OrganizationBrandColorUpdatePayload', brand: { __typename: 'OrganizationBrand', id: string } | null } | null };

export type UseClosetBrandIndexPageColorsDeleteColorMutationVariables = Exact<{
  input: OrganizationBrandColorDeleteInput;
}>;


export type UseClosetBrandIndexPageColorsDeleteColorMutation = { __typename: 'Mutation', organizationBrandColorDelete: { __typename: 'OrganizationBrandColorDeletePayload', brand: { __typename: 'OrganizationBrand', id: string } | null } | null };

export type ClosetBrandIndexPageFilesQueryVariables = Exact<{
  first: Scalars['Int']['input'];
  after?: InputMaybe<Scalars['String']['input']>;
}>;


export type ClosetBrandIndexPageFilesQuery = { __typename: 'Query', viewer: { __typename: 'Membership', id: string, organization: { __typename: 'Organization', id: string, brand: { __typename: 'OrganizationBrand', id: string, fileUploadDirectory: string, files: { __typename: 'FileConnection', edges: Array<{ __typename: 'FileEdge', node: { __typename: 'FileImage', width: number, height: number, id: string, createdAt: any, url: string, name: string, format: string } | { __typename: 'FilePdf', id: string, createdAt: any, url: string, name: string, format: string } | { __typename: 'FileUnknown', id: string, createdAt: any, url: string, name: string, format: string } | null } | null> | null } } | null } } | null };

export type UseClosetBrandIndexPageCreateFilesMutationVariables = Exact<{
  input: OrganizationBrandFileCreateBatchInput;
}>;


export type UseClosetBrandIndexPageCreateFilesMutation = { __typename: 'Mutation', organizationBrandFileCreateBatch: { __typename: 'OrganizationBrandFileCreateBatchPayload', brand: { __typename: 'OrganizationBrand', id: string } | null } | null };

export type UseClosetBrandIndexPageDeleteFilesMutationVariables = Exact<{
  input: OrganizationBrandFileDeleteBatchInput;
}>;


export type UseClosetBrandIndexPageDeleteFilesMutation = { __typename: 'Mutation', organizationBrandFileDeleteBatch: { __typename: 'OrganizationBrandFileDeleteBatchPayload', brand: { __typename: 'OrganizationBrand', id: string } | null } | null };

export type ClosetTabApprovedDesignRequestGetDataQueryVariables = Exact<{
  first: Scalars['Int']['input'];
  after?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<MembershipDesignRequestsFilterInput>;
}>;


export type ClosetTabApprovedDesignRequestGetDataQuery = { __typename: 'Query', viewer: { __typename: 'Membership', id: string, hasDesignProducts: boolean, designRequests: { __typename: 'DesignRequestConnection', edges: Array<{ __typename: 'DesignRequestEdge', node: { __typename: 'DesignRequest', id: string, name: string, updatedAt: any | null, status: DesignRequestStatus, humanizedStatus: string, previewImageUrl: string | null } | null } | null> | null } } | null };

export type ClosetTabInProgressDesignRequestsGetDataQueryVariables = Exact<{
  first: Scalars['Int']['input'];
  after?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<MembershipDesignRequestsFilterInput>;
}>;


export type ClosetTabInProgressDesignRequestsGetDataQuery = { __typename: 'Query', viewer: { __typename: 'Membership', id: string, hasDesignRequests: boolean, designRequests: { __typename: 'DesignRequestConnection', edges: Array<{ __typename: 'DesignRequestEdge', node: { __typename: 'DesignRequest', id: string, name: string, updatedAt: any | null, status: DesignRequestStatus, humanizedStatus: string, previewImageUrl: string | null } | null } | null> | null } } | null };

export type ClosetTabAllRecentGridGetDataQueryVariables = Exact<{ [key: string]: never; }>;


export type ClosetTabAllRecentGridGetDataQuery = { __typename: 'Query', viewer: { __typename: 'Membership', designRequests: { __typename: 'DesignRequestConnection', edges: Array<{ __typename: 'DesignRequestEdge', node: { __typename: 'DesignRequest', id: string, name: string, previewImageUrl: string | null } | null } | null> | null } } | null };

export type ClosetDesignFiltersGetDataQueryVariables = Exact<{ [key: string]: never; }>;


export type ClosetDesignFiltersGetDataQuery = { __typename: 'Query', viewer: { __typename: 'Membership', id: string, organization: { __typename: 'Organization', id: string, memberships: Array<{ __typename: 'Membership', id: string, user: { __typename: 'User', id: string, name: string | null, picture: string | null } | null }> } } | null };

export type ClosetDesignIndexPageDesignRequestCardDesignRequestFragment = { __typename: 'DesignRequest', id: string, name: string, updatedAt: any | null, status: DesignRequestStatus, humanizedStatus: string, previewImageUrl: string | null };

export type ClosetTabApprovedDesignsGetDataQueryVariables = Exact<{
  first: Scalars['Int']['input'];
  after?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<MembershipDesignRequestsFilterInput>;
}>;


export type ClosetTabApprovedDesignsGetDataQuery = { __typename: 'Query', viewer: { __typename: 'Membership', id: string, hasDesignProducts: boolean, designRequests: { __typename: 'DesignRequestConnection', edges: Array<{ __typename: 'DesignRequestEdge', node: { __typename: 'DesignRequest', id: string, name: string, updatedAt: any | null, status: DesignRequestStatus, humanizedStatus: string, previewImageUrl: string | null } | null } | null> | null } } | null };

export type ClosetTabArchivedDesignsGetDataQueryVariables = Exact<{
  first: Scalars['Int']['input'];
  after?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<MembershipDesignRequestsFilterInput>;
}>;


export type ClosetTabArchivedDesignsGetDataQuery = { __typename: 'Query', viewer: { __typename: 'Membership', id: string, hasDesignProducts: boolean, designRequests: { __typename: 'DesignRequestConnection', edges: Array<{ __typename: 'DesignRequestEdge', node: { __typename: 'DesignRequest', id: string, name: string, updatedAt: any | null, status: DesignRequestStatus, humanizedStatus: string, previewImageUrl: string | null } | null } | null> | null } } | null };

export type ClosetTabDesignRequestsGetDataQueryVariables = Exact<{
  first: Scalars['Int']['input'];
  after?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<MembershipDesignRequestsFilterInput>;
}>;


export type ClosetTabDesignRequestsGetDataQuery = { __typename: 'Query', viewer: { __typename: 'Membership', id: string, hasDesignRequests: boolean, designRequests: { __typename: 'DesignRequestConnection', edges: Array<{ __typename: 'DesignRequestEdge', node: { __typename: 'DesignRequest', id: string, name: string, updatedAt: any | null, status: DesignRequestStatus, humanizedStatus: string, previewImageUrl: string | null } | null } | null> | null } } | null };

export type DesignRequestActionsDesignRequestFragment = { __typename: 'DesignRequest', id: string, status: DesignRequestStatus };

export type UseDesignRequestActionsRejectDesignRequestMutationVariables = Exact<{
  input: DesignRequestRejectInput;
}>;


export type UseDesignRequestActionsRejectDesignRequestMutation = { __typename: 'Mutation', designRequestReject: { __typename: 'DesignRequestRejectPayload', designRequest: { __typename: 'DesignRequest', id: string } | null } | null };

export type UseDesignRequestActionsSubmitDesignRequestMutationVariables = Exact<{
  input: DesignRequestSubmitInput;
}>;


export type UseDesignRequestActionsSubmitDesignRequestMutation = { __typename: 'Mutation', designRequestSubmit: { __typename: 'DesignRequestSubmitPayload', designRequest: { __typename: 'DesignRequest', id: string } | null } | null };

export type DesignRequestTitleDesignRequesetFragment = { __typename: 'DesignRequest', id: string, name: string, createdAt: any, status: DesignRequestStatus, humanizedStatus: string };

export type UseUpdateNameUpdateNameMutationVariables = Exact<{
  input: DesignRequestUpdateInput;
}>;


export type UseUpdateNameUpdateNameMutation = { __typename: 'Mutation', designRequestUpdate: { __typename: 'DesignRequestUpdatePayload', designRequest: { __typename: 'DesignRequest', id: string } | null } | null };

export type DesignRequestShowPageMainHeaderPageGetDataQueryVariables = Exact<{
  designId: Scalars['ID']['input'];
}>;


export type DesignRequestShowPageMainHeaderPageGetDataQuery = { __typename: 'Query', designRequest: { __typename: 'DesignRequest', id: string, status: DesignRequestStatus, name: string, createdAt: any, humanizedStatus: string } | null };

export type DesignRequestApprovedMessageGetDataQueryVariables = Exact<{
  designRequestId: Scalars['ID']['input'];
}>;


export type DesignRequestApprovedMessageGetDataQuery = { __typename: 'Query', designRequest: { __typename: 'DesignRequest', id: string, designProducts: Array<{ __typename: 'DesignProduct', id: string, name: string, description: string | null, primaryImageFile: { __typename: 'FileImage', id: string, url: string, width: number, height: number } | null }>, orders: Array<{ __typename: 'Order', id: string, humanOrderId: string, humanPaymentStatus: string, paymentStatus: OrderPaymentStatus }> } | null };

export type ApproveProofSlideOverGetDataQueryVariables = Exact<{
  designProofId: Scalars['ID']['input'];
}>;


export type ApproveProofSlideOverGetDataQuery = { __typename: 'Query', designProof: { __typename: 'DesignProof', id: string, designRequestId: string | null, primaryImageFile: { __typename: 'FileImage', id: string, url: string, width: number, height: number } | null, designRequest: { __typename: 'DesignRequest', id: string, name: string } | null } | null };

export type UseApproveProofSildeOverApproveDesignMutationVariables = Exact<{
  input: DesignRequestApproveInput;
}>;


export type UseApproveProofSildeOverApproveDesignMutation = { __typename: 'Mutation', designRequestApprove: { __typename: 'DesignRequestApprovePayload', designRequest: { __typename: 'DesignRequest', id: string } | null } | null };

export type DesignProofCardDesignProofFragment = { __typename: 'DesignProof', id: string, createdAt: any, primaryImageFile: { __typename: 'FileImage', id: string, url: string, width: number, height: number } | null, artist: { __typename: 'Membership', id: string, user: { __typename: 'User', id: string, name: string | null } | null } | null };

export type DesignProofPreviewGetDataQueryVariables = Exact<{
  designProofId: Scalars['ID']['input'];
}>;


export type DesignProofPreviewGetDataQuery = { __typename: 'Query', designProof: { __typename: 'DesignProof', id: string, createdAt: any, colors: Array<{ __typename: 'DesignProofColor', id: string, catalogProductColorId: string, hexCode: string | null, name: string | null, images: Array<{ __typename: 'FileImage', id: string, url: string, width: number, height: number }> }> } | null };

export type DesignProofsListGetDataQueryVariables = Exact<{
  designRequestId: Scalars['ID']['input'];
}>;


export type DesignProofsListGetDataQuery = { __typename: 'Query', designRequest: { __typename: 'DesignRequest', id: string, status: DesignRequestStatus, approvedProof: { __typename: 'DesignProof', id: string, createdAt: any, primaryImageFile: { __typename: 'FileImage', id: string, url: string, width: number, height: number } | null } | null, proofs: Array<{ __typename: 'DesignProof', id: string, createdAt: any, primaryImageFile: { __typename: 'FileImage', id: string, url: string, width: number, height: number } | null }> } | null };

export type DesignRequestActivityActivitySubscriptionVariables = Exact<{
  designRequestId: Scalars['ID']['input'];
}>;


export type DesignRequestActivityActivitySubscription = { __typename: 'Subscription', designRequestHistoryItemAdded: { __typename: 'DesignRequestHistoryItemAddedPayload', historyItemAdded: boolean } | null };

export type DesignRequestActivityGetDataQueryVariables = Exact<{
  designRequestId: Scalars['ID']['input'];
}>;


export type DesignRequestActivityGetDataQuery = { __typename: 'Query', viewer: { __typename: 'Membership', id: string, user: { __typename: 'User', id: string, name: string | null, picture: string | null } | null } | null, designRequest: { __typename: 'DesignRequest', id: string, status: DesignRequestStatus, fileUploadDirectory: string, history: Array<{ __typename: 'ConversationMessage', id: string, message: string, createdAt: any, viewerIsSender: boolean, files: Array<{ __typename: 'FileImage', url: string, width: number, height: number, id: string, humanizedBytes: string, name: string, fileType: FileType } | { __typename: 'FilePdf', id: string, humanizedBytes: string, name: string, url: string, fileType: FileType } | { __typename: 'FileUnknown', id: string, humanizedBytes: string, name: string, url: string, fileType: FileType }>, sender: { __typename: 'Membership', id: string, user: { __typename: 'User', id: string, picture: string | null, name: string | null } | null } | null } | { __typename: 'DesignProof', id: string, createdAt: any, artist: { __typename: 'Membership', id: string, user: { __typename: 'User', id: string, name: string | null } | null } | null, primaryImageFile: { __typename: 'FileImage', id: string, url: string, width: number, height: number } | null } | { __typename: 'DesignRequestHistoryItemDesignRequestEvent', id: string, timestamp: any, method: DesignRequestHistoryItemDesignRequestEventMethod, actor: { __typename: 'Membership', id: string, user: { __typename: 'User', id: string, name: string | null, picture: string | null } | null } | null } | { __typename: 'DesignRequestRevisionRequest', id: string, createdAt: any, description: string, files: Array<{ __typename: 'FileImage', url: string, width: number, height: number, id: string, humanizedBytes: string, name: string, fileType: FileType } | { __typename: 'FilePdf', id: string, humanizedBytes: string, name: string, url: string, fileType: FileType } | { __typename: 'FileUnknown', id: string, humanizedBytes: string, name: string, url: string, fileType: FileType }>, membership: { __typename: 'Membership', id: string, user: { __typename: 'User', id: string, name: string | null } | null } | null }> } | null };

export type DesignRequestHistoryDesignRequestFragment = { __typename: 'DesignRequest', id: string, history: Array<{ __typename: 'ConversationMessage', id: string, message: string, createdAt: any, viewerIsSender: boolean, files: Array<{ __typename: 'FileImage', url: string, width: number, height: number, id: string, humanizedBytes: string, name: string, fileType: FileType } | { __typename: 'FilePdf', id: string, humanizedBytes: string, name: string, url: string, fileType: FileType } | { __typename: 'FileUnknown', id: string, humanizedBytes: string, name: string, url: string, fileType: FileType }>, sender: { __typename: 'Membership', id: string, user: { __typename: 'User', id: string, picture: string | null, name: string | null } | null } | null } | { __typename: 'DesignProof', id: string, createdAt: any, artist: { __typename: 'Membership', id: string, user: { __typename: 'User', id: string, name: string | null } | null } | null, primaryImageFile: { __typename: 'FileImage', id: string, url: string, width: number, height: number } | null } | { __typename: 'DesignRequestHistoryItemDesignRequestEvent', id: string, timestamp: any, method: DesignRequestHistoryItemDesignRequestEventMethod, actor: { __typename: 'Membership', id: string, user: { __typename: 'User', id: string, name: string | null, picture: string | null } | null } | null } | { __typename: 'DesignRequestRevisionRequest', id: string, createdAt: any, description: string, files: Array<{ __typename: 'FileImage', url: string, width: number, height: number, id: string, humanizedBytes: string, name: string, fileType: FileType } | { __typename: 'FilePdf', id: string, humanizedBytes: string, name: string, url: string, fileType: FileType } | { __typename: 'FileUnknown', id: string, humanizedBytes: string, name: string, url: string, fileType: FileType }>, membership: { __typename: 'Membership', id: string, user: { __typename: 'User', id: string, name: string | null } | null } | null }> };

export type DesignRequestMessageInputViewerFragment = { __typename: 'Membership', id: string, user: { __typename: 'User', id: string, name: string | null, picture: string | null } | null };

export type DesignRequestMessageInputDesignRequestFragment = { __typename: 'DesignRequest', id: string, fileUploadDirectory: string };

export type UseDesignRequestMessageInputAddCommentMutationVariables = Exact<{
  input: DesignRequestConversationMessageCreateInput;
}>;


export type UseDesignRequestMessageInputAddCommentMutation = { __typename: 'Mutation', designRequestConversationMessageCreate: { __typename: 'DesignRequestConversationMessageCreatePayload', designRequest: { __typename: 'DesignRequest', id: string } | null } | null };

export type UseDesignRequestMessageInputSubmitRevisionRequestMutationVariables = Exact<{
  input: DesignRequestRevisionRequestCreateInput;
}>;


export type UseDesignRequestMessageInputSubmitRevisionRequestMutation = { __typename: 'Mutation', designRequestRevisionRequestCreate: { __typename: 'DesignRequestRevisionRequestCreatePayload', designRequest: { __typename: 'DesignRequest', id: string } | null } | null };

export type DesignRequestAssociatedProductsGetDataQueryVariables = Exact<{
  designRequestId: Scalars['ID']['input'];
}>;


export type DesignRequestAssociatedProductsGetDataQuery = { __typename: 'Query', designRequest: { __typename: 'DesignRequest', id: string, designProducts: Array<{ __typename: 'DesignProduct', id: string, name: string, primaryImageFile: { __typename: 'FileImage', id: string, url: string, width: number, height: number } | null }> } | null };

export type DesignRequestCustomerCardGetDataQueryVariables = Exact<{
  designRequestId: Scalars['ID']['input'];
}>;


export type DesignRequestCustomerCardGetDataQuery = { __typename: 'Query', designRequest: { __typename: 'DesignRequest', id: string, membership: { __typename: 'Membership', id: string, user: { __typename: 'User', id: string, name: string | null, picture: string | null } | null, organization: { __typename: 'Organization', id: string, name: string | null } } | null } | null };

export type DesignRequestOrderListOrderFragment = { __typename: 'Order', id: string, humanOrderId: string };

export type DesignRequestOverviewGetDataQueryVariables = Exact<{
  designRequestId: Scalars['ID']['input'];
}>;


export type DesignRequestOverviewGetDataQuery = { __typename: 'Query', designRequest: { __typename: 'DesignRequest', id: string, status: DesignRequestStatus, description: string | null, proofs: Array<{ __typename: 'DesignProof', id: string }>, designRequestProduct: { __typename: 'DesignRequestProduct', id: string, colors: Array<{ __typename: 'DesignRequestProductColors', hexCode: string | null, name: string | null }>, catalogProduct: { __typename: 'CatalogProduct', id: string, name: string, slug: string, primaryImage: { __typename: 'CatalogProductImage', url: string } | null, brand: { __typename: 'CatalogBrand', id: string, name: string, slug: string } | null } | null }, orders: Array<{ __typename: 'Order', id: string, humanOrderId: string }>, files: Array<{ __typename: 'FileImage', width: number, height: number, id: string, humanizedBytes: string, name: string, url: string, fileType: FileType } | { __typename: 'FilePdf', id: string, humanizedBytes: string, name: string, url: string, fileType: FileType } | { __typename: 'FileUnknown', id: string, humanizedBytes: string, name: string, url: string, fileType: FileType }>, designRequestLocations: Array<{ __typename: 'DesignRequestDesignLocation', id: string, description: string | null, placement: string | null, files: Array<{ __typename: 'FileImage', width: number, height: number, id: string, humanizedBytes: string, name: string, url: string, fileType: FileType } | { __typename: 'FilePdf', id: string, humanizedBytes: string, name: string, url: string, fileType: FileType } | { __typename: 'FileUnknown', id: string, humanizedBytes: string, name: string, url: string, fileType: FileType }> }> } | null };

export type DesignRequestOverviewProductListDesignRequestProductFragment = { __typename: 'DesignRequestProduct', id: string, colors: Array<{ __typename: 'DesignRequestProductColors', hexCode: string | null, name: string | null }>, catalogProduct: { __typename: 'CatalogProduct', id: string, name: string, slug: string, primaryImage: { __typename: 'CatalogProductImage', url: string } | null, brand: { __typename: 'CatalogBrand', id: string, name: string, slug: string } | null } | null };

export type DesignRequestSubmittedDesignRequestGeneralInformationFragment = { __typename: 'DesignRequest', id: string, description: string | null, files: Array<{ __typename: 'FileImage', width: number, height: number, id: string, humanizedBytes: string, name: string, url: string, fileType: FileType } | { __typename: 'FilePdf', id: string, humanizedBytes: string, name: string, url: string, fileType: FileType } | { __typename: 'FileUnknown', id: string, humanizedBytes: string, name: string, url: string, fileType: FileType }>, designRequestLocations: Array<{ __typename: 'DesignRequestDesignLocation', id: string, description: string | null, placement: string | null, files: Array<{ __typename: 'FileImage', width: number, height: number, id: string, humanizedBytes: string, name: string, url: string, fileType: FileType } | { __typename: 'FilePdf', id: string, humanizedBytes: string, name: string, url: string, fileType: FileType } | { __typename: 'FileUnknown', id: string, humanizedBytes: string, name: string, url: string, fileType: FileType }> }> };

export type DesignRequestShowPageArhiveDesignRequestVariables = Exact<{
  input: DesignRequestArchiveInput;
}>;


export type DesignRequestShowPageArhiveDesignRequest = { __typename: 'Mutation', designRequestArchive: { __typename: 'DesignRequestArchivePayload', designRequest: { __typename: 'DesignRequest', id: string } | null } | null };

export type DesignAssignPageAssignDesignMutationVariables = Exact<{
  input: DesignRequestAssignInput;
}>;


export type DesignAssignPageAssignDesignMutation = { __typename: 'Mutation', designRequestAssign: { __typename: 'DesignRequestAssignPayload', designRequest: { __typename: 'DesignRequest', id: string } | null } | null };

export type DesignRequestProofCreatePageGetDataQueryVariables = Exact<{
  designId: Scalars['ID']['input'];
}>;


export type DesignRequestProofCreatePageGetDataQuery = { __typename: 'Query', designRequest: { __typename: 'DesignRequest', id: string, fileUploadDirectory: string, designRequestProduct: { __typename: 'DesignRequestProduct', id: string, colors: Array<{ __typename: 'DesignRequestProductColors', name: string | null, hexCode: string | null, catalogProductColorId: string }> } } | null };

export type ClosetInventoryIndexPageProductCardDesignProductFragment = { __typename: 'DesignProduct', id: string, name: string, inStockQty: number, inProductionQty: number, colors: Array<{ __typename: 'DesignProductColor', id: string, hex: string | null, name: string | null }>, primaryImageFile: { __typename: 'FileImage', id: string, url: string, width: number, height: number } | null };

export type ClosetInventoryIndexPageInventoryListGetDataQueryVariables = Exact<{
  first: Scalars['Int']['input'];
  after?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<MembershipDesignProductsFilterInput>;
}>;


export type ClosetInventoryIndexPageInventoryListGetDataQuery = { __typename: 'Query', viewer: { __typename: 'Membership', id: string, hasDesignProducts: boolean, designProducts: { __typename: 'DesignProductConnection', edges: Array<{ __typename: 'DesignProductEdge', node: { __typename: 'DesignProduct', id: string, name: string, inStockQty: number, inProductionQty: number, colors: Array<{ __typename: 'DesignProductColor', id: string, hex: string | null, name: string | null }>, primaryImageFile: { __typename: 'FileImage', id: string, url: string, width: number, height: number } | null } | null } | null> | null } } | null };

export type DesignInventoryMatrixDesignProductFragment = { __typename: 'DesignProduct', id: string, sizes: Array<{ __typename: 'DesignProductSize', id: string, name: string }>, colors: Array<{ __typename: 'DesignProductColor', id: string, name: string | null, hex: string | null }> };

export type DesignOverviewGetDataQueryVariables = Exact<{
  designId: Scalars['ID']['input'];
}>;


export type DesignOverviewGetDataQuery = { __typename: 'Query', designProduct: { __typename: 'DesignProduct', id: string, description: string | null, designRequestId: string, colors: Array<{ __typename: 'DesignProductColor', id: string, hex: string | null, name: string | null }>, orders: Array<{ __typename: 'Order', id: string, humanOrderId: string }>, sizes: Array<{ __typename: 'DesignProductSize', id: string, name: string }> } | null };

export type DesignPreviewGalleryDesignProductFragment = { __typename: 'DesignProduct', id: string, colors: Array<{ __typename: 'DesignProductColor', id: string, images: Array<{ __typename: 'FileImage', id: string, url: string, width: number, height: number }> }> };

export type InventoryProductDetailsDesignFragment = { __typename: 'DesignProduct', id: string, designRequestId: string };

export type InventoryProductLayoutGetDataQueryVariables = Exact<{
  designId: Scalars['ID']['input'];
}>;


export type InventoryProductLayoutGetDataQuery = { __typename: 'Query', designProduct: { __typename: 'DesignProduct', id: string, name: string, colors: Array<{ __typename: 'DesignProductColor', id: string, images: Array<{ __typename: 'FileImage', id: string, url: string, width: number, height: number }> }> } | null };

export type ClosetDesignBuyPageFormDesignProductFragment = { __typename: 'DesignProduct', id: string, catalogProductId: string, colors: Array<{ __typename: 'DesignProductColor', id: string, hex: string | null, name: string | null, catalogProductColorId: string }>, variants: Array<{ __typename: 'DesignProductVariant', id: string, sizeName: string | null, colorName: string | null, catalogProductSizeId: string | null, catalogProductColorId: string | null }> };

export type ClosetDesignBuyPagePeviewDesignProductFragment = { __typename: 'DesignProduct', id: string, name: string, description: string | null, colors: Array<{ __typename: 'DesignProductColor', id: string, catalogProductColorId: string, hex: string | null, name: string | null, images: Array<{ __typename: 'FileImage', id: string, url: string, width: number, height: number }> }> };

export type GetProductVariantByOptionsVariables = Exact<{
  productEntityId: Scalars['Int']['input'];
  optionValueIds: Array<OptionValueId>;
}>;


export type GetProductVariantByOptions = { __typename: 'Query', site: { __typename: 'Site', product: { __typename: 'Product', id: string, variants: { __typename: 'VariantConnection', edges: Array<{ __typename: 'VariantEdge', node: { __typename: 'Variant', id: string, entityId: number } }> | null } } | null } };

export type ClosetDesignBuyPageGetDataQueryVariables = Exact<{
  designId: Scalars['ID']['input'];
}>;


export type ClosetDesignBuyPageGetDataQuery = { __typename: 'Query', designProduct: { __typename: 'DesignProduct', id: string, name: string, description: string | null, catalogProductId: string, colors: Array<{ __typename: 'DesignProductColor', id: string, name: string | null, hex: string | null, catalogProductColorId: string, images: Array<{ __typename: 'FileImage', id: string, url: string, width: number, height: number }> }>, variants: Array<{ __typename: 'DesignProductVariant', id: string, catalogProductVariantId: string, catalogProductColorId: string | null, catalogProductSizeId: string | null, sizeName: string | null, colorName: string | null }> } | null };

export type UseCreateOrderCreateOrderMutationVariables = Exact<{
  input: DesignProductCreateOrderInput;
}>;


export type UseCreateOrderCreateOrderMutation = { __typename: 'Mutation', designProductCreateOrder: { __typename: 'DesignProductCreateOrderPayload', order: { __typename: 'Order', id: string } | null } | null };

export type UseProductEstimateCreateQuoteMutationVariables = Exact<{
  input: DesignProductCreateQuoteInput;
}>;


export type UseProductEstimateCreateQuoteMutation = { __typename: 'Mutation', designProductCreateQuote: { __typename: 'DesignProductCreateQuotePayload', quote: { __typename: 'Quote', id: string, productTotalCostCents: number, productUnitCostCents: number } | null } | null };

export type InventoryProductDetailsGetDataQueryVariables = Exact<{
  designId: Scalars['ID']['input'];
}>;


export type InventoryProductDetailsGetDataQuery = { __typename: 'Query', designProduct: { __typename: 'DesignProduct', id: string, designRequestId: string, name: string } | null };

export type OrderDetailsPageGetDataQueryVariables = Exact<{
  orderId: Scalars['ID']['input'];
}>;


export type OrderDetailsPageGetDataQuery = { __typename: 'Query', order: { __typename: 'Order', id: string, paymentStatus: OrderPaymentStatus, createdAt: any, humanOrderId: string, humanPaymentStatus: string, totalTaxCents: number, statusTemporary: OrderStatusTemporary, totalShippingCents: number, subtotalPriceCents: number, totalProcessingFeeCents: number, totalPriceCents: number, totalAmountDueCents: number, totalAmountRefundedCents: number, customerEmail: string | null, customerPhone: string | null, items: Array<{ __typename: 'OrderItem', id: string, title: string, quantity: number, unitPriceCents: number, totalPriceCents: number, designProduct: { __typename: 'DesignProduct', id: string, name: string } | null }>, lastPaymentMethod: { __typename: 'PaymentMethod', id: string, type: string, card: { __typename: 'PaymentMethodCard', brand: string | null, last4: string | null, expMonth: number | null, expYear: number | null } | null, billingDetails: { __typename: 'PaymentMethodBillingDetails', line1: string | null, line2: string | null, city: string | null, state: string | null, postalCode: string | null, country: string | null } | null } | null, fulfillments: Array<{ __typename: 'Fulfillment', id: string, trackingInfo: { __typename: 'FulfillmentTrackingInfo', id: string, trackingNumber: string, trackingUrl: string } }>, shippingAddress: { __typename: 'MailingAddress', id: string, firstName: string | null, lastName: string | null, company: string | null, phone: string | null, address1: string | null, address2: string | null, city: string | null, country: string | null, province: string | null, provinceCode: string | null, zip: string | null } | null } | null };

export type ClosetSettingsGeneralPageGetDataQueryVariables = Exact<{ [key: string]: never; }>;


export type ClosetSettingsGeneralPageGetDataQuery = { __typename: 'Query', viewer: { __typename: 'Membership', id: string, user: { __typename: 'User', id: string, name: string | null, email: string | null, picture: string | null } | null } | null };

export type ClosetSettingsOrganizatoinPageGetDataQueryVariables = Exact<{ [key: string]: never; }>;


export type ClosetSettingsOrganizatoinPageGetDataQuery = { __typename: 'Query', viewer: { __typename: 'Membership', id: string, organization: { __typename: 'Organization', id: string, name: string | null } } | null };

export type ClosetSettingsTeamPageGetDataQueryVariables = Exact<{ [key: string]: never; }>;


export type ClosetSettingsTeamPageGetDataQuery = { __typename: 'Query', viewer: { __typename: 'Membership', id: string, organization: { __typename: 'Organization', id: string, memberships: Array<{ __typename: 'Membership', id: string, createdAt: any, humanizedRole: string | null, invitedEmail: string | null, user: { __typename: 'User', id: string, name: string | null, email: string | null } | null }> } } | null };

export type ClosetBaseLayoutGetDataQueryVariables = Exact<{ [key: string]: never; }>;


export type ClosetBaseLayoutGetDataQuery = { __typename: 'Query', viewer: { __typename: 'Membership', id: string } | null };

export type CatalogHeaderCategoryFragment = { __typename: 'Category', id: string, name: string, description: string };

export type CatalogHeaderBrandFragment = { __typename: 'Brand', id: string, name: string };

export type CatalogProductsContainerGetDataQueryVariables = Exact<{
  filters: SearchProductsFiltersInput;
  sort: SearchProductsSortInput;
  first: Scalars['Int']['input'];
  after?: InputMaybe<Scalars['String']['input']>;
}>;


export type CatalogProductsContainerGetDataQuery = { __typename: 'Query', site: { __typename: 'Site', search: { __typename: 'SearchQueries', searchProducts: { __typename: 'SearchProducts', products: { __typename: 'ProductConnection', edges: Array<{ __typename: 'ProductEdge', node: { __typename: 'Product', id: string, path: string, humanizedName: string, sku: string, prices: { __typename: 'Prices', price: { __typename: 'Money', value: any } } | null, brand: { __typename: 'Brand', id: string, name: string, path: string } | null, defaultImage: { __typename: 'Image', altText: string, url: string } | null, productOptions: { __typename: 'ProductOptionConnection', edges: Array<{ __typename: 'ProductOptionEdge', node: { __typename: 'CheckboxOption', entityId: number } | { __typename: 'DateFieldOption', entityId: number } | { __typename: 'FileUploadFieldOption', entityId: number } | { __typename: 'MultiLineTextFieldOption', entityId: number } | { __typename: 'MultipleChoiceOption', displayName: string, entityId: number, values: { __typename: 'ProductOptionValueConnection', edges: Array<{ __typename: 'ProductOptionValueEdge', node: { __typename: 'MultipleChoiceOptionValue', entityId: number, label: string } | { __typename: 'ProductPickListOptionValue', entityId: number, label: string } | { __typename: 'SwatchOptionValue', hexColors: Array<string>, entityId: number, label: string } }> | null } } | { __typename: 'NumberFieldOption', entityId: number } | { __typename: 'TextFieldOption', entityId: number } }> | null } } }> | null, pageInfo: { __typename: 'PageInfo', hasNextPage: boolean, endCursor: string | null } } } } } };

export type CatalogProductsListCategoryFragment = { __typename: 'Category', id: string, entityId: number, path: string, name: string, description: string };

export type CatalogProductsListBrandFragment = { __typename: 'Brand', id: string, entityId: number, name: string };

export type BrandPageGetDataQueryVariables = Exact<{
  path: Scalars['String']['input'];
}>;


export type BrandPageGetDataQuery = { __typename: 'Query', site: { __typename: 'Site', route: { __typename: 'Route', node: { __typename: 'Banner', id: string } | { __typename: 'Blog', id: string } | { __typename: 'BlogIndexPage', id: string } | { __typename: 'BlogPost', id: string } | { __typename: 'Brand', name: string, id: string, entityId: number, defaultImage: { __typename: 'Image', url: string } | null, seo: { __typename: 'SeoDetails', pageTitle: string, metaDescription: string } } | { __typename: 'Cart', id: string } | { __typename: 'Category', id: string } | { __typename: 'Checkout', id: string } | { __typename: 'ContactPage', id: string } | { __typename: 'NormalPage', id: string } | { __typename: 'Product', id: string } | { __typename: 'RawHtmlPage', id: string } | { __typename: 'Redirect', id: string } | { __typename: 'Variant', id: string } | null } } };

export type CatalogCategoryPageGetDataQueryVariables = Exact<{
  path: Scalars['String']['input'];
}>;


export type CatalogCategoryPageGetDataQuery = { __typename: 'Query', site: { __typename: 'Site', route: { __typename: 'Route', node: { __typename: 'Banner', id: string } | { __typename: 'Blog', id: string } | { __typename: 'BlogIndexPage', id: string } | { __typename: 'BlogPost', id: string } | { __typename: 'Brand', id: string } | { __typename: 'Cart', id: string } | { __typename: 'Category', entityId: number, name: string, description: string, path: string, id: string, seo: { __typename: 'SeoDetails', metaDescription: string, pageTitle: string, metaKeywords: string } } | { __typename: 'Checkout', id: string } | { __typename: 'ContactPage', id: string } | { __typename: 'NormalPage', id: string } | { __typename: 'Product', id: string } | { __typename: 'RawHtmlPage', id: string } | { __typename: 'Redirect', id: string } | { __typename: 'Variant', id: string } | null } } };

export type UseSearchProductFiltersGetDataQueryVariables = Exact<{
  filters: SearchProductsFiltersInput;
  rootCategoryEntityId: Scalars['Int']['input'];
}>;


export type UseSearchProductFiltersGetDataQuery = { __typename: 'Query', site: { __typename: 'Site', categoryTree: Array<{ __typename: 'CategoryTreeItem', entityId: number, name: string, productCount: number, children: Array<{ __typename: 'CategoryTreeItem', name: string, entityId: number, path: string, productCount: number }> }>, search: { __typename: 'SearchQueries', searchProducts: { __typename: 'SearchProducts', products: { __typename: 'ProductConnection', collectionInfo: { __typename: 'CollectionInfo', totalItems: any | null } | null }, filters: { __typename: 'SearchProductFilterConnection', edges: Array<{ __typename: 'SearchProductFilterEdge', node: { __typename: 'BrandSearchFilter', displayProductCount: boolean, name: string, isCollapsedByDefault: boolean, brands: { __typename: 'BrandSearchFilterItemConnection', edges: Array<{ __typename: 'BrandSearchFilterItemEdge', node: { __typename: 'BrandSearchFilterItem', entityId: number, name: string, isSelected: boolean, productCount: number } }> | null } } | { __typename: 'CategorySearchFilter', name: string, isCollapsedByDefault: boolean } | { __typename: 'OtherSearchFilter', name: string, isCollapsedByDefault: boolean } | { __typename: 'PriceSearchFilter', name: string, isCollapsedByDefault: boolean, selected: { __typename: 'PriceSearchFilterItem', minPrice: number | null, maxPrice: number | null } | null } | { __typename: 'ProductAttributeSearchFilter', filterName: string, name: string, isCollapsedByDefault: boolean, attributes: { __typename: 'ProductAttributeSearchFilterItemConnection', edges: Array<{ __typename: 'ProductAttributeSearchFilterItemEdge', node: { __typename: 'ProductAttributeSearchFilterItem', value: string, isSelected: boolean, productCount: number } }> | null } } | { __typename: 'RatingSearchFilter', name: string, isCollapsedByDefault: boolean } }> | null } } } } };

export type CatalogDiscoverPageGetDataQueryVariables = Exact<{ [key: string]: never; }>;


export type CatalogDiscoverPageGetDataQuery = { __typename: 'Query', site: { __typename: 'Site', featuredProducts: { __typename: 'ProductConnection', edges: Array<{ __typename: 'ProductEdge', node: { __typename: 'Product', id: string, path: string, humanizedName: string, sku: string, prices: { __typename: 'Prices', price: { __typename: 'Money', value: any } } | null, brand: { __typename: 'Brand', id: string, name: string, path: string } | null, defaultImage: { __typename: 'Image', altText: string, url: string } | null, productOptions: { __typename: 'ProductOptionConnection', edges: Array<{ __typename: 'ProductOptionEdge', node: { __typename: 'CheckboxOption', entityId: number } | { __typename: 'DateFieldOption', entityId: number } | { __typename: 'FileUploadFieldOption', entityId: number } | { __typename: 'MultiLineTextFieldOption', entityId: number } | { __typename: 'MultipleChoiceOption', displayName: string, entityId: number, values: { __typename: 'ProductOptionValueConnection', edges: Array<{ __typename: 'ProductOptionValueEdge', node: { __typename: 'MultipleChoiceOptionValue', entityId: number, label: string } | { __typename: 'ProductPickListOptionValue', entityId: number, label: string } | { __typename: 'SwatchOptionValue', hexColors: Array<string>, entityId: number, label: string } }> | null } } | { __typename: 'NumberFieldOption', entityId: number } | { __typename: 'TextFieldOption', entityId: number } }> | null } } }> | null }, newestProducts: { __typename: 'ProductConnection', edges: Array<{ __typename: 'ProductEdge', node: { __typename: 'Product', id: string, path: string, humanizedName: string, sku: string, prices: { __typename: 'Prices', price: { __typename: 'Money', value: any } } | null, brand: { __typename: 'Brand', id: string, name: string, path: string } | null, defaultImage: { __typename: 'Image', altText: string, url: string } | null, productOptions: { __typename: 'ProductOptionConnection', edges: Array<{ __typename: 'ProductOptionEdge', node: { __typename: 'CheckboxOption', entityId: number } | { __typename: 'DateFieldOption', entityId: number } | { __typename: 'FileUploadFieldOption', entityId: number } | { __typename: 'MultiLineTextFieldOption', entityId: number } | { __typename: 'MultipleChoiceOption', displayName: string, entityId: number, values: { __typename: 'ProductOptionValueConnection', edges: Array<{ __typename: 'ProductOptionValueEdge', node: { __typename: 'MultipleChoiceOptionValue', entityId: number, label: string } | { __typename: 'ProductPickListOptionValue', entityId: number, label: string } | { __typename: 'SwatchOptionValue', hexColors: Array<string>, entityId: number, label: string } }> | null } } | { __typename: 'NumberFieldOption', entityId: number } | { __typename: 'TextFieldOption', entityId: number } }> | null } } }> | null }, bestSellingProducts: { __typename: 'ProductConnection', edges: Array<{ __typename: 'ProductEdge', node: { __typename: 'Product', id: string, path: string, humanizedName: string, sku: string, prices: { __typename: 'Prices', price: { __typename: 'Money', value: any } } | null, brand: { __typename: 'Brand', id: string, name: string, path: string } | null, defaultImage: { __typename: 'Image', altText: string, url: string } | null, productOptions: { __typename: 'ProductOptionConnection', edges: Array<{ __typename: 'ProductOptionEdge', node: { __typename: 'CheckboxOption', entityId: number } | { __typename: 'DateFieldOption', entityId: number } | { __typename: 'FileUploadFieldOption', entityId: number } | { __typename: 'MultiLineTextFieldOption', entityId: number } | { __typename: 'MultipleChoiceOption', displayName: string, entityId: number, values: { __typename: 'ProductOptionValueConnection', edges: Array<{ __typename: 'ProductOptionValueEdge', node: { __typename: 'MultipleChoiceOptionValue', entityId: number, label: string } | { __typename: 'ProductPickListOptionValue', entityId: number, label: string } | { __typename: 'SwatchOptionValue', hexColors: Array<string>, entityId: number, label: string } }> | null } } | { __typename: 'NumberFieldOption', entityId: number } | { __typename: 'TextFieldOption', entityId: number } }> | null } } }> | null } }, productDiscoveryPage: { __typename: 'ProductDiscoveryPageRecord', id: any, featuredCategories: Array<{ __typename: 'CatalogCategoryRecord', id: any, bigCommerceCategoryId: any | null, name: string | null, image: { __typename: 'FileField', url: string } | null }>, featuredCollections: Array<{ __typename: 'CatalogCategoryRecord', id: any, name: string | null, bigCommerceCategoryId: any | null, image: { __typename: 'FileField', url: string } | null }> } | null };

export type CatalogDiscoverPageFeaturedCategoryGetCategoryDataQueryVariables = Exact<{
  categoryEntityId: Scalars['Int']['input'];
}>;


export type CatalogDiscoverPageFeaturedCategoryGetCategoryDataQuery = { __typename: 'Query', site: { __typename: 'Site', category: { __typename: 'Category', id: string, path: string, name: string } | null } };

export type ProductShowPageDetailsProductFragment = { __typename: 'Product', id: string, description: string, brand: { __typename: 'Brand', id: string, name: string, path: string } | null, customFields: { __typename: 'CustomFieldConnection', edges: Array<{ __typename: 'CustomFieldEdge', node: { __typename: 'CustomField', entityId: number, name: string, value: string } }> | null }, categories: { __typename: 'CategoryConnection', edges: Array<{ __typename: 'CategoryEdge', node: { __typename: 'Category', id: string, name: string, path: string } }> | null } };

export type ProductFormProductFragment = { __typename: 'Product', id: string, entityId: number, name: string, sku: string, prices: { __typename: 'Prices', price: { __typename: 'Money', value: any } } | null, brand: { __typename: 'Brand', id: string, name: string } | null };

export type ProductFormCreateQuoteMutationVariables = Exact<{
  input: CatalogProductQuoteCreateInput;
}>;


export type ProductFormCreateQuoteMutation = { __typename: 'Mutation', catalogProductQuoteCreate: { __typename: 'CatalogProductQuoteCreatePayload', quote: { __typename: 'Quote', id: string, productUnitCostCents: number } | null } | null };

export type ProductShowPageHeroProductFragment = { __typename: 'Product', id: string, entityId: number, humanizedName: string, path: string, sku: string, name: string, reviewSummary: { __typename: 'Reviews', numberOfReviews: number, summationOfRatings: number }, variants: { __typename: 'VariantConnection', edges: Array<{ __typename: 'VariantEdge', node: { __typename: 'Variant', id: string, entityId: number, options: { __typename: 'OptionConnection', edges: Array<{ __typename: 'OptionEdge', node: { __typename: 'ProductOption', displayName: string, values: { __typename: 'OptionValueConnection', edges: Array<{ __typename: 'OptionValueEdge', node: { __typename: 'ProductOptionValue', entityId: number, label: string } }> | null } } }> | null }, defaultImage: { __typename: 'Image', isDefault: boolean, url: string } | null, metafields: { __typename: 'MetafieldConnection', edges: Array<{ __typename: 'MetafieldEdge', node: { __typename: 'Metafields', id: string, key: string, value: string } }> | null } } }> | null }, defaultImage: { __typename: 'Image', url: string } | null, allImages: Array<{ __typename: 'CatalogProductImage', urlStandard: string, urlZoom: string, urlThumbnail: string }>, prices: { __typename: 'Prices', price: { __typename: 'Money', value: any } } | null, brand: { __typename: 'Brand', id: string, name: string } | null, productOptions: { __typename: 'ProductOptionConnection', edges: Array<{ __typename: 'ProductOptionEdge', node: { __typename: 'CheckboxOption', entityId: number } | { __typename: 'DateFieldOption', entityId: number } | { __typename: 'FileUploadFieldOption', entityId: number } | { __typename: 'MultiLineTextFieldOption', entityId: number } | { __typename: 'MultipleChoiceOption', displayName: string, entityId: number, values: { __typename: 'ProductOptionValueConnection', edges: Array<{ __typename: 'ProductOptionValueEdge', node: { __typename: 'MultipleChoiceOptionValue', entityId: number, label: string } | { __typename: 'ProductPickListOptionValue', entityId: number, label: string } | { __typename: 'SwatchOptionValue', hexColors: Array<string>, entityId: number, label: string } }> | null } } | { __typename: 'NumberFieldOption', entityId: number } | { __typename: 'TextFieldOption', entityId: number } }> | null } };

export type UseCustomizeProductCustomizeMutationVariables = Exact<{
  input: CatalogProductCustomizeInput;
}>;


export type UseCustomizeProductCustomizeMutation = { __typename: 'Mutation', catalogProductCustomize: { __typename: 'CatalogProductCustomizePayload', designRequest: { __typename: 'DesignRequest', id: string, membershipId: string | null } | null, order: { __typename: 'Order', id: string } | null } | null };

export type ProductPageGetDataQueryVariables = Exact<{
  path: Scalars['String']['input'];
  variantsFirst?: InputMaybe<Scalars['Int']['input']>;
}>;


export type ProductPageGetDataQuery = { __typename: 'Query', site: { __typename: 'Site', route: { __typename: 'Route', node: { __typename: 'Banner', id: string } | { __typename: 'Blog', id: string } | { __typename: 'BlogIndexPage', id: string } | { __typename: 'BlogPost', id: string } | { __typename: 'Brand', id: string } | { __typename: 'Cart', id: string } | { __typename: 'Category', id: string } | { __typename: 'Checkout', id: string } | { __typename: 'ContactPage', id: string } | { __typename: 'NormalPage', id: string } | { __typename: 'Product', humanizedName: string, path: string, sku: string, plainTextDescription: string, id: string, entityId: number, description: string, name: string, defaultImage: { __typename: 'Image', url: string, seoImageUrl: string } | null, gender: { __typename: 'CustomFieldConnection', edges: Array<{ __typename: 'CustomFieldEdge', node: { __typename: 'CustomField', name: string, value: string } }> | null }, allImages: Array<{ __typename: 'CatalogProductImage', urlStandard: string, urlZoom: string, urlThumbnail: string }>, brand: { __typename: 'Brand', id: string, name: string, path: string } | null, seo: { __typename: 'SeoDetails', metaDescription: string }, relatedProducts: { __typename: 'RelatedProductsConnection', edges: Array<{ __typename: 'RelatedProductsEdge', node: { __typename: 'Product', id: string, humanizedName: string, path: string, sku: string, prices: { __typename: 'Prices', price: { __typename: 'Money', value: any } } | null, brand: { __typename: 'Brand', id: string, name: string, path: string } | null, defaultImage: { __typename: 'Image', altText: string, url: string } | null, productOptions: { __typename: 'ProductOptionConnection', edges: Array<{ __typename: 'ProductOptionEdge', node: { __typename: 'CheckboxOption', entityId: number } | { __typename: 'DateFieldOption', entityId: number } | { __typename: 'FileUploadFieldOption', entityId: number } | { __typename: 'MultiLineTextFieldOption', entityId: number } | { __typename: 'MultipleChoiceOption', displayName: string, entityId: number, values: { __typename: 'ProductOptionValueConnection', edges: Array<{ __typename: 'ProductOptionValueEdge', node: { __typename: 'MultipleChoiceOptionValue', entityId: number, label: string } | { __typename: 'ProductPickListOptionValue', entityId: number, label: string } | { __typename: 'SwatchOptionValue', hexColors: Array<string>, entityId: number, label: string } }> | null } } | { __typename: 'NumberFieldOption', entityId: number } | { __typename: 'TextFieldOption', entityId: number } }> | null } } }> | null }, variants: { __typename: 'VariantConnection', edges: Array<{ __typename: 'VariantEdge', node: { __typename: 'Variant', id: string, gtin: string | null, mpn: string | null, sku: string, isPurchasable: boolean, entityId: number, prices: { __typename: 'Prices', price: { __typename: 'Money', value: any, currencyCode: string } } | null, options: { __typename: 'OptionConnection', edges: Array<{ __typename: 'OptionEdge', node: { __typename: 'ProductOption', displayName: string, values: { __typename: 'OptionValueConnection', edges: Array<{ __typename: 'OptionValueEdge', node: { __typename: 'ProductOptionValue', entityId: number, label: string } }> | null } } }> | null }, jsonLdImage: { __typename: 'Image', url: string } | null, defaultImage: { __typename: 'Image', isDefault: boolean, url: string } | null, metafields: { __typename: 'MetafieldConnection', edges: Array<{ __typename: 'MetafieldEdge', node: { __typename: 'Metafields', id: string, key: string, value: string } }> | null } } }> | null }, reviewSummary: { __typename: 'Reviews', numberOfReviews: number, summationOfRatings: number }, customFields: { __typename: 'CustomFieldConnection', edges: Array<{ __typename: 'CustomFieldEdge', node: { __typename: 'CustomField', entityId: number, name: string, value: string } }> | null }, categories: { __typename: 'CategoryConnection', edges: Array<{ __typename: 'CategoryEdge', node: { __typename: 'Category', id: string, name: string, path: string } }> | null }, prices: { __typename: 'Prices', price: { __typename: 'Money', value: any } } | null, productOptions: { __typename: 'ProductOptionConnection', edges: Array<{ __typename: 'ProductOptionEdge', node: { __typename: 'CheckboxOption', entityId: number } | { __typename: 'DateFieldOption', entityId: number } | { __typename: 'FileUploadFieldOption', entityId: number } | { __typename: 'MultiLineTextFieldOption', entityId: number } | { __typename: 'MultipleChoiceOption', displayName: string, entityId: number, values: { __typename: 'ProductOptionValueConnection', edges: Array<{ __typename: 'ProductOptionValueEdge', node: { __typename: 'MultipleChoiceOptionValue', entityId: number, label: string } | { __typename: 'ProductPickListOptionValue', entityId: number, label: string } | { __typename: 'SwatchOptionValue', hexColors: Array<string>, entityId: number, label: string } }> | null } } | { __typename: 'NumberFieldOption', entityId: number } | { __typename: 'TextFieldOption', entityId: number } }> | null } } | { __typename: 'RawHtmlPage', id: string } | { __typename: 'Redirect', id: string } | { __typename: 'Variant', id: string } | null } } };

export type HomePageFeaturedPostsPostsFragment = { __typename: 'ArticleRecord', id: any, _publishedAt: any | null, _createdAt: any, title: string | null, slug: string | null, shortDescription: string | null, image: { __typename: 'FileField', responsiveImage: { __typename: 'ResponsiveImage', srcSet: string, webpSrcSet: string, sizes: string, src: string, width: any, height: any, aspectRatio: any, alt: string | null, title: string | null, base64: string | null } | null } | null, author: { __typename: 'AuthorRecord', id: any, name: string | null, image: { __typename: 'FileField', id: any, responsiveImage: { __typename: 'ResponsiveImage', srcSet: string, webpSrcSet: string, sizes: string, src: string, width: any, height: any, aspectRatio: any, alt: string | null, title: string | null, base64: string | null } | null } | null } | null, categories: Array<{ __typename: 'CategoryRecord', id: any, name: string | null, slug: string | null }> };

export type NavigationSiteCategoryTreeFragment = { __typename: 'CategoryTreeItem', entityId: number, name: string, path: string, productCount: number };

export type NavigationSiteFragment = { __typename: 'Site', categoryTree: Array<{ __typename: 'CategoryTreeItem', entityId: number, name: string, path: string, productCount: number, children: Array<{ __typename: 'CategoryTreeItem', entityId: number, name: string, path: string, productCount: number, children: Array<{ __typename: 'CategoryTreeItem', entityId: number, name: string, path: string, productCount: number, children: Array<{ __typename: 'CategoryTreeItem', entityId: number, name: string, path: string, productCount: number }> }> }> }> };

export type PromotionalProductGlossaryGetDataQueryVariables = Exact<{ [key: string]: never; }>;


export type PromotionalProductGlossaryGetDataQuery = { __typename: 'Query', allGlossaryEntries: Array<{ __typename: 'GlossaryEntryRecord', id: any, slug: string | null, entryType: string | null, definition: string | null, term: string | null }> };

export type PromotionalProductGlossaryTermGetDataQueryVariables = Exact<{
  slug: Scalars['String']['input'];
}>;


export type PromotionalProductGlossaryTermGetDataQuery = { __typename: 'Query', glossaryEntry: { __typename: 'GlossaryEntryRecord', id: any, term: string | null, slug: string | null, definition: string | null, entryType: string | null, businessUrl: string | null, affiliateUrl: string | null, description: { __typename: 'GlossaryEntryModelDescriptionField', value: any, blocks: Array<{ __typename: 'ImageRecord', id: any, image: { __typename: 'FileField', id: any, responsiveImage: { __typename: 'ResponsiveImage', srcSet: string, webpSrcSet: string, sizes: string, src: string, width: any, height: any, aspectRatio: any, alt: string | null, title: string | null, base64: string | null } | null } | null }>, links: Array<{ __typename: 'ArticleRecord', id: any, slug: string | null, title: string | null } | { __typename: 'GlossaryEntryRecord', id: any, slug: string | null, term: string | null }> } | null } | null, relatedTerms: Array<{ __typename: 'GlossaryEntryRecord', id: any, term: string | null, slug: string | null, entryType: string | null }> };

export type CmsLandingPageCallToActionCallToActionFragment = { __typename: 'PageCallToActionRecord', id: any, title: string | null, description: string | null, actions: Array<{ __typename: 'CallToActionButtonRecord', label: string | null, url: string | null, icon: Array<{ __typename: 'HeroIconRecord', id: any, tag: string | null }> }> };

export type CmsLandingPageCatalogSectionCatalogSectionFragment = { __typename: 'PageSectionCatalogRecord', id: any, title: string | null, description: string | null, disableDefaultCategories: any | null, categories: Array<{ __typename: 'CatalogCategoryRecord', id: any, bigCommerceCategoryId: any | null, name: string | null }> };

export type CmsLandingPageCatalogSectionProductsGetDataQueryVariables = Exact<{
  categoryId: Scalars['Int']['input'];
}>;


export type CmsLandingPageCatalogSectionProductsGetDataQuery = { __typename: 'Query', site: { __typename: 'Site', category: { __typename: 'Category', id: string, products: { __typename: 'ProductConnection', edges: Array<{ __typename: 'ProductEdge', node: { __typename: 'Product', id: string, humanizedName: string, path: string, sku: string, prices: { __typename: 'Prices', price: { __typename: 'Money', value: any } } | null, brand: { __typename: 'Brand', id: string, name: string, path: string } | null, defaultImage: { __typename: 'Image', altText: string, url: string } | null, productOptions: { __typename: 'ProductOptionConnection', edges: Array<{ __typename: 'ProductOptionEdge', node: { __typename: 'CheckboxOption', entityId: number } | { __typename: 'DateFieldOption', entityId: number } | { __typename: 'FileUploadFieldOption', entityId: number } | { __typename: 'MultiLineTextFieldOption', entityId: number } | { __typename: 'MultipleChoiceOption', displayName: string, entityId: number, values: { __typename: 'ProductOptionValueConnection', edges: Array<{ __typename: 'ProductOptionValueEdge', node: { __typename: 'MultipleChoiceOptionValue', entityId: number, label: string } | { __typename: 'ProductPickListOptionValue', entityId: number, label: string } | { __typename: 'SwatchOptionValue', hexColors: Array<string>, entityId: number, label: string } }> | null } } | { __typename: 'NumberFieldOption', entityId: number } | { __typename: 'TextFieldOption', entityId: number } }> | null } } }> | null } } | null } };

export type CmsLandingPageSectionSectionFragment = { __typename: 'PageSectionRecord', id: any, title: string | null, subtitle: string | null, gutter: string | null, textAlignment: string | null, imageAlignment: string | null, image: { __typename: 'FileField', id: any, responsiveImage: { __typename: 'ResponsiveImage', srcSet: string, webpSrcSet: string, sizes: string, src: string, width: any, height: any, aspectRatio: any, alt: string | null, title: string | null, base64: string | null } | null } | null, content: Array<{ __typename: 'FaqGroupRecord', id: any, expandAll: any | null, faqs: Array<{ __typename: 'FaqRecord', id: any, question: string | null, answer: string | null }> } | { __typename: 'FeatureGridRecord', id: any, features: Array<{ __typename: 'FeatureGridFeatureRecord', id: any, name: string | null, shortDescription: string | null, callToActionText: string | null, callToActionUrl: string | null, icon: Array<{ __typename: 'HeroIconRecord', id: any, tag: string | null }> }> } | { __typename: 'LandingPageGridRecord', id: any, landingPages: Array<{ __typename: 'LandingPageLinkRecord', id: any, title: string | null, landingPage: { __typename: 'LandingPageRecord', id: any, slug: string | null, category: string | null, categoryMetadata: Array<{ __typename: 'TradeshowCategoryMetadataModelRecord', id: any, startDate: any | null, endDate: any | null }> } | null }> } | { __typename: 'RichContentRecord', id: any, content: { __typename: 'RichContentModelContentField', value: any, blocks: Array<{ __typename: 'ImageRecord', id: any, image: { __typename: 'FileField', id: any, responsiveImage: { __typename: 'ResponsiveImage', srcSet: string, webpSrcSet: string, sizes: string, src: string, width: any, height: any, aspectRatio: any, alt: string | null, title: string | null, base64: string | null } | null } | null }> } | null }> };

export type LandingPageGetMetadataQueryVariables = Exact<{
  slug: Scalars['String']['input'];
}>;


export type LandingPageGetMetadataQuery = { __typename: 'Query', landingPage: { __typename: 'LandingPageRecord', id: any, _seoMetaTags: Array<{ __typename: 'Tag', attributes: any | null, content: string | null, tag: string }> } | null };

export type LandingPageGetDataQueryVariables = Exact<{
  slug: Scalars['String']['input'];
}>;


export type LandingPageGetDataQuery = { __typename: 'Query', landingPage: { __typename: 'LandingPageRecord', id: any, slug: string | null, title: string | null, category: string | null, categoryMetadata: Array<{ __typename: 'TradeshowCategoryMetadataModelRecord', id: any, startDate: any | null, endDate: any | null }>, content: Array<{ __typename: 'PageCallToActionRecord', id: any, title: string | null, description: string | null, actions: Array<{ __typename: 'CallToActionButtonRecord', label: string | null, url: string | null, icon: Array<{ __typename: 'HeroIconRecord', id: any, tag: string | null }> }> } | { __typename: 'PageHeroRecord', id: any, title: string | null, description: string | null, callToActions: Array<{ __typename: 'CallToActionButtonRecord', id: any, label: string | null, url: string | null, icon: Array<{ __typename: 'HeroIconRecord', id: any, tag: string | null }> }> } | { __typename: 'PageSectionCatalogRecord', id: any, title: string | null, description: string | null, disableDefaultCategories: any | null, categories: Array<{ __typename: 'CatalogCategoryRecord', id: any, bigCommerceCategoryId: any | null, name: string | null }> } | { __typename: 'PageSectionRecord', id: any, title: string | null, subtitle: string | null, gutter: string | null, textAlignment: string | null, imageAlignment: string | null, image: { __typename: 'FileField', id: any, responsiveImage: { __typename: 'ResponsiveImage', srcSet: string, webpSrcSet: string, sizes: string, src: string, width: any, height: any, aspectRatio: any, alt: string | null, title: string | null, base64: string | null } | null } | null, content: Array<{ __typename: 'FaqGroupRecord', id: any, expandAll: any | null, faqs: Array<{ __typename: 'FaqRecord', id: any, question: string | null, answer: string | null }> } | { __typename: 'FeatureGridRecord', id: any, features: Array<{ __typename: 'FeatureGridFeatureRecord', id: any, name: string | null, shortDescription: string | null, callToActionText: string | null, callToActionUrl: string | null, icon: Array<{ __typename: 'HeroIconRecord', id: any, tag: string | null }> }> } | { __typename: 'LandingPageGridRecord', id: any, landingPages: Array<{ __typename: 'LandingPageLinkRecord', id: any, title: string | null, landingPage: { __typename: 'LandingPageRecord', id: any, slug: string | null, category: string | null, categoryMetadata: Array<{ __typename: 'TradeshowCategoryMetadataModelRecord', id: any, startDate: any | null, endDate: any | null }> } | null }> } | { __typename: 'RichContentRecord', id: any, content: { __typename: 'RichContentModelContentField', value: any, blocks: Array<{ __typename: 'ImageRecord', id: any, image: { __typename: 'FileField', id: any, responsiveImage: { __typename: 'ResponsiveImage', srcSet: string, webpSrcSet: string, sizes: string, src: string, width: any, height: any, aspectRatio: any, alt: string | null, title: string | null, base64: string | null } | null } | null }> } | null }> }> } | null };

export type PrimaryLayoutGetDataQueryVariables = Exact<{ [key: string]: never; }>;


export type PrimaryLayoutGetDataQuery = { __typename: 'Query', site: { __typename: 'Site', categoryTree: Array<{ __typename: 'CategoryTreeItem', entityId: number, name: string, path: string, productCount: number, children: Array<{ __typename: 'CategoryTreeItem', entityId: number, name: string, path: string, productCount: number, children: Array<{ __typename: 'CategoryTreeItem', entityId: number, name: string, path: string, productCount: number, children: Array<{ __typename: 'CategoryTreeItem', entityId: number, name: string, path: string, productCount: number }> }> }> }> } };

export type BlogIndexPageArticleFragment = { __typename: 'ArticleRecord', id: any, _publishedAt: any | null, _createdAt: any, title: string | null, slug: string | null, shortDescription: string | null, image: { __typename: 'FileField', responsiveImage: { __typename: 'ResponsiveImage', srcSet: string, webpSrcSet: string, sizes: string, src: string, width: any, height: any, aspectRatio: any, alt: string | null, title: string | null, base64: string | null } | null } | null, author: { __typename: 'AuthorRecord', id: any, name: string | null, image: { __typename: 'FileField', id: any, responsiveImage: { __typename: 'ResponsiveImage', srcSet: string, webpSrcSet: string, sizes: string, src: string, width: any, height: any, aspectRatio: any, alt: string | null, title: string | null, base64: string | null } | null } | null } | null, categories: Array<{ __typename: 'CategoryRecord', id: any, name: string | null, slug: string | null }> };

export type BlogPostIndexPageCategoryFragment = { __typename: 'CategoryRecord', id: any, name: string | null, shortName: string | null, slug: string | null, description: { __typename: 'CategoryModelDescriptionField', value: any } | null };

export type BlogPostJsonLDArticleFragment = { __typename: 'ArticleRecord', id: any, title: string | null, slug: string | null, _publishedAt: any | null, _updatedAt: any, _seoMetaTags: Array<{ __typename: 'Tag', attributes: any | null }>, author: { __typename: 'AuthorRecord', id: any, name: string | null } | null, image: { __typename: 'FileField', id: any, image: { __typename: 'ResponsiveImage', src: string } | null } | null };

export type BlogPostShowPageArticleFragment = { __typename: 'ArticleRecord', id: any, title: string | null, _publishedAt: any | null, _createdAt: any, slug: string | null, _updatedAt: any, author: { __typename: 'AuthorRecord', id: any, name: string | null, image: { __typename: 'FileField', id: any, responsiveImage: { __typename: 'ResponsiveImage', srcSet: string, webpSrcSet: string, sizes: string, src: string, width: any, height: any, aspectRatio: any, alt: string | null, title: string | null, base64: string | null } | null } | null } | null, categories: Array<{ __typename: 'CategoryRecord', id: any, name: string | null, slug: string | null }>, image: { __typename: 'FileField', id: any, responsiveImage: { __typename: 'ResponsiveImage', srcSet: string, webpSrcSet: string, sizes: string, src: string, width: any, height: any, aspectRatio: any, alt: string | null, title: string | null, base64: string | null } | null, image: { __typename: 'ResponsiveImage', src: string } | null } | null, content: { __typename: 'ArticleModelContentField', value: any, blocks: Array<{ __typename: 'ImageRecord', id: any, image: { __typename: 'FileField', id: any, responsiveImage: { __typename: 'ResponsiveImage', srcSet: string, webpSrcSet: string, sizes: string, src: string, width: any, height: any, aspectRatio: any, alt: string | null, title: string | null, base64: string | null } | null } | null }>, links: Array<{ __typename: 'ArticleRecord', id: any, slug: string | null, title: string | null, shortDescription: string | null } | { __typename: 'CustomComponentRecord', id: any, componentId: string | null } | { __typename: 'GlossaryEntryRecord', id: any, slug: string | null, term: string | null, entryType: string | null } | { __typename: 'TableRecord', id: any, table: any | null }> } | null, _seoMetaTags: Array<{ __typename: 'Tag', attributes: any | null }> };

export type BlogPostShowPageAuthorFragment = { __typename: 'AuthorRecord', id: any, name: string | null, image: { __typename: 'FileField', id: any, responsiveImage: { __typename: 'ResponsiveImage', srcSet: string, webpSrcSet: string, sizes: string, src: string, width: any, height: any, aspectRatio: any, alt: string | null, title: string | null, base64: string | null } | null } | null };

export type BlogShowPageGetDataQueryVariables = Exact<{
  slug: SlugFilter;
}>;


export type BlogShowPageGetDataQuery = { __typename: 'Query', article: { __typename: 'ArticleRecord', id: any, title: string | null, _publishedAt: any | null, _createdAt: any, slug: string | null, _updatedAt: any, _seoMetaTags: Array<{ __typename: 'Tag', attributes: any | null, content: string | null, tag: string }>, author: { __typename: 'AuthorRecord', id: any, name: string | null, image: { __typename: 'FileField', id: any, responsiveImage: { __typename: 'ResponsiveImage', srcSet: string, webpSrcSet: string, sizes: string, src: string, width: any, height: any, aspectRatio: any, alt: string | null, title: string | null, base64: string | null } | null } | null } | null, categories: Array<{ __typename: 'CategoryRecord', id: any, name: string | null, slug: string | null }>, image: { __typename: 'FileField', id: any, responsiveImage: { __typename: 'ResponsiveImage', srcSet: string, webpSrcSet: string, sizes: string, src: string, width: any, height: any, aspectRatio: any, alt: string | null, title: string | null, base64: string | null } | null, image: { __typename: 'ResponsiveImage', src: string } | null } | null, content: { __typename: 'ArticleModelContentField', value: any, blocks: Array<{ __typename: 'ImageRecord', id: any, image: { __typename: 'FileField', id: any, responsiveImage: { __typename: 'ResponsiveImage', srcSet: string, webpSrcSet: string, sizes: string, src: string, width: any, height: any, aspectRatio: any, alt: string | null, title: string | null, base64: string | null } | null } | null }>, links: Array<{ __typename: 'ArticleRecord', id: any, slug: string | null, title: string | null, shortDescription: string | null } | { __typename: 'CustomComponentRecord', id: any, componentId: string | null } | { __typename: 'GlossaryEntryRecord', id: any, slug: string | null, term: string | null, entryType: string | null } | { __typename: 'TableRecord', id: any, table: any | null }> } | null } | null };

export type BlogIndexPageGetDataQueryVariables = Exact<{
  first?: InputMaybe<Scalars['IntType']['input']>;
  skip?: InputMaybe<Scalars['IntType']['input']>;
  filter?: InputMaybe<ArticleModelFilter>;
}>;


export type BlogIndexPageGetDataQuery = { __typename: 'Query', _allArticlesMeta: { __typename: 'CollectionMetadata', count: any }, allArticles: Array<{ __typename: 'ArticleRecord', id: any, _publishedAt: any | null, _createdAt: any, title: string | null, slug: string | null, shortDescription: string | null, image: { __typename: 'FileField', responsiveImage: { __typename: 'ResponsiveImage', srcSet: string, webpSrcSet: string, sizes: string, src: string, width: any, height: any, aspectRatio: any, alt: string | null, title: string | null, base64: string | null } | null } | null, author: { __typename: 'AuthorRecord', id: any, name: string | null, image: { __typename: 'FileField', id: any, responsiveImage: { __typename: 'ResponsiveImage', srcSet: string, webpSrcSet: string, sizes: string, src: string, width: any, height: any, aspectRatio: any, alt: string | null, title: string | null, base64: string | null } | null } | null } | null, categories: Array<{ __typename: 'CategoryRecord', id: any, name: string | null, slug: string | null }> }>, allCategories: Array<{ __typename: 'CategoryRecord', id: any, name: string | null, shortName: string | null, slug: string | null, description: { __typename: 'CategoryModelDescriptionField', value: any } | null }>, blogIndexPage: { __typename: 'BlogIndexPageRecord', id: any, _seoMetaTags: Array<{ __typename: 'Tag', attributes: any | null, content: string | null, tag: string }> } | null };

export type BlogCategoryIndexPageGetPageDataQueryVariables = Exact<{
  first?: InputMaybe<Scalars['IntType']['input']>;
  skip?: InputMaybe<Scalars['IntType']['input']>;
  filter?: InputMaybe<ArticleModelFilter>;
  orderBy?: InputMaybe<Array<InputMaybe<ArticleModelOrderBy>>>;
}>;


export type BlogCategoryIndexPageGetPageDataQuery = { __typename: 'Query', allArticles: Array<{ __typename: 'ArticleRecord', id: any, _publishedAt: any | null, _createdAt: any, title: string | null, slug: string | null, shortDescription: string | null, image: { __typename: 'FileField', responsiveImage: { __typename: 'ResponsiveImage', srcSet: string, webpSrcSet: string, sizes: string, src: string, width: any, height: any, aspectRatio: any, alt: string | null, title: string | null, base64: string | null } | null } | null, author: { __typename: 'AuthorRecord', id: any, name: string | null, image: { __typename: 'FileField', id: any, responsiveImage: { __typename: 'ResponsiveImage', srcSet: string, webpSrcSet: string, sizes: string, src: string, width: any, height: any, aspectRatio: any, alt: string | null, title: string | null, base64: string | null } | null } | null } | null, categories: Array<{ __typename: 'CategoryRecord', id: any, name: string | null, slug: string | null }> }>, _allArticlesMeta: { __typename: 'CollectionMetadata', count: any }, allCategories: Array<{ __typename: 'CategoryRecord', id: any, name: string | null, shortName: string | null, slug: string | null, description: { __typename: 'CategoryModelDescriptionField', value: any } | null }>, blogIndexPage: { __typename: 'BlogIndexPageRecord', id: any, _seoMetaTags: Array<{ __typename: 'Tag', attributes: any | null, content: string | null, tag: string }> } | null };

export type BlogCategoryIndexPageGetCategoryQueryVariables = Exact<{
  categorySlug: Scalars['String']['input'];
}>;


export type BlogCategoryIndexPageGetCategoryQuery = { __typename: 'Query', allCategories: Array<{ __typename: 'CategoryRecord', id: any }> };

export type DesignLibraryPageGetDataQueryVariables = Exact<{
  first?: InputMaybe<Scalars['IntType']['input']>;
  skip?: InputMaybe<Scalars['IntType']['input']>;
}>;


export type DesignLibraryPageGetDataQuery = { __typename: 'Query', allDesigns: Array<{ __typename: 'DesignRecord', id: any, primaryImage: { __typename: 'FileField', id: any, responsiveImage: { __typename: 'ResponsiveImage', srcSet: string, webpSrcSet: string, sizes: string, src: string, width: any, height: any, aspectRatio: any, alt: string | null, title: string | null, base64: string | null } | null } | null }> };

export type DesignLibraryCategoryShowPageCatalogFragment = { __typename: 'Site', featuredProducts: { __typename: 'ProductConnection', edges: Array<{ __typename: 'ProductEdge', node: { __typename: 'Product', id: string, name: string, path: string, brand: { __typename: 'Brand', id: string, path: string } | null, defaultImage: { __typename: 'Image', url: string } | null } }> | null } };

export type DesignLibraryCategoryShowPageDesignCategoryFragment = { __typename: 'DesignCategoryRecord', id: any, name: string | null, slug: string | null, _seoMetaTags: Array<{ __typename: 'Tag', attributes: any | null, content: string | null, tag: string }>, _allReferencingDesigns: Array<{ __typename: 'DesignRecord', id: any, primaryImage: { __typename: 'FileField', id: any, responsiveImage: { __typename: 'ResponsiveImage', srcSet: string, webpSrcSet: string, sizes: string, src: string, width: any, height: any, aspectRatio: any, alt: string | null, title: string | null, base64: string | null } | null } | null }> };

export type ProductPageGetDesignCategoryDataVariables = Exact<{
  designCategorySlug: SlugFilter;
}>;


export type ProductPageGetDesignCategoryData = { __typename: 'Query', site: { __typename: 'Site', featuredProducts: { __typename: 'ProductConnection', edges: Array<{ __typename: 'ProductEdge', node: { __typename: 'Product', id: string, name: string, path: string, brand: { __typename: 'Brand', id: string, path: string } | null, defaultImage: { __typename: 'Image', url: string } | null } }> | null } }, designCategory: { __typename: 'DesignCategoryRecord', id: any, name: string | null, slug: string | null, _seoMetaTags: Array<{ __typename: 'Tag', attributes: any | null, content: string | null, tag: string }>, _allReferencingDesigns: Array<{ __typename: 'DesignRecord', id: any, primaryImage: { __typename: 'FileField', id: any, responsiveImage: { __typename: 'ResponsiveImage', srcSet: string, webpSrcSet: string, sizes: string, src: string, width: any, height: any, aspectRatio: any, alt: string | null, title: string | null, base64: string | null } | null } | null }> } | null };

export type LookbookCategoriesIndexPageGetDataQueryVariables = Exact<{ [key: string]: never; }>;


export type LookbookCategoriesIndexPageGetDataQuery = { __typename: 'Query', allDesignCategories: Array<{ __typename: 'DesignCategoryRecord', id: any, slug: string | null, name: string | null }> };

export type PrivacyGetDataQueryVariables = Exact<{ [key: string]: never; }>;


export type PrivacyGetDataQuery = { __typename: 'Query', privacyPolicyPage: { __typename: 'PrivacyPolicyPageRecord', id: any, _seoMetaTags: Array<{ __typename: 'Tag', attributes: any | null, content: string | null, tag: string }>, content: { __typename: 'PrivacyPolicyPageModelContentField', value: any } | null } | null };

export type PromotionalProductsDesigngetDataQueryVariables = Exact<{ [key: string]: never; }>;


export type PromotionalProductsDesigngetDataQuery = { __typename: 'Query', site: { __typename: 'Site', featuredProducts: { __typename: 'ProductConnection', edges: Array<{ __typename: 'ProductEdge', node: { __typename: 'Product', id: string, name: string, path: string, brand: { __typename: 'Brand', id: string, path: string } | null, defaultImage: { __typename: 'Image', url: string } | null } }> | null } } };

export type PromotionalProductsDistributionGetDataQueryVariables = Exact<{ [key: string]: never; }>;


export type PromotionalProductsDistributionGetDataQuery = { __typename: 'Query', site: { __typename: 'Site', featuredProducts: { __typename: 'ProductConnection', edges: Array<{ __typename: 'ProductEdge', node: { __typename: 'Product', id: string, name: string, path: string, brand: { __typename: 'Brand', id: string, path: string } | null, defaultImage: { __typename: 'Image', url: string } | null } }> | null } } };

export type FeaturesIndexPageGetDataQueryVariables = Exact<{ [key: string]: never; }>;


export type FeaturesIndexPageGetDataQuery = { __typename: 'Query', featureIndexPage: { __typename: 'FeatureIndexPageRecord', id: any, _seoMetaTags: Array<{ __typename: 'Tag', attributes: any | null, content: string | null, tag: string }> } | null };

export type TermsGetDataQueryVariables = Exact<{ [key: string]: never; }>;


export type TermsGetDataQuery = { __typename: 'Query', termsOfUsePage: { __typename: 'TermsOfUsePageRecord', id: any, _seoMetaTags: Array<{ __typename: 'Tag', attributes: any | null, content: string | null, tag: string }>, content: { __typename: 'TermsOfUsePageModelContentField', value: any } | null } | null };

export type AppLayoutGetDataQueryVariables = Exact<{ [key: string]: never; }>;


export type AppLayoutGetDataQuery = { __typename: 'Query', viewer: { __typename: 'Membership', id: string, humanizedRole: string | null, organization: { __typename: 'Organization', id: string, name: string | null }, user: { __typename: 'User', id: string, name: string | null, email: string | null, picture: string | null } | null } | null };

export type AccountSetupPageBootstrapAccountVariables = Exact<{ [key: string]: never; }>;


export type AccountSetupPageBootstrapAccount = { __typename: 'Mutation', userBoostrap: { __typename: 'User', id: string, memberships: Array<{ __typename: 'Membership', id: string, organizationId: string }> } | null };

export type AccountSetupPageGetDataQueryVariables = Exact<{ [key: string]: never; }>;


export type AccountSetupPageGetDataQuery = { __typename: 'Query', viewer: { __typename: 'Membership', id: string } | null, userMemberships: Array<{ __typename: 'Membership', id: string, organizationId: string }> };

export type AccountAuthenticatedPageSetActiveMembershipMutationVariables = Exact<{
  input: UserSetOrganizationInput;
}>;


export type AccountAuthenticatedPageSetActiveMembershipMutation = { __typename: 'Mutation', userSetOrganization: { __typename: 'UserSetOrganizationPayload', membershipId: string | null } | null };

export type AccountAuthenticatedPageAssignAnonymousResourcesMutationVariables = Exact<{ [key: string]: never; }>;


export type AccountAuthenticatedPageAssignAnonymousResourcesMutation = { __typename: 'Mutation', membershipConnectAnonymousResources: { __typename: 'MembershipConnectAnonymousResourcesPayload', membership: { __typename: 'Membership', id: string } } | null };

export type ViewerMembershipsIndexPageGetDataQuerVariables = Exact<{ [key: string]: never; }>;


export type ViewerMembershipsIndexPageGetDataQuer = { __typename: 'Query', userMemberships: Array<{ __typename: 'Membership', id: string, humanizedRole: string | null, organization: { __typename: 'Organization', id: string, name: string | null } }> };

export type LogoutUserQueryVariables = Exact<{ [key: string]: never; }>;


export type LogoutUserQuery = { __typename: 'Mutation', userLogout: { __typename: 'UserLogoutPayload', success: boolean } | null };

export type GuideShowPageMarketingSubscribeMutationVariables = Exact<{
  input: SubscriberCreateInput;
}>;


export type GuideShowPageMarketingSubscribeMutation = { __typename: 'Mutation', subscriberCreate: { __typename: 'SubscriberCreatePayload', subscriber: { __typename: 'Subscriber', id: string } | null } | null };

export type AvatarImageFragment = { __typename: 'FileField', id: any, responsiveImage: { __typename: 'ResponsiveImage', srcSet: string, webpSrcSet: string, sizes: string, src: string, width: any, height: any, aspectRatio: any, alt: string | null, title: string | null, base64: string | null } | null };

export type BlogPostCardArticleFragment = { __typename: 'ArticleRecord', id: any, _publishedAt: any | null, _createdAt: any, title: string | null, slug: string | null, shortDescription: string | null, image: { __typename: 'FileField', responsiveImage: { __typename: 'ResponsiveImage', srcSet: string, webpSrcSet: string, sizes: string, src: string, width: any, height: any, aspectRatio: any, alt: string | null, title: string | null, base64: string | null } | null } | null, author: { __typename: 'AuthorRecord', id: any, name: string | null, image: { __typename: 'FileField', id: any, responsiveImage: { __typename: 'ResponsiveImage', srcSet: string, webpSrcSet: string, sizes: string, src: string, width: any, height: any, aspectRatio: any, alt: string | null, title: string | null, base64: string | null } | null } | null } | null, categories: Array<{ __typename: 'CategoryRecord', id: any, name: string | null, slug: string | null }> };

export type CatalogProductProductFragment = { __typename: 'CatalogProduct', id: string, name: string, slug: string };

export type CatalogProductColorGridProductFragment = { __typename: 'Product', id: string, productOptions: { __typename: 'ProductOptionConnection', edges: Array<{ __typename: 'ProductOptionEdge', node: { __typename: 'CheckboxOption', entityId: number } | { __typename: 'DateFieldOption', entityId: number } | { __typename: 'FileUploadFieldOption', entityId: number } | { __typename: 'MultiLineTextFieldOption', entityId: number } | { __typename: 'MultipleChoiceOption', displayName: string, entityId: number, values: { __typename: 'ProductOptionValueConnection', edges: Array<{ __typename: 'ProductOptionValueEdge', node: { __typename: 'MultipleChoiceOptionValue', entityId: number, label: string } | { __typename: 'ProductPickListOptionValue', entityId: number, label: string } | { __typename: 'SwatchOptionValue', hexColors: Array<string>, entityId: number, label: string } }> | null } } | { __typename: 'NumberFieldOption', entityId: number } | { __typename: 'TextFieldOption', entityId: number } }> | null } };

export type CatalogProductLegacyProductFragment = { __typename: 'Product', id: string, humanizedName: string, path: string, sku: string, prices: { __typename: 'Prices', price: { __typename: 'Money', value: any } } | null, brand: { __typename: 'Brand', id: string, name: string, path: string } | null, defaultImage: { __typename: 'Image', altText: string, url: string } | null, productOptions: { __typename: 'ProductOptionConnection', edges: Array<{ __typename: 'ProductOptionEdge', node: { __typename: 'CheckboxOption', entityId: number } | { __typename: 'DateFieldOption', entityId: number } | { __typename: 'FileUploadFieldOption', entityId: number } | { __typename: 'MultiLineTextFieldOption', entityId: number } | { __typename: 'MultipleChoiceOption', displayName: string, entityId: number, values: { __typename: 'ProductOptionValueConnection', edges: Array<{ __typename: 'ProductOptionValueEdge', node: { __typename: 'MultipleChoiceOptionValue', entityId: number, label: string } | { __typename: 'ProductPickListOptionValue', entityId: number, label: string } | { __typename: 'SwatchOptionValue', hexColors: Array<string>, entityId: number, label: string } }> | null } } | { __typename: 'NumberFieldOption', entityId: number } | { __typename: 'TextFieldOption', entityId: number } }> | null } };

export type CatalogProductVariantPreviewProductFragment = { __typename: 'Product', id: string, name: string, defaultImage: { __typename: 'Image', url: string } | null, allImages: Array<{ __typename: 'CatalogProductImage', urlStandard: string, urlZoom: string, urlThumbnail: string }>, variants: { __typename: 'VariantConnection', edges: Array<{ __typename: 'VariantEdge', node: { __typename: 'Variant', id: string, entityId: number, defaultImage: { __typename: 'Image', isDefault: boolean, url: string } | null, metafields: { __typename: 'MetafieldConnection', edges: Array<{ __typename: 'MetafieldEdge', node: { __typename: 'Metafields', id: string, key: string, value: string } }> | null } } }> | null } };

export type CmsImageFragment = { __typename: 'ResponsiveImage', srcSet: string, webpSrcSet: string, sizes: string, src: string, width: any, height: any, aspectRatio: any, alt: string | null, title: string | null, base64: string | null };

export type CmsSeoTagsFragment = { __typename: 'Tag', attributes: any | null, content: string | null, tag: string };

export type CmsStructuredTextContentFragment = { __typename: 'ArticleModelContentField', value: any, blocks: Array<{ __typename: 'ImageRecord', id: any, image: { __typename: 'FileField', id: any, responsiveImage: { __typename: 'ResponsiveImage', srcSet: string, webpSrcSet: string, sizes: string, src: string, width: any, height: any, aspectRatio: any, alt: string | null, title: string | null, base64: string | null } | null } | null }>, links: Array<{ __typename: 'ArticleRecord', id: any, slug: string | null, title: string | null, shortDescription: string | null } | { __typename: 'CustomComponentRecord', id: any, componentId: string | null } | { __typename: 'GlossaryEntryRecord', id: any, slug: string | null, term: string | null, entryType: string | null } | { __typename: 'TableRecord', id: any, table: any | null }> };

export type CmsStructuredTextPrivacyPolicyContentFragment = { __typename: 'PrivacyPolicyPageModelContentField', value: any };

export type CmsStructuredTextTermsOfUseContentFragment = { __typename: 'TermsOfUsePageModelContentField', value: any };

export type CmsStructuredTextCategoryDescriptionFragment = { __typename: 'CategoryModelDescriptionField', value: any };

export type CmsStructuredTextGlossaryDescriptionFragment = { __typename: 'GlossaryEntryModelDescriptionField', value: any, blocks: Array<{ __typename: 'ImageRecord', id: any, image: { __typename: 'FileField', id: any, responsiveImage: { __typename: 'ResponsiveImage', srcSet: string, webpSrcSet: string, sizes: string, src: string, width: any, height: any, aspectRatio: any, alt: string | null, title: string | null, base64: string | null } | null } | null }>, links: Array<{ __typename: 'ArticleRecord', id: any, slug: string | null, title: string | null } | { __typename: 'GlossaryEntryRecord', id: any, slug: string | null, term: string | null }> };

export type CmsStructuredTextRichContentRecordFragment = { __typename: 'RichContentModelContentField', value: any, blocks: Array<{ __typename: 'ImageRecord', id: any, image: { __typename: 'FileField', id: any, responsiveImage: { __typename: 'ResponsiveImage', srcSet: string, webpSrcSet: string, sizes: string, src: string, width: any, height: any, aspectRatio: any, alt: string | null, title: string | null, base64: string | null } | null } | null }> };

export type CmsStructuredTextTableOfContentsContentFragment = { __typename: 'ArticleModelContentField', value: any };

export type CmsStructuredTextTableOfContentsGlossaryTermDescriptionFragment = { __typename: 'GlossaryEntryModelDescriptionField', value: any };

export type FeaturePageContainerCatalogFragment = { __typename: 'Site', featuredProducts: { __typename: 'ProductConnection', edges: Array<{ __typename: 'ProductEdge', node: { __typename: 'Product', id: string, name: string, path: string, brand: { __typename: 'Brand', id: string, path: string } | null, defaultImage: { __typename: 'Image', url: string } | null } }> | null } };

export type FeaturedProductsGridCatalogFragment = { __typename: 'Site', featuredProducts: { __typename: 'ProductConnection', edges: Array<{ __typename: 'ProductEdge', node: { __typename: 'Product', id: string, name: string, path: string, brand: { __typename: 'Brand', id: string, path: string } | null, defaultImage: { __typename: 'Image', url: string } | null } }> | null } };

export type CmsImageFullScreenImageFragment = { __typename: 'ResponsiveImage', srcSet: string, webpSrcSet: string, sizes: string, src: string, width: any, height: any, aspectRatio: any, alt: string | null, title: string | null, base64: string | null };

export type IndustryTermCardTermFragment = { __typename: 'GlossaryEntryRecord', id: any, slug: string | null, entryType: string | null, definition: string | null, term: string | null };

export type UseSubscribeInlineSubscribeMutationVariables = Exact<{
  input: SubscriberCreateInput;
}>;


export type UseSubscribeInlineSubscribeMutation = { __typename: 'Mutation', subscriberCreate: { __typename: 'SubscriberCreatePayload', subscriber: { __typename: 'Subscriber', id: string, email: string } | null } | null };

export type UserAvatarUserFragment = { __typename: 'User', id: string, name: string | null, picture: string | null };

export type UserBadgeUserFramgent = { __typename: 'User', id: string, name: string | null, picture: string | null };

export type MixpanelProviderGetDataQueryVariables = Exact<{ [key: string]: never; }>;


export type MixpanelProviderGetDataQuery = { __typename: 'Query', viewer: { __typename: 'Membership', id: string, organization: { __typename: 'Organization', id: string, name: string | null }, user: { __typename: 'User', createdAt: any | null, id: string, intercomUserHash: string | null, email: string | null, name: string | null, phoneNumber: string | null, picture: string | null } | null } | null };

export type OrganizationCreateDialogCreateOrganizationMutationVariables = Exact<{
  input: UserOrganizationCreateInput;
}>;


export type OrganizationCreateDialogCreateOrganizationMutation = { __typename: 'Mutation', userOrganizationCreate: { __typename: 'UserOrganizationCreatePayload', organization: { __typename: 'Organization', id: string } | null, membership: { __typename: 'Membership', id: string } | null } | null };

export type UserInviteDialogInviteMemberMutationVariables = Exact<{
  input: MembershipInviteInput;
}>;


export type UserInviteDialogInviteMemberMutation = { __typename: 'Mutation', membershipInvite: { __typename: 'MembershipInvitePayload', memberships: Array<{ __typename: 'Membership', id: string, organizationId: string }> } | null };

export type UseFeatureFlagsGetDataQueryVariables = Exact<{ [key: string]: never; }>;


export type UseFeatureFlagsGetDataQuery = { __typename: 'Query', viewer: { __typename: 'Membership', id: string, flags: { __typename: 'MembershipFlags', isBetaTester: boolean } } | null };

export type UseFileUploadCreateFileMutationVariables = Exact<{
  input: FileCreateBatchInput;
}>;


export type UseFileUploadCreateFileMutation = { __typename: 'Mutation', fileCreateBatch: { __typename: 'FileCreateBatchPayload', files: Array<{ __typename: 'FileImage', id: string, name: string } | { __typename: 'FilePdf', id: string, name: string } | { __typename: 'FileUnknown', id: string, name: string }> | null } | null };

export type UseProductColorsProductFragment = { __typename: 'Product', id: string, productOptions: { __typename: 'ProductOptionConnection', edges: Array<{ __typename: 'ProductOptionEdge', node: { __typename: 'CheckboxOption', entityId: number } | { __typename: 'DateFieldOption', entityId: number } | { __typename: 'FileUploadFieldOption', entityId: number } | { __typename: 'MultiLineTextFieldOption', entityId: number } | { __typename: 'MultipleChoiceOption', displayName: string, entityId: number, values: { __typename: 'ProductOptionValueConnection', edges: Array<{ __typename: 'ProductOptionValueEdge', node: { __typename: 'MultipleChoiceOptionValue', entityId: number, label: string } | { __typename: 'ProductPickListOptionValue', entityId: number, label: string } | { __typename: 'SwatchOptionValue', hexColors: Array<string>, entityId: number, label: string } }> | null } } | { __typename: 'NumberFieldOption', entityId: number } | { __typename: 'TextFieldOption', entityId: number } }> | null } };

export type UseSetUserOrganizationSetMembershipMutationVariables = Exact<{
  input: UserSetOrganizationInput;
}>;


export type UseSetUserOrganizationSetMembershipMutation = { __typename: 'Mutation', userSetOrganization: { __typename: 'UserSetOrganizationPayload', membershipId: string | null } | null };

export type UseUserOnboardingGetDataQueryVariables = Exact<{ [key: string]: never; }>;


export type UseUserOnboardingGetDataQuery = { __typename: 'Query', viewer: { __typename: 'Membership', id: string, user: { __typename: 'User', id: string, onboarding: { __typename: 'UserOnboarding', id: string, seenDesignRequestDraftOnboarding: boolean | null, seenDesignIndexPageOnboardingBanner: boolean | null, seenInventoryIndexPageOnboardingBanner: boolean | null } | null } | null } | null };

export type UseUserOnboardingUpdateOnboardingMutationVariables = Exact<{
  input: UserOnboardingUpdateInput;
}>;


export type UseUserOnboardingUpdateOnboardingMutation = { __typename: 'Mutation', userOnboardingUpdate: { __typename: 'UserOnboardingUpdatePayload', userOnboarding: { __typename: 'UserOnboarding', id: string } | null } | null };

export type AccountMembershipAcceptPageMembershipInviteFragment = { __typename: 'MembershipInvite', id: string, membershipId: string, invitedEmail: string | null, organizationName: string | null };

export type AccountMemberhsipAcceptPageAcceptMembershipMutationVariables = Exact<{
  input: MembershipInviteAcceptInput;
}>;


export type AccountMemberhsipAcceptPageAcceptMembershipMutation = { __typename: 'Mutation', membershipInviteAccept: { __typename: 'MembershipInviteAcceptPayload', membership: { __typename: 'Membership', id: string } } | null };

export type ClosetDashboardPageGetDataQueryVariables = Exact<{ [key: string]: never; }>;


export type ClosetDashboardPageGetDataQuery = { __typename: 'Query', viewer: { __typename: 'Membership', id: string, user: { __typename: 'User', id: string, name: string | null } | null } | null };

export type UnclaimedDesignRequestsCardGetDataQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
}>;


export type UnclaimedDesignRequestsCardGetDataQuery = { __typename: 'Query', viewer: { __typename: 'Membership', id: string, unassignedDesignRequests: { __typename: 'DesignRequestConnection', edges: Array<{ __typename: 'DesignRequestEdge', node: { __typename: 'DesignRequest', id: string, name: string, membership: { __typename: 'Membership', id: string, organization: { __typename: 'Organization', id: string, name: string | null }, user: { __typename: 'User', id: string, name: string | null } | null } | null } | null } | null> | null } } | null };

export type ClosetDesignProofCreatePageDesignRequestFragment = { __typename: 'DesignRequest', id: string, fileUploadDirectory: string, designRequestProduct: { __typename: 'DesignRequestProduct', id: string, colors: Array<{ __typename: 'DesignRequestProductColors', name: string | null, hexCode: string | null, catalogProductColorId: string }> } };

export type CreateProofFormDesignRequestFragment = { __typename: 'DesignRequest', id: string, designRequestProduct: { __typename: 'DesignRequestProduct', id: string, colors: Array<{ __typename: 'DesignRequestProductColors', name: string | null, hexCode: string | null, catalogProductColorId: string }> } };

export type ProofVariantInputDesignRequestFragment = { __typename: 'DesignRequest', designRequestProduct: { __typename: 'DesignRequestProduct', id: string, colors: Array<{ __typename: 'DesignRequestProductColors', name: string | null, hexCode: string | null, catalogProductColorId: string }> } };

export type UseCreateProofCreateProofVariables = Exact<{
  input: DesignRequestProofCreateInput;
}>;


export type UseCreateProofCreateProof = { __typename: 'Mutation', designRequestProofCreate: { __typename: 'DesignRequestProofCreatePayload', designRequest: { __typename: 'DesignRequest', id: string } | null } | null };

export type ClosetInboxIndexPageNotificationFragment = { __typename: 'Notification', id: string, createdAt: any, channels: Array<{ __typename: 'NotificationChannelEmail', id: string } | { __typename: 'NotificationChannelWeb', message: string, ctaText: string | null, ctaUrl: string | null, seenAt: any | null, id: string } | null> };

export type UseMarkNotificationAsSeenMarkAsSeenMutationVariables = Exact<{
  input: NotificationMarkAsSeenInput;
}>;


export type UseMarkNotificationAsSeenMarkAsSeenMutation = { __typename: 'Mutation', notificationMarkAsSeen: { __typename: 'NotificationMarkAsSeenPayload', notification: { __typename: 'Notification', id: string } | null } | null };

export type ClosetOrdersDesktopTableOrderFragment = { __typename: 'Order', id: string, humanOrderId: string, paymentStatus: OrderPaymentStatus, statusTemporary: OrderStatusTemporary, humanStatusTemporary: string, humanPaymentStatus: string, totalTaxCents: number, totalPriceCents: number, createdAt: any, organization: { __typename: 'Organization', id: string, name: string | null } | null };

export type ClosetOrdersIndexPageGetDataQueryVariables = Exact<{
  first: Scalars['Int']['input'];
  after?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<MembershipOrdersFilterInput>;
}>;


export type ClosetOrdersIndexPageGetDataQuery = { __typename: 'Query', viewer: { __typename: 'Membership', id: string, hasOrders: boolean, orders: { __typename: 'OrderConnection', edges: Array<{ __typename: 'OrderEdge', node: { __typename: 'Order', id: string, humanOrderId: string, paymentStatus: OrderPaymentStatus, statusTemporary: OrderStatusTemporary, humanStatusTemporary: string, humanPaymentStatus: string, totalTaxCents: number, totalPriceCents: number, createdAt: any, organization: { __typename: 'Organization', id: string, name: string | null } | null } | null } | null> | null, pageInfo: { __typename: 'PageInfo', hasNextPage: boolean, endCursor: string | null } } | null } | null };

export type ClosetSettingsGeneralPageUserFragment = { __typename: 'User', id: string, name: string | null, email: string | null, picture: string | null };

export type ClosetSettingsOrganizationPageOrganizationFragment = { __typename: 'Organization', id: string, name: string | null };

export type UseClosetSettingsOrganizationPageUpdateOrganizationMutationVariables = Exact<{
  input: OrganizationUpdateInput;
}>;


export type UseClosetSettingsOrganizationPageUpdateOrganizationMutation = { __typename: 'Mutation', organizationUpdate: { __typename: 'OrganizationUpdatePayload', organization: { __typename: 'Organization', id: string } | null } | null };

export type ClosetSettingsTeamPageMembershipFragment = { __typename: 'Membership', id: string, createdAt: any, humanizedRole: string | null, invitedEmail: string | null, user: { __typename: 'User', id: string, name: string | null, email: string | null } | null };

export type ClosetSettingsTeamPageResendInviteMutationVariables = Exact<{
  input: MembershipInviteResendInput;
}>;


export type ClosetSettingsTeamPageResendInviteMutation = { __typename: 'Mutation', membershipInviteResend: { __typename: 'MembershipInviteResendPayload', membership: { __typename: 'Membership', id: string } } | null };

export type ClosetSettingsTeamPageRevokeInviteMutationVariables = Exact<{
  input: MembershipInviteRevokeInput;
}>;


export type ClosetSettingsTeamPageRevokeInviteMutation = { __typename: 'Mutation', membershipInviteRevoke: { __typename: 'MembershipInviteRevokePayload', membership: { __typename: 'Membership', id: string } } | null };

export type ClosetSettingsTeamPageTableDesktopMembershipFragment = { __typename: 'Membership', id: string, createdAt: any, humanizedRole: string | null, invitedEmail: string | null, user: { __typename: 'User', id: string, name: string | null, email: string | null } | null };

export type ClosetSettingsTeamPageTableMobileMemberFragment = { __typename: 'Membership', id: string, createdAt: any, humanizedRole: string | null, user: { __typename: 'User', id: string, name: string | null, email: string | null } | null };

export type IndustryTermsCategoryShowPageCategoryFragment = { __typename: 'GlossaryCategoryRecord', id: any, title: string | null, slug: string | null };

export type IndustryTermsCategoryShowPageEntryFragment = { __typename: 'GlossaryEntryRecord', id: any, slug: string | null, entryType: string | null, definition: string | null, term: string | null };

export type OrderDetailsPageOrderFragment = { __typename: 'Order', id: string, createdAt: any, humanOrderId: string, paymentStatus: OrderPaymentStatus, humanPaymentStatus: string, totalTaxCents: number, statusTemporary: OrderStatusTemporary, totalShippingCents: number, subtotalPriceCents: number, totalProcessingFeeCents: number, totalPriceCents: number, totalAmountDueCents: number, totalAmountRefundedCents: number, customerEmail: string | null, customerPhone: string | null, items: Array<{ __typename: 'OrderItem', id: string, title: string, quantity: number, unitPriceCents: number, totalPriceCents: number, designProduct: { __typename: 'DesignProduct', id: string, name: string } | null }>, lastPaymentMethod: { __typename: 'PaymentMethod', id: string, type: string, card: { __typename: 'PaymentMethodCard', brand: string | null, last4: string | null, expMonth: number | null, expYear: number | null } | null, billingDetails: { __typename: 'PaymentMethodBillingDetails', line1: string | null, line2: string | null, city: string | null, state: string | null, postalCode: string | null, country: string | null } | null } | null, fulfillments: Array<{ __typename: 'Fulfillment', id: string, trackingInfo: { __typename: 'FulfillmentTrackingInfo', id: string, trackingNumber: string, trackingUrl: string } }>, shippingAddress: { __typename: 'MailingAddress', id: string, firstName: string | null, lastName: string | null, company: string | null, phone: string | null, address1: string | null, address2: string | null, city: string | null, country: string | null, province: string | null, provinceCode: string | null, zip: string | null } | null };

export type OrderDetailsPageBillingDetailsOrderFragment = { __typename: 'Order', id: string, totalTaxCents: number, totalShippingCents: number, totalPriceCents: number, subtotalPriceCents: number, totalProcessingFeeCents: number, totalAmountDueCents: number, totalAmountRefundedCents: number, lastPaymentMethod: { __typename: 'PaymentMethod', id: string, type: string, card: { __typename: 'PaymentMethodCard', brand: string | null, last4: string | null, expMonth: number | null, expYear: number | null } | null, billingDetails: { __typename: 'PaymentMethodBillingDetails', line1: string | null, line2: string | null, city: string | null, state: string | null, postalCode: string | null, country: string | null } | null } | null };

export type OrderDetailsPageLineItemsItemFragment = { __typename: 'OrderItem', id: string, title: string, quantity: number, unitPriceCents: number, totalPriceCents: number, designProduct: { __typename: 'DesignProduct', id: string, name: string } | null };

export type OrderDetailsPageShippingDetailsOrderFragment = { __typename: 'Order', id: string, customerEmail: string | null, customerPhone: string | null, statusTemporary: OrderStatusTemporary, fulfillments: Array<{ __typename: 'Fulfillment', id: string, trackingInfo: { __typename: 'FulfillmentTrackingInfo', id: string, trackingNumber: string, trackingUrl: string } }>, shippingAddress: { __typename: 'MailingAddress', id: string, firstName: string | null, lastName: string | null, company: string | null, phone: string | null, address1: string | null, address2: string | null, city: string | null, country: string | null, province: string | null, provinceCode: string | null, zip: string | null } | null };

export type UseUpdateOrderStatusUpdateStatusMutationVariables = Exact<{
  input: OrderStatusTemporaryUpdateInput;
}>;


export type UseUpdateOrderStatusUpdateStatusMutation = { __typename: 'Mutation', orderStatusTemporaryUpdate: { __typename: 'OrderStatusTemporaryUpdatePayload', order: { __typename: 'Order', id: string } | null } | null };

export type OrderPayPagePaymentIntentFragment = { __typename: 'PaymentIntent', id: string, clientSecret: string | null, amount: number };

export type OrderPayPageOrderFragment = { __typename: 'Order', id: string, totalTaxCents: number, totalPriceCents: number, totalShippingCents: number, subtotalPriceCents: number, totalProcessingFeeCents: number, totalAmountPaidCents: number, totalAmountDueCents: number, itemSummaries: Array<{ __typename: 'OrderItemSummary', id: string, title: string, quantity: number, totalPriceCents: number }> };

export type OrderPayPageOrderPreviewItemFragment = { __typename: 'Order', id: string, totalTaxCents: number, totalPriceCents: number, totalAmountPaidCents: number, totalAmountDueCents: number, totalShippingCents: number, subtotalPriceCents: number, totalProcessingFeeCents: number, itemSummaries: Array<{ __typename: 'OrderItemSummary', id: string, title: string, quantity: number, totalPriceCents: number }> };

export type UseConfirmOrderConfirmOrderMutationVariables = Exact<{
  input: OrderConfirmInput;
}>;


export type UseConfirmOrderConfirmOrderMutation = { __typename: 'Mutation', orderConfirm: { __typename: 'OrderConfirmPayload', order: { __typename: 'Order', id: string } | null } | null };

export type UseAuthorizedComponentGetDataQueryVariables = Exact<{ [key: string]: never; }>;


export type UseAuthorizedComponentGetDataQuery = { __typename: 'Query', viewer: { __typename: 'Membership', id: string, role: MembershipRole | null, scopes: Array<{ __typename: 'Scope', resource: ScopeResource, action: ScopeAction }> } | null };

export type AcceptMembershipPageSetActiveMembershipMutationVariables = Exact<{
  input: UserSetOrganizationInput;
}>;


export type AcceptMembershipPageSetActiveMembershipMutation = { __typename: 'Mutation', userSetOrganization: { __typename: 'UserSetOrganizationPayload', organizationId: string | null } | null };

export type AcceptMembershipPageGetDataQueryVariables = Exact<{
  membershipId: Scalars['ID']['input'];
}>;


export type AcceptMembershipPageGetDataQuery = { __typename: 'Query', membershipInvite: { __typename: 'MembershipInvite', id: string, membershipId: string, organizationId: string, accepted: boolean, invitedEmail: string | null, organizationName: string | null } };

export type OrderPayPageGetDataQueryVariables = Exact<{
  orderId: Scalars['ID']['input'];
}>;


export type OrderPayPageGetDataQuery = { __typename: 'Query', order: { __typename: 'Order', id: string, totalAmountDueCents: number, totalTaxCents: number, totalPriceCents: number, totalShippingCents: number, subtotalPriceCents: number, totalProcessingFeeCents: number, totalAmountPaidCents: number, itemSummaries: Array<{ __typename: 'OrderItemSummary', id: string, title: string, quantity: number, totalPriceCents: number }> } | null };

export type OrderPayPageCreatepaymentIntentVariables = Exact<{
  input: PaymentIntentCreateInput;
}>;


export type OrderPayPageCreatepaymentIntent = { __typename: 'Mutation', paymentIntentCreate: { __typename: 'PaymentIntentCreatePayload', paymentIntent: { __typename: 'PaymentIntent', id: string, clientSecret: string | null, amount: number } | null } | null };
