import React, { Suspense } from 'react'
import DesignOnboardingDialog from './DesignOnboardingDialog'
import DesignRequestOverview from './DesignRequestOverview'

interface Props {
  params: {
    designId: string
  }
}

const Page = ({ params }: Props) => {
  return (
    <>
      {/* <Suspense fallback={null}>
        <DesignOnboardingDialog />
      </Suspense> */}

      <DesignRequestOverview designRequestId={params.designId} />
    </>
  )
}

export default Page
