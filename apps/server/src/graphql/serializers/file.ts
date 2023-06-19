import { NexusGenInterfaces } from '../generated/nexus'
import { FileFactoryFile } from '../../services/file/factory'

export const fileFactoryToGrahpql = (
  file: FileFactoryFile,
): NexusGenInterfaces['File'] => {
  return { ...file }
}
