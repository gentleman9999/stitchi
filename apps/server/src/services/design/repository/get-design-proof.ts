import { PrismaClient } from '@prisma/client'
import { DesignProofTable } from '../db/design-proof-table'
import { DesignFactoryProof, designProofFactory } from '../factory'

const primsa = new PrismaClient()

interface GetDesignProofConfig {
  designProofTable: DesignProofTable
}

export interface GetDesignProofFnInput {
  designProofId: string
}

type GetDesignProofFn = (
  input: GetDesignProofFnInput,
) => Promise<DesignFactoryProof>

type MakeGetDesignProofFn = (config?: GetDesignProofConfig) => GetDesignProofFn

const makeGetDesignProof: MakeGetDesignProofFn =
  ({ designProofTable } = { designProofTable: primsa.designProof }) =>
  async input => {
    const designProof = await designProofTable.findFirst({
      where: {
        id: input.designProofId,
      },
      include: {
        designProofLocations: true,
        designProofVariants: {
          include: {
            images: {
              orderBy: {
                order: 'asc',
              },
            },
          },
        },
      },
    })

    if (!designProof) {
      throw new Error(`Design proof not found: ${input}`)
    }

    return designProofFactory({
      designProof,
      locations: designProof.designProofLocations,
      variants: designProof.designProofVariants,
    })
  }

export default makeGetDesignProof
