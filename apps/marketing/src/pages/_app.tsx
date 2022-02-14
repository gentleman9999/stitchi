import '@assets/main.css'
import '@assets/chrome-bug.css'

import React, { ReactElement, ReactNode, useEffect } from 'react'
import type { AppProps } from 'next/app'
import { NextPage } from 'next'
import { ApolloProvider } from '@apollo/client'
import { useApollo } from '@lib/apollo'
import { SeoDefault } from '@components/common'
import globalSeo from '@generated/global-seo.json'
import StandoutProvider from '@components/context/standout'

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
    <ApolloProvider client={apolloClient}>
      <SeoDefault seo={globalSeo.data.homepage._seoMetaTags as any} />
      <StandoutProvider>
        {getLayout(<Component {...pageProps} />)}
      </StandoutProvider>
    </ApolloProvider>
  )
}

export default Page
