import { makeMethod as makeGetNotificationTemplateMethod } from './get-notification-template'

export interface Methods {
  getNotificationTemplate: ReturnType<typeof makeGetNotificationTemplateMethod>
}

interface MakeServiceMethodsParams {}

type MakeServiceMethodsFn = (params?: MakeServiceMethodsParams) => Methods

const makeServiceMethods: MakeServiceMethodsFn = () => ({
  getNotificationTemplate: makeGetNotificationTemplateMethod(),
})

export { makeServiceMethods }
