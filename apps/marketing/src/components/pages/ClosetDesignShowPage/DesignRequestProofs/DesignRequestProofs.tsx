import { gql } from '@apollo/client'
import { Badge } from '@components/ui'
import { DesignRequestProofDesignRequestFragment } from '@generated/DesignRequestProofDesignRequestFragment'
import { format } from 'date-fns'
import React from 'react'

interface Props {
  designRequest: DesignRequestProofDesignRequestFragment
}

const DesignRequestProofs = ({ designRequest }: Props) => {
  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {designRequest.proofs.map((proof, index) => (
        <div
          key={proof.id}
          className="border rounded-md shadow-magical flex flex-col"
        >
          <div className="p-4 flex-1">
            <div className="w-full aspect-square bg-gray-50 rounded-md" />
            <div className="text-sm text-gray-500 text-center mt-2">
              <div>{format(new Date(proof.createdAt), 'PPP')}</div>
              <div>{proof.artist?.name}</div>
              {index === 0 ? (
                <div className="mt-3">
                  <Badge label="Latest" severity="default" />{' '}
                </div>
              ) : null}
            </div>
          </div>
          <div className="border-t text-lg font-semibold">
            <button className="text-center p-3 w-full">View</button>
          </div>
        </div>
      ))}
    </div>
  )
}

DesignRequestProofs.fragments = {
  designRequest: gql`
    fragment DesignRequestProofDesignRequestFragment on DesignRequest {
      id
      proofs {
        id
        artistNote
        createdAt
        artist {
          id
          name
        }
      }
    }
  `,
}

export default DesignRequestProofs
