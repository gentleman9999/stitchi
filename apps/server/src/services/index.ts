import scalablePress from './scalable-press'
import cloudinary from './cloudinary'
import { makeClient as makeNewsletterClient } from './newsletter'

interface ServiceList {
  scalablePress: ReturnType<typeof scalablePress.makeDefaultScalablePressClient>
  cloudinary: ReturnType<typeof cloudinary.makdeDefaultCloudinaryClient>
  newsletter: ReturnType<typeof makeNewsletterClient>
}

const services: ServiceList = {
  scalablePress: scalablePress.makeDefaultScalablePressClient(),
  cloudinary: cloudinary.makdeDefaultCloudinaryClient(),
  newsletter: makeNewsletterClient(),
}

export default services
