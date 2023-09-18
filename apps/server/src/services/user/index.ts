import { AppMetadata, ManagementClient, User, UserMetadata } from 'auth0'
import { makeClient as makeRedisClient, RedisClient } from '../../redis'
import { Auth0ManagementClient, auth0ManagementClient } from '../../auth0'
import { logger } from '../../telemetry'

export interface UserService {
  getUser: typeof ManagementClient.prototype.getUser
}

interface MakeClientParams {
  redisClient: RedisClient
  auth0: Auth0ManagementClient
}

type MakeClientFn = (params?: MakeClientParams) => UserService

const makeClient: MakeClientFn = (
  { redisClient, auth0 } = {
    redisClient: makeRedisClient(),
    auth0: auth0ManagementClient,
  },
) => {
  return {
    getUser: async params => {
      let user: User<AppMetadata, UserMetadata> = {}

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
  }
}

export { makeClient }
