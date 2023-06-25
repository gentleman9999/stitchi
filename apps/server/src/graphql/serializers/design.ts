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
    ...designRequest,
    humanizedStatus: humanizedStatus(designRequest.status),
    useCase: designRequest.metadata?.useCase,
    fileIds: designRequest.files.map(file => file.fileId),
    designProofIds: designRequest.proofs.map(proof => proof.designProofId),
    designLocationIds: designRequest.designLocations.map(
      designLocation => designLocation.id,
    ),
    designLocations: designRequest.designLocations.map(designLocation => {
      return {
        ...designLocation,
        fileIds: designLocation.files.map(file => file.fileId),
      }
    }),
  }
}

export const designProofFactoryToGraphql = (
  designProof: DesignFactoryProof,
): NexusGenObjects['DesignProof'] => {
  return { ...designProof, fileIds: designProof.files.map(file => file.fileId) }
}
