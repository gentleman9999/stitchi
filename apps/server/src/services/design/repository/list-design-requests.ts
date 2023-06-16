import { Prisma, PrismaClient } from '@prisma/client'
import { DesignRequestTable } from '../db/design-request'
import { DesignFactoryDesignRequest, designRequestFactory } from '../factory'

const prisma = new PrismaClient()

interface ListDesignRequestsConfig {
  designRequestTable: DesignRequestTable
}

export interface ListDesignRequestsFnInput
  extends Omit<Prisma.DesignRequestFindManyArgs, 'include' | 'select'> {}

type ListDesignRequestsFn = (
  input: ListDesignRequestsFnInput,
) => Promise<DesignFactoryDesignRequest[]>

type MakeListDesignRequestsFn = (
  config?: ListDesignRequestsConfig,
) => ListDesignRequestsFn

const makeListDesignRequests: MakeListDesignRequestsFn =
  ({ designRequestTable } = { designRequestTable: prisma.designRequest }) =>
  async input => {
    let designRequestRecords

    try {
      designRequestRecords = await designRequestTable.findMany({
        ...input,
      })
    } catch (error) {
      console.error(`Failed to get design requests`, {
        context: { error },
      })
      throw new Error('Failed to get design requests')
    }

    return designRequestRecords.map(designRequest =>
      designRequestFactory({ designRequest }),
    )
  }

export default makeListDesignRequests
