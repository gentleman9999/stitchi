import {
  DesignFactoryDesign,
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
    approvedDesignProofId: designRequest.approvedDesignProofId,
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

    designRequestProductId: designRequest.product.id,
    designRequestProduct: designRequest.product,
  }
}

export const designProofFactoryToGraphql = (
  designProof: DesignFactoryProof,
): NexusGenObjects['DesignProof'] => {
  return {
    id: designProof.id,
    artistUserId: designProof.artistUserId,

    primaryImageFileId: designProof.primaryImageFileId,

    designProofLocationIds: designProof.locations.map(location => location.id),
    designProofColorIds: designProof.variants.map(variant => variant.id),

    createdAt: designProof.createdAt,

    locations: designProof.locations.map(location => ({
      id: location.id,
      designProofId: location.designProofId,
      fileId: location.fileId,
      colorCount: location.colorCount,
      placement: location.placement,
    })),

    colors: designProof.variants.map(variant => ({
      id: variant.id,
      catalogProductColorId: variant.catalogProductColorId,
      designProofId: variant.designProofId,
      hexCode: variant.hexCode,
      name: variant.name,
      imageFileIds: variant.images.map(image => image.imageFileId),
    })),
  }
}

export const designFactoryDesignToGraphql = (
  design: DesignFactoryDesign,
): NexusGenObjects['DesignProduct'] => {
  return {
    id: design.id,
    catalogProductId: design.catalogProductId,
    designRequestId: design.designRequestId,
    organizationId: design.organizationId,
    designProofId: design.designProofId,
    primaryImageFileId: design.primaryImageFileId,
    userId: design.userId,

    name: design.name,
    description: design.description,
    termsConditionsAgreed: design.termsConditionsAgreed,

    createdAt: design.createdAt,
    updatedAt: design.updatedAt,

    colors: design.variants.map(variant => ({
      id: variant.id,
      catalogProductColorId: variant.catalogProductColorId,
      hex: variant.colorHexCode,
      name: variant.colorName,
      designRequestProductId: design.catalogProductId,

      imageFileIds: variant.images.map(image => image.fileId),
    })),
  }
}
