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

interface AuthorizationParams {
  resource: ScopeResource
  action: ScopeAction
}

interface Props extends AuthorizationParams {
  children: React.ReactNode
}

export const AuthorizedComponent = async ({
  children,
  resource,
  action,
}: Props) => {
  const client = getClient()

  const { data } = await client.query<
    AuthorizedComponentGetDataQuery,
    AuthorizedComponentGetDataQueryVariables
  >({ query: GET_DATA })

  const can =
    data.viewer?.scopes.some(
      scope => scope.resource === resource && scope.action === action,
    ) || false

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
