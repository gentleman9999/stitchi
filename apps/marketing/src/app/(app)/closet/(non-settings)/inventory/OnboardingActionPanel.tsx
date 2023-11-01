'use client'

import ClosetSection from '@components/common/ClosetSection'
import useUserOnboarding from '@components/hooks/useUserOnboarding'
import ActionPanel from '@components/ui/ActionPanel'
import Button from '@components/ui/ButtonV2/Button'
import React from 'react'
import { GlobalDistribution } from 'icons'

const OnboardingActionPanel = () => {
  const { loading, onboarding, update, updating } = useUserOnboarding()

  const handleClick = () => {
    update({
      seenInventoryIndexPageOnboardingBanner: true,
    })
  }

  return (
    <ActionPanel
      hide={Boolean(
        loading || onboarding?.seenInventoryIndexPageOnboardingBanner,
      )}
      title="All of your inventory in one place"
      description="Your inventory are all of the items stored with Stitchi. You can
      easily send items from your inventory anywhere, or use one of
      our integrations to auto-magically fulfill!"
      image={<GlobalDistribution className="w-16 h-16" />}
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
      Container={ClosetSection}
    />
  )
}

export default OnboardingActionPanel
