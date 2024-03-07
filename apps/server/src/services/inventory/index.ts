import { InventoryFactorySku } from './factory'
import makeInventoryRepository, { InventoryRepository } from './repository'
import { CreateSkuFnInput } from './repository/create-sku'

/**
 * Increase the quantity of the item in inventory.
 * Represents the production and storage of a garment.
 *
 * This may be an API call to BIGC/Shopify and/or DB calls.
 */
interface CreateInventoryInput {
  designVariantId: string
  size: string
  quantity: number
}

/**
 * Decrease the quantity of the item in inventory.
 * Represents the fulfillment of a garment.
 *
 * This may be an API call to BIGC/Shopify and/or DB calls.
 */
interface ConsumeInventoryInput {
  designVariantId: string
  size: string
  quantity: number
}

export interface InventoryClientService {
  createSku: (input: CreateSkuFnInput) => Promise<InventoryFactorySku>
  createInventory: (input: CreateInventoryInput) => Promise<void>
  consumeInventory: (input: ConsumeInventoryInput) => Promise<void>
}

interface MakeClientParams {
  inventoryRepository: InventoryRepository
}

type MakeClientFn = (params?: MakeClientParams) => InventoryClientService

const makeClient: MakeClientFn = (
  { inventoryRepository } = { inventoryRepository: makeInventoryRepository() },
) => {
  return {
    createSku: async ({ sku }) => {
      let newSku

      try {
        newSku = await inventoryRepository.createSku({ sku })
      } catch (error) {
        throw new Error('Failed to create sku')
      }

      return newSku
    },
    createInventory: async () => {},
    consumeInventory: async () => {},
  }
}

export { makeClient }
