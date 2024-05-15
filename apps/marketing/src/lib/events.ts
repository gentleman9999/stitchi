import getOrThrow from '@lib/utils/get-or-throw'

export const GTM_ID = getOrThrow(
  process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID,
  'NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID',
)

const pushToDataLayer = (obj: Record<string, any>) => {
  if (window !== undefined && window.dataLayer !== undefined) {
    window.dataLayer.push(obj)
  }
}

// Each value must map to a data layer variable in Google Tag Manager.
export enum DataLayerVariableNames {
  USER_EMAIL = 'user_email',
  USER_FIRST_NAME = 'user_first_name',
  USER_LAST_NAME = 'user_last_name',
}

// Each value must map to an event name in the Google Tag Manager data layer.
export enum EventName {
  INITIALIZE = 'initialize',
  EMAIL_LIST_SUBSCRIBE = 'email_list_subscribe',
  GENERATE_LEAD = 'generate_lead',
}

interface BaseEvent {
  event: EventName
}

interface EventGenerateLead extends BaseEvent {
  event: EventName.GENERATE_LEAD
  userEmail: string
  userFirstName?: string
  userLastName?: string
}

interface EventEmailListSubscribe extends BaseEvent {
  event: EventName.EMAIL_LIST_SUBSCRIBE
  userEmail: string
}

interface EventInitialize extends BaseEvent {
  event: EventName.INITIALIZE
  user_id: string
  user_properties: {
    organization_id: string
    organization_name: string | null
  }
}

type Event = EventGenerateLead | EventEmailListSubscribe | EventInitialize

const makeEvents = () => {
  return {
    track: (event: Event) => {
      pushToDataLayer(event)
    },
  }
}

export default makeEvents()
