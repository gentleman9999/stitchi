import { makeClient as makeNewsletterClient } from './newsletter'
import { makeClient as makeOrderClient } from './order'
import { makeClient as makeCatalogClient } from './catalog'
import { makeClient as makeQuoteClient } from './quote'
import { makeClient as makeDesignClient } from './design'
import { makeClient as makeFulfillmentClient } from './fulfillment'
import { makeClient as makePaymentClient } from './payment'
import { makeClient as makeNotificationClient } from './notification'
import { makeClient as makeFileClient } from './file'
import { makeClient as makeConversationClient } from './conversation'
import { makeClient as makeUserClient } from './user'
import { makeClient as makeOrganizationClient } from './organization'
import { makeClient as makeMembershipClient } from './membership'
import { makeClient as makeColorClient } from './color'
import { makeClient as makeKeyValueStoreClient } from './key-value-store'
import { makeClient as makeInventoryClient } from './inventory'

export interface ServiceList {
  conversation: ReturnType<typeof makeConversationClient>
  newsletter: ReturnType<typeof makeNewsletterClient>
  order: ReturnType<typeof makeOrderClient>
  catalog: ReturnType<typeof makeCatalogClient>
  quote: ReturnType<typeof makeQuoteClient>
  design: ReturnType<typeof makeDesignClient>
  fulfillment: ReturnType<typeof makeFulfillmentClient>
  payment: ReturnType<typeof makePaymentClient>
  notification: ReturnType<typeof makeNotificationClient>
  file: ReturnType<typeof makeFileClient>
  user: ReturnType<typeof makeUserClient>
  organization: ReturnType<typeof makeOrganizationClient>
  membership: ReturnType<typeof makeMembershipClient>
  color: ReturnType<typeof makeColorClient>
  keyValueStore: ReturnType<typeof makeKeyValueStoreClient>
  inventory: ReturnType<typeof makeInventoryClient>
}

const services: ServiceList = {
  conversation: makeConversationClient(),
  newsletter: makeNewsletterClient(),
  order: makeOrderClient(),
  catalog: makeCatalogClient(),
  quote: makeQuoteClient(),
  design: makeDesignClient(),
  fulfillment: makeFulfillmentClient(),
  payment: makePaymentClient(),
  notification: makeNotificationClient(),
  file: makeFileClient(),
  user: makeUserClient(),
  organization: makeOrganizationClient(),
  membership: makeMembershipClient(),
  color: makeColorClient(),
  keyValueStore: makeKeyValueStoreClient(),
  inventory: makeInventoryClient(),
}

export default services
