import { PrismaClient } from '@prisma/client'
import {
  DesignRequest,
  DesignRequestTable,
  table as makeDesignRequestTable,
} from '../db/design-request-table'
import * as yup from 'yup'
import { DesignFactoryDesignRequest, designRequestFactory } from '../factory'
import { DesignRequestFile } from '../db/design-request-file-table'
import { DesignRequestDesignLocation } from '../db/design-request-design-location-table'
import { DesignRequestDesignLocationFile } from '../db/design-request-design-location-file-table'

const filesInputSchema = yup
  .array()
  .of(
    DesignRequestDesignLocationFile.omit([
      'id',
      'designRequestDesignLocationId',
    ]).required(),
  )
  .required()

const designLocationInputSchema = DesignRequestDesignLocation.omit([
  'id',
  'designRequestId',
])
  .concat(
    yup
      .object()
      .shape({
        files: filesInputSchema,
      })
      .required(),
  )
  .required()

const inputSchema = DesignRequest.omit(['id', 'createdAt', 'updatedAt']).concat(
  yup
    .object()
    .shape({
      files: yup
        .array()
        .of(DesignRequestFile.omit(['id', 'designRequestId']).required())
        .required(),
      designLocations: yup
        .array()
        .of(designLocationInputSchema.required())
        .required(),
    })
    .required(),
)

const prisma = new PrismaClient()

interface CreateDesignRequestConfig {
  designRequestTable: DesignRequestTable
}

export interface CreateDesignRequestFnInput {
  designRequest: yup.InferType<typeof inputSchema>
}

type CreateDesignRequestFn = (
  input: CreateDesignRequestFnInput,
) => Promise<DesignFactoryDesignRequest>

type MakeCreateDesignRequestFn = (
  config?: CreateDesignRequestConfig,
) => CreateDesignRequestFn

const makeCreateDesignRequest: MakeCreateDesignRequestFn =
  (
    { designRequestTable } = {
      designRequestTable: makeDesignRequestTable(prisma),
    },
  ) =>
  async input => {
    const validInput = await inputSchema.validate(input.designRequest)

    let designRequest

    try {
      designRequest = await designRequestTable.create({
        data: {
          userId: validInput.userId,
          organizationId: validInput.organizationId,
          name: validInput.name,
          description: validInput.description,
          status: validInput.status,
          metadata: validInput.metadata || undefined,
          designRequestFiles: {
            createMany: {
              data: validInput.files.map(file => ({
                fileId: file.fileId,
              })),
            },
          },
          designLocations: {
            createMany: {
              data: validInput.designLocations.map(designLocation => ({
                description: designLocation.description,
                placement: designLocation.placement,
                designRequestDesignLocationFiles: {
                  createMany: {
                    data: designLocation.files.map(file => ({
                      fileId: file.fileId,
                    })),
                  },
                },
              })),
            },
          },
        },
        include: {
          designRequestFiles: true,
          designLocations: {
            include: {
              designRequestDesignLocationFiles: true,
            },
          },
        },
      })
    } catch (error) {
      console.error(`Failed to create design request: ${input}`, {
        context: { error, input },
      })
      throw new Error('Failed to create design request')
    }

    return designRequestFactory({
      designRequest,
      files: designRequest.designRequestFiles,
      designLocations: designRequest.designLocations,
      designLocationFiles: designRequest.designLocations.flatMap(
        designLocation => designLocation.designRequestDesignLocationFiles,
      ),
    })
  }

export default makeCreateDesignRequest
