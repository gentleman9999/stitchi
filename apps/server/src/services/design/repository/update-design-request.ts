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
import { DesignRequestArtist } from '../db/design-request-artist-table'
import { DesignRequestDesignProof } from '../db/design-request-design-proof-table'
import { DesignRequestRevision } from '../db/design-request-revision-table'
import { DesignRequestRevisionFile } from '../db/design-request-revision-file-table'
import { DesignRequestProduct } from '../db/design-request-product-table'
import { DesignRequestProductColor } from '../db/design-request-product-color-table'

const productInputSchema = DesignRequestProduct.omit([
  'id',
  'createdAt',
  'updatedAt',
  'designRequestId',
]).concat(
  yup.object().shape({
    id: yup.string().uuid().optional(),
    colors: yup
      .array()
      .of(
        DesignRequestProductColor.omit([
          'id',
          'designRequestProductId',
          'createdAt',
          'updatedAt',
        ])
          .concat(
            yup.object().shape({
              id: yup.string().uuid().optional(),
            }),
          )
          .required(),
      )
      .required(),
  }),
)

const revisionRequestFileInputSchema = DesignRequestRevisionFile.omit([
  'designRequestRevisionId',
  'id',
]).concat(
  yup.object().shape({
    // If ID, update, otherwise create
    id: yup.string().uuid().optional(),
  }),
)

const revisionRequestInputSchema = DesignRequestRevision.omit([
  'id',
  'createdAt',
  'updatedAt',
  'designRequestId',
]).concat(
  yup.object().shape({
    // If ID, update, otherwise create
    id: yup.string().uuid().optional(),
    files: yup.array().of(revisionRequestFileInputSchema.required()).required(),
  }),
)

const proofsInputSchema = yup.array().of(
  DesignRequestDesignProof.omit(['id', 'designRequestId'])
    .concat(
      yup.object().shape({
        // If ID, update, otherwise create
        id: yup.string().uuid().optional(),
      }),
    )
    .required(),
)

const designLocationFilesInputSchema = yup.array().of(
  DesignRequestDesignLocationFile.omit(['id', 'designRequestDesignLocationId'])
    .concat(
      yup.object().shape({
        // If ID, update, otherwise create
        id: yup.string().uuid().optional(),
      }),
    )
    .required(),
)

const designRequestFilesInputSchema = yup.array().of(
  DesignRequestFile.omit(['id', 'designRequestId'])
    .concat(
      yup.object().shape({
        // If ID, update, otherwise create
        id: yup.string().uuid().optional(),
      }),
    )
    .required(),
)

const designLocationinputSchema = DesignRequestDesignLocation.omit([
  'id',
  'designRequestId',
]).concat(
  yup.object().shape({
    // If ID, update, otherwise create
    id: yup.string().uuid().optional(),
    files: designLocationFilesInputSchema.required(),
  }),
)

const artistInputSchema = DesignRequestArtist.omit([
  'id',
  'createdAt',
  'updatedAt',
  'designRequestId',
]).concat(
  yup.object().shape({
    // If ID, update, otherwise create
    id: yup.string().uuid().optional(),
  }),
)

