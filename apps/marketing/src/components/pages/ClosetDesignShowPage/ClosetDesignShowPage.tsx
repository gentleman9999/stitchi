import { gql, useQuery } from '@apollo/client'
import ClosetPageActions from '@components/common/ClosetPageActions'
import ClosetPageContainer from '@components/common/ClosetPageContainer'
import ClosetPageHeader from '@components/common/ClosetPageHeader'
import ClosetPageTitle from '@components/common/ClosetPageTitle'
import ClosetSection from '@components/common/ClosetSection'
import ClosetSectionHeader from '@components/common/ClosetSectionHeader'
import ClosetSectionHeaderTabs from '@components/common/ClosetSectionHeaderTabs'
import { InputGroup } from '@components/ui'
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/Card'
import {
  ClosetDesignShowPageGetDataQuery,
  ClosetDesignShowPageGetDataQueryVariables,
} from '@generated/ClosetDesignShowPageGetDataQuery'
import routes from '@lib/routes'
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

  const { designProduct: design } = data || {}

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
                {
                  label: 'Sell online',
                  onClick: () => {},
                },
                {
                  primary: true,
                  label: 'Place order',
                  href: routes.internal.closet.designs.show.buy.href({
                    designId,
                  }),
                },
              ]}
            />
          }
        />
      </ClosetPageHeader>

      <ClosetSection
        tabs={[
          {
            id: 'overview',
            href: routes.internal.closet.designs.show.href({
              designId: designId,
            }),
            label: 'Overview',
          },
          {
            id: 'orders',
            href: '#',
            label: 'Orders',
          },
        ]}
      >
        {({ activeTab }) => (
          <>
            <ClosetSectionHeader divider>
              <ClosetSectionHeaderTabs />
            </ClosetSectionHeader>

            {activeTab ? (
              <div className="max-w-6xl m-auto">
                {activeTab.id === 'overview' ? (
                  <>
                    <ClosetSection>
                      <Card>
                        <CardHeader>
                          <CardTitle title="Overview" />
                        </CardHeader>
                        <CardContent>
                          <div className="flex flex-col gap-6">
                            <InputGroup label="Description">
                              <p>{design?.description || '-'}</p>
                            </InputGroup>

                            <InputGroup label="Design request">
                              <p>link to design request</p>
                            </InputGroup>
                          </div>
                        </CardContent>
                      </Card>
                    </ClosetSection>

                    <ClosetSection>
                      <Card>
                        <CardHeader>
                          <CardTitle title="Inventory" />
                        </CardHeader>
                        <CardContent divide>
                          Need to create some inventory thinggy here
                        </CardContent>
                      </Card>
                    </ClosetSection>
                  </>
                ) : null}
              </div>
            ) : null}
          </>
        )}
      </ClosetSection>
    </ClosetPageContainer>
  )
}

const GET_DATA = gql`
  query ClosetDesignShowPageGetDataQuery($designId: ID!) {
    designProduct(id: $designId) {
      id
      name
      description
    }
  }
`

export default ClosetDesignShowPage
