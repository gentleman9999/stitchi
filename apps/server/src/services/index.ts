import { makeClient as makeNewsletterClient } from './newsletter'
import { makeClient as makeOrderClient } from './order'
import { makeClient as makeCatalogClient } from './catalog'
import { makeClient as makeQuoteClient } from './quote'
import { makeClient as makeDesignClient } from './design'

interface ServiceList {
  newsletter: ReturnType<typeof makeNewsletterClient>
  order: ReturnType<typeof makeOrderClient>
  catalog: ReturnType<typeof makeCatalogClient>
  quote: ReturnType<typeof makeQuoteClient>
  design: ReturnType<typeof makeDesignClient>
}

const services: ServiceList = {
  newsletter: makeNewsletterClient(),
  order: makeOrderClient(),
  catalog: makeCatalogClient(),
  quote: makeQuoteClient(),
  design: makeDesignClient(),
}

export default services
