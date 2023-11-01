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
import hoistNonReactStatics from 'hoist-non-react-statics'
import { redirect } from 'next/navigation'
import routes from './routes'

interface AuthorizationParams {
  resource: ScopeResource
  action: ScopeAction
}

interface BaseProps {
  children: React.ReactNode
}

interface AuthorizationComponentBasicProps
  extends BaseProps,
    AuthorizationParams {}

interface AuthorizationComponentOrProps extends BaseProps {
  or: Omit<AuthorizationComponentBasicProps, 'children'>[]
}

type AuthorizationComponentProps =
  | AuthorizationComponentBasicProps
  | AuthorizationComponentOrProps

const can = (
  params: AuthorizationParams[],
  scopes: NonNullable<AuthorizedComponentGetDataQuery['viewer']>['scopes'],
) => {
  return params.some(({ resource, action }) => {
    return scopes.some(
      scope => scope.resource === resource && scope.action === action,
    )
  })
}

export const AuthorizedComponent = async ({
  children,
  ...rest
}: AuthorizationComponentProps) => {
  const client = await getClient()

  const { data } = await client.query<
    AuthorizedComponentGetDataQuery,
    AuthorizedComponentGetDataQueryVariables
  >({ query: GET_DATA })

  const authorized = can(
    'or' in rest ? rest.or : [rest],
    data.viewer?.scopes || [],
  )

  if (!authorized) {
    return null
  }

  return <>{children}</>
}

export const authorization = async (params: AuthorizationParams[]) => {
  const client = await getClient()

  const { data } = await client.query<
    AuthorizedComponentGetDataQuery,
    AuthorizedComponentGetDataQueryVariables
  >({ query: GET_DATA })

  const authorized = can(params, data.viewer?.scopes || [])

  if (!authorized) {
    redirect(routes.internal.closet.href())
  }
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
