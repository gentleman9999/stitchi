import chalk from 'chalk'
import {
  BigCommerceProduct,
  BigCommerceProductVariant,
  BigCommerceSdk,
  SsActivewearProductVariant,
  SsActivewearSdk,
} from '../../sdk'
import { updateProductVariantOptions } from './update-product-variant-options'
import env from '../../environment'
import { BatchUpdateProductVariantsFnInput } from '../../sdk/bigcommerce/methods/batch-update-product-variants'
import { makeCalculate } from 'quote'

const calculate = makeCalculate()

export const updateProductVariants = async (
  params: {
    bigCommerceProduct: BigCommerceProduct
  },
  config: {
    ssactivewear: SsActivewearSdk
    bigCommerce: BigCommerceSdk
  },
) => {
  const { bigCommerceProduct } = params
  const { ssactivewear, bigCommerce } = config

  console.info(
    chalk.white(
      `Starting product variant sync for product ${bigCommerceProduct.id}...`,
    ),
  )

  if (bigCommerceProduct.metadataMap?.source !== 'ss-activewear') {
    console.info(
      chalk.yellow(
        `Skipping product ${bigCommerceProduct.id} because it is not from SS Activewear`,
      ),
    )
    return
  }

  const ssActivewearStyleId = bigCommerceProduct.metadataMap?.styleId

  if (!ssActivewearStyleId) {
    console.info(
      chalk.red(
        `Skipping product ${bigCommerceProduct.id} because it does not have a product distributor product ID`,
      ),
    )
    return
  }

  const ssActivewearProductVariants = await ssactivewear.listProductVariants({
    styleId: ssActivewearStyleId,
  })

  if (!ssActivewearProductVariants.length) {
    console.info(
      chalk.red(
        `Skipping product ${bigCommerceProduct.id} because it does not have any variants in SS Activewear`,
      ),
    )

    return
  }

  console.info(
    chalk.green(
      `Found ${ssActivewearProductVariants.length} product variants for product ${bigCommerceProduct.id} in SS Activewear`,
    ),
  )

  const { productVariantOptions } = await bigCommerce.listProductOptions({
    productId: bigCommerceProduct.id,
  })

  const ssActivewearColorOptions = getUniqueColors(ssActivewearProductVariants)
  const ssActivewearSizeOptions = getUniqueSizes(ssActivewearProductVariants)

  let sizeOption
  let colorOption

  try {
    const response = await updateProductVariantOptions(
      {
        productVariantOptions,
        ssActivewearColorOptions,
        ssActivewearSizeOptions,
        productId: bigCommerceProduct.id,
      },
      { bigCommerce },
    )

    sizeOption = response.sizeOption
    colorOption = response.colorOption
  } catch (error) {
    console.error('Error updating product variant options', {
      context: { error },
    })

    throw error
  }

  console.info(
    chalk.green(
      `Product variant option sync complete for product ${bigCommerceProduct.id} in SS Activewear`,
    ),
  )

  // For all BigCommerce variants, find corresponding SS Activewear variant and sync
  let hasNextPage = true
  let page = 1
  const existingBigCommerceVariants: BigCommerceProductVariant[] = []

  while (hasNextPage) {
    try {
      const response = await bigCommerce.listProductVariants({
        productId: bigCommerceProduct.id,
        page,
        limit: 250,
      })

      existingBigCommerceVariants.push(...response.productVariants)
      hasNextPage = response.hasNextPage
      page++
    } catch (error) {
      console.error('Error fetching product variants from BigCommerce', {
        context: { error },
      })

      break
    }
  }

  const variantsToCreate: SsActivewearProductVariant[] = []
  const variantsToUpdate: {
    bigCommerceVariant: BigCommerceProductVariant
    ssActivewearVariant: SsActivewearProductVariant
  }[] = []
  const variantsToDisable: BigCommerceProductVariant[] = []

  for (const bigCommerceVariant of existingBigCommerceVariants || []) {
    if (bigCommerceVariant.skuId === null) {
      if (existingBigCommerceVariants.length > 1) {
        console.error('Variant has no skuId', {
          context: { bigCommerceVariant },
        })
      } else {
        // This is a product with no variants.
        // We have this check because BigCommerce always returns 1 variant to mirror the parent product in the event that no variants have been created.
        continue
      }
    }

    const ssActivewearVariant = ssActivewearProductVariants.find(
      variant => variant.sku === bigCommerceVariant.sku,
    )

    // SS activewear no longer has this variant, so disbale it
    if (!ssActivewearVariant) {
      variantsToDisable.push(bigCommerceVariant)
    } else {
      variantsToUpdate.push({ bigCommerceVariant, ssActivewearVariant })
    }
  }

  for (const ssActivewearVariant of ssActivewearProductVariants) {
    const bigCommerceVariant = existingBigCommerceVariants.find(
      variant => variant.sku === ssActivewearVariant.sku,
    )

    if (!bigCommerceVariant) {
      variantsToCreate.push(ssActivewearVariant)
    }
  }

  const variantsInput: BatchUpdateProductVariantsFnInput['variants'] = []

  for (const variant of variantsToCreate) {
    const colorValue = colorOption.optionValues.find(
      value => value.label === variant.colorName,
    )

    if (!colorValue) {
      console.error('Color value not found for variant', {
        context: { variant },
      })
      continue
    }

    const sizeValue = sizeOption.optionValues.find(
      value => value.label === variant.sizeName,
    )

    if (!sizeValue) {
      console.error('Size value not found for variant', {
        context: { variant },
      })
      continue
    }

    const { primaryImageUrl, secondaryImageUrls } = getVariantImages(variant)

    const [priceError, quote] = calculate({
      includeFulfillment: false,
      printLocations: [{ colorCount: 1 }],
      variants: [
        {
          priceCents: variant.customerPrice,
          quantity: 10_000,
        },
      ],
    })

    if (priceError) {
      console.error('Failed to calculate price for variant', {
        context: { variant, priceError },
      })
      continue
    }

    variantsInput.push({
      primaryImageUrl,
      secondaryImageUrls,
      sku: variant.sku,
      price: quote.unitRetailPriceCents,
      costPrice: variant.customerPrice,
      inventoryLevel: variant.inventoryQty,
      purchasingDisabled: variant.inventoryQty === 0,
      unitWeight: variant.unitWeight,
      gtin: variant.gtin,
      productId: bigCommerceProduct.id,
      optionValues: [
        { id: colorValue.id, optionId: colorOption.id },
        { id: sizeValue.id, optionId: sizeOption.id },
      ],
    })
  }

  for (const variant of variantsToUpdate) {
    const colorValue = colorOption.optionValues.find(
      value => value.label === variant.ssActivewearVariant.colorName,
    )

    if (!colorValue) {
      console.error('Color value not found for variant', {
        context: { variant },
      })
      continue
    }

    const sizeValue = sizeOption.optionValues.find(
      value => value.label === variant.ssActivewearVariant.sizeName,
    )

    if (!sizeValue) {
      console.error('Size value not found for variant', {
        context: { variant },
      })
      continue
    }

    const { primaryImageUrl, secondaryImageUrls } = getVariantImages(
      variant.ssActivewearVariant,
    )

    const [priceError, quote] = calculate({
      includeFulfillment: false,
      printLocations: [{ colorCount: 1 }],
      variants: [
        {
          priceCents: variant.ssActivewearVariant.customerPrice,
          quantity: 10_000,
        },
      ],
    })

    if (priceError) {
      console.error('Failed to calculate price for variant', {
        context: { variant, priceError },
      })
      continue
    }

    variantsInput.push({
      primaryImageUrl,
      secondaryImageUrls,
      id: variant.bigCommerceVariant.id,
      price: quote.unitRetailPriceCents,
      costPrice: variant.ssActivewearVariant.customerPrice,
      inventoryLevel: variant.ssActivewearVariant.inventoryQty,
      purchasingDisabled: variant.ssActivewearVariant.inventoryQty === 0,
      unitWeight: variant.ssActivewearVariant.unitWeight,
      gtin: variant.ssActivewearVariant.gtin,
    })
  }

  for (const variant of variantsToDisable) {
    variantsInput.push({
      id: variant.id,
      purchasingDisabled: true,
      costPrice: variant.costPrice || 0,
      gtin: variant.gtin || null,
      inventoryLevel: variant.inventoryLevel,
      unitWeight: variant.weight || 0,
    })
  }

  try {
    await bigCommerce.batchUpdateProductVariants({
      productId: bigCommerceProduct.id,
      variants: variantsInput,
    })
  } catch (error) {
    console.error('Failed to batch update product variants', {
      context: { error },
    })
  }
}

