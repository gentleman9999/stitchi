import * as yup from 'yup'

export const ssActivewearCategoryApiSchema = yup.object().shape({
  categoryID: yup.number().required(),
  name: yup.string().required(),
})

export type SsActivewearCategoryApiSchema = yup.Asserts<
  typeof ssActivewearCategoryApiSchema
>

export const ssActivewearCategoriesApiSchema = yup
  .array()
  .of(ssActivewearCategoryApiSchema.required())

export type SsActivewearCategoriesApiSchema = yup.Asserts<
  typeof ssActivewearCategoriesApiSchema
>

export const ssActivewearStyleApiSchema = yup.object().shape({
  styleID: yup.number().required(),
  partNumber: yup.string().required(),
  brandName: yup.string().required(),
  styleName: yup.string().required(),
  title: yup.string().required(),
  description: yup.string().optional(),
  baseCategory: yup.string().required(),
  categories: yup
    .array()
    .of(yup.number().required())
    .required()
    .transform(value => value.split(',').map(Number))
    .test(
      'is-numbers-array',
      'Categories must be an array of numbers',
      value => Array.isArray(value) && value.every(Number.isFinite),
    ),
  catalogPageNumber: yup.string().required(),
  newStyle: yup.boolean().required(),
  comparableGroup: yup.number().required(),
  companionGroup: yup.number().required(),
  brandImage: yup.string().required(),
  styleImage: yup.string().required(),
  sustainableStyle: yup.boolean().required(),
})

export type SsActivewearStyleApiSchema = yup.Asserts<
  typeof ssActivewearStyleApiSchema
>

export const ssActivewearStylesApiSchema = yup
  .array()
  .of(ssActivewearStyleApiSchema.required())

export type SsActivewearStylesApiSchema = yup.Asserts<
  typeof ssActivewearStylesApiSchema
>

const hexColor = yup.string().transform(value => {
  const isValidHex = /^#?([\da-fA-F]{2})([\da-fA-F]{2})([\da-fA-F]{2})$/.test(
    value,
  )

  if (isValidHex) {
    return value
  }

  return ''
})

export const ssActivewearWarehouseApiSchema = yup.object().shape({
  warehouseAbbr: yup.string().required(),
  skuID: yup.number().required(),
  qty: yup.number().required(),
  closeout: yup.boolean().required(),
  dropship: yup.boolean().required(),
  excludeFreeFreight: yup.boolean().required(),
  fullCaseOnly: yup.boolean().required(),
  returnable: yup.boolean().required(),
})

export type SsActivewearWarehouseApiSchema = yup.Asserts<
  typeof ssActivewearWarehouseApiSchema
>

export const ssActivewearProductApiSchema = yup.object().shape({
  sku: yup.string().required(),
  gtin: yup.string().optional(),
  skuID_Master: yup.number().required(),
  styleID: yup.number().required(),
  brandName: yup.string().required(),
  styleName: yup.string().required(),
  colorName: yup
    .string()
    .transform((v: string | undefined) => v?.trim())
    .required(),
  colorCode: yup.string().required(),
  colorPriceCodeName: yup.string().required(),
  colorGroup: yup.string().required(),
  colorGroupName: yup.string().required(),
  colorFamilyID: yup.string().required(),
  colorFamily: yup.string().required(),
  colorSwatchImage: yup.string().optional(),
  colorSwatchTextColor: hexColor.optional(),
  colorFrontImage: yup.string().optional(),
  colorSideImage: yup.string().optional(),
  colorBackImage: yup.string().optional(),
  colorDirectSideImage: yup.string().optional(),
  colorOnModelFrontImage: yup.string().optional(),
  colorOnModelSideImage: yup.string().optional(),
  colorOnModelBackImage: yup.string().optional(),
  color1: hexColor.optional(),
  color2: hexColor.optional(),
  sizeName: yup.string().required(),
  sizeCode: yup.string().required(),
  sizeOrder: yup.string().required(),
  sizePriceCodeName: yup.string().required(),
  caseQty: yup.number().required(),
  unitWeight: yup.number().required(),
  mapPrice: yup.number(),
  piecePrice: yup.number(),
  dozenPrice: yup.number(),
  casePrice: yup.number(),
  salePrice: yup.number(),
  customerPrice: yup.number().required(),
  saleExpiration: yup.date().nullable(),
  noeRetailing: yup.boolean().required(),
  caseWeight: yup.number().required(),
  caseWidth: yup.number().required(),
  caseLength: yup.number().required(),
  caseHeight: yup.number().required(),
  PolyPackQty: yup.string().optional(),
  qty: yup.number().required(),
  countryOfOrigin: yup.string().optional(),
  warehouses: yup
    .array()
    .of(ssActivewearWarehouseApiSchema.required())
    .required(),
})

export type SsActivewearProductApiSchema = yup.Asserts<
  typeof ssActivewearProductApiSchema
>

export const ssActivewearProductsApiSchema = yup
  .array()
  .of(ssActivewearProductApiSchema.required())

export type SsActivewearProductsApiSchema = yup.Asserts<
  typeof ssActivewearProductsApiSchema
>
