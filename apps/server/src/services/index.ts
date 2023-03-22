import { PrismaClient } from '@prisma/client'
import scalablePress from './scalable-press'
import cloudinary from './cloudinary'
import newsletter from './newsletter'

const prisma = new PrismaClient()

export default {
  scalablePress: scalablePress.makeDefaultScalablePressClient(),
  cloudinary: cloudinary.makdeDefaultCloudinaryClient(),
  newsletter: newsletter.makeDefaultClient(),
}
