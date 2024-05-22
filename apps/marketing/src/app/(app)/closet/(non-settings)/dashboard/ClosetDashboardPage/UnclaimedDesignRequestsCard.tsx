import { gql, useQuery } from '@apollo/client'
import { TableZeroState } from '@components/ui/Table'
import {
  UnclaimedDesignRequestsCardGetDataQuery,
  UnclaimedDesignRequestsCardGetDataQueryVariables,
} from '@generated/UnclaimedDesignRequestsCardGetDataQuery'
import { notEmpty } from '@lib/utils/typescript'
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/Card'
import Button from '@components/ui/ButtonV2/Button'
import Link from 'next/link'
import routes from '@lib/routes'
import { ArrowRightIcon } from '@heroicons/react/20/solid'

interface Props {}

const UnclaimedDesignRequestsCard = ({}: Props) => {
  const { data } = useQuery<
    UnclaimedDesignRequestsCardGetDataQuery,
    UnclaimedDesignRequestsCardGetDataQueryVariables
  >(GET_DATA, {
    fetchPolicy: 'cache-and-network',
    variables: {
      first: 10,
    },
  })

  const { viewer } = data || {}

  const unclaimed = viewer?.unassignedDesignRequests.edges
    ?.map(edge => edge?.node)
    .filter(notEmpty)

  return (
    <Card>
      <CardHeader>
        <CardTitle title="Design queue" />
      </CardHeader>
      <CardContent>
        {unclaimed?.length && viewer ? (
          <table className="w-full">
            <thead className="grid grid-cols-3 text-sm font-bold">
              <td className="col-span-1">Organization</td>
              <td className="col-span-1">Requester</td>
              <td className="col-auto"></td>
            </thead>
            <tbody className="divide-y">
              {unclaimed.map(request => (
                <tr key={request.id} className="grid grid-cols-3 py-1">
                  <td className="text-xs font-medium col-span-1 flex items-center">
                    {request.membership?.organization.name}
                  </td>
                  <td className="text-xs font-medium col-span-1 flex items-center">
                    {request.membership?.user?.name}
                  </td>
                  <td className="col-auto  justify-end flex items-center">
                    <Button
                      variant="ghost"
                      size="xs"
                      Component={Link}
                      href={routes.internal.closet.designs.show.assign.href({
                        designId: request.id,
                        membershipId: viewer.id,
                      })}
                      endIcon={<ArrowRightIcon className="w-3 h-3" />}
                    >
                      Claim
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <TableZeroState />
        )}
      </CardContent>
    </Card>
  )
}

const GET_DATA = gql`
  query UnclaimedDesignRequestsCardGetDataQuery($first: Int, $after: String) {
    viewer {
      id
      unassignedDesignRequests(first: $first, after: $after) {
        edges {
          node {
            id
            name
            membership {
              id
              organization {
                id
                name
              }
              user {
                id
                name
              }
            }
          }
        }
      }
    }
  }
`

export default UnclaimedDesignRequestsCard
