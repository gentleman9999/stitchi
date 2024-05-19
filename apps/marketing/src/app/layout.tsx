import '@assets/main.css'
import '@assets/chrome-bug.css'

import { UserProvider } from '@auth0/nextjs-auth0/client'
import ApolloProvider from '@lib/ApolloProvider'
import React from 'react'
import { cookies } from 'next/headers'
import {
  COMPANY_NAME,
  COOKIE_DEVICE_ID,
  GA_CLIENT_ID_COOKIE_KEY,
  NEXT_PUBLIC_GOOGLE_ANALYTICS_MEASUREMENT_ID,
  SEO_DEFAULT_DESCRIPTION,
  SEO_DEFAULT_TITLE,
  SITE_URL,
} from '@lib/constants'
import { StandoutProvider } from '@components/context/standout'
import { SnackbarProvider } from '@components/context/snackbar-context'
import routes from '@lib/routes'
import {
  AccessTokenError,
  AccessTokenErrorCode,
  getAccessToken,
} from '@auth0/nextjs-auth0'
import { RedirectType, redirect } from 'next/navigation'
import PageloadProgressIndicator from '@components/layout/PageloadProgressIndicator'
import { Metadata } from 'next'
import IntercomProvider from './IntercomProvider'
import MixpanelProvider from '@components/context/mixpanel-context'
import { AxiomWebVitals, Logger } from 'next-axiom'
import { GTM_ID } from '@lib/events'
import { Poppins } from 'next/font/google'
import { gql } from '@apollo/client'
import { getClient } from '@lib/apollo-rsc'
import {
  RootLayoutGetDataQuery,
  RootLayoutGetDataQueryVariables,
} from '@generated/types'
import { GoogleTagManager } from '@lib/google'
import IdentifyUser from './IdentifyUser'

const logger = new Logger()

const poppins = Poppins({
  weight: ['400', '600', '800', '900'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-default',
})

const title = SEO_DEFAULT_TITLE
const description = SEO_DEFAULT_DESCRIPTION

export const metadata: Metadata = {
  description,
  metadataBase: new URL(SITE_URL),
  generator: COMPANY_NAME,
  applicationName: COMPANY_NAME,
  title: { default: title, template: `%s | ${COMPANY_NAME}` },
  // When running in a browser on a mobile phone, "format-detection" meta tag determines whether or not telephone numbers in the HTML content will appear as hypertext links.
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      follow: true,
      index: true,
      indexifembedded: false,
    },
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@gostitchi',
    site: '@gostitchi',
  },
  openGraph: {
    title,
    description,
    siteName: COMPANY_NAME,
    url: '/',
    images: [
      {
        url: 'https://www.datocms-assets.com/61029/1673022707-stitchi_sharing_image.png?auto=format&fit=max&w=1200',
        width: 1200,
        type: 'image/png',
        alt: `${COMPANY_NAME} Cover Image`,
      },
    ],
  },
  keywords: [
    'Merch',
    'Custom Merch',
    'Branded Merch',
    'Swag',
    'Referral Programs',
    '3PL',
    'Custom Merchandise',
  ],
}

const handleGetAccessToken = async () => {
  let accessToken

  try {
    accessToken = (await getAccessToken()).accessToken
  } catch (error) {
    if (
      error instanceof AccessTokenError &&
      error.code === AccessTokenErrorCode.MISSING_SESSION
    ) {
      // Do nothing
    } else if (
      typeof error === 'object' &&
      error !== null &&
      'digest' in error &&
      error.digest === 'DYNAMIC_SERVER_USAGE'
    ) {
      // We are building the app and don't have access to cookies. Do nothing.
    } else {
      logger.error(
        "Failed to get access token in RootLayout. This shouldn't happen.",
        { error },
      )

      redirect(routes.internal.logout.href(), RedirectType.replace)
    }
  }

  return accessToken
}

interface Props {
  children: React.ReactNode
}
const RootLayout = async ({ children }: Props) => {
  const [client, accessToken] = await Promise.all([
    getClient(),
    handleGetAccessToken(),
  ])

  const { data } = await client.query<
    RootLayoutGetDataQuery,
    RootLayoutGetDataQueryVariables
  >({
    query: GET_DATA,
  })

  const { user, organization, id: membershipId } = data.viewer || {}

  const cookiesInstance = cookies()

  const deviceId = cookiesInstance.get(COOKIE_DEVICE_ID)?.value || null
  const gaClientId = cookiesInstance.get(GA_CLIENT_ID_COOKIE_KEY)?.value || null

  const initialDataLayer = {
    measurement_id: NEXT_PUBLIC_GOOGLE_ANALYTICS_MEASUREMENT_ID,
    user_id: user?.id,
    organization_id: organization?.id,
    organization_name: organization?.name,
    user_first_name: user?.givenName,
    user_last_name: user?.familyName,
    user_email: user?.email,
    user_phone: user?.phoneNumber,
  }

  return (
    <html className={`${poppins.variable}`} lang="en-US">
      <UserProvider>
        <ApolloProvider
          deviceId={deviceId}
          accessToken={accessToken || null}
          gaClientId={gaClientId}
        >
          <body>
            <PageloadProgressIndicator />
            <IntercomProvider>
              <MixpanelProvider>
                <IdentifyUser
                  membershipId={membershipId}
                  organization={organization}
                  user={
                    user
                      ? {
                          ...user,
                          firstName: user.givenName,
                          lastName: user.familyName,
                        }
                      : undefined
                  }
                />

                <SnackbarProvider>
                  <StandoutProvider>
                    {/* We use Next.js Parallel Routes to support a root level [...catchAll] in both the app and marketing context */}
                    {children}
                  </StandoutProvider>
                </SnackbarProvider>
              </MixpanelProvider>
            </IntercomProvider>
          </body>
        </ApolloProvider>
      </UserProvider>

      <GoogleTagManager initialDataLayer={initialDataLayer} gtmId={GTM_ID} />
      <AxiomWebVitals />
    </html>
  )
}

const GET_DATA = gql`
  query RootLayoutGetDataQuery {
    viewer {
      id
      user {
        id
        email
        name
        givenName
        familyName
        phoneNumber
        picture
        intercomUserHash
        createdAt
      }
      organization {
        id
        name
        createdAt
      }
    }
  }
`

export default RootLayout
