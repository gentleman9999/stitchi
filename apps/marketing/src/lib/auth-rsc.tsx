import 'server-only'

import {
  ScopeAction,
  ScopeResource,
  UseAuthorizedComponentGetDataQuery,
  UseAuthorizedComponentGetDataQueryVariables,
} from '@generated/types'
import React from 'react'
import { getClient } from './apollo-rsc'
import { redirect } from 'next/navigation'
import routes from './routes'
import { GET_DATA } from './auth-query'

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
  scopes: NonNullable<UseAuthorizedComponentGetDataQuery['viewer']>['scopes'],
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
    UseAuthorizedComponentGetDataQuery,
    UseAuthorizedComponentGetDataQueryVariables
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
    UseAuthorizedComponentGetDataQuery,
    UseAuthorizedComponentGetDataQueryVariables
  >({ query: GET_DATA })

  const authorized = can(params, data.viewer?.scopes || [])

  if (!authorized) {
    redirect(routes.internal.closet.href())
  }
}

export const getUserAuthorization = async () => {
  const client = await getClient()

  const { data } = await client.query<
    UseAuthorizedComponentGetDataQuery,
    UseAuthorizedComponentGetDataQueryVariables
  >({ query: GET_DATA })

  const { role, scopes, id: membershipId } = data.viewer || {}

  const canCan = (params: AuthorizationParams[]) => can(params, scopes || [])

  return { role, scopes, membershipId, can: canCan }
}
