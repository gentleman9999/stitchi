import { PrismaClient } from '@prisma/client'
import { ColorTable } from '../db/color-table'
import { ColorFactoryColor, colorFactory } from '../factory/color'

const primsa = new PrismaClient()

interface GetColorConfig {
  colorTable: ColorTable
}

export interface GetColorFnInput {
  colorId: string
}

type GetColorFn = (input: GetColorFnInput) => Promise<ColorFactoryColor>

type MakeGetColorFn = (config?: GetColorConfig) => GetColorFn

const makeGetColor: MakeGetColorFn =
  ({ colorTable } = { colorTable: primsa.color }) =>
  async input => {
    const color = await colorTable.findFirst({
      where: {
        id: input.colorId,
      },
    })

    if (!color) {
      throw new Error(`Color not found: ${input}`)
    }

    return colorFactory({ colorRecord: color })
  }

export { makeGetColor }
