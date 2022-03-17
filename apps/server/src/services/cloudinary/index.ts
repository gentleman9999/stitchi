import cloudinary from 'cloudinary'
import { getOrThrow } from '../../utils'

const CLOUD_NAME = getOrThrow(
  process.env.CLOUDINARY_CLOUD_NAME,
  'CLOUDINARY_CLOUD_NAME',
)
const API_KEY = getOrThrow(process.env.CLOUDINARY_API_KEY, 'CLOUDINARY_API_KEY')
const API_SECRET = getOrThrow(
  process.env.CLOUDINARY_API_SECRET,
  'CLOUDINARY_API_SECRET',
)

cloudinary.v2.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
})
export default {
  makdeDefaultCloudinaryClient: () => cloudinary.v2,
}
