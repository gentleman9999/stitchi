import getOrThrow from '@lib/utils/get-or-throw'
import { sendGTMEvent } from './google'

export const GTM_ID = getOrThrow(
  process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID,
  'NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID',
)

// Each value must map to a data layer variable in Google Tag Manager.
export enum DataLayerVariableNames {
  USER_EMAIL = 'user_email',
  USER_FIRST_NAME = 'user_first_name',
  USER_LAST_NAME = 'user_last_name',
}

// Each value must map to an event name in the Google Tag Manager data layer.
export enum EventName {
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

type Event = EventGenerateLead | EventEmailListSubscribe

const makeEvents = () => {
  return {
    track: (event: Event) => {
      sendGTMEvent(event)
    },
  }
}

export default makeEvents()
