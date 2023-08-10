import ClosetPageContainer from '@components/common/ClosetPageContainer'
import ClosetPageHeader from '@components/common/ClosetPageHeader'
import ClosetPageTitle from '@components/common/ClosetPageTitle'
import React from 'react'

interface Props {}

const ClosetHomePage = ({}: Props) => {
  return (
    <ClosetPageContainer>
      <ClosetPageHeader>
        <ClosetPageTitle title="Closet" />
      </ClosetPageHeader>

      <div className="grid grid-cols-1 sm:grid-cols-12 sm:gap-8">
        <div className="sm:col-span-8"></div>
      </div>
    </ClosetPageContainer>
  )
}

export default ClosetHomePage
