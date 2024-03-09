// This file contains all the schemas for the BigCommerce API responses.
// The schemas are used to validate the responses from the BigCommerce API.
// No transformation is done on the responses, so the schemas should match.

import * as yup from 'yup'

const bigCommerceCustomUrlApiSchema = yup.object().shape({
  url: yup.string().min(0).max(255).required(),
  is_customized: yup.boolean().required(),
})

export const bigCommerceCustomFieldApiSchema = yup.object().shape({
  id: yup.number().integer().required(),
  name: yup.string().min(0).max(64).required(),
  value: yup.string().min(0).max(255).required(),
})

export const bigCommerceMetadataApiSchema = yup.object().shape({
  id: yup.number().integer().required(),

  value: yup.string().min(1).max(65535).required(),
  namespace: yup.string().min(1).max(64).required(),
  permission_set: yup
    .string()
    .oneOf([
      'app_only',
      'read',
      'write',
      'read_and_sf_access',
      'write_and_sf_access',
    ])
    .required(),
  resource_id: yup.number().integer().required(),
  date_created: yup.string().required(),
  date_modified: yup.string().required(),
})

export const bigCommerceProductMetadataApiSchema =
  bigCommerceMetadataApiSchema.concat(
    yup.object().shape({
      resource_type: yup.string().oneOf(['product']).required(),
      key: yup
        .string()
        .oneOf(['style_id', 'source', 'updated_description_at', 'display_name'])
        .min(1)
        .max(64)
        .required(),
    }),
  )

export const bigCommerceProductVariantMetadataApiSchema =
  bigCommerceMetadataApiSchema.concat(
    yup.object().shape({
      resource_type: yup.string().oneOf(['variant']).required(),
      key: yup.string().oneOf(['image_group']).min(1).max(64).required(),
    }),
  )

export type BigCommerceProductMetadataApiSchema = yup.Asserts<
  typeof bigCommerceProductMetadataApiSchema
>

export type BigCommerceProductVariantMetadataApiSchema = yup.Asserts<
  typeof bigCommerceProductVariantMetadataApiSchema
>

export const bigCommerceProductMetadatasApiSchema = yup
  .array(bigCommerceProductMetadataApiSchema.required())
  .required()

export const bigCommerceProductVariantMetadatasApiSchema = yup
  .array(bigCommerceProductVariantMetadataApiSchema.required())
  .required()

const bigCommerceOptionValueApiSchema = yup.object().shape({
  id: yup.number().integer().required(),
  label: yup
    .string()
    .transform((v: string | undefined) => v?.trim())
    .min(1)
    .max(255)
    .required(),
  sort_order: yup.number().integer().min(0).default(0),
  value_data: yup
    .object()
    .shape({
      colors: yup.array().of(yup.string().required()).optional(),
    })
    .nullable(),
})

export const bigCommerceApiProductOptionSchema = yup.object().shape({
  id: yup.number().integer().required(),
  product_id: yup.number().integer().required(),
  display_name: yup.string().min(1).max(255).required(),
  type: yup
    .string()
    .oneOf([
      'radio_buttons',
      'rectangles',
      'dropdown',
      'product_list',
      'product_list_with_images',
      'swatch',
    ]),
  option_values: yup
    .array(bigCommerceOptionValueApiSchema.required())
    .optional(),
})

export type BigCommerceApiProductOptionSchema = yup.Asserts<
  typeof bigCommerceApiProductOptionSchema
>

export const bigCommerceApiResponseSchema = <T extends any>(
  schema: yup.Schema<T>,
) => {
  return yup
    .object()
    .shape({
      data: schema,
      meta: yup
        .object()
        .shape({
          pagination: yup
            .object()
            .shape({
              // Total number of items in the result set.
              total: yup.number().optional(),
              // Total number of items in the collection response.
              count: yup.number().optional(),
              // Number of items returned per page.
              per_page: yup.number().optional(),
              // Current page number.
              current_page: yup.number().optional(),
              // Total number of pages in the result set.
              total_pages: yup.number().optional(),
            })
            .optional(),
        })
        .optional(),
    })
    .required()
}

// CATEGORIES
export const bigCommerceCategoryApiSchema = yup.object().shape({
  id: yup.number().required(),
  name: yup.string().required(),
  description: yup.string().optional(),
  is_visible: yup.boolean().required(),
  parent_id: yup.number().required(),
  image_url: yup.string().optional(),
  custom_url: bigCommerceCustomUrlApiSchema.required(),
})

export type BigCommerceCategoryApiSchema = yup.Asserts<
  typeof bigCommerceCategoryApiSchema
