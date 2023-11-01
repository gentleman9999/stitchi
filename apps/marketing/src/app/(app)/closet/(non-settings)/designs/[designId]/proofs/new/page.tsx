'use client'

import { gql, useQuery } from '@apollo/client'
import ClosetDesignProofCreatePage from '@components/pages/ClosetDesignProofCreatePage'
import {
  DesignRequestProofCreatePageGetDataQuery,
  DesignRequestProofCreatePageGetDataQueryVariables,
} from '@generated/DesignRequestProofCreatePageGetDataQuery'
import { ScopeAction, ScopeResource } from '@generated/globalTypes'
import { withAuthorization } from '@lib/auth'
import { useParams } from 'next/navigation'

const Page = () => {
  const { designId } = useParams<{ designId: string }>() || {}

  if (typeof designId !== 'string') {
    throw new Error('Invariant error: designId is required')
  }

  const { data } = useQuery<
    DesignRequestProofCreatePageGetDataQuery,
    DesignRequestProofCreatePageGetDataQueryVariables
  >(GET_DATA, {
    variables: { designId },
  })

  const { designRequest } = data || {}

  if (!designRequest) {
    return null
  }

  return <ClosetDesignProofCreatePage designRequest={designRequest} />
}

const GET_DATA = gql`
  ${ClosetDesignProofCreatePage.fragments.designRequest}
  query DesignRequestProofCreatePageGetDataQuery($designId: ID!) {
    designRequest(id: $designId) {
      id
      ...ClosetDesignProofCreatePageDesignRequestFragment
    }
  }
`

export default withAuthorization(Page, {
  action: ScopeAction.CREATE,
  resource: ScopeResource.DesignProof,
})
