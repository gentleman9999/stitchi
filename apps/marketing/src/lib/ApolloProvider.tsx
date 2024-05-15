'use client'

import { ApolloNextAppProvider } from '@apollo/experimental-nextjs-app-support/ssr'
import { createApolloClient } from './apollo-new'

interface Props {
  deviceId: string | null
  accessToken: string | null
  gaClientId: string | null
  children: React.ReactNode
}

const ApolloProvider = ({
  children,
  deviceId,
  accessToken,
  gaClientId,
}: Props) => {
  return (
    <ApolloNextAppProvider
      makeClient={() =>
        createApolloClient({ deviceId, accessToken, gaClientId })
      }
    >
      {children}
    </ApolloNextAppProvider>
  )
}

export default ApolloProvider
