import * as yup from 'yup'
import { PrismaClient } from '@prisma/client'
import makeOrganizationRepository, {
  OrganizationRepository,
} from '../repository'
import { ColorService, makeClient as makeColorServiceClient } from '../../color'

import { colorFactory, ColorFactoryColor } from '../../color/factory/color'

const inputSchema = yup.object().shape({
  color: yup
    .object()
    .shape({
      id: yup.string().required(),

      name: yup.string().required(),
      hex: yup.string().required(),

      pantone: yup.string().nullable().defined(),
      cmykC: yup.number().nullable().defined(),
      cmykM: yup.number().nullable().defined(),
      cmykY: yup.number().nullable().defined(),
      cmykK: yup.number().nullable().defined(),
    })
    .required(),
})

const prisma = new PrismaClient()

type UpdateOrganizationColorFnInput = yup.InferType<typeof inputSchema>

type UpdateOrganizationColorFn = (
  input: UpdateOrganizationColorFnInput,
) => Promise<ColorFactoryColor>

interface MakeUpdateOrganizationColorConfig {
  organizationRepository: OrganizationRepository
  colorService: ColorService
}

type MakeUpdateOrganizationColorFn = (
  config?: MakeUpdateOrganizationColorConfig,
) => UpdateOrganizationColorFn

const makeUpdateOrganizationColor: MakeUpdateOrganizationColorFn =
  (
    { colorService } = {
      colorService: makeColorServiceClient(),
      organizationRepository: makeOrganizationRepository(),
    },
  ) =>
  async input => {
    const { color } = await inputSchema.validate(input)

    let newColor

    try {
      newColor = await colorService.updateColor({
        color: {
          id: color.id,
          hex: color.hex,
          name: color.name,
          cmykC: color.cmykC,
          cmykK: color.cmykK,
          cmykM: color.cmykM,
          cmykY: color.cmykY,
          pantone: color.pantone,
        },
      })
    } catch (error) {
      console.error('Failed to update color', { context: { error, input } })
      throw new Error('Failed to update color')
    }

    return colorFactory({
      colorRecord: newColor,
    })
  }

export type UpdateOrganizationColor = ReturnType<MakeUpdateOrganizationColorFn>
export { makeUpdateOrganizationColor }
