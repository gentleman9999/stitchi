import { makeMethod as makeSendNotificationMethod } from './send-notification'
import { makeMethod as makeSendAnonymousNotificationMethod } from './send-anonymous-notification'

export interface Methods {
  sendNotification: ReturnType<typeof makeSendNotificationMethod>
  sendAnonymousNotification: ReturnType<
    typeof makeSendAnonymousNotificationMethod
  >
}

interface MakeServiceMethodsParams {}

type MakeServiceMethodsFn = (params?: MakeServiceMethodsParams) => Methods

const makeServiceMethods: MakeServiceMethodsFn = () => ({
  sendNotification: makeSendNotificationMethod(),
  sendAnonymousNotification: makeSendAnonymousNotificationMethod(),
})

export { makeServiceMethods }
