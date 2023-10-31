import { UserProvider } from '@auth0/nextjs-auth0/client'
import ApolloProvider from '@lib/ApolloProvider'
import React from 'react'
import { cookies } from 'next/headers'
import { COOKIE_DEVICE_ID } from '@lib/constants'
import { getAccessToken } from '@auth0/nextjs-auth0'
import { StandoutProvider } from '@components/context/standout'
import { SnackbarProvider } from '@components/context/snackbar-context'

interface Props {
  children: React.ReactNode
}
const RootLayout = async ({ children }: Props) => {
  const { accessToken } = await getAccessToken()
  const cookiesInstance = cookies()

  const deviceId = cookiesInstance.get(COOKIE_DEVICE_ID)?.value

  return (
    <html>
      <UserProvider>
        <ApolloProvider deviceId={deviceId} accessToken={accessToken}>
          <SnackbarProvider>
            <StandoutProvider>
              <body>{children}</body>
            </StandoutProvider>
          </SnackbarProvider>
        </ApolloProvider>
      </UserProvider>
    </html>
  )
}

export default RootLayout
