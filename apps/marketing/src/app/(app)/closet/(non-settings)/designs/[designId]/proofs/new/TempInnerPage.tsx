'use client'

import { gql, useQuery } from '@apollo/client'
import ClosetDesignProofCreatePage from '@components/pages/ClosetDesignProofCreatePage'
import {
  DesignRequestProofCreatePageGetDataQuery,
  DesignRequestProofCreatePageGetDataQueryVariables,
} from '@generated/DesignRequestProofCreatePageGetDataQuery'

interface Props {
  designId: string
}

const TempInnerPage = ({ designId }: Props) => {
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

export default TempInnerPage
