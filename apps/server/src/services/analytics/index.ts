import {
  GoogleAnalyticsClient,
  GoogleAnalyticsEventEventName,
  makeGoogleAnalyticsClient,
} from '../../google-analytics'
import { assertNever } from '../../utils/assert-never'
import { DesignFactoryDesignRequest } from '../design/factory'
import { OrderFactoryOrder } from '../order/factory'
import * as uuid from 'uuid'

const DEBUG_MODE =
  process.env.GOOGLE_ANALYTICS_MEASUREMENT_DEBUG_MODE === 'true'

if (DEBUG_MODE) {
  console.log('Google Analytics Measurement Protocol API is in debug mode.')
}

export enum EventName {
  DESIGN_REQUESTED = 'design_requested',
  ORDER_PAID = 'order_paid',
}

interface BaseParams {
  userId: string | null | undefined
  gaClientId: string | null | undefined
}

interface DesignRequestedParams extends BaseParams {
  event: EventName.DESIGN_REQUESTED
  designRequest: DesignFactoryDesignRequest
}

interface OrderPaidParams extends BaseParams {
  event: EventName.ORDER_PAID
  order: OrderFactoryOrder
}

type TrackEventParams = DesignRequestedParams | OrderPaidParams

type TrackEvent = (params: TrackEventParams) => Promise<void>

export interface AnalyticsService {
  trackEvent: TrackEvent
}

interface MakeClientParams {
  googleAnalytics: GoogleAnalyticsClient
}

type MakeClientFn = (params?: MakeClientParams) => AnalyticsService

const makeClient: MakeClientFn = (
  { googleAnalytics } = {
    googleAnalytics: makeGoogleAnalyticsClient(),
  },
) => {
  return {
    trackEvent: async params => {
      switch (params.event) {
        case EventName.DESIGN_REQUESTED: {
          await googleAnalytics.trackEvents({
            // Generate a random UUID to ensure event gets sent.
            clientId: params.gaClientId || uuid.v4(),
            userId: params.userId,
            events: [
              {
                name: GoogleAnalyticsEventEventName.NEW_DESIGN_REQUEST,
                params: {
                  design_request_id: params.designRequest.id,
                  design_request_product_id: params.designRequest.product.id,
                  design_request_name: params.designRequest.name,
                  debug_mode: DEBUG_MODE,
                },
              },
            ],
          })
          break
        }
        case EventName.ORDER_PAID:
          throw new Error('Not implemented')

        default:
          assertNever(params)
      }
    },
  }
}

export { makeClient }
