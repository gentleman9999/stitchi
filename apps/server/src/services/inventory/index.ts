import * as uuid from 'uuid';
import { InventoryFactorySku, skuFactory } from "./factory";

/**
 * Create the literal stock keeping unit (SKU).
 *
 * This may be an API call to BIGC/Shopify and/or DB calls.
 */
interface CreateSkuInput {
  designRequestId: string;
  initialQuantity: number;
  membershipId: string;
  organizationId: string;
}

/**
 * Increase the quantity of the item in inventory.
 * Represents the production and storage of a garment.
 *
 * This may be an API call to BIGC/Shopify and/or DB calls.
 */
interface CreateInventoryInput {
  designRequestId: string;
  quantity: number;
}

/**
 * Decrease the quantity of the item in inventory.
 * Represents the fulfillment of a garment.
 *
 * This may be an API call to BIGC/Shopify and/or DB calls.
 */
interface ConsumeInventoryInput {
  designRequestId: string;
  quantity: number;
}

export interface InventoryClientService {
  createSku: (input: CreateSkuInput) => Promise<InventoryFactorySku>;
  createInventory: (input: CreateInventoryInput) => Promise<InventoryFactorySku>;
  consumeInventory: (input: ConsumeInventoryInput) => Promise<InventoryFactorySku>;
}

interface MakeClientParams {}

type MakeClientFn = (params?: MakeClientParams) => InventoryClientService

type Sku = string;

interface Ledger {
  id: string;
  designRequestId: string;
  membershipId: string;
  organizationId: string;
  quantity: number;
}

/**
 * This is a placeholder for where we actually want to store the data.
 * This could be a BIGC catalog, a Shopify catalog, or our own tables.
 */
const database: Record<Sku, Ledger> = {};

const makeClient: MakeClientFn = () => {
  return {
    createSku: async ({ designRequestId, membershipId, organizationId, initialQuantity }) => {
      if (!(designRequestId in database)) {
        database[designRequestId] = {
          id: uuid.v4(),
          designRequestId,
          membershipId,
          organizationId,
          quantity: initialQuantity ,
        };
      }

      return skuFactory({ skuRecord: database[designRequestId] });
    },
    createInventory: async ({ designRequestId, quantity }) => {
      if (!(designRequestId in database)) {
        throw new Error(`SKU not found for design request ${designRequestId}`);
      }

      database[designRequestId].quantity += quantity;

      return skuFactory({ skuRecord: database[designRequestId] });
    },
    consumeInventory: async ({ designRequestId, quantity }) => {
      if (!(designRequestId in database)) {
        throw new Error(`SKU not found for design request ${designRequestId}`);
      }

      const remaining = database[designRequestId].quantity - quantity;

      // Never let inventory drop below 0
      if (remaining < 0) {
        throw new Error(`SKU would have fewer than zero items remaining for design request ${designRequestId}`);
      }

      database[designRequestId].quantity = remaining;

      return skuFactory({ skuRecord: database[designRequestId] });
    },
  };
}

export { makeClient };
