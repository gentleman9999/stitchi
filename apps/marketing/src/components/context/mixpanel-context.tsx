import getOrThrow from '@lib/utils/get-or-throw'
import mixpanel, { Mixpanel } from 'mixpanel-browser'
import { useLogger } from 'next-axiom'
import React from 'react'
import parse from 'url-parse'

const NEXT_PUBLIC_MIXPANEL_PROJECT_TOKEN = getOrThrow(
  process.env.NEXT_PUBLIC_MIXPANEL_PROJECT_TOKEN,
  'NEXT_PUBLIC_MIXPANEL_PROJECT_TOKEN',
)

const mixpanelEnabled = process.env.NEXT_PUBLIC_MIXPANEL_ENABLED === 'true'

mixpanel.init(NEXT_PUBLIC_MIXPANEL_PROJECT_TOKEN)

if (!mixpanelEnabled) {
  mixpanel.disable()
}

// Register super properties.
// https://help.mixpanel.com/hc/en-us/articles/115004561786-Track-UTM-Tags
function registerQueryParams(
  mp: Mixpanel,
  params: {
    [key: string]: string | undefined
  },
) {
  if (!params) {
    return
  }

  mp.register_once({
    utm_source: params['utm_source'],
    utm_medium: params['utm_medium'],
    utm_campaign: params['utm_campaign'],
    utm_content: params['utm_content'],
    utm_term: params['utm_term'],
  })
}

function registerUtmParams(mp: Mixpanel) {
  if (typeof window !== 'undefined') {
    registerQueryParams(mp, { query: parse(window.location.toString()).query })
  }
}

const MixpanelContext = React.createContext<Mixpanel | undefined>(undefined)

interface MixpanelContextProps {
  children: React.ReactNode
}

const MixpanelProvider = ({ children }: MixpanelContextProps) => {
  //   const { uuid, email } = useViewer()

  //   React.useEffect(() => {
  //     mixpanel.identify(uuid)

  //     if (uuid) {
  //       mixpanel.people.set({
  //         uuid,
  //         $email: email,
  //       })
  //     }
  //   }, [email, uuid])

  React.useEffect(() => {
    try {
      registerUtmParams(mixpanel)
    } catch (error) {
      console.error('Failed to register UTM parameters', { error })
    }
  }, [])

  return (
    <MixpanelContext.Provider value={mixpanel}>
      {children}
    </MixpanelContext.Provider>
  )
}

export default MixpanelProvider
