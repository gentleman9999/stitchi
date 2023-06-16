import { gql, useQuery } from '@apollo/client'
import { Section } from '@components/common'
import ClosetPageTitle from '@components/common/ClosetPageTitle'
import { Container } from '@components/ui'
import React from 'react'
import {
  ClosetDesignShowPageGetDataQuery,
  ClosetDesignShowPageGetDataQueryVariables,
} from '@generated/ClosetDesignShowPageGetDataQuery'
import ProgressBar from './ProgressBar'
import DesignRequestEditableName from './DesignRequestEditableName/DesignRequestEditableName'
import DesignRequestDraftForm from './DesignRequestDraftForm/DesignRequestDraftForm'
import { DesignRequestStatus } from '@generated/globalTypes'

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
    <Container>
      <ClosetPageTitle
        title={
          <DesignRequestEditableName
            name={designRequest?.name}
            loading={loading}
            designRequestId={designId}
          />
        }
      />
      <Section>
        <ProgressBar step={0} />
      </Section>
      <Section gutter="sm">
        {designRequest?.status === DesignRequestStatus.DRAFT ? (
          <DesignRequestDraftForm />
        ) : null}
      </Section>
    </Container>
  )
}

const GET_DATA = gql`
  query ClosetDesignShowPageGetDataQuery($designId: ID!) {
    designRequest(id: $designId) {
      id
      name
      status
    }
  }
`

export default ClosetDesignShowPage
