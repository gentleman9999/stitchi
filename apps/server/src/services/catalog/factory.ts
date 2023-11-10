import {
  BigCommerceBrand,
  BigCommerceCategory,
  BigCommerceOptionValue,
  BigCommerceProduct,
  BigCommerceProductVariant,
} from '../../bigcommerce'
import { notEmpty } from '../../utils'

export interface BigCommerceImage {
  url: string
  order?: number | null
  isThumbnail?: boolean | null
}

export interface CatalogFactoryCatalogProduct {
  id: string
  name: string
  priceCents: number
  description: string
  primaryImage?: BigCommerceImage | null
  images: BigCommerceImage[]
  visible: boolean
  slug: string
  brandId?: string | null
  categoryIds: string[]
  relatedProductIds: string[]
  options: CatalogFactoryCatalogProductOption[]

  createdAt: Date
  updatedAt: Date | null
}

export interface CatalogFactoryCatalogProductOption {
  id: string
  bigCommerceOptionId: string
  displayName: string
  type: string | null
  optionValues: CatalogFactoryCatalogProductOptionValue[]
}

const catalogFactoryCatalogProduct = ({
  bigCommerceProduct,
}: {
  bigCommerceProduct: BigCommerceProduct
}): CatalogFactoryCatalogProduct => {
  const primaryImage =
    bigCommerceProduct.images?.find(image => image.is_thumbnail) ||
    bigCommerceProduct.images?.[0] ||
    null

  return {
    id: bigCommerceProduct.id.toString(),
    brandId: bigCommerceProduct.brand_id?.toString(),
    categoryIds: bigCommerceProduct.categories?.map(id => id.toString()) || [],
    relatedProductIds:
      bigCommerceProduct.related_products?.map(id => id.toString()) || [],

    slug: bigCommerceProduct.custom_url.url.replaceAll('/', '') || '',
    visible: Boolean(bigCommerceProduct.is_visible),
    name: bigCommerceProduct.name,
    priceCents: Math.round(bigCommerceProduct.calculated_price * 100),
    description: bigCommerceProduct.description || '',
    primaryImage: {
      url: primaryImage?.url_standard || '',
      isThumbnail: primaryImage?.is_thumbnail || false,
      order: primaryImage?.sort_order || null,
    },
    createdAt: bigCommerceProduct.date_created
      ? new Date(bigCommerceProduct.date_created)
      : new Date(),
    updatedAt: bigCommerceProduct.date_modified
      ? new Date(bigCommerceProduct.date_modified)
      : null,

    images:
      bigCommerceProduct.images
        ?.map(image =>
          image.url_standard
            ? {
                url: image.url_standard,
                order: image.sort_order,
                isThumbnail: image.is_thumbnail,
              }
            : null,
        )
        .filter(notEmpty) || [],
    options:
      bigCommerceProduct.options?.map(option => ({
        id: option.id.toString(),
        bigCommerceOptionId: option.id.toString(),
        displayName: option.display_name,
        type: option.type || null,
        optionValues:
          option.option_values?.map(optionValue => ({
            id: optionValue.id.toString(),
            bigCommerceOptionValueId: optionValue.id.toString(),
            label: optionValue.label || '',
            colorHexCodes: optionValue.value_data?.colors || [],
          })) || [],
      })) || [],
  }
}

export interface CatalogFactoryBrand {
  id: string
  name: string
  slug: string
}

const catalogFactoryBrand = ({
  bigCommerceBrand,
}: {
  bigCommerceBrand: BigCommerceBrand
}): CatalogFactoryBrand => {
  return {
    id: bigCommerceBrand.id.toString(),
    name: bigCommerceBrand.name,
    slug: bigCommerceBrand.custom_url.url.replaceAll('/', '') || '',
  }
}

export interface CatalogFactoryProductVariant
  extends Omit<BigCommerceProductVariant, 'price'> {
  priceCents: number
}

const productVariantFactory = ({
  bigCommerceProductVariant,
}: {
  bigCommerceProductVariant: BigCommerceProductVariant
}): CatalogFactoryProductVariant => {
  return {
    ...bigCommerceProductVariant,
    priceCents: bigCommerceProductVariant.price
      ? Math.round(bigCommerceProductVariant.price * 100)
      : 0,
  }
}

export interface CatalogFactoryCategory {
  id: string
  name: string
}

const catalogFactoryCategory = ({
  bigCommerceCategory,
}: {
  bigCommerceCategory: BigCommerceCategory
}): CatalogFactoryCategory => {
  return {
    id: bigCommerceCategory.id.toString(),
    name: bigCommerceCategory.name,
  }
}

export interface CatalogFactoryCatalogProductOptionValue {
  id: string
  bigCommerceOptionValueId: string
  label: string
  colorHexCodes: string[]
}

const catalogFactoryCatalogProductOptionValue = ({
  bigCommerceOptionValue,
}: {
  bigCommerceOptionValue: BigCommerceOptionValue
}): CatalogFactoryCatalogProductOptionValue => {
  return {
    id: bigCommerceOptionValue.id.toString(),
    bigCommerceOptionValueId: bigCommerceOptionValue.id.toString(),
    label: bigCommerceOptionValue.label || '',
    colorHexCodes: bigCommerceOptionValue.value_data?.colors || [],
  }
}

export {
  catalogFactoryCatalogProduct,
  productVariantFactory,
  catalogFactoryBrand,
  catalogFactoryCategory,
  catalogFactoryCatalogProductOptionValue,
}
