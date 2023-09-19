import { AppMetadata, ManagementClient, User, UserMetadata } from 'auth0'
import { makeClient as makeRedisClient, RedisClientFactory } from '../../redis'
import { Auth0ManagementClient, auth0ManagementClient } from '../../auth0'
import { logger } from '../../telemetry'

export interface UserService {
  getUser: typeof ManagementClient.prototype.getUser
  getUserByEmail: (
    email: string,
  ) => Promise<User<AppMetadata, UserMetadata> | null>
}

interface MakeClientParams {
  redisClientFactory: RedisClientFactory
  auth0: Auth0ManagementClient
}

type MakeClientFn = (params?: MakeClientParams) => UserService

const makeClient: MakeClientFn = (
  { redisClientFactory, auth0 } = {
    redisClientFactory: makeRedisClient,
    auth0: auth0ManagementClient,
  },
) => {
  return {
    getUser: async params => {
      let user: User<AppMetadata, UserMetadata> = {}

      const redisClient = await redisClientFactory()

      try {
        const found = await redisClient.get(`user:${params.id}`)

        if (found) {
          user = JSON.parse(found)
        } else {
          user = await auth0.getUser(params)

          if (user.user_id) {
            await redisClient.set(
              `user:${user.user_id}`,
              JSON.stringify(user),
              {
                EX: 30, // 30 seconds
              },
            )
          }
        }
      } catch (error) {
        logger
          .child({
            context: { error, params },
          })
          .error(`Error getting user`)
      }

      return user
    },

    getUserByEmail: async params => {
      let user = null

      try {
        const res = await auth0.getUsersByEmail(params)

        // User emails are unique in Auth0, so we should return the first result
        if (res.length > 0) {
          user = res[0]
        }
      } catch (error) {
        logger
          .child({
            context: { error, params },
          })
          .error(`Error getting users by email`)
      }

      return user
    },
  }
}

export { makeClient }
