import makeCreateOrder from './create-order'
import makeGetOrder from './get-order'
import makeCreateMailingAddress from './create-mailing-address'
import makeGetMailingAddress from './get-mailing-address'
import makeUpdateOrder from './update-order'

export interface OrderRepositoryInit {}

export interface OrderRepository {
  createOrder: ReturnType<typeof makeCreateOrder>
  getOrder: ReturnType<typeof makeGetOrder>
  updateOrder: ReturnType<typeof makeUpdateOrder>
  createMailingAddress: ReturnType<typeof makeCreateMailingAddress>
  getMailingAddress: ReturnType<typeof makeGetMailingAddress>
}

type MakeOrderRepositoryFn = (init?: OrderRepositoryInit) => OrderRepository

const makeOrderRepository: MakeOrderRepositoryFn = init => ({
  createOrder: makeCreateOrder(),
  getOrder: makeGetOrder(),
  updateOrder: makeUpdateOrder(),
  createMailingAddress: makeCreateMailingAddress(),
  getMailingAddress: makeGetMailingAddress(),
})

export default makeOrderRepository
