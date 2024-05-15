import { getOrThrow } from '../../dist/src/utils'
import axios, { CreateAxiosDefaults } from 'axios'
import { logger } from '../telemetry'

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

export enum GoogleAnalyticsEventEventName {
  NEW_DESIGN_REQUEST = 'new_design_request',
}

interface NewDesignRequestEvent {
  name: GoogleAnalyticsEventEventName.NEW_DESIGN_REQUEST
  params: {
    design_request_name: string
    design_request_id: string
    design_request_product_id: string
  }
}

type GoogleAnalyticsEvent = NewDesignRequestEvent

interface TrackEventParams {
  events: GoogleAnalyticsEvent[]
}

export interface GoogleAnalyticsClient {
  trackEvents: (params: TrackEventParams) => Promise<void>
}

interface Config {
  clientId: string
  userId: string | null
  logger: typeof logger
}

const makeGoogleAnalyticsClient = ({
  clientId,
  userId,
  logger,
}: Config): GoogleAnalyticsClient => {
  const axiosConfig: CreateAxiosDefaults = {
    baseURL: GOOGLE_ANALYTICS_MEASUREMENT_PROTOCOL_API_BASE_URL,
  }

  const client = axios.create(axiosConfig)

  return {
    trackEvents: async params => {
      const query = new URLSearchParams({
        api_secret: GOOGLE_ANALYTICS_MEASUREMENT_PROTOCOL_API_SECRET,
        measurement_id: GOOGLE_ANALYTICS_MEASUREMENT_ID,
      })

      try {
        client.post(`?${query.toString()}`, {
          client_id: clientId,
          user_id: userId,
          non_personalized_ads: false,
          events: params.events,
        })
      } catch (error) {
        logger.error('Failed to track events with Google Analytics', {
          error,
          clientId,
          userId,
          events: params.events,
        })
      }
    },
  }
}

export { makeGoogleAnalyticsClient }
