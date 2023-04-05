import { PrimaryNavigation } from '@/components/common'
import getOrThrow from '@/utils/get-or-throw'
import { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Footer from './Footer'
import bannerImage from '../../public/promo-pepper-banner.jpg'

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
        <link rel="stylesheet" href="https://use.typekit.net/msx0isz.css" />
      </head>
      <body className={`${inter.variable} font-sans`}>
        {/* <SubscribeBanner /> */}
        <PrimaryNavigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
