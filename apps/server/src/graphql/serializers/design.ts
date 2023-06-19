import { DesignFactoryDesignRequest } from '../../services/design/factory'
import { NexusGenObjects } from '../generated/nexus'

export const designRequestFactoryToGrahpql = (
  designRequest: DesignFactoryDesignRequest,
): NexusGenObjects['DesignRequest'] => {
  return {
    ...designRequest,
    fileIds: designRequest.files.map(file => file.fileId),
  }
}
