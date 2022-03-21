import { PrismaClient } from '@prisma/client'
import slugify from 'slugify'

const makeCategoryClient = ({ prisma }: { prisma: PrismaClient }) => {
  return {
    findUniqueSlug: async ({ startingSlug }: { startingSlug: string }) => {
      let potallyUniqueSlug = slugify(startingSlug)
      let index = 0

      while (
        Boolean(
          await prisma.category.findFirst({
            where: { slug: potallyUniqueSlug },
          }),
        )
      ) {
        if (!index) {
          if (index === 0) {
            potallyUniqueSlug = `${potallyUniqueSlug}-${index + 2}`
          } else {
            potallyUniqueSlug = potallyUniqueSlug.slice(0, -1) + (index + 2)
          }
        }
        index++
      }

      return potallyUniqueSlug
    },
  }
}

export default {
  makeDefaultCategoryClient: ({ prisma }: { prisma: PrismaClient }) =>
    makeCategoryClient({ prisma }),
}
