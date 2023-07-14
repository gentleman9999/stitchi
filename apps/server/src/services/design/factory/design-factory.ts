import { DesignLocationRecord } from '../db/design-location-table'
import { DesignRecord } from '../db/design-table'
import { DesignVariantImageRecord } from '../db/design-variant-image-table'
import { DesignVariantRecord } from '../db/design-variant-tables'

interface DesignFactoryDesignVariantImage extends DesignVariantImageRecord {}

interface DesignFactoryDesignVariant extends DesignVariantRecord {
  images: DesignFactoryDesignVariantImage[]
}

interface DesignFactoryDesignLocation extends DesignLocationRecord {}

export interface DesignFactoryDesign extends DesignRecord {
  locations: DesignFactoryDesignLocation[]
  variants: DesignFactoryDesignVariant[]
}

const designFactory = ({
  design,
  locations,
  variants,
}: {
  design: DesignRecord
  locations: DesignLocationRecord[]
  variants: (DesignVariantRecord & {
    images: DesignVariantImageRecord[]
  })[]
}): DesignFactoryDesign => {
  return {
    locations,
    variants,
    id: design.id,
    userId: design.userId,
    organizationId: design.organizationId,
    designRequestId: design.designRequestId,
    catalogProductId: design.catalogProductId,
    primaryImageFileId: design.primaryImageFileId,

    description: design.description,
    name: design.name,
    termsConditionsAgreed: design.termsConditionsAgreed,

    createdAt: design.createdAt,
    updatedAt: design.updatedAt,
  }
}

export { designFactory }
