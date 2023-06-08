import { gql, useQuery } from '@apollo/client'
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client'
import { WithAuthenticationGetDataQuery } from '@generated/WithAuthenticationGetDataQuery'
import { useRouter } from 'next/router'
import hoistNonReactStatic from 'hoist-non-react-statics'
import routes from './routes'

export const withAuthentication = (Component: React.ComponentType<any>) => {
  const AuthenticatedPage = withPageAuthRequired(props => {
    // We have an authenticated user, but we need to check if the user has an account

    const router = useRouter()
    const { data, loading } = useQuery<WithAuthenticationGetDataQuery>(GET_DATA)

    if (loading) return null

    const accountSetupHref = routes.internal.account.setup.href({
      redirectUrl: router.asPath,
    })

    if (
      !loading &&
      !data?.viewer &&
      !router.pathname.startsWith(accountSetupHref.split('?')[0])
    ) {
      router.push(accountSetupHref)
      return null
    }

    return <Component {...props} />
  })

  return hoistNonReactStatic(AuthenticatedPage, Component)
}

const GET_DATA = gql`
  query WithAuthenticationGetDataQuery {
    viewer {
      id
    }
  }
`
