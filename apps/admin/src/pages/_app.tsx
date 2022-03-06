import * as React from 'react'
import Head from 'next/head'
import { AppProps } from 'next/app'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { CacheProvider, EmotionCache } from '@emotion/react'
import theme from '@styles/theme'
import createEmotionCache from '@styles/createEmotionCache'
import { ClerkProvider } from '@clerk/nextjs'

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

interface Props extends AppProps {
  emotionCache?: EmotionCache
}

const MyApp = (props: Props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props
  return (
    <ClerkProvider>
      <CacheProvider value={emotionCache}>
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </CacheProvider>
    </ClerkProvider>
  )
}

export default MyApp
