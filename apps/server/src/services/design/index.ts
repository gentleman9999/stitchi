import { PrismaClient } from '@prisma/client'
import {
  Design,
  DesignTable,
  table as makeDesignTable,
} from './db/design-table'
import { designFactory, DesignFactoryDesign } from './factory'
import * as yup from 'yup'
import { DesignLocation } from './db/design-location-table'
import makeDesignRepository, { DesignRepository } from './repository'

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

  createDesignRequest: DesignRepository['createDesignRequest']
  updateDesignRequest: DesignRepository['updateDesignRequest']
  getDesignRequest: DesignRepository['getDesignRequest']
  listDesignRequests: DesignRepository['listDesignRequests']

  createDesignProof: DesignRepository['createDesignProof']
  getDesignProof: DesignRepository['getDesignProof']
  listDesignProofs: DesignRepository['listDesignProofs']
}

interface MakeClientParams {
  designTable: DesignTable
  designRepository: DesignRepository
}

type MakeClientFn = (params?: MakeClientParams) => DesignService

const makeClient: MakeClientFn = (
  { designTable, designRepository } = {
    designTable: makeDesignTable(prisma),
    designRepository: makeDesignRepository(),
  },
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

    createDesignRequest: async input => {
      try {
        return designRepository.createDesignRequest(input)
      } catch (error) {
        console.error(error)
        throw new Error('Failed to create design request')
      }
    },

    updateDesignRequest: async input => {
      try {
        return designRepository.updateDesignRequest(input)
      } catch (error) {
        console.error(error)
        throw new Error('Failed to update design request')
      }
    },

    getDesignRequest: async input => {
      try {
        return designRepository.getDesignRequest(input)
      } catch (error) {
        console.error(error)
        throw new Error('Failed to get design request')
      }
    },

    listDesignRequests: async input => {
      try {
        return designRepository.listDesignRequests(input)
      } catch (error) {
        console.error(error)
        throw new Error('Failed to list design requests')
      }
    },

    createDesignProof: async input => {
      try {
        return designRepository.createDesignProof(input)
      } catch (error) {
        console.error(error)
        throw new Error('Failed to create design proof')
      }
    },

    getDesignProof: async input => {
      try {
        return designRepository.getDesignProof(input)
      } catch (error) {
        console.error(error)
        throw new Error('Failed to get design proof')
      }
    },

    listDesignProofs: async input => {
      try {
        return designRepository.listDesignProofs(input)
      } catch (error) {
        console.error(error)
        throw new Error('Failed to list design proofs')
      }
    },
  }
}

export { makeClient }
