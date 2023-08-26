import {
  CreateNotificationGroupFn,
  makeMethod as makeCreateNotificationGroupMethod,
} from './create-notification-group'

import {
  makeMethod as makeGetNotificationTemplateMethod,
  GetNotificationTemplateFn,
} from './get-notification-template'

export interface Methods {
  createNotificationGroup: CreateNotificationGroupFn

  getNotificationTemplate: GetNotificationTemplateFn
}

interface MakeServiceMethodsParams<> {}

type MakeServiceMethodsFn = (params?: MakeServiceMethodsParams) => Methods

const makeServiceMethods: MakeServiceMethodsFn = () => ({
  createNotificationGroup: makeCreateNotificationGroupMethod(),
  getNotificationTemplate: makeGetNotificationTemplateMethod(),
})

export { makeServiceMethods }
