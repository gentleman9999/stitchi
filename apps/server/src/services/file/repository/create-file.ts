import { PrismaClient } from '@prisma/client'
import { File, FileTable } from '../db/file'
import * as yup from 'yup'
import { fileFactory, FileFactoryFile } from '../factory'
import { logger } from '../../../telemetry'

const inputSchema = File.omit(['id', 'createdAt', 'updatedAt'])

const prisma = new PrismaClient()

interface CreateFileConfig {
  fileTable: FileTable
}

export interface CreateFileFnInput {
  file: yup.InferType<typeof inputSchema>
}

type CreateFileFn = (input: CreateFileFnInput) => Promise<FileFactoryFile>

type MakeCreateFileFn = (config?: CreateFileConfig) => CreateFileFn

const makeCreateFile: MakeCreateFileFn =
  ({ fileTable } = { fileTable: prisma.file }) =>
  async input => {
    const validInput = await inputSchema.validate(input.file)

    let file

    try {
      file = await fileTable.create({
        data: {
          membershipId: validInput.membershipId,
          organizationId: validInput.organizationId,
          fileType: validInput.fileType,
          name: validInput.name,
          originalFilename: validInput.originalFilename,
          url: validInput.url,
          cloudinaryAssetId: validInput.cloudinaryAssetId,
          format: validInput.format,
          height: validInput.height,
          width: validInput.width,
          bytes: validInput.bytes,
        },
      })
    } catch (error) {
      logger
        .child({
          context: { error, input },
        })
        .error(`Failed to create file: ${input}`)
      throw new Error('Failed to create file')
    }

    return fileFactory({ file })
  }

export default makeCreateFile
