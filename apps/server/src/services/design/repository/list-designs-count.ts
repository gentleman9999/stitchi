import { Prisma, PrismaClient } from '@prisma/client'
import { logger } from '../../../telemetry'
import { DesignTable } from '../db/design-table'

const prisma = new PrismaClient()

interface ListDesignsCountConfig {
  designTable: DesignTable
}

export interface ListDesignsCountFnInput extends Prisma.DesignCountArgs {}

type ListDesignsCountFn = (input: ListDesignsCountFnInput) => Promise<number>

type MakeListDesignsCountFn = (
  config?: ListDesignsCountConfig,
) => ListDesignsCountFn

const makeListDesignsCount: MakeListDesignsCountFn =
  (
    { designTable } = {
      designTable: prisma.design,
    },
  ) =>
  async input => {
    let designCount

    try {
      designCount = await designTable.count({
        ...input,
      })
    } catch (error) {
      logger
        .child({
          context: { error },
        })
        .error(`Failed to list designs`)
      throw new Error('Failed to list designs')
    }

    return designCount
  }

export { makeListDesignsCount }
