/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum ArticleModelOrderBy {
  _createdAt_ASC = "_createdAt_ASC",
  _createdAt_DESC = "_createdAt_DESC",
  _firstPublishedAt_ASC = "_firstPublishedAt_ASC",
  _firstPublishedAt_DESC = "_firstPublishedAt_DESC",
  _isValid_ASC = "_isValid_ASC",
  _isValid_DESC = "_isValid_DESC",
  _publicationScheduledAt_ASC = "_publicationScheduledAt_ASC",
  _publicationScheduledAt_DESC = "_publicationScheduledAt_DESC",
  _publishedAt_ASC = "_publishedAt_ASC",
  _publishedAt_DESC = "_publishedAt_DESC",
  _status_ASC = "_status_ASC",
  _status_DESC = "_status_DESC",
  _unpublishingScheduledAt_ASC = "_unpublishingScheduledAt_ASC",
  _unpublishingScheduledAt_DESC = "_unpublishingScheduledAt_DESC",
  _updatedAt_ASC = "_updatedAt_ASC",
  _updatedAt_DESC = "_updatedAt_DESC",
  createdAt_ASC = "createdAt_ASC",
  createdAt_DESC = "createdAt_DESC",
  id_ASC = "id_ASC",
  id_DESC = "id_DESC",
  title_ASC = "title_ASC",
  title_DESC = "title_DESC",
  updatedAt_ASC = "updatedAt_ASC",
  updatedAt_DESC = "updatedAt_DESC",
}

export enum DesignRequestHistoryItemDesignRequestEventMethod {
  CREATE = "CREATE",
}

export enum DesignRequestStatus {
  APPROVED = "APPROVED",
  AWAITING_APPROVAL = "AWAITING_APPROVAL",
  AWAITING_REVISION = "AWAITING_REVISION",
  DRAFT = "DRAFT",
  REJECTED = "REJECTED",
  SUBMITTED = "SUBMITTED",
}

export enum FileType {
  IMAGE = "IMAGE",
  PDF = "PDF",
  UNKNOWN = "UNKNOWN",
  VIDEO = "VIDEO",
}

export enum ItemStatus {
  draft = "draft",
  published = "published",
  updated = "updated",
}

export enum MembershipRole {
  OWNER = "OWNER",
  STITCHI_DESIGNER = "STITCHI_DESIGNER",
}

export enum OrderPaymentStatus {
  NOT_PAID = "NOT_PAID",
  PAID = "PAID",
  PARTIALLY_PAID = "PARTIALLY_PAID",
  PARTIALLY_REFUNDED = "PARTIALLY_REFUNDED",
  REFUNDED = "REFUNDED",
}

export enum ScopeAction {
  CREATE = "CREATE",
  DELETE = "DELETE",
  READ = "READ",
  UPDATE = "UPDATE",
}

export enum ScopeResource {
  DesignProof = "DesignProof",
  DesignRequestRevisionRequest = "DesignRequestRevisionRequest",
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

export interface DateFilterInput {
  gte?: string | null;
  lte?: string | null;
}

export interface DesignRequestConversationMessageCreateInput {
  designRequestId: string;
  message: string;
  fileIds: string[];
}

export interface DesignRequestDesignLocationCreateInput {
  designRequestId: string;
  description?: string | null;
  placement: string;
  fileIds: string[];
}

export interface DesignRequestDesignLocationDeleteInput {
  designRequestId: string;
  designRequestDesignLocationId: string;
}

export interface DesignRequestDesignLocationUpdateInput {
  designRequestId: string;
  designRequestDesignLocationId: string;
  description?: string | null;
  placement?: string | null;
  fileIds: string[];
}

export interface DesignRequestProofCreateInput {
  designRequestId: string;
  note?: string | null;
  fileIds: string[];
  proofLocations: DesignRequestProofCreateProofLocationInput[];
}

export interface DesignRequestProofCreateProofLocationInput {
  colorCount?: number | null;
  placement: string;
  fileId: string;
}

export interface DesignRequestRevisionRequestCreateInput {
  designRequestId: string;
  description: string;
  fileIds: string[];
}

export interface DesignRequestSubmitInput {
  designRequestId: string;
}

export interface DesignRequestUpdateInput {
  designRequestId: string;
  name?: string | null;
  description?: string | null;
  useCase?: string | null;
  fileIds?: string[] | null;
}

export interface FileCreateBatchInput {
  files: FileCreateInput[];
}

export interface FileCreateInput {
  fileType: FileType;
  name: string;
  originalFilename: string;
  url: string;
  bytes: number;
  format: string;
  cloudinaryAssetId?: string | null;
  width?: number | null;
  height?: number | null;
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

export interface MembershipDesignRequestsFilterInput {
  where?: MembershipDesignRequestsWhereFilterInput | null;
}

export interface MembershipDesignRequestsWhereFilterInput {
  createdAt?: DateFilterInput | null;
}

export interface MembershipOrdersFilterInput {
  where?: MembershipOrdersWhereFilterInput | null;
}

export interface MembershipOrdersWhereFilterInput {
  createdAt?: DateFilterInput | null;
}

/**
 * A variant option value id input object
 */
export interface OptionValueId {
  optionEntityId: number;
  valueEntityId: number;
}

export interface OrderCartCreateInput {
  productEntityId: number;
  includeFulfillment: boolean;
  printLocations: OrderCartCreatePrintLocationInput[];
  items: OrderCartCreateItemsInput[];
  shippingAddressId?: string | null;
}

export interface OrderCartCreateItemsInput {
  productVariantEntityId: number;
  quantity: number;
}

export interface OrderCartCreatePrintLocationInput {
  colorCount: number;
}

export interface OrderConfirmInput {
  orderId: string;
  customerEmail: string;
  customerFirstName: string;
  customerLastName: string;
  customerPhone: string;
  shippingAddress: OrderConfirmMailingAddressInput;
}

export interface OrderConfirmMailingAddressInput {
  name?: string | null;
  phone?: string | null;
  company?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  address1?: string | null;
  address2?: string | null;
  city?: string | null;
  country?: string | null;
  province?: string | null;
  provinceCode?: string | null;
  zip?: string | null;
}

export interface PaymentIntentCreateInput {
  orderId: string;
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

export interface SubscriberCreateInput {
  email: string;
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

export interface UserSetOrganizationInput {
  membershipId: string;
  organizationId: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
