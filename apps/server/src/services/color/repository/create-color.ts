import { Color, ColorTable, table as makeColorTable } from '../db/color-table'

import * as yup from 'yup'
import { PrismaClient } from '@prisma/client'
import { colorFactory, ColorFactoryColor } from '../factory/color'

const inputSchema = Color.omit(['id'])

const prisma = new PrismaClient()

interface CreateColorConfig {
  colorTable: ColorTable
}

export interface CreateColorFnInput {
  color: yup.InferType<typeof inputSchema>
}

type CreateColorFn = (input: CreateColorFnInput) => Promise<ColorFactoryColor>

type MakeCreateColorFn = (config?: CreateColorConfig) => CreateColorFn

const makeCreateColor: MakeCreateColorFn =
  (
    { colorTable } = {
      colorTable: makeColorTable(prisma),
    },
  ) =>
  async input => {
    const validInput = await inputSchema.validate(input.color)

    let color

    try {
      color = await colorTable.create({
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
      throw new Error('Failed to create color')
    }

    return colorFactory({
      colorRecord: color,
    })
  }

export { makeCreateColor }
