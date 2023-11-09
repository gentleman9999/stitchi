'use client'

import { gql, useSuspenseQuery } from '@apollo/client'
import { TableFilterUser } from '@components/ui/Table'
import {
  ClosetDesignFiltersGetDataQuery,
  ClosetDesignFiltersGetDataQueryVariables,
} from '@generated/types'
import { notEmpty } from '@lib/utils/typescript'
import React from 'react'
import { useCloset } from './closet-context'

const ClosetDesignFiltersUser = () => {
  const { filters, setUserFilter } = useCloset()

  const { data } = useSuspenseQuery<
    ClosetDesignFiltersGetDataQuery,
    ClosetDesignFiltersGetDataQueryVariables
  >(GET_DATA)

  const users =
    data.viewer?.organization?.memberships
      ?.map(m =>
        m?.user
          ? {
              ...m.user,
              membershipId: m.id,
            }
          : null,
      )
      .filter(notEmpty) || []

  const activeUser = users.find(u => u.membershipId === filters.user)

  return (
    <TableFilterUser
      label="Owner"
      value={activeUser?.name || null}
      users={users.map(u => ({
        id: u.id,
        name: u.name || 'Unknown',
        picture: u.picture,
        membershipId: u.membershipId,
      }))}
      onChange={u => {
        setUserFilter(u)
      }}
    />
  )
}

const GET_DATA = gql`
  query ClosetDesignFiltersGetDataQuery {
    viewer {
      id
      organization {
        id
        memberships {
          id
          user {
            id
            name
            picture
          }
        }
      }
    }
  }
`

export default ClosetDesignFiltersUser
