import { gql } from '@apollo/client'
import { Card } from '@components/ui/Card'
import {
  DesignProofCardDesignProofFragment,
  DesignProofCardDesignProofFragment_files_FileImage,
} from '@generated/DesignProofCardDesignProofFragment'
import routes from '@lib/routes'
import { format } from 'date-fns'
import Link from 'next/link'
import React from 'react'

interface Props {
  designProof: DesignProofCardDesignProofFragment
  badges?: React.ReactNode
  href?: string
}

const DesignProofCard = ({ designProof, badges, href }: Props) => {
  const featuredImage = designProof.files.find(
    (file): file is DesignProofCardDesignProofFragment_files_FileImage =>
      file.__typename === 'FileImage',
  )

  return (
    <Card className="!pb-0">
      <div className="p-4 flex-1">
        <img
          src={featuredImage?.url}
          width={featuredImage?.width}
          height={featuredImage?.height}
          alt="Featured"
          className="w-full aspect-square bg-gray-50 rounded-md object-contain"
        />
        <div className="text-sm text-gray-500 text-center mt-2">
          <div>{format(new Date(designProof.createdAt), 'PPP')}</div>
          <div>Artist: {designProof.artist?.name || '-'}</div>
          {badges ? <div className="mt-3">{badges}</div> : null}
        </div>
      </div>
      {href ? (
        <div className="border-t text-lg font-semibold">
          <Link href={href} className="block text-center p-3 w-full">
            View
          </Link>
        </div>
      ) : null}
    </Card>
  )
}

DesignProofCard.fragments = {
  designProof: gql`
    fragment DesignProofCardDesignProofFragment on DesignProof {
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
  `,
}

export default DesignProofCard
