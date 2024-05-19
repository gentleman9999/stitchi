'use client'

import { useMixpanel } from '@components/context/mixpanel-context'
import { Mixpanel } from 'mixpanel-browser'
import React from 'react'
import { useIntercom } from 'react-use-intercom'
import parse from 'url-parse'

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

interface Props {
  membershipId: string | undefined
  user:
    | {
        id: string
        intercomUserHash: string | null
        createdAt: string
        email: string | null
        name: string | null
        firstName: string | null
        lastName: string | null
        phoneNumber: string | null
        picture: string | null
      }
    | undefined
  organization:
    | {
        id: string
        createdAt: string
        name: string | null
      }
    | undefined
}

const IdentifyUser = ({ membershipId, user, organization }: Props) => {
  const { update } = useIntercom()
  const mixpanel = useMixpanel()

  React.useEffect(() => {
    try {
      registerUtmParams(mixpanel)
    } catch (error) {
      console.error('Failed to register UTM parameters', { error })
    }
  }, [])

  React.useEffect(() => {
    if (user) {
      mixpanel.identify(user.id)

      mixpanel.people.set({
        userId: user.id,
        membershipId: membershipId,
        organizationId: organization?.id,
        organizationName: organization?.name,
        $email: user?.email,
        $first_name: user.firstName,
        $last_name: user.lastName,
      })

      let params

      if (typeof window !== 'undefined') {
        params = getUtmParams({
          query: parse(window.location.toString()).query,
        })
      }

      update({
        userId: user.id,
        userHash: user.intercomUserHash || undefined,
        createdAt: user.createdAt,
        email: user.email || undefined,
        name: user.name || undefined,
        phone: user.phoneNumber || undefined,
        utmCampaign: params?.utm_campaign,
        utmContent: params?.utm_content,
        utmMedium: params?.utm_medium,
        utmSource: params?.utm_source,
        utmTerm: params?.utm_term,
        avatar: user.picture
          ? {
              type: 'avatar',
              imageUrl: user.picture,
            }
          : undefined,
        company: organization
          ? {
              companyId: organization.id,
              createdAt: organization.createdAt,
              name: organization.name || undefined,
            }
          : undefined,
      })
    }
  }, [update, user, membershipId, organization, mixpanel])

  return null
}

export default IdentifyUser
