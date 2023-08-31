import { Prisma, PrismaClient } from '@prisma/client'
import { logger } from '../../../telemetry'
import { ColorTable } from '../db/color-table'
import { ColorFactoryColor, colorFactory } from '../factory/color'

const prisma = new PrismaClient()

interface ListColorsConfig {
  colorTable: ColorTable
}

export interface ListColorsFnInput
  extends Omit<Prisma.ColorFindManyArgs, 'include' | 'select'> {}

type ListColorsFn = (input: ListColorsFnInput) => Promise<ColorFactoryColor[]>

type MakeListColorsFn = (config?: ListColorsConfig) => ListColorsFn

const makeListColors: MakeListColorsFn =
  (
    { colorTable } = {
      colorTable: prisma.color,
    },
  ) =>
  async input => {
    let colorRecords

    try {
      colorRecords = await colorTable.findMany({
        ...input,
      })
    } catch (error) {
      logger
        .child({
          context: { error },
        })
        .error(`Failed to list colors`)
      throw new Error('Failed to list colors')
    }

    return colorRecords.map(color =>
      colorFactory({
        colorRecord: color,
      }),
    )
  }

export { makeListColors }
