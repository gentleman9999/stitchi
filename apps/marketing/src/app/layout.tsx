import { UserProvider } from '@auth0/nextjs-auth0/client'
import ApolloProvider from '@lib/ApolloProvider'
import React from 'react'
import { cookies } from 'next/headers'
import { COOKIE_DEVICE_ID } from '@lib/constants'

interface Props {
  children: React.ReactNode
}
const RootLayout = ({ children }: Props) => {
  const cookiesInstance = cookies()

  const deviceId = cookiesInstance.get(COOKIE_DEVICE_ID)?.value

  return (
    <html>
      <UserProvider>
        <ApolloProvider deviceId={deviceId}>
          <body>{children}</body>
        </ApolloProvider>
      </UserProvider>
    </html>
  )
}

export default RootLayout
