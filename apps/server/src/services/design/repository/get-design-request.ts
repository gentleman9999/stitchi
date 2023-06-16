import { PrismaClient } from '@prisma/client'
import { DesignRequestTable } from '../db/design-request'
import { DesignFactoryDesignRequest, designRequestFactory } from '../factory'

const primsa = new PrismaClient()

interface GetDesignRequestConfig {
  designRequestTable: DesignRequestTable
}

export interface GetDesignRequestFnInput {
  designRequestId: string
}

type GetDesignRequestFn = (
  input: GetDesignRequestFnInput,
) => Promise<DesignFactoryDesignRequest>

type MakeGetDesignRequestFn = (
  config?: GetDesignRequestConfig,
) => GetDesignRequestFn

const makeGetDesignRequest: MakeGetDesignRequestFn =
  ({ designRequestTable } = { designRequestTable: primsa.designRequest }) =>
  async input => {
    const designRequest = await designRequestTable.findFirst({
      where: {
        id: input.designRequestId,
      },
    })

    if (!designRequest) {
      throw new Error(`Design request not found: ${input}`)
    }

    return designRequestFactory({ designRequest })
  }

export default makeGetDesignRequest
