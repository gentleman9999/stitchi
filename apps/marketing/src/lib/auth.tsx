import { gql, useQuery } from '@apollo/client'
import { useUser } from '@auth0/nextjs-auth0/client'
import { useRouter } from 'next/router'
import hoistNonReactStatic from 'hoist-non-react-statics'
import routes from './routes'
import { ScopeAction, ScopeResource } from '@generated/globalTypes'
import React from 'react'
import { UseAuthorizedComponentGetDataQuery } from '@generated/UseAuthorizedComponentGetDataQuery'

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

export const withAuthentication = (Component: React.ComponentType<any>) => {
  const AuthenticatedPage = ({ ...props }) => {
    const router = useRouter()
    const { user, isLoading } = useUser()
    const { loading } = useAccountSetup()

    if (loading || isLoading) return null

    if (!user) {
      router.push(routes.internal.login.href())
      return null
    }

    return <Component {...props} />
  }

  return hoistNonReactStatic(AuthenticatedPage, Component)
}

const useAccountSetup = () => {
  const router = useRouter()

  const { data, loading } =
    useQuery<UseAuthorizedComponentGetDataQuery>(GET_DATA)

  if (loading) return { loading: true }

  const accountSetupHref = routes.internal.account.setup.href({
    redirectUrl: router.asPath,
  })

  if (
    !loading &&
    !data?.viewer &&
    !router.pathname.startsWith(accountSetupHref.split('?')[0])
  ) {
    router.push(accountSetupHref)
    return { loading: true }
  }

  return {
    loading: false,
  }
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
