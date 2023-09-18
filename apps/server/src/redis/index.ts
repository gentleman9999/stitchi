import * as redis from 'redis'
import type { RedisClientType } from 'redis'
import { getOrThrow } from '../utils'
import { logger } from '../telemetry'

export type RedisClient = RedisClientType

const makeClient = (): RedisClient => {
  const redisClient: RedisClientType = redis.createClient({
    url: getOrThrow(process.env.REDIS_TLS_URL, 'REDIS_TLS_URL'),
    socket: {
      tls: true,
      rejectUnauthorized: false,
    },
  })

  redisClient.on('ready', () => logger.info(`Redis Client Ready`))
  redisClient.on('error', err =>
    logger.child({ error: err }).error(`Redis Client Error - ${err}`),
  )
  redisClient.on('reconnecting', () => logger.info(`Redis Client Reconnecting`))
  redisClient.on('end', () => logger.info(`Redis Client Disconnected`))


  return redisClient
}

export { makeClient }
