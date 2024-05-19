import '@assets/main.css'
import '@assets/chrome-bug.css'

import React, { ReactElement, ReactNode } from 'react'
import type { AppProps } from 'next/app'
import { NextPage } from 'next'
import { ApolloProvider } from '@apollo/client'
import { useApollo } from '@lib/apollo'
import { SeoDefault } from '@components/common'
import { StandoutProvider } from '@components/context'
import { Poppins, Saira, Saira_Condensed } from 'next/font/google'
import Script from 'next/script'
import { GTM_ID } from '@lib/events'
import MixpanelProvider from '@components/context/mixpanel-context'
import { UserProvider } from '@auth0/nextjs-auth0/client'
import { SnackbarProvider } from '@components/context/snackbar-context'
import { AxiomWebVitals } from 'next-axiom'
import { CookiesProvider } from 'react-cookie'
import IntercomProvider from 'app/IntercomProvider'
import PageloadProgressIndicator from '@components/layout/PageloadProgressIndicator'
import { GoogleTagManager } from '@lib/google'
import IdentifyUser from 'app/IdentifyUser'

const poppins = Poppins({
  weight: ['400', '600', '800', '900'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-default',
})

type ExtendedNextPage = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type ExtendedAppProps = AppProps & {
  Component: ExtendedNextPage
}

const Page = ({ Component, pageProps }: ExtendedAppProps) => {
  const apolloClient = useApollo(pageProps)

  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? (page => page)

  return (
    <>
      <div className={`${poppins.variable}`}>
        <PageloadProgressIndicator />
        <UserProvider>
          <CookiesProvider>
            <ApolloProvider client={apolloClient}>
              {/* https://www.datocms.com/docs/next-js/seo-management */}
              <SeoDefault />
              {/* Right now we have a hack and set the intercom context in mixpanel provider */}
              <IntercomProvider>
                <MixpanelProvider>
                  <IdentifyUser
                    membershipId={undefined}
                    organization={undefined}
                    user={undefined}
                  />

                  <SnackbarProvider>
                    <StandoutProvider>
                      <AxiomWebVitals />
                      {getLayout(<Component {...pageProps} />)}
                    </StandoutProvider>
                  </SnackbarProvider>
                </MixpanelProvider>
              </IntercomProvider>
            </ApolloProvider>
          </CookiesProvider>
        </UserProvider>
      </div>

      <GoogleTagManager gtmId={GTM_ID} />
    </>
  )
}

export default Page
