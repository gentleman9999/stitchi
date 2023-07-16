import { gql, useQuery } from '@apollo/client'
import ClosetPageActions from '@components/common/ClosetPageActions'
import ClosetPageContainer from '@components/common/ClosetPageContainer'
import ClosetPageHeader from '@components/common/ClosetPageHeader'
import ClosetPageTitle from '@components/common/ClosetPageTitle'
import ClosetSection from '@components/common/ClosetSection'
import { InputGroup } from '@components/ui'
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/Card'
import {
  ClosetDesignShowPageGetDataQuery,
  ClosetDesignShowPageGetDataQueryVariables,
} from '@generated/ClosetDesignShowPageGetDataQuery'
import React from 'react'

interface Props {
  designId: string
}

const ClosetDesignShowPage = ({ designId }: Props) => {
  const { data, loading } = useQuery<
    ClosetDesignShowPageGetDataQuery,
    ClosetDesignShowPageGetDataQueryVariables
  >(GET_DATA, {
    variables: { designId },
  })

  const { design } = data || {}

  return (
    <ClosetPageContainer>
      <ClosetPageHeader>
        <ClosetPageTitle
          title={design?.name}
          actions={
            <ClosetPageActions
              actions={[
                {
                  label: 'Share',
                  onClick: () => {},
                },
              ]}
            />
          }
        />
      </ClosetPageHeader>

      <ClosetSection>
        <Card>
          <CardHeader>
            <CardTitle title="Overview" />
          </CardHeader>
          <CardContent>
            <InputGroup label="Description">
              <p>{design?.description}</p>
            </InputGroup>
          </CardContent>
        </Card>
      </ClosetSection>
    </ClosetPageContainer>
  )
}

const GET_DATA = gql`
  query ClosetDesignShowPageGetDataQuery($designId: ID!) {
    design: designV2(id: $designId) {
      id
      name
      description
    }
  }
`

export default ClosetDesignShowPage
