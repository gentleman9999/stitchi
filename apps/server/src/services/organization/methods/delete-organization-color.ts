import * as yup from 'yup'
import makeOrganizationRepository, {
  OrganizationRepository,
} from '../repository'
import { ColorService, makeClient as makeColorServiceClient } from '../../color'
import { colorFactory, ColorFactoryColor } from '../../color/factory/color'
import { logger } from '../../../telemetry'

const inputSchema = yup.object().shape({
  colorId: yup.string().uuid().required(),
})

type DeleteOrganizationColorFnInput = yup.InferType<typeof inputSchema>

type DeleteOrganizationColorFn = (
  input: DeleteOrganizationColorFnInput,
) => Promise<ColorFactoryColor>

interface MakeDeleteOrganizationColorConfig {
  organizationRepository: OrganizationRepository
  colorService: ColorService
}

type MakeDeleteOrganizationColorFn = (
  config?: MakeDeleteOrganizationColorConfig,
) => DeleteOrganizationColorFn

const makeDeleteOrganizationColor: MakeDeleteOrganizationColorFn =
  (
    { colorService, organizationRepository } = {
      colorService: makeColorServiceClient(),
      organizationRepository: makeOrganizationRepository(),
    },
  ) =>
  async input => {
    const { colorId } = await inputSchema.validate(input)

    let foundColor

    try {
      foundColor = await colorService.getColor({
        colorId,
      })
    } catch (error) {
      logger
        .child({ context: { error, input } })
        .error('Failed to delete color')
      throw new Error('Failed to delete color')
    }

    let organizationColorToDelete

    try {
      const [color] = await organizationRepository.listOrganizationColors({
        where: {
          colorId: foundColor.id,
        },
      })

      if (color) {
        organizationColorToDelete = color
      } else {
        throw new Error('Color not found')
      }
    } catch (error) {
      logger
        .child({
          context: { error, input },
        })
        .error('Failed to delete organization color')
      throw new Error('Failed to delete organization color')
    }

    try {
      await organizationRepository.deleteOrganizationColor({
        organizationColorId: organizationColorToDelete.id,
      })
    } catch (error) {
      logger
        .child({
          context: { error, input },
        })
        .error('Failed to delete organization color')
      throw new Error('Failed to delete organization color')
    }

    return colorFactory({
      colorRecord: foundColor,
    })
  }

export type DeleteOrganizationColor = ReturnType<MakeDeleteOrganizationColorFn>
export { makeDeleteOrganizationColor }
