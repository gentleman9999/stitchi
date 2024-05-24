import { getOrThrow } from '../../src/utils'
import { logger as loggerInstance } from '../telemetry'

const GOOGLE_ANALYTICS_MEASUREMENT_PROTOCOL_API_SECRET = getOrThrow(
  process.env.GOOGLE_ANALYTICS_MEASUREMENT_PROTOCOL_API_SECRET,
  'GOOGLE_ANALYTICS_MEASUREMENT_PROTOCOL_API_SECRET',
)

const GOOGLE_ANALYTICS_MEASUREMENT_ID = getOrThrow(
  process.env.GOOGLE_ANALYTICS_MEASUREMENT_ID,
  'GOOGLE_ANALYTICS_MEASUREMENT_ID',
)

const GOOGLE_ANALYTICS_MEASUREMENT_PROTOCOL_API_BASE_URL = getOrThrow(
  process.env.GOOGLE_ANALYTICS_MEASUREMENT_PROTOCOL_API_BASE_URL,
  'GOOGLE_ANALYTICS_MEASUREMENT_PROTOCOL_API_BASE_URL',
)

// This is a list of all the events that we can track with Google Analytics.
// Each event must be configured in Google Analytics before it can be tracked.
export enum GoogleAnalyticsEventEventName {
  NEW_DESIGN_REQUEST = 'design_requested',
}

interface BaseEventParams {
  debug_mode?: boolean
}

interface NewDesignRequestEventParams extends BaseEventParams {
  design_request_name: string
  design_request_id: string
  design_request_product_id: string
}

interface NewDesignRequestEvent {
  name: GoogleAnalyticsEventEventName.NEW_DESIGN_REQUEST
  params: NewDesignRequestEventParams
}

type GoogleAnalyticsEvent = NewDesignRequestEvent

interface TrackEventParams {
  clientId: string
  userId: string | undefined | null
  events: GoogleAnalyticsEvent[]
}

export interface GoogleAnalyticsClient {
  trackEvents: (params: TrackEventParams) => Promise<void>
}

interface Config {
  logger: typeof loggerInstance
}

const makeGoogleAnalyticsClient = (
  { logger }: Config = {
    logger: loggerInstance,
  },
): GoogleAnalyticsClient => {
  const baseURL = GOOGLE_ANALYTICS_MEASUREMENT_PROTOCOL_API_BASE_URL

  return {
    trackEvents: async params => {
      const query = new URLSearchParams({
        api_secret: GOOGLE_ANALYTICS_MEASUREMENT_PROTOCOL_API_SECRET,
        measurement_id: GOOGLE_ANALYTICS_MEASUREMENT_ID,
      })

      try {
        const response = await fetch(`${baseURL}?${query.toString()}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            client_id: params.clientId,
            user_id: params.userId,
            events: params.events,
          }),
        })

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
      } catch (error) {
        logger.error('Failed to track events with Google Analytics', {
          error,
          params,
        })
      }
    },
  }
}

export { makeGoogleAnalyticsClient }
