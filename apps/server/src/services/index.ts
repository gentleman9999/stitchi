import { PrismaClient } from '@prisma/client'
import scalablePress from './scalable-press'
import cloudinary from './cloudinary'
import catalog from './catalog'

const prisma = new PrismaClient()

export default {
  catalog: catalog.makeDefaultCatalogClient({ prisma }),
  scalablePress: scalablePress.makeDefaultScalablePressClient(),
  cloudinary: cloudinary.makdeDefaultCloudinaryClient(),
}
