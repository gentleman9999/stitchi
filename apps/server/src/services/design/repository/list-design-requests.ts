import { Prisma, PrismaClient } from '@prisma/client'
import { DesignRequestTable } from '../db/design-request-table'
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
        include: {
          designRequestFiles: true,
          designLocations: {
            include: {
              designRequestDesignLocationFiles: true,
            },
          },
        },
      })
    } catch (error) {
      console.error(`Failed to get design requests`, {
        context: { error },
      })
      throw new Error('Failed to get design requests')
    }

    return designRequestRecords.map(designRequest =>
      designRequestFactory({
        designRequest,
        files: designRequest.designRequestFiles,
        designLocations: designRequest.designLocations,
        designLocationFiles: designRequest.designLocations.flatMap(
          designLocation => designLocation.designRequestDesignLocationFiles,
        ),
      }),
    )
  }

export default makeListDesignRequests
