'use client'

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
import React from 'react'
import DesignOverview from './DesignOverview'
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/Card'

interface Props {
  designId: string
}

const ClosetInventoryShowPage = ({ designId }: Props) => {
  const { setStandout } = useStandout()

  const { data } = useQuery<
    ClosetInventoryShowPageGetDataQuery,
    ClosetInventoryShowPageGetDataQueryVariables
  >(GET_DATA, {
    variables: { designId },
  })

  const { designProduct: design } = data || {}

  return (
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
