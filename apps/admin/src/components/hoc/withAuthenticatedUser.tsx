import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import hoistNonReactStatics from 'hoist-non-react-statics'
import { NextPage } from 'next'

const withAuthenticatedUser = <P extends Record<string, unknown>>(
  PageComponent: NextPage<P>,
) => {
  return hoistNonReactStatics(
    withPageAuthRequired(PageComponent as any) as any,
    PageComponent,
  )
}

export { withAuthenticatedUser }
