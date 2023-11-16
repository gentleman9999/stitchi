import React from 'react'
import ActionPanel from '@components/ui/ActionPanel'
import ClosetSection from '@components/common/ClosetSection'
import { Customization } from 'icons'

interface Props {
  hide: boolean
  action: React.ReactNode
}

const OnboardingActionPanel = ({ hide, action }: Props) => {
  return (
    <ActionPanel
      hide={hide}
      title="Welcome to your design hub"
      description="Your designs are the creative blueprints for your products. Here you'll work with a designer to bring your ideas to life. Finished designs will be available in your inventory to send around the world."
      image={<Customization className="w-16 h-16" />}
      action={action}
      Container={ClosetSection}
    />
  )
}

export default OnboardingActionPanel
