import { PrismaClient } from '@prisma/client'
import scalablePress from './scalable-press'
import manufacturer from './manufacturer'
import cloudinary from './cloudinary'
import catalogProduct from './catalog-product'

const prisma = new PrismaClient()

export default {
  manufacturer: manufacturer.makeDefaultManufacturerClient({ prisma }),
  catalogProduct: catalogProduct.makeDefaultCatalogProductClient({ prisma }),
  scalablePress: scalablePress.makeDefaultScalablePressClient(),
  cloudinary: cloudinary.makdeDefaultCloudinaryClient(),
}
