import {
  GoogleAnalyticsClient,
  GoogleAnalyticsEventEventName,
  makeGoogleAnalyticsClient,
} from '../../google-analytics'
import { assertNever } from '../../utils/assert-never'
import { DesignFactoryDesignRequest } from '../design/factory'
import { OrderFactoryOrder } from '../order/factory'

export enum EventName {
  DESIGN_REQUESTED = 'design_requested',
  ORDER_PAID = 'order_paid',
}

interface BaseParams {
  userId: string | undefined
  gaClientId: string
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
            clientId: params.gaClientId,
            userId: params.userId,
            events: [
              {
                name: GoogleAnalyticsEventEventName.NEW_DESIGN_REQUEST,
                params: {
                  design_request_id: params.designRequest.id,
                  design_request_product_id: params.designRequest.product.id,
                  design_request_name: params.designRequest.name,
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
