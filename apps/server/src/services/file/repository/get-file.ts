import { PrismaClient } from '@prisma/client'
import { FileTable } from '../db/file'
import { FileFactoryFile, fileFactory } from '../factory'

const primsa = new PrismaClient()

interface GetFileConfig {
  fileTable: FileTable
}

export interface GetFileFnInput {
  fileId: string
}

type GetFileFn = (input: GetFileFnInput) => Promise<FileFactoryFile>

type MakeGetFileFn = (config?: GetFileConfig) => GetFileFn

const makeGetFile: MakeGetFileFn =
  ({ fileTable } = { fileTable: primsa.file }) =>
  async input => {
    const file = await fileTable.findFirst({
      where: { id: input.fileId },
    })

    if (!file) {
      throw new Error(`Design proof not found: ${input}`)
    }

    return fileFactory({ file })
  }

export default makeGetFile
