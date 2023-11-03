import ClosetPageHeader from '@components/common/ClosetPageHeader'
import ClosetPageTitle from '@components/common/ClosetPageTitle'
import OnboardingActionPanel from './OnboardingActionPanel'

const Page = () => {
  return (
    <>
      <ClosetPageHeader>
        <ClosetPageTitle title="Inventory" description="" />
      </ClosetPageHeader>

      <OnboardingActionPanel />
    </>
  )
}

export default Page
