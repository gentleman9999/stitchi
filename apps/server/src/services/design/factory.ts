import { DesignLocationRecord } from './db/design-location-table'
import { DesignRequestFileRecord } from './db/design-request-file-table'
import { DesignRequestRecord } from './db/design-request-table'
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

interface DesignFactoryDesignRequestFile extends DesignRequestFileRecord {}

export interface DesignFactoryDesignRequest extends DesignRequestRecord {
  files: DesignFactoryDesignRequestFile[]
}

const designRequestFactory = ({
  designRequest,
  files,
}: {
  designRequest: DesignRequestRecord
  files: DesignRequestFileRecord[]
}): DesignFactoryDesignRequest => {
  return { ...designRequest, files }
}

export { designFactory, designRequestFactory }
