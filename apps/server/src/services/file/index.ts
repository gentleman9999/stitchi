import makeFileRepository, { FileRepository } from './repository'

export interface FileService {
  createFile: FileRepository['createFile']
  listFiles: FileRepository['listFiles']
  getFile: FileRepository['getFile']
}

interface MakeClientParams {
  fileRepository: FileRepository
}

type MakeClientFn = (params?: MakeClientParams) => FileService

const makeClient: MakeClientFn = (
  { fileRepository } = { fileRepository: makeFileRepository() },
) => {
  return {
    createFile: fileRepository.createFile,
    listFiles: fileRepository.listFiles,
    getFile: fileRepository.getFile,
  }
}

export { makeClient }
