import { gql, useQuery } from '@apollo/client'
import ClosetSection from '@components/common/ClosetSection'
import ClosetSectionHeader from '@components/common/ClosetSectionHeader'
import ClosetSectionTitle from '@components/common/ClosetSectionTitle'
import Button from '@components/ui/ButtonV2'
import { Card, CardContent } from '@components/ui/Card'
import {
  DesignRequestFeaturedProofGetDataQuery,
  DesignRequestFeaturedProofGetDataQueryVariables,
} from '@generated/DesignRequestFeaturedProofGetDataQuery'
import routes from '@lib/routes'
import Link from 'next/link'
import React from 'react'
import Skeleton from 'react-loading-skeleton'

const PREVIEW_LIMIT = 3

interface Props {
  designRequestId: string
}

const DesignRequestFeaturedProof = ({ designRequestId }: Props) => {
  const { data, loading } = useQuery<
    DesignRequestFeaturedProofGetDataQuery,
    DesignRequestFeaturedProofGetDataQueryVariables
  >(GET_DATA, {
    variables: { designRequestId },
  })

  const latestProof = data?.designRequest?.latestProofs[0]

  if (!loading && !latestProof) {
    return null
  }

  return (
    <ClosetSection loading={loading}>
      <ClosetSectionHeader>
        <ClosetSectionTitle
          title="Latest Proof"
          actions={
            latestProof ? (
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  Component={Link}
                  href={routes.internal.closet.designRequests.show.proofs.show.href(
                    {
                      designId: designRequestId,
                      proofId: latestProof.id,
                    },
                  )}
                >
                  Preview
                </Button>
                <Button
                  variant="ghost"
                  Component={Link}
                  href={routes.internal.closet.designRequests.show.proofs.show.href(
                    {
                      designId: designRequestId,
                      proofId: latestProof.id,
                    },
                  )}
                >
                  Approve
                </Button>
              </div>
            ) : null
          }
        />
      </ClosetSectionHeader>
      <Card>
        <CardContent>
          <div className="flex items-center gap-6 overflow-scroll">
            {loading ? (
              <>
                {Array.from({ length: PREVIEW_LIMIT }).map((_, i) => (
                  <div
                    key={i}
                    className="shrink-0 h-64 w-64 rounded-md overflow-hidden"
                  >
                    <Skeleton height="100%" width="100%" />
                  </div>
                ))}
              </>
            ) : (
              <>
                {latestProof?.primaryImageFile ? (
                  <img
                    key={latestProof.primaryImageFile.id}
                    src={latestProof.primaryImageFile.url}
                    alt={latestProof.primaryImageFile.name}
                    className="shrink-0 object-contain h-64 w-64 rounded-md overflow-hidden bg-gray-50"
                  />
                ) : null}
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </ClosetSection>
  )
}

const GET_DATA = gql`
  query DesignRequestFeaturedProofGetDataQuery($designRequestId: ID!) {
    designRequest(id: $designRequestId) {
      id
      latestProofs: proofs(limit: 1) {
        id
        primaryImageFile {
          id
          name
          url
          width
          height
        }
        artist {
          id
          name
          picture
        }
      }
    }
  }
`

export default DesignRequestFeaturedProof
