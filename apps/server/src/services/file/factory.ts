import { FileRecord } from './db/file'

export interface FileFactoryFile extends FileRecord {}

const fileFactory = ({ file }: { file: FileRecord }): FileFactoryFile => {
  return { ...file }
}

export { fileFactory }
