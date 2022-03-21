import { Material } from '@prisma/client'
import { NexusGenObjects } from '../../generated/nexus'

export const makeMaterial = (c: Material): NexusGenObjects['Material'] => {
  return {
    ...c,
    isActive: c.active,
    style: c.manufacturerStyleName,
  }
}
