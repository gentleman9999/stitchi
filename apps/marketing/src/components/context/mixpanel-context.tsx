'use client'

import { gql, useLazyQuery, useQuery } from '@apollo/client'
import { useUser } from '@auth0/nextjs-auth0/client'
import { MixpanelProviderGetDataQuery } from '@generated/MixpanelProviderGetDataQuery'
import { MixpanelContextViewerFragment } from '@generated/types'

import events, { EventName } from '@lib/events'
import getOrThrow from '@lib/utils/get-or-throw'
import mixpanel, { Mixpanel } from 'mixpanel-browser'
import React from 'react'
import { useIntercom } from 'react-use-intercom'
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

const getUtmParams = (params: { [key: string]: string | undefined }) => {
  return {
    utm_source: params['utm_source'],
    utm_medium: params['utm_medium'],
    utm_campaign: params['utm_campaign'],
    utm_content: params['utm_content'],
    utm_term: params['utm_term'],
  }
}

// Register super properties.
// https://help.mixpanel.com/hc/en-us/articles/115004561786-Track-UTM-Tags
function registerUtmParams(mp: Mixpanel) {
  if (typeof window !== 'undefined') {
    mp.register_once(
      getUtmParams({ query: parse(window.location.toString()).query }),
    )
  }
}

const MixpanelContext = React.createContext<Mixpanel | undefined>(undefined)

interface MixpanelContextProps {
  viewer: MixpanelContextViewerFragment | null
  children: React.ReactNode
}

const MixpanelProvider = ({ children, viewer }: MixpanelContextProps) => {
  const { user } = useUser()

  const { update } = useIntercom()

  React.useEffect(() => {
    const identifyUser = async () => {
      if (viewer?.user) {
        mixpanel.identify(viewer.user.id)

        mixpanel.people.set({
          userId: viewer.user.id,
          membershipId: viewer.id,
          organizationId: viewer.organization.id,
          organizationName: viewer.organization.name,
          $email: viewer.user.email,
          $first_name: viewer.user.name?.split(' ')[0],
          $last_name: viewer.user.name?.split(' ')[1],
        })

        let params

        if (typeof window !== 'undefined') {
          params = getUtmParams({
            query: parse(window.location.toString()).query,
          })
        }

        events.track({
          event: EventName.INITIALIZE,
          user_id: viewer.user.id,
          user_properties: {
            organization_id: viewer.organization.id,
            organization_name: viewer.organization.name,
          },
        })

        update({
          userId: viewer.user.id,
          userHash: viewer.user.intercomUserHash || undefined,
          createdAt: viewer.user.createdAt,
          email: viewer.user.email || undefined,
          name: viewer.user.name || undefined,
          phone: viewer.user.phoneNumber || undefined,
          utmCampaign: params?.utm_campaign,
          utmContent: params?.utm_content,
          utmMedium: params?.utm_medium,
          utmSource: params?.utm_source,
          utmTerm: params?.utm_term,
          avatar: {
            type: 'avatar',
            imageUrl: viewer.user.picture || undefined,
          },
          company: {
            companyId: viewer.organization.id,
            createdAt: viewer.user.createdAt,
            name: viewer.organization.name || undefined,
          },
        })
      }
    }

    if (user) {
      identifyUser()
    }
  }, [update, user])

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
