import { gql, useQuery } from '@apollo/client'
import TableFilterDate from '@components/ui/Table/TableFilterDate'
import TableFilters from '@components/ui/Table/TableFilters'
import TableFilterUser from '@components/ui/Table/TableFilterUser'
import { ClosetDesignFiltersGetDataQuery } from '@generated/ClosetDesignFiltersGetDataQuery'
import { notEmpty } from '@lib/utils/typescript'
import React from 'react'
import { useCloset } from './closet-context'

interface Props {}

const ClosetDesignFilters = ({}: Props) => {
  const { filters, setDateFilter, setUserFilter } = useCloset()

  const { data } = useQuery<ClosetDesignFiltersGetDataQuery>(GET_DATA)

  const users =
    data?.viewer?.organization?.memberships
      ?.map(m => m?.user)
      .filter(notEmpty) || []

  const activeUser = users.find(u => u.id === filters.user)

  return (
    <TableFilters>
      <TableFilterUser
        label="Owner"
        value={activeUser?.name || null}
        users={users.map(u => ({
          id: u.id,
          name: u.name || 'Unknown',
          picture: u.picture,
        }))}
        onChange={u => {
          setUserFilter(u)
        }}
      />
      <TableFilterDate
        label="Date created"
        value={filters.date}
        onChange={d => {
          setDateFilter(d)
        }}
      />
    </TableFilters>
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

export default ClosetDesignFilters
