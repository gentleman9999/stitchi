import { gql } from '@apollo/client'
import { Badge } from '@components/ui'
import {
  DesignProofDesignRequestFragment,
  DesignProofDesignRequestFragment_proofs_files_FileImage,
} from '@generated/DesignProofDesignRequestFragment'
import { format } from 'date-fns'
import React from 'react'

interface Props {
  designRequest: DesignProofDesignRequestFragment
}

const DesignProofs = ({ designRequest }: Props) => {
  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {designRequest.proofs.map((proof, index) => {
        const featuredImage =
          proof.files.find<DesignProofDesignRequestFragment_proofs_files_FileImage>(
            (
              file,
            ): file is DesignProofDesignRequestFragment_proofs_files_FileImage =>
              file.__typename === 'FileImage',
          )

        return (
          <div
            key={proof.id}
            className="border rounded-md shadow-magical flex flex-col"
          >
            <div className="p-4 flex-1">
              <img
                src={featuredImage?.url}
                width={featuredImage?.width}
                height={featuredImage?.height}
                alt="Featured"
                className="w-full aspect-square bg-gray-50 rounded-md object-contain"
              />
              <div className="text-sm text-gray-500 text-center mt-2">
                <div>{format(new Date(proof.createdAt), 'PPP')}</div>
                <div>Artist: {proof.artist?.name || '-'}</div>
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
        )
      })}
    </div>
  )
}

DesignProofs.fragments = {
  designRequest: gql`
    fragment DesignProofDesignRequestFragment on DesignRequest {
      id
      proofs {
        id
        createdAt
        note
        files {
          id

          ... on FileImage {
            url
            width
            height
          }
        }
        artist {
          id
          name
        }
      }
    }
  `,
}

export default DesignProofs
