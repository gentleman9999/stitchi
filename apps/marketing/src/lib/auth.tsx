import { gql, useQuery } from '@apollo/client'
import { useUser } from '@auth0/nextjs-auth0/client'
import { WithAuthenticationGetDataQuery } from '@generated/WithAuthenticationGetDataQuery'
import { useRouter } from 'next/router'
import hoistNonReactStatic from 'hoist-non-react-statics'
import routes from './routes'

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

  const { data, loading } = useQuery<WithAuthenticationGetDataQuery>(GET_DATA)

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
  query WithAuthenticationGetDataQuery {
    viewer {
      id
    }
  }
`
