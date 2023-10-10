import { KeyValue, PrismaClient } from '@prisma/client'
import { logger } from '../../telemetry'
import { KeyValueTable, table as makeValueTable } from './db/key-value-table'
import * as yup from 'yup'

const prisma = new PrismaClient()

export enum KeyValueRecordKey {
  USER_ONBOARDING = 'user-onboarding',
  UNAUTHENTICATED_USER_STORE = 'unauthenticated-user-store',
}

const userOnboardingSchema = yup.object().shape({
  seenDesignRequestDraftOnboarding: yup.boolean(),
})

const unauthenticatedUserStoreSchema = yup.object().shape({
  designRequestIds: yup.array().of(yup.string().required()),
  orderIds: yup.array().of(yup.string().required()),
})

interface KeyValueMap {
  [KeyValueRecordKey.USER_ONBOARDING]: yup.Asserts<typeof userOnboardingSchema>
  [KeyValueRecordKey.UNAUTHENTICATED_USER_STORE]: yup.Asserts<
    typeof unauthenticatedUserStoreSchema
  >
}

interface KeyValueStoreClient {
  getValue<T extends KeyValueRecordKey>(
    key: T,
    id: string,
  ): Promise<KeyValueMap[T] | null>
  setValue<T extends KeyValueRecordKey>(
    key: T,
    id: string,
    value: KeyValueMap[T],
  ): Promise<KeyValueMap[T]>
}

interface MakeClientFnParams {
  valueTable: KeyValueTable
}

type MakeClientFn = (params?: MakeClientFnParams) => KeyValueStoreClient

const makeClient: MakeClientFn = (
  { valueTable } = {
    valueTable: makeValueTable(prisma),
  },
) => {
  return {
    getValue: async (key, id) => {
      const compositeKey = `${key}:${id}`

      const value = await valueTable.findFirst({
        where: {
          key: compositeKey,
        },
      })

      if (!value) {
        return null
      }

      switch (key) {
        case KeyValueRecordKey.USER_ONBOARDING:
          return userOnboardingSchema.validateSync(JSON.parse(value.value))

        case KeyValueRecordKey.UNAUTHENTICATED_USER_STORE:
          return unauthenticatedUserStoreSchema.validateSync(
            JSON.parse(value.value),
          )
        default:
          throw new Error(`Invalid key: ${key}`)
      }
    },
    setValue: async (key, id, value) => {
      let validValue

      try {
        switch (key) {
          case KeyValueRecordKey.USER_ONBOARDING:
            validValue = userOnboardingSchema.validateSync(value)
            break

          case KeyValueRecordKey.UNAUTHENTICATED_USER_STORE:
            validValue = unauthenticatedUserStoreSchema.validateSync(value)
            break

          default:
            throw new Error(`Invalid key: ${key}`)
        }
      } catch (error) {
        logger
          .child({ error, key: `${key}:${id}`, value })
          .error('Invalid value')
        throw error
      }

      let upsertedValue

      try {
        upsertedValue = await valueTable.upsert({
          where: {
            key: `${key}:${id}`,
          },
          create: {
            key: `${key}:${id}`,
            value: JSON.stringify(validValue),
          },
          update: {
            key: `${key}:${id}`,
            value: JSON.stringify(validValue),
          },
        })
      } catch (error) {
        logger
          .child({ error, key: `${key}:${id}`, value })
          .error('Failed to set value')
        throw error
      }

      let validUpsertedValue

      try {
        switch (key) {
          case KeyValueRecordKey.USER_ONBOARDING:
            validUpsertedValue = userOnboardingSchema.validateSync(
              JSON.parse(upsertedValue.value),
            )
            break

          case KeyValueRecordKey.UNAUTHENTICATED_USER_STORE:
            validUpsertedValue = unauthenticatedUserStoreSchema.validateSync(
              JSON.parse(upsertedValue.value),
            )
            break

          default:
            throw new Error(`Invalid key: ${key}`)
        }
      } catch (error) {
        logger
          .child({ error, key: `${key}:${id}`, value })
          .error('Invalid upserted value')
        throw error
      }

      return validUpsertedValue
    },
  }
}

export { makeClient }
