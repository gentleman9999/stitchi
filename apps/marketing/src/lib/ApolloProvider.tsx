'use client'

import { ApolloNextAppProvider } from '@apollo/experimental-nextjs-app-support/ssr'
import { createApolloClient } from './apollo-new'

interface Props {
  deviceId?: string
  children: React.ReactNode
}

const ApolloProvider = ({ children, deviceId }: Props) => {
  return (
    <ApolloNextAppProvider makeClient={() => createApolloClient({ deviceId })}>
      {children}
    </ApolloNextAppProvider>
  )
}

export default ApolloProvider
