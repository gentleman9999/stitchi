import { DesignProofLocationRecord } from '../db/design-proof-location-table'
import { DesignProofRecord } from '../db/design-proof-table'
import { DesignProofVariantImageRecord } from '../db/design-proof-variant-image-table'
import { DesignProofVariantRecord } from '../db/design-proof-variant-table'

interface DesignProofVariantImage extends DesignProofVariantImageRecord {}

interface DesignProofVariant extends DesignProofVariantRecord {
  images: DesignProofVariantImage[]
}

interface DesignFactoryProofLocation extends DesignProofLocationRecord {}

export interface DesignFactoryProof extends DesignProofRecord {
  locations: DesignFactoryProofLocation[]
  variants: DesignProofVariant[]
}

const designProofFactory = ({
  designProof,
  locations,
  variants,
}: {
  designProof: DesignProofRecord
  locations: DesignProofLocationRecord[]
  variants: (DesignProofVariantRecord & {
    images: DesignProofVariantImageRecord[]
  })[]
}): DesignFactoryProof => {
  return {
    locations,
    variants,
    id: designProof.id,
    artistUserId: designProof.artistUserId,
    catalogProductId: designProof.catalogProductId,
    primaryImageFileId: designProof.primaryImageFileId,
    createdAt: designProof.createdAt,
    updatedAt: designProof.updatedAt,
  }
}

export { designProofFactory }
