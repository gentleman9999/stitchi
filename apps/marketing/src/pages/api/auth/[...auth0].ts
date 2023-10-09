import { gql } from '@apollo/client'
import {
  handleAuth,
  handleLogin,
  handleLogout,
  LoginOptions,
} from '@auth0/nextjs-auth0'
import { initializeApollo } from '@lib/apollo'
import routes from '@lib/routes'
import getOrThrow from '@lib/utils/get-or-throw'
import { NextApiRequest, NextApiResponse } from 'next'
import { Logger } from 'next-axiom'

const log = new Logger()

async function handleAction(
  req: NextApiRequest,
  res: NextApiResponse,
  params: LoginOptions,
) {
  try {
    await handleLogin(req, res, params)
  } catch (e) {
    console.error(e)
    res.status(400).json({ message: e })
  }
}

const audience = getOrThrow(
  process.env.NEXT_PUBLIC_STITCHI_SERVER_URI,
  'NEXT_PUBLIC_STITCHI_SERVER_URI',
)

const defaultAuthorizationParams = {
  audience,
  scope: 'openid profile email',
}

export default handleAuth({
  async login(req: NextApiRequest, res: NextApiResponse) {
    // This query param must NOT be 'returnTo' or else it will be overwritten
    const redirectUrl =
      typeof req.query.redirectUrl === 'string'
        ? req.query.redirectUrl
        : req.headers.referer

    return handleAction(req, res, {
      returnTo: routes.internal.account.authenticated.href({
        redirectUrl,
      }),
      authorizationParams: {
        ...defaultAuthorizationParams,
      },
    })
  },
  async signup(req: NextApiRequest, res: NextApiResponse) {
    // This query param must NOT be 'returnTo' or else it will be overwritten
    const redirectUrl =
      typeof req.query.redirectUrl === 'string'
        ? req.query.redirectUrl
        : req.headers.referer

    return handleAction(req, res, {
      returnTo: routes.internal.account.authenticated.href({
        redirectUrl,
      }),

      authorizationParams: {
        screen_hint: 'signup',
        ...defaultAuthorizationParams,
      },
    })
  },
  async logout(req: NextApiRequest, res: NextApiResponse) {
    const client = initializeApollo(undefined, {
      req,
      res,
    })

    try {
      await client.mutate({
        mutation: LOGOUT_USER,
      })
    } catch (error) {
      log.error('Failed to logout user from graphql server', {
        context: { error, errorStringified: JSON.stringify(error) },
      })
    }

    return handleLogout(req, res, {
      returnTo: req.query.returnTo as string,
    })
  },
  onError(req: NextApiRequest, res: NextApiResponse, error: Error) {
    log.error('Failed to authenticate user', {
      context: { error, req, res },
    })
    res.status(500).end(error.message)
  },
})

const LOGOUT_USER = gql`
  mutation LogoutUserQuery {
    userLogout {
      success
    }
  }
`
