import { Prisma, PrismaClient } from '@prisma/client'
import { DesignProofTable } from '../db/design-proof-table'
import { DesignFactoryProof, designProofFactory } from '../factory'

const prisma = new PrismaClient()

interface ListDesignProofsConfig {
  designProofTable: DesignProofTable
}

export interface ListDesignProofsFnInput
  extends Omit<Prisma.DesignProofFindManyArgs, 'include' | 'select'> {}

type ListDesignProofsFn = (
  input: ListDesignProofsFnInput,
) => Promise<DesignFactoryProof[]>

type MakeListDesignProofsFn = (
  config?: ListDesignProofsConfig,
) => ListDesignProofsFn

const makeListDesignProofs: MakeListDesignProofsFn =
  ({ designProofTable } = { designProofTable: prisma.designProof }) =>
  async input => {
    let designProofRecords

    try {
      designProofRecords = await designProofTable.findMany({
        ...input,
        include: {
          designProofFiles: true,
          designProofLocations: true,
        },
      })
    } catch (error) {
      console.error(`Failed to get design proofs`, {
        context: { error },
      })
      throw new Error('Failed to get design proofs')
    }

    return designProofRecords.map(designProof =>
      designProofFactory({
        designProof,
        files: designProof.designProofFiles,
        locations: designProof.designProofLocations,
      }),
    )
  }

export default makeListDesignProofs
