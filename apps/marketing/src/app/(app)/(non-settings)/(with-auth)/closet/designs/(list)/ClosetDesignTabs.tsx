'use client'

import ClosetSection from '@components/common/ClosetSection'
import routes from '@lib/routes'
import { useSearchParams } from 'next/navigation'
import React from 'react'

interface Props {
  children: React.ReactNode
}

const ClosetDesignTabs = ({ children }: Props) => {
  const searchParams = useSearchParams()!

  const query = Object.fromEntries(searchParams.entries())

  return (
    <ClosetSection
      tabs={[
        {
          id: 'designs',
          label: 'All',
          href: routes.internal.closet.designs.href(query),
        },
        // {
        //   id: 'collections',
        //   label: 'Collections',
        //   href: routes.internal.closet.collections.href(router.query),
        // },

        {
          id: 'design-requests',
          label: 'In-Progress',
          href: routes.internal.closet.designs.inProgress.href(query),
        },
        {
          id: 'approved-designs',
          label: 'Approved',
          href: routes.internal.closet.designs.approved.href(query),
        },

        {
          id: 'archived-designs',
          label: 'Archived',
          href: routes.internal.closet.designs.archived.href(query),
        },
      ]}
    >
      {children}
    </ClosetSection>
  )
}

export default ClosetDesignTabs
