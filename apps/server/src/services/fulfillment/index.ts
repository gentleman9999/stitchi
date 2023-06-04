import { FulfillmentFactoryFulfillment } from './factory'
import makeFulfillmentRepository, { FulfillmentRepository } from './repository'
import { CreateFulfillmentFnInput } from './repository/create-fulfillment'
import { ListFullfillmentsFnInput } from './repository/list-fulfillments'

export interface FulfillmentService {
  createFulfillment: (
    input: CreateFulfillmentFnInput,
  ) => Promise<FulfillmentFactoryFulfillment>
  listFulfillments: (
    input: ListFullfillmentsFnInput,
  ) => Promise<FulfillmentFactoryFulfillment[]>
}

interface MakeClientParams {
  fulfillmentRepository: FulfillmentRepository
}

type MakeClientFn = (params?: MakeClientParams) => FulfillmentService

const makeClient: MakeClientFn = (
  { fulfillmentRepository } = {
    fulfillmentRepository: makeFulfillmentRepository(),
  },
) => {
  return {
    createFulfillment: async input => {
      const fulfillment = await fulfillmentRepository.createFulfillment(input)
      return fulfillment
    },
    listFulfillments: async input => {
      const fulfillments = await fulfillmentRepository.listFulfillments(input)
      return fulfillments
    },
  }
}

export { makeClient }
