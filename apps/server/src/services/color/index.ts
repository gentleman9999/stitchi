import { logger } from '../../telemetry'
import makeColorRepository, { ColorRepository } from './repository'

export interface ColorService {
  createColor: ColorRepository['createColor']
  getColor: ColorRepository['getColor']
  listColors: ColorRepository['listColors']
  updateColor: ColorRepository['updateColor']
}

interface MakeClientParams {
  colorRepository: ColorRepository
}

type MakeClientFn = (params?: MakeClientParams) => ColorService

const makeClient: MakeClientFn = (
  { colorRepository } = {
    colorRepository: makeColorRepository(),
  },
) => {
  return {
    createColor: async input => {
      let color

      try {
        color = await colorRepository.createColor(input)
      } catch (error) {
        logger
          .child({ context: { error, input } })
          .error('Failed to create color')
        throw new Error('Failed to create color')
      }

      return color
    },
    getColor: async input => {
      let color

      try {
        color = await colorRepository.getColor(input)
      } catch (error) {
        logger.child({ context: { error, input } }).error('Failed to get color')
        throw new Error('Failed to get color')
      }

      return color
    },

    listColors: async input => {
      let colors

      try {
        colors = await colorRepository.listColors(input)
      } catch (error) {
        logger
          .child({ context: { error, input } })
          .error('Failed to list colors')
        throw new Error('Failed to list colors')
      }

      return colors
    },

    updateColor: async input => {
      let color

      try {
        color = await colorRepository.updateColor(input)
      } catch (error) {
        logger
          .child({ context: { error, input } })
          .error('Failed to update color')
        throw new Error('Failed to update color')
      }

      return color
    },
  }
}

export { makeClient }
