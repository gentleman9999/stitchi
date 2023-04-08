import { PrimaryNavigation } from '@/components/common'
import getOrThrow from '@/utils/get-or-throw'
import { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Footer from './Footer'
import Script from 'next/script'
import bannerImage from '../../public/promo-pepper-banner.png'

import './main.css'
import makeAbsoluteUrl from '@/utils/get-absolute-url'

const siteName = getOrThrow(
  process.env.NEXT_PUBLIC_SITE_NAME,
  'NEXT_PUBLIC_SITE_NAME',
)

const twitterHandle = getOrThrow(
  process.env.NEXT_PUBLIC_TWITTER_HANDLE,
  'NEXT_PUBLIC_TWITTER_HANDLE',
)

const googleAnalyticsId = getOrThrow(
  process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID,
  'NEXT_PUBLIC_GOOGLE_ANALYTICS_ID',
  { allowEmpty: true },
)

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const bannerImageUrl = makeAbsoluteUrl(bannerImage.src)

export const metadata: Metadata = {
  title: siteName,
  description: 'PromoPepper promotional products directory and newsletter.',
  openGraph: {
    type: 'website',
    title: siteName,
    description: 'PromoPepper promotional products directory and newsletter.',
    images: [{ url: bannerImageUrl }],
  },
  twitter: {
    card: 'summary_large_image',
    images: [{ url: bannerImageUrl, alt: `${siteName} banner` }],
    site: `@${twitterHandle}`,
    creator: `@${twitterHandle}`,
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {googleAnalyticsId ? (
          <>
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
            />
            <Script
              id="google-analytics"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
          
            gtag('config', '${googleAnalyticsId}');
        `,
              }}
            />
          </>
        ) : null}

        <link rel="stylesheet" href="https://use.typekit.net/msx0isz.css" />
      </head>
      <body className={`${inter.variable} font-sans`}>
        <PrimaryNavigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
