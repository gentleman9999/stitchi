import {
  DesignFactoryDesignRequest,
  DesignFactoryProof,
} from '../../services/design/factory'
import { NexusGenEnums, NexusGenObjects } from '../generated/nexus'

const humanizedStatus = (status: NexusGenEnums['DesignRequestStatus']) => {
  switch (status) {
    case 'APPROVED':
      return 'Approved'
    case 'AWAITING_APPROVAL':
      return 'Awaiting Approval'
    case 'AWAITING_REVISION':
      return 'Awaiting Revision'
    case 'DRAFT':
      return 'Draft'
    case 'REJECTED':
      return 'Rejected'
    case 'SUBMITTED':
      return 'Submitted'
  }
}

export const designRequestFactoryToGrahpql = (
  designRequest: DesignFactoryDesignRequest,
): NexusGenObjects['DesignRequest'] => {
  return {
    id: designRequest.id,
    conversationId: designRequest.conversationId,
    userId: designRequest.userId,
    fileIds: designRequest.files.map(file => file.fileId),
    updatedAt: designRequest.updatedAt,
    createdAt: designRequest.createdAt,

    name: designRequest.name,
    description: designRequest.description,
    status: designRequest.status,
    humanizedStatus: humanizedStatus(designRequest.status),

    useCase: designRequest.metadata?.useCase,
    designProofIds: designRequest.proofs.map(proof => proof.designProofId),

    designRequestLocationIds: designRequest.designLocations.map(
      designLocation => designLocation.id,
    ),
    designRequestLocations: designRequest.designLocations.map(
      designLocation => {
        return {
          ...designLocation,
          fileIds: designLocation.files.map(file => file.fileId),
        }
      },
    ),

    designRevisionRequestIds: designRequest.revisionRequests.map(
      revision => revision.id,
    ),

    designRevisionRequests: designRequest.revisionRequests.map(revision => {
      return {
        ...revision,
        fileIds: revision.files.map(file => file.fileId),
      }
    }),
  }
}

export const designProofFactoryToGraphql = (
  designProof: DesignFactoryProof,
): NexusGenObjects['DesignProof'] => {
  return { ...designProof, fileIds: designProof.files.map(file => file.fileId) }
}
