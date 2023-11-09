import ClosetSection from '@components/common/ClosetSection'
import ClosetSectionHeader from '@components/common/ClosetSectionHeader'
import ClosetSectionTitle from '@components/common/ClosetSectionTitle'
import React from 'react'

interface Props {
  approved: React.ReactNode
  inProgress: React.ReactNode
  collections: React.ReactNode
  recent: React.ReactNode
}

const Layout = ({ approved, inProgress }: Props) => {
  return (
    <>
      <ClosetSection>
        <ClosetSectionHeader>
          <ClosetSectionTitle title="In-Progress" />
        </ClosetSectionHeader>

        {inProgress}
      </ClosetSection>

      <ClosetSection>
        <ClosetSectionHeader>
          <ClosetSectionTitle title="Approved" />
        </ClosetSectionHeader>

        {approved}
      </ClosetSection>
    </>
  )
}

export default Layout
