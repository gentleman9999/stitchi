import { MembershipRole } from '@prisma/client'
import { verify } from './jwt'
import { ApolloError, AuthenticationError } from 'apollo-server-core'
import { ContextFunction } from 'apollo-server-core'
import { ExpressContext } from 'apollo-server-express'
import services from '../services'
import makeStripeClient from '../stripe'
import { SendgridClient, makeClient as makeSendgridClient } from '../sendgrid'
import PubSubClient from './pubsub'
import { logger, Logger } from '../telemetry'
import { AuthorizerFn, makeAuthorizer } from './authorization'

const HEADER_X_DEVICE_ID = 'x-device-id'

type StripeClient = ReturnType<typeof makeStripeClient>

export interface Context {
  role?: MembershipRole
  membershipId?: string
  userId?: string
  deviceId?: string
  organizationId?: string
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
  organization: typeof services.organization
  membership: typeof services.membership
  notification: typeof services.notification
  color: typeof services.color
  keyValueStore: typeof services.keyValueStore
  subscriptions: PubSubClient
  authorize: AuthorizerFn
  logger: Logger
}

interface ContextCreatorParams {
  sendgrid: SendgridClient
  stripe: StripeClient
  pubsub: PubSubClient
  logger: Logger
}

function makeContext(
  params: ContextCreatorParams = {
    pubsub: new PubSubClient(),
    stripe: makeStripeClient(),
    sendgrid: makeSendgridClient(),
    logger: logger,
  },
): ContextFunction<ExpressContext> {
  return async function createContext({ req, res: _res }): Promise<Context> {
    const authHeader = req?.headers?.['authorization']

    try {
      const payload = authHeader ? await verify(authHeader).catch() : null

      const userActiveMembership = await (async () => {
        if (payload?.sub) {
          const userActiveMembership =
            await services.membership.findUserActiveMembership({
              userId: payload.sub,
            })

          return userActiveMembership
        }
      })()

      const deviceId =
        req.headers && HEADER_X_DEVICE_ID in req.headers
          ? req.headers[HEADER_X_DEVICE_ID]?.toString()
          : null

      return {
        subscriptions: params.pubsub,
        role: userActiveMembership?.role ?? undefined,
        stripe: params.stripe,
        sendgrid: params.sendgrid,
        userId: payload?.sub,
        deviceId: deviceId || undefined,
        membershipId: userActiveMembership?.id ?? undefined,
        organizationId: userActiveMembership?.organizationId ?? undefined,
        logger: params.logger.child({
          operationName: req?.body.operationName,
          query: req?.body.query,
        }),
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
        organization: services.organization,
        membership: services.membership,
        notification: services.notification,
        color: services.color,
        keyValueStore: services.keyValueStore,
        authorize: makeAuthorizer(userActiveMembership?.role),
      }
    } catch (error) {
      logger.error(error)

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