const inputSchema = DesignRequest.omit(['createdAt', 'updatedAt']).concat(
  yup
    .object()
    .shape({
      artists: yup.array().of(artistInputSchema.required()).required(),
      proofs: proofsInputSchema.required(),
      files: designRequestFilesInputSchema.required(),
      revisionRequests: yup
        .array()
        .of(revisionRequestInputSchema.required())
        .required(),
      designLocations: yup
        .array()
        .of(designLocationinputSchema.required())
        .required(),
      products: yup.array().of(productInputSchema.required()).required(),
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
          designRequestArtists: true,
          designRequestDesignProofs: true,
          designLocations: {
            include: {
              designRequestDesignLocationFiles: true,
            },
          },
          designRequestRevisions: {
            include: {
              designRequestRevisionFiles: true,
            },
          },
          designRequestProducts: {
            include: {
              designRequestProductColors: true,
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

    const artistsToCreate = validInput.artists.filter(({ id }) => !id)
    const artistsToUpdate = validInput.artists.filter(({ id }) => id)
    const artistsToDelete = existingDesignRequest.designRequestArtists.filter(
      ({ id }) => !validInput.artists.some(artist => artist.id === id),
    )

    const filesToCreate = validInput.files.filter(({ id }) => !id)
    const filesToDelete = existingDesignRequest.designRequestFiles.filter(
      ({ id }) => !validInput.files.some(file => file.id === id),
    )

    const proofsToCreate = validInput.proofs?.filter(({ id }) => !id)
    const proofsToDelete =
      existingDesignRequest.designRequestDesignProofs.filter(
        ({ id }) => !validInput.proofs?.some(proof => proof.id === id),
      )

    const revisionRequestsToCreate = validInput.revisionRequests.filter(
      ({ id }) => !id,
    )
    const revisionRequestsToDelete =
      existingDesignRequest.designRequestRevisions.filter(
        ({ id }) =>
          !validInput.revisionRequests.some(
            revisionRequest => revisionRequest.id === id,
          ),
      )

    const productsToCreate = validInput.products.filter(({ id }) => !id)
    const productsToUpdate = validInput.products.filter(({ id }) => id)
    const productsToDelete = existingDesignRequest.designRequestProducts.filter(
      ({ id }) => !validInput.products.some(product => product.id === id),
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
          conversationId: validInput.conversationId,
          userId: validInput.userId,
          metadata: validInput.metadata || undefined,
          designRequestDesignProofs: {
            create: proofsToCreate?.map(({ designProofId }) => ({
              designProofId,
            })),
            delete: proofsToDelete?.map(({ id }) => ({
              id,
            })),
          },
          designRequestFiles: {
            create: filesToCreate.map(({ fileId }) => ({
              fileId,
            })),
            delete: filesToDelete.map(({ id }) => ({
              id,
            })),
          },
          designLocations: {
            create: locationsToCreate.map(({ files, ...location }) => {
              return {
                description: location.description || undefined,
                placement: location.placement || undefined,
                designRequestDesignLocationFiles: {
                  createMany: {
                    data: files.map(file => ({
                      fileId: file.fileId,
                    })),
                  },
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
          designRequestArtists: {
            create: artistsToCreate.map(artist => ({
              artistUserId: artist.artistUserId,
              isActive: artist.isActive,
            })),
            update: artistsToUpdate.map(({ id, ...rest }) => {
              return {
                data: {
                  isActive: rest.isActive,
                },
                where: { id },
              }
            }),
            delete: artistsToDelete.map(({ id }) => ({ id })),
          },
          designRequestRevisions: {
            create: revisionRequestsToCreate.map(revisionRequest => ({
              description: revisionRequest.description,
              userId: revisionRequest.userId,
              designRequestRevisionFiles: {
                createMany: {
                  data: revisionRequest.files.map(file => ({
                    fileId: file.fileId,
                  })),
                },
              },
            })),
            delete: revisionRequestsToDelete.map(({ id }) => ({ id })),
          },
          designRequestProducts: {
            delete: productsToDelete.map(({ id }) => ({ id })),
            create: productsToCreate.map(product => ({
              catalogProductId: product.catalogProductId,
              designRequestProductColors: {
                create: product.colors.map(color => ({
                  hexCode: color.hexCode,
                  name: color.name,
                  bigCommerceColorId: color.bigCommerceColorId,
                })),
              },
            })),
            update: productsToUpdate.map(({ id, ...rest }) => {
              const { colors, ...product } = rest

              const colorsToCreate = colors.filter(({ id }) => !id)
              const colorsToUpdate = colors.filter(({ id }) => id)
              const colorsToDelete = existingDesignTsHack.designRequestProducts
                .find(({ id: productId }) => productId === id)
                ?.designRequestProductColors.filter(
                  ({ id }) => !colors.some(color => color.id === id),
                )

              return {
                where: { id },
                data: {
                  catalogProductId: product.catalogProductId,
                  designRequestProductColors: {
                    create: colorsToCreate.map(color => ({
                      hexCode: color.hexCode,
                      name: color.name,
                      bigCommerceColorId: color.bigCommerceColorId,
                    })),
                    update: colorsToUpdate.map(({ id, ...rest }) => {
                      return {
                        where: { id },
                        data: {
                          name: rest.name,
                          hexCode: rest.hexCode,
                          bigCommerceColorId: rest.bigCommerceColorId,
                        },
                      }
                    }),
                    delete: colorsToDelete?.map(({ id }) => ({ id })),
                  },
                },
              }
            }),
          },
        },
        include: {
          designRequestFiles: true,
          designRequestArtists: true,
          designRequestDesignProofs: true,
          designLocations: {
            include: {
              designRequestDesignLocationFiles: true,
            },
          },
          designRequestRevisions: {
            include: {
              designRequestRevisionFiles: true,
            },
          },
          designRequestProducts: {
            include: {
              designRequestProductColors: true,
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
      artists: existingDesignRequest.designRequestArtists,
      files: existingDesignRequest.designRequestFiles,
      proofs: existingDesignRequest.designRequestDesignProofs,
      designLocations: existingDesignRequest.designLocations.map(location => ({
        ...location,
        files: location.designRequestDesignLocationFiles,
      })),
      revisions: existingDesignRequest.designRequestRevisions.map(revision => ({
        ...revision,
        files: revision.designRequestRevisionFiles,
      })),
      products: existingDesignRequest.designRequestProducts.map(product => ({
        ...product,
        colors: product.designRequestProductColors,
      })),
    })

    const nextDesignRequest = designRequestFactory({
      designRequest,
      artists: designRequest.designRequestArtists,
      files: designRequest.designRequestFiles,
      proofs: designRequest.designRequestDesignProofs,
      designLocations: designRequest.designLocations.map(location => ({
        ...location,
        files: location.designRequestDesignLocationFiles,
      })),
      revisions: designRequest.designRequestRevisions.map(revision => ({
        ...revision,
        files: revision.designRequestRevisionFiles,
      })),
      products: designRequest.designRequestProducts.map(product => ({
        ...product,
        colors: product.designRequestProductColors,
      })),
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
