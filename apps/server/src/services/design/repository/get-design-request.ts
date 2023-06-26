import { PrismaClient } from '@prisma/client'
import { DesignRequestTable } from '../db/design-request-table'
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
      include: {
        designRequestFiles: true,
        designRequestArtists: true,
        designRequestDesignProofs: true,
        designLocations: {
          include: {
            designRequestDesignLocationFiles: true,
          },
        },
        designRequestRevisions: {
          include: {
            designRequestRevisionFiles: true,
          },
        },
      },
    })

    if (!designRequest) {
      throw new Error(`Design request not found: ${input}`)
    }

    return designRequestFactory({
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
    })
  }

export default makeGetDesignRequest
