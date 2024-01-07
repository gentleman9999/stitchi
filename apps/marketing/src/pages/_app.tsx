import '@assets/main.css'
import '@assets/chrome-bug.css'

import React, { ReactElement, ReactNode } from 'react'
import type { AppProps } from 'next/app'
import { NextPage } from 'next'
import { ApolloProvider } from '@apollo/client'
import { useApollo } from '@lib/apollo'
import { SeoDefault } from '@components/common'
import { StandoutProvider } from '@components/context'
import { Saira, Saira_Condensed } from 'next/font/google'
import Script from 'next/script'
import { GTM_ID } from '@lib/events'
import MixpanelProvider from '@components/context/mixpanel-context'
import { UserProvider } from '@auth0/nextjs-auth0/client'
import { SnackbarProvider } from '@components/context/snackbar-context'
import { AxiomWebVitals } from 'next-axiom'
import { CookiesProvider } from 'react-cookie'
import IntercomProvider from 'app/IntercomProvider'
import PageloadProgressIndicator from '@components/layout/PageloadProgressIndicator'

const saira = Saira({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-default',
})

const sairaCond = Saira_Condensed({
  weight: ['600'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-heading-display',
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
      <div className={`${saira.variable} ${sairaCond.variable}`}>
        <PageloadProgressIndicator />
        <UserProvider>
          <CookiesProvider>
            <ApolloProvider client={apolloClient}>
              {/* https://www.datocms.com/docs/next-js/seo-management */}
              <SeoDefault />
              {/* Right now we have a hack and set the intercom context in mixpanel provider */}
              <IntercomProvider>
                <MixpanelProvider>
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
    </>
  )
}

export default Page
