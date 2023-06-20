import { PrismaClient } from '@prisma/client'
import {
  DesignRequest,
  DesignRequestTable,
  table as makeDesignRequestTable,
} from '../db/design-request-table'
import * as yup from 'yup'
import { DesignFactoryDesignRequest, designRequestFactory } from '../factory'
import { makeEvents } from '../events'
import { DesignRequestFile } from '../db/design-request-file-table'
import { DesignRequestDesignLocation } from '../db/design-request-design-location-table'
import { DesignRequestDesignLocationFile } from '../db/design-request-design-location-file-table'

const filesInputSchema = yup
  .array()
  .of(
    DesignRequestDesignLocationFile.omit([
      'id',
      'designRequestDesignLocationId',
    ])
      .concat(
        yup.object().shape({
          // If ID, update, otherwise create
          id: yup.string().uuid().optional(),
        }),
      )
      .required(),
  )
  .required()

const designLocationinputSchema = DesignRequestDesignLocation.omit([
  'id',
  'designRequestId',
]).concat(
  yup.object().shape({
    // If ID, update, otherwise create
    id: yup.string().uuid().optional(),
    files: filesInputSchema.required(),
  }),
)

const inputSchema = DesignRequest.omit(['createdAt', 'updatedAt']).concat(
  yup
    .object()
    .shape({
      files: yup
        .array()
        .of(
          DesignRequestFile.omit(['id', 'designRequestId'])
            .concat(
              yup.object().shape({
                // If ID, update, otherwise create
                id: yup.string().uuid().optional(),
              }),
            )
            .required(),
        )
        .required(),
      designLocations: yup
        .array()
        .of(designLocationinputSchema.required())
        .required(),
    })
    .required(),
)

const prisma = new PrismaClient()

interface UpdateDesignRequestConfig {
  designRequestTable: DesignRequestTable
  designEvents: ReturnType<typeof makeEvents>
}

export interface UpdateDesignRequestFnInput {
  designRequest: yup.InferType<typeof inputSchema>
}

type UpdateDesignRequestFn = (
  input: UpdateDesignRequestFnInput,
) => Promise<DesignFactoryDesignRequest>

type MakeUpdateDesignRequestFn = (
  config?: UpdateDesignRequestConfig,
) => UpdateDesignRequestFn

const makeUpdateDesignRequest: MakeUpdateDesignRequestFn =
  (
    { designRequestTable, designEvents } = {
      designRequestTable: makeDesignRequestTable(prisma),
      designEvents: makeEvents(),
    },
  ) =>
  async input => {
    const validInput = await inputSchema.validate(input.designRequest)

    let existingDesignRequest

    try {
      existingDesignRequest = await designRequestTable.findFirst({
        where: {
          id: validInput.id,
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

      if (!existingDesignRequest) {
        throw new Error(`Design request not found: ${input}`)
      }
    } catch (error) {
      console.error(`Failed to find design request: ${input}`, {
        context: { error, input },
      })
      throw new Error('Failed to find design request')
    }

    const locationsToCreate = validInput.designLocations.filter(({ id }) => !id)
    const locationsToUpdate = validInput.designLocations.filter(({ id }) => id)
    const locationsToDelete = existingDesignRequest.designLocations.filter(
      ({ id }) =>
        !validInput.designLocations.some(location => location.id === id),
    )

    const existingDesignTsHack = { ...existingDesignRequest }

    let designRequest

    try {
      designRequest = await designRequestTable.update({
        where: {
          id: validInput.id,
        },
        data: {
          name: validInput.name,
          description: validInput.description,
          status: validInput.status,
          organizationId: validInput.organizationId,
          userId: validInput.userId,
          metadata: validInput.metadata || undefined,
          designRequestFiles: {
            create: validInput.files.map(file => ({
              fileId: file.fileId,
            })),
            delete: existingDesignRequest.designRequestFiles.map(({ id }) => ({
              id,
            })),
          },
          designLocations: {
            create: locationsToCreate.map(({ files, ...location }) => {
              return {
                description: location.description || undefined,
                placement: location.placement || undefined,
                designRequestDesignLocationFiles: {
                  create: files.map(file => ({
                    fileId: file.fileId,
                  })),
                },
              }
            }),
            update: locationsToUpdate.map(({ id, ...rest }) => {
              const { files, ...location } = rest

              const existingLocation =
                existingDesignTsHack.designLocations.find(
                  ({ id: locationId }) => locationId === id,
                )

              const filesToCreate = files.filter(({ id }) => !id)
              const filesToUpdate = files.filter(({ id }) => id)
              const filesToDelete =
                existingLocation?.designRequestDesignLocationFiles.filter(
                  ({ id }) => !files.some(file => file.id === id),
                )

              return {
                data: {
                  description: location.description,
                  placement: location.placement,
                  designRequestDesignLocationFiles: {
                    create: filesToCreate.map(file => ({
                      fileId: file.fileId,
                    })),
                    update: filesToUpdate.map(({ id, ...rest }) => {
                      return {
                        where: { id },
                        data: {
                          fileId: rest.fileId,
                        },
                      }
                    }),
                    delete: filesToDelete?.map(({ id }) => ({ id })),
                  },
                },
                where: { id },
              }
            }),
            delete: locationsToDelete.map(({ id }) => ({ id })),
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
      console.error(`Failed to update design request: ${input}`, {
        context: { error, input },
      })
      throw new Error('Failed to update design request')
    }

    const prevDesignRequest = designRequestFactory({
      designRequest: existingDesignRequest,
      files: existingDesignRequest.designRequestFiles,
      designLocations: existingDesignRequest.designLocations,
      designLocationFiles: existingDesignRequest.designLocations.flatMap(
        ({ designRequestDesignLocationFiles }) =>
          designRequestDesignLocationFiles,
      ),
    })

    const nextDesignRequest = designRequestFactory({
      designRequest,
      files: designRequest.designRequestFiles,
      designLocations: designRequest.designLocations,
      designLocationFiles: designRequest.designLocations.flatMap(
        ({ designRequestDesignLocationFiles }) =>
          designRequestDesignLocationFiles,
      ),
    })

    designEvents.emit({
      type: 'designRequest.updated',
      payload: {
        nextDesignRequest,
        prevDesignRequest,
      },
    })

    return nextDesignRequest
  }

export default makeUpdateDesignRequest
