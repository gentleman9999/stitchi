import { ManagementClient } from 'auth0'
import { getOrThrow } from '../utils'

const auth0ManagementClient = new ManagementClient({
  // This cannot be our custom domain and instead must be our default auth0 domain
  // https://github.com/auth0/node-auth0/issues/292
  domain: getOrThrow(
    process.env.AUTH0_MANAGEMENT_DOMAIN,
    'AUTH0_MANAGEMENT_DOMAIN',
  ),
  clientId: getOrThrow(process.env.AUTH0_CLIENT_ID, 'AUTH0_CLIENT_ID'),
  clientSecret: getOrThrow(
    process.env.AUTH0_CLIENT_SECRET,
    'AUTH0_CLIENT_SECRET',
  ),
  // scope: 'read:users',
})

export type Auth0ManagementClient = typeof auth0ManagementClient

export { auth0ManagementClient }
