export interface ServerError {
  status: number
  title: string
  type?: string
  code?: number
  errors?: any
}

export type ResponseTuple<T> = [ServerError, null] | [null, T]

// These are the types that are exposed by the BigCommerce SDK to the client.
export enum BigCommerceCategoryMetadataKey {
  ssactivewear_category_id = 'ssactivewear_category_id',
}

export interface BigCommerceCategory {
  id: number
  name: string
  visible: boolean
  slug: string
  parentId: number
  imageUrl?: string
  description: string | undefined
  metadata:
    | {
        ssActivewearCategoryId?: string
      }
    | undefined
}

export interface BigCommerceProductCustomField {
  id: number
  name: string
  value: string
}

interface MetadataBase {
  id: number
  key: unknown
  value: unknown
  namespace: 'main' | string
  resourceId: number
  permissionSet:
    | 'app_only'
    | 'read'
    | 'write'
    | 'read_and_sf_access'
    | 'write_and_sf_access'
  dateCreated: string
  dateModified: string
}

interface ProductMetadataBase extends MetadataBase {
  resourceType: 'product'
}

interface ProductMetadataProductDistributor extends ProductMetadataBase {
  key: 'source'
  value: 'ss-activewear'
}

interface ProductMetadataProductDistributorProductId
  extends ProductMetadataBase {
  key: 'style_id'
  value: string
}

interface ProductMetadataHasAiDescription extends ProductMetadataBase {
  key: 'updated_description_at'
  value: string
}

interface ProductMetadataDisplayName extends ProductMetadataBase {
  key: 'display_name'
  value: string
}

export type BigCommerceProductMetadata =
  | ProductMetadataProductDistributor
  | ProductMetadataProductDistributorProductId
  | ProductMetadataHasAiDescription
  | ProductMetadataDisplayName

interface ProductVariantMetadataBase extends MetadataBase {
  resourceType: 'variant'
}

interface ProductVariantMetadataImageGroup extends ProductVariantMetadataBase {
  key: 'image_group'
  value: string
}

export type BigCommerceProductVariantMetadata = ProductVariantMetadataImageGroup

type SnakeToCamelCase<S extends string> =
  S extends `${infer First}_${infer Rest}`
    ? `${Lowercase<First>}${Capitalize<SnakeToCamelCase<Rest>>}`
    : Lowercase<S>

type MetadataMapping<T extends BigCommerceProductMetadata> = {
  [K in T['key'] as SnakeToCamelCase<K>]?: Extract<T, { key: K }>['value']
}

type ProductMetadataMap = MetadataMapping<BigCommerceProductMetadata>

export interface BigCommerceProduct {
  id: number
  name: string
  sku: string
  brandName: string | undefined
  brandId: number | undefined
  categoryIds: number[]
  description: string | undefined
  metadata: BigCommerceProductMetadata[] | undefined
  metadataMap: ProductMetadataMap | undefined
  customFields: BigCommerceProductCustomField[] | undefined
  inventoryTracking: 'none' | 'product' | 'variant'
  availability: 'available' | 'disabled' | 'preorder'
  images: BigCommerceProductImage[] | undefined
  url: string | null
}

export interface BigCommerceProductImage {
  id: number
  productId: number
  isThumbnail: boolean
  imageFile: string
  sortOrder: number
  urlStandard: string
  urlThumbnail: string
  urlTiny: string
}

export enum BigCommerceProductOptionType {
  RadioButtons = 'radio_buttons',
  Rectangles = 'rectangles',
  Dropdown = 'dropdown',
  ProductList = 'product_list',
  ProductListWithImages = 'product_list_with_images',
  Swatch = 'swatch',
}

export interface BigCommerceProductVariantOption {
  id: number
  productId: number
  displayName: string
  type: BigCommerceProductOptionType
  optionValues: BigCommerceProductVariantOptionValue[]
}

export interface BigCommerceProductVariantOptionValue {
  id: number
  label: string
  sortOrder: number
  valueData?: {
    colors?: string[]
  }
}

export interface BigCommerceProductVariant {
  id: number
  productId: number
  sku: string
  skuId: number | null
  price: number | null
  calculatedPrice: number
  costPrice: number | null
  salePrice: number | null
  retailPrice: number | null
  weight: number | null
  width: number | null
  height: number | null
  depth: number | null
  purchasingDisabled: boolean
  imageUrl?: string
  upc?: string
  mpn?: string
  gtin?: string
  inventoryLevel: number
  optionValues: BigCommerceProductVariantOptionValue[]
  metadata: BigCommerceProductMetadata[] | undefined
}

export interface BigCommerceBrand {
  id: number
  name: string
}
