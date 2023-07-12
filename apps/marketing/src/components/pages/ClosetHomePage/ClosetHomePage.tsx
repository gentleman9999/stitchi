import { gql } from '@apollo/client'
import ClosetSection from '@components/common/ClosetSection'
import ClosetSectionHeader from '@components/common/ClosetSectionHeader'
import ClosetSectionHeaderTabs from '@components/common/ClosetSectionHeaderTabs'
import { Container } from '@components/ui'
import { ClosetHomePageDesignRequestFragment } from '@generated/ClosetHomePageDesignRequestFragment'
import routes from '@lib/routes'

import React from 'react'
import ClosetFilters from './ClosetFilters'
import ClosetTabAll from './ClosetTabAll/ClosetTabAll'

interface Props {
  designRequests: ClosetHomePageDesignRequestFragment[]
}

const ClosetHomePage = ({ designRequests }: Props) => {
  return (
    <>
      <Container>
        <ClosetFilters onChange={({ date }) => {}} />

        <ClosetSection
          tabs={[
            { id: 'all', label: 'All', href: routes.internal.closet.href() },
            { id: 'collections', label: 'Collections', href: '#' },
            { id: 'designs', label: 'Designs', href: '#' },
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
      </Container>
    </>
  )
}

ClosetHomePage.fragments = {
  designRequest: gql`
    ${ClosetTabAll.fragments.designRequest}
    fragment ClosetHomePageDesignRequestFragment on DesignRequest {
      id
      ...ClosetTabAllDesignRequestFragment
    }
  `,
}

export default ClosetHomePage
