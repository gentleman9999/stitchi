import { ColorFactoryColor } from '../../services/color/factory/color'
import { NexusGenObjects } from '../generated/nexus'

export const colorFactoryToGrahpql = (
  color: ColorFactoryColor,
): NexusGenObjects['Color'] => {
  return {
    id: color.id,
    name: color.name,
    cmykC: color.cmykC,
    cmykK: color.cmykK,
    cmykM: color.cmykM,
    cmykY: color.cmykY,
    hex: color.hex,
    pantone: color.pantone,
  }
}
