'use client'

import getOrThrow from '@lib/utils/get-or-throw'
import mixpanel, { Mixpanel } from 'mixpanel-browser'
import React from 'react'

const NEXT_PUBLIC_MIXPANEL_PROJECT_TOKEN = getOrThrow(
  process.env.NEXT_PUBLIC_MIXPANEL_PROJECT_TOKEN,
  'NEXT_PUBLIC_MIXPANEL_PROJECT_TOKEN',
)

const mixpanelEnabled = process.env.NEXT_PUBLIC_MIXPANEL_ENABLED === 'true'

mixpanel.init(NEXT_PUBLIC_MIXPANEL_PROJECT_TOKEN)

if (!mixpanelEnabled) {
  mixpanel.disable()
}

const MixpanelContext = React.createContext<Mixpanel | undefined>(undefined)

interface MixpanelContextProps {
  children: React.ReactNode
}

const MixpanelProvider = ({ children }: MixpanelContextProps) => {
  return (
    <MixpanelContext.Provider value={mixpanel}>
      {children}
    </MixpanelContext.Provider>
  )
}

export const useMixpanel = () => {
  const context = React.useContext(MixpanelContext)
  if (context === undefined) {
    throw new Error('useMixpanel must be used within a MixpanelProvider')
  }
  return context
}

export default MixpanelProvider
