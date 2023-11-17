'use client'

import useUserOnboarding from '@components/hooks/useUserOnboarding'
import React from 'react'
import OnboardingActionPanel from './OnboardingActionPanel'
import Button from '@components/ui/ButtonV2/Button'

const OnboardingActionPanelContainer = () => {
  const { onboarding, update, updating } = useUserOnboarding()

  const handleClick = () => {
    update({
      seenDesignIndexPageOnboardingBanner: true,
    })
  }

  return (
    <OnboardingActionPanel
      hide={Boolean(onboarding?.seenDesignIndexPageOnboardingBanner)}
      action={
        <Button
          variant="ghost"
          size="xl"
          onClick={handleClick}
          loading={updating}
        >
          Got it
        </Button>
      }
    />
  )
}

export default OnboardingActionPanelContainer
