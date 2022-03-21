import { PrismaClient } from '@prisma/client'
import materialClient from './material'
import categoryClient from './category'
import manufacturerClient from './manufacturer'

export default {
  makeDefaultCatalogClient: ({ prisma }: { prisma: PrismaClient }) => ({
    material: materialClient.makeDefaultMaterialClient({ prisma }),
    category: categoryClient.makeDefaultCategoryClient({ prisma }),
    manufacturer: manufacturerClient.makeDefaultManufacturerClient({ prisma }),
  }),
}
