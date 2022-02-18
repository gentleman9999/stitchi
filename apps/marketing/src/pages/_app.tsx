import '@assets/main.css'
import '@assets/chrome-bug.css'

import React, { ReactElement, ReactNode, useEffect } from 'react'
import type { AppProps } from 'next/app'
import { NextPage } from 'next'
import { ApolloProvider } from '@apollo/client'
import { useApollo } from '@lib/apollo'
import { SeoDefault } from '@components/common'
import globalSeo from '@generated/global-seo.json'
import { StandoutProvider } from '@components/context'
import { GTM_ID } from '@lib/events'
import Script from 'next/script'

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

  /**
   * Chrome has a bug with transitions on load since 2012!
   *
   * To prevent a "pop" of content, you have to disable all transitions until
   * the page is done loading.
   *
   * https://lab.laukstein.com/bug/input
   * https://twitter.com/timer150/status/1345217126680899584
   */
  useEffect(() => {
    document.body.classList?.remove('loading')
  }, [])

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
      <ApolloProvider client={apolloClient}>
        <SeoDefault seo={globalSeo.data.homepage._seoMetaTags as any} />
        <StandoutProvider>
          {getLayout(<Component {...pageProps} />)}
        </StandoutProvider>
      </ApolloProvider>
    </>
  )
}

export default Page
