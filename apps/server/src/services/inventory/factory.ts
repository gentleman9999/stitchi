export interface InventoryFactorySku {
  id: string
  designVariantId: string
  quantity: number
}

interface SkuRecord {
  id: string
  // TODO: designVariant needs to support either `size` or `bigCommerceProductVariantId`
  designVariantId: string
  quantity: number
}

interface FactoryInput {
  skuRecord: SkuRecord
}

const skuFactory = ({ skuRecord }: FactoryInput): InventoryFactorySku => {
  return {
    id: skuRecord.id,
    designVariantId: skuRecord.designVariantId,
    quantity: skuRecord.quantity,
  }
}

export { skuFactory }
