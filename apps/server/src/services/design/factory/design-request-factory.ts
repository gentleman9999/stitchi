import { Prisma } from '@prisma/client'
import { DesignRequestArtistRecord } from '../db/design-request-artist-table'
import { DesignRequestDesignLocationFileRecord } from '../db/design-request-design-location-file-table'
import { DesignRequestDesignLocationRecord } from '../db/design-request-design-location-table'
import { DesignRequestDesignProofRecord } from '../db/design-request-design-proof-table'
import { DesignRequestFileRecord } from '../db/design-request-file-table'
import {
  DesignRequestMetadata,
  DesignRequestRecord,
} from '../db/design-request-table'

interface DesignRequestDesignProof extends DesignRequestDesignProofRecord {}

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
  proofs: DesignRequestDesignProof[]
}

const designRequestFactory = ({
  designRequest,
  files,
  designLocations,
  designLocationFiles,
  artists,
  proofs,
}: {
  designRequest: Omit<DesignRequestRecord, 'metadata'> & {
    metadata: Prisma.JsonValue
  }
  files: DesignRequestFileRecord[]
  designLocations: DesignRequestDesignLocationRecord[]
  designLocationFiles: DesignRequestDesignLocationFileRecord[]
  artists: DesignRequestArtistRecord[]
  proofs: DesignRequestDesignProofRecord[]
}): DesignFactoryDesignRequest => {
  return {
    ...designRequest,
    files,
    artists,
    proofs,
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

export { designRequestFactory }
