import { gql, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import hoistNonReactStatic from 'hoist-non-react-statics'
import routes from './routes'
import { ScopeAction, ScopeResource } from '@generated/globalTypes'
import React from 'react'
import { UseAuthorizedComponentGetDataQuery } from '@generated/UseAuthorizedComponentGetDataQuery'
import { GetServerSidePropsContext } from 'next'
import {
  AccessTokenError,
  AccessTokenErrorCode,
  getAccessToken as getServerSideAccessToken,
} from '@auth0/nextjs-auth0'
import getOrThrow from './utils/get-or-throw'

const appUrl = getOrThrow(
  process.env.NEXT_PUBLIC_SITE_URL,
  'NEXT_PUBLIC_SITE_URL',
)

interface AuthorizationParams {
  resource: ScopeResource
  action: ScopeAction
}

export const useAuthorizedComponent = () => {
  const { data, loading } =
    useQuery<UseAuthorizedComponentGetDataQuery>(GET_DATA)

  const { scopes } = data?.viewer || {}

  const can = React.useCallback(
    (resource: ScopeResource, action: ScopeAction) => {
      return (
        scopes?.some(
          scope => scope.resource === resource && scope.action === action,
        ) || false
      )
    },
    [scopes],
  )

  return { can, loading }
}

interface AuthorizedComponentProps extends AuthorizationParams {
  children: React.ReactNode
}

export const AuthorizedComponent = ({
  children,
  resource,
  action,
}: AuthorizedComponentProps) => {
  const { can, loading } = useAuthorizedComponent()

  const hasAccess = loading ? can(resource, action) : false

  if (!hasAccess) {
    return null
  }

  return <>{children}</>
}

export const withAuthorization = (
  Component: React.ComponentType<any>,
  params: AuthorizationParams,
) => {
  const AuthorizedPage = ({ ...props }) => {
    const router = useRouter()

    const { can, loading } = useAuthorizedComponent()

    if (loading) return null

    const hasAccess = can(params.resource, params.action)

    if (!hasAccess) {
      router.push(routes.internal.closet.href())
      return null
    }

    return <Component {...props} />
  }

  return hoistNonReactStatic(AuthorizedPage, Component)
}

export const getAccessToken = async (ctx?: GetServerSidePropsContext) => {
  let accessToken
  try {
    if (ctx) {
      accessToken = (await getServerSideAccessToken(ctx.req, ctx.res))
        .accessToken
    } else {
      // Auth0 only provides access to the accessToken on the server.
      // So we must make a call the the Next.js server to retrieve token.
      const response = await fetch(`${appUrl}/api/auth/accessToken`)
      const data = await response.json()
      accessToken = data.accessToken
    }
  } catch (error) {
    console.error("Couldn't get access token", {
      context: { error },
    })
  }

  return accessToken
}

const GET_DATA = gql`
  query UseAuthorizedComponentGetDataQuery {
    viewer {
      id
      scopes {
        resource
        action
      }
      flags {
        isBetaTester
      }
    }
  }
`
