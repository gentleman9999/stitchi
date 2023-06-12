import { gql, useMutation } from '@apollo/client'
import { ComponentErrorMessage } from '@components/common'
import { LoadingDots, Logo } from '@components/ui'
import { AccountSetupPageBootstrapAccount } from '@generated/AccountSetupPageBootstrapAccount'
import routes from '@lib/routes'
import { useRouter } from 'next/router'
import React from 'react'

interface Props {}

const AccountSetupPage = (props: Props) => {
  const router = useRouter()
  const { redirectUrl } = router.query
  const [canTransition, setCanTransition] = React.useState(false)

  const [bootstrapAccount, { error, data }] =
    useMutation<AccountSetupPageBootstrapAccount>(BOOTSTRAP_ACCOUNT)

  React.useEffect(() => {
    bootstrapAccount()
  }, [bootstrapAccount])

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setCanTransition(true)
    }, 5000)

    return () => clearTimeout(timeout)
  }, [])

  const userId = data?.userBoostrap?.id

  React.useEffect(() => {
    if (userId && canTransition) {
      router.push(
        typeof redirectUrl === 'string'
          ? redirectUrl
          : routes.internal.closet.href(),
      )
    }
  }, [canTransition, redirectUrl, router, userId])

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary">
      <div className="rounded-md shadow-magical max-w-md p-8 flex flex-col items-center gap-8 bg-white">
        <Logo className="w-16" />
        <p className="text-xl text-center font-semibold text-gray-400">
          Just a moment while we put the finishing touches on your closet...
        </p>
        {error ? <ComponentErrorMessage error={error} /> : <LoadingDots />}
      </div>
    </div>
  )
}

const BOOTSTRAP_ACCOUNT = gql`
  mutation AccountSetupPageBootstrapAccount {
    userBoostrap {
      id
    }
  }
`

export default AccountSetupPage
