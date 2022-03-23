import { Material, MaterialVariant } from '@prisma/client'
import { NexusGenObjects } from '../generated/nexus'

export const makeMaterial = (c: Material): NexusGenObjects['Material'] => {
  return {
    ...c,
    isActive: c.active,
    style: c.manufacturerStyleName,
  }
}

export const makeMaterialVariant = (
  c: MaterialVariant,
): NexusGenObjects['MaterialVariant'] => {
  return {
    ...c,
    isActive: c.active,
  }
}
