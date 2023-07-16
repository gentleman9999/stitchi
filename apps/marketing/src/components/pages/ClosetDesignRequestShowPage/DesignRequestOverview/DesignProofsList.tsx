import { gql, useQuery } from '@apollo/client'
import { Badge } from '@components/ui'
import React from 'react'
import cx from 'classnames'
import {
  DesignProofsListGetDataQuery,
  DesignProofsListGetDataQueryVariables,
} from '@generated/DesignProofsListGetDataQuery'
import { format } from 'date-fns'

interface Props {
  designRequestId: string
  activeProofId: string | null
  onClick: (proofId: string) => void
}

const DesignProofsList = ({
  designRequestId,
  activeProofId,
  onClick,
}: Props) => {
  const { data } = useQuery<
    DesignProofsListGetDataQuery,
    DesignProofsListGetDataQueryVariables
  >(GET_DATA, {
    variables: { designRequestId },
  })

  const { designRequest } = data || {}

  React.useEffect(() => {
    if (!activeProofId && designRequest?.proofs.length) {
      onClick(designRequest?.proofs[0].id)
    }
  }, [activeProofId, designRequest?.proofs, onClick])

  return (
    <ul className="flex flex-col gap-4">
      {designRequest?.proofs.map((proof, index) => (
        <li key={proof.id}>
          <button
            onClick={() => onClick(proof.id)}
            className={cx('border rounded-md p-2 w-full', {
              'border-primary outline-primary outline':
                activeProofId === proof.id,
            })}
          >
            <div className="flex gap-2">
              <img
                src={proof.primaryImageFile?.url}
                width={proof.primaryImageFile?.width}
                height={proof.primaryImageFile?.height}
                className="w-16 h-16 rounded-md object-contain"
              />
              <div className="flex-1 flex flex-col items-start gap-1">
                <span className="text-sm font-medium">
                  {format(new Date(proof.createdAt), 'PPpp')}
                </span>
                {index === 0 ? (
                  <div>
                    <Badge label="Latest" size="small" severity="info" />
                  </div>
                ) : null}
              </div>
            </div>
          </button>
        </li>
      ))}
    </ul>
  )
}

const GET_DATA = gql`
  query DesignProofsListGetDataQuery($designRequestId: ID!) {
    designRequest(id: $designRequestId) {
      id
      status
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
