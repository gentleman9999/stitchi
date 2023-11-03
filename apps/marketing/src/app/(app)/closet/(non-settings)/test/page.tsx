import ClosetPageHeader from '@components/common/ClosetPageHeader'
import ClosetPageTitle from '@components/common/ClosetPageTitle'
import Link from 'next/link'
import React from 'react'

const Page = () => {
  return (
    <>
      <ClosetPageHeader>
        <ClosetPageTitle title="Test page" />
      </ClosetPageHeader>

      <Link href="/closet/test/nested/super">Show panel</Link>
    </>
  )
}

export default Page
