import { makeClient as makeNewsletterClient } from './newsletter'
import { makeClient as makeCatalogClient } from './catalog'

interface ServiceList {
  newsletter: ReturnType<typeof makeNewsletterClient>
  catalog: ReturnType<typeof makeCatalogClient>
}

const services: ServiceList = {
  newsletter: makeNewsletterClient(),
  catalog: makeCatalogClient(),
}

export default services
