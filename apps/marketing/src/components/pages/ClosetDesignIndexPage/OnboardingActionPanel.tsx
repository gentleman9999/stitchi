import React from 'react'
import ActionPanel from '@components/ui/ActionPanel'
import Button from '@components/ui/ButtonV2/Button'
import useUserOnboarding from '@components/hooks/useUserOnboarding'
import ClosetSection from '@components/common/ClosetSection'
import { Customization } from 'icons'

const OnboardingActionPanel = () => {
  const { loading, onboarding, update, updating } = useUserOnboarding()

  const handleClick = () => {
    update({
      seenDesignIndexPageOnboardingBanner: true,
    })
  }

  return (
    <ActionPanel
      hide={Boolean(loading || onboarding?.seenDesignIndexPageOnboardingBanner)}
      title="Welcome to your design hub"
      description="Your designs are the creative blueprints for your products. Here you'll work with a designer to bring your ideas to life. Finished designs will be available in your inventory to send around the world."
      image={<Customization className="w-16 h-16" />}
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
