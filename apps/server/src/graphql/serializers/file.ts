import { NexusGenInterfaces, NexusGenObjects } from '../generated/nexus'
import { FileFactoryFile } from '../../services/file/factory'

export const fileFactoryToGrahpql = (
  file: FileFactoryFile,
): NexusGenInterfaces['File'] => {
  return { ...file }
}

export const fileFactoryToGrahpqlFileImage = (
  file: FileFactoryFile,
): NexusGenObjects['FileImage'] => {
  if (!file.width || !file.height) throw new Error('File is not an image')

  return {
    id: file.id,

    userId: file.userId,
    organizationId: file.organizationId,

    url: file.url,

    bytes: file.bytes,
    fileType: file.fileType,
    format: file.format,

    name: file.name,
    width: file.width,
    height: file.height,

    createdAt: file.createdAt,

    updatedAt: file.updatedAt,
  }
}
