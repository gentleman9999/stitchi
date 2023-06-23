import { Prisma } from '@prisma/client'
import { DesignLocationRecord } from './db/design-location-table'
import { DesignRequestArtistRecord } from './db/design-request-artist-table'
import { DesignRequestDesignLocationFileRecord } from './db/design-request-design-location-file-table'
import { DesignRequestDesignLocationRecord } from './db/design-request-design-location-table'
import { DesignRequestFileRecord } from './db/design-request-file-table'
import {
  DesignRequestMetadata,
  DesignRequestRecord,
} from './db/design-request-table'
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

interface DesignRequestArtist extends DesignRequestArtistRecord {}

interface DesignFactoryDesignRequestDesignLocationFile
  extends DesignRequestDesignLocationFileRecord {}

interface DesignFactoryDesignRequestDesignLocation
  extends DesignRequestDesignLocationRecord {
  files: DesignFactoryDesignRequestDesignLocationFile[]
}

interface DesignFactoryDesignRequestFile extends DesignRequestFileRecord {}

export interface DesignFactoryDesignRequest extends DesignRequestRecord {
  files: DesignFactoryDesignRequestFile[]
  designLocations: DesignFactoryDesignRequestDesignLocation[]
  artists: DesignRequestArtist[]
}

const designRequestFactory = ({
  designRequest,
  files,
  designLocations,
  designLocationFiles,
  artists,
}: {
  designRequest: Omit<DesignRequestRecord, 'metadata'> & {
    metadata: Prisma.JsonValue
  }
  files: DesignRequestFileRecord[]
  designLocations: DesignRequestDesignLocationRecord[]
  designLocationFiles: DesignRequestDesignLocationFileRecord[]
  artists: DesignRequestArtistRecord[]
}): DesignFactoryDesignRequest => {
  return {
    ...designRequest,
    files,
    artists,
    designLocations: designLocations.map(designLocation => {
      return {
        ...designLocation,
        files: designLocationFiles.filter(
          designLocationFile =>
            designLocationFile.designRequestDesignLocationId ===
            designLocation.id,
        ),
      }
    }),
    metadata: DesignRequestMetadata.validateSync(designRequest.metadata),
  }
}

export { designFactory, designRequestFactory }
