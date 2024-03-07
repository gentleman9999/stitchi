import { SkuTable, Sku, table as makeSkuTable } from '../db/sku-table'
import * as yup from 'yup'
import { PrismaClient } from '@prisma/client'
import { InventoryFactorySku, skuFactory } from '../factory'
import { logger } from '../../../telemetry'

const inputSchema = Sku.omit([
  'id',
  'createdAt',
  'updatedAt',
  'deletedAt',
]).required()

const prisma = new PrismaClient()

interface CreateSkuConfig {
  skuTable: SkuTable
}

export interface CreateSkuFnInput {
  sku: yup.InferType<typeof inputSchema>
}
type CreateSkuFn = (input: CreateSkuFnInput) => Promise<InventoryFactorySku>
type MakeCreateSkuFn = (config?: CreateSkuConfig) => CreateSkuFn

const makeCreateSku: MakeCreateSkuFn = (
  { skuTable } = { skuTable: makeSkuTable(prisma) },
) => {
  return async function createSku(input) {
    let validInput

    try {
      validInput = await inputSchema.validate(input.sku)
    } catch (error) {
      logger.child({ error }).error('Failed to validate input')

      throw new Error('Invalid input')
    }

    let newSku

    try {
      newSku = await skuTable.create({
        data: {
          designVariantId: validInput.designVariantId,
          quantity: validInput.quantity,
        },
      })
    } catch (error) {
      logger
        .child({
          input: validInput,
          error: error,
        })
        .error('Failed to create sku')

      throw new Error('Failed to create sku')
    }

    return skuFactory({
      skuRecord: newSku,
    })
  }
}

export default makeCreateSku
