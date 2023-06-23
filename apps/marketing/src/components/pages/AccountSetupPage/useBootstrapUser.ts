import { gql, useMutation } from '@apollo/client'
import { AccountSetupPageBootstrapAccount } from '@generated/AccountSetupPageBootstrapAccount'

const useBootstrapUser = () => {
  const [bootstrapAccount, { error, data, loading }] =
    useMutation<AccountSetupPageBootstrapAccount>(BOOTSTRAP_ACCOUNT)

  const user = data?.userBoostrap

  return [bootstrapAccount, { error, user, loading }] as const
}

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

export default useBootstrapUser
