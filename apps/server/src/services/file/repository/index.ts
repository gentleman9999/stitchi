import makeCreateFile from './create-file'
import makeListFiles from './list-files'

export interface FileRepositoryInit {}

export interface FileRepository {
  createFile: ReturnType<typeof makeCreateFile>
  listFiles: ReturnType<typeof makeListFiles>
}

type MakeFileRepositoryFn = (init?: FileRepositoryInit) => FileRepository

const makeFileRepository: MakeFileRepositoryFn = init => ({
  createFile: makeCreateFile(),
  listFiles: makeListFiles(),
})

export default makeFileRepository
