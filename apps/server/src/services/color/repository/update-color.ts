import { Color, ColorTable, table as makeColorTable } from '../db/color-table'

import * as yup from 'yup'
import { PrismaClient } from '@prisma/client'
import { colorFactory, ColorFactoryColor } from '../factory/color'

const inputSchema = Color.omit([])

const prisma = new PrismaClient()

interface UpdateColorConfig {
  colorTable: ColorTable
}

export interface UpdateColorFnInput {
  color: yup.InferType<typeof inputSchema>
}

type UpdateColorFn = (input: UpdateColorFnInput) => Promise<ColorFactoryColor>

type MakeUpdateColorFn = (config?: UpdateColorConfig) => UpdateColorFn

const makeUpdateColor: MakeUpdateColorFn =
  (
    { colorTable } = {
      colorTable: makeColorTable(prisma),
    },
  ) =>
  async input => {
    const validInput = await inputSchema.validate(input.color)

    let color

    try {
      color = await colorTable.update({
        where: { id: validInput.id },
        data: {
          hex: validInput.hex,
          name: validInput.name,
          cmykC: validInput.cmykC,
          cmykK: validInput.cmykK,
          cmykM: validInput.cmykM,
          cmykY: validInput.cmykY,
          pantone: validInput.pantone,
        },
      })
    } catch (error) {
      console.error(error)
      throw new Error('Failed to update color')
    }

    return colorFactory({
      colorRecord: color,
    })
  }

export { makeUpdateColor }
