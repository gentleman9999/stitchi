import { PrismaClient } from '@prisma/client'
import {
  DesignRequest,
  DesignRequestTable,
  table as makeDesignRequestTable,
} from '../db/design-request-table'
import * as yup from 'yup'
import { DesignFactoryDesignRequest, designRequestFactory } from '../factory'
import { makeEvents } from '../events'
import { DesignRequestFile } from '../db/design-request-file-table'

const inputSchema = DesignRequest.omit(['createdAt', 'updatedAt']).concat(
  yup
    .object()
    .shape({
      files: yup
        .array()
        .of(DesignRequestFile.omit(['id', 'designRequestId']).required())
        .required(),
    })
    .required(),
)

const prisma = new PrismaClient()

interface UpdateDesignRequestConfig {
  designRequestTable: DesignRequestTable
  designEvents: ReturnType<typeof makeEvents>
}

export interface UpdateDesignRequestFnInput {
  desingRequest: yup.InferType<typeof inputSchema>
}

type UpdateDesignRequestFn = (
  input: UpdateDesignRequestFnInput,
) => Promise<DesignFactoryDesignRequest>

type MakeUpdateDesignRequestFn = (
  config?: UpdateDesignRequestConfig,
) => UpdateDesignRequestFn

const makeUpdateDesignRequest: MakeUpdateDesignRequestFn =
  (
    { designRequestTable, designEvents } = {
      designRequestTable: makeDesignRequestTable(prisma),
      designEvents: makeEvents(),
    },
  ) =>
  async input => {
    const validInput = await inputSchema.validate(input.desingRequest)

    let existingDesignRequest

    try {
      existingDesignRequest = await designRequestTable.findFirst({
        where: {
          id: validInput.id,
        },
        include: {
          DesignRequestFiles: true,
        },
      })

      if (!existingDesignRequest) {
        throw new Error(`Design request not found: ${input}`)
      }
    } catch (error) {
      console.error(`Failed to find design request: ${input}`, {
        context: { error, input },
      })
      throw new Error('Failed to find design request')
    }

    let designRequest

    try {
      designRequest = await designRequestTable.update({
        where: {
          id: validInput.id,
        },
        data: {
          name: validInput.name,
          description: validInput.description,
          status: validInput.status,
          organizationId: validInput.organizationId,
          userId: validInput.userId,
          DesignRequestFiles: {
            create: validInput.files,
            delete: existingDesignRequest.DesignRequestFiles.map(({ id }) => ({
              id,
            })),
          },
        },
        include: {
          DesignRequestFiles: true,
        },
      })
    } catch (error) {
      console.error(`Failed to create design request: ${input}`, {
        context: { error, input },
      })
      throw new Error('Failed to create design request')
    }

    const prevDesignRequest = designRequestFactory({
      designRequest: existingDesignRequest,
      files: existingDesignRequest.DesignRequestFiles,
    })

    const nextDesignRequest = designRequestFactory({
      designRequest,
      files: designRequest.DesignRequestFiles,
    })

    designEvents.emit({
      type: 'designRequest.updated',
      payload: {
        nextDesignRequest,
        prevDesignRequest,
      },
    })

    return nextDesignRequest
  }

export default makeUpdateDesignRequest
