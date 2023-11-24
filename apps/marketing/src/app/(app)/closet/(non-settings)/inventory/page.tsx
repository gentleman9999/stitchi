import ClosetPageHeader from '@components/common/ClosetPageHeader'
import ClosetPageTitle from '@components/common/ClosetPageTitle'
import OnboardingActionPanel from './OnboardingActionPanel'
import { Suspense } from 'react'

const Page = () => {
  return (
    <>
      <ClosetPageHeader>
        <ClosetPageTitle title="Inventory" description="" />
      </ClosetPageHeader>

      <Suspense fallback={null}>
        <OnboardingActionPanel />
      </Suspense>
    </>
  )
}

export default Page
