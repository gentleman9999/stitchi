export interface InventoryFactorySku {
  id: string;
  designRequestId: string;
  quantity: number;
  membershipId: string;
  organizationId: string;
}

interface SkuRecord {
  id: string;
  designRequestId: string;
  membershipId: string;
  organizationId: string;
  quantity: number;
}

const skuFactory = ({ skuRecord }: { skuRecord: SkuRecord }): InventoryFactorySku => {
  return {
    designRequestId,
    quantity,
  };
};

export { skuFactory };
