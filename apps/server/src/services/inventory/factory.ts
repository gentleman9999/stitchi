export interface InventoryFactorySku {
  id: string
  designRequestId: string
  quantity: number
  membershipId: string
  organizationId: string
}

interface SkuRecord {
  id: string
  designRequestId: string
  membershipId: string
  organizationId: string
  quantity: number
}

const skuFactory = ({
  skuRecord,
}: {
  skuRecord: SkuRecord
}): InventoryFactorySku => {
  return {
    id: skuRecord.id,
    designRequestId: skuRecord.designRequestId,
    quantity: skuRecord.quantity,
    membershipId: skuRecord.membershipId,
    organizationId: skuRecord.organizationId,
  }
}

export { skuFactory }
