import { CatalogProduct } from '@prisma/client'
import { NexusGenObjects } from '../../generated/nexus'

export const makeCatalogProduct = (
  c: CatalogProduct,
): NexusGenObjects['CatalogProduct'] => {
  return {
    ...c,
    isActive: c.active,
  }
}
