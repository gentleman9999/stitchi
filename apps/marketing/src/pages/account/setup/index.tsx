import { gql } from '@apollo/client'
import { AccountSetupPageGetDataQuery } from '@generated/AccountSetupPageGetDataQuery'
import { initializeApollo } from '@lib/apollo'
import routes from '@lib/routes'
import { GetServerSideProps } from 'next'
import { Logger } from 'next-axiom'

const getServerSideProps: GetServerSideProps = async ctx => {
  const client = initializeApollo(null, ctx)
  const log = new Logger()

  try {
    const { data } = await client.query<AccountSetupPageGetDataQuery>({
      query: GET_DATA,
    })

    if (!data) {
      throw new Error('Unauthorized')
    }

    const memberships = data?.viewer?.user?.memberships || []

    if (!memberships.length) {
      await client.mutate({
        mutation: BOOTSTRAP_ACCOUNT,
      })

      return {
        redirect: {
          permanent: false,
          destination:
            ctx.query.redirectUrl?.toString() || routes.internal.closet.href(),
        },
      }
    } else {
      return {
        redirect: {
          permanent: false,
          destination: routes.internal.closet.memberships.href({
            redirectUrl: ctx.query.redirectUrl?.toString(),
          }),
        },
      }
    }
  } catch (error) {
    log.error("Couldn't get data. This shouldn't happen", {
      context: { error },
    })

    return {
      redirect: {
        permanent: false,
        destination: routes.internal.login.href({
          returnTo: ctx.query.redirectUrl?.toString(),
        }),
      },
    }
  }
}

const Page = () => {
  return null
}

const GET_DATA = gql`
  query AccountSetupPageGetDataQuery {
    viewer {
      id
      user {
        id
        memberships {
          id
        }
      }
    }
  }
`

const BOOTSTRAP_ACCOUNT = gql`
  mutation AccountSetupPageBootstrapAccount {
    userBoostrap {
      id
      organizations {
        id
      }
    }
  }
`

export { getServerSideProps }

export default Page
