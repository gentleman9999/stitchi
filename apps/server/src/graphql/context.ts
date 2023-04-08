import { PrismaClient } from '@prisma/client'
import { ManagementClient } from 'auth0'
import { verify } from './jwt'
import { getOrThrow } from '../utils'
import { ApolloError, AuthenticationError } from 'apollo-server-core'
import { ContextFunction } from 'apollo-server-core'
import { ExpressContext } from 'apollo-server-express'
import services from '../services'

const prisma = new PrismaClient()
const auth0 = new ManagementClient({
  domain: getOrThrow(process.env.AUTH0_DOMAIN, 'AUTH0_DOMAIN'),
  clientId: getOrThrow(process.env.AUTH0_CLIENT_ID, 'AUTH0_CLIENT_ID'),
  clientSecret: getOrThrow(
    process.env.AUTH0_CLIENT_SECRET,
    'AUTH0_CLIENT_SECRET',
  ),
  scope: 'read:users',
})

export interface Context {
  prisma: PrismaClient
  auth0: ManagementClient
  newsletter: typeof services.newsletter
  membershipId?: string
  userId?: string
  organizationId?: string
}

interface ContextCreatorParams {
  prisma: PrismaClient
  auth0: ManagementClient
}

function makeContext(
  params: ContextCreatorParams,
): ContextFunction<ExpressContext> {
  return async function createContext(expressContext) {
    const authHeader = expressContext.req.headers['authorization']

    try {
      const payload = authHeader ? await verify(authHeader).catch() : null
      // Grabs the first created membership.
      // In the future, can use this membershipId to control access to current organization.
      const membership = await (async () => {
        if (payload?.sub) {
          const membership = await params.prisma.membership.findFirst({
            where: { userId: payload.sub },
            orderBy: { createdAt: 'asc' },
            select: { id: true, userId: true, organizationId: true },
          })

          return membership
        }
      })()

      return {
        auth0,
        prisma,
        newsletter: services.newsletter,
        userId: payload?.sub,
        membershipId: membership?.id,
        organizationId: membership?.organizationId ?? undefined,
      }
    } catch (error) {
      console.error(error)

      if (error instanceof AuthenticationError) {
        throw new AuthenticationError(error.message)
      } else if (error instanceof ApolloError) {
        throw new ApolloError(error.message)
      } else if (
        typeof error === 'object' &&
        error !== null &&
        'message' in error
      ) {
        throw new ApolloError((error as any).message)
      } else {
        throw new ApolloError('Unknown error')
      }
    }
  }
}

export default {
  makeDefaultContext: () => makeContext({ prisma, auth0 }),
}
