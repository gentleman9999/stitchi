import 'server-only'

import { gql } from '@apollo/client'
import {
  AuthorizedComponentGetDataQuery,
  AuthorizedComponentGetDataQueryVariables,
  ScopeAction,
  ScopeResource,
} from '@generated/types'
import React from 'react'
import { getClient } from './apollo-rsc'

interface BasicAuthorizationParams {
  resource: ScopeResource
  action: ScopeAction
}

interface OrAuthorizationParams {
  or: BasicAuthorizationParams[]
}

type AuthorizationParams = BasicAuthorizationParams | OrAuthorizationParams

interface Props extends AuthorizationParams {
  children: React.ReactNode
}

export const AuthorizedComponent = async ({ children, ...rest }: Props) => {
  const client = getClient()

  const { data } = await client.query<
    AuthorizedComponentGetDataQuery,
    AuthorizedComponentGetDataQueryVariables
  >({ query: GET_DATA })

  const can =
    data.viewer?.scopes.some(scope => {
      if ('or' in rest) {
        return Boolean(
          rest.or.some(orScope => {
            if (
              scope.resource === orScope.resource &&
              scope.action === orScope.action
            ) {
              return true
            }
          }),
        )
      } else {
        return scope.resource === rest.resource && scope.action === rest.action
      }
    }) || false

  if (!can) {
    return null
  }

  return <>{children}</>
}

const GET_DATA = gql`
  query AuthorizedComponentGetDataQuery {
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
