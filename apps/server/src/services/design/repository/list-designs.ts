import { Prisma, PrismaClient } from '@prisma/client'
import { logger } from '../../../telemetry'
import { DesignTable } from '../db/design-table'
import { DesignFactoryDesign, designFactory } from '../factory'

const prisma = new PrismaClient()

interface ListDesignsConfig {
  designTable: DesignTable
}

export interface ListDesignsFnInput
  extends Omit<Prisma.DesignFindManyArgs, 'include' | 'select'> {}

type ListDesignsFn = (
  input: ListDesignsFnInput,
) => Promise<DesignFactoryDesign[]>

type MakeListDesignsFn = (config?: ListDesignsConfig) => ListDesignsFn

const makeListDesigns: MakeListDesignsFn =
  ({ designTable } = { designTable: prisma.design }) =>
  async input => {
    let designRecords

    try {
      designRecords = await designTable.findMany({
        ...input,
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
    } catch (error) {
      logger
        .child({
          context: { error },
        })
        .error(`Failed to get design proofs`)
      throw new Error('Failed to get design proofs')
    }

    return designRecords.map(design =>
      designFactory({
        design,
        locations: design.designLocations,
        variants: design.designVariants,
      }),
    )
  }

export default makeListDesigns
