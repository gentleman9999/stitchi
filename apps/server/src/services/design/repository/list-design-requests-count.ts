import { Prisma, PrismaClient } from '@prisma/client'
import { logger } from '../../../telemetry'
import { DesignRequestTable } from '../db/design-request-table'

const prisma = new PrismaClient()

interface ListDesignRequestsCountConfig {
  designRequestTable: DesignRequestTable
}

export interface ListDesignRequestsCountFnInput
  extends Prisma.DesignRequestCountArgs {}

type ListDesignRequestsCountFn = (
  input: ListDesignRequestsCountFnInput,
) => Promise<number>

type MakeListDesignRequestsCountFn = (
  config?: ListDesignRequestsCountConfig,
) => ListDesignRequestsCountFn

const makeListDesignRequestsCount: MakeListDesignRequestsCountFn =
  (
    { designRequestTable } = {
      designRequestTable: prisma.designRequest,
    },
  ) =>
  async input => {
    let designRequestCount

    try {
      designRequestCount = await designRequestTable.count({
        ...input,
      })
    } catch (error) {
      logger
        .child({
          context: { error },
        })
        .error(`Failed to list design request count`)
      throw new Error('Failed to list design request count')
    }

    return designRequestCount
  }

export { makeListDesignRequestsCount }
