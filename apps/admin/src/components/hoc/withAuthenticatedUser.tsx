import React from 'react'
import { useSession, RedirectToSignIn } from '@clerk/nextjs'
import { NextPage } from 'next'
import hoistNonReactStatics from 'hoist-non-react-statics'

const withAuthenticatedUser = <P extends Record<string, unknown>>(
  Component: NextPage<P>,
) => {
  const WithPrivateRoute = (props: P) => {
    const session = useSession()

    if (!session) {
      return <RedirectToSignIn />
    }

    return <Component {...props} />
  }

  return hoistNonReactStatics(WithPrivateRoute, Component)
}

export default withAuthenticatedUser
