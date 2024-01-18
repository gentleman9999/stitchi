import * as uuid from 'uuid'
import { InventoryFactorySku, skuFactory } from './factory'

/**
 * Create the literal stock keeping unit (Sku).
 *
 * This may be an API call to BIGC/Shopify and/or DB calls.
 */
interface CreateSkuInput {
  designVariantId: string
  size: string
  initialQuantity: number
}

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
  createSku: (input: CreateSkuInput) => Promise<InventoryFactorySku>
  createInventory: (input: CreateInventoryInput) => Promise<InventoryFactorySku>
  consumeInventory: (
    input: ConsumeInventoryInput,
  ) => Promise<InventoryFactorySku>
}

interface MakeClientParams {}

type MakeClientFn = (params?: MakeClientParams) => InventoryClientService

type Sku = string

interface Ledger {
  id: string
  designVariantId: string
  size: string
  quantity: number
}

/**
 * This is a placeholder for where we actually want to store the data.
 * This could be a BIGC catalog, a Shopify catalog, or our own tables.
 */
const database: Record<Sku, Ledger> = {}

const makeClient: MakeClientFn = () => {
  return {
    createSku: async ({ designVariantId, size, initialQuantity }) => {
      if (!(designVariantId in database)) {
        database[designVariantId] = {
          id: uuid.v4(),
          designVariantId,
          size,
          quantity: initialQuantity,
        }
      }

      return skuFactory({
        skuRecord: database[designVariantId],
      })
    },
    createInventory: async ({ designVariantId, quantity }) => {
      if (!(designVariantId in database)) {
        throw new Error(`Sku not found for design request ${designVariantId}`)
      }

      database[designVariantId].quantity += quantity

      return skuFactory({
        skuRecord: database[designVariantId],
      })
    },
    consumeInventory: async ({ designVariantId, quantity }) => {
      if (!(designVariantId in database)) {
        throw new Error(`Sku not found for design request ${designVariantId}`)
      }

      const remaining = database[designVariantId].quantity - quantity

      // Never let inventory drop below 0
      if (remaining < 0) {
        throw new Error(
          `Sku would have fewer than zero items remaining for design request ${designVariantId}`,
        )
      }

      database[designVariantId].quantity = remaining

      return skuFactory({
        skuRecord: database[designVariantId],
      })
    },
  }
}

export { makeClient }
