import * as redis from 'redis'
import type { RedisClientType } from 'redis'
import { getOrThrow } from '../utils'
import { logger } from '../telemetry'

const makeClient = async (): Promise<RedisClient> => {
  const redisClient: RedisClientType = redis.createClient({
    url: getOrThrow(process.env.REDIS_URL, 'REDIS_URL'),
  })

  await redisClient.connect()

  redisClient.on('ready', () => logger.info(`Redis Client Ready`))
  redisClient.on('error', err =>
    logger
      .child({ error: JSON.stringify(err) })
      .error(`Redis Client Error - ${err}`),
  )
  redisClient.on('reconnecting', () => logger.info(`Redis Client Reconnecting`))
  redisClient.on('end', () => logger.info(`Redis Client Disconnected`))

  return redisClient
}

export type RedisClient = RedisClientType
export type RedisClientFactory = typeof makeClient

export { makeClient }
