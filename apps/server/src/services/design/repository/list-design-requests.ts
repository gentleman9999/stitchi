import { Prisma, PrismaClient } from '@prisma/client'
import { logger } from '../../../telemetry'
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
          designRequestArtists: true,
          designRequestDesignProofs: true,
          designRequestRevisions: {
            include: {
              designRequestRevisionFiles: true,
            },
          },
          designLocations: {
            include: {
              designRequestDesignLocationFiles: true,
            },
          },
          designRequestProduct: {
            include: {
              designRequestProductColors: true,
            },
          },
        },
      })
    } catch (error) {
      logger
        .child({
          context: { error },
        })
        .error(`Failed to get design requests`)
      throw new Error('Failed to get design requests')
    }

    return designRequestRecords.map(designRequest =>
      designRequestFactory({
        designRequest,
        artists: designRequest.designRequestArtists,
        files: designRequest.designRequestFiles,
        proofs: designRequest.designRequestDesignProofs,
        designLocations: designRequest.designLocations.map(location => ({
          ...location,
          files: location.designRequestDesignLocationFiles,
        })),
        revisions: designRequest.designRequestRevisions.map(revision => ({
          ...revision,
          files: revision.designRequestRevisionFiles,
        })),
        product: {
          ...designRequest.designRequestProduct,
          colors: designRequest.designRequestProduct.designRequestProductColors,
        },
      }),
    )
  }

export default makeListDesignRequests
