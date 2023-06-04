import { DesignLocationRecord } from './db/design-location-table'
import { DesignRecord } from './db/design-table'

interface DesignFactoryDesignLocation extends DesignLocationRecord {}

export interface DesignFactoryDesign extends DesignRecord {
  locations: DesignFactoryDesignLocation[]
}

const designFactory = ({
  design,
  locations,
}: {
  design: DesignRecord
  locations: DesignLocationRecord[]
}): DesignFactoryDesign => {
  return {
    ...design,
    locations,
  }
}

export { designFactory }
