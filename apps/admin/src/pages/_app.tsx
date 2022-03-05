import '../styles/globals.css'
import type { AppProps } from 'next/app'

var MyApp = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />
}

export default MyApp
