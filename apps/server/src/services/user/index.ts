import { Auth0ManagementClient, auth0ManagementClient } from '../../auth0'
import { logger } from '../../telemetry'
import { User, makeUser } from './serializer'

export interface UserService {
  getUser: (params: { id: string }) => Promise<User>
  getUserByEmail: (params: { email: string }) => Promise<User>
}

interface MakeClientParams {
  auth0: Auth0ManagementClient
}

type MakeClientFn = (params?: MakeClientParams) => UserService

const makeClient: MakeClientFn = (
  { auth0 } = {
    auth0: auth0ManagementClient,
  },
) => {
  return {
    getUser: async params => {
      let user

      try {
        user = makeUser((await auth0.users.get(params)).data)
      } catch (error) {
        logger
          .child({
            context: { error, params },
          })
          .error(`Error getting user`)

        throw new Error(`Error getting user`)
      }

      return user
    },

    getUserByEmail: async params => {
      let user = null

      try {
        const res = await auth0.usersByEmail.getByEmail(params)

        // User emails are unique in Auth0, so we should return the first result
        if (res.data.length > 0) {
          user = makeUser(res.data[0])
        } else {
          throw new Error(`No user found with email ${params.email}`)
        }
      } catch (error) {
        logger
          .child({
            context: { error, params },
          })
          .error(`Error getting users by email`)

        throw new Error(`Error getting user by email`)
      }

      return user
    },
  }
}

export { makeClient }
