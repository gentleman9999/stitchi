import fs from 'fs'
import csv from 'csv-parser'
import fetch, { RequestInit } from 'node-fetch'
import process from 'process'
import path from 'path'
import * as yup from 'yup'

const STYLE_CSV_PATH = process.env.STYLE_CSV_PATH || null
const PRODUCT_CSV_PATH = process.env.PRODUCT_CSV_PATH || null

const styleSchema = yup.object().shape({
  styleID: yup.number().required(),
  styleName: yup.string().required(),
  brandName: yup.string().required(),
  title: yup.string().required(),
  partNumber: yup.string().optional(),
  uniqueStyleName: yup.string().optional(),
  description: yup.string().optional(),
  baseCategory: yup.string().optional(),
  categories: yup
    .array(yup.number().required())
    .transform(value => (value?.length ? value.split(',') : []))
    .optional(),
  brandImage: yup.string().optional(),
  styleImage: yup.string().optional(),
})

const productSchema = yup.object().shape({
  sku: yup.string().required(),
  gtin: yup.string().optional(),
  styleID: yup.number().required(),
  brandName: yup.string().required(),
  styleName: yup.string().required(),
  colorName: yup.string().required(),
  colorCode: yup.number().required(),
  colorGroup: yup.number().required(),
  colorFamily: yup.string().required(),
  colorSwatchImage: yup.string().optional(),
  colorFrontImage: yup.string().optional(),
  colorSideImage: yup.string().optional(),
  colorBackImage: yup.string().optional(),
  colorDirectSideImage: yup.string().optional(),
  colorOnModelFrontImage: yup.string().optional(),
  colorOnModelSideImage: yup.string().optional(),
  colorOnModelBackImage: yup.string().optional(),
  color1: yup.string().required(),
  color2: yup.string().optional(),
  sizeName: yup.string().required(),
  sizeCode: yup.number().required(),
  unitWeight: yup.number().optional(),
  customerPrice: yup.number().required(),
})

const bigCommerceProductSchema = yup.object().shape({
  id: yup.number().required(),
  custom_fields: yup
    .array(
      yup
        .object()
        .shape({
          id: yup.number().required(),
          name: yup.string().required(),
          value: yup.string().required(),
        })
        .required(),
    )
    .optional(),
})

if (!STYLE_CSV_PATH) {
  console.error('CSV_PATH environment variable is required.')
  process.exit(1)
}

if (!PRODUCT_CSV_PATH) {
  console.error('CSV_PATH environment variable is required.')
  process.exit(1)
}

// Set up the BigCommerce API details
const storeHash = 'ycjcgspsys'
const accessToken = '12hvybfwmj3u7jddg1v452q5rg3oun6'

async function parseCSV<T>(
  filePath: string,
  schema: yup.Schema<T>,
): Promise<T[]> {
  return new Promise((resolve, reject) => {
    const data: T[] = []

    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', async row => {
        try {
          const validDate = await schema.validate(row)
          data.push(validDate)
        } catch (error) {
          console.error('Error validating row:', error)
        }
      })
      .on('end', () => {
        console.log('CSV file successfully processed.')
        resolve(data)
      })
      .on('error', error => {
        console.error('Error reading CSV file:', error)
        reject(error)
      })

    return data
  })
}

const bigCommerceFetch = async <T>(
  url: string,
  schema: yup.Schema<T>,
  init?: RequestInit,
): Promise<T | null> => {
  const res = await fetch(
    `https://api.bigcommerce.com/stores/${storeHash}/v3/catalog${url}`,
    {
      ...init,
      headers: {
        ...init?.headers,
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Auth-Token': accessToken,
      },
    },
  )

  const json = await res.json()

  console.log('JSON', json)

  try {
    return schema.validate(json.data)
  } catch (error) {
    console.error('Error validating response:', error)
    return null
  }
}

const start = async () => {
  const styles = await parseCSV(
    path.join(__dirname, STYLE_CSV_PATH),
    styleSchema,
  )

  const bigCommerceProducts = []

  for (const style of styles) {
    // For each style, check if it exists in BigCommerce
    const productList = await bigCommerceFetch(
      `/products?sku=${style.styleID}&include=custom_fields`,
      yup.array(bigCommerceProductSchema),
    )

    const product = productList?.[0]

    const customFieldsMap = new Map<string, { name: string; value: string }>(
      product?.custom_fields?.map(field => [field.name, field]),
    )

    const styleIdProperty = customFieldsMap.get('style_id')

    customFieldsMap.set('style_id', {
      ...(styleIdProperty ? styleIdProperty : { name: 'style_id' }),
      value: style.styleID.toString(),
    })

    const sourceProperty = customFieldsMap.get('source')

    customFieldsMap.set('source', {
      ...(sourceProperty ? sourceProperty : { name: 'source' }),
      value: 'ss-activewear',
    })

    // TODO: Get or create product categories

    // TODO: Upload images
    // Using webdav

    const updateProduct = await bigCommerceFetch(
      `/products${product?.id ? `/${product.id}` : ''}`,
      bigCommerceProductSchema,
      {
        method: product?.id ? 'PUT' : 'POST',
        body: JSON.stringify({
          name: style.title,
          type: 'physical',
          sku: style.styleID.toString(),
          description: style.description,
          weight: 0,
          price: 0,
          categories: [],
          // Attaches or creates a new brand (fuzzy search)
          brand_name: style.brandName,
          images: [],
          custom_fields: Array.from(customFieldsMap.values()),
          is_visible: false,
        }),
      },
    )

    console.log('UPDATE PRODUCT', updateProduct)
  }

  const products = await parseCSV(
    path.join(__dirname, PRODUCT_CSV_PATH),
    productSchema,
  )

  //   console.log('PRODUCTS', products)

  const variantsByStyle = new Map()

  for (const product of products) {
    // (1) For each product, bulk update (in batches of 10) the variants
  }

  console.log('END')
}

start()
  .catch(e => console.error(e))
  .then(() => process.exit(0))
