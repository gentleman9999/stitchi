import { gql, useQuery } from '@apollo/client'
import React, { ButtonHTMLAttributes } from 'react'
import cx from 'classnames'

import { format } from 'date-fns'
import { Card, CardContent, CardHeader } from '@components/ui/Card'
import { ScopeAction, ScopeResource } from '@generated/globalTypes'
import { useAuthorizedComponent } from '@lib/auth'
import Button from '@components/ui/ButtonV2/Button'
import ClosetSection from '@components/common/ClosetSection'
import Badge from '@components/ui/Badge'
import { Dropdown } from '@components/ui/Dropdown'
import {
  DesignProofsListGetDataQuery,
  DesignProofsListGetDataQueryVariables,
} from '@generated/types'
import IconButton from '@components/ui/IconButton'
import { ChevronUpDownIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'
import routes from '@lib/routes'

interface Props {
  designRequestId: string
  activeProofId: string | null
  onClick: (proofId: string) => void
  loading?: boolean
}

const DesignProofsList = ({
  designRequestId,
  activeProofId,
  onClick,
  loading,
}: Props) => {
  const { can, loading: authorizationLoading } = useAuthorizedComponent()

  const { data } = useQuery<
    DesignProofsListGetDataQuery,
    DesignProofsListGetDataQueryVariables
  >(GET_DATA, {
    variables: { designRequestId },
  })

  const { designRequest } = data || {}

  const { approvedProof, proofs } = designRequest || {}

  React.useEffect(() => {
    if (!activeProofId && designRequest?.proofs.length) {
      onClick(designRequest?.proofs[0].id)
    }
  }, [activeProofId, designRequest?.proofs, onClick])

  if (!approvedProof && !proofs?.length) {
    return null
  }

  if (approvedProof) {
    return (
      <ClosetSection>
        <Card>
          <CardHeader>Approved proof</CardHeader>
          <CardContent divide>
            <div className="flex gap-2">
              <img
                src={approvedProof.primaryImageFile?.url}
                width={approvedProof.primaryImageFile?.width}
                height={approvedProof.primaryImageFile?.height}
                className="w-16 h-16 rounded-sm object-contain"
              />
              <div className="flex-1 flex flex-col items-start gap-1">
                <span className="text-sm font-medium">
                  {format(new Date(approvedProof.createdAt), 'PPpp')}
                </span>
                <div>
                  <Badge label="Approved" size="small" severity="success" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </ClosetSection>
    )
  }

  const activeProof = proofs?.find(proof => proof.id === activeProofId)
  const latestProofId = proofs?.[0]?.id

  return (
    <ClosetSection>
      <Card>
        <CardContent>
          {activeProof && proofs?.length ? (
            <div className="relative z-10">
              <Dropdown
                side="bottom"
                align="center"
                renderTrigger={() => (
                  <button className="border rounded-sm w-full flex justify-between gap-2 items-center hover:bg-gray-50">
                    <Proof
                      key="active"
                      proof={activeProof}
                      latest={activeProof.id === latestProofId}
                    />

                    <ChevronUpDownIcon className="w-5 h-5 mr-2" />
                  </button>
                )}
                renderItems={() =>
                  proofs.map((proof, index) => (
                    <button
                      key={proof.id}
                      onClick={() => onClick(proof.id)}
                      className={cx(
                        'hover:bg-gray-100 transition-all w-full rounded-sm',
                        {
                          'bg-gray-50': proof.id === activeProofId,
                        },
                      )}
                    >
                      <Proof
                        proof={proof}
                        latest={proof.id === latestProofId}
                        onClick={() => onClick(proof.id)}
                      />
                    </button>
                  ))
                }
              />
            </div>
          ) : null}
        </CardContent>

        {activeProofId &&
        !authorizationLoading &&
        can(ScopeResource.DesignProduct, ScopeAction.CREATE) ? (
          <CardContent divide>
            <Button
              Component={Link}
              className="w-full"
              color="brandPrimary"
              size="lg"
              loading={loading}
              href={routes.internal.closet.designs.show.proofs.show.approve.href(
                {
                  designId: designRequestId,
                  proofId: activeProofId,
                },
              )}
            >
              Approve selected proof
            </Button>
          </CardContent>
        ) : null}
      </Card>
    </ClosetSection>
  )
}

interface ProofProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  proof: NonNullable<
    DesignProofsListGetDataQuery['designRequest']
  >['proofs'][number]
  latest?: boolean
}

const Proof = ({ proof, latest }: ProofProps) => {
  return (
    <div className="flex items-center gap-2 p-2">
      <img
        src={proof.primaryImageFile?.url}
        width={proof.primaryImageFile?.width}
        height={proof.primaryImageFile?.height}
        className="w-16 h-16 rounded-sm object-contain"
      />
      <div className="flex-1 flex flex-col items-start gap-1">
        <span className="text-sm font-medium">
          {format(new Date(proof.createdAt), 'PPpp')}
        </span>
        {latest ? (
          <div>
            <Badge label="Latest" size="small" severity="info" />
          </div>
        ) : null}
      </div>
    </div>
  )
}

const GET_DATA = gql`
  query DesignProofsListGetDataQuery($designRequestId: ID!) {
    designRequest(id: $designRequestId) {
      id
      status
      approvedProof {
        id
        createdAt
        primaryImageFile {
          id
          url
          width
          height
        }
      }
      proofs {
        id
        createdAt
        primaryImageFile {
          id
          url
          width
          height
        }
      }
    }
  }
`

export default DesignProofsList
