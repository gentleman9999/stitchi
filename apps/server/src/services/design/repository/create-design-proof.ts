import { PrismaClient } from '@prisma/client'
import {
  DesignProof,
  DesignProofTable,
  table as makeDesignProofTable,
} from '../db/design-proof-table'
import * as yup from 'yup'
import { DesignFactoryProof, designProofFactory } from '../factory'
import { DesignProofFile } from '../db/design-proof-file-table'
import { DesignProofLocation } from '../db/design-proof-location-table'

const locationSchema = DesignProofLocation.omit(['id', 'designProofId']).concat(
  yup.object().shape({
    fileId: yup.string().required(),
  }),
)

const inputSchema = DesignProof.omit(['id', 'createdAt', 'updatedAt']).concat(
  yup
    .object()
    .shape({
      locations: yup.array().of(locationSchema.required()).required(),
      files: yup
        .array()
        .of(DesignProofFile.omit(['id', 'designProofId']).required())
        .required(),
    })
    .required(),
)

const prisma = new PrismaClient()

interface CreateDesignProofConfig {
  designProofTable: DesignProofTable
}

export interface CreateDesignProofFnInput {
  designProof: yup.InferType<typeof inputSchema>
}

type CreateDesignProofFn = (
  input: CreateDesignProofFnInput,
) => Promise<DesignFactoryProof>

type MakeCreateDesignProofFn = (
  config?: CreateDesignProofConfig,
) => CreateDesignProofFn

const makeCreateDesignProof: MakeCreateDesignProofFn =
  (
    { designProofTable } = {
      designProofTable: makeDesignProofTable(prisma),
    },
  ) =>
  async input => {
    const validInput = await inputSchema.validate(input.designProof)

    let designProof

    try {
      designProof = await designProofTable.create({
        data: {
          note: validInput.note,
          artistUserId: validInput.artistUserId,
          designProofFiles: {
            createMany: {
              data: validInput.files.map(file => ({
                fileId: file.fileId,
              })),
            },
          },
          designProofLocations: {
            create: validInput.locations.map(location => ({
              colorCount: location.colorCount,
              placement: location.placement,
              fileId: location.fileId,
            })),
          },
        },
        include: {
          designProofFiles: true,
          designProofLocations: true,
        },
      })
    } catch (error) {
      console.error(`Failed to create design proof: ${input}`, {
        context: { error, input },
      })
      throw new Error('Failed to create design proof')
    }

    return designProofFactory({
      designProof,
      files: designProof.designProofFiles,
      locations: designProof.designProofLocations,
    })
  }

export default makeCreateDesignProof
