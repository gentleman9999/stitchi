import { DesignProofLocationRecord } from '../db/design-proof-location-table'
import { DesignProofRecord } from '../db/design-proof-table'
import { DesignProofVariantImageRecord } from '../db/design-proof-variant-image-table'
import { DesignProofVariantRecord } from '../db/design-proof-variant-table'
import { DesignRequestDesignProofRecord } from '../db/design-request-design-proof-table'

interface DesignProofVariantImage extends DesignProofVariantImageRecord {}

interface DesignProofVariant extends DesignProofVariantRecord {
  images: DesignProofVariantImage[]
}

interface DesignFactoryProofLocation extends DesignProofLocationRecord {}

export interface DesignFactoryProof extends DesignProofRecord {
  designRequestId?: string
  locations: DesignFactoryProofLocation[]
  variants: DesignProofVariant[]
}

const designProofFactory = ({
  designProof,
  locations,
  variants,
  designRequestDesignProof,
}: {
  designProof: DesignProofRecord
  designRequestDesignProof?: DesignRequestDesignProofRecord
  locations: DesignProofLocationRecord[]
  variants: (DesignProofVariantRecord & {
    images: DesignProofVariantImageRecord[]
  })[]
}): DesignFactoryProof => {
  return {
    locations,
    variants,
    id: designProof.id,
    artistMembershipId: designProof.artistMembershipId,
    catalogProductId: designProof.catalogProductId,
    primaryImageFileId: designProof.primaryImageFileId,
    designRequestId: designRequestDesignProof?.designRequestId,
    createdAt: designProof.createdAt,
    updatedAt: designProof.updatedAt,
  }
}

export { designProofFactory }
