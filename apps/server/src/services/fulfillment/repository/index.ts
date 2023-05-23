import makeListFulfillments from './list-fulfillments'
import makeCreateFulfillment from './create-fulfillment'

export interface FulfillmentRepositoryInit {}

export interface FulfillmentRepository {
  createFulfillment: ReturnType<typeof makeCreateFulfillment>
  listFulfillments: ReturnType<typeof makeListFulfillments>
}

type MakeFulfillmentRepositoryFn = (
  init?: FulfillmentRepositoryInit,
) => FulfillmentRepository

const makeFulfillmentRepository: MakeFulfillmentRepositoryFn = init => ({
  createFulfillment: makeCreateFulfillment(),
  listFulfillments: makeListFulfillments(),
})

export default makeFulfillmentRepository
