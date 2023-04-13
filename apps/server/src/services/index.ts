import scalablePress from './scalable-press'
import cloudinary from './cloudinary'
import { makeClient as makeNewsletterClient } from './newsletter'
import { makeClient as makeCatalogClient } from './catalog'

interface ServiceList {
  scalablePress: ReturnType<typeof scalablePress.makeDefaultScalablePressClient>
  cloudinary: ReturnType<typeof cloudinary.makdeDefaultCloudinaryClient>
  newsletter: ReturnType<typeof makeNewsletterClient>
  catalog: ReturnType<typeof makeCatalogClient>
}

const services: ServiceList = {
  scalablePress: scalablePress.makeDefaultScalablePressClient(),
  cloudinary: cloudinary.makdeDefaultCloudinaryClient(),
  newsletter: makeNewsletterClient(),
  catalog: makeCatalogClient(),
}

export default services
