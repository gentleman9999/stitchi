import { makeMethod as makeSendNotificationMethod } from './send-notification'

export interface Methods {
  sendNotification: ReturnType<typeof makeSendNotificationMethod>
}

interface MakeServiceMethodsParams {}

type MakeServiceMethodsFn = (params?: MakeServiceMethodsParams) => Methods

const makeServiceMethods: MakeServiceMethodsFn = () => ({
  sendNotification: makeSendNotificationMethod(),
})

export { makeServiceMethods }
