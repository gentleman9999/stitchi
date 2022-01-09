import React from 'react'
import '@styles/globals.css'
import type { AppProps } from 'next/app'

const Page = ({ Component, pageProps }: AppProps) => (
  <Component {...pageProps} />
)

export default Page
