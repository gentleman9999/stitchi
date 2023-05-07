import { makeClient as makeNewsletterClient } from './newsletter'

interface ServiceList {
  newsletter: ReturnType<typeof makeNewsletterClient>
}

const services: ServiceList = {
  newsletter: makeNewsletterClient(),
}

export default services
