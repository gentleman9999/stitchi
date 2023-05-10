import { exit } from 'process'
import fetch, { RequestInit } from 'node-fetch'
import { ChatOpenAI } from 'langchain/chat_models/openai'
import { HumanChatMessage, SystemChatMessage } from 'langchain/schema'
import { isAfter, parseISO } from 'date-fns'
import { getOrThrow } from '../src/utils'

const LAST_UPDATED_AT_LIMIT = getOrThrow(
  process.env.LAST_UPDATED_AT_LIMIT,
  'LAST_UPDATED_AT_LIMIT',
)

const updatedAtFieldKey = 'updated_description_at'

const chat = new ChatOpenAI({
  maxTokens: 500,
  n: 1,
  temperature: 0.8,
  modelName: 'gpt-3.5-turbo',
  openAIApiKey: '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',
  timeout: 45_000, // 45 seconds
  maxRetries: 3,
})

const bigCommerceApiPath = 'https://api.bigcommerce.com/stores/ycjcgspsys/v3'

const fetcher = (path: string, init?: RequestInit) => {
  return fetch(`${bigCommerceApiPath}${path}`, {
    ...init,
    headers: {
      ...init?.headers,
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-Auth-Token': '12hvybfwmj3u7jddg1v452q5rg3oun6',
    },
  })
}

async function start() {
  console.log('Generating product descriptions...')

  let totalPages: number | null = 1
  let page = 1
  const limit = 10

  while (totalPages === null || page <= totalPages) {
    const productsResponse = await fetcher(
      `/catalog/products?limit=${limit}&page=${page}&include=custom_fields`,
    )

    const json: {
      data?: {
        id?: string
        name?: string
        description?: string
        brandId?: string
        custom_fields?: { id: string; name: string; value: string }[]
      }[]
      meta?: {
        pagination?: {
          total_pages?: number
        }
      }
    } = await productsResponse.json()

    totalPages = json.meta?.pagination?.total_pages || null
    page += 1

    const products = json.data || []

    const productPromises = products.map(async product => {
      const productName = product?.name
      const brandId = product?.brandId
      const updatedAtField = product?.custom_fields?.find(
        field => field.name === updatedAtFieldKey,
      )

      if (
        updatedAtField?.value &&
        isAfter(parseISO(updatedAtField.value), parseISO(LAST_UPDATED_AT_LIMIT))
      ) {
        console.log(`Skipping ${productName} as it was recently updated...`)
        return
      }

      if (productName) {
        console.log(`Generating description for ${productName}...`)

        let brand: { name?: string } | null = null

        if (brandId) {
          const response = await fetcher(`/catalog/brands/${brandId}`)

          const json: { data?: { name?: string } } = await response.json()

          if (json.data) {
            brand = json.data
          }
        }

        const description = await generateNewDescription(
          productName,
          product?.description,
          brand?.name,
        )

        if (description) {
          console.log(`Updating ${productName} description...`)

          await fetcher(`/catalog/products/${product.id}`, {
            method: 'PUT',
            body: JSON.stringify({
              description,
              custom_fields: [
                {
                  id: updatedAtField?.id || undefined,
                  name: updatedAtFieldKey,
                  value: new Date().toISOString(),
                },
              ],
            }),
          })

          console.log(`Updated ${productName} description!`)
        }
      }
    })

    await Promise.all(productPromises)
  }
}

const generateNewDescription = async (
  productName: string,
  brandName?: string,
  productDescription?: string,
) => {
  const response = await chat.call([
    new SystemChatMessage(
      'You are a promotional-product catalog manager that specializes in writing SEO optimized product descriptions. You should respond to all messages with the following format: "[insert-description]"',
    ),
    new HumanChatMessage(
      `Write an SEO optimized description for the product "${productName}" ${
        brandName ? `from brand "${brandName}"` : ''
      } with the existing description "${productDescription || ''}".`,
    ),
    new HumanChatMessage(
      `Include the following sections: Product overview, Use cases, Customization options (choose between screen print, DTG, embroidery, etc. based on product type), and Product specs.).`,
    ),
    new HumanChatMessage(`Write in 2nd person (you = the customer).`),
    new HumanChatMessage(`Example: <div>
    <h2>Product Overview</h2>
    <p>Stay hydrated and eco-friendly with the HydraPeak Insulated Stainless Steel Water Bottle. This sleek and durable bottle is perfect for everyday use, outdoor adventures, and sports activities.</p>
    <h2>Features & Benefits</h2>
    <ul>
        <li>Double-wall vacuum insulation keeps beverages cold for 24 hours and hot for 12 hours</li>
        <li>Constructed from high-quality 18/8 food-grade stainless steel</li>
        <li>Leak-proof lid with a convenient carry handle</li>
        <li>BPA-free and eco-friendly</li>
        <li>Available in multiple colors and sizes (18oz, 24oz, 32oz)</li>
    </ul>
    <h2>Customization Options</h2>
    <p>Customize your HydraPeak bottle with laser engraving or screen printing for a unique promotional item or personalized gift.</p>
    </div>`),
  ])

  return response.text
}

start()
  .catch(e => console.error(e))
  .then(() => exit(0))
