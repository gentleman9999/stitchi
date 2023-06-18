import { Section } from '@components/common'
import { Container } from '@components/ui'
import React from 'react'
import ProgressBar from './ProgressBar'
import DesignRequestDraft from './DesignRequestDraft'
import { DesignRequestStatus } from '@generated/globalTypes'
import DesignRequestSubmitted from './DesignRequestSubmitted'
import { DesignProvider } from './design-context'
import {
  ClosetDesignShowPageGetDataQuery,
  ClosetDesignShowPageGetDataQueryVariables,
} from '@generated/ClosetDesignShowPageGetDataQuery'
import { gql, useQuery } from '@apollo/client'
import DesignRequestHeader from './DesignRequestHeader'

interface Props {
  designId: string
}

const ClosetDesignShowPage = ({ designId }: Props) => {
  const { data, loading } = useQuery<
    ClosetDesignShowPageGetDataQuery,
    ClosetDesignShowPageGetDataQueryVariables
  >(GET_DATA, { variables: { designId } })

  const { designRequest } = data || {}

  return (
    <DesignProvider>
      <Container>
        <DesignRequestHeader loading={loading} designRequest={designRequest} />

        <Section>
          <ProgressBar status={designRequest?.status} />
        </Section>
        <Section gutter="md">
          {designRequest ? (
            <>
              {[DesignRequestStatus.DRAFT].includes(designRequest.status) ? (
                <DesignRequestDraft designRequest={designRequest} />
              ) : null}

              {[DesignRequestStatus.SUBMITTED].includes(
                designRequest.status,
              ) ? (
                <DesignRequestSubmitted designRequest={designRequest} />
              ) : null}
            </>
          ) : null}
        </Section>
      </Container>
    </DesignProvider>
  )
}

const GET_DATA = gql`
  ${DesignRequestHeader.fragments.designRequest}
  ${DesignRequestDraft.fragments.designRequest}
  ${DesignRequestSubmitted.fragments.designRequest}
  query ClosetDesignShowPageGetDataQuery($designId: ID!) {
    designRequest(id: $designId) {
      id
      name
      status
      description
      ...DesignRequestHeaderDesignRequesetFragment
      ...DesignRequestSubmittedDesignRequestFragment
      ...DesignRequestDraftDesignRequestFragments
    }
  }
`

export default ClosetDesignShowPage
