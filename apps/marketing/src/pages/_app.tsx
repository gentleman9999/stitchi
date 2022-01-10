import '@assets/main.css'
import '@assets/chrome-bug.css'

import React from 'react'
import type { AppProps } from 'next/app'

const Page = ({ Component, pageProps }: AppProps) => (
  <Component {...pageProps} />
)

export default Page