const getUniqueColors = (
  variants: SsActivewearProductVariant[],
): {
  value: string
  color1?: string
  color2?: string
}[] => {
  const colorSet = new Map<string, SsActivewearProductVariant>()

  for (const variant of variants) {
    colorSet.set(variant.colorName, variant)
  }

  return Array.from(colorSet).map(([color, variant]) => ({
    value: color,
    color1: variant.color1,
    color2: variant.color2,
  }))
}

const getUniqueSizes = (variants: SsActivewearProductVariant[]): string[] => {
  const sizeSet = new Set<string>()

  for (const variant of variants) {
    sizeSet.add(variant.sizeName)
  }

  return Array.from(sizeSet)
}

const getVariantImages = (
  variant: SsActivewearProductVariant,
): {
  primaryImageUrl: string | null
  secondaryImageUrls: string[]
} => {
  const primaryImageUrl = variant.colorFrontImage
    ? `${env.BIGC_IMAGES_SS_ACTIVEWEAR_BASE_URL}${variant.colorFrontImage}`
    : null

  let secondaryImageUrls = []

  if (variant.colorBackImage) {
    secondaryImageUrls.push(
      `${env.BIGC_IMAGES_SS_ACTIVEWEAR_BASE_URL}${variant.colorBackImage}`,
    )
  }

  if (variant.colorSideImage) {
    secondaryImageUrls.push(
      `${env.BIGC_IMAGES_SS_ACTIVEWEAR_BASE_URL}${variant.colorSideImage}`,
    )
  }

  if (variant.colorDirectSideImage) {
    secondaryImageUrls.push(
      `${env.BIGC_IMAGES_SS_ACTIVEWEAR_BASE_URL}${variant.colorDirectSideImage}`,
    )
  }

  if (variant.colorOnModelFrontImage) {
    secondaryImageUrls.push(
      `${env.BIGC_IMAGES_SS_ACTIVEWEAR_BASE_URL}${variant.colorOnModelFrontImage}`,
    )
  }

  if (variant.colorOnModelBackImage) {
    secondaryImageUrls.push(
      `${env.BIGC_IMAGES_SS_ACTIVEWEAR_BASE_URL}${variant.colorOnModelBackImage}`,
    )
  }

  if (variant.colorOnModelSideImage) {
    secondaryImageUrls.push(
      `${env.BIGC_IMAGES_SS_ACTIVEWEAR_BASE_URL}${variant.colorOnModelSideImage}`,
    )
  }

  const makeHd = (url: string) => url.replace('fm', 'fl')

  return {
    primaryImageUrl: primaryImageUrl ? makeHd(primaryImageUrl) : null,
    secondaryImageUrls: secondaryImageUrls.map(makeHd),
  }
}
