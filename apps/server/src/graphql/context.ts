import { MembershipRole, PrismaClient } from '@prisma/client'
import { verify } from './jwt'
import { ApolloError, AuthenticationError } from 'apollo-server-core'
import { ContextFunction } from 'apollo-server-core'
import { ExpressContext } from 'apollo-server-express'
import services from '../services'
import makeStripeClient from '../stripe'
import { SendgridClient, makeClient as makeSendgridClient } from '../sendgrid'
import PubSubClient from './pubsub'

type StripeClient = ReturnType<typeof makeStripeClient>

export interface Context {
  role?: MembershipRole
  membershipId?: string
  userId?: string
  organizationId?: string
  prisma: PrismaClient
  sendgrid: SendgridClient
  stripe: StripeClient
  conversation: typeof services.conversation
  newsletter: typeof services.newsletter
  order: typeof services.order
  catalog: typeof services.catalog
  quote: typeof services.quote
  design: typeof services.design
  fulfillment: typeof services.fulfillment
  payment: typeof services.payment
  file: typeof services.file
  user: typeof services.user
  subscriptions: PubSubClient
}

interface ContextCreatorParams {
  prisma: PrismaClient
  sendgrid: SendgridClient
  stripe: StripeClient
  pubsub: PubSubClient
}

function makeContext(
  params: ContextCreatorParams = {
    prisma: new PrismaClient(),
    pubsub: new PubSubClient(),
    stripe: makeStripeClient(),
    sendgrid: makeSendgridClient(),
  },
): ContextFunction<ExpressContext> {
  return async function createContext(expressContext) {
    const authHeader = expressContext.req?.headers?.['authorization']

    try {
      const payload = authHeader ? await verify(authHeader).catch() : null

      const userMembership = await (async () => {
        if (payload?.sub) {
          const userMembership =
            await params.prisma.activeUserMembership.findFirst({
              where: { userId: payload.sub },
              include: { membership: true },
            })

          return userMembership
        }
      })()

      return {
        subscriptions: params.pubsub,
        role: userMembership?.membership.role ?? undefined,
        prisma: params.prisma,
        stripe: params.stripe,
        sendgrid: params.sendgrid,
        userId: payload?.sub,
        membershipId: userMembership?.membershipId ?? undefined,
        organizationId: userMembership?.organizationId ?? undefined,
        conversation: services.conversation,
        newsletter: services.newsletter,
        order: services.order,
        catalog: services.catalog,
        quote: services.quote,
        design: services.design,
        fulfillment: services.fulfillment,
        payment: services.payment,
        file: services.file,
        user: services.user,
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
