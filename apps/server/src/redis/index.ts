import * as redis from 'redis'
import type { RedisClientType } from 'redis'
import { getOrThrow } from '../utils'
import { logger } from '../telemetry'

export type RedisClient = RedisClientType

const makeClient = (): RedisClient => {
  const redisClient: RedisClientType = redis.createClient({
    url: getOrThrow(process.env.REDIS_URL, 'REDIS_URL'),
  })

  redisClient.on('error', err => logger.error('Redis Client Error', err))

  redisClient.connect()

  return redisClient
}

const client = makeClient()

export default client
export { makeClient }
