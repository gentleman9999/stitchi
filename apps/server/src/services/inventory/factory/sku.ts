import { SkuRecord } from '../db/sku-table'

export interface InventoryFactorySku extends SkuRecord {}

interface FactoryInput {
  skuRecord: SkuRecord
}

const skuFactory = ({ skuRecord }: FactoryInput): InventoryFactorySku => {
  return {
    id: skuRecord.id,
    designVariantId: skuRecord.designVariantId,
    quantity: skuRecord.quantity,

    createdAt: skuRecord.createdAt,
    updatedAt: skuRecord.updatedAt,
    deletedAt: skuRecord.deletedAt,
  }
}

export { skuFactory }
