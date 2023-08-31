import * as yup from 'yup'
import makeOrganizationRepository, {
  OrganizationRepository,
} from '../repository'
import { ColorService, makeClient as makeColorServiceClient } from '../../color'
import { colorFactory, ColorFactoryColor } from '../../color/factory/color'
import { logger } from '../../../telemetry'

const inputSchema = yup.object().shape({
  organizationId: yup.string().required(),
})

type ListOrganizationColorsFnInput = yup.InferType<typeof inputSchema>

type ListOrganizationColorsFn = (
  input: ListOrganizationColorsFnInput,
) => Promise<ColorFactoryColor[]>

interface MakeListOrganizationColorsConfig {
  organizationRepository: OrganizationRepository
  colorService: ColorService
}

type MakeListOrganizationColorsFn = (
  config?: MakeListOrganizationColorsConfig,
) => ListOrganizationColorsFn

const makeListOrganizationColors: MakeListOrganizationColorsFn =
  (
    { colorService, organizationRepository } = {
      colorService: makeColorServiceClient(),
      organizationRepository: makeOrganizationRepository(),
    },
  ) =>
  async input => {
    const { organizationId } = await inputSchema.validate(input)

    let organizationColor

    try {
      organizationColor = await organizationRepository.listOrganizationColors({
        where: {
          organizationId: organizationId,
          deletedAt: null,
        },
      })
    } catch (error) {
      logger
        .child({
          context: { error, input },
        })
        .error('Failed to list organization color')
      throw new Error('Failed to list organization color')
    }

    let colors

    try {
      colors = await colorService.listColors({
        where: {
          id: {
            in: organizationColor.map(oc => oc.colorId),
          },
        },
      })
    } catch (error) {
      logger
        .child({
          context: { error, input },
        })
        .error('Failed to list colors')
      throw new Error('Failed to list colors')
    }

    return colors.map(color => colorFactory({ colorRecord: color }))
  }

export type ListOrganizationColors = ReturnType<MakeListOrganizationColorsFn>
export { makeListOrganizationColors }
