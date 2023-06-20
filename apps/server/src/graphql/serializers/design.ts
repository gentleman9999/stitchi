import { DesignFactoryDesignRequest } from '../../services/design/factory'
import { NexusGenObjects } from '../generated/nexus'

export const designRequestFactoryToGrahpql = (
  designRequest: DesignFactoryDesignRequest,
): NexusGenObjects['DesignRequest'] => {
  return {
    ...designRequest,
    useCase: designRequest.metadata?.useCase,
    fileIds: designRequest.files.map(file => file.fileId),
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
