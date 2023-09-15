import * as redis from 'redis'
import type { RedisClientType } from 'redis'
import { getOrThrow } from '../utils'
import { logger } from '../telemetry'

export type RedisClient = RedisClientType

const makeClient = (): RedisClient => {
  const redisClient: RedisClientType = redis.createClient({
    url: getOrThrow(process.env.REDIS_URL, 'REDIS_URL'),
  })

  redisClient.on('error', err =>
    logger.child({ error: err }).error(`Redis Client Error - ${err}`),
  )

  return redisClient
}

const client = makeClient()
;(async () => await client.connect())()

export default client
export { makeClient }
