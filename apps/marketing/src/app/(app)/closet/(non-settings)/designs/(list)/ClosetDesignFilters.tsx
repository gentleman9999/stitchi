import TableFilters from '@components/ui/Table/TableFilters'
import React from 'react'
import { ScopeAction, ScopeResource } from '@generated/types'
import ClosetDesignFiltersUser from './ClosetDesignFiltersUser'
import ClosetDesignFiltersCreatedAt from './ClosetDesignFiltersCreatedAt'
import { getUserAuthorization } from '@lib/auth-rsc'

interface Props {}

const ClosetDesignFilters = async ({}: Props) => {
  const { can } = await getUserAuthorization()

  const showUserFilter = can([
    { resource: ScopeResource.DesignRequest, action: ScopeAction.READ },
  ])

  return (
    <TableFilters disableGutters>
      {showUserFilter ? <ClosetDesignFiltersUser /> : null}

      {/* <TableFilterUser
        label="Organization"
        value={null}
        users={[]}
        onChange={() => {}}
      />

      <TableFilterUser
        label="Designer"
        value={null}
        users={[]}
        onChange={() => {}}
      /> */}

      <ClosetDesignFiltersCreatedAt />
    </TableFilters>
  )
}

export default ClosetDesignFilters
