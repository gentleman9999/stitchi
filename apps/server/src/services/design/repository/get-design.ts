import { PrismaClient } from '@prisma/client'
import { DesignTable } from '../db/design-table'
import { DesignFactoryDesign, designFactory } from '../factory'

const primsa = new PrismaClient()

interface GetDesignConfig {
  designTable: DesignTable
}

export interface GetDesignFnInput {
  designId: string
}

type GetDesignFn = (input: GetDesignFnInput) => Promise<DesignFactoryDesign>

type MakeGetDesignFn = (config?: GetDesignConfig) => GetDesignFn

const makeGetDesign: MakeGetDesignFn =
  ({ designTable } = { designTable: primsa.design }) =>
  async input => {
    const design = await designTable.findFirst({
      where: {
        id: input.designId,
      },
      include: {
        designLocations: true,
        designVariants: {
          include: {
            images: {
              orderBy: {
                order: 'asc',
              },
            },
          },
        },
      },
    })

    if (!design) {
      throw new Error(`Design proof not found: ${input}`)
    }

    return designFactory({
      design,
      locations: design.designLocations,
      variants: design.designVariants,
    })
  }

export default makeGetDesign
