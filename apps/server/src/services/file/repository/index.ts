import makeCreateFile from './create-file'
import makeGetFile from './get-file'
import makeListFiles from './list-files'

export interface FileRepositoryInit {}

export interface FileRepository {
  createFile: ReturnType<typeof makeCreateFile>
  listFiles: ReturnType<typeof makeListFiles>
  getFile: ReturnType<typeof makeGetFile>
}

type MakeFileRepositoryFn = (init?: FileRepositoryInit) => FileRepository

const makeFileRepository: MakeFileRepositoryFn = init => ({
  createFile: makeCreateFile(),
  listFiles: makeListFiles(),
  getFile: makeGetFile(),
})

export default makeFileRepository
