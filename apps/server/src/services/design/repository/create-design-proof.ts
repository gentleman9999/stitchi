import { PrismaClient } from '@prisma/client'
import {
  DesignProof,
  DesignProofTable,
  table as makeDesignProofTable,
} from '../db/design-proof-table'
import * as yup from 'yup'
import { DesignFactoryProof, designProofFactory } from '../factory'
import { DesignProofLocation } from '../db/design-proof-location-table'
import { DesignProofVariant } from '../db/design-proof-variant-table'
import { DesignProofVariantImage } from '../db/design-proof-variant-image-table'
import { logger } from '../../../telemetry'

const variantImageSchema = DesignProofVariantImage.omit([
  'designProofVariantId',
])

const variantSchema = DesignProofVariant.omit(['id', 'designProofId']).concat(
  yup
    .object()
    .shape({
      images: yup.array().of(variantImageSchema.required()).required(),
    })
    .required(),
)

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
      variants: yup.array().of(variantSchema.required()).required(),
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
    let validInput
    try {
      validInput = await inputSchema.validate(input.designProof)
    } catch (error) {
      logger
        .child({
          context: { error, input },
        })
        .error(`Failed to validate input: ${input}`)

      throw new Error('Failed to validate input')
    }

    let designProof

    try {
      designProof = await designProofTable.create({
        data: {
          artistMembershipId: validInput.artistMembershipId,
          catalogProductId: validInput.catalogProductId,
          primaryImageFileId: validInput.primaryImageFileId,
          designProofLocations: {
            create: validInput.locations.map(location => ({
              colorCount: location.colorCount,
              placement: location.placement,
              fileId: location.fileId,
            })),
          },

          designProofVariants: {
            create: validInput.variants.map(variant => ({
              catalogProductColorId: variant.catalogProductColorId,
              hexCode: variant.hexCode,
              name: variant.name,
              images: {
                createMany: {
                  data: variant.images.map(image => ({
                    imageFileId: image.imageFileId,
                    order: image.order,
                  })),
                },
              },
            })),
          },
        },
        include: {
          designProofLocations: true,
          designProofVariants: {
            include: {
              images: {
                orderBy: {
                  order: 'asc',
                },
              },
            },
          },
        },
      })
    } catch (error) {
      logger
        .child({
          context: { error, input },
        })
        .error(`Failed to create design proof: ${input}`)
      throw new Error('Failed to create design proof')
    }

    return designProofFactory({
      designProof,
      locations: designProof.designProofLocations,
      variants: designProof.designProofVariants,
    })
  }

export default makeCreateDesignProof
