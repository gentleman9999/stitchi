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
import { DesignRequestArtist } from '../db/design-request-artist-table'
import { DesignRequestProduct } from '../db/design-request-product-table'
import { DesignRequestProductColor } from '../db/design-request-product-color-table'

const productInputSchema = DesignRequestProduct.omit([
  'id',
  'createdAt',
  'updatedAt',
  'designRequestId',
]).concat(
  yup.object().shape({
    colors: yup
      .array()
      .of(
        DesignRequestProductColor.omit([
          'id',
          'designRequestProductId',
          'createdAt',
          'updatedAt',
        ]).required(),
      )
      .required(),
  }),
)

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

const artistInputSchema = DesignRequestArtist.omit([
  'id',
  'createdAt',
  'updatedAt',
  'designRequestId',
])

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
      artists: yup.array().of(artistInputSchema.required()).required(),
      products: yup.array().of(productInputSchema.required()).required(),
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
            create: validInput.designLocations.map(designLocation => ({
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
          designRequestArtists: {
            createMany: {
              data: validInput.artists.map(artist => ({
                artistUserId: artist.artistUserId,
                isActive: artist.isActive,
              })),
            },
          },
          designRequestProducts: {
            create: validInput.products.map(product => ({
              bigCommerceProductId: product.bigCommerceProductId,
              designRequestProductColors: {
                createMany: {
                  data: product.colors.map(color => ({
                    bigCommerceColorId: color.bigCommerceColorId,
                  })),
                },
              },
            })),
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
          designRequestProducts: {
            include: {
              designRequestProductColors: true,
            },
          },
          designRequestRevisions: {
            include: {
              designRequestRevisionFiles: true,
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
      artists: designRequest.designRequestArtists,
      files: designRequest.designRequestFiles,
      proofs: designRequest.designRequestDesignProofs,
      revisions: designRequest.designRequestRevisions.map(revision => ({
        ...revision,
        files: revision.designRequestRevisionFiles,
      })),
      designLocations: designRequest.designLocations.map(location => ({
        ...location,
        files: location.designRequestDesignLocationFiles,
      })),
      products: designRequest.designRequestProducts.map(product => ({
        ...product,
        colors: product.designRequestProductColors,
      })),
    })
  }

export default makeCreateDesignRequest
