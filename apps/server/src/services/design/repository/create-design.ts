import { PrismaClient } from '@prisma/client'
import * as yup from 'yup'
import { DesignLocation } from '../db/design-location-table'
import {
  Design,
  DesignTable,
  table as makeDesignTable,
} from '../db/design-table'
import { DesignVariantImage } from '../db/design-variant-image-table'
import { DesignVariant } from '../db/design-variant-tables'
import { designFactory, DesignFactoryDesign } from '../factory'

const designVariantImageSchema = DesignVariantImage.omit(['designVariantId'])

const designVariantSchema = DesignVariant.omit(['id', 'designId']).concat(
  yup
    .object()
    .shape({
      images: yup.array().of(designVariantImageSchema.required()).required(),
    })
    .required(),
)

const designLocationSchema = DesignLocation.omit([
  'id',
  'createdAt',
  'updatedAt',
  'designId',
])

const inputSchema = Design.omit(['id', 'createdAt', 'updatedAt']).concat(
  yup
    .object()
    .shape({
      locations: yup.array().of(designLocationSchema.required()).required(),
      variants: yup.array().of(designVariantSchema.required()).required(),
    })
    .required(),
)

const prisma = new PrismaClient()

interface CreateDesignConfig {
  designTable: DesignTable
}

export interface CreateDesignFnInput {
  design: yup.Asserts<typeof inputSchema>
}

type CreateDesignFn = (
  input: CreateDesignFnInput,
) => Promise<DesignFactoryDesign>

type MakeCreateDesignFn = (config?: CreateDesignConfig) => CreateDesignFn

const makeCreateDesign: MakeCreateDesignFn =
  (
    { designTable } = {
      designTable: makeDesignTable(prisma),
    },
  ) =>
  async input => {
    const validInput = await inputSchema.validate(input.design)

    let design

    try {
      design = await designTable.create({
        data: {
          designRequestId: validInput.designRequestId,
          catalogProductId: validInput.catalogProductId,
          userId: validInput.userId,
          organizationId: validInput.organizationId,
          primaryImageFileId: validInput.primaryImageFileId,
          name: validInput.name,
          description: validInput.description,
          termsConditionsAgreed: validInput.termsConditionsAgreed,
          designLocations: {
            createMany: {
              data: validInput.locations.map(location => ({
                colorCount: location.colorCount,
                placement: location.placement,
              })),
            },
          },
          designVariants: {
            create: validInput.variants.map(variant => ({
              catalogProductColorId: variant.catalogProductColorId,
              images: {
                createMany: {
                  data: variant.images.map(image => ({
                    fileId: image.fileId,
                    order: image.order,
                  })),
                },
              },
            })),
          },
        },
        include: {
          designLocations: true,
          designVariants: {
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
      console.error(`Failed to create design: ${input.design.name}`, {
        context: { error, input },
      })

      throw new Error('Failed to create design')
    }

    return designFactory({
      design,
      locations: design.designLocations,
      variants: design.designVariants,
    })
  }

export default makeCreateDesign
