import { Prisma, PrismaClient } from '@prisma/client'
import { FileTable } from '../db/file'
import { fileFactory, FileFactoryFile } from '../factory'

const prisma = new PrismaClient()

interface ListFilesConfig {
  fileTable: FileTable
}

export interface ListFilesFnInput
  extends Omit<Prisma.FileFindManyArgs, 'include' | 'select'> {}

type ListFilesFn = (input: ListFilesFnInput) => Promise<FileFactoryFile[]>

type MakeListFilesFn = (config?: ListFilesConfig) => ListFilesFn

const makeListFiles: MakeListFilesFn =
  ({ fileTable } = { fileTable: prisma.file }) =>
  async input => {
    let fileRecords

    try {
      fileRecords = await fileTable.findMany({
        ...input,
      })
    } catch (error) {
      console.error(`Failed to get files`, {
        context: { error },
      })
      throw new Error('Failed to get files')
    }

    return fileRecords.map(file => fileFactory({ file }))
  }

export default makeListFiles