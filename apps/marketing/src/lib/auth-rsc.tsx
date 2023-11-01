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

interface BaseProps {
  children: React.ReactNode
}

interface AuthorizationComponentBasicProps extends BaseProps {
  resource: ScopeResource
  action: ScopeAction
}

interface AuthorizationComponentOrProps extends BaseProps {
  or: Omit<AuthorizationComponentBasicProps, 'children'>[]
}

type AuthorizationComponentProps =
  | AuthorizationComponentBasicProps
  | AuthorizationComponentOrProps

export const AuthorizedComponent = async ({
  children,
  ...rest
}: AuthorizationComponentProps) => {
  const client = await getClient()

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
