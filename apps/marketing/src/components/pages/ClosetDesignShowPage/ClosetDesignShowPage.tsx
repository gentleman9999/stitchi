import { gql, useQuery } from '@apollo/client'
import ClosetPageActions from '@components/common/ClosetPageActions'
import ClosetPageContainer from '@components/common/ClosetPageContainer'
import ClosetPageHeader from '@components/common/ClosetPageHeader'
import ClosetPageTitle from '@components/common/ClosetPageTitle'
import ClosetSection from '@components/common/ClosetSection'
import ClosetSectionHeader from '@components/common/ClosetSectionHeader'
import { StandoutType, useStandout } from '@components/context'
import {
  ClosetDesignShowPageGetDataQuery,
  ClosetDesignShowPageGetDataQueryVariables,
} from '@generated/ClosetDesignShowPageGetDataQuery'
import routes from '@lib/routes'
import makeAbsoluteUrl from '@lib/utils/get-absolute-url'
import React from 'react'
import DesignOverview from './DesignOverview'

interface Props {
  designId: string
}

const ClosetDesignShowPage = ({ designId }: Props) => {
  const { setStandout } = useStandout()

  const { data } = useQuery<
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
                  onClick: () =>
                    setStandout({
                      type: StandoutType.ClosetLinkShare,
                      absoluteUrl: makeAbsoluteUrl(
                        routes.internal.closet.inventory.show.products.show.href(
                          {
                            designId,
                          },
                        ),
                      ),
                    }),
                },

                {
                  primary: true,
                  label: 'Restock',
                  href: routes.internal.closet.inventory.show.products.show.buy.href(
                    {
                      designId,
                    },
                  ),
                },
              ]}
            />
          }
        />
      </ClosetPageHeader>

      <ClosetSection>
        <>
          <ClosetSectionHeader divider></ClosetSectionHeader>

          <div className="max-w-6xl m-auto">
            <DesignOverview designId={designId} />
          </div>
        </>
      </ClosetSection>
    </ClosetPageContainer>
  )
}

const GET_DATA = gql`
  query ClosetDesignShowPageGetDataQuery($designId: ID!) {
    designProduct(id: $designId) {
      id
      name
    }
  }
`

export default ClosetDesignShowPage
