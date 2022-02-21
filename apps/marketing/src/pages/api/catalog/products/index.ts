import getOrThrow from '@utils/get-or-throw'
import { NextApiHandler } from 'next'
import * as yup from 'yup'

const imageSchema = yup.object({
  url: yup.string(),
  label: yup.string(),
})

const productResponse = yup.object({
  id: yup.string().required(),
  url: yup.string(),
  name: yup.string(),
  style: yup.string(),
  image: imageSchema,
})

const expectedResponseBody = yup.object({
  type: yup.string(),
  name: yup.string(),
  products: yup.array().of(productResponse).required(),
})

const scalablePressApiKey = getOrThrow(
  process.env.SCALABLE_PRESS_API_KEY,
  'SCALABLE_PRESS_API_KEY',
)

const handler: NextApiHandler = async (req, res) => {
  try {
    switch (req.method) {
      case 'GET': {
        const categoryId = 'sweatshirts'

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

        console.log(response)

        res.status(200).json(await response.json())
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
