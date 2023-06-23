import { PrismaClient } from '@prisma/client'
import { ManagementClient } from 'auth0'
import { verify } from './jwt'
import { getOrThrow } from '../utils'
import { ApolloError, AuthenticationError } from 'apollo-server-core'
import { ContextFunction } from 'apollo-server-core'
import { ExpressContext } from 'apollo-server-express'
import services from '../services'
import makeStripeClient from '../stripe'
import { SendgridClient, makeClient as makeSendgridClient } from '../sendgrid'

const organizationHeaderKey = getOrThrow(
  process.env.HEADER_KEY_ORGANIZATION_ID,
  'HEADER_KEY_ORGANIZATION_ID',
)

type StripeClient = ReturnType<typeof makeStripeClient>

export interface Context {
  membershipId?: string
  userId?: string
  organizationId?: string
  prisma: PrismaClient
  auth0: ManagementClient
  sendgrid: SendgridClient
  stripe: StripeClient
  newsletter: typeof services.newsletter
  order: typeof services.order
  catalog: typeof services.catalog
  quote: typeof services.quote
  design: typeof services.design
  fulfillment: typeof services.fulfillment
  payment: typeof services.payment
  file: typeof services.file
}

interface ContextCreatorParams {
  prisma: PrismaClient
  auth0: ManagementClient
  sendgrid: SendgridClient
  stripe: StripeClient
}

function makeContext(
  params: ContextCreatorParams = {
    prisma: new PrismaClient(),
    auth0: new ManagementClient({
      domain: getOrThrow(process.env.AUTH0_DOMAIN, 'AUTH0_DOMAIN'),
      clientId: getOrThrow(process.env.AUTH0_CLIENT_ID, 'AUTH0_CLIENT_ID'),
      clientSecret: getOrThrow(
        process.env.AUTH0_CLIENT_SECRET,
        'AUTH0_CLIENT_SECRET',
      ),
      scope: 'read:users',
    }),
    stripe: makeStripeClient(),
    sendgrid: makeSendgridClient(),
  },
): ContextFunction<ExpressContext> {
  return async function createContext(expressContext) {
    const authHeader = expressContext.req.headers['authorization']

    try {
      const payload = authHeader ? await verify(authHeader).catch() : null

      const userMembership = await (async () => {
        if (payload?.sub) {
          const userMembership =
            await params.prisma.activeUserMembership.findFirst({
              where: { userId: payload.sub },
            })

          return userMembership
        }
      })()

      return {
        auth0: params.auth0,
        prisma: params.prisma,
        stripe: params.stripe,
        sendgrid: params.sendgrid,
        userId: payload?.sub,
        membershipId: userMembership?.membershipId ?? undefined,
        organizationId: userMembership?.organizationId ?? undefined,
        newsletter: services.newsletter,
        order: services.order,
        catalog: services.catalog,
        quote: services.quote,
        design: services.design,
        fulfillment: services.fulfillment,
        payment: services.payment,
        file: services.file,
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
  makeDefaultContext: () => makeContext(),
}
