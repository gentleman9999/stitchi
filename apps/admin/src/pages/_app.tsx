import * as React from 'react'
import Head from 'next/head'
import { AppProps } from 'next/app'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { CacheProvider, EmotionCache } from '@emotion/react'
import theme from '@styles/theme'
import createEmotionCache from '@styles/createEmotionCache'
import { UserProvider } from '@auth0/nextjs-auth0'
import { useApollo } from '@lib/apollo-client'
import { ApolloProvider } from '@apollo/client'

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

interface Props extends AppProps {
  emotionCache?: EmotionCache
}

const MyApp = (props: Props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

  const apolloClient = useApollo(pageProps.initialApolloState)

  return (
    <CacheProvider value={emotionCache}>
      <UserProvider>
        <ApolloProvider client={apolloClient}>
          <Head>
            <meta
              name="viewport"
              content="initial-scale=1, width=device-width"
            />
          </Head>
          <ThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </ApolloProvider>
      </UserProvider>
    </CacheProvider>
  )
}

export default MyApp
