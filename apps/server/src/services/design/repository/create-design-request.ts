import { PrismaClient } from '@prisma/client'
import {
  DesignRequest,
  DesignRequestTable,
  table as makeDesignRequestTable,
} from '../db/design-request'
import * as yup from 'yup'
import { DesignFactoryDesignRequest, designRequestFactory } from '../factory'

const inputSchema = DesignRequest.omit(['id', 'createdAt', 'updatedAt'])

const prisma = new PrismaClient()

interface CreateDesignRequestConfig {
  designRequestTable: DesignRequestTable
}

export interface CreateDesignRequestFnInput {
  desingRequest: yup.InferType<typeof inputSchema>
}

type CreateDesignRequestFn = (
  input: CreateDesignRequestFnInput,
) => Promise<DesignFactoryDesignRequest>

type MakeCreateDesignRequestFn = (
  config?: CreateDesignRequestConfig,
) => CreateDesignRequestFn

const makeCreateDesignRequest: MakeCreateDesignRequestFn =
  (
    { designRequestTable } = {
      designRequestTable: makeDesignRequestTable(prisma),
    },
  ) =>
  async input => {
    const validInput = await inputSchema.validate(input.desingRequest)

    let designRequest

    try {
      designRequest = await designRequestTable.create({
        data: {
          userId: validInput.userId,
          organizationId: validInput.organizationId,
          name: validInput.name,
          description: validInput.description,
          status: validInput.status,
        },
      })
    } catch (error) {
      console.error(`Failed to create design request: ${input}`, {
        context: { error, input },
      })
      throw new Error('Failed to create design request')
    }

    return designRequestFactory({ designRequest })
  }

export default makeCreateDesignRequest
