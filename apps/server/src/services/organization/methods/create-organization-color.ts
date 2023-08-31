import * as yup from 'yup'
import makeOrganizationRepository, {
  OrganizationRepository,
} from '../repository'
import { ColorService, makeClient as makeColorServiceClient } from '../../color'
import { colorFactory, ColorFactoryColor } from '../../color/factory/color'
import { logger } from '../../../telemetry'

const inputSchema = yup.object().shape({
  organizationId: yup.string().uuid().required(),
  color: yup
    .object()
    .shape({
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

type CreateOrganizationColorFnInput = yup.InferType<typeof inputSchema>

type CreateOrganizationColorFn = (
  input: CreateOrganizationColorFnInput,
) => Promise<ColorFactoryColor>

interface MakeCreateOrganizationColorConfig {
  organizationRepository: OrganizationRepository
  colorService: ColorService
}

type MakeCreateOrganizationColorFn = (
  config?: MakeCreateOrganizationColorConfig,
) => CreateOrganizationColorFn

const makeCreateOrganizationColor: MakeCreateOrganizationColorFn =
  (
    { colorService, organizationRepository } = {
      colorService: makeColorServiceClient(),
      organizationRepository: makeOrganizationRepository(),
    },
  ) =>
  async input => {
    const { color } = await inputSchema.validate(input)

    let newColor

    try {
      newColor = await colorService.createColor({
        color: {
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
      logger
        .child({ context: { error, input } })
        .error('Failed to create color')
      throw new Error('Failed to create color')
    }

    try {
      await organizationRepository.createOrganizationColor({
        organizationColor: {
          organizationId: input.organizationId,
          colorId: newColor.id,
        },
      })
    } catch (error) {
      logger
        .child({
          context: { error, input },
        })
        .error('Failed to create organization color')
      throw new Error('Failed to create organization color')
    }

    return colorFactory({
      colorRecord: newColor,
    })
  }

export type CreateOrganizationColor = ReturnType<MakeCreateOrganizationColorFn>
export { makeCreateOrganizationColor }
