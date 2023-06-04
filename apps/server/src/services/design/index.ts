import { PrismaClient } from '@prisma/client'
import {
  Design,
  DesignTable,
  table as makeDesignTable,
} from './db/design-table'
import { designFactory, DesignFactoryDesign } from './factory'
import * as yup from 'yup'
import { DesignLocation } from './db/design-location-table'

const designSchema = Design.omit(['id', 'createdAt', 'updatedAt']).concat(
  yup.object().shape({
    designLocations: yup
      .array()
      .of(
        DesignLocation.omit([
          'id',
          'designId',
          'createdAt',
          'updatedAt',
        ]).required(),
      )
      .min(0)
      .required(),
  }),
)

const prisma = new PrismaClient()

export interface DesignService {
  getDesign: (input: { designId: string }) => Promise<DesignFactoryDesign>
  createDesign: (
    input: yup.InferType<typeof designSchema>,
  ) => Promise<DesignFactoryDesign>
}

interface MakeClientParams {
  designTable: DesignTable
}

type MakeClientFn = (params?: MakeClientParams) => DesignService

const makeClient: MakeClientFn = (
  { designTable } = { designTable: makeDesignTable(prisma) },
) => {
  return {
    getDesign: async input => {
      try {
        const design = await designTable.findFirst({
          where: { id: input.designId },
          include: { DesignLocation: true },
        })

        if (!design) {
          throw new Error('Design not found')
        }

        return designFactory({ design, locations: design.DesignLocation })
      } catch (error) {
        console.error(`Failed to get design: ${input}`, {
          context: { error, input },
        })
        throw new Error('Failed to get design')
      }
    },

    createDesign: async input => {
      const validInput = await designSchema.validate(input)

      try {
        const { designLocations, ...restValidInput } = validInput

        const design = await designTable.create({
          data: {
            ...restValidInput,
            DesignLocation: {
              createMany: {
                data: designLocations.map(designLocation => ({
                  ...designLocation,
                })),
              },
            },
          },
          include: { DesignLocation: true },
        })

        return designFactory({ design, locations: design.DesignLocation })
      } catch (error) {
        console.error(`Failed to create design: ${input}`, {
          context: { error, input },
        })
        throw new Error('Failed to create design')
      }
    },
  }
}

export { makeClient }
