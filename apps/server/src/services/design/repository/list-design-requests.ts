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
          designRequestArtists: true,
          designRequestDesignProofs: true,
          designRequestApprovedDesignProofs: true,
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
          designRequestProducts: {
            include: {
              designRequestProductColors: true,
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
        artists: designRequest.designRequestArtists,
        files: designRequest.designRequestFiles,
        proofs: designRequest.designRequestDesignProofs,
        approvedProofs: designRequest.designRequestApprovedDesignProofs,
        designLocations: designRequest.designLocations.map(location => ({
          ...location,
          files: location.designRequestDesignLocationFiles,
        })),
        revisions: designRequest.designRequestRevisions.map(revision => ({
          ...revision,
          files: revision.designRequestRevisionFiles,
        })),
        products: designRequest.designRequestProducts.map(product => ({
          ...product,
          colors: product.designRequestProductColors,
        })),
      }),
    )
  }

export default makeListDesignRequests
