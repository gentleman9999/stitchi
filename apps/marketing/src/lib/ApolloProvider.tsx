'use client'

import { ApolloNextAppProvider } from '@apollo/experimental-nextjs-app-support/ssr'
import { createApolloClient } from './apollo-new'

interface Props {
  deviceId?: string
  accessToken?: string
  children: React.ReactNode
}

const ApolloProvider = ({ children, deviceId, accessToken }: Props) => {
  return (
    <ApolloNextAppProvider
      makeClient={() => createApolloClient({ deviceId, accessToken })}
    >
      {children}
    </ApolloNextAppProvider>
  )
}

export default ApolloProvider
