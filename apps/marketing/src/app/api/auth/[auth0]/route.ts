import { gql } from '@apollo/client'
import {
  handleAuth,
  handleLogin,
  handleLogout,
  LoginOptions,
  AppRouteHandlerFn,
  AppRouteHandlerFnContext,
  AppRouterOnError,
} from '@auth0/nextjs-auth0'
import { getClient } from '@lib/apollo-rsc'
import routes from '@lib/routes'
import getOrThrow from '@lib/utils/get-or-throw'
import { Logger } from 'next-axiom'
import { NextRequest, NextResponse } from 'next/server'

const log = new Logger()

const handleAction = async (
  req: NextRequest,
  ctx: AppRouteHandlerFnContext,
  options?: LoginOptions,
) => {
  try {
    return handleLogin(req, ctx, options)
  } catch (e) {
    console.error(e)

    return NextResponse.json(
      JSON.stringify({
        error: e,
      }),
      { status: 400 },
    )
  }
}

const audience = getOrThrow(
  process.env.NEXT_PUBLIC_STITCHI_SERVER_URI,
  'NEXT_PUBLIC_STITCHI_SERVER_URI',
)

const defaultAuthorizationParams = {
  audience,
  scope: 'openid profile email offline_access',
}

const login: AppRouteHandlerFn = async (req, context) => {
  // This query param must NOT be 'returnTo' or else it will be overwritten
  const redirectUrl =
    typeof context.params?.redirectUrl === 'string'
      ? context.params.redirectUrl
      : req.headers.get('referer') || undefined

  return handleAction(req, context as any, {
    returnTo: routes.internal.account.authenticated.href({
      redirectUrl,
    }),

    authorizationParams: {
      ...defaultAuthorizationParams,
    },
  })
}

const signup: AppRouteHandlerFn = async (req, context) => {
  // This query param must NOT be 'returnTo' or else it will be overwritten
  const redirectUrl =
    typeof context.params?.redirectUrl === 'string'
      ? context.params.redirectUrl
      : req.headers.get('referrer') || undefined

  return handleAction(req, context as any, {
    returnTo: routes.internal.account.authenticated.href({
      redirectUrl,
    }),

    authorizationParams: {
      screen_hint: 'signup',
      ...defaultAuthorizationParams,
    },
  })
}

const logout: AppRouteHandlerFn = async (req, context) => {
  const client = await getClient()

  try {
    await client.mutate({
      mutation: LOGOUT_USER,
    })
  } catch (error) {
    log.error('Failed to logout user from graphql server', {
      context: { error, errorStringified: JSON.stringify(error) },
    })
  }

  return handleLogout(req, context as any, {
    returnTo: context.params?.returnTo as string,
  })
}

const onError: AppRouterOnError = async (req, error) => {
  log.error('Failed to authenticate user', {
    context: { error, req },
  })

  return NextResponse.json(JSON.stringify({ error: error.message }), {
    status: 500,
  })
}

export const GET = handleAuth({
  login,
  signup,
  logout,
  onError,
})

const LOGOUT_USER = gql`
  mutation LogoutUserQuery {
    userLogout {
      success
    }
  }
`
