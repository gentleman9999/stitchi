'use client'

import { gql, useQuery } from '@apollo/client'
import { useRouter } from 'next/navigation'
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

  return { can, loading, role: data?.viewer?.role }
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

  const hasAccess = loading ? false : can(resource, action)

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

const GET_DATA = gql`
  query UseAuthorizedComponentGetDataQuery {
    viewer {
      id
      role
      scopes {
        resource
        action
      }
    }
  }
`
