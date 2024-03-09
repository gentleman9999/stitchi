import { BigCommerceSdk } from '../../sdk'
import {
  BigCommerceProductOptionType,
  BigCommerceProductVariantOption,
} from '../../sdk/bigcommerce/types'

export const updateProductVariantOptions = async (
  input: {
    productId: number
    productVariantOptions: BigCommerceProductVariantOption[]
    ssActivewearSizeOptions: string[]
    ssActivewearColorOptions: {
      value: string
      color1?: string
      color2?: string
    }[]
  },
  config: {
    bigCommerce: BigCommerceSdk
  },
) => {
  const {
    productId,
    productVariantOptions,
    ssActivewearSizeOptions,
    ssActivewearColorOptions,
  } = input
  const { bigCommerce } = config

  let sizeOption = productVariantOptions.find(
    option => option.displayName === 'Size',
  )

  let colorOption = productVariantOptions.find(
    option => option.displayName === 'Color',
  )

  const newSizeOptionValues = ssActivewearSizeOptions.filter(
    size =>
      !sizeOption?.optionValues.some(optionValue => optionValue.label === size),
  )

  const newColorOptionValues = ssActivewearColorOptions.filter(
    ({ value }) =>
      !colorOption?.optionValues.some(
        optionValue => optionValue.label === value,
      ),
  )

  const mergedSizeOptionValues = [
    ...(sizeOption?.optionValues.map(option => ({
      ...option,
      valueData: undefined,
    })) || []),
    ...newSizeOptionValues.map(size => ({
      label: size,
      sortOrder: 0,
    })),
  ]

  const mergedColorOptionValues = [
    ...(colorOption?.optionValues.map(value => ({
      ...value,
      valueData: value.valueData?.colors || [],
    })) || []),
    ...newColorOptionValues.map(color => ({
      label: color.value,
      sortOrder: 0,
      valueData: [color.color1, color.color2].filter((v): v is string =>
        Boolean(v),
      ),
    })),
  ]

  if (!sizeOption) {
    // Create size option
    try {
      sizeOption = await bigCommerce.createProductOption({
        productId,
        displayName: 'Size',
        optionValues: mergedSizeOptionValues,
        type: BigCommerceProductOptionType.Dropdown,
      })
    } catch (error) {
      console.error('Error creating size option', {
        context: { error },
      })
    }
  } else {
    try {
      sizeOption = await bigCommerce.updateProductOption({
        ...sizeOption,
        id: sizeOption.id,
        optionValues: mergedSizeOptionValues,
      })
    } catch (error) {
      console.error('Error updating size option', {
        context: { error },
      })
    }
  }

  if (!colorOption) {
    try {
      colorOption = await bigCommerce.createProductOption({
        productId,
        displayName: 'Color',
        optionValues: mergedColorOptionValues,
        type: BigCommerceProductOptionType.Swatch,
      })
    } catch (error) {
      console.error('Error creating color option', {
        context: { error },
      })
    }
  } else {
    try {
      colorOption = await bigCommerce.updateProductOption({
        ...colorOption,
        id: colorOption.id,
        optionValues: mergedColorOptionValues,
      })
    } catch (error) {
      console.error('Error updating color option', {
        context: { error },
      })
    }
  }

  if (!sizeOption) {
    throw new Error('Size option not found')
  }

  if (!colorOption) {
    throw new Error('Color option not found')
  }

  return {
    sizeOption,
    colorOption,
  }
}
