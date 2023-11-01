import { UserProvider } from '@auth0/nextjs-auth0/client'
import ApolloProvider from '@lib/ApolloProvider'
import React from 'react'
import { cookies } from 'next/headers'
import { COOKIE_DEVICE_ID } from '@lib/constants'
import { StandoutProvider } from '@components/context/standout'
import { SnackbarProvider } from '@components/context/snackbar-context'
import routes from '@lib/routes'
import {
  AccessTokenError,
  AccessTokenErrorCode,
  getAccessToken,
} from '@auth0/nextjs-auth0'
import { RedirectType, redirect } from 'next/navigation'

interface Props {
  children: React.ReactNode
}
const RootLayout = async ({ children }: Props) => {
  let accessToken

  try {
    accessToken = (await getAccessToken()).accessToken
  } catch (error) {
    if (
      error instanceof AccessTokenError &&
      error.code === AccessTokenErrorCode.MISSING_SESSION
    ) {
      // Do nothing
    } else {
      console.error(
        "Failed to get access token in RootLayout. This shouldn't happen.",
        {
          context: {
            error,
          },
        },
      )

      redirect(routes.internal.logout.href(), RedirectType.replace)
    }
  }

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
