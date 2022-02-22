import getOrThrow from '@utils/get-or-throw'
import { NextApiHandler } from 'next'
import * as yup from 'yup'

const imageSchema = yup.object({
  url: yup.string(),
  label: yup.string(),
})

const productResponse = yup.object({
  id: yup.string().required(),
  name: yup.string().required(),
  url: yup.string(),
  style: yup.string(),
  image: imageSchema,
})

const expectedResponseBody = yup.object({
  type: yup.string(),
  name: yup.string().required(),
  products: yup.array().of(productResponse).required(),
})

const serialize = (data: yup.Asserts<typeof expectedResponseBody>) => {
  return {
    _metadata: {
      page: 0,
      perPage: 0,
      pageCount: 0,
      totalCount: 0,
    },
    records: data.products.map(p => ({
      id: p.id,
      name: p.name,
      url: p.url,
      style: p.style,
      image: {
        url: p.image.url,
        label: p.image.label,
      },
    })),
  }
}

export type ProductListResponse = ReturnType<typeof serialize>

const scalablePressApiKey = getOrThrow(
  process.env.SCALABLE_PRESS_API_KEY,
  'SCALABLE_PRESS_API_KEY',
)

const handler: NextApiHandler = async (req, res) => {
  try {
    switch (req.method) {
      case 'GET': {
        const categoryId = 'sweatshirts'

        console.info('Starting to list products')

        const response = await fetch(
          `https://api.scalablepress.com/v2/categories/${categoryId}`,
          {
            method: 'GET',

            headers: {
              'Content-Type': 'application/json',
              Authorzation: `Basic ${scalablePressApiKey}`,
            },
          },
        )

        console.info('Received product response')

        const validatedResponse = await expectedResponseBody.validate(
          await response.json(),
        )

        console.info('Validated product response')

        res.status(200).json(serialize(validatedResponse))
        break
      }

      default:
        throw new Error(`Unsupported method: ${req.method}`)
    }
  } catch (e) {
    console.error(e)
    res.status(500).json({ message: e })
  }
}

export default handler
