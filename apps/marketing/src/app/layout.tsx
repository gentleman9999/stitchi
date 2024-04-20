import '@assets/main.css'
import '@assets/chrome-bug.css'

import { UserProvider } from '@auth0/nextjs-auth0/client'
import ApolloProvider from '@lib/ApolloProvider'
import React from 'react'
import { cookies } from 'next/headers'
import {
  COMPANY_NAME,
  COOKIE_DEVICE_ID,
  SEO_DEFAULT_DESCRIPTION,
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
import Script from 'next/script'
import { GTM_ID } from '@lib/events'
import { Saira, Saira_Condensed, Poppins } from 'next/font/google'

const logger = new Logger()

// const saira = Saira({
//   subsets: ['latin'],
//   display: 'swap',
//   variable: '--font-default',
// })

// const sairaCond = Saira_Condensed({
//   weight: ['600'],
//   subsets: ['latin'],
//   display: 'swap',
//   variable: '--font-heading-display',
// })

const poppins = Poppins({
  weight: ['400', '600', '800', '900'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-default',
})

const title = 'Custom Merch & Merch Programs'
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

  const cookiesInstance = cookies()

  const deviceId = cookiesInstance.get(COOKIE_DEVICE_ID)?.value

  return (
    <html className={`${poppins.variable}`} lang="en-US">
      {/* Google Tag Manager - Global base code */}
      <Script
        id="google-tag-manager"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer', '${GTM_ID}');
          `,
        }}
      />
      {/* Google Tag Manager - Global base code - end */}

      <AxiomWebVitals />

      <UserProvider>
        <ApolloProvider deviceId={deviceId} accessToken={accessToken}>
          <body>
            <PageloadProgressIndicator />
            <IntercomProvider>
              <MixpanelProvider>
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
    </html>
  )
}

export default RootLayout
