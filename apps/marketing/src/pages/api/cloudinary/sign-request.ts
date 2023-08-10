import getOrThrow from '@lib/utils/get-or-throw'
import { v2 as cloudinary } from 'cloudinary'
import { NextApiHandler } from 'next'
import * as yup from 'yup'

const API_SECRET = getOrThrow(
  process.env.CLOUDINARY_API_SECRET,
  'CLOUDINARY_API_SECRET',
)

const CLOUD_NAME = getOrThrow(
  process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  'NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME',
)

const API_KEY = getOrThrow(process.env.CLOUDINARY_API_KEY, 'CLOUDINARY_API_KEY')

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
})

const handler: NextApiHandler = async (req, res) => {
  try {
    switch (req.method) {
      case 'POST': {
        const params = await yup
          .object({
            folder: yup.string().required(),
          })
          .validate(JSON.parse(req.body))

        const timestamp = Math.round(new Date().getTime() / 1000)

        const signature = cloudinary.utils.api_sign_request(
          {
            timestamp,
            folder: params.folder,
          },
          API_SECRET,
        )

        res.status(200).json({
          signature,
          timestamp,
          cloudName: CLOUD_NAME,
          apiKey: API_KEY,
        })

        break
      }
      default: {
        throw new Error(`Unsupported method: ${req.method}`)
      }
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: error })
  }
}

export default handler
