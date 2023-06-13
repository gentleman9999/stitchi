import { makeClient as makeNewsletterClient } from './newsletter'
import { makeClient as makeOrderClient } from './order'
import { makeClient as makeCatalogClient } from './catalog'
import { makeClient as makeQuoteClient } from './quote'
import { makeClient as makeDesignClient } from './design'
import { makeClient as makeFulfillmentClient } from './fulfillment'
import { makeClient as makePaymentClient } from './payment'
import { makeClient as makeNotificationClient } from './notification'

export interface ServiceList {
  newsletter: ReturnType<typeof makeNewsletterClient>
  order: ReturnType<typeof makeOrderClient>
  catalog: ReturnType<typeof makeCatalogClient>
  quote: ReturnType<typeof makeQuoteClient>
  design: ReturnType<typeof makeDesignClient>
  fulfillment: ReturnType<typeof makeFulfillmentClient>
  payment: ReturnType<typeof makePaymentClient>
  notification: ReturnType<typeof makeNotificationClient>
}

const services: ServiceList = {
  newsletter: makeNewsletterClient(),
  order: makeOrderClient(),
  catalog: makeCatalogClient(),
  quote: makeQuoteClient(),
  design: makeDesignClient(),
  fulfillment: makeFulfillmentClient(),
  payment: makePaymentClient(),
  notification: makeNotificationClient(),
}

export default services
