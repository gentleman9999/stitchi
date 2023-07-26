import {
  CreateNotificationGroupFn,
  makeMethod as makeCreateNotificationGroupMethod,
} from './create-notification-group'

export interface Methods {
  createNotificationGroup: CreateNotificationGroupFn
}

interface MakeServiceMethodsParams {
  createNotificationGroup: CreateNotificationGroupFn
}

type MakeServiceMethodsFn = (params?: MakeServiceMethodsParams) => Methods

const makeServiceMethods: MakeServiceMethodsFn = (
  { createNotificationGroup } = {
    createNotificationGroup: makeCreateNotificationGroupMethod(),
  },
) => ({
  createNotificationGroup,
})

export { makeServiceMethods }
