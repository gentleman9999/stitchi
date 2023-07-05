import { AppMetadata, ManagementClient, User, UserMetadata } from 'auth0'
import redis, { RedisClient } from '../../redis'
import { getOrThrow } from '../../utils'

export interface UserService {
  getUser: typeof ManagementClient.prototype.getUser
}

interface MakeClientParams {
  redisClient: RedisClient
  auth0: ManagementClient
}

type MakeClientFn = (params?: MakeClientParams) => UserService

const makeClient: MakeClientFn = (
  { redisClient, auth0 } = {
    redisClient: redis,
    auth0: new ManagementClient({
      domain: getOrThrow(process.env.AUTH0_DOMAIN, 'AUTH0_DOMAIN'),
      clientId: getOrThrow(process.env.AUTH0_CLIENT_ID, 'AUTH0_CLIENT_ID'),
      clientSecret: getOrThrow(
        process.env.AUTH0_CLIENT_SECRET,
        'AUTH0_CLIENT_SECRET',
      ),
      scope: 'read:users',
    }),
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
        console.error(`Redis error: ${error}`)
      }

      return user
    },
  }
}

export { makeClient }
