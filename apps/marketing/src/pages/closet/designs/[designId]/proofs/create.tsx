import { gql, useQuery } from '@apollo/client'
import { ClosetLayout } from '@components/layout'
import ClosetDesignProofCreatePage from '@components/pages/ClosetDesignProofCreatePage'
import {
  DesignRequestProofCreatePageGetDataQuery,
  DesignRequestProofCreatePageGetDataQueryVariables,
} from '@generated/DesignRequestProofCreatePageGetDataQuery'
import { ScopeAction, ScopeResource } from '@generated/globalTypes'
import { withAuthentication, withAuthorization } from '@lib/auth'
import { useRouter } from 'next/router'

const Page = () => {
  const router = useRouter()

  const { designId } = router.query

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

Page.getLayout = (page: React.ReactElement) => (
  <ClosetLayout>{page}</ClosetLayout>
)

const GET_DATA = gql`
  ${ClosetDesignProofCreatePage.fragments.designRequest}
  query DesignRequestProofCreatePageGetDataQuery($designId: ID!) {
    designRequest(id: $designId) {
      id
      ...ClosetDesignProofCreatePageDesignRequestFragment
    }
  }
`

export default withAuthorization(withAuthentication(Page), {
  action: ScopeAction.CREATE,
  resource: ScopeResource.DesignProof,
})
