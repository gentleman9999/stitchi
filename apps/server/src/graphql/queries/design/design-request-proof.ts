import { extendType } from 'nexus'
import { NexusGenObjects } from '../../generated/nexus'
import * as uuid from 'uuid'

export const DesignRequestProofExtendsDesignRequest = extendType({
  type: 'DesignRequest',
  definition(t) {
    t.nonNull.list.nonNull.field('proofs', {
      type: 'DesignRequestProof',
      resolve: async (parent, _args, ctx) => {
        const makeProof = (): NexusGenObjects['DesignRequestProof'] => ({
          id: uuid.v4(),
          artistUserId: parent.userId || '',
          designRequestId: parent.id,
          fileIds: [],
          artistNote: 'This is a note from the artist',
          createdAt: new Date(),
        })

        return [makeProof(), makeProof()]
      },
    })
  },
})
