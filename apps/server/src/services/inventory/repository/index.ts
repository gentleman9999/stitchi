import makeCreateSku from './create-sku'

export interface InventoryRepositoryInit {}

export interface InventoryRepository {
  createSku: ReturnType<typeof makeCreateSku>
}

type MakeInventoryRepositoryFn = (
  init?: InventoryRepositoryInit,
) => InventoryRepository

const makeInventoryRepository: MakeInventoryRepositoryFn = _init => ({
  createSku: makeCreateSku(),
})

export default makeInventoryRepository
