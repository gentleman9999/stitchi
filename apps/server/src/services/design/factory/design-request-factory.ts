import { Prisma } from '@prisma/client'
import { DesignRequestArtistRecord } from '../db/design-request-artist-table'
import { DesignRequestDesignLocationFileRecord } from '../db/design-request-design-location-file-table'
import { DesignRequestDesignLocationRecord } from '../db/design-request-design-location-table'
import { DesignRequestDesignProofRecord } from '../db/design-request-design-proof-table'
import { DesignRequestFileRecord } from '../db/design-request-file-table'
import { DesignRequestProductColorRecord } from '../db/design-request-product-color-table'
import { DesignRequestProductRecord } from '../db/design-request-product-table'
import { DesignRequestRevisionFileRecord } from '../db/design-request-revision-file-table'
import { DesignRequestRevisionRecord } from '../db/design-request-revision-table'
import {
  DesignRequestMetadata,
  DesignRequestRecord,
} from '../db/design-request-table'

interface DesignRequestProductColor extends DesignRequestProductColorRecord {}

interface DesignRequestProduct extends DesignRequestProductRecord {
  colors: DesignRequestProductColor[]
}

interface DesignRequestRevisionRequestFile
  extends DesignRequestRevisionFileRecord {}

interface DesignRequestRevisionRequest extends DesignRequestRevisionRecord {
  files: DesignRequestRevisionRequestFile[]
}

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
  revisionRequests: DesignRequestRevisionRequest[]
  products: DesignRequestProduct[]
}

const designRequestFactory = ({
  designRequest,
  files,
  designLocations,
  artists,
  proofs,
  revisions,
  products,
}: {
  files: DesignRequestFileRecord[]
  artists: DesignRequestArtistRecord[]
  proofs: DesignRequestDesignProofRecord[]
  designRequest: Omit<DesignRequestRecord, 'metadata'> & {
    metadata: Prisma.JsonValue
  }
  products: (DesignRequestProductRecord & {
    colors: DesignRequestProductColorRecord[]
  })[]
  designLocations: (DesignRequestDesignLocationRecord & {
    files: DesignRequestDesignLocationFileRecord[]
  })[]

  revisions: (DesignRequestRevisionRecord & {
    files: DesignRequestRevisionFileRecord[]
  })[]
}): DesignFactoryDesignRequest => {
  return {
    files,
    artists,
    proofs,
    designLocations,
    products,
    id: designRequest.id,
    userId: designRequest.userId,
    organizationId: designRequest.organizationId,
    conversationId: designRequest.conversationId,
    createdAt: designRequest.createdAt,
    description: designRequest.description,
    name: designRequest.name,
    status: designRequest.status,
    updatedAt: designRequest.updatedAt,
    revisionRequests: revisions,
    metadata: DesignRequestMetadata.validateSync(designRequest.metadata),
  }
}

export { designRequestFactory }
