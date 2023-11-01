'use client'

import { gql, useLazyQuery } from '@apollo/client'
import { useUser } from '@auth0/nextjs-auth0/client'
import { MixpanelProviderGetDataQuery } from '@generated/MixpanelProviderGetDataQuery'
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
  children: React.ReactNode
}

const MixpanelProvider = ({ children }: MixpanelContextProps) => {
  const { user } = useUser()

  const { update } = useIntercom()

  const [getViewer] = useLazyQuery<MixpanelProviderGetDataQuery>(GET_DATA)

  React.useEffect(() => {
    const identifyUser = async () => {
      const { data } = await getViewer()

      if (data?.viewer?.user) {
        mixpanel.identify(data.viewer.user.id)

        mixpanel.people.set({
          userId: data.viewer.user.id,
          membershipId: data.viewer.id,
          organizationId: data.viewer.organization.id,
          organizationName: data.viewer.organization.name,
          $email: data.viewer.user.email,
        })

        let params

        if (typeof window !== 'undefined') {
          params = getUtmParams({
            query: parse(window.location.toString()).query,
          })
        }

        update({
          userId: data.viewer.user.id,
          userHash: data.viewer.user.intercomUserHash || undefined,
          createdAt: data.viewer.user.createdAt,
          email: data.viewer.user.email || undefined,
          name: data.viewer.user.name || undefined,
          phone: data.viewer.user.phoneNumber || undefined,
          utmCampaign: params?.utm_campaign,
          utmContent: params?.utm_content,
          utmMedium: params?.utm_medium,
          utmSource: params?.utm_source,
          utmTerm: params?.utm_term,
          avatar: {
            type: 'avatar',
            imageUrl: data.viewer.user.picture || undefined,
          },
          company: {
            companyId: data.viewer.organization.id,
            createdAt: data.viewer.user.createdAt,
            name: data.viewer.organization.name || undefined,
          },
        })
      }
    }

    if (user) {
      identifyUser()
    }
  }, [getViewer, update, user])

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

const GET_DATA = gql`
  query MixpanelProviderGetDataQuery {
    viewer {
      id
      organization {
        id
        name
      }
      user {
        createdAt
        id

        intercomUserHash
        email
        name
        phoneNumber
        picture
      }
    }
  }
`

export default MixpanelProvider