>

export const bigCommerceCategoriesApiSchema = yup.array(
  bigCommerceCategoryApiSchema.required(),
)

export type BigCommerceCategoriesApiSchema = yup.Asserts<
  typeof bigCommerceCategoriesApiSchema
>

export const bigCommerceCategoryMetadataApiSchema = yup.object().shape({
  id: yup.number().required(),
  key: yup.string().required(),
  value: yup.string(),
  namespace: yup.string(),
})

export const bigCommerceCategoryMetadatasApiSchema = yup
  .array(bigCommerceCategoryMetadataApiSchema.required())
  .required()

export type BigCommerceCategoryMetadatasApiSchema = yup.Asserts<
  typeof bigCommerceCategoryMetadatasApiSchema
>

export const bigCommerceApiProductVariantSchema = yup.object().shape({
  id: yup.number().integer().required(),
  product_id: yup.number().integer().required(),
  price: yup.number().min(0).nullable().defined(),
  calculated_price: yup.number().min(0).required(),
  retail_price: yup.number().min(0).nullable().defined(),
  sale_price: yup.number().min(0).nullable().defined(),
  cost_price: yup.number().min(0).nullable().defined(),
  weight: yup.number().min(0).nullable().defined(),
  width: yup.number().min(0).nullable().defined(),
  depth: yup.number().min(0).nullable().defined(),
  height: yup.number().min(0).nullable().defined(),
  purchasing_disabled: yup.boolean().required(),
  inventory_level: yup.number().integer().required(),
  upc: yup.string().optional(),
  mpn: yup.string().optional(),
  gtin: yup.string().optional(),
  sku: yup.string().required(),
  sku_id: yup.number().integer().nullable().default(null),
  image_url: yup.string().optional(),
  option_values: yup
    .array(bigCommerceOptionValueApiSchema.required())
    .optional(),
})

export type BigCommerceApiProductVariantSchema = yup.Asserts<
  typeof bigCommerceApiProductVariantSchema
>

export const bigCommerceProductImageSchema = yup.object().shape({
  id: yup.number().integer().required(),
  product_id: yup.number().integer().required(),
  is_thumbnail: yup.boolean().required(),
  image_file: yup.string().required(),
  url_standard: yup.string().required(),
  url_thumbnail: yup.string().required(),
  url_tiny: yup.string().required(),
  sort_order: yup.number().integer().required(),
})

export type BigCommerceProductImageSchema = yup.Asserts<
  typeof bigCommerceProductImageSchema
>

export const bigCommerceProductApiSchema = yup.object().shape({
  id: yup.number().integer().required(),
  name: yup.string().min(1).required(),
  type: yup.string().oneOf(['physical', 'digital']).required(),
  sku: yup.string().min(1).required(),
  description: yup.string().optional(),
  weight: yup.number().min(0).required(),
  width: yup.number().min(0).optional(),
  depth: yup.number().min(0).optional(),
  height: yup.number().min(0).optional(),
  price: yup.number().min(0).required(),
  categories: yup.array(yup.number().required()).required(),
  brand_id: yup.number().integer().optional(),
  brand_name: yup.string().optional(),
  inventory_tracking: yup
    .string()
    .oneOf(['none', 'variant', 'product'])
    .required(),
  availability: yup
    .string()
    .oneOf(['available', 'disabled', 'preorder'])
    .required(),
  is_visible: yup.boolean().required(),
  is_featured: yup.boolean().required(),
  upc: yup.string().optional(),
  gtin: yup.string().optional(),
  mpn: yup.string().optional(),
  custom_url: bigCommerceCustomUrlApiSchema.nullable(),
  custom_fields: yup
    .array(bigCommerceCustomFieldApiSchema.required())
    .optional(),
  variants: yup.array(bigCommerceApiProductVariantSchema.required()).optional(),
  images: yup.array(bigCommerceProductImageSchema.required()).optional(),
})

export type BigCommerceProductApiSchema = yup.Asserts<
  typeof bigCommerceProductApiSchema
>

export const bigCommerceProductsApiSchema = yup.array(
  bigCommerceProductApiSchema.required(),
)

export type BigCommerceProductsApiSchema = yup.Asserts<
  typeof bigCommerceProductsApiSchema
>

export const bigCommerceBrandApiSchema = yup.object().shape({
  id: yup.number().required(),
  name: yup.string().required(),
})

export type BigCommerceBrandApiSchema = yup.Asserts<
  typeof bigCommerceBrandApiSchema
>

export const bigCommerceBrandsApiSchema = yup.array(
  bigCommerceBrandApiSchema.required(),
)
