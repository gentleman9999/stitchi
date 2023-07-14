import { gql } from '@apollo/client'
import ClosetPageActions from '@components/common/ClosetPageActions'
import ClosetPageContainer from '@components/common/ClosetPageContainer'
import ClosetPageHeader from '@components/common/ClosetPageHeader'
import ClosetPageTitle from '@components/common/ClosetPageTitle'
import ClosetSection from '@components/common/ClosetSection'
import ClosetSectionHeader from '@components/common/ClosetSectionHeader'
import ClosetSectionHeaderTabs from '@components/common/ClosetSectionHeaderTabs'
import { ClosetDesignIndexPageDesignRequestFragment } from '@generated/ClosetDesignIndexPageDesignRequestFragment'
import routes from '@lib/routes'

import React from 'react'
import ClosetFilters from './ClosetFilters'
import ClosetTabAll from './ClosetTabAll/ClosetTabAll'

interface Props {
  designRequests: ClosetDesignIndexPageDesignRequestFragment[]
}

const ClosetDesignIndexPage = ({ designRequests }: Props) => {
  return (
    <ClosetPageContainer>
      <ClosetPageHeader>
        <ClosetPageTitle
          title="Designs"
          actions={
            <ClosetPageActions
              actions={[
                {
                  label: 'New Design',
                  href: routes.internal.closet.designRequests.create.href(),
                  primary: true,
                },
              ]}
            />
          }
        />
      </ClosetPageHeader>

      <ClosetFilters onChange={({ date }) => {}} />

      <ClosetSection
        tabs={[
          { id: 'all', label: 'All', href: routes.internal.closet.href() },
          { id: 'collections', label: 'Collections', href: '#' },
          { id: 'designs', label: 'Approved Designs', href: '#' },
          { id: 'designRequests', label: 'Design Requests', href: '#' },
        ]}
      >
        {({ activeTab }) => (
          <>
            <ClosetSectionHeader>
              <ClosetSectionHeaderTabs />
            </ClosetSectionHeader>

            {activeTab ? (
              <>
                {activeTab.id === 'all' ? (
                  <ClosetTabAll designRequests={designRequests} />
                ) : null}
              </>
            ) : null}
          </>
        )}
      </ClosetSection>
    </ClosetPageContainer>
  )
}

ClosetDesignIndexPage.fragments = {
  designRequest: gql`
    ${ClosetTabAll.fragments.designRequest}
    fragment ClosetDesignIndexPageDesignRequestFragment on DesignRequest {
      id
      ...ClosetTabAllDesignRequestFragment
    }
  `,
}

export default ClosetDesignIndexPage
