import { PrismaClient } from '@prisma/client'
import slugify from 'slugify'

const makeMaterialClient = ({ prisma }: { prisma: PrismaClient }) => {
  return {
    findUniqueSlug: async ({ startingSlug }: { startingSlug: string }) => {
      let potentiallyUniqueSlug = slugify(startingSlug)
      let index = 0

      while (
        Boolean(
          await prisma.material.findFirst({
            where: { slug: potentiallyUniqueSlug },
          }),
        )
      ) {
        if (!index)
          if (index === 0) {
            potentiallyUniqueSlug = `${potentiallyUniqueSlug}-${index + 2}`
          } else {
            potentiallyUniqueSlug =
              potentiallyUniqueSlug.slice(0, -1) + (index + 2)
          }
        index++
      }

      return potentiallyUniqueSlug
    },
  }
}

export default {
  makeDefaultMaterialClient: ({ prisma }: { prisma: PrismaClient }) =>
    makeMaterialClient({ prisma }),
}
