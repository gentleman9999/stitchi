'use client'

import { ApolloClient, ApolloProvider } from '@apollo/client'

interface Props {
  children: React.ReactNode
  client: ApolloClient<unknown>
}

const ApolloProviderWrapper = ({ client, children }: Props) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>
}

export default ApolloProviderWrapper
