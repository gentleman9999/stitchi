import makeCreateOrder from './create-order'
import makeGetOrder from './get-order'

export interface OrderRepositoryInit {}

export interface OrderRepository {
  createOrder: ReturnType<typeof makeCreateOrder>
  getOrder: ReturnType<typeof makeGetOrder>
}

type MakeOrderRepositoryFn = (init?: OrderRepositoryInit) => OrderRepository

const makeOrderRepository: MakeOrderRepositoryFn = init => ({
  createOrder: makeCreateOrder(),
  getOrder: makeGetOrder(),
})

export default makeOrderRepository
