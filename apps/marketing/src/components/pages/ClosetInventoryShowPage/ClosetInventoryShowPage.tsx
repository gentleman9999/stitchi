import { gql, useQuery } from '@apollo/client'
import { StandoutType, useStandout } from '@components/context'
import Button from '@components/ui/ButtonV2/Button'
import { Dropdown, DropdownItem } from '@components/ui/Dropdown'

import {
  ClosetInventoryShowPageGetDataQuery,
  ClosetInventoryShowPageGetDataQueryVariables,
} from '@generated/ClosetInventoryShowPageGetDataQuery'
import { EllipsisHorizontalIcon } from '@heroicons/react/20/solid'
import routes from '@lib/routes'
import makeAbsoluteUrl from '@lib/utils/get-absolute-url'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import DesignOverview from './DesignOverview'
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/Card'

import ClosetPageContainer from '@components/common/ClosetPageContainer'
import ClosetPageHeader from '@components/common/ClosetPageHeader'
import ClosetPageTitle from '@components/common/ClosetPageTitle'

interface Props {
  designId: string
}

const ClosetInventoryShowPage = ({ designId }: Props) => {
  const router = useRouter()
  const { setStandout } = useStandout()

  const { data } = useQuery<
    ClosetInventoryShowPageGetDataQuery,
    ClosetInventoryShowPageGetDataQueryVariables
  >(GET_DATA, {
    variables: { designId },
  })

  const { designProduct: design } = data || {}

  return (
    <ClosetPageContainer>
      <ClosetPageHeader>
        <ClosetPageTitle title="" />
      </ClosetPageHeader>

      <Card>
        <CardHeader>
          <CardTitle title={design?.name} />
        </CardHeader>
        <CardContent>
          <DesignOverview designId={designId} />
        </CardContent>

        <CardContent>
          {design ? (
            <div className="flex gap-4 justify-between ">
              <Dropdown
                renderTrigger={() => (
                  <Button variant="ghost">
                    <EllipsisHorizontalIcon className="w-5 h-5" />
                  </Button>
                )}
                renderItems={() => [
                  <DropdownItem
                    key="design-request"
                    label="View design request"
                    href={routes.internal.closet.designs.show.href({
                      designId: design.designRequestId,
                    })}
                  />,
                ]}
              />

              <Button
                variant="ghost"
                onClick={() =>
                  setStandout({
                    type: StandoutType.ClosetLinkShare,
                    absoluteUrl: makeAbsoluteUrl(
                      routes.internal.closet.inventory.show.products.show.href({
                        designId,
                      }),
                    ),
                  })
                }
              >
                Share
              </Button>

              <Button
                Component={Link}
                variant="ghost"
                href={routes.internal.closet.inventory.show.products.show.buy.href(
                  {
                    designId: design.id,
                  },
                )}
              >
                Restock
              </Button>
            </div>
          ) : null}
        </CardContent>
      </Card>
    </ClosetPageContainer>
  )
}

const GET_DATA = gql`
  query ClosetInventoryShowPageGetDataQuery($designId: ID!) {
    designProduct(id: $designId) {
      id
      designRequestId
      name
    }
  }
`

export default ClosetInventoryShowPage
